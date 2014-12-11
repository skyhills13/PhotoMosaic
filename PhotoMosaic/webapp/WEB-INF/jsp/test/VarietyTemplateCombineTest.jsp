<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>Variety Template Combine Test</title>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
</head>
<body>
	<h1>다양한 템플릿에 사진 합치기</h1>
	<article id="canvas">
	</article>
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
	<script src="/javascripts/lib/TemplateGenerator.js"></script>
	<script src="/javascripts/lib/PhotoCombine.js"></script>
	<script src="/javascripts/test/ForTestTemplate.js"></script>
	<!-- <script src="/javascripts/PhotoChecker.js"></script> -->
	<script>
		window.addEventListener("load", function() {
			var photoArray = document.querySelectorAll("#list img");
			var appendPlace = document.querySelector("#canvas");
			
	
			var combine = new PhotoCombine(true);
			var t8c4r4Canvas = combine.create(photoArray, {
				"width" : 200,
				"height" : 200,
				"template" : t8c4r4, // 필수항목
				"column" : 4, // 필수항목
				"row" : 4 // 필수항목
			}, "t8c4r4");
			appendPlace.appendChild(t8c4r4Canvas);
			appendPlace.insertAdjacentHTML("beforeend", "<p>photo 8 / column 4 / row 4</p><br><br>");
		
			var t7c4r4Canvas = combine.create(photoArray, {
				"width" : 200,
				"height" : 200,
				"template" : t7c4r4, // 필수항목
				"column" : 4, // 필수항목
				"row" : 4 // 필수항목
			}, "t7c4r4");
			appendPlace.appendChild(t7c4r4Canvas);
			appendPlace.insertAdjacentHTML("beforeend", "<p>photo 7 / column 4 / row 4 </p><br><br>");
			
			var t5c3r3Canvas = combine.create(photoArray, {
				"width" : 200,
				"height" : 200,
				"template" : t5c3r3, // 필수항목
				"column" : 3, // 필수항목
				"row" : 3 // 필수항목
			}, "t5c3r3");
			appendPlace.appendChild(t5c3r3Canvas);
			appendPlace.insertAdjacentHTML("beforeend", "<p>photo 5 / column 3 / row 3 </p><br><br>");
		});
	</script>
</body>
</html>