/**
 * 슬라이드에 관한 라이트 박스
 */

(function(window){
	var console = window.console;
	var document = window.document;
	
	var Slider = {
			id : "test2",
			info : "info",
			initialShowing : false,
			
			init : function(common){
				this.lightBox = common;
				this.showingHandler();
			},
			
			showingHandler : function(){
				var list = document.querySelector("#list ul li.container");
				console.log(list);
				list.addEventListener("click", function(){
					this.lightBox.onShowingElement(true);
					console.log("Fasdfasd");
				}.bind(this));
			}
		}
	var put = {
			"target" : document.querySelector("#lightBoxWrapper"),
			"place" : "afterbegin"
		}
	
	var lb = new LightBox(put, Slider);
	
	
	document.addEventListener("click", function(e){
		console.log(e.target);
	});
}(this));