(function(window) {
	
	var document = window.document;
	var console = window.console;
	
	var CombineHelper = {};

	function PhotoCombine(isOptimizing) {
		if (typeof isOptimizing === "undefined")
			isOptimizing = true;
		this.isOptimizing = isOptimizing;
		this.defaultWidth = 500;
		this.defaultHeight = 500;
	}
	
	PhotoCombine.prototype = {
		create : function(photoArray, templateSpec, id) {
			console.log("---------------------------------------------");
			console.log("PhotoGenerator 시작");
			console.log("1) TemplateGenerator로 부터 템플릿을 받아온다.");
			console.log(templateSpec.template);
			var c = CombineHelper;
			templateSpec.length = c.TEMPLATE.getTemplateLength(templateSpec.template);
			var canvas = this.setCanvas(id, templateSpec);
			var board = c.TEMPLATE.makeMosaicBoard(templateSpec, canvas);
			console.log("2) 실제로 캔버스에 그려질 위치와 크기를 가진 object를 생성한다.");
			console.log(board);
			var sortedPhoto = this.setPhoto(photoArray, templateSpec.length);
			console.log("3) 사진 n장을 랜덤으로 선택한다.");
			console.log(sortedPhoto);
			var type = this.isOptimizing ? "Optimize" : "Order";
			var linker = c.LINK["with" + type](board, sortedPhoto);
			console.log("4) 사진과 object를 비교하면서 가장 적당한 곳에 캔버스에 합친다.");
			var mergedCanvas = c.MERGE.linkerInCanvas(canvas, linker); 
			console.log(mergedCanvas);
			return mergedCanvas;
		},

		setPhoto : function(photoArray, length) {
			var u = CombineHelper.UTIL;
			var shuffledPhotoArray = u.shuffleArray(photoArray);
			var adjustPhotoArray = u.adjustArrayWithSpecificLength(shuffledPhotoArray, length);
			return adjustPhotoArray;
		},

		setCanvas : function(id, templateSpec) {
			var width = typeof templateSpec.width === "undefined" ? this.defaultWidth : templateSpec.width;
			var height = typeof templateSpec.width === "undefined" ? this.defaultHeight : templateSpec.height;

			var canvas = document.createElement("canvas");
			if (typeof id != "undefined")
				canvas.setAttribute("id", id);
			return {
				"element" : canvas,
				"width" : width,
				"height" : height
			}
		}
	}
	
	
	CombineHelper.UTIL = UTIL();

	CombineHelper.LINK = {
		util : CombineHelper.UTIL,

		withOrder : function(board, photoArray) {
			var imageArray = this.getImageObjectArray(photoArray);
			return imageArray.map(function(image, idx) {
				return this.imageLinkWithBoard(image, board[idx]);
			}.bind(this));
		},

		withOptimize : function(board, photoArray) {
			var boardHash = this.getBoardHashByOrientation(board);
			var imageArray = this.getImageObjectArray(photoArray);
			var result = this.matchBySortedHash(imageArray, boardHash);
			return result;
		},

		matchBySortedHash : function(imageArray, boardHash) {
			var result = {
				matched : [],
				remain : []
			}
			// firstMatching
			for (var i = 0; i < imageArray.length; i++) {
				var image = imageArray[i];
				var orientation = image.orientation;
				var ratio = image.ratio;

				var isMatch = this.isMatching(image, boardHash);
				var toPutArray = isMatch ? "matched" : "remain";
				var toPutObject = isMatch ? this.imageLinkWithBoard(image, boardHash[orientation][ratio].shift())
						: imageArray[i];
				result[toPutArray].push(toPutObject);
				this.deleteEmptyTemplate(boardHash, orientation, ratio);
			}
			var remainMatched = this.remainMatching(result.remain, boardHash);
			return result.matched.concat(remainMatched);
		},

		deleteEmptyTemplate : function(boardHash, orientation, ratio) {
			var boardArray = boardHash[orientation][ratio];
			if (typeof boardArray != "undefined" && boardArray.length === 0) {
				delete boardHash[orientation][ratio];
			}
		},

		imageLinkWithBoard : function(image, board) {
			return {
				"imgElement" : image.element,
				"_width" : board._width,
				"_height" : board._height,
				"posX" : board.posX,
				"posY" : board.posY
			}
		},

		isMatching : function(image, boardHash) {
			var isUndefined = CombineHelper.UTIL.isUndefined;
			var orientation = image.orientation;
			var ratio = image.ratio;
			var result = isUndefined(boardHash[orientation][ratio]) ? false : true;
			return result;
		},

		remainMatching : function(imageArray, boardHash) {
			var util = CombineHelper.UTIL;
			var isUndefined = util.isUndefined;

			var matched = imageArray.map(function(image) {
				var orientation = image.originalOrientation;
				var ratio = image.ratio;
				var secondOrientation = this.searchSecondaryOrienatation(orientation, boardHash);
				var secondRatio = util.getFirstKeyInHash(boardHash[secondOrientation]);
				var board = boardHash[secondOrientation][secondRatio].shift();
				this.deleteEmptyTemplate(boardHash, secondOrientation, secondRatio);
				return this.imageLinkWithBoard(image, board);
			}.bind(this));
			return matched;
		},

		searchSecondaryOrienatation : function(orientation, boardHash) {
			var fig = CombineHelper.FIGURE;
			var util = CombineHelper.UTIL;
			var sub = fig.getSubOrientation(orientation);
			var priority = [ orientation, sub.first, sub.second ];
			return priority.filter(function(item) {
				return util.hasOneOverKey(boardHash[item]);
			})[0];
		},

		getBoardHashByOrientation : function(boardArray) {
			var orientationHash = CombineHelper.FIGURE.getOrientationHash();
			for (var i = 0; i < boardArray.length; i++) {
				var bObj = boardArray[i];
				this.putItemInHash(orientationHash, bObj);
			}
			return orientationHash;
		},

		getImageObjectArray : function(photoElementArray) {
			var objArray = [];
			for (var i = 0; i < photoElementArray.length; i++) {
				objArray.push(this.convertPhotoToObject(photoElementArray[i]));
			}
			return objArray;
		},

		convertPhotoToObject : function(photo) {
			var tool = CombineHelper.FIGURE;
			var width = photo.naturalWidth;
			var height = photo.naturalHeight
			var o = {};
			o.originalOrientation = tool.getOrientation(width, height);
			o.ratio = tool.getSimpleRatio(width, height);
			o.orientation = tool.getOrientation(o.ratio);
			o.element = photo;
			return o;
		},

		putItemInHash : function(hash, object) {
			var util = CombineHelper.UTIL;
			var orientation = object.orientation;
			var ratio = object.ratio;
			var toPut = hash[orientation][ratio];
			if (util.isUndefined(toPut)) {
				hash[orientation][ratio] = [];
			}
			hash[orientation][ratio].push(object);
		}
	}

	CombineHelper.TEMPLATE = {
		makeMosaicBoard : function(templateSpec, canvasSpec) {
			var rawTemplate = templateSpec.template;
			var boardSpec = {
				"totalHeight" : canvasSpec.height,
				"totalWidth" : canvasSpec.width,
				"roomWidth" : canvasSpec.width / templateSpec.row,
				"roomHeight" : canvasSpec.height / templateSpec.column
			};
			return this.customizingTemplate(templateSpec, boardSpec);
		},

		customizingTemplate : function(templateSpec, boardSpec) {
			var convertedTemplate = [];
			var c = CombineHelper;

			templateSpec.template.map(function(simpleRatio, index) {
				var position = c.UTIL.getIndexPositionInMatrix(index, templateSpec);
				var size = this.getSectionSize(simpleRatio);
				if (size === null)
					return;
				convertedTemplate.push({
					"orientation" : c.FIGURE.getOrientation(simpleRatio),
					"ratio" : simpleRatio,
					"posX" : position.r * boardSpec.roomWidth,
					"posY" : position.c * boardSpec.roomHeight,
					"_width" : size.w * boardSpec.roomWidth,
					"_height" : size.h * boardSpec.roomHeight
				});
			}.bind(this));
			return convertedTemplate;
		},

		getSectionSize : function(simpleRatio) {
			if (simpleRatio === "x")
				return null;
			var splited = simpleRatio.split("x");
			return {
				"w" : parseInt(splited[0]),
				"h" : parseInt(splited[1])
			}
		},

		getTemplateLength : function(rawTemplate) {
			var len = rawTemplate.filter(function(item) {
				return item.length > 1;
			}).length;
			return len;
		}
	}

	CombineHelper.MERGE = {
		linkerInCanvas : function(canvasSpec, linker) {
			var canvas = canvasSpec.element;
			canvas.width = canvasSpec.width;
			canvas.height = canvasSpec.height;

			linker.map(function(item) {
				this.drawingTargetImage(canvas, item);
			}.bind(this));
			return canvas;
		},

		drawingTargetImage : function(canvas, item) {
			var i = this.adjustImagePosition(this.adjustImageSize(item));
			var context = canvas.getContext("2d");
			context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound, i.heightBound, i.posX, i.posY,
					i.cWidth, i.cHeight);
		},

		adjustImageSize : function(item) {
			var pWidth = item.imgElement.naturalWidth;
			var pHeight = item.imgElement.naturalHeight;
			var bWidth = item._width;
			var bHeight = item._height;
			var mat = {
				"posX" : item.posX,
				"posY" : item.posY,
				"cWidth" : item._width,
				"cHeight" : item._height,
				"imgElement" : item.imgElement
			}
			// 가로폭에 맞춰서 사진 보여주기
			mat.widthBound = item.imgElement.naturalWidth;
			mat.heightBound = item._height * (item.imgElement.naturalWidth / item._width);
			// 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
			if (mat.heightBound > item.imgElement.naturalHeight) {
				mat.heightBound = item.imgElement.naturalHeight;
				mat.widthBound = item._width * (item.imgElement.naturalHeight / item._height);
			}
			return mat;
		},

		adjustImagePosition : function(item) {
			// item.widthStart, item.heightStart
			item.widthStart = 0;
			item.heightStart = 0;

			var pHeight = item.imgElement.naturalHeight;
			var pWidth = item.imgElement.naturalWidth;

			item.widthStart = (pWidth - item.widthBound) * 0.5;
			item.heightStart = (pHeight - item.heightBound) * 0.5;

			return item;
		}
	}

	CombineHelper.FIGURE = {
		type : {
			"s" : "square",
			"p" : "portrait",
			"l" : "landscape"
		},

		getSubOrientation : function(orientation) {
			var t = this.type;
			var result = {
				"first" : "",
				"second" : ""
			};
			if (orientation === t.s) {
				result.first = t.p;
				result.second = t.l;
			} else if (orientation === t.p) {
				result.first = t.s;
				result.second = t.l;
			}

			else if (orientation === t.l) {
				result.first = t.s;
				result.second = t.p;
			}

			return result;
		},

		getOrientationHash : function() {
			return {
				"square" : {},
				"portrait" : {},
				"landscape" : {}
			}
		},

		getOrientation : function(left, right) { // front : "mxn" or number ,
													// rear :
			// number
			var type = this.type;
			if (isNaN(left)) {
				var splited = left.split("x");
				left = parseInt(splited[0]);
				right = parseInt(splited[1]);
			}

			if (left === right)
				return type.s;
			return left > right ? type.l : type.p;
		},

		getSimpleRatio : function(width, height) {
			var ratio = height / width;
			if (ratio === 1)
				return "1x1";
			var isOverOne = ratio < 1;
			var rounded = Math.round(isOverOne ? 1 / ratio : ratio);
			return isOverOne ? rounded + "x1" : "1x" + rounded;
		}
	}

	PhotoCombine.prototype.helper = {
		"LINK" : CombineHelper.LINK,
		"FIGURE" : CombineHelper.FIGURE,
		"MERGE" : CombineHelper.MERGE,
		"TEMPLATE" : CombineHelper.TEMPLATE
	};
	
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = PhotoCombine;
	} else {
		/*
			window를 이용한 방법이기 때문에 명시적이지는 않다.
			전체 코드에 네임스페이스가 있어야 한다.
		 	window는 남의 전역변수에 추가한것
		 	변수에서 받고 return 해서 하나의 모듈로 하라 (모듈화)
			window 객체에 잘 추가를 안함 - window의 원래 객체와 충돌을 하기 때문에 안됨
			눈에 확 안들어옴 (window 공간을 건들여서 추가가된것이기 때문에 네이티브 브라우저가 지원한건지 내가 한건지 잘 모름) 
			의존성 관리가 필요함
			브라우저 호환성 같은 경우에는 readme.md 에서 쓰면 됨
			익명함수는 안에서만 하고 끝낼때 쓰는 것 밖에서 접근을 못하는 것 이렇게 쓰면 충돌이 안남
			안에서 쓴 내용이 밖에서 충돌이 안됨
			그것만 하고 끝이면 익명함수를 씀
			!!!!!!모듈 페턴 공부하기 // 핵심!!!!
			- 모듈 패턴을 라이브러리화 한 것이 require.js 모듈의 의존성 체계를 세우는 것
			amd, common.js -> 노드js에 나온 것 의존성 모듈을 처리하기 위해서
			모든 파일을 모듈로 만들고 export를 함
			스크립트 파일을 동적으로 html 에 추가
		 */
		window.PhotoCombine = PhotoCombine;  
		window.CombineHelper = CombineHelper;
	}
}(this));