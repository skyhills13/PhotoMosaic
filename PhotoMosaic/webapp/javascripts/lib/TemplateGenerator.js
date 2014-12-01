/****
 *   LIB: TemplateGenerator & Template
 */

var Template = (function() {
	/*
	 * PRIVATE AREA
	 */
	
	var _width;
	var _height;
	
	var _countSections = function(data) {
		var idx = 0;
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				idx = row * _width + col
				if (data[idx] !== "x") {
					if (typeof this.counter[data[idx]] === "undefined") {
						this.counter[data[idx]] = 1;
					} else {
						this.counter[data[idx]]++;
					}
				}
			}
		}
	};
	
	
	/*
	 * PUBLIC AREA
	 */
	
	var constructor = function Template(width, height) {
		_width = (typeof width !== "undefined") ? width : 4;
		_height = (typeof height !== "undefined") ? height : 4;
		
		this.data;
		this.counter = {};
	};
	
	// getWidth는 _width를 반환한다.
	constructor.prototype.getWidth = function() {
		return _width;
	};
	
	// getHeight는 _height를 반환한다.
	constructor.prototype.getHeight = function() {
		return _height;
	}
	
	constructor.prototype.getTemplate = function() {
		return this.data;
	};
	
	constructor.prototype.setTemplate = function(data) {
		this.data = data;
		_countSections.call(this, this.data);
	};
	
	// printTemplate은 data을 예쁘게 반환해준다.
	// 원래 한 줄 짜리 array라 찍으면 안 예쁘게 나온다.
	constructor.prototype.printTemplate = function() {
		var result = "";

		var idx;
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				idx = row * _width + col;
				if (this.data[idx].length === 3) {
					result += this.data[idx] + " ";
				} else {
					result += " " + this.data[idx] + "  ";
				}
			}
			
			result += "\n";
		}

		return result;
	};
	
	constructor.prototype.getCounter = function() {
		return this.counter;
	};

	constructor.prototype.sumCounter = function() {
		var num = 0;
		for (var section in this.counter) {
			num += this.counter[section];
		}
		
		return num;
	};
	
	return constructor;
})();

var Section = (function() {
	var constructor = function Section(x, y) {
		this.x = x;
		this.y = y;
	};
	
	constructor.prototype.toString = function() {
		return this.x + "x" + this.y;
	}
	
	return constructor;
})();

var TemplateGenerator = (function(){
	/*
	 * PRIVATE AREA
	 */
	
	// _width와 _height는 template의 가로, 세로에 몇 개의 section이 들어갈지 설정하는 값이다.
	//  입력값이 없을 경우 각각 4로 초기화 된다.
	var _width;
	var _height;
	
	var _targetNum;
	var _unitData;
	
	// _sections는 현재 _width, _height에서 대입 가능한 모든 section을 담고 있는 array이다.
	//  section은 template를 이루는 기본 단위이다. string 형태로 정보를 저장한다. "1x2", "3x2" 처럼 표시된다
	var _sections = [];
	
	// _init은 객체를 초기화하는 함수이다.
	var _init = function(_unitData) {
		// constructor.tempTemplate
		for (var idx = 0; idx < _width * _height; idx++) {
			_unitData[idx] = 0;
		}

		//var sections = ["1x1", "1x1", "1x1", "2x1", "2x1", "2x1", "1x2", "1x2"];
		this.createAllTemplates(_unitData, 0, 0, 0);
		//this.createSuitableTemplates(_unitData, 0, 0, sections, 0, 1);
	};
	
	// _canInsert는 template의 특정 좌표에 section을 넣을 수 있는지 검사하는 함수이다.
	var _canInsert = function(template, section, startX, startY) {
		if (_width - section.x < startX
				|| _height - section.y < startY) {
			return false;
		}

		for (var row = 0; row < section.y; row++) {
			for (var col = 0; col < section.x; col++) {
				if (template[(startY + row) * _width + startX + col] !== 0) {
					return false;
				}
			}
		}

		return true;
	};

	// _insert는 template의 특정 좌표에 section을 저장하는 함수이다.
	// template을 복사해서 작업하고 반환한다.
	var _insert = function(template, section, startX, startY) {
		// copy by value
		var result = template.concat();

		for (var row = 0; row < section.y; row++) {
			for (var col = 0; col < section.x; col++) {
				if (row === 0 && col === 0) {
					result[startY * _width + startX] = section;
					continue;
				}

				result[(startY + row) * _width + startX + col] = "x";
			}
		}

		return result;
	};
	
	// _isComplete는 template이 빈칸 없이 완성되었는지를 판별하는 함수이다.
	var _isComplete = function(template) {
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if (template[row * _width + col] === 0) {
					return false;
				}
			}
		}

		return true;
	};

	var _zoomSection = function(section, zoomRatio) {
		return new Section(section.x * zoomRatio, section.y * zoomRatio);
	}
	
	
	/*
	 * PUBLIC AREA
	 */
	
	// constructor는 constructor다.
	var constructor = function TemplateGenerator(width, height, targetNum) {
		_width = (typeof width !== "undefined") ? width : 4;
		_height = (typeof height !== "undefined") ? height : 4;
		_targetNum = (typeof targetNum !== "undefined") ? targetNum : 8;
		
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				_sections.push(new Section(col + 1, row + 1));
			}
		}
		
		console.log(_sections);
		
		_tempTemplate = [];
		this.templates = [];
		this.count = 0;
		
		_init.call(this, _tempTemplate);
	};
	
	// getWidth는 _width를 반환한다.
	constructor.prototype.getWidth = function() {
		return _width;
	};
	
	// getHeight는 _height를 반환한다.
	constructor.prototype.getHeight = function() {
		return _height;
	};
	
	constructor.prototype.getTargetNum = function() {
		return _targetNum;
	}
	
	// savePossibleTemplates는 possibleTemplate에 생성 가능한 template을 모두 저장하는 함수이다.
	constructor.prototype.createAllTemplates = function(template, startX, startY, count) {
		// End condition
		if (startY === _height) {
			// 모든 section을 모든 좌표에 넣어본 상황.
			// 1. 현재 갯수가 _targetNum이면
			if (count === _targetNum) {
				// 2. possibleTemplate에 현재 template을 저장한다.
				var newTemplate = new Template(_width, _height);
				newTemplate.setTemplate(template);
				this.templates.push(newTemplate);
			}
		
			return ;
		}

		// main logic
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				// 1. 생성 가능한 모든 section에 대해
				var section = _sections[row * _width + col];

				// 1-2. 지금 template에 넣을 수 있는지 검사
				if (_canInsert(template, section, startX, startY)) {
					// boundary over: 들어갈 수 있어도 목표한 갯수가 넘어가버린 경우
					if (count + 1 > _targetNum) {
						return;
					}

					// boundary over: 들어갈 수 있어도 목표한 갯수를 채울 수 없는 경우
					if (_width * _height + _targetNum < (count + 1) + (startY * 4 + startX) + 1) {
						return;
					}

					// 1-3. 넣는다.
					var tempTemplate = _insert(template, section, startX, startY);

					if (startX + section.x < _width) {
						this.createAllTemplates(tempTemplate, startX + section.x, startY, count + 1);
					} else {
						this.createAllTemplates(tempTemplate, 0, startY + 1, count + 1);
					}
				}
			}
		}
		
		// 2. 해당 칸에 정보가 들어가있다면 다음 칸으로 넘어간다.
		if (template[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.createAllTemplates(template, 0, startY + 1, count);
			} else {
				this.createAllTemplates(template, startX + 1, startY, count);
			}
		}
		// 정보가 없는 경우에는 종료
		// -> 현재 template, startX, startY로 다시 한 번 1을 수행한다.
	};

	// TODO
	constructor.prototype.createSuitableTemplates = function(template, startX, startY, sections, sIdx, zoomRatio) {
		// End condition
		if (startY === _height || sIdx >= _targetNum) {
			if (_isComplete(template)) {
				var newTemplate = new Template(_width, _height);
				newTemplate.setTemplate(template);
				this.templates.push(newTemplate);
			}
		
			return ;
		}

		// 현재 자리에 zoomRatio를 하나씩 증가시키면서 넣어봄.
		var section = _zoomSection(sections[sIdx], zoomRatio);
		if (_canInsert(template, section, startX, startY)) {
			var inserted = _insert(template, section, startX, startY);
			this.createSuitableTemplates(template, startX, startY, sections, sIdx, zoomRatio + 1);

			if (startX === _width - 1) {
				this.createSuitableTemplates(inserted, 0, startY + 1, sections, sIdx + 1, 1);
			} else {
				this.createSuitableTemplates(inserted, startX + 1, startY, sections, sIdx + 1, 1);
			}
		} else {
			if (startX === _width - 1) {
				this.createSuitableTemplates(template, 0, startY + 1, sections, sIdx, 1);
			} else {
				this.createSuitableTemplates(template, startX + 1, startY, sections, sIdx, 1);
			}
		}

		if (template[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.createSuitableTemplates(template, 0, ++startY, sections, sIdx, 1);
			} else {
				this.createSuitableTemplates(template, ++startX, startY, sections, sIdx, 1);
			}
		}

		console.log(template + ", " + section + ", " + startX + ", " + startY);
	};

	return constructor;
})();
