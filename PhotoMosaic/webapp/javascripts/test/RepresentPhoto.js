/**
 * 썸네일에 관한 라이트 박스
 */

(function(window){
	var console = window.console;
	var document = window.document;
	
	// for lightBox
	var MosaicShowInLightBox = {
		id : "test",
		info : "info",
		initialShowing : true,

		init : function(common) {
			this.lightBox = common;
			this.innerDOMCreate();
			this.showingHandler();
		},
		
		showingHandler : function(){
			var mosaic = document.querySelector("aside section.thumbnail img");
			var box = this.lightBox.element;
			var wrapper = this.lightBox.wrapper;
			mosaic.addEventListener("click", function(){
				this.lightBox.onShowingWrapper(true);
				this.lightBox.onShowingElement(true);
			}.bind(this));
		},

		innerDOMCreate : function() {
			var ele = this.createStringElement();
			this.lightBox.element.insertAdjacentHTML("beforeend", ele.infoSection);
			this.fillInfoSection();
		},

		fillInfoSection : function() {
			var infoSection = this.lightBox.element.querySelector("section." + this.info);
			infoSection.innerHTML = this.getContents();
		},
		
		getContents : function(){
			var imgSrc = document.querySelector("#mosaic").src;
			var img = "<img src='" + imgSrc + "' />";
			var title = document.querySelector("aside section.title p").outerHTML;
			return title + img;
		},

		createStringElement : function() {
			return {
				infoSection : "<section class='info'></section>",
			}
		}
	}
	
	var put = {
		"target" : document.querySelector("#lightBoxWrapper"),
		"place" : "afterbegin"
	}
	
	var lb = new LightBox(put, MosaicShowInLightBox);
	lb.onShowingWrapper(true);
	
}(this));