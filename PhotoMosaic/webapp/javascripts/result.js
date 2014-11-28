document.addEventListener("DOMContentLoaded", function(){
	resultPageDecorator();
});

function resultPageDecorator(){
	var photoList = document.querySelectorAll("#list ul li img.original");
	(function backgroundChange(){
		var random = parseInt(Math.random()*(photoList.length-1));
		var source = photoList[random].src;
		
		var bg = document.querySelector("body");
//		bg.style.backgroundImage = "url(" + source + ")";
	})();
}