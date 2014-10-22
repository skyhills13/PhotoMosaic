document.addEventListener("DOMContentLoaded", function(){
	var photoSection = document.querySelector("article");
	PhotoMosaic(photoSection);
});

function PhotoMosaic(photoSection){
	var photoElementList = photoSection.querySelectorAll("img");
	var checker = new ConditionCheck();
	var util = new Util();
	var merge = new Merge();

	// A 과정 실행
	var isNonPhoto = !checker.isPhotoExisting(photoElementList);
	if(isNonPhoto) return ;

	// 데이터 바꾸기
	var infoObjectArray = util.extractInfo(photoElementList);

	// B 과정 실행
	var isSinglePhoto = checker.isPhotoSingle(infoObjectArray);
	if(isSinglePhoto) return ;

	// C 과정 실행
	var sortedInfoObjectArray = util.sortByAspectRatio(infoObjectArray);
	
	// D과정 실행
	var merged = merge.optimal(sortedInfoObjectArray);
}


function Merge(){}
Merge.prototype = {
	optimal : function(){
		
	},
	optimalFunc : {

	}
}


function Util(){}

Util.prototype = {
	sortByAspectRatio : function(infoObjectArray){
		var sorted = infoObjectArray.sort(function(prev, rear){
			return prev.aspectRatio - rear.aspectRatio;
		});
		return sorted;
	},

	extractInfo : function(photoElementList){
		var infos = [];
		var photoLength = photoElementList.length;
		for(var i=0 ; i<photoLength ; i++){
			var target = photoElementList[i];
			var info = {
				"target" : target,
				"totalWidth" : target.naturalWidth,
				"totalHeight" : target.naturalHeight,
				"aspectRatio" : target.naturalHeight/target.naturalWidth
			}
			infos.push(info);
		}
		return infos;
	}

}



function ConditionCheck(){}

ConditionCheck.prototype = {
	isPhotoExisting : function(photoElementArray){
		var count = photoElementArray.length;
		if(count <= 0){
			alert("사진을 불러주세요");
			return false;
		}
		return true;
	},

	isPhotoSingle : function(photoInfoArray){
		var count = photoInfoArray;
		var bool = count===1?true:false;
		return bool;
	}

}
