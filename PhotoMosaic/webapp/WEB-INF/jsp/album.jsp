<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Album page</title>
</head>

<body>
<!-- HEADER -->
<jsp:include page="./include/header.jsp" flush="false" />
<div><p>${sessionScope.email}님의 앨범 페이지 입니둥</p></div> 
<div><p>전체보기</p></div>
</body>
</html>