/**
 * 추후에 사진을 준비하는 객체로 합치기
 * 
 * 사진이 모두 로드된 후에 실행하기 string 을 상수로 만들기
 */

function PhotoChecker(list) {
	var sl = createSimpleRatioObejctList(list);
	var checked = {
		"simpleRatioList" : sl,
		"orientationComposition" : getOrientationComposition(sl)
	}
	console.log("checked photo : " + checked);
	return checked;
}

function getOrientationComposition(list) {
	var composition = {
		"square" : 0,
		"landscape" : 0,
		"portrait" : 0
	};
	list.map(function(item) {
		var orientation = item.orientation;
		composition[orientation]++;
	});

	return composition;
}

function createSimpleRatioObejctList(plist) {
	var olistArray = [];
	for (var i = 0; i < plist.length; i++) {
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

function convertSimpleRatio(photoElement) {
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

function getSimpleRatio(orientation, ratio) {
	var section = {
		"simpleRatio" : "",
		"simpleOrientation" : ""
	};
	if (orientation === "square") {
		section.simpleRatio = "1x1";
		section.simpleOrientation = "square";
	}
	if (orientation === "landscape") {
		var rat = Math.round(1 / ratio);
		section.simpleRatio = rat + "x1";
		section.simpleOrientation = rat === 1 ? "square" : "landscape";
	}
	if (orientation === "portrait") {
		var rat = Math.round(ratio);
		section.simpleRatio = "1x" + rat;
		section.simpleOrientation = rat === 1 ? "square" : "portrait";
	}
	return section;
}

function getPhotoOrientation(ratio) {
	if (ratio === 1) {
		return "square";
	}
	var orientation = ratio > 1 ? "portrait" : "landscape";
	return orientation;
}










function PhotoCombine(isOptimizing) {
	if(typeof isOptimizing==="undefined") isOptimizing = true;
	this.isOptimizing = isOptimizing;
}

PhotoCombine.prototype = {
	defaultWidth : 500,
	defaultHeight : 500,
	
	create : function(photoArray, templateSpec, id){
		var c = PhotoCombine;
		var u = c.UTIL;
		templateSpec.length = c.TEMPLATE.getTemplateLength(templateSpec.template);  
		var shuffledPhoto = u.sliceArray(u.shuffleArray(photoArray), templateSpec.length);
		
		var canvas = this.setCanvas(id, templateSpec);
		
		var board = c.TEMPLATE.makeMosaicBoard(templateSpec, canvas);
		var type = this.isOptimizing?"Optimize":"Ordered";
		var linker = c.LINK["with"+type](board, shuffledPhoto);
		
		return c.MERGE.linkerInCanvas(canvas, linker);
	},

	setCanvas : function(id, templateSpec) {
		var width = typeof templateSpec.width==="undefined"?this.defaultWidth:templateSpec.width;
		var height = typeof templateSpec.width==="undefined"?this.defaultHeight:templateSpec.height;
		
		var canvas = document.createElement("canvas");
		if(typeof id!="undefined") canvas.setAttribute("id", id);
		return {
			"element" : canvas,
			"width" : width,
			"height" : height
		};
	}
}

PhotoCombine.LINK = {
	
	util : PhotoCombine.UTIL,
	
	withOrder : function(){
		console.log("order");
	},

	withOptimize : function(board, photoArray){
		var boardHash = this.getBoardHashByOrientation(board);
		// var imageHash = this.getImageHashByOrientation(photoArray);
		// return this.matchByHash(imageHash, boardHash);
		
		var imageArray = this.getImageObjectArray(photoArray);
		var result = this.matchByArray(imageArray, boardHash);
		return result;
	},
	
	matchByArray : function(imageArray, boardHash){
		var result = {
			matched : [],
			remain : []
		}
		
		// firstMatching
		for(var i=0 ; i<imageArray.length ; i++){
			var image = imageArray[i];
			var orientation = image.orientation;
			var ratio = image.ratio; 
			
			var isMatch = this.isMatching(image, boardHash);
			var toPutArray = isMatch?"matched":"remain";
			var toPutObject = isMatch?this.imageLinkWithBoard(image, boardHash[orientation][ratio].shift()):imageArray[i];
			result[toPutArray].push(toPutObject);
			this.deleteEmptyTemplate(boardHash, orientation, ratio);
		}
		var remainMatched = this.remainMatching(result.remain, boardHash);
		return result.matched.concat(remainMatched);
	},
	
	deleteEmptyTemplate : function(boardHash, orientation, ratio){
		var boardArray = boardHash[orientation][ratio];
		if(typeof boardArray!="undefined" && boardArray.length===0){
			delete boardHash[orientation][ratio];
		}
	},
	
	imageLinkWithBoard : function(image, board){
		return {
			"imgElement" : image.element,
			"_width" : board._width,
			"_height" : board._height,
			"posX" : board.posX,
			"posY" : board.posY
		}
	},
	
	isMatching : function(image, boardHash){
		var isUndefined = PhotoCombine.UTIL.isUndefined;
		var orientation = image.orientation;
		var ratio = image.ratio;
		var result = isUndefined(boardHash[orientation][ratio])?false:true;
		return result;
	},
	
	remainMatching : function(imageArray, boardHash){
		var util = PhotoCombine.UTIL;
		var isUndefined = util.isUndefined;
		
		var matched = imageArray.map(function(image){
			var orientation = image.originalOrientation;
			var ratio = image.ratio;
			var secondOrientation = this.searchSecondaryOrienatation(orientation, boardHash);
			var secondRatio = util.getFirstKeyInHash(boardHash[secondOrientation]); 
			var board = boardHash[secondOrientation][secondRatio].shift();
			this.deleteEmptyTemplate(boardHash, secondOrientation, secondRatio);
			return this.imageLinkWithBoard(image,board);
		}.bind(this));
		return matched;
	},
	
	searchSecondaryOrienatation  : function(orientation, boardHash){
		var fig = PhotoCombine.FIGURE;
		var util = PhotoCombine.UTIL;
		var sub = fig.getSubOrientation(orientation);
		var priority = [orientation, sub.first, sub.second];
		return priority.filter(function(item){
			return util.hasOneOverKey(boardHash[item]);
		})[0];
	},
	
	matchByHash : function(imageHash, boardHash){
		var remain = [];
		var matched = [];
		console.log(imageHash, boardHash);
		for (var orientation in imageHash){
			for(var ratio in imageHash[orientation]){
				
			}
		}
	},
	
	getBoardHashByOrientation : function(boardArray){
		var orientationHash = PhotoCombine.FIGURE.getOrientationHash();
		for(var i=0 ; i<boardArray.length ; i++){
			var bObj = boardArray[i];
			this.putItemInHash(orientationHash, bObj);
		}
		return orientationHash;
	},

	getImageHashByOrientation : function(photoArray){
		var orientationHash = PhotoCombine.FIGURE.getOrientationHash();
		for(var i=0 ; i<photoArray.length ; i++){
			var pObj = this.convertPhotoToObject(photoArray[i]);
			this.putItemInHash(orientationHash, pObj);
		}
		return orientationHash;
	},
	
	getImageObjectArray : function(photoElementArray){
		var objArray = [];
		for(var i=0 ; i<photoElementArray.length ; i++){
			objArray.push(this.convertPhotoToObject(photoElementArray[i]));
		}
		return objArray;
	},
	
	convertPhotoToObject : function(photo){
		var tool = PhotoCombine.FIGURE;
		var width = photo.naturalWidth;
		var height = photo.naturalHeight
		var o = {};
		o.originalOrientation = tool.getOrientation(width, height);
		o.ratio = tool.getSimpleRatio(width, height);
		o.orientation = tool.getOrientation(o.ratio);
		o.element = photo;
		return o;
	},
	
	putItemInHash : function(hash, object){
		var util = PhotoCombine.UTIL;
		var orientation = object.orientation;
		var ratio = object.ratio;
		var toPut = hash[orientation][ratio];
		if(util.isUndefined(toPut)){
			hash[orientation][ratio] = [];
		}
		hash[orientation][ratio].push(object);
	}
}

PhotoCombine.TEMPLATE = {
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
	
	customizingTemplate : function(templateSpec, boardSpec){
		var convertedTemplate = [];
		var c = PhotoCombine;
		
		templateSpec.template.map(function(simpleRatio, index){
			var position = c.UTIL.getIndexPositionInMatrix(index, templateSpec);
			var size = this.getSectionSize(simpleRatio);
			if(size===null) return ;
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
	
	getSectionSize : function(simpleRatio){
		if(simpleRatio==="x") return null;
		var splited = simpleRatio.split("x");
		return {
			"w" : parseInt(splited[0]),
			"h" : parseInt(splited[1])
		}
	},
	
	getTemplateLength : function(rawTemplate){
		var len = rawTemplate.filter(function(item){
			return item.length>1;
		}).length;
		return len;
	}
}

PhotoCombine.UTIL = {	
	hasOneOverKey : function(hash){
		for(var i in hash){
			if(this.isUndefined(i)) return false;
			return true;
		}
	},
		
	getFirstKeyInHash : function(hash){
		for(var i in hash){
			return i;
		}
	},
		
	getIndexPositionInMatrix : function(index, matrix){
		var column = matrix.column;
		var row = matrix.row;
		return {
			"c" : parseInt(index/column),
			"r" : index%row
		};
	},
	
	isUndefined : function(object){
		if(typeof object==="undefined") return true;
		return false;
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
	
	sliceArray : function(array, toGetLen){
		var getNumber = array.length - toGetLen;
		return array.slice(getNumber);
	}
}



//adjustImageSize : function(item) {
//// console.log(item);
//var pWidth = item.imgElement.naturalWidth;
//var pHeight = item.imgElement.naturalHeight;
//var bWidth = item._width;
//var bHeight = item._height;
//
//var mat = {
//// "sx" : ,
//// "sy" : ,
//// "widthBound" : ,
//// "heightBound" : ,
//// "orientation" : "",
//"posX" : item.posX,
//"posY" : item.posY,
//"cWidth" : item._width,
//"cHeight" : item._height,
//"imgElement" : item.imgElement
//}
//		
//// 가로폭에 맞춰서 사진 보여주기
//mat.widthBound = item.imgElement.naturalWidth;
//mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
//// 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
//if(mat.heightBound > item.imgElement.naturalHeight){
//mat.heightBound = item.imgElement.naturalHeight;
//mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
//}
//return mat;
//},
//adjustImagePosition : function(item){
////item.widthStart, item.heightStart
//item.widthStart = 0;
//item.heightStart = 0;
//		
//var pHeight = item.imgElement.naturalHeight;
//var pWidth = item.imgElement.naturalWidth;
//		
//item.widthStart = (pWidth - item.widthBound)*0.5;
//item.heightStart = (pHeight - item.heightBound)*0.5;
//		
//return item;
//},




PhotoCombine.MERGE = {
	linkerInCanvas : function(canvasSpec, linker){
		var canvas = canvasSpec.element;
		canvas.width = canvasSpec.width;
		canvas.height = canvasSpec.height;
		
		linker.map(function(item){
			this.drawingTargetImage(canvas, item);
		}.bind(this));		
		return canvas;
	},
	
	drawingTargetImage : function(canvas, item){
		var i = this.adjustImagePosition(this.adjustImageSize(item));
		var context = canvas.getContext("2d");
		context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound, i.heightBound, i.posX, i.posY, i.cWidth, i.cHeight);
	},
	
	adjustImageSize : function(item){
		var pWidth = item.imgElement.naturalWidth;
		var pHeight = item.imgElement.naturalHeight;
		var bWidth = item._width;
		var bHeight = item._height;
		var mat = {
			//"sx" : ,
			//"sy" : ,
			//"widthBound" : ,
			//"heightBound" : ,
			//"orientation" : "",
			"posX" : item.posX,
			"posY" : item.posY,
			"cWidth" : item._width,
			"cHeight" : item._height,
			"imgElement" : item.imgElement
		}
		//가로폭에 맞춰서 사진 보여주기
		mat.widthBound = item.imgElement.naturalWidth;
		mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
		//세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
		if(mat.heightBound > item.imgElement.naturalHeight){
			mat.heightBound = item.imgElement.naturalHeight;
			mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
		}
		return mat;
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
	}
}

//adjustImagePosition : function(item){
////item.widthStart, item.heightStart
//item.widthStart = 0;
//item.heightStart = 0;
//	
//var pHeight = item.imgElement.naturalHeight;
//var pWidth = item.imgElement.naturalWidth;
//	
//item.widthStart = (pWidth - item.widthBound)*0.5;
//item.heightStart = (pHeight - item.heightBound)*0.5;
//	
//return item;
//},

//adjustImageSize : function(item) {
////console.log(item);
//var pWidth = item.imgElement.naturalWidth;
//var pHeight = item.imgElement.naturalHeight;
//var bWidth = item._width;
//var bHeight = item._height;
//
//var mat = {
////"sx" : ,
////"sy" : ,
////"widthBound" : ,
////"heightBound" : ,
////"orientation" : "",
//"posX" : item.posX,
//"posY" : item.posY,
//"cWidth" : item._width,
//"cHeight" : item._height,
//"imgElement" : item.imgElement
//}
//	
////가로폭에 맞춰서 사진 보여주기
//mat.widthBound = item.imgElement.naturalWidth;
//mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
////세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
//if(mat.heightBound > item.imgElement.naturalHeight){
//mat.heightBound = item.imgElement.naturalHeight;
//mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
//}
//return mat;
//},



//drawingTargetImage : function(item) {
//var i = this.adjustImageSize(item);
//i = this.adjustImagePosition(i);
//var canvas = this.mainCanvas;
//var context = canvas.getContext("2d");
//context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound,
//i.heightBound, i.posX, i.posY, i.cWidth, i.cHeight);
//},


//boardToCanvas : function() {
//var canvas = document.createElement("canvas");
//canvas.setAttribute("id", "main");
//canvas.width = this.mosaic.totalWidth;
//canvas.height = this.mosaic.totalHeight;
//this.appendPlace.appendChild(canvas);
//this.mainCanvas = canvas;
//
//var boardArray = this.mosaic.board;
//boardArray.map(function(item) {
//this.drawingTargetImage(item);
//}.bind(this));
//},

PhotoCombine.FIGURE = {
	type : {
		"s" : "square",
		"p" : "portrait",
		"l" : "landscape"
	},
	
	getSubOrientation : function(orientation){
		var t = this.type;
		var result = {
			"first" : "",
			"second" : ""
		};
		if(orientation===t.s){
			result.first = t.p;
			result.second = t.l;
		}
		else if(orientation === t.p){
			result.first = t.s;
			result.second = t.l;
		}
		
		else if(orientation === t.l){
			result.first = t.s;
			result.second = t.p;
		}
		
		return result;
	},
	
	getOrientationHash : function(){
		return {
			"square" : {},
			"portrait" : {},
			"landscape" : {}
		}
	},
	
	getOrientation : function(left, right){ // front : "mxn" or number , rear :
											// number
		var type = this.type;
		if(isNaN(left)){
			var splited = left.split("x");
			left = parseInt(splited[0]);
			right = parseInt(splited[1]);
		}
		
		if(left===right) return type.s;
		return left>right?type.l:type.p;
	},
	
	getSimpleRatio : function(width, height){
		var ratio = height/width;
		if(ratio === 1) return "1x1";
		var isOverOne = ratio<1;
		var rounded = Math.round(isOverOne?1/ratio:ratio);
		return isOverOne?rounded+"x1":"1x"+rounded;
	}
}

// var section = {
// "simpleRatio" : "",
// "simpleOrientation" : ""
// };
// if (orientation === "square") {
// section.simpleRatio = "1x1";
// section.simpleOrientation = "square";
// }
// if (orientation === "landscape") {
// var rat = Math.round(1 / ratio);
// section.simpleRatio = rat + "x1";
// section.simpleOrientation = rat === 1 ? "square" : "landscape";
// }
// if (orientation === "portrait") {
// var rat = Math.round(ratio);
// section.simpleRatio = "1x" + rat;
// section.simpleOrientation = rat === 1 ? "square" : "portrait";
// }
// return section;
//






//
// PhotoCombine.prototype = {
// create : function() {
// this.makeMosaicBoard();
// //this.linkBoardWithImageByOptimize();
// this.linkBoardWithImageByOrder();
// this.boardToCanvas();
// },
//	
// createWithOptimize : function(){
// this.makeMosaicBoard();
// this.linkBoardWithImageByOptimize();
// //this.linkBoardWithImageByOrder();
// this.boardToCanvas();
// },
//
// boardToCanvas : function() {
// var canvas = document.createElement("canvas");
// canvas.setAttribute("id", "main");
// canvas.width = this.mosaic.totalWidth;
// canvas.height = this.mosaic.totalHeight;
// this.appendPlace.appendChild(canvas);
// this.mainCanvas = canvas;
//
// var boardArray = this.mosaic.board;
// boardArray.map(function(item) {
// this.drawingTargetImage(item);
// }.bind(this));
// },
//
// getResult : function() {
// return this.mainCanvas.toDataURL();
// },
//	
// getDataUrl : function(){
// return this.mainCanvas.toDataURL();
// },
//
// drawingTargetImage : function(item) {
// var i = this.adjustImageSize(item);
// i = this.adjustImagePosition(i);
// var img = this.photoArray[0];
// var canvas = this.mainCanvas;
// var context = canvas.getContext("2d");
// context.drawImage(i.imgElement, i.widthStart, i.heightStart, i.widthBound,
// i.heightBound, i.posX, i.posY, i.cWidth, i.cHeight);
// },
//	
// adjustImagePosition : function(item){
// //item.widthStart, item.heightStart
// item.widthStart = 0;
// item.heightStart = 0;
//		
// var pHeight = item.imgElement.naturalHeight;
// var pWidth = item.imgElement.naturalWidth;
//		
// item.widthStart = (pWidth - item.widthBound)*0.5;
// item.heightStart = (pHeight - item.heightBound)*0.5;
//		
// return item;
// },
//	
// adjustImageSize : function(item) {
// // console.log(item);
// var pWidth = item.imgElement.naturalWidth;
// var pHeight = item.imgElement.naturalHeight;
// var bWidth = item._width;
// var bHeight = item._height;
//
// var mat = {
// // "sx" : ,
// // "sy" : ,
// // "widthBound" : ,
// // "heightBound" : ,
// // "orientation" : "",
// "posX" : item.posX,
// "posY" : item.posY,
// "cWidth" : item._width,
// "cHeight" : item._height,
// "imgElement" : item.imgElement
// }
//		
// // 가로폭에 맞춰서 사진 보여주기
// mat.widthBound = item.imgElement.naturalWidth;
// mat.heightBound = item._height * (item.imgElement.naturalWidth/item._width);
// // 세로에 빈공간이 생기면 세로폭에 맞춰서 사진 보여주기
// if(mat.heightBound > item.imgElement.naturalHeight){
// mat.heightBound = item.imgElement.naturalHeight;
// mat.widthBound = item._width*(item.imgElement.naturalHeight/item._height);
// }
// return mat;
// },
//	
// // 좌측 상단부터 차례대로 사진 넣기
// linkBoardWithImageByOrder : function() {
// var boardArray = this.mosaic.board;
// var imageArray = this.photoArray;
// boardArray.map(function(item, i) {
// var selectedImage = imageArray[i];
// var isImageUndefined = (typeof selectedImage === "undefined");
// if(isImageUndefined){
// console.log(i%imageArray.length);
// selectedImage = imageArray[i%imageArray.length];
// }
// item.imgElement = selectedImage;
// });
// },
//	
// // 최적의 장소에 넣기
// linkBoardWithImageByOptimize : function(){
// var boardHash = this.getBoardHashByOrientation();
// var imageHash = this.getImageHashByOrientation();
// var matched = this.matchByHash(imageHash, boardHash);
// this.mosaic.board = matched;
// return matched;
// },
//	
// matchByHash : function(imageHash, boardHash){
// var matched = [];
// // 가장 적합한 match
// for(var orientType in imageHash){
// var imageTargetHash = imageHash[orientType];
// for(var imageTemplateSize in imageTargetHash){
// var imageTargetArray = imageTargetHash[imageTemplateSize];
// imageTargetArray.map(function(item){
// var boardTargetArray = boardHash[orientType][imageTemplateSize];
// if(typeof boardTargetArray === "undefined") {
// item.isMatched = -1;
// return;
// }
// var remain = boardTargetArray.length;
// if(remain === 0){
// delete boardHash[orientType][imageTemplateSize];
// item.isMatched = -1;
// return;
// }
//					
// var matchedObject = boardTargetArray.shift();
// matchedObject.imgElement = item.originalElement;
// item.isMatched = 1;
// matched.push(matchedObject);
// });
// }
// }
// matched = this.remainMatching(imageHash, boardHash, matched);
// return matched;
// },
//	
// remainMatching : function(imageHash, boardHash, matched){
// for(orientType in imageHash){
// var imageTargetHash = imageHash[orientType];
// for(var imageTemplateSize in imageTargetHash){
// var imageTargetArray = imageTargetHash[imageTemplateSize];
// imageTargetArray.map(function(item){
// if(item.isMatched > 0){return;}
// var secondKey = this.secondKeySearching(item, boardHash);
// var matching = this.secondMatching(item, secondKey, boardHash);
// matched.push(matching);
// }.bind(this));
// }
// }
// return matched;
// },
//	
// secondMatching : function(item, secondKey, boardHash){
// var matchingHash = boardHash[secondKey];
// var target = {};
// for(var i in matchingHash){
// var targetArray = matchingHash[i];
// target = targetArray.shift();
// target.imgElement = item.originalElement;
// if(targetArray.length === 0){
// delete matchingHash[i];
// }
// item.isMatched = 1;
// return target;
// }
// },
//	
// secondKeySearching : function(item, boardHash){
// var originalOrient = item.originalOrientation;
// var target = (originalOrient==="square"?"square":"other") +
// "SecondKeySearching";
// var key = this[target](originalOrient, boardHash);
// return key;
// },
//	
// squareSecondKeySearching : function(originalOrient, boardHash){
//		
// console.log("square");
// },
//	
// otherSecondKeySearching : function(originalOrient, boardHash){
//		
// var target = (originalOrient==="landscape")?"landscape":"portrait";
// var verseTarget = (target==="landscape")?"portrait":"landscape";
//		
// var isTargetKeyRemain = this.hasKey(boardHash[target]);
// var isSqureKeyRemain = this.hasKey(boardHash["square"]);
// var isVerseKeyReamin = this.hasKey(boardHash[verseTarget]);
//		
// // console.log("============= search key =============");
// // console.log(boardHash[target]);
// // console.log(boardHash[verseTarget]);
// // console.log(boardHash["square"]);
// var key = "";
// if(isTargetKeyRemain){
// key = target;
// // console.log(key);
// return key;
// }
// if(isSqureKeyRemain) {
// key = "square";
// // console.log(key);
// return key;
// }
// if(isVerseKeyReamin){
// key = verseTarget;
// // console.log(key);
// return key;
// }
// },
//	
// hasKey : function(json){
// var keyList = [];
// for(var key in json){
// keyList.push(key);
// }
// var result = keyList.length === 0?false:true;
// return result;
// },
//	
// getBoardHashByOrientation : function(){
// var bArray = this.mosaic.board;
// var ratioHash = {
// "portrait" : {},
// "square" : {},
// "landscape" : {}
// }
// for(var i=0 ; i<bArray.length ; i++){
// var orientation = bArray[i].orientation;
// var ratio = bArray[i].ratio;
// var targetHash = ratioHash[orientation];
// if(typeof targetHash[ratio] === "undefined") targetHash[ratio] = [];
// targetHash[ratio].push(bArray[i]);
// }
// return ratioHash;
// },
//	
// getImageHashByOrientation : function(){
// var pArray = this.photoArray;
// var ratioHash = {
// "portrait" : {},
// "square" : {},
// "landscape" : {}
// };
// var checkedPhoto = PhotoChecker(pArray).simpleRatioList;
// for(var i=0 ; i<checkedPhoto.length ; i++){
// var orientation = checkedPhoto[i].simpleOrientation;
// var ratio = checkedPhoto[i].simpleRatio;
// var targetHash = ratioHash[orientation];
// if(typeof targetHash[ratio] === "undefined") targetHash[ratio] = [];
// targetHash[ratio].push(checkedPhoto[i]);
// }
// return ratioHash;
// },
//	
// makeMosaicBoard : function() {
// var t = this.template;
// var m = this.mosaic;
// var convertedTemplate = [];
// t.array.map(function(item, oneDimIdx) {
// var ori = this.getOrientationWithRatio(item);
// var idx = this.oneDimToTwoDim(oneDimIdx);
// var area = this.stringAreaToObject(item);
// if (area === null)
// return;
// var cvtItem = {
// "orientation" : ori,
// "ratio" : item,
// "posX" : idx.r * m.roomWidth,
// "posY" : idx.c * m.roomHeight,
// "_width" : area.w * m.roomWidth,
// "_height" : area.h * m.roomHeight
// }
// convertedTemplate.push(cvtItem);
// }.bind(this));
// console.log(convertedTemplate);
// m.board = convertedTemplate;
// },
//	
// getOrientationWithRatio : function(ratio){
// var splited = ratio.split("x");
// var left = splited[0];
// var right = splited[1];
//		
// if(left === right) return "square";
// return left>right?"landscape":"portrait";
// },
//	
// oneDimToTwoDim : function(index) {
// var column = this.template.column;
// var row = this.template.row;
// return {
// "c" : parseInt(index / column),
// "r" : index % row
// };
// },
//
// stringAreaToObject : function(stringItem) {
// if (stringItem.length === 1)
// return null;
// var itemSplit = stringItem.split("x").map(function(i) {
// return parseInt(i);
// });
// return {
// "w" : itemSplit[0],
// "h" : itemSplit[1]
// };
// },
//
// getMaterial : function(material) {
// var m = material;
// this.setTemplateMaterial(m.templateArray, m.templateColumn, m.templateRow);
// this.setMosaicMaterial(m.mWidth, m.mHeight);
// var tArrayLength = this.templateCount(m.templateArray);
// this.setPhotoArray(m.photoArray, tArrayLength);
// this.setAppendPlace(m.appendPlace);
// },
//
// setAppendPlace : function(element) {
// this.appendPlace = element;
// },
//
// setMosaicMaterial : function(width, height) {
// var t = this.template;
// this.mosaic = {
// "totalHeight" : height,
// "totalWidth" : width,
// "roomWidth" : width / t.row,
// "roomHeight" : height / t.column
// }
// },
//
// setPhotoArray : function(pArray, tArrayLength) {
// if(pArray.length == tArrayLength){
// this.photoArray = pArray;
// return ;
// }
// this.photoArray = this.selectRandomPhoto(pArray, tArrayLength);
// console.log(this.photoArray);
// return ;
// },
//	
// selectRandomPhoto : function(pArray, tArrayLength){
// var photoElementList = [];
// if(pArray.length > tArrayLength){
// var shuffled = this.shuffleArray(pArray);
// return shuffled.splice(0, tArrayLength);
// } else { //pArray.length < tArrayLength
//			
// }
// return photoElementList;
// },
//	
// shuffleArray : function(array){
// var indexArray = (function(){
// var temp = [];
// for(var i=0 ; i<array.length ; i++){
// temp.push(i);
// }
// return temp;
// })();
//		
// var shuffled = [];
// while(indexArray.length > 0){
// var randIndex = parseInt(Math.random()*indexArray.length);
// var tempEle = indexArray[0];
// indexArray[0] = indexArray[randIndex];
// indexArray[randIndex] = tempEle;
//			
// var ele = indexArray.shift();
// shuffled.push(array[ele]);
// }
// return shuffled;
// },
//
// setTemplateMaterial : function(tArray, column, row) {
// this.template = {
// "array" : tArray,
// "column" : column,
// "row" : row
// }
// },
//	
// templateCount : function(templateArray){
// var countArray = templateArray.filter(function(item){
// return item != "x";
// });
// return countArray.length;
// }
// }
//
