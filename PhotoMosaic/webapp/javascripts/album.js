(function() {
	var eleBody = document.querySelector("body");
	
	var eleHeader = document.querySelector("header");
	var eleAlbums = document.querySelector(".albums");
	
	eleHeader.addEventListener("mouseenter", function(event) {
		var prefix = getBrowserPrefix();
		var strTransform = "";
		if (prefix === "moz" || prefix === "") {
			strTransform = "transform";
		} else {
			strTransform = prefix + "Transform";
		}
		eleAlbums.style[strTransform] = "translate3d(0px, 15px, 0px)";
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
		eleAlbums.style[strTransform] = "";
	});
	
	eleHeader.addEventListener("animationend", function(event) {
		eleBody.style.overflow = "";
	});
	
})();