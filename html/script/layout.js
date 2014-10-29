/****
 *   성공적인 Layouting 을 위한 객체
 */
function Layout(rowSize, colSize) {
	this.rowSize = (typeof rowSize !== "undefined") ? rowSize : 4;
	this.colSize = (typeof colSize !== "undefined") ? colSize : 4;

	this.board = createArray(this.rowSize, this.colSize);
	// for ... in 문은 내부에 컨텐츠가 있어야 쓸 수 있다.
	// (undefined 가 들어있는 배열은 사용할 수 없다)
		for (var row in this.board) {
		for (var col = 0; col < this.board[row].length; col++) {
			this.board[row][col] = 0;
		}
	}

	this.count = {};
	for (var row in this.units) {
		for (var col in this.units[row]) {
			this.count[this.units[row][col]] = 0;
		}
	}

	this._init();
}

Layout.prototype.units;

Layout.prototype._init = function() {
	if (typeof this.units === "undefined") {
		this.units = createArray(this.rowSize, this.colSize);

		for (var row = 0; row < this.rowSize; row++) {
			for (var col = 0; col < this.colSize; col++) {
				this.units[row][col] = "" + (row + 1) + "x" + (col + 1);
			}
		}
	}

	//run(0, board);
}

Layout.prototype._isPossible = function(unit, board, startRow, startCol) {
	var arrUnit = unit.split("x");

	var width = arrUnit[0];
	var height = arrUnit[1];

	for (var row = 0; row < width; row++) {

	}

	if (unit === "1x1") {
		return !board[row][col];
	}

	if (unit === "2x1") {
		return col <= 2
			&& !board[row][col]
			&& !board[row][col + 1];
	}

	if (unit === "3x1") {
		return col <= 1
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row][col + 2];
	}

	if (unit === "4x1") {
		return col == 0
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row][col + 2]
			&& !board[row][col + 3];
	}

	if (unit == "1x2") {
		return row <= 2
			&& !board[row][col]
			&& !board[row + 1][col];
	}

	if (unit === "2x2") {
		return row <= 2
			&& col <= 2
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row + 1][col]
			&& !board[row + 1][col + 1];
	}

	if (unit === "3x2") {
		return row <= 2
			&& col <= 1
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row][col + 2]
			&& !board[row + 1][col]
			&& !board[row + 1][col + 1]
			&& !board[row + 1][col + 2];
	}

	if (unit === "4x2") {
		return row <= 2
			&& col == 0
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row][col + 2]
			&& !board[row][col + 3]
			&& !board[row + 1][col]
			&& !board[row + 1][col + 1]
			&& !board[row + 1][col + 2]
			&& !board[row + 1][col + 3];
	}

	if (unit == "1x3") {
		return row <= 1
			&& !board[row][col]
			&& !board[row + 1][col]
			&& !board[row + 2][col];
	}

	if (unit == "2x3") {
		return row <= 1
			&& col <= 2
			&& !board[row][col]
			&& !board[row][col + 1]
			&& !board[row + 1][col]
			&& !board[row + 1][col + 1]
			&& !board[row + 2][col]
			&& !board[row + 2][col + 1];
	}


	if (unit === "vertical") {
		return leftTop < 4 && !board[leftTop] && !board[leftTop + 4];
	}
	if (unit === "horizontal") {
		return leftTop % 4 < 3 && !board[leftTop] && !board[leftTop + 1];
	}
}

function insert(piece, spot, board) {
	board = board.concat();
	if (piece === "small_square") {
		board[spot] = "o";
	}
	if (piece === "big_square") {
		board[spot] = board[spot + 1] = board[spot + 4] = board[spot + 5] = "#";
	}
	if (piece === "vertical") {
		board[spot] = board[spot + 4] = "|";
	}
	if (piece === "horizontal") {
		board[spot] = board[spot + 1] = "-";
	}
	return board;
}

function is_valid(board) {
	for (var i = 0; i < board.length; ++i) {
		if (!board[i]) {
			return false;
		}
	}
	return true;
}


function run(spot, board) {
	if (spot === 8) {
		if (is_valid(board)) {
			board.splice(4, 0, "\n    ");
			N++;
			document.getElementById("pre").innerHTML += 
				(N < 10 ? "0" : "") + N + ") " +
				board.join("") + "\n\n";
		}
		return;
	}

	for (var i = 0; i < pieces.length; ++i) {
		var piece = pieces[i];

		if (is_possible(piece, spot, board)) {
			run(spot + 1, insert(piece, spot, board));
			hoho[piece]++;
		}
	}

	if (board[spot]) {
		run(spot + 1, board);
	}
}

