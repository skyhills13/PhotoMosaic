/**
 * 
 */

function PhotoCombine1(id, spec){
	this.canvas = document.createElement("canvas");
	this.spec = spec;
}

PhotoCombine1.prototype = {
	create : function(photoArray, template){
		var t = PhotoCombine1.Template.converted(template);
//		console.log(PhotoCombine1.Template.getTemplate());
		var linked = PhotoCombine1.Link.b();
		return PhotoCombine1.Merge.c(this.canvas);
	}
}

PhotoCombine1.Template = {
	converted : function(template){
//		this.template = "aaa";
		return template.template;
	},
	
	getTemplate : function(){
		return this.template;
	}
}

PhotoCombine1.Link = {
	b : function(){
		return {"linked" : []};
	}
}

PhotoCombine1.Merge = {
	c : function(canvas){
		return canvas;
	}
}


var op = new PhotoCombine1("combined", {
	"width" : 500,
	"height" : 500,
	"optimizing" : true
});

var c = op.create([], {
	"template" : [],
	"column" : 4,
	"row" : 4
});
//console.log(c);