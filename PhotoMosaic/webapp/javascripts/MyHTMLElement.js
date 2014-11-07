/****
 *   TOOL: HTMLElement의 prototype에 함수 추가
 */

HTMLElement.prototype.getStyleValue = function(strStyle) {
	return window.getComputedStyle(this.node).getPropertyValue(strStyle);
};

HTMLElement.prototype.hasClassName = function(strClassName) {
	if (isString(strClassName)) {
		console.error("hasClassName: Missing className to search");
		return false;
	}

	// 기존에 className가 없는 경우 함수를 종료합니다
	if (this.className === "") {
		return false;
	}

	var regExp = new RegExp("\\b" + strClassName + "\\b");
	
	// className이 없으면 false를 반환하고 함수 종료
	if (this.className.toString().search(regExp) === -1) {
		return false;
	}

	return true;
};

HTMLElement.prototype.appendClassName = function(strClassName) {
	if (isString(strClassName)) {
		console.error("appendClassName: Missing className to append");
		return ;
	}

	// 기존에 className가 없던 경우
	if (this.className === "") {
		this.className = strClassName;
		return ;
	}

	// 추가하려는 className이 이미 존재하는 경우
	if (this.hasClassName(strClassName)) {
		return ;
	}

	// 기존에 className가 있는 경우 공백문자를 추가하여 넣어줍니다
	this.className += " " + strClassName;
};

HTMLElement.prototype.removeClassName = function(strClassName) {
	if (isString(strClassName)) {
		console.error("removeClassName: Missing className to remove");
		return ;
	}

	// 기존에 className가 없는 경우 함수를 종료합니다
	if (this.className === "") {
		return ;
	}

	// className이 존재하고, target className 하나만 있는 경우
	if (this.className.length === strClassName.length) {
		this.className = "";
		return ;
	}

	// className가 다수 존재하는 경우의 target className 삭제
	// className에 replace 결과물을 대입합니다.
	this.className =
			this.className.replace(" " + strClassName, "").toString();
};

