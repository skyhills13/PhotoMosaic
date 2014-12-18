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
			formData.append("photos", images[idx]["file"]);
		}
		
		var layout = makeLayout();
		formData.append("mosaic", layout);
		
		var request = new XMLHttpRequest();
		request.open("POST", "/photoServer");
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
			formData.append("photos", images[idx]["file"]);
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
	
		var reader = new FileReader();
	
		// Closure to capture the file information.
		reader.onload = function(event) {
			var originalImage = new Image();
			
			originalImage.onload = function(event) {
				var targetSize = getTargetSize(1200, 1200, this.width, this.height);
				resizeImage(this.src, targetSize.width, targetSize.height, function(url) {
					eleInfo.appendClassName("hidden");
					// Render thumbnail.
					var thumbArea = document.createElement("div");
					
					eleDrag.querySelector(".positioner").insertBefore(thumbArea, null);
					thumbArea.appendClassName("thumb");
					thumbArea.setAttribute("data-draghover", true);
					
					thumbArea.innerHTML = "<div class=\"positioner\" data-draghover=\"true\">" +
							"<section data-draghover=\"true\">" +
									"<img src=\"" + url + "\"" +
										"title=\"" + escape(file.name) + "\"" +
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
					
					images.push({"eleThumbArea": thumbArea, "file": file});
				});
			}
			
			originalImage.src = event.target.result;
		};
	
		// Read in the image file as a data URL.
		reader.readAsDataURL(file);
	}
	
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

	function resizeImage(url, width, height, imgCb) {
		var sourceImage = new Image();

		sourceImage.onload = function() {
			// Create a canvas with the desired dimensions
			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;

			// Scale and draw the source image to the canvas
			canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);

			// Convert the canvas to a data URL in PNG format
			imgCb(canvas.toDataURL("image/jpeg", 0.8));
		}

		sourceImage.src = url;
	}

})();
