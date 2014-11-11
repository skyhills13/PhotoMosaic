/****
 *   LIB: TemplateGenerator & Template
 */

var Template = (function() {
	/*
	 * PRIVATE AREA
	 */
	
	var _width;
	var _height;
	
	var _countNumOfEachSection = function(template) {
		var idx = 0;
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				idx = row * _width + col
				if (template[idx] !== "x") {
					if (typeof this.numOfEachSection[template[idx]] === "undefined") {
						this.numOfEachSection[template[idx]] = 1;
					} else {
						this.numOfEachSection[template[idx]]++;
					}
				}
			}
		}
	};
	
	
	/*
	 * PUBLIC AREA
	 */
	
	var constructor = function(width, height) {
		_width = (typeof width !== "undefined") ? width : 4;
		_height = (typeof height !== "undefined") ? height : 4;
		
		this.template;
		this.numOfEachSection = {};
	};
	
	constructor.prototype.getTemplate = function() {
		return _template;
	};
	
	constructor.prototype.setTemplate = function(template) {
		this.template = template;
		_countNumOfEachSection.call(this, this.template);
	};
	
	// printTemplate은 template을 예쁘게 반환해준다.
	// 원래 한 줄 짜리 array라 찍으면 안 예쁘게 나온다.
	constructor.prototype.printTemplate = function() {
		var result = "";

		var idx;
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				idx = row * _width + col;
				if (this.template[idx].length === 3) {
					result += this.template[idx] + " ";
				} else {
					result += " " + this.template[idx] + "  ";
				}
			}
			
			result += "\n";
		}

		return result;
	};
	
	constructor.prototype.getNumOfEachSection = function() {
		return this.numOfEachSection;
	}

	// _getNumSections는 targetTemplate이 몇 개의 section으로 이루어져 있는지 반환하는 함수이다.
	constructor.prototype.sumNumOfEachSection = function() {
		var num = 0;
		for (var section in this.numOfEachSection) {
			num += this.numOfEachSection[section];
		}
		
		return num;
	};
	
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
	
	// _sections는 현재 _width, _height에서 대입 가능한 모든 section을 담고 있는 array이다.
	//  section은 template를 이루는 기본 단위이다. string 형태로 정보를 저장한다. "1x2", "3x2" 처럼 표시된다
	var _sections = [];
	
	// _init은 객체를 초기화하는 함수이다.
	var _init = function() {
		// constructor.tempTemplate
		for (var idx = 0; idx < _width * _height; idx++) {
			this.tempTemplate[idx] = 0;
		}

		this.savePossibleTemplates(this.tempTemplate, 0, 0);
	};
	
	// _canInsert는 template의 특정 좌표에 section을 넣을 수 있는지 검사하는 함수이다.
	var _canInsert = function(template, section, startX, startY) {
		if (typeof section !== "string") {
			console.error("_isPossible: Type of input section is wrong");
			return false;
		}
		
		var sectionSize = section.split("x");

		var sectionWidth = sectionSize[0];
		var sectionHeight = sectionSize[1];

		if (_width - sectionWidth < startX
				|| _height - sectionHeight < startY) {
			return false;
		}

		for (var row = 0; row < sectionHeight; row++) {
			for (var col = 0; col < sectionWidth; col++) {
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
		if (typeof section !== "string") {
			console.error("_insert: Type of input section is wrong");
			return false;
		}

		// copy by value
		var result = template.concat();

		var sectionSize = section.split("x");

		var sectionWidth = sectionSize[0];
		var sectionHeight = sectionSize[1];

		for (var row = 0; row < sectionHeight; row++) {
			for (var col = 0; col < sectionWidth; col++) {
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
	
	
	/*
	 * PUBLIC AREA
	 */
	
	// constructor는 constructor다.
	var constructor = function(width, height) {
		_width = (typeof width !== "undefined") ? width : 4;
		_height = (typeof height !== "undefined") ? height : 4;
		
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				_sections.push( (col + 1) + "x" + (row + 1) );
			}
		}
		
		this.tempTemplate = [];
		this.possibleTemplates = [];
		this.targetTemplates = [];
		
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
	
	// savePossibleTemplates는 possibleTemplate에 생성 가능한 template을 모두 저장하는 함수이다.
	constructor.prototype.savePossibleTemplates = function(template, startX, startY) {
		// End condition
		if (startY === _height) {
			// 모든 section을 모든 좌표에 넣어본 상황.
			// 1. template이 빈 칸 없이 완성되었다면,
			if (_isComplete(template)) {
				// 2. possibleTemplate에 현재 template을 저장한다.
				// this.possibleTemplates.push(template.concat());
				var newTemplate = new Template(_width, _height);
				newTemplate.setTemplate(template.concat());
				
				this.possibleTemplates.push(newTemplate);
			}
		
			return ;
		}
		
		// Main logic
		for (var row = 0; row < _height; row++) {
			for (var col = 0; col < _width; col++) {
				// 1. 생성 가능한 모든 section에 대해
				var section = _sections[row * _width + col];
				var tempTemplate;
		
				// 1-2. 지금 template에 넣을 수 있는지 검사하고
				if (_canInsert(template, section, startX, startY)) {
					// 1-3. 가능하면 넣는다.
					tempTemplate = _insert(template, section, startX, startY);

					// 1-4. 현재 좌표가 column의 마지막 좌표이면
					if (startX === _width - 1) {
						// 1-4-1. row를 하나 증가, column은 0으로 실행.
						this.savePossibleTemplates(tempTemplate, 0, startY + 1);
					} else {
						// 1-4-2. 아니면 column을 하나 증가해서 실행.
						this.savePossibleTemplates(tempTemplate, startX + 1, startY);
					}
				}
			}
		}
		// 여기까지는 section크기를 계속 증가시키면서 "넣을 수 있으면 넣고, 아님 말고" 하는 식으로 채워넣은 것.
		// 즉 큰 section에 대해 연산하고 있었으면 빈 칸이 생길 수 있다.
		
		// 2. 다음 칸에 대해 1을 반복해서 수행한다.
		if (template[startY * _width + startX] !== 0) {
			if (startX === _width - 1) {
				this.savePossibleTemplates(template, 0, ++startY);
			} else {
				this.savePossibleTemplates(template, ++startX, startY);
			}
		}
	};
	
	// saveTargetTemplates는 원하는 section 갯수를 가진 template만 찾아 targetTemplates에 저장하는 함수이다.
	constructor.prototype.saveTargetTemplates = function(numSections) {
		for (var idx = 0; idx < this.possibleTemplates.length; idx++) {
			if (this.possibleTemplates[idx].sumNumOfEachSection() === numSections) {
				this.targetTemplates.push(this.possibleTemplates[idx]);
			}
		}
	};

	return constructor;
})();
