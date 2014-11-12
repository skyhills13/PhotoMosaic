var ooo;
window.addEventListener("load", function() {
	var tg = new TemplateGenerator();
	tg.saveTargetTemplates(8);
	var random = parseInt(Math.random()*1000);
	var tArray = tg.targetTemplates[random].template;
	
	var pArray = document.querySelectorAll("#list img");
	var appendPlace = document.querySelector("#canvas");
	
	var combine = new PhotoCombine();
	combine.getMaterial({
		"mWidth" : 800,
		"mHeight" : 800,
		"templateArray" : tArray,
		"templateColumn" : 4,
		"templateRow" : 4,
		"photoArray" : pArray,
		"appendPlace" : appendPlace
	});
	combine.create();
	var result = combine.getResult();
	document.querySelector("p a").addEventListener("click", function(){
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
		this.mainCanvas = this.appendPlace.querySelector("#main");

		var boardArray = this.mosaic.board;
		boardArray.map(function(item) {
			this.drawingTargetImage(item);
		}.bind(this));
	},
	
	getResult : function(){
		return this.mainCanvas.toDataURL();
	},
	drawingTargetImage : function(i) {
		var img = this.photoArray[0];
		var canvas = this.mainCanvas;
		var context = canvas.getContext("2d");
		context.drawImage(i.imgElement, 0, 0, i._width, i._height, i.posX, i.posY, i._width, i._height);
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