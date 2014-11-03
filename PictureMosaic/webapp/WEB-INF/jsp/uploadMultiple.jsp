<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>select page</title>
</head>
<body>
	<form method="POST" action="uploadMultipleFile" enctype="multipart/form-data">
		File1 to upload: <input type="file" name="file" multiple><br /> 
        <input type="submit" value="Upload"> Press here to upload the file!
	</form>
</body>
</html>