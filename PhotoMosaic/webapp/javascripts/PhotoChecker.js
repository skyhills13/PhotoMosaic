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

