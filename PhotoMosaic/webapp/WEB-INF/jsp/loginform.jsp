<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login Form</title>
</head>

<body>
<form:form modelAttribute="user" cssClass="changeIt" action="/login" method="post">
<p> 이메일 </p>
<form:input path="email" />
<form:errors path="email" cssClass="error" />
<p> 비밀번호 </p>
<form:password path="password" />
<form:errors path="password" cssClass="error" />
<c:if test="${not empty errorMessage}">
<div class="error">${errorMessage}</div>
</c:if>
<button type="submit">Login </button>
</form:form>

</body>
</html>