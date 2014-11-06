<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

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
<form:form modelAttribute="mosaic" cssClass="positioner" method="post" action="/test" enctype="multipart/form-data">
	<article class="contents">
		<header>
			<section>
				<form:input path="title" type="text" placeholder="Title" />
			</section>
			<section>
				<form:input path="content" type="text" placeholder="content"/>
			</section>
		</header>
		<article class="pictures">
			<div class="positioner"></div>
		</article>
	</article>
	<section class="controll">
		<form:input path="photos" type="file" />
		<input type="submit" value="Upload"></input>
	</section >
</form:form>
</section>

<script src="/javascripts/util.js"></script>
<script src="/javascripts/MyHTMLElement.js"></script>
<script src="/javascripts/MultiFileHandler.js"></script>
<script>
	var eleInput = document.querySelector(".controll input[type=file]");
	var eleDrag = document.querySelector(".pictures");

	this.fileHandler = new MultiFileHandler(
			[eleInput, eleDrag],
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
