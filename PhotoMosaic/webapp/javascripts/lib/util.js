/****
 *   Get browser prefix
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
	if (typeof strClassName === "undefined"
		|| strClassName === null) {
		return false;
	}
	
	return true;
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
