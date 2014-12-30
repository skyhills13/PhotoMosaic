/****
 *   PAGE: select.jsp
 */

// 익명함수를 이용해서 전역공간을 깔끔하게...
// select.jsp 페이지만을 위한 코드. 재사용을 위한 설계를 하지 않았다.
(function() {
	var eleBody = document.querySelector("body");
	
	var eleHeader = document.querySelector("header");
	var eleSelect = document.querySelector(".select");
	
	var eleInfo = document.querySelector(".hoverLine .info");
	var eleInput = document.querySelector(".inputFile input[type=file]");
	var eleDrag = document.querySelector(".pictures");
	
	var eleMakeButton = document.querySelector(".controll button");
	var eleServerSubmit = document.querySelector(".serverButton");
	
	var eleLightbox = document.querySelector(".lightbox");
	var eleLightboxBackground = document.querySelector(".lightbox .background");
	var elePreview = eleLightbox.querySelector(".preview");
	var eleChangeButton = document.querySelector(".make button:nth-of-type(1)");
	var eleUploadButton = document.querySelector(".make button:nth-of-type(2)");
	
	var fileHandler = new MultiFileHandler( [eleInput, eleSelect], [imgCb] );
	var images = [];
	
	eleHeader.addEventListener("mouseenter", function(event) {
		var prefix = getBrowserPrefix();
		var strTransform = "";
		if (prefix === "moz" || prefix === "") {
			strTransform = "transform";
		} else {
			strTransform = prefix + "Transform";
		}
		eleSelect.style[strTransform] = "translate3d(0px, 12px, 0px)";
		eleBody.style.overflow = "hidden";
	});
	
	eleHeader.addEventListener("mouseleave", function(event) {
		var prefix = getBrowserPrefix();
		var strTransform = "";
		if (prefix === "moz" || prefix === "") {
			strTransform = "transform";
		} else {
			strTransform = prefix + "Transform";
		}
		
		eleSelect.style[strTransform] = "";
	});
	
	eleHeader.addEventListener("animationend", function() {
		eleBody.style.overflow = "";
	});
	
	eleLightboxBackground.addEventListener("click", function(event) {
		eleSelect.removeClassName("background");
		eleLightbox.appendClassName("hidden");
	});
	
	eleMakeButton.addEventListener("click", function(event) {
		if (images.length < 3) {
			alert("3장 이상의 사진을 넣어주세요~!");
			return;
		}
		
		eleSelect.appendClassName("background");
		eleLightbox.removeClassName("hidden");
		
		currentMosaic = makeLayout();
		
		elePreview.src = currentMosaic.toDataURL("image/jpeg", 1);
	});
	
	eleServerSubmit.addEventListener("click", function(event) {
		event.preventDefault();
		
		var inputTexts = document.querySelectorAll(".select input[type=text]");
		var formData = new FormData();
	
		for (var idx = 0; idx < inputTexts.length; idx++) {
			formData.append(inputTexts[idx].name, inputTexts[idx].value);
		}
		
		for (var idx = 0; idx < images.length; idx++) {
			formData.append("photos", images[idx].originalFile);
			formData.append("resizedDataURLs", JSON.stringify({
				"fileName": images[idx].fileName,
				"dataURL": images[idx].resizedDataURL
			}));
		}
		
		var layout = makeLayout();
		formData.append("mosaic", layout);
		
		var request = new XMLHttpRequest();
		request.open("POST", "/photoServer");
		request.send(formData);
		
		request.addEventListener("load", function() {
			var mosaicUrl = request.responseText;
			console.log("mosaicURL: " + mosaicUrl);
			var regExp = new RegExp("\\b" + "DOCTYPE" + "\\b");
			if (mosaicUrl.search(regExp) > -1) {
				console.error("UPLOAD: Error! Response is not valid");
				return;
			}
			
			var origin = window.location.origin;
			window.location.assign(origin + "/result/" + mosaicUrl);
		});
	});
	
	eleChangeButton.addEventListener("click", function() {
		currentMosaic = createMosaic();
		elePreview.src = currentMosaic.toDataURL("image/jpeg", 1);
	});
	
	eleUploadButton.addEventListener("click", function() {
		sendData();
	});
	
	var currentMosaic;
	function sendData() {
		var formData = new FormData();
		var inputTexts = document.querySelectorAll(".select input[type=text]");
		
		for (var idx = 0; idx < inputTexts.length; idx++) {
			formData.append(inputTexts[idx].name, inputTexts[idx].value);
		}
		
		for (var idx = 0; idx < images.length; idx++) {
			formData.append("photos", images[idx].originalFile);
			formData.append("resizedDataURLs", JSON.stringify({
				"fileName": images[idx].fileName.substr(0, images[idx].fileName.lastIndexOf(".")) + ".jpg",
				"dataURL": images[idx].resizedDataURL
			}));
		}
		
		formData.append("mosaic", currentMosaic.toDataURL("image/jpeg", 1));
		
		var request = new XMLHttpRequest();
		request.open("POST", "/photo");
		request.send(formData);
		
		request.addEventListener("load", function() {
			var mosaicUrl = request.responseText;
			var regExp = new RegExp("\\b" + "DOCTYPE" + "\\b");
			if (mosaicUrl.search(regExp) > -1) {
				console.error("UPLOAD: Error! Response is not valid");
				return;
			}
			
			var origin = window.location.origin;
			window.location.assign(origin + "/result/" + mosaicUrl);
		});
	}

	var pArray;
	var templateGenerator;
	var suitableTemplates;
	var tIdx = 0;
	var combiner = new PhotoCombine(true);
	function makeLayout() {
		var tempPArray = document.querySelectorAll(".select .thumb img");
		var boolRenewTG;
		if (!pArray || pArray.length !== tempPArray.length) {
			pArray = tempPArray;
			boolRenewTG = true;
		}
		var pChecked = PhotoChecker(pArray);
		
		var objRatios = {};
		for (var idx in pChecked.simpleRatioList) {
			var size = pChecked.simpleRatioList[idx].simpleRatio.split("x");
			var ratio = size[0] / size[1];
			
			if (typeof objRatios[ratio] === "undefined") {
				objRatios[ratio] = 1;
			} else {
				objRatios[ratio]++;
			}
		}
		
		if (!templateGenerator || boolRenewTG === true) {
			if (2 < pArray.length && pArray.length < 8) {
				templateGenerator = new TemplateGenerator({
					width: 4,
					height: 4,
					targetNum: pArray.length
				});
			} else if (8 <= pArray.length) {
				templateGenerator = new TemplateGenerator({
					width: 4,
					height: 4,
					targetNum: 8
				});
			} else {
				console.error("사진 갯수가 이상하다! 확인해 달라!");
				return;
			}
			
			suitableTemplates = suffleArray(templateGenerator.getSuitableTemplates(objRatios));
		}

		return createMosaic();
	}
	
	function createMosaic() {
		var tArray = suitableTemplates[tIdx % suitableTemplates.length];
		++tIdx;
		
		var canvas = combiner.create(pArray, {
			"width" : 1200,
			"height" : 1200,
			"template" : tArray.getStringData(),
			"column" : tArray.getWidth(), // getWidth
			"row" : tArray.getHeight(), // getHeight
		});
		
		return canvas;
	}
	
	function imgCb(file) {
		// Only process image files.
		if (!file.type.match('image.*')) {
			return ;
		}
		
		var worker = new Worker("/javascripts/select_worker.js");
		worker.postMessage({
			"toDataURL": file
		});
		
		worker.addEventListener("message", function(event) {
			var url = event.data.toDataURL;
			resizeImage(url, 1200, 1200);
		});
		
		/**
		 * @param url
		 */
		function resizeImage(url, maxWidth, maxHeight) {
			var maxWidth = (typeof maxWidth !== "undefined") ? maxWidth : 1200;
			var maxHeight = (typeof maxHeight !== "undefined") ? maxHeight : 1200;
			var originalImage = new Image();
			
			originalImage.addEventListener("load", function(event) {
				var sourceImage = new Image();
				
				sourceImage.addEventListener("load", function() {
					// Create a canvas with the desired dimensions
					var targetSize = getTargetSize(maxWidth, maxHeight, this.width, this.height);
					var canvas = document.createElement("canvas");
					canvas.width = targetSize.width;
					canvas.height = targetSize.height;
					
					// Scale and draw the source image to the canvas
					canvas.getContext("2d").drawImage(sourceImage, 0, 0, targetSize.width, targetSize.height);
					
					var url = canvas.toDataURL("image/jpeg", 0.7);
					appendThumbnail(url);
					
					images.push({"originalFile": file, "fileName": file.name, "resizedDataURL": url});
				});
				
				sourceImage.src = url;
			});
			
			originalImage.src = url;
		}
	}
	
	function appendThumbnail(url) {
		eleInfo.appendClassName("hidden");
		// Render thumbnail.
		var thumbArea = document.createElement("div");
		
		eleDrag.querySelector(".positioner").insertBefore(thumbArea, null);
		thumbArea.appendClassName("thumb");
		thumbArea.setAttribute("data-draghover", true);
		
		thumbArea.innerHTML = "<div class=\"positioner\" data-draghover=\"true\">" +
				"<section data-draghover=\"true\">" +
						"<img src=\"" + url + "\"" +
							"draggable=\"false\"" +
							"data-draghover=\"true\" />" +
				"</section>" +
				"</div>";
		
		var removeButton = document.createElement("div");
		thumbArea.querySelector(".positioner").insertBefore(removeButton, null);
		removeButton.appendClassName("removeButton");
		removeButton.setAttribute("data-draghover", true);
		
		removeButton.addEventListener("click", (function(eleThumbArea) {
			return function() {
				var itsFile = objectFindByKey(images, "eleThumbArea", thumbArea);
				
				images.splice(images.indexOf(itsFile), 1);
				thumbArea.parentNode.removeChild(thumbArea);
				
				if (images.length <= 0) {
					eleInfo.removeClassName("hidden");
				}
			}
		})(thumbArea));
	}

	/**
	 * @param maxWidth
	 * @param maxHeight
	 * @param imgWidth
	 * @param imgHeight
	 * @returns maxWidth 또는 maxHeight 크기에 맞춰진 픽셀값
	 */
	function getTargetSize(maxWidth, maxHeight, imgWidth, imgHeight) {
		var result = {
				width: imgWidth,
				height: imgHeight
		};
		var ratio = imgHeight / imgWidth;
		
		if (imgWidth >= maxWidth && ratio <= 1) {
			result.width = maxWidth;
			result.height = maxWidth * ratio;
		} else if (imgHeight >= maxHeight) {
			result.width = maxHeight / ratio;
			result.height = maxHeight;
		}
		
		return result;
	}

})();
