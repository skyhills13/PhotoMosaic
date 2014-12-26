(function(window) {
	var console = window.console;
	var document = window.document;

	function resultPageDecorator(){
		var photoList = document.querySelectorAll("#list ul li img.original");
		
		function backgroundChange(){
			var random = parseInt(Math.random()*(photoList.length-1));
			var source = photoList[random].src;
			return source;
		};
		
		function backgroundBlur(){
			var imageSrc = backgroundChange();
			var image = new Image();
			image.src = imageSrc;
			image.addEventListener("load", function(){
				var originalHeight = image.naturalHeight;
				var originalWidth = image.naturalWidth; 
				
				var w = 1000; 
				var h = originalHeight*(w/originalWidth);
				
				var canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				canvas.setAttribute("id", "bluredBg");
				var canvasHTML = canvas.outerHTML;
				var put = document.querySelector("body");
				put.insertAdjacentHTML("beforeend", canvasHTML);
				
				var target = document.querySelector("#bluredBg");
				var context = target.getContext("2d");
				context.drawImage(image, 0, 0, originalWidth, originalHeight, 0, 0, w, h);
				stackBlurCanvasRGBA("bluredBg", 0, 0, w, h, 10);
				var url = target.toDataURL();
				var bg = document.querySelector("body");
				var img = "<div id='bg'><img class='bluredBg' src='" + url + "'/ ></div>"
				var body = document.querySelector("body");
				console.log(img);
				put.insertAdjacentHTML("beforeend", img);
			});
		}
		
		backgroundBlur();
	}
	

	document.addEventListener("DOMContentLoaded", function(){
		resultPageDecorator();
	});

})(this);
