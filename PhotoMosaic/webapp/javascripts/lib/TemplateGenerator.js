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
				idx = row * _width + col;
				
				if (data[idx] !== "x") {
					var ratio = this.counter[data[idx]];
					if (typeof this.counter[data[idx].getRatio()] === "undefined") {
						this.counter[data[idx].getRatio()] = 1;
					} else {
						this.counter[data[idx].getRatio()]++;
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

	constructor.prototype.setData = function(data) {
		this.data = data;
		_countSections.call(this, this.data);
	};

	constructor.prototype.isSimilarWith = function(counter) {
		var property;
		for (property in counter) {
			if (!typeof this.counter[property]) {
				return false;
			}
			
			if (this.counter[property] !== counter[property]) {
				return false;
			}
		}
		
		return true;
	};
	
	constructor.prototype.getStringData = function() {
		var result = [];
		
		for (var idx in this.data) {
			if (this.data[idx] !== "x") {
				result.push(this.data[idx].toString());
				continue;
			}
			
			result.push("x");
		}
		
		return result;
	}
	
	// print는 data을 예쁘게 반환해준다. 디버깅 / 개발용
	// 원래 한 줄 짜리 array라 찍으면 안 예쁘게 나온다.
	constructor.prototype.print = function() {
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
	
	constructor.prototype.getRatio = function(divisionRatio) {
		return this.x / this.y;
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
	
	var _suitableTemplates;
	
	// _init은 객체를 초기화하는 함수이다.
	var _init = function(_unitData) {
		// constructor.tempTemplate
		for (var idx = 0; idx < _width * _height; idx++) {
			_unitData[idx] = 0;
		}

		this.createAllTemplates(_unitData, 0, 0, 0);
	};
	
	// _canInsert는 data의 특정 좌표에 section을 넣을 수 있는지 검사하는 함수이다.
	var _canInsert = function(data, section, startX, startY) {
		if (_width - section.x < startX
				|| _height - section.y < startY) {
			return false;
		}

		for (var row = 0; row < section.y; row++) {
			for (var col = 0; col < section.x; col++) {
				if (data[(startY + row) * _width + startX + col] !== 0) {
					return false;
				}
			}
		}

		return true;
	};

	// _insert는 template의 특정 좌표에 section을 저장하는 함수이다.
	// template을 복사해서 작업하고 반환한다.
	var _insert = function(data, section, startX, startY) {
		// copy by value
		var result = data.concat();

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
	var _isComplete = function(data) {
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if (data[row * _width + col] === 0) {
					return false;
				}
			}
		}

		return true;
	};

	var _zoomSection = function(section, zoomRatio) {
		return new Section(section.x * zoomRatio, section.y * zoomRatio);
	}
	
	var _createSuitableTemplates = function(objRatio) {
		for (var idx in this.templates) {
			if (this.templates[idx].isSimilarWith(objRatio)) {
				_suitableTemplates.push(this.templates[idx]);
			}
		}
		
		// 일치하는 비율이 없으면 다시 돈다.
		if (_suitableTemplates.length <= 1) {
			var ratios = [];
			for (var ratio in objRatio) {
				ratios.push(ratio);
			}
			var min = Math.min.apply(Math, ratios);
			var max = Math.max.apply(Math, ratios);
			
			if (min * max <= 1) {
				if (objRatio[min] <= 1) {
					delete objRatio[min];
				} else {
					objRatio[min]--;
				};
			} else {
				if (objRatio[max] <= 1) {
					delete objRatio[max];
				} else {
					objRatio[max]--;
				};
			}
			
			this.getSuitableTemplates(objRatio);
		}
	};
	
	
	/*
	 * PUBLIC AREA
	 */
	
	// constructor는 constructor다.
	var constructor = function TemplateGenerator(options) {
		_width = (typeof options["width"] !== "undefined") ? options["width"] : 4;
		_height = (typeof options["height"] !== "undefined") ? options["height"] : 4;
		_targetNum = (typeof options["targetNum"] !== "undefined") ? options["targetNum"] : 8;
		
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if ((col + 1) * (row + 1) < _width * _height / 2) {
					_sections.push(new Section(col + 1, row + 1));
				}
			}
		}
		
		console.log(_sections);
		
		_unitData = [];
		_suitableTemplates = [];
		this.templates = [];
		
		_init.call(this, _unitData);
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
	constructor.prototype.createAllTemplates = function(data, startX, startY, count) {
		// End condition
		if (startY === _height) {
			// 모든 section을 모든 좌표에 넣어본 상황.
			// 1. 현재 갯수가 _targetNum이면
			if (count === _targetNum) {
				// 2. possibleTemplate에 현재 template을 저장한다.
				var newTemplate = new Template(_width, _height);
				newTemplate.setData(data);
				this.templates.push(newTemplate);
			}
		
			return ;
		}

		// main logic
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				if (row * _width + col >= _sections.length) {
					break;
				}
				// 1. 생성 가능한 모든 section에 대해
				var section = _sections[row * _width + col];

				// 1-2. 지금 template에 넣을 수 있는지 검사
				if (_canInsert(data, section, startX, startY)) {
					// boundary over: 들어갈 수 있어도 목표한 갯수가 넘어가버린 경우
					if (count + 1 > _targetNum) {
						return;
					}

					// boundary over: 들어갈 수 있어도 목표한 갯수를 채울 수 없는 경우
					if (_width * _height + _targetNum < (count + 1) + (startY * 4 + startX) + 1) {
						return;
					}

					// 1-3. 넣는다.
					var tempTemplate = _insert(data, section, startX, startY);

					// 1-4. 다음 칸에 대한 재귀.
					if (startX + section.x < _width) {
						this.createAllTemplates(tempTemplate, startX + section.x, startY, count + 1);
					} else {
						this.createAllTemplates(tempTemplate, 0, startY + 1, count + 1);
					}
				}
			}
		}
		
		// 2. 해당 칸에 정보가 들어가있다면 다음 칸으로 넘어간다.
		if (data[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.createAllTemplates(data, 0, startY + 1, count);
			} else {
				this.createAllTemplates(data, startX + 1, startY, count);
			}
		}
		// 정보가 없는 경우에는 종료
		// -> 현재 data, startX, startY로 다시 한 번 1을 수행한다.
	};
	
	constructor.prototype.getSuitableTemplates = function(objRatio) {
		_createSuitableTemplates.call(this, objRatio);
		return _suitableTemplates;
	}

	
/*
	// TODO
	constructor.prototype.createSuitableTemplates = function(data, startX, startY, sections, sIdx, zoomRatio) {
		// End condition
		if (startY === _height || sIdx >= _targetNum) {
			if (_isComplete(data)) {
				var newTemplate = new Template(_width, _height);
				newTemplate.setData(data);
				this.templates.push(newTemplate);
			}
		
			return ;
		}

		// 현재 자리에 zoomRatio를 하나씩 증가시키면서 넣어봄.
		var section = _zoomSection(sections[sIdx], zoomRatio);
		if (_canInsert(data, section, startX, startY)) {
			var inserted = _insert(data, section, startX, startY);
			this.createSuitableTemplates(data, startX, startY, sections, sIdx, zoomRatio + 1);

			if (startX === _width - 1) {
				this.createSuitableTemplates(inserted, 0, startY + 1, sections, sIdx + 1, 1);
			} else {
				this.createSuitableTemplates(inserted, startX + 1, startY, sections, sIdx + 1, 1);
			}
		} else {
			if (startX === _width - 1) {
				this.createSuitableTemplates(data, 0, startY + 1, sections, sIdx, 1);
			} else {
				this.createSuitableTemplates(data, startX + 1, startY, sections, sIdx, 1);
			}
		}

		if (data[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.createSuitableTemplates(data, 0, ++startY, sections, sIdx, 1);
			} else {
				this.createSuitableTemplates(data, ++startX, startY, sections, sIdx, 1);
			}
		}

		console.log(data + ", " + section + ", " + startX + ", " + startY);
	};
*/

	return constructor;
})();
