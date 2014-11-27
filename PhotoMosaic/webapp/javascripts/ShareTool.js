

function ShareTool(){
	
}

ShareTool.prototype = {
	URL : function(sButton){
		var currentUrl = this.getCurrentUrl();
		this.copyURL(sButton, currentUrl);
	},
	
	getCurrentUrl : function(){
		return location.href;
	},
	
	copyURL : function(button, url){
		button.addEventListener("click", function(){
//			url.execCommand('copy');
			alert(url+" 를 복사해주세요.");
		});
	}
}