/****
 *   Get browser prefix
 */
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

/****
 *   Create multidimensional array
 */
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

/****
 *   Search target object in its array
 *   [{"key": "key1", value: "value1"}, {"key": "key2", value: "value2"}, ... ]
 */
function objectFindByKey(array, key, value) {
	for (var idx = 0; idx < array.length; idx++) {
		if (array[idx][key] === value) {
			return array[idx];
		}
	}
	
	return null;
}

/****
 *   Type check for String
 */
function isString(target) {
	if (typeof strClassName === "undefined"
		|| strClassName === null) {
		return false;
	}
	
	return true;
}

function suffleArray(array) {
	var counter = array.length;
	var temp;
	var index;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}
