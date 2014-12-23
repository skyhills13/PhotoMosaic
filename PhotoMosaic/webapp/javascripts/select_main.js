/****
 *   PAGE: select.jsp
 */

// 익명함수를 이용해서 전역공간을 깔끔하게...
// select.jsp 페이지만을 위한 코드. 재사용을 위한 설계를 하지 않았다.
(function() {
	//익명함수로 감싸긴 했지만, 익명함수의 크기가 커서 변수가 많으면 헷갈릴 거 같음.
	//익면 함수 안에서 아래와 같이 너무 많은 변수(마치 전역변수같이)를 쉽게 쓰고 있음. 
	// 전역변수는 아니지만 아래와 같은 전역변수형태를 좀더 줄여서 쓰려고 하면 좋겠음. 
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
	//아래 이벤트 핸들러는 하나로 하고 ,  event type으로 구분해서 처리할 수도 있어보임.
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
			alert("3장 이상의 사진을 넣어주세요~!");  //이런 메시지는 별도로 분리해서 관리하기.
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
			var mosaicUrl = request.responseText;  //대체로 모든 변수명에서 type을 파악하기가 너무 어려움..
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
	
	var currentMosaic;  //이렇게 밖에서 선언해야 하는거 맞나..?
	function sendData() {
		var formData = new FormData();
		var inputTexts = document.querySelectorAll(".select input[type=text]");
		
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
		
		formData.append("mosaic", currentMosaic.toDataURL("image/jpeg", 1));
		
		//ajax 코드가 여기저기 자주 사용되니까, 추상화해서 쉽게 재사용할 수 있게 해도 좋겠음. 
		var request = new XMLHttpRequest();
		request.open("POST", "/photo");
		request.send(formData);
		
		request.addEventListener("load", function() {
			var mosaicUrl = request.responseText;
			var regExp = new RegExp("\\b" + "DOCTYPE" + "\\b");
			if (mosaicUrl.search(regExp) > -1) {
				console.error("UPLOAD: Error! Response is not valid");  //이런 에러메시지도 로직에서 분리해서 관리.
				return;
			}
			
			var origin = window.location.origin;
			window.location.assign(origin + "/result/" + mosaicUrl);
		});
	}
	
	//함수외부에 선언된 변수들... 익명함수라고 해도 자제해주길 바래.
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
		//아래 조건문은 반대조건인 경우를 구현하고 return시키는 게 더 좋겠음.
		if (!templateGenerator || boolRenewTG === true) {  //boolRenewTg=== true 가 아니고 그냥 boolRenewTG하면 될 듯.
			if (2 < pArray.length && pArray.length < 8) {  //숫자 2,8이 의미가 뭔지 모르겠음..
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
				console.error("사진 갯수가 이상하다! 확인해 달라!"); //메시지분리.
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
	
	//이 함수는 리팩토링대상인듯. 
	// 너무크고, 로직에 html string이 포함되서 집중도 안되고.(그 부분은 분리)
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
					//DOM을 조작하는 아래 부분들은 묶어서 별도로 분리할 부분으로 보임. 
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
					//이건 뭐지.. handler가 메서드를 반환하는 코드인데..맞나? 
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
					
					//images.push({"eleThumbArea": thumbArea, "file": file});
					images.push({"originalFile": file, "fileName": file.name, "resizedDataURL": url});
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
