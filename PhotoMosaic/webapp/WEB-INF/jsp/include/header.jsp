<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link type="text/css" rel="stylesheet" href="/stylesheets/header.css" />
<header>
	<a href="/"><button><span>MAKE</span></button></a>
	<c:choose>
		<c:when test="${empty sessionScope.email}">
			<a href="/loginform">
				<button><span>SIGN IN</span></button></a>
			<a href="/form">
				<button><span>SIGN UP</span></button></a>
		</c:when>
		<c:otherwise>
			<a href="/album/${sessionScope.email}">
				<button><span>${sessionScope.email}</span></button></a>
			<a href="/logout">
				<button><span>SIGN OUT</span></button></a>
		</c:otherwise>
	</c:choose>
</header>
