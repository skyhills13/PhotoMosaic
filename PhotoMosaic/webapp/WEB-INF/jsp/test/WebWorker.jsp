<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>WebWorker Test</title>
</head>

<body>
	<script>
		// TEST WORKER
		var testObj = {
			"1x1": 1,
			"2x2": 2,
			"3x3": 3
		};

		var workerList = [];
		for (var idx = 0; idx < 5; idx++) {
			workerList.push(new Worker("/javascripts/test/WebWorker.js"));
			workerList[idx].addEventListener("message", function(event) {
				console.log(event.data);
			});
			
			workerList[idx].postMessage(idx);
		}
		
		
		function setTestObj(obj) {
			this.testObj = obj;
		}
		
		// REAL WORKER
		var selectWorker = new Worker("/javascripts/select_worker.js");
		selectWorker.addEventListener("message", function(event) {
			var returnFunction = Object.keys(event.data)[0];
			var result = event.data[returnFunction];
			
			console.log(result);
		});
		
		selectWorker.postMessage({"toString": 123});
		
		
		
	</script>
</body>
</html>