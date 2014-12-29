
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
		var parameter = event.data[targetFunction];
		result[targetFunction] = self.methods[targetFunction](parameter);
		self.postMessage(result);
	}
});

self.methods = {};

// FOR TEST
self.methods.toString = function toString(target) {
	return target.toString();
};

/**
 * This is main method
 */
self.methods.toDataURL = function toDataURL(file) {
	var reader = new FileReaderSync();
	return reader.readAsDataURL(file);
};

