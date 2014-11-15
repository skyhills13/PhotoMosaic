<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>User Form</title>
</head>

<body>
<form action="/login" method="post">
<lable> 이메일 </lable>
<input type ="text" name="email" />
<lable> 비밀번호 </lable>
<input type ="password" name="password" />
<button type="submit">Login </button>
</form>

</body>
</html>