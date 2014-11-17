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
		//CLASS_NAME과 같은 상수가 메서드 안에 있을게 나을까? 밖이 좋을까?
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
		//method 를 사용할때는 caniuse.com같은 곳에서 브라우저 호환성 검사하는 습관(아래 코드가 잘못된건 아님)
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
