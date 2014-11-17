// var ooo;

//생성자안에 프로퍼티가 꼭 있을필요는 없지만, 생성자를 호출하는 순간 필요한 필수 옵션이나 값들을 받아서 this.value = value; 이런식으로 
//셋팅하는 것이 이 클래스를 사용하는 개발자입장에서 좀더 명확할 수 있음.
//고민해보삼.

function PhotoCombine() {
}

PhotoCombine.prototype = {
	create : function() {
		this.makeMosaicBoard();
		this.linkBoardWithImage();
		this.boardToCanvas();
	},

	boardToCanvas : function() {
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", "main");
		canvas.width = this.mosaic.totalWidth;
		canvas.height = this.mosaic.totalHeight;
		this.appendPlace.appendChild(canvas);
		this.mainCanvas = canvas;

		var boardArray = this.mosaic.board;
		boardArray.map(function(item) {
			this.drawingTargetImage(item);
		}.bind(this));
	},

	getResult : function() {
		return this.mainCanvas.toDataURL();
	},

	drawingTargetImage : function(item) {
		
		var i = this.adjustImageSize(item);
		// this.adjustImagePosition(item);
		// var i = item;
		i = this.adjustImagePosition(i);
		var img = this.photoArray[0];
		var canvas = this.mainCanvas;
		var context = canvas.getContext("2d");
		// context.drawImage(i.imgElement, 0, 0, i._width, i._height, i.posX,
		// i.posY, i._width, i._height);
		context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound, i.heightBound, i.posX, i.posY, i.cWidth, i.cHeight);
	},
	
	//private 성격의 메서드는 underscore('_') 를 붙여서 이름을 짓는것이일반적이고, 필요하면 prototype안에 추가하지 않는 것도 방법임.
	//이 코드가 경민이 것이라면 지난번 말해준 모듈패턴을 되새겨보기.
	adjustImagePosition : function(item){
		//item.widthStart, item.heightStart
		item.widthStart = 0;
		item.heightStart = 0;
		
		var pHeight = item.imgElement.naturalHeight;
		var pWidth = item.imgElement.naturalWidth;
		
		item.widthStart = (pWidth - item.widthBound)*0.5;
		item.heightStart = (pHeight - item.heightBound)*0.5;
		
		return item;
	},
	
	adjustImageSize : function(item) {
		console.log(item);
		var pWidth = item.imgElement.naturalWidth;
		var pHeight = item.imgElement.naturalHeight;
		var bWidth = item._width;
		var bHeight = item._height;

		var mat = {
			// "sx" : ,
			// "sy" : ,
			// "widthBound" : ,
			// "heightBound" : ,
			"posX" : item.posX,
			"posY" : item.posY,
			"cWidth" : item._width,
			"cHeight" : item._height,
			"imgElement" : item.imgElement
		}
		
		//item.imgElement.naturalHeight 와 같은 속성은 변수로담아주기(캐쉬)
		//불필요하게 여러번 호출하는 거 같음.

		// 가로폭에 맞춰서 사진 보여주기
		mat.widthBound = item.imgElement.naturalWidth;
		mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
		// 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
		if(mat.heightBound > item.imgElement.naturalHeight){			
			mat.heightBound = item.imgElement.naturalHeight;
			mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
		}
		return mat;
		
//		var remain = item.imgElement.Height * (item._width / item.imgElement.width) - item._height;
//		
//		if (remain > 0) {
//			var realRemain = item.imgElement.height - item._height * (item.imgElement.width / item._width);
//			drawMaterial.pHeight = item.imgElement.height - realRemain;
//			return drawMaterial;
//		}
//		
//		drawMaterial.pHeight = item.imgElement.height;
//		var reamin2 = item.imgElement.width * (item._height/item.imgElement.height) - item._width;
//		drawMaterial.pWidth = item.imgElement.width - reamin2*(item.imgElement.height/item._height);
//
//		
//		return drawMaterial;
	},

	linkBoardWithImage : function() {
		var boardArray = this.mosaic.board;
		var imageArray = this.photoArray;
		boardArray.map(function(item, i) {
			var selectedImage = imageArray[i];
			var isImageUndefined = (typeof selectedImage === "undefined");
			if(isImageUndefined){
				console.log(i%imageArray.length);
				selectedImage = imageArray[i%imageArray.length];
			}
			item.imgElement = selectedImage;
		});
	},
	
	makeMosaicBoard : function() {
		var t = this.template;
		var m = this.mosaic;
		var convertedTemplate = [];
		t.array.map(function(item, oneDimIdx) {
			var idx = this.oneDimToTwoDim(oneDimIdx);
			var area = this.stringAreaToObject(item);
			if (area === null)
				return;
			var cvtItem = {
				"posX" : idx.r * m.roomWidth,
				"posY" : idx.c * m.roomHeight,
				"_width" : area.w * m.roomWidth,
				"_height" : area.h * m.roomHeight
			}
			convertedTemplate.push(cvtItem);
		}.bind(this));
		m.board = convertedTemplate;
		// ooo = convertedTemplate;
	},

	oneDimToTwoDim : function(index) {
		var column = this.template.column;
		var row = this.template.row;
		return {
			"c" : parseInt(index / column),
			"r" : index % row
		};
	},

	stringAreaToObject : function(stringItem) {
		if (stringItem.length === 1)
			return null;
		var itemSplit = stringItem.split("x").map(function(i) {
			return parseInt(i);
		});
		return {
			"w" : itemSplit[0],
			"h" : itemSplit[1]
		};
	},

	getMaterial : function(material) {
		var m = material;
		this.setTemplateMaterial(m.templateArray, m.templateColumn, m.templateRow, m.photoLengthInTemplate);
		this.setMosaicMaterial(m.mWidth, m.mHeight);
		this.setPhotoArray(m.photoArray);
		this.setAppendPlace(m.appendPlace);
	},

	setAppendPlace : function(element) {
		this.appendPlace = element;
	},

	setMosaicMaterial : function(width, height) {
		var t = this.template;
		this.mosaic = {
			"totalHeight" : height,
			"totalWidth" : width,
			"roomWidth" : width / t.row,
			"roomHeight" : height / t.column
		}
	},

	setPhotoArray : function(pArray) {
		this.photoArray = pArray;
	},

	setTemplateMaterial : function(tArray, column, row) {
		this.template = {
			"array" : tArray,
			"column" : column,
			"row" : row,
		}
	}
}
