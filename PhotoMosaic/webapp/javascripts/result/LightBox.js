var LightBoxHandler = (function(window) {

	var console = window.console;
	var document = window.document;

	function LightBoxHandler(specific) {
		specific.init(this);
		this.element = specific.element;
		this.closeEventHandling();
	}

	LightBoxHandler.prototype = {
		wrapper : document.querySelector("#lightBoxWrapper"),
		showControlButton : "showingHandler",
		open : "show",
		close : "hide",
		
		onShowingWrapper : function(isShowing){
			var target = this.wrapper;
			this.onShowing(target, isShowing);
		},
		
		onShowingElement : function(isShowing){
			var target = this.element;
			this.onShowing(target, isShowing);
		},
		
		onShowing : function(target, isShowing){
			var additional = isShowing?this.open:this.close;
			var removal = isShowing?this.close:this.open;
			target.classList.add(additional);
			if(target.classList.contains(removal))
				target.classList.remove(removal);
		},
		
		closeEventHandling : function() {
			var box = this.element;
			var button = box.querySelector("." + this.showControlButton);
			var wrapper = this.wrapper;

			button.addEventListener("click", function(){
				this.onShowingElement(false);
				this.onShowingWrapper(false);
			}.bind(this));
		},
		
		backArticleScrollState : function(){
			var HIDE_CLASS = "hide";
			var SHOW_CLASS = "show";
			var THUMBNAIL_CLASS = "thumbnail";

			this.lightBox.addEventListener("click", function() {
				if(!lightBox.classList.contains(THUMBNAIL_CLASS)) return;
				lightBox.classList.add(HIDE_CLASS);
				lightBox.classList.remove(THUMBNAIL_CLASS);
				lightBox.classList.remove(SHOW_CLASS);
				this.backgroundScrollState();
				afterBoxCloseCallback();
			}.bind(this), false);
		}
	}
	
	return LightBoxHandler;
}(this));