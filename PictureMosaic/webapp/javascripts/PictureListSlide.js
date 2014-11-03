document.addEventListener("DOMContentLoaded", function() {
	var eventTarget = document.querySelectorAll("article#list ul li img");
	new PictureListSlide(eventTarget);
});

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
				this.showTargetImage(e.target);
			}
		}.bind(this));
	},

	showTargetImage : function(target) {
		var targetList = target.parentNode;
		this.imagePutter("current", targetList);
		this.imagePutter("previous", targetList);
		this.imagePutter("next", targetList);
	},

	imagePutter : function(classOfArea, targetList) {
		var area = this.lightBox.querySelector("." + classOfArea);
		var toPut = targetList;
		var toPutInner = "";

		if (classOfArea != "current") {
			toPut = targetList[classOfArea + "ElementSibling"];
		}
		;
		if (toPut != null)
			toPutInner = toPut.innerHTML;

		area.innerHTML = toPutInner;
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
		var lightBox = "<article id='lightBox' class='hide'>" + "<nav></nav>"
				+ "<section><div class='previous'></div>"
				+ "<div class='current'></div>"
				+ "<div class='next'></div></section>" + "</article>";
		var place = document.querySelector("body");
		place.insertAdjacentHTML("afterbegin", lightBox);
		this.lightBox = place.querySelector("#lightBox");
		var photolen = this.photoNodes.length;
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

		this.lightBox.addEventListener("click", function() {
			if (isBoxShow) {
				this.changeLightBoxVisible();
			}
		}.bind(this));
	}
}