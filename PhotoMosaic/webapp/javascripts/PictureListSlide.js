function PictureListSlide(target) {
	this.photoNodes = target;
	this.createLightBox();
	this.eventHander();
}

PictureListSlide.prototype = {
	eventHander : function() {
		var eventTarget = this.photoNodes[0].parentNode.parentNode;
		var parentNodeTag = this.photoNodes[0].parentNode.tagName.toLowerCase();
		var photoTag = this.photoNodes[0].tagName.toLowerCase();
		eventTarget.addEventListener("click", function(e) {
			if (e.target.tagName.toLowerCase() === photoTag) {
				this.changeLightBoxVisible();
				var targetList = e.target.parentNode;
				var targetNumber = targetList.getAttribute("data-list");
				this.showTargetImage(targetNumber);
				var sidebar = document
						.querySelector("#lightBox nav input[type='range']");
				sidebar.value = targetNumber;
			}
		}.bind(this));
	},

	showTargetImage : function(targetNumber) {
		var currentList = this.photoNodes[targetNumber].parentNode;
		this.imagePutter("current", currentList);
		this.imagePutter("previous", currentList);
		this.imagePutter("next", currentList);
	},

	imagePutter : function(classOfArea, targetList) {
		var area = this.lightBox.querySelector("." + classOfArea);
		var toPut = targetList;
		var toPutInner = "";
		
		if (classOfArea != "current"){
			toPut = targetList[classOfArea + "ElementSibling"];
		} else {
			toPut = this.reSizingCurrentImage(toPut);
		}
		
		if (toPut != null)
			toPutInner = toPut.innerHTML;
		
		area.innerHTML = toPutInner;
	},
	
	reSizingCurrentImage : function(targetImage){
		var img =  targetImage.querySelector("img");
		var originalStyle = window.getComputedStyle(img);
		var cls = "over";
		console.log(img);
		if(originalStyle.width < originalStyle.height){
			img.classList.add(cls+"Height");
		} else {
			img.classList.add(cls+"Width");
		}
		console.log(img);
		return targetImage;
	},

	changeLightBoxVisible : function() {
		var hide = "hide";
		var show = "show"
		var current = this.lightBox.className === hide ? hide : show;
		var toAdd = current === hide ? show : hide;
		this.lightBox.classList.remove(current);
		this.lightBox.classList.add(toAdd);
	},

	createLightBox : function() {
		var lightBox = "<article id='lightBox' class='hide'>"
				+ "<nav><input type='button' /></nav>"
				+ "<section><div class='previous'></div>"
				+ "<div class='current'></div>"
				+ "<div class='next'></div></section>" + "</article>";
		var place = document.querySelector("body");
		place.insertAdjacentHTML("afterbegin", lightBox);
		this.lightBox = place.querySelector("#lightBox");
		var photolen = this.photoNodes.length - 1;
		var rangeBar = "<input type='range' min='0' max='" + photolen + "'>";
		var nav = this.lightBox.querySelector("nav");
		nav.insertAdjacentHTML("afterbegin", rangeBar);
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

		var slideBar = this.lightBox.querySelector("input[type='range']");
		slideBar.addEventListener("change", function(e) {
			this.pictureMoveAlongSlideBar(e);
		}.bind(this));
	},

	pictureMoveAlongSlideBar : function(evt) {
		var targetNumber = evt.target.valueAsNumber;
		this.showTargetImage(targetNumber);
	}
}