/****
 *   SCRIPT: select.jsp
 */

var eleBody = document.querySelector("body");

var eleInput = document.querySelector(".inputFile input[type=file]");
var eleDrag = document.querySelector(".pictures");

var eleSubmit = document.querySelector(".controll button");

var fileHandler = new MultiFileHandler( [eleInput, eleBody], [imgCb] );

eleSubmit.addEventListener("click", function(event, eleForm) {
	event.preventDefault();
	
	var files = fileHandler.getFiles();
	var inputTexts = document.querySelectorAll(".select input[type=text]");
	var formData = new FormData();

	for (var idx = 0; idx < inputTexts.length; idx++) {
		formData.append(inputTexts[idx].type, inputTexts[idx].value);
	}
	
	for (var idx = 0; idx < files.length; idx++) {
		if (files[idx].type.match('image.*')) {
			formData.append("photos", files[idx]);
		}
	}
	
	var request = new XMLHttpRequest();
	request.open("POST", "/photo");
	request.send(formData);
	
	request.addEventListener("load", function() {
		document.querySelector(".request").submit();
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
			var image = document.createElement("img");

			image.appendClassName("thumb");
			image.setAttribute("src", event.target.result);
			image.setAttribute("title", escape(file.name));
			image.setAttribute("draggable", false);
			image.setAttribute("data-drag", true);

			eleDrag.querySelector(".positioner").insertBefore(image, null);
		};
	})(file);

	// Read in the image file as a data URL.
	reader.readAsDataURL(file);
}
