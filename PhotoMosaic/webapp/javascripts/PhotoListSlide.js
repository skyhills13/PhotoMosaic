function PhotoListSlide(wrapper, lightBox) {
	this.lightBox = lightBox;
	this.container = wrapper.firstElementChild;
	this.wrapper = wrapper;
	this.createNavigation();
	this.eventHander();
}

PhotoListSlide.prototype = {

	eventHander : function() {
		var IMG_TAG = "img";
		var CLASS_NAME = "original";
		this.wrapper.addEventListener("click", function(e) {
			var target = e.target;
			var isTagEqual = e.target.tagName.toLowerCase() === IMG_TAG;
			var isOriginalImage = target.classList.contains(CLASS_NAME);
			if (isTagEqual && isOriginalImage) {
				this.changeLightBoxVisible();
				var targetDataNumber = this.getDataNumber(target);
				this.showTargetImage(targetDataNumber);
				var rangeBar = this.lightBox.querySelector("nav input[type='range']");
				rangeBar.value = rangeBar;
			}
		}.bind(this), false);
	},

	getDataNumber : function(target) {
		var KEY = "data-list";
		var data = "";
		while (true) {
			data = target.getAttribute(KEY);
			if (data != null)
				break;
			target = target.parentNode;
		}
		return parseInt(data);
	},

	showTargetImage : function(targetNumber) {
		var currentContainer = this.wrapper.children[targetNumber];
		this.imagePutter("current", currentContainer);
		this.imagePutter("previous", currentContainer);
		this.imagePutter("next", currentContainer);
		this.removeRemainPhoto(targetNumber);
		this.resizing();
	},

	removeRemainPhoto : function(targetNumber){
		
		if(targetNumber === 0) 
			this.lightBox.querySelector(".previous").innerHTML = "";
		if(targetNumber === this.wrapper.childElementCount-1)
			this.lightBox.querySelector(".next").innerHTML = "";	
		
	},
	
	imagePutter : function(classOfArea, currentContainer) {
		var area = this.lightBox.querySelector("." + classOfArea);
		var toPut = currentContainer.querySelector("img.original");

		if (classOfArea != "current")
			toPut = currentContainer[classOfArea + "ElementSibling"];

		if (toPut != null)
			area.innerHTML = toPut.outerHTML;
	},

	resizing : function() {
		var viewing = this.lightBox.querySelector(".current");
		var target = viewing.querySelector("img");
		var viewingStyle = window.getComputedStyle(viewing);
		var imageStyle = window.getComputedStyle(target);
		var CLASS_NAME = "over";
		
		if(viewingStyle.width < imageStyle.width){
			target.className = CLASS_NAME;
		} else {
			target.className = "";
		}
	},

	changeLightBoxVisible : function() {
		var hide = "hide";
		var show = "show"
		var current = this.lightBox.className === hide ? hide : show;
		var toAdd = current === hide ? show : hide;
		this.lightBox.classList.remove(current);
		this.lightBox.classList.add(toAdd);
	},

	createNavigation : function() {
		function createRangeBar(photolen) {
			return "<input type='range' min='0' max='" + photolen + "'>";
		}

		var photolen = this.wrapper.childElementCount - 1;
		var closeButton = "<input class='close' type='button' />";
		var rangeBar = createRangeBar(photolen);

		var nav = "<nav>" + closeButton + rangeBar + "</nav>";
		var photoSection = "<section>" + "<div class='previous'></div>" + "<div class='current'></div>"
				+ "<div class='next'></div></section>";

		this.lightBox.innerHTML = nav + photoSection;
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

		var closeButton = this.lightBox.querySelector("nav input.close");
		closeButton.addEventListener("click", function() {
			if (isBoxShow) {
				this.changeLightBoxVisible();
			}
		}.bind(this));

		var slideBar = this.lightBox.querySelector("nav input[type='range']");
		slideBar.addEventListener("change", function(e) {
			this.pictureMoveAlongSlideBar(e);
		}.bind(this));
	},

	pictureMoveAlongSlideBar : function(event) {
		var targetNumber = event.target.valueAsNumber;
		this.showTargetImage(targetNumber);
	}
}