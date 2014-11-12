function PhotoLightBox(lightBox, photo, commentList, afterclose) {
	this.lightBox = lightBox;
	this.photo = photo;
	this.commentList = commentList;

	this.setSection(this.show);
	this.closeHandler(afterclose);
}

PhotoLightBox.prototype = {

	setSection : function(showCallback) {
		var section = "<section class='thumbnail'></section>";
		this.lightBox.innerHTML = section;
		showCallback.bind(this)();
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
			afterclose();
		}, false);
	}
}
