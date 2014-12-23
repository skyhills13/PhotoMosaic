
/*
 * event.data === {"targetFunction": /parameters/};
 */
self.addEventListener("message", function(event) {
	var result = {};
	if (typeof event.data !== "object") {  //typeof 는 array도 object 라고 나오고..생각보다 많은 부분이 object라고 나옴. 정확한 타입체크는 toString.call()을 많이 사용. 
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

self.functions = {}; //인간적으로 functions과 같은 이름은 예약어 같으니 쓰지말자.

self.functions.toString = function toString(target) {
	return target.toString();
}

