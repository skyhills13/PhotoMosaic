<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<title>Album page</title>
<link type="text/css" rel="stylesheet" href="/stylesheets/reset.css" />
<link type="text/css" rel="stylesheet" href="/stylesheets/album.css" />
</head>

<body>
	<!-- HEADER -->
	<jsp:include page="./include/header.jsp" flush="false" />

	<section class="albums">
		<div class="positioner">
			<c:choose>
				<c:when test="${empty mosaics}">
					<div class="empty">
						<h1>No albums.</h1>
					</div>
				</c:when>
				<c:otherwise>
					<c:forEach var="mosaic" items="${mosaics}" varStatus="status">
						<div class="album">
							<a href="/result/${mosaic.getUrl()}">
								<img src="/images/${mosaic.getId()}/${mosaic.getFileName()}" />
								<div class="info">
									<h2 class="title">${mosaic.getTitle()}</h2>
								</div>
							</a>
						</div>
					</c:forEach>
				</c:otherwise>
			</c:choose>
			
			<div class="clear"></div>
		</div>
	</section>
	
	<script src="/javascripts/lib/util.js"></script>
	<script src="/javascripts/lib/MyHTMLElement.js"></script>
	<script src="/javascripts/album.js"></script>
</body>
</html>