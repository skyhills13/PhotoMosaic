var utils = {
	getStyle: function(eleNode, strStyle) {
		return window.getComputedStyle(eleNode).getPropertyValue(strStyle);
	},

	appendClassName: function(eleNode, strClassName) {
		if (eleNode == null) {
			console.log("appendClassName: Target node not found");
			return ;
		}
		if (typeof strClassName == "undefined"
				|| strClassName == null) {
			console.log("appendClassName: Missing className to append");
			return ;
		}

		// 기존에 className가 없던 경우
		if (eleNode.className === "") {
			eleNode.className = strClassName;
			return ;
		}

		// eleNode에 className가 존재하는 경우
		if (eleNode.className.toString().search(strClassName) !== -1) {
			return ;
		}

		// 기존에 className가 있는 경우 공백문자를 추가하여 넣어줍니다
		eleNode.className += " " + strClassName;
	},

	hasClassName: function(eleNode, strClassName) {
		if (eleNode == null) {
			console.log("Target node not found");
			return false;
		}

		if (typeof strClassName == "undefined"
				|| strClassName == null) {
			console.log("Missing className to search");
			return false;
		}

		// 기존에 className가 없는 경우 함수를 종료합니다
		if (eleNode.className === "") {
			return false;
		}

		if (eleNode.className.toString().search(strClassName) !== -1) {
			return true;
		}
	},

	removeClassName: function(eleNode, strClassName) {
		if (eleNode == null) {
			console.log("removeClassName: Target node not found");
			return ;
		}

		if (typeof strClassName == "undefined"
				|| strClassName == null) {
			console.log("removeClassName: Missing className to remove");
			return ;
		}

		// 기존에 className가 없는 경우 함수를 종료합니다
		if (eleNode.className === "") {
			return ;
		}

		// eleNode에 className이 존재하고, target className 하나만 있는 경우
		if (eleNode.className.length === strClassName.length) {
			eleNode.className = "";
			return ;
		}

		// eleNode에 className가 다수 존재하는 경우의 target className 삭제
		// eleNode.className에 replace 결과물을 대입합니다.
		eleNode.className =
			eleNode.className.replace(" " + strClassName, "").toString();
	},

	getBrowserPrefix: function() {
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
	},
};

