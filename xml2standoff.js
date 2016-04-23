
/** 
	[offset_from_begining_of_text, len|-pos_of_match_tag , element, attributes ]

	element="/xxx"  ; closing tag
	element="xxx/"  ; null tag

	if len==0 && element[0]=="<" , output as it is
	if len>0 , a overlappable tag 
	if len<0 , xml tag
*/
var xml2standoff=function(content){
	var sax="sax";
	var Sax=require(sax);
	var tagstack=[],context={tags:[],text:""};

	var onopentag=function(e){
		var offset=context.text.length;
		var T=[e.name,context.tags.length,e.isSelfClosing];

		context.tags.push(formatTag(e,offset));
		//if (!e.isSelfClosing) 
		tagstack.push(T);
	}
	
	var formatTag=function(tag,start){
		var arr=[start,0,tag.name+(tag.isSelfClosing?"/":"")];

		if (Object.keys(tag.attributes).length) arr.push(tag.attributes);
		return arr;
	}
	var onprocessinginstruction=function(obj) {
		var offset=context.text.length;
		context.tags.push([offset,0,"<?"+obj.name+" "+obj.body+"?>"]);
	}

	var oncomment=function(comment) {
		var offset=context.text.length;
		context.tags.push([offset,0,"<!--"+comment+"-->"]);
	}

	var onclosetag=function(name){
		if (tagstack[tagstack[tagstack.length-1][0] != name]) {
			throw "unbalance tag"
		}
		var T=tagstack.pop();
		var offset=context.text.length;
		
		
		if (!T[2]){
			context.tags[T[1]][1]=-context.tags.length;//resolve end tag pos
			context.tags.push([offset,-T[1],"/"+T[0]]);
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