<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>User Form</title>
</head>

<body>
<form:form modelAttribute="user" cssClass="changeIt" action="/join" method="post">
<p> 이메일 </p>
<form:input path="email" />
<p> 비밀번호 </p>
<form:password path="password" />
<button type="submit">Join </button>
</form:form>

</body>
</html>