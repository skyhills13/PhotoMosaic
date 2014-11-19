<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Sign In</title>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/login.css">

</head>

<body>
	<jsp:include page="./include/header.jsp" flush="false" />
	<article>
		<section class="welcome">
			<p>
				<span> pleased to meet you </span>
			</p>
		</section>

		<form:form modelAttribute="user" cssClass="changeIt" action="/login"
			method="post">

			<div>
				<p>
					<span>EMAIL</span>
					<form:input path="email" />
					<form:errors path="email" cssClass="error email" />
				</p>
				<p>
					<span>PASSWORD</span>
					<form:password path="password" />
					<form:errors path="password" cssClass="error password" />
					<c:if test="${not empty errorMessage}">
						<span class="error email nouser">${errorMessage}</span>
					</c:if>
				</p>
			</div>
			<button type="submit">SIGN IN</button>
		</form:form>
	</article>
</body>
</html>