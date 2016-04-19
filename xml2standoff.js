var Sax=require("sax");

var xml2standoff=function(content){
	var tagstack=[],context={tags:[],text:""};

	var onopentag=function(e){
		var offset=context.text.length;
		var T=[e.name,context.tags.length,e.isSelfClosing];

		context.tags.push(formatTag(e,offset));
		//if (!e.isSelfClosing) 
		tagstack.push(T);
	}
	
	var formatTag=function(tag,start){
		var arr=[start,tag.name+(tag.isSelfClosing?"/":"")];

		if (Object.keys(tag.attributes).length) arr.push(tag.attributes);
		return arr;
	}
	var onprocessinginstruction=function(obj) {
		var offset=context.text.length;
		context.tags.push([offset,"<?"+obj.name+" "+obj.body+"?>"]);
	}
	
	var oncomment=function(comment) {
		var offset=context.text.length;
		context.tags.push([offset,"<!--"+comment+"-->"]);
	}

	var onclosetag=function(name){
		if (tagstack[tagstack[tagstack.length-1][0] != name]) {
			throw "unbalance tag"
		}
		var T=tagstack.pop();
		var offset=context.text.length;
		
		
		if (!T[2]){
			context.tags[T[1]][3]=context.tags.length;//resolve end tag pos	
			context.tags.push([offset,"/"+T[0],T[1]]);
		} 
		//context.tags[T[1]][1]=offset;//resolve end position
	}
	var ontext=function(text){
		context.text+=text;
	}

	var parser=Sax.parser(true);
	parser.onopentag=onopentag;
	parser.onclosetag=onclosetag;
	parser.ontext=ontext;
	parser.oncomment=oncomment;
	parser.onprocessinginstruction=onprocessinginstruction;
	parser.write(content);
	//context.tags.sort(function(tag1,tag2){
//		return tag1[0]-tag2[0];
//	});
	return context;
}
module.exports=xml2standoff;