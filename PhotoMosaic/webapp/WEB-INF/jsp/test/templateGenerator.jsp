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
	
	var templateGenerator = new TemplateGenerator(width, height);

	div.innerHTML += "</ br><p>num of possibleTemplates : " + templateGenerator.possibleTemplates.length + "</p>";
	
	templateGenerator.saveTargetTemplates(targetNum);

	div.innerHTML += "<p>num of targetTemplates(" + targetNum + "): " + templateGenerator.targetTemplates.length + "</p>";
</script>
</body>

</html>
