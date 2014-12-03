/**
 * 추후에 사진을 준비하는 객체로 합치기

 * 사진이 모두 로드된 후에 실행하기 
 * string 을 상수로 만들기
 */

function PhotoChecker(list){
	var sl = createSimpleRatioObejctList(list);
	var checked = {
		"simpleRatioList" : sl,
		"orientationComposition" : getOrientationComposition(sl)
	}
	return checked;
}

function getOrientationComposition(list){
	var composition = {
		"square" : 0,
		"landscape" : 0,
		"portrait" : 0
	};
	list.map(function(item){
		var orientation = item.orientation;
		composition[orientation]++;
	});
	
	return composition;
}

function createSimpleRatioObejctList(plist){
	var olistArray = [];
	for(var i=0 ; i<plist.length ; i++){
		var info = convertSimpleRatio(plist[i]);
		var pObject = {
			"simpleOrientation" : info.simpleOrientation,
			"simpleRatio" : info.simpleRatio,
			"originalRatio" : info.originalRatio,
			"originalOrientation" : info.originalOrientation,
			"originalElement" : plist[i]
		}
		olistArray.push(pObject);
	}
	return olistArray;
}

function convertSimpleRatio(photoElement){
	var originWidth = photoElement.naturalWidth;
	var originHeight = photoElement.naturalHeight;
	
	var ratio = originHeight / originWidth;
	var info = {};
	info.originalRatio = ratio;
	info.originalOrientation = getPhotoOrientation(ratio);
	var simpleObject = getSimpleRatio(info.originalOrientation, ratio);
	info.simpleRatio = simpleObject.simpleRatio;
	info.simpleOrientation = simpleObject.simpleOrientation;
	return info;
}

function getSimpleRatio(orientation , ratio){
	var section = {
		"simpleRatio" : "",
		"simpleOrientation" : ""
	};
	if(orientation === "square" ){
		section.simpleRatio = "1x1";
		section.simpleOrientation = "square";
	}
	if(orientation === "landscape" ){
		var rat = Math.round(1/ratio);
		section.simpleRatio = rat + "x1";
		section.simpleOrientation = rat ===1?"square":"landscape";
	}
	if(orientation === "portrait"){
		var rat = Math.round(ratio);
		section.simpleRatio = "1x" + rat;
		section.simpleOrientation = rat===1?"square":"portrait";
	}
	return section;
}

function getPhotoOrientation(ratio){
	if(ratio === 1){
		return "square";
	}
	var orientation = ratio>1?"portrait":"landscape";
	return orientation;
}









// var ooo;

function PhotoCombine() {
}

PhotoCombine.prototype = {
	create : function() {
		this.makeMosaicBoard();
		this.linkBoardWithImageByOptimize();
		//this.linkBoardWithImageByOrder();
		this.boardToCanvas();
	},
	
	createWithOptimize : function(){
		this.makeMosaicBoard();
		this.linkBoardWithImageByOptimize();
		//this.linkBoardWithImageByOrder();
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
		this.mosaic.board = matched;
		return matched;
	},
	
	matchByHash : function(imageHash, boardHash){
		var matched = [];
		// 가장 적합한 match
		for(var orientType in imageHash){
			var imageTargetHash = imageHash[orientType];
			for(var imageTemplateSize in imageTargetHash){
				var imageTargetArray = imageTargetHash[imageTemplateSize]; 
				imageTargetArray.map(function(item){
					var boardTargetArray = boardHash[orientType][imageTemplateSize];
					if(typeof boardTargetArray === "undefined") {
						item.isMatched = -1;
						return;
					}
					var remain = boardTargetArray.length;
					if(remain === 0){
						console.log(orientType, imageTemplateSize, boardHash[orientType][imageTemplateSize]);
						delete boardHash[orientType][imageTemplateSize];
						console.log(orientType, imageTemplateSize, boardHash[orientType][imageTemplateSize]);
						item.isMatched = -1;
						return;
					}
					
					var matchedObject = boardTargetArray.shift();
					matchedObject.imgElement = item.originalElement;
					item.isMatched = 1;
					matched.push(matchedObject);
				});
			}
		}
//		console.log("image hash");
//		console.log(imageHash);
//		console.log("board hash");
//		console.log(boardHash);	
		matched = this.remainMatching(imageHash, boardHash, matched);
		return matched;
	},
	
	remainMatching : function(imageHash, boardHash, matched){
		for(orientType in imageHash){
			var imageTargetHash = imageHash[orientType];
			for(var imageTemplateSize in imageTargetHash){
				var imageTargetArray = imageTargetHash[imageTemplateSize];
				imageTargetArray.map(function(item){
					if(item.isMatched > 0){return;}
					var secondKey = this.secondKeySearching(item, boardHash);
					var matching = this.secondMatching(item, secondKey, boardHash);
					matched.push(matching);
				}.bind(this));
			}
		}
		return matched;
	},
	
	secondMatching : function(item, secondKey, boardHash){
		var matchingHash = boardHash[secondKey];
		var target = {};
		for(var i in matchingHash){
			var targetArray = matchingHash[i];
			console.log("secondKey : " + secondKey); 
			console.log(matchingHash, i, targetArray);
			target = targetArray.shift();
			target.imgElement = item.originalElement;
			if(targetArray.length === 0){
				delete matchingHash[i];
			}
			item.isMatched = 1;
			return target;
		}
	},
	
	secondKeySearching : function(item, boardHash){
		var originalOrient = item.originalOrientation;
		var target = (originalOrient==="square"?"square":"other") + "SecondKeySearching";
		var key = this[target](originalOrient, boardHash);
		return key;
	},
	
	squareSecondKeySearching : function(originalOrient, boardHash){
		
		console.log("square");
	},
	
	otherSecondKeySearching : function(originalOrient, boardHash){
		
		var target = (originalOrient==="landscape")?"landscape":"portrait";
		var verseTarget = (target==="landscape")?"portrait":"landscape";
		
		var isTargetKeyRemain = this.hasKey(boardHash[target]);
		var isSqureKeyRemain = this.hasKey(boardHash["square"]);
		var isVerseKeyReamin = this.hasKey(boardHash[verseTarget]);
		
//		console.log("============= search key =============");
//		console.log(boardHash[target]);
//		console.log(boardHash[verseTarget]);
//		console.log(boardHash["square"]);
		var key = "";
		if(isTargetKeyRemain){
			key = target;
//			console.log(key);
			return key;
		}
		if(isSqureKeyRemain) {
			key = "square";
//			console.log(key);
			return key;
		}
		if(isVerseKeyReamin){
			key = verseTarget;
//			console.log(key);
			return key;
		}
	},
	
	hasKey : function(json){
		var keyList = [];
		for(var key in json){
			keyList.push(key);
		}
		var result = keyList.length === 0?false:true;
		return result;
	},
	
	getBoardHashByOrientation : function(){
		var bArray = this.mosaic.board;
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
		this.setTemplateMaterial(m.templateArray, m.templateColumn, m.templateRow);
		this.setMosaicMaterial(m.mWidth, m.mHeight);
		var tArrayLength = this.templateCount(m.templateArray);
		this.setPhotoArray(m.photoArray, tArrayLength);
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

	setPhotoArray : function(pArray, tArrayLength) {
		if(pArray.length == tArrayLength){
			this.photoArray = pArray;
			return ;
		}
		this.photoArray = this.selectRandomPhoto(pArray, tArrayLength);
		console.log(this.photoArray);
		return ;
	},
	
	selectRandomPhoto : function(pArray, tArrayLength){
		var photoElementList = [];
		if(pArray.length > tArrayLength){
			var shuffled = this.shuffleArray(pArray);
			return shuffled.splice(0, tArrayLength);
		} else { //pArray.length < tArrayLength
			
		}
		return photoElementList;
	},
	
	shuffleArray : function(array){
		var indexArray = (function(){
			var temp = [];
			for(var i=0 ; i<array.length ; i++){
				temp.push(i);
			}
			return temp;
		})();
		
		var shuffled = [];
		while(indexArray.length > 0){
			var randIndex = parseInt(Math.random()*indexArray.length);
			var tempEle = indexArray[0];
			indexArray[0] = indexArray[randIndex];
			indexArray[randIndex] = tempEle;
			
			var ele = indexArray.shift();
			shuffled.push(array[ele]);
		}
		return shuffled;
	},

	setTemplateMaterial : function(tArray, column, row) {
		this.template = {
			"array" : tArray,
			"column" : column,
			"row" : row
		}
	},
	
	templateCount : function(templateArray){
		var countArray = templateArray.filter(function(item){
			return item != "x";
		});
		return countArray.length;
	}
}
