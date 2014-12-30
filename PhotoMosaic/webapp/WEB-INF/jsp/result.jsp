<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/stylesheets/font.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/result.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/lightbox.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/Range2Range.css">
<link rel="image_src" href="/images/${mosaic.id}/${mosaic.fileName}" />
<meta name="title" content="PPOMO in NHN NEXT" />
<meta name="description" content="make mosaic and share photo" />

<title>${mosaic.title} :: PPOMO</title>
</head>
<body>
	<!-- light box 구간 -->
	<div id="lightBoxWrapper" class="show">
		<article class="lightBox represent show">
			<input type="button" value="X" class="showingHandler">
			<section class="info">
				<h1>
					<c:choose>
						<c:when test="${mosaic.title!=null}">
							${mosaic.title}
						</c:when>
						<c:otherwise>
							cannot find title
						</c:otherwise>
					</c:choose>
				</h1>
				<div>
				<c:choose>
					<c:when test="${mosaic.fileName!=null}">
						<img class="mosaic" src="/images/${mosaic.id}/${mosaic.fileName}" />
					</c:when>
					<c:otherwise>
						<img class="mosaic" src="/images/button/no_image_thumb.gif" />
					</c:otherwise>
				</c:choose>
				</div>
			</section>
		</article>
		
		<article class="lightBox slide hide">
			<input type="button" value="X" class="showingHandler">
			<div class="photos">
				<section class="previous preset">
					<div><img class="original" src=""/></div>
				</section>
				<section class="current">
					<div><img class="original" src=""/></div>
				</section>
				<section class="next preset">
					<div><img class="original" src=""/></div>
				</section>
			</div>
			<nav>
				<div></div>
				<section>
					<input type="range" min="0" max="${fn:length(mosaic.getPhotos())-1}">
				</section>
			</nav>
		</article>
	
	</div>
	
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
 		</aside>
		<article id="list">
			<ul>
				<c:forEach items="${mosaic.getPhotos()}" var="photo" varStatus="status">
					<li class="container" data-list="${status.index}">
						<div class="background slideButton" style="background-image: url('/images/${mosaic.id}/${photo.getUniqueId()}');">
							<img class="original" src="/images/${mosaic.id}/${photo.getUniqueId()}" />
						</div>
					</li>
				</c:forEach>
			</ul>
		</article>

	</div>
	<script src="/javascripts/result/StackBlurCanvas.js"></script>
	<script src="/javascripts/result/result.js"></script>
	<script src="/javascripts/result/LightBox.js"></script>
	<script src="/javascripts/result/RepresentPhoto.js"></script>
	<script src="/javascripts/result/PhotoSlide.js"></script>
</body>
</html>