<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/header.css">

<link rel="stylesheet" type="text/css" href="/stylesheets/result.css">
</head>
<body>
	<header>
		<a><span>SERVICE</span></a>
		<a><span>USER</span></a>
		<a><span>MAKE</span></a>
	</header>
	<aside>
		<section class="thumbnail">
			<img src="/images/thumbnail.png" />
		</section>
		<section class="info">
			<ul>
				<li>
					<p>subject</p>
					<p>subject value</p>
				</li>
				<li>
					<p>comment</p>
					<p>comment value</p>
				</li>
				<li>
					<p>producer</p>
					<p>producer value</p>
				</li>
				<li>
					<p>date</p>
					<p>date value</p>
				</li>
			</ul>
		</section>
		<section class="share">
			<input type="button" value="share" />
		</section>
	</aside>
	<article id="list">
		<ul>
			<li data-list="0"><img src="/images/bobby.jpg" /></li>
			<li data-list="1"><img src="/images/baemin.jpg" /></li>
			<li data-list="2"><img src="/images/captain.jpg" /></li>
			<li data-list="3"><img src="/images/clan.png" /></li>
			<li data-list="4"><img src="/images/comment.jpg" /></li>
			<li data-list="5"><img src="/images/dog.jpg" /></li>
			<li data-list="6"><img src="/images/pio.jpg" /></li>
			<li data-list="7"><img src="/images/pitcher.jpg" /></li>
		</ul>
	</article>
	<script src="/javascripts/PictureListSlide.js"></script>
</body>
</html>