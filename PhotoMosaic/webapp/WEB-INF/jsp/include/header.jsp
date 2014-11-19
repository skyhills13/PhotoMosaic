<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link type="text/css" rel="stylesheet" href="/stylesheets/header.css" />
<header>
	<a href="/"><button>MAKE</button></a>
	<c:choose>
		<c:when test="${empty sessionScope.email}">
			<a href="/loginform">
				<button>SIGN IN</button></a>
			<a href="/form">
				<button>SIGN UP</button></a>
		</c:when>
		<c:otherwise>
			<a href="/album/${sessionScope.email}">
				<button>${sessionScope.email}</button></a>
			<a href="/logout">
				<button>SIGN OUT</button></a>
		</c:otherwise>
	</c:choose>
</header>
