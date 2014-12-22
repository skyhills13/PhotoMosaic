<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>WebWorker Test</title>
</head>
<body>
	<script>
	/*
		var testWorker = new Worker("/javascripts/test/WebWorker.js");
		testWorker.onmessage = function(event) {
			console.log(event.data);
		}
		testWorker.postMessage(testObj);
		var testObj = {
			"1x1": 1,
			"2x2": 2,
			"3x3": 3
		};
	*/
		
		var selectWorker = new Worker("/javascripts/select_worker.js");
		selectWorker.addEventListener("message", function(event) {
			console.log(event.data);
		});
		
		selectWorker.postMessage({"toString": 123});
		
		
		
	</script>
</body>
</html>