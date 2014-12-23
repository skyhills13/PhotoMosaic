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
			//alert은 좋은 UX는 아니라고 생각해. 이런경우는 message dialog를 만들어서 사용하면 좋겠지 물론.
			//그리고 console.error 같은걸로 개발자에게 알려주기 위한 용도로 사용하는 경우도 있으니 참고.
			//console.log조차 브라우저 호환성 이슈가 있지. 안되는 브라우저가 있다는 거니까 고려해서 사용해야 함. 
			console.log("Browser doesn't support full range of File API");
			return ;
		}

		if (this.nodes.length <= 0) {
			return ;
		}

		this._initEvents(this.nodes);
	},
	
	///밖에서 사용하지 않는 내부 함수 맞지? 그래서 (_)를 함수 이름 앞에 추가한 것이고.
	//그런건 아에 prototype안에 넣지 않고 별도 함수로 구현하는 경우가 있음. 지금은 private한 특징이라고 해도 
	//결국 instance에 의해서 접근이 가능하게 되거든.
	//모듈패턴을 공부해봐.
	_initEvents: function(nodes) { //nodes라는 지역변수 이름은 ..너무 일반적이고 javascript예약어 같은 느낌이라 사용을 자제해야 겠음. 
		nodes.forEach(function(node) {
			// // 혹시 null이 아니고 undefined나 ""(빈문자열)로 들어올 수도 있는거 아냐? 그런경우는 없을까? 그런거까지 체크하려면 어떻게 하는게 정확할까? 
			// 그런건 자바스크립트를 깨우치다 라는 책이 있는데 (경민이가 있어) 나중에 꼭 봐.
			// javascript는 타입을 이해하는게 꽤 중요하거든. 
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
		//if문안에 if문이 있어야 한다면 일단 리팩토링 대상임. 
		//자꾸 줄이고 없애려고 노력해봐. 
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
				//위에 코드랑 좀 비슷한데.. 중복을 없애거나 좀더 개선할 수 있지 않을까? 
				//예를들어 toggleClassName이라는 걸 만들어서 두 개를 하나로 줄인다던가...
				this.hoverLine.appendClassName("hoverOut");
				this.hoverLine.removeClassName("hoverIn");
			}
		} else {
			this.hoverLine.removeClassName("hoverOut");
			this.hoverLine.removeClassName("hoverIn");
		}
	},

	_fileSelectHandler: function(event) {
		// 바깥 영역에 떨군 경우
		if (!this.hoverLine.hasClassName("hoverIn") && event.type !== "change") {
			this._fileDragHover(event);
			return;
		}
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

