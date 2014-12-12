(function(window) {

	var console = window.console;
	var document = window.document;
	
	var util = {
		versusClassHandler : function(target, current, next){
			
		}
	}

	function LightBox(putSpec, functionList) {
		this.createLightBox(functionList.id, putSpec);
		functionList.init();
		this.showEventHandling();
	}

	LightBox.prototype = {
		defaultClass : "lightBox",
		showControlButton : "showingHandler",
		open : "open",
		close : "close",

		getTemplate : function(id) {
			var t = "<article id='" + id + "' class='" + this.defaultClass + "'>" + "</article>";
			return t;
		},

		createLightBox : function(id, putSpec) {
			var template = this.getTemplate(id);
			putSpec.target.insertAdjacentHTML(putSpec.place, template);
			this.element = document.querySelector("#" + id);
		},
		
		showEventHandling : function() {
			var box = this.element;
			var button = box.querySelector("." + this.showControlButton);
			button.addEventListener("click", function(){
				var isOpen = box.classList.contains(this.open);
				var current = isOpen?this.open:this.close;
				var next = isOpen?this.close:this.open;
				box.classList.remove(current);
				box.classList.add(next);
				backgroundScrollState();
			}.bind(this));
		},
		
		backgroundScrollState : function(){
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

	// for lightBox
	var MosaicShowInLightBox = {
		id : "test",
		info : "info",

		init : function() {
			this.lightBox = document.querySelector("#" + this.id);
			this.innerDOMCreate();
		},

		innerDOMCreate : function() {
			var ele = this.createStringElement();
			this.lightBox.innerHTML = ele.button + ele.infoSection;
			this.fillInfoSection();
		},

		fillInfoSection : function() {
			var infoSection = this.lightBox.querySelector("section." + this.info);
			infoSection.innerHTML = this.getContents();
		},
		
		getContents : function(){
			var img = document.querySelector("#mosaic").outerHTML;
			var title = document.querySelector("aside section.title p").outerHTML;
			return title + img;
		},

		createStringElement : function() {
			return {
				button : "<input type='button' value='X' class='showingHandler' />",
				infoSection : "<section class='info'></section>",
			}
		},
		
		showingHandler : function() {
			var box = this.lightBox;
			var button = box.querySelector("input[type='button']");
			button.addEventListener("click", function(){
				var isOpen = box.classList.contains(this.open);
				var current = isOpen?this.open:this.close;
				var next = isOpen?this.close:this.open;
				box.classList.remove(current);
				box.classList.add(next);
			});
		}
	}

	var put = {
		"target" : document.querySelector("body"),
		"place" : "afterbegin"
	}

	new LightBox(put, MosaicShowInLightBox);

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = PhotoCombine;
	} else {
		window.LightBox = LightBox;
	}
}(this));
