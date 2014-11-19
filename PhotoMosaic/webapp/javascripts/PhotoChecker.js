/**
 * 추후에 사진을 준비하는 객체로 합치기
 * 사진이 모두 로드된 후에 실행하기 
 */


function PhotoChecker(list){
	
	createObject(list);
	return list;
}

function createObject(plist){
	var olistArray = [];
	for(var i=0 ; i<plist.length ; i++){
		var info = convertSimpleRatio(plist[i]);
		var pObject = {
//			"state" : info.state,
//			"simpleRatio" : info.ratio,
			"originalElement" : plist[i]
		}
		olistArray.push(pObject);
	}
	return olistArray;
}

function convertSimpleRatio(photoElement){
	var originWidth = photoElement.naturalWidth;
	var originHeight = photoElement.naturalHeight;
	
	var ratio = originWidth / originHeight;
}




