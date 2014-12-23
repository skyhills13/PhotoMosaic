//코드에 필요하면 주석도 좀 다시지.
//DOMContentLoaded와 onload차이점은 알지? 브라우저 호환성도 체크해보기 바람.
document.addEventListener("DOMContentLoaded", function(){
	resultPageDecorator();
});

function resultPageDecorator(){
	var photoList = document.querySelectorAll("#list ul li img.original");
	function backgroundChange(){
		var random = parseInt(Math.random()*(photoList.length-1));
		var source = photoList[random].src;
		
		//var bg = document.querySelector("body");
		//bg.style.backgroundImage = "url(" + source + ")";
		return source;
	};
	
	//기초적인 건데.. 보통 생성자를 제외한 함수이름은 동사+명사 형태로 함. 
	function backgroundBlur(){
		var imageSrc = backgroundChange();  //IMAGE와 같은 html,css,javascript어딘가 쓸거 같은 일반적인 이름은 변수명으로 잘 사용안함. 
		var image = new Image();
		image.src = imageSrc;
		image.addEventListener("load", function(){
			var originalHeight = image.naturalHeight;
			var originalWidth = image.naturalWidth; 
			
			var w = 1000;   //1000이 뭘 의미하는지 코드에 표현하면 좋겠음. 
			var h = originalHeight*(w/originalWidth);
			
			var canvas = document.createElement("canvas"); //핸들러가 너무 큰데.. 절반으로 나눠도 되겠음. 
			canvas.width = w;
			canvas.height = h;
			canvas.setAttribute("id", "bluredBg");
			var canvasHTML = canvas.outerHTML;
			var put = document.querySelector("body");  //이런건 코드 위쪽에서 미리 추출해두기. 
			put.insertAdjacentHTML("beforeend", canvasHTML); //이런 메서드들을 쓸때도 브라우저 호환성을 체크해야함. IE에서 못씀. 
			
			var target = document.querySelector("#bluredBg"); //querySelector를 반복적으로 사용하는데 줄여서쉽게 쓸 수 있는 방법 없을까?
			var context = target.getContext("2d");
			context.drawImage(image, 0, 0, originalWidth, originalHeight, 0, 0, w, h);
			stackBlurCanvasRGBA("bluredBg", 0, 0, w, h, 10);
//			console.log(target);
//			return target.toDataURL();
			var url = target.toDataURL();
			var bg = document.querySelector("body"); //put은 뭐고...bg는 뭐지..
			bg.style.backgroundImage = "url(" + url + ")";
		});
	}
	
	backgroundBlur();  //(function(){})()  바로 실행하는 거면 이런식으로 하면 되지. 함수이름도 필요없고.  
}
