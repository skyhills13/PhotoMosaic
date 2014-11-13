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
			<li data-list="0"><img src="/images/test/test1.jpg" /></li>
			<li data-list="1"><img src="/images/test/test2.png" /></li>
			<li data-list="2"><img src="/images/test/test3.jpg" /></li>
			<li data-list="3"><img src="/images/test/test4.jpg" /></li>
			<li data-list="4"><img src="/images/test/test5.jpg" /></li>
			<li data-list="5"><img src="/images/test/test6.png" /></li>
			<li data-list="6"><img src="/images/test/test7.jpg" /></li>
			<li data-list="7"><img src="/images/test/test8.jpg" /></li>
		</ul>
	</article>
	<script src="/javascripts/lib/util.js"></script>
	<script src="/javascripts/lib/TemplateGenerator.js"></script>
	<script src="/javascripts/lib/PhotoCombine.js"></script>
	<script>
		window.addEventListener("load", function() {
			// var tg = new TemplateGenerator();
			// tg.saveTargetTemplates(8);
			// var random = parseInt(Math.random()*1000);
			// var tArray = tg.targetTemplates[random].template;
		
			var t = [ [ "1x1", "1x1", "1x4", "1x4", "1x1", "1x1", "x", "x", "2x1", "x", "x", "x", "2x1", "x", "x", "x" ],
					[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
					[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
					[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
					[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ] ];
		
			var tArray = t[parseInt(Math.random() * 10)];
		
			var pArray = document.querySelectorAll("#list img");
			var appendPlace = document.querySelector("#canvas");
		
			var combine = new PhotoCombine();
			combine.getMaterial({
				"mWidth" : 1000,
				"mHeight" : 800,
				"templateArray" : tArray,
				"templateColumn" : 4, // getWidth
				"templateRow" : 4, // getHeight
				"photoArray" : pArray, // HTMLImgElement
				"appendPlace" : appendPlace
			});
			combine.create();
			var result = combine.getResult();
			document.querySelector("p a").addEventListener("click", function() {
				window.location = result;
			});
		});
	</script>
</body>
</html>