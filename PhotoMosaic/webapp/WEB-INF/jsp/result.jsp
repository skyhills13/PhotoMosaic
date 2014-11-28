<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%-- <%@ page isELIgnored="false" %> --%>
<link rel="stylesheet" type="text/css" href="/stylesheets/font.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/result.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/lightbox.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/Range2Range.css">
<title>show mosaic</title>
</head>
<body>
	<article id="lightBox" class="thumbnail">
		<input type="button" value="X"></input>
	</article>
	<div id="header">
	<jsp:include page="./include/header.jsp" flush="false" />
	</div>
	<div id="wrapper">
		<aside>
			<section class="title">
			<c:choose>
				<c:when test="${mosaic.title!=null}">
					<p>${mosaic.title}</p>
				</c:when>
				<c:otherwise>
					<p>cannot find title</p>
				</c:otherwise>
			</c:choose>
			</section>
			<section class="thumbnail">
				<c:choose>
					<c:when test="${mosaic.fileName!=null}">
						<img id="mosaic" src="/images/${mosaic.id}/${mosaic.fileName}" />
					</c:when>
					<c:otherwise>
						<img id="mosaic" src="/images/button/no_image_thumb.gif" />
					</c:otherwise>
				</c:choose>
			</section>
			<section class="info">
				<ul>
					<li>
						<c:choose>
							<c:when test="${mosaic.comment!=null}">
								<p>${mosaic.comment}</p>
							</c:when>
							<c:otherwise>
								<p>cannot find comment</p>
							</c:otherwise>
						</c:choose>
					</li>
					<li>
						<c:choose>
							<c:when test="${requestScope.producer!=null}">
								<p>${requestScope.producer}</p>
							</c:when>
							<c:otherwise>
								<p>anonymous</p>
							</c:otherwise>
						</c:choose>
					</li>
					<li>
						<c:choose>
							<c:when test="${mosaic.createdDate!=null}">
								<p>${mosaic.createdDate}</p>
							</c:when>
							<c:otherwise>
								<p>cannot find date</p>
							</c:otherwise>
						</c:choose>
					</li>
				</ul>
			</section>
<!-- 			<section class="share">
				<input type="button" value="share" />
			</section>
 -->		</aside>
		<article id="list">
			<ul>
				<c:forEach var="photo" items="${mosaic.getPhotos()}" varStatus="status">
					<li class="container" data-list="${status.index}"  style="background-image: url(/images/${mosaic.id}/${photo.getUniqueId()});">
						<img class="original" src="/images/${mosaic.id}/${photo.getUniqueId()}" />
					</li>
				</c:forEach>
			</ul>
		</article>

	</div>
	
	<script src="/javascripts/StackBlurCanvas.js"></script>
	<script src="/javascripts/RangeBar.js"></script>
	<script src="/javascripts/PhotoListSlide.js"></script>
	<script src="/javascripts/ShareTool.js"></script>
	<script src="/javascripts/PhotoLightBox.js"></script>
	<script src="/javascripts/result.js"></script>

	<script>
		document.addEventListener("DOMContentLoaded", function() {
			var mosaic = document.querySelector("img#mosaic");
			var comments = document.querySelector("aside section.title p").innerHTML;
			var lightbox = document.querySelector("article#lightBox");

			new PhotoLightBox(lightbox, mosaic, [ comments ], function() {
				//for ul li img.original
				var listWrapper = document.querySelector("article#list ul");
				new PhotoListSlide(listWrapper, lightBox);
			});

			var sButton = document.querySelector("section.share input[type='button']");
			var sTool = new ShareTool();
			sTool.URL(sButton);
		});
	</script>
</body>
</html>