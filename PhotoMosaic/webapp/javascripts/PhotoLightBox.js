function PhotoLightBox(lightBox, photo){
	this.lightBox = lightBox;
	this.photo = photo;
	this.open();
	this.closeHandler();
}

PhotoLightBox.prototype = {
	open : function(){ 
		var section = "<section class='thumbnail'></section>";
		this.lightBox.innerHTML = section;
		this.lightBox.firstElementChild.appendChild(this.photo.cloneNode());
	},
	
	closeHandler : function(){
		var lightBox = this.lightBox;
		var hide = "hide"; 
		lightBox.addEventListener("click", function(){
			lightBox.classList.add(hide);
		}, false);
	}
}

