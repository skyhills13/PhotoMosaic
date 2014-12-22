
/*
 * event.data === {"targetFunction": /parameters/};
 */
self.addEventListener("message", function(event) {
	var result = {};
	if (typeof event.data !== "object") {
		result["error"] = -1;
		postMessage(result);
		return ;
	}
	
	for (var targetFunction in event.data) {
		var parameters = event.data[targetFunction];
		result[targetFunction] = self.functions[targetFunction](parameters);
		postMessage(result);
	}
});

self.functions = {};

self.functions.toString = function toString(target) {
	return target.toString();
}

