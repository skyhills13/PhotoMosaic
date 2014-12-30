<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link type="text/css" rel="stylesheet" href="/stylesheets/header.css" />
<header>
	<div id="headerWrapper">
		<a href="/"><button>
				<span class="logo">PPOMO</span>
			</button></a> <a href="/"><button>
				<span>MAKE</span>
			</button></a>
		<c:choose>
			<c:when test="${empty sessionScope.email}">
				<div class="noneUser">
					<a href="/loginform">
						<button>
							<span>SIGN IN</span>
						</button><!--  --></a>
					<a href="/form">
						<button>
							<span>SIGN UP</span>
						</button>
					</a>
				</div>
			</c:when>
			<c:otherwise>
				<div class="existUser">
					<button>${sessionScope.email}</button>
					<div class="popUpBox">
						<a href="/album/${sessionScope.userId}">
							<button>
								<span>MY ALBUM</span>
							</button>
						</a> <a href="/logout">
							<button>
								<span>SIGN OUT</span>
							</button>
						</a>
					</div>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</header>
