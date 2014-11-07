/****
 *   LIB: LayoutTemplate
 */

var LayoutGenerator = (function(){
	/*
	 * PRIVATE AREA
	 */
	
	// _width와 _height는 layout의 가로, 세로에 몇 개의 section이 들어갈지 설정하는 값이다.
	//  입력값이 없을 경우 각각 4로 초기화 된다.
	var _width;
	var _height;
	
	// _units는 현재 _width, _height에서 대입 가능한 모든 unit을 담고 있는 array이다.
	//  unit은 section을 이루는 단위이다. string 형태로 정보를 저장한다. "1x2", "3x2" 처럼 표시된다
	var _units = [];
	
	// _init은 객체를 초기화하는 함수이다.
	var _init = function() {
		// constructor.tmpLayout
		for (var idx = 0; idx < _width * _height; idx++) {
			this.tmpLayout[idx] = 0;
		}

		this.savePossibleLayouts(this.tmpLayout, 0, 0);
	};
	
	// _canInsert는 layout의 특정 좌표에 unit을 넣을 수 있는지 검사하는 함수이다.
	var _canInsert = function(layout, unit, startX, startY) {
		if (typeof unit !== "string") {
			console.error("_isPossible: Type of input unit is wrong");
			return false;
		}
		
		var unitSize = unit.split("x");

		var unitWidth = unitSize[0];
		var unitHeight = unitSize[1];

		if (_width - unitWidth < startX
				|| _height - unitHeight < startY) {
			return false;
		}

		for (var row = 0; row < unitHeight; row++) {
			for (var col = 0; col < unitWidth; col++) {
				if (layout[(startY + row) * _width + startX + col] !== 0) {
					return false;
				}
			}
		}

		return true;
	};

	// _insert는 layout의 특정 좌표에 unit을 저장하는 함수이다.
	// layout을 복사해서 작업하고 반환한다.
	var _insert = function(layout, unit, startX, startY) {
		if (typeof unit !== "string") {
			console.error("_insert: Type of input unit is wrong");
			return false;
		}

		// copy by value
		var result = layout.concat();

		var unitSize = unit.split("x");

		var unitWidth = unitSize[0];
		var unitHeight = unitSize[1];

		for (var row = 0; row < unitHeight; row++) {
			for (var col = 0; col < unitWidth; col++) {
				if (row === 0 && col === 0) {
					result[startY * _width + startX] = unit;
					continue;
				}

				result[(startY + row) * _width + startX + col] = "x";
			}
		}

		return result;
	};
	
	// _isComplete는 layout이 빈칸 없이 완성되었는지를 판별하는 함수이다.
	var _isComplete = function(layout) {
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if (layout[row * _width + col] === 0) {
					return false;
				}
			}
		}

		return true;
	};
	
	// _getNumSections는 targetLayout이 몇 개의 section으로 이루어져 있는지 반환하는 함수이다.
	var _getNumSections = function(targetLayout) {
		var numSections = targetLayout.length;

		for (var idx = 0; idx < targetLayout.length; idx++) {
			if (targetLayout[idx] === "x") {
				numSections--;
			}
		}

		return numSections;
	};

	
	
	/*
	 * PUBLIC AREA
	 */
	
	// constructor는 constructor다. 더 할 말이 없다.
	// 사실 _units를 init하는 역할도 맡는다. _init에 넣고 싶었으나, scope 문제로... ㅠㅠ
	// 더 깔끔한 방법이 있으면 수정 바람.
	var constructor = function(width, height) {
		_width = (typeof width !== "undefined") ? width : 4;
		_height = (typeof height !== "undefined") ? height : 4;
		
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				_units.push( (col + 1) + "x" + (row + 1) );
			}
		}
		
		this.tmpLayout = [];
		this.possibleLayouts = [];
		this.targetLayouts = [];
		
		_init.call(this);
	};
	
	// getWidth는 _width를 반환한다.
	constructor.prototype.getWidth = function() {
		return _width;
	};
	
	// getHeight는 _height를 반환한다.
	constructor.prototype.getHeight = function() {
		return _height;
	};
	
	// printLayout은 layout을 예쁘게 반환해준다.
	// 원래 한 줄 짜리 array라 찍으면 안 예쁘게 나온다.
	constructor.prototype.printLayout = function(layout) {
		if (typeof layout === "undefined") {
			var layout = this.tmpLayout;
		}

		var result = "";

		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if (layout[row * _width + col].length === 3) {
					result += layout[row * _width + col] + " ";
				} else {
					result += " " + layout[row * _width + col] + "  ";
				}
			}
			result += "\n";
		}

		return result;
	};
	
	// savePossibleLayouts는 possibleLayout에 생성 가능한 layout을 모두 저장하는 함수이다.
	constructor.prototype.savePossibleLayouts = function(layout, startX, startY) {
		// End condition
		if (startY === _height) {
			// 모든 unit을 모든 좌표에 넣어본 상황.
			// 1. layout이 빈 칸 없이 완성되었다면,
			if (_isComplete(layout)) {
				// 2. possibleLayout에 현재 layout을 저장한다.
				this.possibleLayouts.push(layout.concat());
			}
		
			return ;
		}
		
		// Main logic
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				// 1. 생성 가능한 모든 unit에 대해
				var unit = _units[row * _width + col];
				var tmpLayout;
		
				// 1-2. 지금 layout에 넣을 수 있는지 검사하고
				if (_canInsert(layout, unit, startX, startY)) {
					// 1-3. 가능하면 넣는다.
					tmpLayout = _insert(layout, unit, startX, startY);

					// 1-4. 현재 좌표가 column의 마지막 좌표이면
					if (startX === _width - 1) {
						// 1-4-1. row를 하나 증가, column은 0으로 실행.
						this.savePossibleLayouts(tmpLayout, 0, startY + 1);
					} else {
						// 1-4-2. 아니면 column을 하나 증가해서 실행.
						this.savePossibleLayouts(tmpLayout, startX + 1, startY);
					}
				}
			}
		}
		// 여기까지는 unit크기를 계속 증가시키면서 "넣을 수 있으면 넣고, 아님 말고" 하는 식으로 채워넣은 것.
		// 즉 큰 unit에 대해 연산하고 있었으면 빈 칸이 생길 수 있다.
		
		// 2. 다음 칸에 대해 1을 반복해서 수행한다.
		if (layout[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.savePossibleLayouts(layout, 0, ++startY);
			} else {
				this.savePossibleLayouts(layout, ++startX, startY);
			}
		}
	};
	
	// saveTargetLayouts는 원하는 section 갯수를 가진 layout만 찾아 targetLayout에 저장하는 함수이다.
	constructor.prototype.saveTargetLayouts = function(numSections) {
		var num = 0;
		for (var idx = 0; idx < this.possibleLayouts.length; idx++) {
			if (_getNumSections(this.possibleLayouts[idx]) === numSections) {
				this.targetLayouts.push(this.possibleLayouts[idx]);
				num++;
			}
		}
		
		return num;
	};

	return constructor;
})();
