<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%-- <%@ page isELIgnored="false" %> --%>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/result.css">
<title>show mosaic</title>
</head>
<body>
	<article id="lightBox"></article>
	<jsp:include page="header.jsp" flush="false" />
	<aside>
		<section class="thumbnail">
			<img id="mosaic" src="/images/thumbnail.png" />
		</section>
		<section class="info">
			<ul>
				<li>
					<p>subject</p> 
					<p>${mosaic.title}</p>
					<%-- <c:choose>
						<c:when test="${requestScope.subject!=null}">
							<p>${requestScope.subject}</p>
						</c:when>
						<c:otherwise>
							<p>test subject</p>
						</c:otherwise>
					</c:choose> --%>
				</li>
				<li>
					<p>comment</p> 
					<p>${mosaic.comment}</p>
					<%-- <c:choose>
						<c:when test="${requestScope.comment!=null}">
							<p>${requestScope.comment}</p>
						</c:when>
						<c:otherwise>
							<p>test value</p>
						</c:otherwise>
					</c:choose> --%>
				</li>
				<li>
					<p>producer</p> <c:choose>
						<c:when test="${requestScope.producer!=null}">
							<p>${requestScope.producer}</p>
						</c:when>
						<c:otherwise>
							<p>anonymous</p>
						</c:otherwise>
					</c:choose>
				</li>
				<li>
					<p>date</p> <c:choose>
						<c:when test="${requestScope.date!=null}">
							<p>${requestScope.date}</p>
						</c:when>
						<c:otherwise>
							<p>test value</p>
						</c:otherwise>
					</c:choose>
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
	<script src="/javascripts/PhotoListSlide.js?20141112"></script>
	<script src="/javascripts/ShareTool.js?20141112"></script>
	<script src="/javascripts/PhotoLightBox.js?20141112"></script>
	<script>
		document
				.addEventListener(
						"DOMContentLoaded",
						function() {
							var mosaic = document.querySelector("img#mosaic");
							var originalImages = document
									.querySelectorAll("article#list ul li img");
							var comment = document
									.querySelector("aside section.info ul li:nth-child(1) p:nth-child(2)").innerHTML;
							var lightBox = document
									.querySelector("article#lightBox");

							new PhotoLightBox(lightBox, mosaic, [ comment ]);
							//new PhotoListSlide(originalImages, lightBox);

							var sButton = document
									.querySelector("section.share input[type='button']");
							var sTool = new ShareTool();
							sTool.URL(sButton);
						});
	</script>
</body>
</html>