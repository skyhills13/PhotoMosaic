<!DOCTYPE HTML>

<html>

<head>
	<meta charset="UTF-8" />
</head>

<body>
<div>
	<h1>TEST For TemplateGenerator</h1>
</div>

<script src="/javascripts/lib/util.js"></script>
<script src="/javascripts/lib/TemplateGenerator.js"></script>
<script>
	var div = document.querySelector("div");

	var width = 4;
	var height = 4;
	var targetNum = 8;
	
	div.innerHTML += "<p>width : " + width + "</p>";
	div.innerHTML += "<p>height: " + height + "</p>";
	
	var options = {
		width: 4,
		height: 4,
		targetNum: 8
	};
	
	var templateGenerator = new TemplateGenerator(options);

	div.innerHTML += "</ br><p>length of allTemplates : " + templateGenerator.templates.length + "</p>";
</script>
</body>

</html>
