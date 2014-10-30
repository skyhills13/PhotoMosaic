
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

function createArray(/* 1d size, 2d size, 3d size, ... */) {
	var array = new Array(arguments[0] || 0);

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		var firstArg = arguments[0];

		while(firstArg--) {
			array[(arguments[0] - 1) - firstArg]
					= createArray.apply(this, args);
		}
	}

	return array;
}

