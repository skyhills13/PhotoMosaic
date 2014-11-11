/*******************************************************************************
 * SCRIPT: select.jsp
 */

// 익명함수를 이용해서 전역공간을 깔끔하게...
// select.jsp 페이지만을 위한 코드니까 재사용을 위한 설계를 하지 않았다.
(function() {
	var eleBody = document.querySelector("body");
	
	var eleInput = document.querySelector(".inputFile input[type=file]");
	var eleDrag = document.querySelector(".pictures");
	
	var eleSubmit = document.querySelector(".controll button");
	
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
		
		var request = new XMLHttpRequest();
		request.open("POST", "/photo");
		request.send(formData);
		
		request.addEventListener("load", function() {
			console.log("request.responseText 뭔지 보게 : " + request.responseText);
			var origin = window.location.origin;
			window.location.assign(origin + "/result");
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
				// Render thumbnail.
				var thumbArea = document.createElement("div");
				eleDrag.querySelector(".positioner").insertBefore(thumbArea, null);
				thumbArea.appendClassName("thumb");
				thumbArea.setAttribute("data-draghover", true);
				
				
				thumbArea.innerHTML = "<img src=\"" + event.target.result + "\""
						+ "title=\"" + escape(file.name) + "\""
						+ "draggable=\"false\""
						+ "data-draghover=\"true\">";
				
				var removeButton = document.createElement("div");
				thumbArea.insertBefore(removeButton, null);
				removeButton.appendClassName("removeButton");
				removeButton.setAttribute("data-draghover", true);
				
				removeButton.addEventListener("click", (function(eleThumbArea) {
					return function() {
						var itsFile = objectFindByKey(images, "eleThumbArea", thumbArea);
						
						images.splice(images.indexOf(itsFile), 1);
						thumbArea.parentNode.removeChild(thumbArea);
					}
				})(thumbArea));
				
				images.push({"eleThumbArea": thumbArea, "file": file});
			};
		})(file);
	
		// Read in the image file as a data URL.
		reader.readAsDataURL(file);
	}
})();
