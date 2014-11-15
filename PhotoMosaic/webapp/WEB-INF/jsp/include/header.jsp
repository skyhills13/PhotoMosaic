<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link type="text/css" rel="stylesheet" href="/stylesheets/header.css" />
<header>
	<a href="/"><span>MAKE</span></a> 
	<c:choose>
		<c:when test="${empty sessionScope.email}"> 
	<a href="/loginform"><span>SIGN IN</span></a>
	<a href="/form"><span>JOIN</span></a>
	</c:when>
	<c:otherwise>
		<a><span>${sessionScope.email}</span></a>
		<a href="/logout"><span>SIGN OUT</span></a>
	</c:otherwise>
	</c:choose>
</header>
