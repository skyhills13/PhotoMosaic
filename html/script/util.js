/****
 *   모든 Node에 쓸 수 있는 util 함수들.
 *   Node Constructor의 prototype에 추가되어있음.
 */

Node.constructor.prototype.getStyle = function(strStyle) {
	return window.getComputedStyle(this).getPropertyValue(strStyle);
};

Node.constructor.prototype.hasClassName = function(strClassName) {
	if (typeof strClassName == "undefined"
			|| strClassName == null) {
		console.log("hasClassName: Missing className to search");
		return false;
	}

	// 기존에 className가 없는 경우 함수를 종료합니다
	if (this.className === "") {
		return false;
	}

	// className이 없으면 false를 반환하고 함수 종료
	if (this.className.toString().search(strClassName) == -1) {
		return false;
	}

	return true;
};

Node.constructor.prototype.appendClassName = function(strClassName) {
	if (typeof strClassName == "undefined"
			|| strClassName == null) {
		console.log("appendClassName: Missing className to append");
		return ;
	}

	// 기존에 className가 없던 경우
	if (this.className === "") {
		this.className = strClassName;
		return ;
	}

	// this에 추가하려는 className이 이미 존재하는 경우
	if (this.hasClassName(strClassName)) {
		return ;
	}

	// 기존에 className가 있는 경우 공백문자를 추가하여 넣어줍니다
	this.className += " " + strClassName;
};

Node.constructor.prototype.removeClassName = function(strClassName) {
	if (typeof strClassName == "undefined"
			|| strClassName == null) {
		console.log("removeClassName: Missing className to remove");
		return ;
	}

	// 기존에 className가 없는 경우 함수를 종료합니다
	if (this.className === "") {
		return ;
	}

	// this에 className이 존재하고, target className 하나만 있는 경우
	if (this.className.length === strClassName.length) {
		this.className = "";
		return ;
	}

	// this에 className가 다수 존재하는 경우의 target className 삭제
	// this.className에 replace 결과물을 대입합니다.
	this.className =
			this.className.replace(" " + strClassName, "").toString();
};

function getBrowserPrefix() {
	if (typeof document.body.style.webkitTransition !== "undefined") {
		return "webkit";
	} else if (typeof document.body.style.msTransition !== "undefined") {
		return "ms";
	} else if (typeof document.body.style.MozTransition !== "undefined") {
		return "moz";
	} else if (typeof document.body.style.oTransition !== "undefined") {
		return "o";
	} else {
		return "";
	}
}

