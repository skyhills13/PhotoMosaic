function PhotoListSlide(wrapper, lightBox) {
	this.lightBox = lightBox;
	this.container = wrapper.firstElementChild;
	this.wrapper = wrapper;
	this.chageLightBoxClassName();
	this.createNavigation();
	this.eventHander();
}

PhotoListSlide.prototype = {
	eventHander : function() {
		var IMG_TAG = "img";
		var CLASS_NAME = "original";
		
		this.wrapper.addEventListener("click", function(e) {
			var target = e.target;
			var isImageTag = e.target.tagName.toLowerCase() === IMG_TAG;
			var isOriginalImage = target.classList.contains(CLASS_NAME);
			
			if (isImageTag && isOriginalImage) {
				var targetDataNumber = this.getDataNumber(target);
				this.changeLightBoxVisible();
				this.showTargetImage(targetDataNumber);
				this.rangeBarPosition(targetDataNumber);
			}
		}.bind(this), false);
	},

	showTargetImage : function(targetNumber) {
		var CUR = "current";
		var PREV = "previous";
		var NEXT = "next";
		
		var currentContainer = this.wrapper.children[targetNumber];
		this.imagePutter(CUR, currentContainer);
		this.imagePutter(PREV, currentContainer);
		this.imagePutter(NEXT, currentContainer);
		this.removeRemainPhoto(targetNumber);
		this.resizing();
	},
	
	removeRemainPhoto : function(targetNumber){
		var PREV = ".previous";
		var NEXT = ".next";
		var EMPTY_STRING = "";
		
		var isFirstPhoto = targetNumber == 0;
		var isLastPhoto = targetNumber == (this.wrapper.childElementCount-1);
		if(!isFirstPhoto && !isLastPhoto) return;
		
		var selector = isFirstPhoto?PREV:NEXT;
		this.lightBox.querySelector(selector).innerHTML = EMPTY_STRING;		
	},
	
	imagePutter : function(classOfArea, currentContainer) {
		var CUR = "current";
		var ORIGINAL_IMG_QUERY = "img.original";
		var siblingQuery = classOfArea + "ElementSibling";
		var classQuery = "." + classOfArea;
		
		var toShowArea = this.lightBox.querySelector(classQuery);
		var isCurrentArea = classOfArea === CUR;
		var container = isCurrentArea?currentContainer:currentContainer[siblingQuery];

		if(container === null) return;
		var toShowImage = container.querySelector(ORIGINAL_IMG_QUERY);
		toShowArea.innerHTML = toShowImage.outerHTML;
	},

	rangeBarPosition : function(targetNumber){
		var RANGE_QUERY = "nav input[type='range']";
		var rangeBar = this.lightBox.querySelector(RANGE_QUERY);
		rangeBar.value = targetNumber;
	},
	
	getDataNumber : function(target) {
		var KEY = "data-list";
		var CONTAINER_CLASS = "container";
		var data = "";
		
		while (true) {
			data = target.getAttribute(KEY);
			var hasData = data != null;
			var isContainer = target.classList.contains(CONTAINER_CLASS);
			if (hasData && isContainer) break;
			target = target.parentNode;
		}
		return parseInt(data);
	},

	resizing : function() {
		var CUR = ".current";
		var IMG_TAG = "img";
		var CLASS_NAME = "over";
		var EMPTY_STRING = "";
		
		var viewing = this.lightBox.querySelector(CUR);
		var target = viewing.querySelector(IMG_TAG);
		var viewingWidth = window.getComputedStyle(viewing).width;
		var imageWidth = window.getComputedStyle(target).width;
		
		target.className = imageWidth>viewingWidth?CLASS_NAME:EMPTY_STRING;
	},
	
	changeLightBoxVisible : function() {
		var HIDE_CLASS = "hide";
		var SHOW_CLASS = "show"
		
		var current = this.lightBox.classList.contains(HIDE_CLASS)?HIDE_CLASS:SHOW_CLASS;
		var toAdd = !this.lightBox.classList.contains(HIDE_CLASS)?HIDE_CLASS:SHOW_CLASS;
		
		this.lightBox.classList.remove(current);
		this.lightBox.classList.add(toAdd);
		this.chageBackgroundScrollState();
	},
	
	chageLightBoxClassName : function(){
		var SLIDE_CLASS = "slide";
		this.lightBox.classList.add(SLIDE_CLASS);
	},
	
	chageBackgroundScrollState : function(){
		var BODY_TAG = "body";
		var LB_SHOWING_CLASS = "lightBoxShowing";
		var REMOVE_CLASS = "remove";
		var ADD_CLASS = "add";
		
		var bg = document.querySelector(BODY_TAG);		
		var action = bg.classList.contains(LB_SHOWING_CLASS)?REMOVE_CLASS:ADD_CLASS;
		bg.classList[action](LB_SHOWING_CLASS);
	},
	
	createNavigation : function() {
		function createRangeBar(photolen) {
			return "<nav><input type='range' min='0' max='" + photolen + "'></nav>";
		}
		
		function createPhotoShowElements(){
			var photoShowElements = "<div class='previous'></div>" + "<div class='current'></div>"
			+ "<div class='next'></div>";
			return photoShowElements;
		}
		
		var rangeBar = createRangeBar(this.wrapper.childElementCount - 1);
		var photoShowElements = createPhotoShowElements();
		
		var section = this.lightBox.querySelector("section");
		section.innerHTML = photoShowElements;
		section.insertAdjacentHTML("afterend", rangeBar);
		this.lightBoxEvent();
//		var nav = document.querySelector("#lightBox nav");
//		new RangeBar(3, nav);
	},

	lightBoxEvent : function() {
		var isBoxShow = function() {
			return this.lightBox.classList.contains("show");
		}

		document.addEventListener("scroll", function(e) {
			if (isBoxShow) {
				e.preventDefault();
			}
		});

		var closeButton = this.lightBox.querySelector("input[type='button']");
		closeButton.addEventListener("click", function() {
			if (isBoxShow) {
				this.changeLightBoxVisible();
			}
		}.bind(this));

		var slideBar = this.lightBox.querySelector("nav input[type='range']");
		slideBar.addEventListener("change", function(e) {
			this.pictureMoveAlongSlideBar(e);
		}.bind(this));
		slideBar.addEventListener("mousemove",function(e){
			this.showPictureThumbnail(e);
		}.bind(this));
		
		var sliderThumb = this.lightBox.querySelector("#lightBox.slide nav input[type='range']::-webkit-slider-thumb");
//		sliderThumb.addEventListener("", function(e){
//			this.
//		}.bind(this));
	},
	
	showPictureThumbnail : function(event){
		console.log(event);
	},
	
	pictureMoveAlongSlideBar : function(event) {
		var targetNumber = event.target.valueAsNumber;
		this.showTargetImage(targetNumber);
	}
}