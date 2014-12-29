
self.addEventListener("message", function(event) {
	var param = event.data;
	postMessage([testGlobalVariable(), param]);
});

var idx = 0;

function testTreatObj(obj) {
	for (var key in obj) {
		obj[key]++;
	}
	
	return obj;
}

function testGlobalVariable() {
	return idx++;
}
