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
		event.preventDefault();

		if (images.length < 3) {
			alert("3장 이상의 사진을 넣어주세요~!");
			return;
		}
		
		eleSelect.appendClassName("background");
		eleLightbox.removeClassName("hidden");
		
		var previewURL = makeLayout().toDataURL("image/jpeg", 0.9);
		eleLightbox.querySelector(".preview").src = previewURL;
	});
	
	eleServerSubmit.addEventListener("click", function(event) {
		event.preventDefault();
		
		if (images.length < 8) {
			alert("8장 이상의 사진이 필요해요~!");
			return;
		}
		
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
	
	function sendData() {
		var formData = new FormData();
		var inputTexts = document.querySelectorAll(".select input[type=text]");
		
		for (var idx = 0; idx < inputTexts.length; idx++) {
			formData.append(inputTexts[idx].name, inputTexts[idx].value);
		}
		
		for (var idx = 0; idx < images.length; idx++) {
			formData.append("photos", images[idx]["file"]);
		}
		
		var layout = makeLayout();
		formData.append("mosaic", layout);
		
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
	
	function imgCb(file) {
		// Only process image files.
		if (!file.type.match('image.*')) {
			return ;
		}
	
		var reader = new FileReader();
	
		// Closure to capture the file information.
		reader.onload = (function(file) {
			return function(event) {
				eleInfo.appendClassName("hidden");
				// Render thumbnail.
				var thumbArea = document.createElement("div");
				
				eleDrag.querySelector(".positioner").insertBefore(thumbArea, null);
				thumbArea.appendClassName("thumb");
				thumbArea.setAttribute("data-draghover", true);
				
				thumbArea.innerHTML = "<div class=\"positioner\" data-draghover=\"true\">" +
						"<section data-draghover=\"true\">" +
								"<img src=\"" + event.target.result + "\"" +
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
			};
		})(file);
	
		// Read in the image file as a data URL.
		reader.readAsDataURL(file);
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
		}
		
		suitableTemplates = suffleArray(templateGenerator.getSuitableTemplates(objRatios));

		return createMosaic();
	}
	
	function createMosaic() {
		var tArray = suitableTemplates[tIdx % suitableTemplates.length];
		++tIdx;
		
		var canvas = combiner.create(pArray, {
			"width" : 2000,
			"height" : 2000,
			"template" : tArray.getStringData(),
			"column" : tArray.getWidth(), // getWidth
			"row" : tArray.getHeight(), // getHeight
		});
		
		return canvas;
	}
	
})();
