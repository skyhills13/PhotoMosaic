/****
 *   SCRIPT: select.jsp
 */

var eleInput = document.querySelector(".controll input[type=file]");
var eleBody = document.querySelector("body");
var eleDrag = document.querySelector(".pictures");

this.fileHandler = new MultiFileHandler( [eleInput, eleBody], [imgCb] );

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