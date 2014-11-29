function UTIL() {
}

UTIL.prototype = {
	pixelToNumber : function(pixel) {
		var len = pixel.length;
		var isPixel = pixel.substring(len - 2, len) === "px" ? true : false;
		var result = pixel.substring(0, len - 2);
		var isNumber = !isNaN(pixel.substring(0, len - 2));
		if (isPixel && isNumber)
			return Number(result);
	},
	
	numberToPixel : function(number){
		return number + "px";
	},

	computedStyle : function(target, toGetStyle) {
		return window.getComputedStyle(target)[toGetStyle];
	},
	
	computedNumStyle : function(target, toGetStyle){
		var rePx = window.getComputedStyle(target)[toGetStyle];
		var reNum = this.pixelToNumber(rePx);
		return reNum;
	}
}

function PhotoListSlide(wrapper, lightBox) {
	this.ut = new UTIL();
	this.lightBox = lightBox;
	this.container = wrapper.firstElementChild;
	this.wrapper = wrapper;
	this.chageLightBoxClassName();
	this.createNavigation();
	this.eventHander();
}

PhotoListSlide.prototype = {
	eventHander : function() {
		this.basicImageShowEvent();
		this.windowResizeWithRangeBarEvent();
	},
	
	windowResizeWithRangeBarEvent : function(){
		window.addEventListener("resize", function(e){
			this.rangeBarSize();
			this.resizingCurrentDiv();
		}.bind(this));
	},
	
	basicImageShowEvent : function(){
		var IMG_TAG = "img";
		var IMG_CLASS_NAME = "original";
		var CONTAINER_CLASS = "container";
		
		this.wrapper.addEventListener("click", function(e) {
			var target = e.target;
			console.log(e);
			var isContainer = e.target.classList.contains(CONTAINER_CLASS);
			if (isContainer) {
				var targetDataNumber = this.getDataNumber(target);
				this.changeLightBoxVisible();
				this.showTargetImage(targetDataNumber);
				this.rangeBarSize();
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
		this.resizingCurrentDiv();
	},

	removeRemainPhoto : function(targetNumber) {
		var PREV = ".previous";
		var NEXT = ".next";
		var EMPTY_STRING = "";
		var DIV = "div";

		var isFirstPhoto = targetNumber == 0;
		var isLastPhoto = targetNumber == (this.wrapper.childElementCount - 1);
		if (!isFirstPhoto && !isLastPhoto)
			return;

		var selector = isFirstPhoto ? PREV : NEXT;
		this.lightBox.querySelector(selector+" "+DIV).innerHTML = EMPTY_STRING;
	},

	imagePutter : function(classOfArea, currentContainer) {
		var CUR = "current";
		var ORIGINAL_IMG_QUERY = "img.original";
		var siblingQuery = classOfArea + "ElementSibling";
		var putClassQuery = "." + classOfArea + ">div";
		var toShowArea = this.lightBox.querySelector(putClassQuery);
		var isCurrentArea = classOfArea === CUR;
		var container = isCurrentArea ? currentContainer : currentContainer[siblingQuery];
		
		if (container === null)
			return;
		var toShowImage = container.querySelector(ORIGINAL_IMG_QUERY);
		toShowArea.innerHTML = toShowImage.outerHTML;
	},

	rangeBarPosition : function(targetNumber) {
		var RANGE_QUERY = "nav section input[type='range']";
		var rangeBar = this.lightBox.querySelector(RANGE_QUERY);
		rangeBar.value = targetNumber;
	},
	
	rangeBarSize : function(){
		var u = this.ut;
		var RANGE_QUERY = "nav section input[type='range']";
		var WRAPPER_QUERY = "nav section";
		var rangeBar = this.lightBox.querySelector(RANGE_QUERY);
		var wrapper = this.lightBox.querySelector(WRAPPER_QUERY);
		var wrapperHeight= u.pixelToNumber(u.computedStyle(wrapper, "height"));
		var rangeBarBorderLeftWidth = u.pixelToNumber(u.computedStyle(rangeBar, "borderLeftWidth"));
		var rangeBarBorderBottomWidth = u.pixelToNumber(u.computedStyle(rangeBar, "borderBottomWidth"));
		
		rangeBar.style.width = u.numberToPixel(wrapperHeight);
		rangeBar.style.top = u.numberToPixel(wrapperHeight/2 - rangeBarBorderLeftWidth);
		rangeBar.style.left = u.numberToPixel((wrapperHeight/2+rangeBarBorderBottomWidth)*-1);
	},

	getDataNumber : function(target) {
		var KEY = "data-list";
		var CONTAINER_CLASS = "container";
		var data = "";

		while (true) {
			data = target.getAttribute(KEY);
			var hasData = data != null;
			var isContainer = target.classList.contains(CONTAINER_CLASS);
			if (hasData && isContainer)
				break;
			target = target.parentNode;
		}
		return parseInt(data);
	},

	resizingCurrentDiv : function() {
		var CUR_IMG = ".current img";
		var widthDepend = "widthDepend";
		var heightDepend = "heightDepend";
		
		var target = this.lightBox.querySelector(CUR_IMG);
		var cw = target.naturalWidth;
		var ch = target.naturalHeight;
		var cRatio = cw/ch;
		
		var parent = target.parentNode;
		var pw = this.ut.computedNumStyle(parent, "width");
		var ph = this.ut.computedNumStyle(parent, "height");
		var pRatio = pw/ph;
		
		var sizeClass = pRatio>=cRatio?heightDepend:widthDepend;
		target.className = sizeClass;
		
		if(sizeClass === widthDepend){
			var decHeight = (pw/cw)*ch;
			var remain = (ph - decHeight)/2;
			target.style.top = this.ut.numberToPixel(remain);
		}
	},

	changeLightBoxVisible : function() {
		var HIDE_CLASS = "hide";
		var SHOW_CLASS = "show"

		var current = this.lightBox.classList.contains(HIDE_CLASS) ? HIDE_CLASS : SHOW_CLASS;
		var toAdd = !this.lightBox.classList.contains(HIDE_CLASS) ? HIDE_CLASS : SHOW_CLASS;

		this.lightBox.classList.remove(current);
		this.lightBox.classList.add(toAdd);
		this.chageBackgroundScrollState();
	},

	chageLightBoxClassName : function() {
		var SLIDE_CLASS = "slide";
		this.lightBox.classList.add(SLIDE_CLASS);
	},

	chageBackgroundScrollState : function() {
		var BODY_TAG = "body";
		var LB_SHOWING_CLASS = "lightBoxShowing";
		var REMOVE_CLASS = "remove";
		var ADD_CLASS = "add";

		var bg = document.querySelector(BODY_TAG);
		var action = bg.classList.contains(LB_SHOWING_CLASS) ? REMOVE_CLASS : ADD_CLASS;
		bg.classList[action](LB_SHOWING_CLASS);
	},

	createNavigation : function() {
		function createRangeBar(photolen) {
			return "<nav><section><div></div><input type='range' min='0' max='" + photolen + "'></input></section></nav>";
		}

		function createPhotoShowElements() {
			var photoShowElements = "<div class='previous'><div></div></div>" + "<div class='current'><div></div></div>"
					+ "<div class='next'><div></div></div>";
			return photoShowElements;
		}

		var rangeBar = createRangeBar(this.wrapper.childElementCount - 1);
		var photoShowElements = createPhotoShowElements();

		var section = this.lightBox.querySelector("section");
		section.innerHTML = photoShowElements;
		section.insertAdjacentHTML("afterend", rangeBar);
		this.lightBoxEvent();
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

		var miniPhoto = this.lightBox.querySelector("nav section div");
		slideBar.addEventListener("mousemove", function(e) {
			miniPhoto.style.display = "block";
			this.showPictureThumbnail(e);
		}.bind(this));
		
		slideBar.addEventListener("mouseout", function(e) {
			miniPhoto.style.display = "none";
		}.bind(this));
	},

	showPictureThumbnail : function(event) {
		var u = this.ut;
		var target = event.target;

		var rangeNumber = parseInt(target.max);
		var rWidth = u.pixelToNumber(u.computedStyle(target, "width"));
		var rBorderLeft = u.pixelToNumber(u.computedStyle(target, "borderLeftWidth"));
		var rBorderRight = u.pixelToNumber(u.computedStyle(target, "borderRightWidth"));

		var minBound = rBorderLeft;
		var maxBound = rBorderLeft + rWidth;
		var current = event.offsetX;
		var boundary = this.isBoundary(minBound, current, maxBound);
		var oneRangeWidth = rWidth/rangeNumber;
		var pos = 0;

		if (boundary == 0) {
			pos = ((current - rBorderLeft) / rWidth) * rangeNumber;
			pos = Math.round(pos);
		}
		if (boundary > 0) {
			pos = rangeNumber;
			current = maxBound;
		}
		if (boundary < 0) {
			pos = 0;
			current = minBound;
		}
		this.showMiniPhoto(pos, current, oneRangeWidth);
	},
	
	showMiniPhoto : function(number, offset, oneRangeWidth){
		var miniPhoto = this.lightBox.querySelector("nav section div");
		var miniPhotoHeight = this.ut.pixelToNumber(this.ut.computedStyle(miniPhoto, "height"));
		miniPhoto.style.top = this.ut.numberToPixel(offset-miniPhotoHeight);
		var container = this.wrapper.querySelectorAll(".container")[number];
		var img = container.querySelector("img.original");
		miniPhoto.innerHTML = img.outerHTML;
	},

	isBoundary : function(minBound, current, maxBound) {
		if (current >= minBound && current <= maxBound)
			return 0;
		if (current < minBound)
			return -1;
		if (current > maxBound)
			return 1;
	},

	pictureMoveAlongSlideBar : function(event) {
		var targetNumber = event.target.valueAsNumber;
		this.showTargetImage(targetNumber);
	}
}
