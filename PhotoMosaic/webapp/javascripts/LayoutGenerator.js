/****
 *   LIB: LayoutTemplate
 */

var LayoutGenerator = (function(){
	/*
	 * VARIABLES
	 */
	
	// PRIVATE
	
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
	
	var _getNumSections = function(targetLayout) {
		var numSections = targetLayout.length;

		for (var idx = 0; idx < targetLayout.length; idx++) {
			if (targetLayout[idx] === "x") {
				numSections--;
			}
		}

		return numSections;
	};

	

	// PUBLIC AREA
	
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
	
	constructor.prototype.getWidth = function() {
		return _width;
	};
	
	constructor.prototype.getHeight = function() {
		return _height;
	};
	
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
	
	constructor.prototype.savePossibleLayouts = function(layout, startX, startY) {
		if (startY === _height) {
			if (_isComplete(layout)) {
				this.possibleLayouts.push(layout.concat());
			}
		
			return ;
		}
		
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				var unit = _units[row * _width + col];
				var tmpLayout;
		
				if (_canInsert(layout, unit, startX, startY)) {
					tmpLayout = _insert(layout, unit, startX, startY);
					if (startX === _width - 1) {
						this.savePossibleLayouts(tmpLayout, 0, startY + 1);
					} else {
						this.savePossibleLayouts(tmpLayout, startX + 1, startY);
					}
				}
			}
		}
		
		if (layout[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.savePossibleLayouts(layout, 0, ++startY);
			} else {
				this.savePossibleLayouts(layout, ++startX, startY);
			}
		}
	};
	
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
