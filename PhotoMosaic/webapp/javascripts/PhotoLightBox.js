function PhotoLightBox(lightBox, photo, commentList, afterBoxCloseCallback) {
	this.lightBox = lightBox;
	this.photo = photo;
	this.commentList = commentList;

	this.setThumbnailLightBox(this.show);
	this.backgroundScrollState();
	this.closeHandler(afterBoxCloseCallback);
}

PhotoLightBox.prototype = {

	setThumbnailLightBox : function(showCallback) {
		var section = "<section></section>";
		var THUMBNAIL = "thumbnail";
		var SHOWING = "show";
		
		this.lightBox.innerHTML = section;
		this.lightBox.classList.add(THUMBNAIL);
		this.lightBox.classList.add(SHOWING);
		showCallback.bind(this)();
	},
	
	backgroundScrollState : function(){
		var CLASS_NAME = "lightBoxShowing";
		var BODY_TAG = "body";
		var REMOVE_ACTION = "remove";
		var ADD_ACTION = "add";
		
		var bodyElement = document.querySelector(BODY_TAG);
		var action = bodyElement.classList.contains(CLASS_NAME)?REMOVE_ACTION:ADD_ACTION;
		bodyElement.classList[action](CLASS_NAME);
	},

	show : function() {
		var SECTION_TAG = "section";
		var sectionElement = this.lightBox.querySelector(SECTION_TAG);
		this.showPhoto(sectionElement);
		this.showComment(sectionElement);
	},

	showPhoto : function(sectionElement) {
		sectionElement.appendChild(this.photo.cloneNode());
	},

	showComment : function(sectionElement) {
		var commentElements = "";
		this.commentList.map(function(item) {
			var pElement = "<p>" + item + "</p>";
			commentElements += pElement;
		});
		sectionElement.insertAdjacentHTML("afterbegin", commentElements);
	},

	closeHandler : function(afterBoxCloseCallback) {
		var HIDE_CLASS = "hide";
		var SHOW_CLASS = "show";
		var THUMBNAIL_CLASS = "thumbnail";
		var SLIDE_CLASS = "slide";

		this.lightBox.addEventListener("click", function() {
			if(!lightBox.classList.contains(THUMBNAIL_CLASS)) return;
			lightBox.classList.add(HIDE_CLASS);
			lightBox.classList.add(SLIDE_CLASS);
			lightBox.classList.remove(THUMBNAIL_CLASS);
			lightBox.classList.remove(SHOW_CLASS);
			this.backgroundScrollState();
			afterBoxCloseCallback();
		}.bind(this), false);
	}
}
