<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE HTML>

<html>

<head>
	<meta charset="UTF-8" />
	<title>Choose Pictures</title>

	<link type="text/css" rel="stylesheet" href="/stylesheets/reset.css" />
	<link type="text/css" rel="stylesheet" href="/stylesheets/select.css" />
</head>

<body>

<!-- HEADER -->
<header class="header">
	<div class="logo">서비스 로고</div>
	<div class="user">유저 정보</div>
</header>

<!-- SELECT PICTURES -->
<section class="select">
<form class="positioner" method="POST" action="photo" enctype="multipart/form-data">
	<article class="contents">
		<header>
			<section>
				<input type="text" name="title" placeholder="Title" />
			</section>
			<section>
				<input type="text" name="subtitle" placeholder="Subtitle"/>
			</section>
		</header>
		<div class="hoverLine"></div>
		<article class="pictures" data-drag="true">
			<div class="positioner" data-drag="true"></div>
		</article>
	</article>
	<section class="controll">
		<div class="inputFile">
			<div>Add Photo</div>
			<input type="file" name="pictures" multiple accept="image/*" />
		</div>
		<input class="button" type="submit" value="Upload"></input>
	</section >
</form>
</section>

<script src="/javascripts/util.js"></script>
<script src="/javascripts/MyHTMLElement.js"></script>
<script src="/javascripts/MultiFileHandler.js"></script>
<script>
	var eleInput = document.querySelector(".controll input[type=file]");
	var eleBody = document.querySelector("body");
	var eleDrag = document.querySelector(".pictures");

	this.fileHandler = new MultiFileHandler(
			[eleInput, eleBody],
			[imgCb]);


	function imgCb(file) {
		// Only process image files.
		if (!file.type.match('image.*')) {
			return ;
		}

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(file) {
			return function(event) {
				// Render thumbnail.
				var image = document.createElement("img");

				image.appendClassName("thumb");
				image.setAttribute("src", event.target.result);
				image.setAttribute("title", escape(file.name));
				image.setAttribute("draggable", false);
				image.setAttribute("data-drag", true);

				eleDrag.querySelector(".positioner")
						.insertBefore(image, null);
			};
		})(file);

		// Read in the image file as a data URL.
		reader.readAsDataURL(file);
	}
</script>

</body>

</html>
