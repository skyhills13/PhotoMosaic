var LightBoxHandler = (function(window) {
	
	// 도식화 해서 나타내기
	// 상하관계
	// 코드의 문제가 보이기 시작함
	// 그때부터 설계 고민을 하게 됨
	// 신기술 (localstorage 등) 잘 공부하기
	// 네이버 가서 나만의 프로젝트를 하기 (과외로 - 시간이 없어도 하기)
	// 진도 안쓰고 native 만 쓰던가, 유행하는 것들을 가져다가 쓰기
	// angular.js 등등 써보기 혼자 잘 하기
	// single page application 등
	
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