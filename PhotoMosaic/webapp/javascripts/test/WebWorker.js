
self.addEventListener("message", function(event) {
	if (typeof event.data !== "undefined") {
		var obj = event.data;
		postMessage(testTreatObj(obj));
	}
});

function testTreatObj(obj) {
	for (var key in obj) {
		obj[key]++;
	}
	
	return obj;
}

