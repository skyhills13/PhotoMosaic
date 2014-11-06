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
<header>
	<a><span>SERVICE</span></a>
	<a><span>USER</span></a>
	<a><span>MAKE</span></a>
</header>

<!-- SELECT PICTURES -->
<form class="request" method="GET" action="/result"></form>
<section class="select">
<div class="positioner">
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
