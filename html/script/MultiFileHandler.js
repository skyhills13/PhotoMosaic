/****
 *   Constructor
 */
function MultiFileHandler(/* [node1, node2, ...], [fn1, fn2, ...] */) {
	console.log(arguments);
	this.files = [];

	this.nodes = [].slice.call(arguments[0]);
	this.callbacks = [].slice.call(arguments[1]);

	this._init();
}

/* 
이렇게 prototype이라는 객체를 새로 정의하는 경우에는 constructor 를 지정해줘야 함. 

원래는 
MultiFileHandler.prototype._init = function() { }
MultiFileHandler.prototype._initEvents = function() { }
이런식으로 하면 원래 함수안에 있는 prototype객체를 유지한채 메서드를 추가하는 것이라 constructor속성이 살아있는 것이고.

*/

MultiFileHandler.prototype = {
	_init: function() {
		//개행으로 보기 좋게 한거 좋다. 그런데 if문 에서 뭘 해야 하는데 뭘 안하네?
		if (window.File
				&& window.FileList
				&& window.FileReader
				&& window.Blob) {
		} else {
			console.log("Browser doesn't support full range of File API");
			return ;
		}

		if (this.nodes.length <= 0) {
			return ;
		}

		this._initEvents(this.nodes);
	},

	_initEvents: function(nodes) {
		nodes.forEach(function(node) {
			if (node == null) {
				return ;
			}

			if (node.nodeName === "INPUT") {
				node.addEventListener("change",
						this._fileSelectHandler.bind(this));
			} else {
				//이벤트 핸들러를 하나로 지정해서 그 안에서 분기토록 한건 괜찮아 보임. 그 핸들러가 그리 복잡한 녀석이 아니니까.
				node.addEventListener("dragover", this._fileDragHover);
				node.addEventListener("dragleave", this._fileDragHover);
				node.addEventListener("drop",
						this._fileSelectHandler.bind(this));
			}
		}.bind(this));
	},

	_fileDragHover: function(event) {
		event.stopPropagation();
		event.preventDefault();

		// == , === 좀더 일관되게 사용하면 더 좋을 듯.
		if (event.type == "dragover") {
			event.dataTransfer.dropEffect = "copy"; 
			event.target.appendClassName("hover");
		} else {
			event.target.removeClassName("hover");
		}
	},

	_fileSelectHandler: function(event) {
		// cancel event and hover styling
		this._fileDragHover(event);

		// fetch FileList object
		var files = event.target.files || event.dataTransfer.files;

		// process all File objects
		for (var idxFile = 0, file; file = files[idxFile]; idxFile++) {
			this.files.push(file);
			for (var idxCb = 0, cb; cb = this.callbacks[idxCb]; idxCb++) {
				cb(file);
			}
		}
	},

	getFiles: function() {
		return this.files;
	}

}
