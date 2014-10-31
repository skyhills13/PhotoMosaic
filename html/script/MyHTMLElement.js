/****
 *   HTMLElement의 prototype에 함수 추가
 */

/* NATIVE 객체에 이렇게 추가하는 건 위험한 것이라고 했으니, 알고 사용하기.
   개발자가 직접 추가한 것이라고 알아볼 수 있게 이름을 짓는 건 어떨까? 독특하게?
  */
HTMLElement.prototype.getStyleValue = function(strStyle) {
	return window.getComputedStyle(this.node).getPropertyValue(strStyle);
};

HTMLElement.prototype.hasClassName = function(strClassName) {
	// 공백문자라던가, 숫자타입이라던가  뭐 그런경우는 오류가 아닌가? 
	if (typeof strClassName == "undefined"
			|| strClassName == null) {
		//실제 서비스코드에서 console.log로 출력하면 사용자 브라우저에 출력되는 것임으로 console.log는 지워줘야 함. console객체에 log메서드 말고 다른것도 있던데.. 
		//그런 더 의미있는 메서드를 사용하는 건 어때? 
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

HTMLElement.prototype.appendClassName = function(strClassName) {
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

	// 추가하려는 className이 이미 존재하는 경우
	if (this.hasClassName(strClassName)) {
		return ;
	}

	// 기존에 className가 있는 경우 공백문자를 추가하여 넣어줍니다
	this.className += " " + strClassName;
};

HTMLElement.prototype.removeClassName = function(strClassName) {
	//type 체크를 반복적으로 계속 하고 잇지? 타입을 인자로 받아서 체크해주는 메서드같은거 나중에 만들면 좋을 듯. 
	if (typeof strClassName == "undefined"
			|| strClassName == null) {
		console.log("removeClassName: Missing className to remove");
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

