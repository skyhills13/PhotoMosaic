<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE HTML>

<html>

<head>
	<meta charset="UTF-8" />
</head>

<body>
<div>
	<h1>TEST For getSuitableTemplates</h1>
</div>
<article id="list">
	<ul>
		<li data-list="0"><img src="/images/test/A0.jpg" /></li>
		<li data-list="1"><img src="/images/test/A1.jpg" /></li>
		<li data-list="2"><img src="/images/test/A2.jpg" /></li>
		<li data-list="3"><img src="/images/test/pngtest1.png" /></li>
		<li data-list="4"><img src="/images/test/A3.jpg" /></li>
		<li data-list="5"><img src="/images/test/C0.jpg" /></li>
		<li data-list="6"><img src="/images/test/pngtest2.png" /></li>
		<li data-list="7"><img src="/images/test/B0.jpg" /></li>
		<li data-list="8"><img src="/images/test/C2.jpg" /></li>
		<li data-list="9"><img src="/images/test/C3.jpg" /></li>
		<li data-list="10"><img src="/images/test/pngtest3.png" /></li>
		</ul>
</article>

<script src="/javascripts/lib/util.js"></script>
<script src="/javascripts/lib/MyHTMLElement.js?20141112"></script>
<script src="/javascripts/lib/MultiFileHandler.js?20141112"></script>
<script src="/javascripts/lib/PhotoCombine.js"></script>
<script src="/javascripts/lib/TemplateGenerator.js"></script>
<script>
window.addEventListener("load", function() {
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
	
	var pArray = document.querySelectorAll("#list img");
	var pChecked = PhotoChecker(pArray);
	
	var objRatios = {};
	for (var idx in pChecked.simpleRatioList) {
		var size = pChecked.simpleRatioList[idx].simpleRatio.split("x");
		var ratio = size[0] / size[1];
		
		if (typeof objRatios[ratio] === "undefined") {
			objRatios[ratio] = 1;
		} else {
			objRatios[ratio]++;
		}
	}
	
	var suitableTemplates = templateGenerator.getSuitableTemplate(objRatios);
	var tArray = suitableTemplates[parseInt(Math.random() * suitableTemplates.length)];
	
	var idx;
	var similarTemplate = "<pre>";
	for (var row = 0; row < tArray.getHeight(); row++) {
		for (var col = 0; col < tArray.getWidth(); col++) {
			idx = row * tArray.getWidth() + col;
			if (tArray.data[idx].length === 3) {
				similarTemplate += tArray.data[idx] + "	";
			} else {
				similarTemplate += "	" + tArray.data[idx] + "	";
			}
		}
		
		similarTemplate += "<br />";
	}
	similarTemplate += "</pre>";
	
	div.innerHTML += similarTemplate;
});
</script>
</body>

</html>
