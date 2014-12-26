/**
 * 슬라이드에 관한 라이트 박스
 */

(function(window){
	var console = window.console;
	var document = window.document;
	
	var $0 = {
		checkClassNameAndTag : function(target, className, tag){
			var hasClassName = this.hasClassName(target, className);
			var isTag = this.isTag(target, tag);
			return hasClassName && isTag;
		},
		
		hasClassName : function(target, className){
			return target.classList.contains(className);
		},
		
		isTag : function(target, tag){
			return target.tagName.toLowerCase() === tag;
		},
		
		removePX : function(px){
			return px.slice(0,-2);
		},
		
		getNumberStyle : function(style, target){
			var w = window.getComputedStyle(target)[style];
			return Number(this.removePX(w));
		},
		
		getElement : function(query, target){
			if(typeof target === "undefined") 
				target = document;
			
			return target.querySelector(query);
		},
		
		event : function(type, target, event){
			target.addEventListener(type, function(){
				event();
			});
		}
	}
	
	var RangeBar = {
		
		sizeChange : function(){
			var slideBar = document.querySelector("nav input[type='range']");
			var wrap = slideBar.parentElement;
			var rBorderLeft = $0.getNumberStyle("borderLeftWidth", slideBar);
			var height = $0.getNumberStyle("height", wrap);
			slideBar.style.width = height + "px";
			slideBar.style.left = (height*-0.5 - rBorderLeft) + "px";
			slideBar.style.top = (rBorderLeft*-1 + height*0.5) + "px";
		},
			
		showPreview : function(){
			var miniPhoto = document.querySelector("nav div");
			var slideBar = document.querySelector("nav input[type='range']");
			slideBar.addEventListener("mousemove", function(e) {
				miniPhoto.style.display = "block";
				this.showPictureThumbnail(e);
			}.bind(this));
			
			slideBar.addEventListener("mouseout", function(e) {
				miniPhoto.style.display = "none";
			}.bind(this));
		},
		
		isBoundary : function(minBound, current, maxBound) {
			if (current >= minBound && current <= maxBound)
				return 0;
			if (current < minBound)
				return -1;
			if (current > maxBound)
				return 1;
		},
		
		showPictureThumbnail : function(event){
			var target=event.target; 
			var rangeNumber = Number(target.max);

			var rWidth = $0.getNumberStyle("width", target);
			var rBorderLeft = $0.getNumberStyle("borderLeftWidth", target);
			var rBorderRight = $0.getNumberStyle("borderRightWidth", target);
			
			var minBound = rBorderLeft;
			var maxBound = rBorderLeft + rWidth;
			var current = event.offsetX;
			var boundary = this.isBoundary(minBound, current, maxBound);
			var oneRangeWidth = rWidth/rangeNumber;
			var pos = 0;

			if (boundary == 0) {
				pos = ((current - rBorderLeft) / rWidth) * rangeNumber;
				pos = Math.round(pos);
			}
			if (boundary > 0) {
				pos = rangeNumber;
				current = maxBound;
			}
			if (boundary < 0) {
				pos = 0;
				current = minBound;
			}
			this.showMiniPhoto(pos, current, oneRangeWidth);
		},
		
		showMiniPhoto : function(number, offset, oneRangeWidth){
			var miniPhoto = document.querySelector("nav div");
			var miniPhotoHeight = $0.getNumberStyle("height", miniPhoto);
			miniPhoto.style.top = (offset-miniPhotoHeight) + "px";
			var query = "li[data-list='"+number+"'] img";
			var photo = document.querySelector(query).outerHTML;
			console.log(photo);
			miniPhoto.innerHTML = photo;
		}
	}
		
	var Sizing = {
		wrapper : document.querySelector("#lightBoxWrapper article.slide div.photos"),
		
		screenResize : function(){
			$0.event("resize", window, this.adjustInSection.bind(this));
			$0.event("resize", window, RangeBar.sizeChange);
		},
		
		adjustInSection : function(){
			console.log("aaa");
			var targetImage = this.wrapper.querySelector(".current img.original");
			this.optimizingCurrentImage(targetImage);
			this.moveMiddlePosition(targetImage);
			this.optimizingSideImage(targetImage);
		},
		
		optimizingCurrentImage : function(targetImage){
			var current = this.getTargetSize(this.wrapper.querySelector(".current div"));
			var image = this.getImageNaturalSize(targetImage);
			var opt = current.ratio>=image.ratio?"widthDepend":"heightDepend";
			targetImage.classList.add(opt);
		},
		
		moveMiddlePosition : function(targetImage){
			var currentHeight = this.getTargetSize(this.wrapper.querySelector(".current div")).height;
			var imageHeight = this.getTargetSize(targetImage).height;
			
			if(currentHeight > imageHeight)
				targetImage.style.top = (currentHeight-imageHeight)*0.5 + "px";
		},
		
		optimizingSideImage : function(targetImage){
			var imageWidth= this.getTargetSize(targetImage).width + "px";
			
			var prev = this.wrapper.querySelector(".previous div");
			var next = this.wrapper.querySelector(".next div");
			
			prev.style.width = imageWidth;
			next.style.width = imageWidth;
		},
		
		getTargetSize : function(target){
			
			var s = {
				"width" : $0.getNumberStyle("width", target),
				"height" : $0.getNumberStyle("height", target)
			}
			s.ratio = this.getRatio(s.width, s.height);
			return s;
		},
		
		getImageNaturalSize : function(image){
			var s = {
				"width" : image.naturalWidth,
				"height" : image.naturalHeight
			}
			s.ratio = this.getRatio(s.width, s.height);
			return s;
		},
		
		getRatio : function(width, height){
			return height/width;
		}
	}
	
	var Slider = {
		element : document.querySelector("#lightBoxWrapper article.slide"),
		lastNumber : document.querySelectorAll(".container").length-1,
		
		init : function(handler){
			this.handler = handler;
			this.showingHandler();
			this.moveController();
			Sizing.screenResize();
			RangeBar.showPreview();
		},
		
		showingHandler : function(){
			document.addEventListener("click", function(e){
				var target = e.target;
				if(!(this.isContainer(target) || this.isSlidePhoto(target)))
					return ;
				this.handler.onShowingWrapper(true);
				this.handler.onShowingElement(true);
				this.showTargetPhoto(e.target);
				RangeBar.sizeChange();
			}.bind(this));
		},
		
		moveController : function(){
			this.moveWithPhoto();
			this.moveWithRangeBarChange();
		},
		
		moveWithRangeBarChange : function(){
			var slideBar = this.element.querySelector("nav input[type='range']");
			slideBar.addEventListener("change", function(e){
				var dataNumber = Number(e.target.value);
				this.moveAlongNumber(dataNumber);
				this.changeRangePosition(dataNumber);
			}.bind(this));
		},
		
		moveWithPhoto : function(){
			var prevImage = $0.getElement(".previous img.original");
			var nextImage = $0.getElement(".next img.original");
			var prevSection = $0.getElement(".previous");
			var nextSection = $0.getElement(".next");
			
			$0.event("click", prevImage, this.moveWithDirection.bind(this, -1));
			$0.event("click", prevSection, this.moveWithDirection.bind(this, -1));
			$0.event("click", nextImage, this.moveWithDirection.bind(this, 1));
			$0.event("click", nextSection, this.moveWithDirection.bind(this, 1));
		},
		
		moveWithDirection : function(direction){
			var currentNumber = Number($0.getElement("nav input[type='range']", this.wrapper).value);
			var toNumber = currentNumber + direction;
			if(toNumber<0 || toNumber>this.lastNumber) return ;
			this.changeRangePosition(toNumber);
			this.moveAlongNumber(toNumber);
		},
		
		isContainer : function(target){
			var container = "container";
			var li = "li";
			return $0.checkClassNameAndTag(target, container, li);
		},
		
		isSlidePhoto : function(target){
			var buttonClass = "slideButton"; 
			var div = "div";
			return $0.checkClassNameAndTag(target, buttonClass, div);
		},
		
		showTargetPhoto : function(clicked){
			var target = this.isSlidePhoto(clicked)?clicked.parentElement:clicked;
			var dataNumber = parseInt(target.getAttribute("data-list"));
			this.moveAlongNumber(dataNumber);
			this.changeRangePosition(dataNumber);
		},
		
		moveAlongNumber : function(dataNumber){
			var prevNumber = dataNumber-1;
			var currentNumber = dataNumber;
			var nextNumber = dataNumber + 1;
			
			if(dataNumber===this.lastNumber) nextNumber = -1; 
			this.changePhoto("previous", prevNumber);
			this.changePhoto("current", currentNumber);
			this.changePhoto("next", nextNumber);
			Sizing.adjustInSection();
		},
		
		changePhoto : function(pos, number){
			var place = this.element.querySelector("."+pos+" div");
			place.innerHTML = "";
			if(number<0) return ;
			var query = "li[data-list='"+number+"'] img";
			var photo = document.querySelector(query).outerHTML;
			place.innerHTML = photo;
		},
		
		changeRangePosition : function(number){
			var rangeBar = this.element.querySelector("nav input[type='range']");
			rangeBar.value = number;
		}
	}

	var lb = new LightBoxHandler(Slider);
}(this));