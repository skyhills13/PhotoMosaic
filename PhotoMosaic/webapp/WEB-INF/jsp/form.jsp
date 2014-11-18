<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Join</title>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/login.css">
</head>

<body>
	<jsp:include page="./include/header.jsp" flush="false" />
	<article>
		<form:form modelAttribute="user" cssClass="changeIt" action="/join"
			method="post">
			<p><span>EMAIL</span>
			<form:input path="email" />
			<form:errors path="email" cssClass="error" />
			</p>
			<p><span>PASSWORD</span>
			<form:password path="password" />
			<form:errors path="password" cssClass="error" />
			</p>
			<button type="submit">Join</button>
		</form:form>

	</article>
</body>
</html>