<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
</head>
<body>
	<p><a>사진보기</a></p>
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
			var canvasT8 = combine.create(photoArray, {
				"width" : 500,
				"height" : 500,
				"template" : template8, // 필수항목
				"column" : 4, // 필수항목
				"row" : 4 // 필수항목
			}, "t8");
			appendPlace.appendChild(canvasT8);
		
			var canvasT7 = combine.create(photoArray, {
				"width" : 500,
				"height" : 500,
				"template" : template7, // 필수항목
				"column" : 4, // 필수항목
				"row" : 4 // 필수항목
			}, "t8");
			appendPlace.appendChild(canvasT7);

		
		
		
			
			var result = combine.getResult();
			document.querySelector("p a").addEventListener("click", function() {
				window.location = result;
			});
		});
	</script>
</body>
</html>