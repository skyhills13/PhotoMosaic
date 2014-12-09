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
	<section class="hidden"></section>
	
	<!-- HEADER -->
	<jsp:include page="./include/header.jsp" flush="false" />
	
	<!-- SELECT PICTURES -->
	<section class="select">
	<div class="positioner">
		<article class="contents">
			<header>
				<section>
					<input type="text" name="title" placeholder="Title" />
				</section>
				<section>
					<input type="text" name="comment" placeholder="Comment"/>
				</section>
			</header>
			<div class="hoverLine" data-draghover="true">
				<div class="info">
					<img src="/images/button/image.png" />
					<div>
						<p>Drag images here</p>
						<p>or</p>
						<p>Click [Add Photo]</p>
					</div>
				</div>
			</div>
			<article class="pictures" data-draghover="true">
				<div class="positioner" data-draghover="true"></div>
			</article>
		</article>
		<section class="controll">
			<div class="button inputFile">
				<div class="value">Add Photo</div>
				<input type="file" multiple accept="image/*" />
			</div>
			<button class="button">Upload</button>
			<button class="serverButton" style="margin-left: 70px; width: 110px;">Server</button>
		</section >
	</div>
	</section>
	
	<script src="/javascripts/lib/util.js?20141112"></script>
	<script src="/javascripts/lib/MyHTMLElement.js?20141112"></script>
	<script src="/javascripts/lib/MultiFileHandler.js?20141112"></script>
	<script src="/javascripts/lib/PhotoCombine.js"></script>
	<script src="/javascripts/lib/TemplateGenerator.js"></script>
	<script src="/javascripts/select.js?20141112"></script>

</body>

</html>
