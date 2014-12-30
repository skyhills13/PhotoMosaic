<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>가입하기</title>
<link rel="stylesheet" type="text/css" href="/stylesheets/reset.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/login.css">
<link rel="stylesheet" type="text/css" href="/stylesheets/guide.css">
</head>

<body>
	<jsp:include page="./include/header.jsp" flush="false" />
	<div id="example">
		<ul>
			<li><img src="/images/example/result1.jpeg" /></li>
			<li><img src="/images/example/result2.jpeg" /></li>
			<li><img src="/images/example/result3.jpeg" /></li>
			<li><img src="/images/example/result4.jpeg" /></li>
			<li><img src="/images/example/result5.jpeg" /></li>
			<li><img src="/images/example/result6.jpeg" /></li>
		</ul>
	</div>

	<article class="join">
		<div>
			<section class="welcome">
				<p>
					<span>Nice to see new faces</span>
				</p>
				<p>
					<span>make Mosaic, share Photo</span>
				</p>
			</section>
			<form:form modelAttribute="user" cssClass="changeIt" action="/join"
				method="post">
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
						<c:if test="${errorMessage != null}">
							<span class="showError">${errorMessage}</span>
						</c:if>
						<form:errors path="password" cssClass="password showError" />
					</p>
				</div>
				<button type="submit">SIGN UP</button>
			</form:form>
		</div>

	</article>
</body>
</html>