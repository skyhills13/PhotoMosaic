var data = [
{"target" : 1, "w" : 341, "h" : 432},
{"target" : 2, "w" : 324, "h" : 543},
{"target" : 3, "w" : 574, "h" : 658},
{"target" : 4, "w" : 345, "h" : 534},
{"target" : 5, "w" : 562, "h" : 765},
{"target" : 6, "w" : 956, "h" : 654},
{"target" : 7, "w" : 467, "h" : 712},
{"target" : 8, "w" : 656, "h" : 543},
{"target" : 9, "w" : 374, "h" : 654},
{"target" : 10, "w" : 642, "h" : 765},
{"target" : 11, "w" : 543, "h" : 845},
{"target" : 12, "w" : 765, "h" : 783},
{"target" : 13, "w" : 845, "h" : 945},
{"target" : 14, "w" : 123, "h" : 324},
{"target" : 15, "w" : 865, "h" : 657},
{"target" : 16, "w" : 534, "h" : 325},
{"target" : 17, "w" : 753, "h" : 834},
{"target" : 18, "w" : 823, "h" : 123},
{"target" : 19, "w" : 543, "h" : 745},
{"target" : 20, "w" : 745, "h" : 856},
{"target" : 21, "w" : 842, "h" : 456}
];

(function(){

// 사진의 갯수가 1인가?
if(data.length === 1){
	return;
}

// data의 비율 알기
data.map(function(item){
	item.ratio = item.w / item.h;
});

data.sort(function(a, b){
	return a.ratio - b.ratio;
});

var firstMerge = [];

for(var i=0 ; i<data.length ; i++){
	if(i%2!=0) continue;
	var target = data[i];
	var nextTarget = data[i+1];
	if(nextTarget === undefined) continue;
	var type = getMergeType(target, nextTarget);
	var newRect = mergingTarget(target, nextTarget, type);
	firstMerge.push(
		{
			"type" : type,
			"merged" : [target, nextTarget],
			"w" : newRect.w,
			"h" : newRect.h
		});
}

})();

function mergingTarget(target, nextTarget, type){
	
	
	return {"w" : 0, "h" : 0};
}

function getMergeType(target, nextTarget){
	if (target.ratio > 1 && nextTarget.ratio > 1){
		return "ver";
	}
	if (target.ratio < 1 && nextTarget.ratio < 1){
		return "hor";
	}
	return "alt";
}





