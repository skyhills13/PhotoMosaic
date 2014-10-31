/****
 *   성공적인 Layouting 을 위한 객체
 */

/* 
이하 코드를 보면 숫자들이 쭉 나열되어 있는데, 4, 8 등 이런게 정해진 알고리즘을 충족하기 위해서 구현한 건 알겠는데.
로직이나 알고리즘은 나중에 변경되거나 기능이 변경(확장)된다는 것도 고민하면 좋겠음
*/

/* 
전반적으로 코드에 대한 별도의 명세서(자유로운 형식으로 로직을 도식화하는 형태) 가 필요한 코드.
wiki등에 정리하면 멋지겠음
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

/* 뭔가 그럴싸한 코드인데 정확히 이해가 안감 . 로직 잘 구현했으리라 ㅎ 
   이정도를 머리속으로만 기억하지 말고 어딘가 이해할만한 내용으로 문서화(wiki등에)를 해두면 좋을 듯 
*/
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

