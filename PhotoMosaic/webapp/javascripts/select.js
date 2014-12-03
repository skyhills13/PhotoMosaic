/****
 *   PAGE: select.jsp
 */

// 익명함수를 이용해서 전역공간을 깔끔하게...
// select.jsp 페이지만을 위한 코드니까 재사용을 위한 설계를 하지 않았다.
(function() {
	var eleBody = document.querySelector("body");
	
	var eleInfo = document.querySelector(".hoverLine .info");
	var eleInput = document.querySelector(".inputFile input[type=file]");
	var eleDrag = document.querySelector(".pictures");
	
	var eleSubmit = document.querySelector(".controll button");
	var eleServerSubmit = document.querySelector(".serverButton");
	
	var fileHandler = new MultiFileHandler( [eleInput, eleBody], [imgCb] );
	var images = [];
	
	eleSubmit.addEventListener("click", function(event) {
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
									"data-draghover=\"true\">" +
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

	
//	var templateGenerator = new TemplateGenerator({
//		width: 4,
//		height: 4,
//		targetNum: 8
//	});
	function makeLayout() {
		var t = [ [ "1x1", "1x1", "1x4", "1x4", "1x1", "1x1", "x", "x", "2x1", "x", "x", "x", "2x1", "x", "x", "x" ],
					[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
					[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ] ];
		

		var pArray = document.querySelectorAll(".select .thumb img");
//		var pChecked = PhotoChecker(pArray);
//		
//		var objRatios = {};
//		for (var idx in pChecked.simpleRatioList) {
//			var size = pChecked.simpleRatioList[idx].simpleRatio.split("x");
//			var ratio = size[0] / size[1];
//			
//			if (typeof objRatios[ratio] === "undefined") {
//				objRatios[ratio] = 1;
//			} else {
//				objRatios[ratio]++;
//			}
//		}
//		
//		var suitableTemplates = templateGenerator.getSuitableTemplate(objRatios);
//		var tArray = suitableTemplates[parseInt(Math.random() * suitableTemplates.length)];
		
		var tArray = t[parseInt(Math.random() * t.length)];
		var appendPlace = document.querySelector("section.hidden");
		
		var combine = new PhotoCombine();
		combine.getMaterial({
			"mWidth" : 2000,
			"mHeight" : 2000,
//			"templateArray" : tArray.getStringData(),
			"templateArray" : tArray,
			"templateColumn" : 4, // getWidth
			"templateRow" : 4, // getHeight
			"photoArray" : pArray, // HTMLImgElement
			"appendPlace" : appendPlace
		});
		combine.create();

		return combine.getResult();
	}
	
})();
