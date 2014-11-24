/**
 * 
 */


function RangeBar(maxValue, setPosition, type){
	this.setBarType(type);
	this.createElement();
	this.posElement(setPosition);
	this.eventAttach(maxValue);
}

RangeBar.prototype = {
	rangeId : "range2range",
	barId : "bar2bar",
	pointId : "point2point",
	
	setBarType : function(type){
		this.type = "vertical";
		if(type===undefined) return;
		this.type = "horizontal";
	},
	
	createElement : function(){
		var element = "<div id='" + this.rangeId + "'>" +
					"<div id='" + this.barId + "'>"+
					"<div id='" + this.pointId + "'></div></div></div>";
		this.rangeElement = element;
	},
	
	posElement : function(setPosition){
		setPosition.insertAdjacentHTML("beforeend",this.rangeElement);
		this.range = setPosition.querySelector("#" + this.rangeId);
	},
	
	eventAttach : function(){
		var bar = this.range.querySelector("#"+this.barId);
		var point = this.range.querySelector("#"+this.pointId);
		bar.addEventListener("click", function(e){
//			console.log(window.getComputedStyle(e.target));
//			console.log(e.offsetX, e.offsetY);
			
		});
	}
}
	
