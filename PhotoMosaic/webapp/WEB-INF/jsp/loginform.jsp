<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>로그인 하기</title>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/login.css">

</head>

<body>
	<jsp:include page="./include/header.jsp" flush="false" />
	<article>
		<div>
		<section class="welcome">
			<p>
				<span>내가 만든 모자이크를 확인하기 위해서는 로그인 해주세요.</span>
			</p>
		</section>

		<form:form modelAttribute="user" cssClass="changeIt" action="/login" method="post">
			<div>
				<p>
					<span>EMAIL</span>
					<form:input path="email" />
				</p>
				<p>
					<span>PASSWORD</span>
					<form:password path="password" />
				</p>
				<p class="errorMessage">
					<form:errors path="email" cssClass="email showError" />
					<form:errors path="password" cssClass="password showError" />
					<c:if test="${not empty errorMessage}">
						<span class="showError">${errorMessage}</span>
					</c:if>
				</p>
			</div>
			<button type="submit">SIGN IN</button>
		</form:form>
		</div>
	</article>
</body>
</html>