// var ooo;

function PhotoCombine() {
}

PhotoCombine.prototype = {
	create : function() {
		this.makeMosaicBoard();
		//this.linkBoardWithImageByOptimize();
		this.linkBoardWithImageByOrder();
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
	
	getDataUrl : function(){
		return this.mainCanvas.toDataURL();
	},

	drawingTargetImage : function(item) {
		
		var i = this.adjustImageSize(item);
		i = this.adjustImagePosition(i);
		var img = this.photoArray[0];
		var canvas = this.mainCanvas;
		var context = canvas.getContext("2d");
		context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound, i.heightBound, i.posX, i.posY, i.cWidth, i.cHeight);
	},
	
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
//		console.log(item);
		var pWidth = item.imgElement.naturalWidth;
		var pHeight = item.imgElement.naturalHeight;
		var bWidth = item._width;
		var bHeight = item._height;

		var mat = {
			// "sx" : ,
			// "sy" : ,
			// "widthBound" : ,
			// "heightBound" : ,
//			"orientation" : "",
			"posX" : item.posX,
			"posY" : item.posY,
			"cWidth" : item._width,
			"cHeight" : item._height,
			"imgElement" : item.imgElement
		}
		
		// 가로폭에 맞춰서 사진 보여주기
		mat.widthBound = item.imgElement.naturalWidth;
		mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
		// 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
		if(mat.heightBound > item.imgElement.naturalHeight){			
			mat.heightBound = item.imgElement.naturalHeight;
			mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
		}
		return mat;
	},
	
	// 좌측 상단부터 차례대로 사진 넣기
	linkBoardWithImageByOrder : function() {
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
	
	// 최적의 장소에 넣기
	linkBoardWithImageByOptimize : function(){
		var boardHash = this.getBoardHashByOrientation();
		var imageHash = this.getImageHashByOrientation();
		var matched = this.matchByHash(imageHash, boardHash);
		return matched;
	},
	
	matchByHash : function(imageHash, boardHash){
		console.log(imageHash, boardHash);
		var matched = [];
		// 가장 적합한 match
		for(var orientType in imageHash){
			var imageTargetHash = imageHash[orientType];
			for(var imageTemplateSize in imageTargetHash){
				var imageTargetArray = imageTargetHash[imageTemplateSize]; 
				imageTargetArray.map(function(item){
					var boardTargetArray = boardHash[orientType][imageTemplateSize];
					if(typeof boardTargetArray === "undefined") {
						item.isMatched = "false";
						return;
					}
					var remain = boardTargetArray.length;
					if(remain === 0){
						item.isMatched = "false";
						return;
					}
					
					var matchedObject = boardTargetArray.pop();
					matchedObject.imgElement = item.originalElement;
					item.isMatched = "true";
					matched.push(matchedObject);
				});
			}
		}
		return matched;
	},
	
	getBoardHashByOrientation : function(){
		var bArray = this.mosaic.board;
		console.log(bArray);
		var ratioHash = {
			"portrait" : {},
			"square" : {},
			"landscape" : {}
		}
		for(var i=0 ; i<bArray.length ; i++){
			var orientation = bArray[i].orientation;
			var ratio = bArray[i].ratio;
			var targetHash = ratioHash[orientation];
			if(typeof targetHash[ratio] === "undefined") targetHash[ratio] = [];
			targetHash[ratio].push(bArray[i]);
		}
		return ratioHash;
	},
	
	getImageHashByOrientation : function(){
		var pArray = this.photoArray;
		var ratioHash = {
				"portrait" : {},
				"square" : {},
				"landscape" : {}
			};
		var checkedPhoto = PhotoChecker(pArray).simpleRatioList;
		for(var i=0 ; i<checkedPhoto.length ; i++){
			var orientation = checkedPhoto[i].simpleOrientation;
			var ratio = checkedPhoto[i].simpleRatio;
			var targetHash = ratioHash[orientation];
			if(typeof targetHash[ratio] === "undefined") targetHash[ratio] = [];
			targetHash[ratio].push(checkedPhoto[i]);
		}
		return ratioHash;
	},
	
	makeMosaicBoard : function() {
		var t = this.template;
		var m = this.mosaic;
		var convertedTemplate = [];
		t.array.map(function(item, oneDimIdx) {
			var ori = this.getOrientationWithRatio(item);
			var idx = this.oneDimToTwoDim(oneDimIdx);
			var area = this.stringAreaToObject(item);
			if (area === null)
				return;
			var cvtItem = {
				"orientation" : ori,
				"ratio" : item,
				"posX" : idx.r * m.roomWidth,
				"posY" : idx.c * m.roomHeight,
				"_width" : area.w * m.roomWidth,
				"_height" : area.h * m.roomHeight
			}
			convertedTemplate.push(cvtItem);
		}.bind(this));
		m.board = convertedTemplate;
	},
	
	getOrientationWithRatio : function(ratio){
		var splited = ratio.split("x");
		var left = splited[0];
		var right = splited[1];
		
		if(left === right) return "square";
		return left>right?"landscape":"portrait";
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
