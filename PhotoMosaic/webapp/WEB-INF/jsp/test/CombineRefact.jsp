<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
</head>
<body>
	<p>
		<a>사진보기</a>
	</p>
	<article id="canvas"></article>
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
	<script src="/javascripts/lib/PhotoCombine.js"></script>
	<script>
		window.addEventListener("load",
				function() {
					var pppp = document.querySelectorAll("article#list ul li img");

					var t = [
							[ "1x1", "1x1", "1x4", "1x4", "1x1", "1x1", "x", "x", "2x1", "x", "x", "x", "2x1", "x",
									"x", "x" ],
							[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x",
									"x", "x" ],
							[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1",
									"x", "x" ],
							[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1",
									"2x1", "x" ],
							[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x",
									"1x1" ],
							[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x",
									"1x1" ],
							[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x",
									"x", "x" ],
							[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1",
									"x", "x" ],
							[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1",
									"2x1", "x" ],
							[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x",
									"1x1" ] ];

					var rand = parseInt(Math.random() * 10);
					var tArray = t[rand];
/* 					var testArr = [ "1x1", "1x1", "1x4", "1x4", "1x1", "1x1", "x", "x", "2x1", "x", "x", "x", "2x1", "x",
					      									"x", "x" ];
 */
					var testArr = tArray;
					var pArray = document.querySelectorAll("#list img");
					var appendPlace = document.querySelector("#canvas");
					var sevenPhotoTemplate = ["1x1", "2x2", "x", "1x2", "1x2", "x", "x", "x", "x", "3x1", "x", "x", "2x1", "x", "2x1","x"];
					var opt = new PhotoCombine(true);
					
					var canvas1 = opt.create(pArray, {
						"width" : 500,
						"height" : 500,
						"template" : sevenPhotoTemplate, // 필수항목
						"column" : 4, // 필수항목
						"row" : 4 // 필수항목
					}, "canvas1");
					appendPlace.appendChild(canvas1);
					
					var ord = new PhotoCombine(false);
					var canvas2 = ord.create(pArray, {
						"width" : 500,
						"height" : 500,
						"template" : testArr, // 필수항목
						"column" : 4, // 필수항목
						"row" : 4 // 필수항목
					}, "canvas1");
					
					appendPlace.appendChild(canvas2);
					// return <canvas></canvas>
					
/* 					var combine = new PhotoCombine();
					combine.getMaterial({
						"mWidth" : 500,
						"mHeight" : 500,
						"templateArray" : testArr,
						"templateColumn" : 4, // getWidth
						"templateRow" : 4, // getHeight
						"photoArray" : pArray, // HTMLImgElement
						"appendPlace" : appendPlace
					});
					combine.createWithOptimize();
 */ 					//var result = combine.getResult();
					//document.querySelector("p a").addEventListener("click", function() {
					//	window.location = result;
					//});
				});
</script>

</body>
</html>