var ooo;
window.addEventListener("load", function() {
	// var tg = new TemplateGenerator();
	// tg.saveTargetTemplates(8);
	// var random = parseInt(Math.random()*1000);
	// var tArray = tg.targetTemplates[random].template;

	var t = [ [ "1x1", "1x1", "1x4", "1x4", "1x1", "1x1", "x", "x", "2x1", "x", "x", "x", "2x1", "x", "x", "x" ],
			[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
			[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
			[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
			[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
			[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ],
			[ "1x1", "2x1", "x", "1x1", "1x1", "2x2", "x", "1x2", "1x1", "x", "x", "x", "4x1", "x", "x", "x" ],
			[ "1x1", "1x1", "1x1", "1x1", "2x2", "x", "2x2", "x", "x", "x", "x", "x", "1x1", "3x1", "x", "x" ],
			[ "1x1", "1x1", "1x1", "1x1", "4x2", "x", "x", "x", "x", "x", "x", "x", "1x1", "1x1", "2x1", "x" ],
			[ "1x1", "1x1", "1x2", "1x1", "2x1", "x", "x", "1x2", "3x2", "x", "x", "x", "x", "x", "x", "1x1" ] ];

	var tArray = t[parseInt(Math.random() * 10)];

	var pArray = document.querySelectorAll("#list img");
	var appendPlace = document.querySelector("#canvas");

	var combine = new PhotoCombine();
	combine.getMaterial({
		"mWidth" : 1000,
		"mHeight" : 800,
		"templateArray" : tArray,
		"templateColumn" : 4, // getWidth
		"templateRow" : 4, // getHeight
		"photoArray" : pArray, // HTMLImgElement
		"appendPlace" : appendPlace
	});
	combine.create();
	var result = combine.getResult();
	document.querySelector("p a").addEventListener("click", function() {
		window.location = result;
	});
});

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
		// var i = this.adjustImagePosition(item);
		var i = item;
		var img = this.photoArray[0];
		var canvas = this.mainCanvas;
		var context = canvas.getContext("2d");
		context.drawImage(i.imgElement, 0, 0, i._width, i._height, i.posX, i.posY, i._width, i._height);
	},	
	
	adjustImagePosition : function(item){
		return item;
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
		ooo = convertedTemplate;
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
