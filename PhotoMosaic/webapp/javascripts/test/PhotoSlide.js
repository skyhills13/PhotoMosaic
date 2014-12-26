/**
 * 슬라이드에 관한 라이트 박스
 */

(function(window){
	var console = window.console;
	var document = window.document;
	
	var Slider = {
			id : "test2",
			initialShowing : false,
			
			init : function(common){
				this.lightBox = common;
				this.showingHandler();
				this.innerDOMCreate();
			},
			
			innerDOMCreate : function(){
				console.log(this);
			},
			
			showingHandler : function(){
				var list = document.querySelector("#list ul li.container");
				list.addEventListener("click", function(){
					this.lightBox.onShowingElement(true);
				}.bind(this));
			}
		}
	var put = {
			"target" : document.querySelector("#lightBoxWrapper"),
			"place" : "afterbegin"
		}
	

	var lb = new LightBox(put, Slider);
}(this));