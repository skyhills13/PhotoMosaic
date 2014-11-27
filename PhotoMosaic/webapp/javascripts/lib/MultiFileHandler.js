/****
 *   LIB: MultiFileHandler
 */

function MultiFileHandler(/* [node1, node2, ...], [fn1, fn2, ...] */) {
	var files = [];
	
	this.getFiles = function() {
		return files;
	}

	this.nodes = [].slice.call(arguments[0]);
	this.callbacks = [].slice.call(arguments[1]);
	
	this.hoverLine = document.querySelector(".hoverLine");

	this._init();
}

MultiFileHandler.prototype = {
	constructor: MultiFileHandler,

	_init: function() {
		if (!window.File
				|| !window.FileList
				|| !window.FileReader
				|| !window.Blob) {
			// 나중에 안내창 띄우는 것으로 변경할 것.
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
			if (node === null) {
				return ;
			}

			if (node.nodeName === "INPUT") {
				node.addEventListener("change", this._fileSelectHandler.bind(this));
			} else {
				node.addEventListener("dragover", this._fileDragHover.bind(this));
				node.addEventListener("dragleave", this._fileDragHover.bind(this));
				node.addEventListener("drop", this._fileSelectHandler.bind(this));
			}
		}.bind(this));
	},

	_fileDragHover: function(event) {
		event.stopPropagation();
		event.preventDefault();
		
		if (event.type === "dragover") {
			event.dataTransfer.dropEffect = "copy";

			if (event.target.getAttribute("data-draghover") === "true") {
				if (this.hoverLine.hasClassName("hoverIn")) {
					return;
				}
				this.hoverLine.appendClassName("hoverIn");
				this.hoverLine.removeClassName("hoverOut");
			} else {
				if (this.hoverLine.hasClassName("hoverOut")) {
					return;
				}
				this.hoverLine.appendClassName("hoverOut");
				this.hoverLine.removeClassName("hoverIn");
			}
		} else {
			this.hoverLine.removeClassName("hoverOut");
			this.hoverLine.removeClassName("hoverIn");
		}
	},

	_fileSelectHandler: function(event) {
		// cancel event and hover styling
		this._fileDragHover(event);

		// fetch FileList object
		var files = event.target.files || event.dataTransfer.files;
		var thisFiles = this.getFiles();

		// process all File objects
		for (var idxFile = 0, file; file = files[idxFile]; idxFile++) {
			thisFiles.push(file);
			for (var idxCb = 0, cb; cb = this.callbacks[idxCb]; idxCb++) {
				cb(file, idxFile);
			}
		}
	}
}

