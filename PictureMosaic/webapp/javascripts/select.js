/****
 *   SCRIPT: select.jsp
 */

var eleInput = document.querySelector(".controll input[type=file]");
var eleBody = document.querySelector("body");
var eleDrag = document.querySelector(".pictures");

var fileHandler = new MultiFileHandler( [eleInput, eleBody], [imgCb] );

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

			eleDrag.querySelector(".positioner")
					.insertBefore(image, null);
		};
	})(file);

	// Read in the image file as a data URL.
	reader.readAsDataURL(file);
}

function uploadImages() {
	var files = fileHandler.getFiles()
	var formData = new FormData();

	for (var idx = 0; idx < files.length; idx++) {
		if (files[idx].type.match('image.*')) {
			formData.append("photos", files[idx]);
		}
	}
	
	var request = new XMLHttpRequest();
	request.open("POST", "/photo");
	request.send(formData);
}