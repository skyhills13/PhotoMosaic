// var ooo;

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
	
	adjustImagePosition : function(item){
		//item.widthStart, item.heightStart
		item.widthStart = 0;
		item.heightStart = 0;
		
		var pHeight = item.imgElement.height;
		var pWidth = item.imgElement.width;
		
		item.widthStart = (pWidth - item.widthBound)*0.5;
		item.heightStart = (pHeight - item.heightBound)*0.5;
		
		return item;
	},
	
	adjustImageSize : function(item) {

		var pWidth = item.imgElement.width;
		var pHeight = item.imgElement.height;
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
		
		// 가로폭에 맞춰서 사진 보여주기
		mat.widthBound = item.imgElement.width;
		mat.heightBound = item._height * (item.imgElement.width/item._width);
		// 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
		if(mat.heightBound > item.imgElement.height){			
			mat.heightBound = item.imgElement.height;
			mat.widthBound = item._width*(item.imgElement.height/item._height);
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
			item.imgElement = imageArray[i];
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
