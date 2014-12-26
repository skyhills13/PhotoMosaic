/**
 * 썸네일에 관한 라이트 박스
 */

(function(window){
	var console = window.console;
	var document = window.document;
	
	// for lightBox
	var MosaicShowInLightBox = {
		element : document.querySelector("#lightBoxWrapper article.represent"),

		init : function(handler) {
			this.handler = handler;
			this.showingHandler();
		},
		
		showingHandler : function(){
			var mosaic = document.querySelector("#wrapper aside section.thumbnail img");
			var box = this.element;
			var wrapper = this.handler.wrapper;
			mosaic.addEventListener("click", function(){
				this.handler.onShowingWrapper(true);
				this.handler.onShowingElement(true);
			}.bind(this));
		}
	}
	
	var handler = new LightBoxHandler(MosaicShowInLightBox);
	handler.onShowingWrapper(true);
	
}(this));