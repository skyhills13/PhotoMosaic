/****
 *   LIB: LayoutTemplate
 */
function LayoutTemplate(width, height) {
	this.width = (typeof width !== "undefined") ? width : 4;
	this.height = (typeof height !== "undefined") ? height : 4;

	this.layout = createArray(this.height * this.width);

	// for ... in 문은 내부에 컨텐츠가 있어야 쓸 수 있다.
	// (undefined 가 들어있는 배열은 사용할 수 없다)
	for (var row = 0; row < this.height; row++) {
		for (var col = 0; col < this.width; col++) {
			this.layout[row * this.width + col] = 0;
		}
	}

	this.allLayouts = [];
	this.targetLayouts = [];

	this._init();
}

LayoutTemplate.prototype._init = function() {
	if (typeof this.units === "undefined") {
		this.units = createArray(this.height * this.width);

		for (var row = 0; row < this.height; row++) {
			for (var col = 0; col < this.width; col++) {
				this.units[row * this.width + col] = (col + 1) + "x" + (row + 1);
			}
		}
	}

	this.printAllPossibleLayouts(this.layout, 0, 0);
};

LayoutTemplate.prototype.units;

LayoutTemplate.prototype.insert = function(unit, startX, startY) {
	if (this._isPossible(this.layout, unit, startX, startY)) {
		this._insert(this.layout, unit, startX, startY);
		return true;
	} else {
		return false;
	}
};

LayoutTemplate.prototype._isPossible = function(layout, unit, startX, startY) {
	var unitSize = unit.split("x");

	if (unitSize.length <= 1 || typeof unit !== "string") {
		return false;
	}

	var unitWidth = unitSize[0];
	var unitHeight = unitSize[1];

	if (this.width - unitWidth < startX
			|| this.height - unitHeight < startY) {
		return false;
	}

	for (var row = 0; row < unitHeight; row++) {
		for (var col = 0; col < unitWidth; col++) {
			if (layout[(startY + row) * this.width + startX + col] !== 0) {
				return false;
			}
		}
	}

	return true;
};

LayoutTemplate.prototype._insert = function(layout, unit, startX, startY) {
	var result = layout.concat();

	var unitSize = unit.split("x");

	var unitWidth = unitSize[0];
	var unitHeight = unitSize[1];

	for (var row = 0; row < unitHeight; row++) {
		for (var col = 0; col < unitWidth; col++) {
			if (row === 0 && col === 0) {
				result[startY * this.width + startX] = unit;
				continue;
			}

			result[(startY + row) * this.width + startX + col] = "x";
		}
	}

	return result;
};

LayoutTemplate.prototype.printLayout = function(layout) {
	if (typeof layout === "undefined") {
		var layout = this.layout;
	}

	var result = "";

	for (var row = 0; row < this.height; row++) {
		for (var col = 0; col < this.width; col++) {
			if (layout[row * this.width + col].length === 3) {
				result += layout[row * this.width + col] + " ";
			} else {
				result += " " + layout[row * this.width + col] + "  ";
			}
		}
		result += "\n";
	}

	return result;
};

LayoutTemplate.prototype.printAllPossibleLayouts
		= function(layout, startX, startY) {
	if (startY === this.height) {
		if (this._isComplete(layout)) {
			this.allLayouts.push(layout.concat());
		}

		return ;
	}

	for (var row = 0; row < this.height; row++) {
		for (var col = 0; col < this.width; col++) {
			var unit = this.units[row * this.width + col];
			var tmpLayout;

			if (this._isPossible(layout, unit, startX, startY)) {
				tmpLayout = this._insert(layout, unit, startX, startY);
				if (startX === this.width - 1) {
					this.printAllPossibleLayouts(tmpLayout, 0, startY + 1);
				} else {
					this.printAllPossibleLayouts(tmpLayout, startX + 1, startY);
				}
			}
		}
	}

	if (layout[startY * this.width + startX] !== 0) {
		if (startX === this.width - 1) {
			this.printAllPossibleLayouts(layout, 0, ++startY);
		} else {
			this.printAllPossibleLayouts(layout, ++startX, startY);
		}
	}
};

LayoutTemplate.prototype._isComplete = function(layout) {
	for (var row = 0; row < this.height; row++) {
		for (var col = 0; col < this.width; col++) {
			if (layout[row * this.width + col] === 0) {
				return false;
			}
		}
	}

	return true;
};

LayoutTemplate.prototype.getTargetLayouts = function(numSections) {
	var num = 0;
	for (var idx = 0; idx < this.allLayouts.length; idx++) {
		if (this._getNumSections(this.allLayouts[idx]) === numSections) {
			this.targetLayouts.push(this.allLayouts[idx]);
			num++;
		}
	}

	return num;
};

LayoutTemplate.prototype._getNumSections = function(targetLayout) {
	var numSections = targetLayout.length;

	for (var idx = 0; idx < targetLayout.length; idx++) {
		if (targetLayout[idx] === "x") {
			numSections--;
		}
	}

	return numSections;
};

