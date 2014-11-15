function PhotoLightBox(lightBox, photo, commentList, afterclose) {
	this.lightBox = lightBox;
	this.photo = photo;
	this.commentList = commentList;

	this.setSection(this.show);
	this.backgroundScrollState();
	this.closeHandler(afterclose);
}

PhotoLightBox.prototype = {

	setSection : function(showCallback) {
		var section = "<section class='thumbnail'></section>";
		this.lightBox.innerHTML = section;
		showCallback.bind(this)();
	},
	
	backgroundScrollState : function(){
		var bg = document.querySelector("body");
		var CLASS_NAME = "lightBoxShowing";
		var action = bg.classList.contains(CLASS_NAME)?"remove":"add";
		bg.classList[action](CLASS_NAME);
	},

	show : function() {
		var sectionElement = this.lightBox.querySelector("section.thumbnail");
		this.showPhoto(sectionElement);
		this.showComment(sectionElement);
	},

	showPhoto : function(sectionElement) {
		sectionElement.appendChild(this.photo.cloneNode());
	},

	showComment : function(sectionElement) {
		var createPElement = function(comment) {
			return "<p>" + comment + "</p>";
		}
		var commentElements = "";
		this.commentList.map(function(item) {
			commentElements += createPElement(item);
		});
		sectionElement.insertAdjacentHTML("afterbegin", commentElements);
	},

	closeHandler : function(afterclose) {
		var lightBox = this.lightBox;
		var hide = "hide";
		var CLASS_NAME = "thumbnail";
		lightBox.addEventListener("click", function() {
			if(!lightBox.classList.contains(CLASS_NAME)) return;
			lightBox.classList.add(hide);
			lightBox.classList.remove(CLASS_NAME);
			this.backgroundScrollState();
			afterclose();
		}.bind(this), false);
	}
}
