<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Album page</title>
	<link type="text/css" rel="stylesheet" href="/stylesheets/reset.css" />
	<style>
		section {
			position: relative;
			top: 70px;
		}
	</style>
</head>

<body>
	<!-- HEADER -->
	<jsp:include page="./include/header.jsp" flush="false" />

	<section>
		<%-- <div>
			<p>${sessionScope.email}님의앨범페이지입니둥</p>
		</div> --%>

		<c:forEach var="mosaic" items="${mosaics}" varStatus="status">
			<img src="/images/${mosaic.getId()}/${mosaic.getFileName()}" />
		</c:forEach>
	</section>
</body>
</html>