<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE HTML>

<html>

<head>
	<meta charset="UTF-8" />
	<title>Choose Pictures</title>

	<link type="text/css" rel="stylesheet" href="/stylesheets/reset.css" />
	<link type="text/css" rel="stylesheet" href="/stylesheets/select.css" />
	<link type="text/css" rel="stylesheet" href="/stylesheets/header.css" />
</head>

<body>

<!-- HEADER -->
<jsp:include page="header.jsp" flush="false" />

<!-- SELECT PICTURES -->
<section class="select">
<div class="positioner">
	<article class="contents">
		<header>
			<section>
				<input type="text" name="title" placeholder="Title" />
			</section>
			<section>
				<input type="text" name="contents" placeholder="Contents"/>
			</section>
		</header>
		<div class="hoverLine" data-draghover="true"></div>
		<article class="pictures" data-draghover="true">
			<div class="positioner" data-draghover="true"></div>
		</article>
	</article>
	<section class="controll">
		<div class="inputFile">
			<div>Add Photo</div>
			<input type="file" multiple accept="image/*" />
		</div>
		<button class="button">Upload</button>
	</section >
</div>
</section>

<script src="/javascripts/util.js"></script>
<script src="/javascripts/MyHTMLElement.js"></script>
<script src="/javascripts/MultiFileHandler.js"></script>
<script src="/javascripts/select.js"></script>

</body>

</html>
