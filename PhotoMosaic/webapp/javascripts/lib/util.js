/****
 *   Get browser prefix
 */
 
 //util.js 아주 쓸만한 게 많네. 잘 모아두고 정리했다. (짠거 맞지..? ㅎㅎ)
 // 전체적으로 hashtable 구주로 key-value형태로 왜 구현안했는지 약간 아쉽네. 
 /*
 var util = {
 	getBrowserPrefix : function() {
 		  
 	},
 	//이렇게 계속..
 }
 
 */
 
function getBrowserPrefix() {
	if (typeof document.body.style.webkitTransition !== "undefined") {
		return "webkit";
	} else if (typeof document.body.style.msTransition !== "undefined") {
		return "ms";
	} else if (typeof document.body.style.MozTransition !== "undefined") {
		return "moz";
	} else if (typeof document.body.style.oTransition !== "undefined") {
		return "o";
	} else {
		return "";
	}
}

/****
 *   Create multidimensional array
 */
function createArray(/* 1d size, 2d size, 3d size, ... */) {
	var array = new Array(arguments[0] || 0);

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		var firstArg = arguments[0];

		while(firstArg--) {
			array[(arguments[0] - 1) - firstArg]
					= createArray.apply(this, args);
		}
	}

	return array;
}

/****
 *   Search target object in its array
 *   [{"key": "key1", value: "value1"}, {"key": "key2", value: "value2"}, ... ]
 */
function objectFindByKey(array, key, value) {
	for (var idx = 0; idx < array.length; idx++) {
		if (array[idx][key] === value) {
			return array[idx];
		}
	}
	
	return null;
}

/****
 *   Type check for String
 */
function isString(target) {
	if (typeof strClassName === "undefined"  //이코드보니까 생각나는데 아예 javascript type을 체크하는 메서드를 만드는 것도 꽤 쓸만한 거야.
		|| strClassName === null) {
		return false;
	}
	
	return true;
}

function suffleArray(array) {
	var counter = array.length;
	var temp;
	var index;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

function UTIL(){
	return {
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
		
		adjustArrayWithSpecificLength : function(array, toGetLen){
			var curLen = array.length;
			console.log(curLen, toGetLen);
			if(curLen > toGetLen){
				var removeLen = curLen - toGetLen;
				return array.slice(removeLen);
			} else if (curLen < toGetLen){
				while(array.length!=toGetLen){
					var targetIndex = array.length%curLen;
					array.push(array[targetIndex]);
				}
				return array;
			}
			return array;
		}
	};
};

