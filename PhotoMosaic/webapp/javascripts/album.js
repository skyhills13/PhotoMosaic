(function() {
	var eleBody = document.querySelector("body"); //ele 라고 하지 않고 보통 elBody라고 많이 함. 
	
	var eleHeader = document.querySelector("header");
	var eleAlbums = document.querySelector(".albums");
	
	//비슷한 리뷰인데.. 비슷한 이벤트 핸들러를 통합하고 event type으로 구분할 수도 있다는 거.기억바람. 
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
