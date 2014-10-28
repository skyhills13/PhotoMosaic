
function getBrowserPrefix() {
	if (typeof document.body.style.webkitTransition !== "undefined") {
		return "webkit";
	} else if (typeof document.body.style.msTransition !== "undefined") {
		return "ms";
	} else if (typeof document.body.style.MozTransition !== "undefined") {
		return "moz";
	} else if (typeof document.body.style.oTransition !== "undefined") {
		return "o";
	} else {
		return "";
	}
}

