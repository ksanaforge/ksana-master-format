
/** 
	[offset_from_begining_of_text+tagcount, len , element_type, attributes ]

	tag has a fix length==1

	ensure output sequence of tags

	30% tag entry saved for T01n0001_008.xml (2350 vs 1627)

*/
var xml2standoff=function(content){
	var sax="sax";
	var Sax=require(sax);
	var tagstack=[],context={tags:[],text:""};

	var onopentag=function(e){
		var offset=context.text.length+context.tags.length;

		var T=[e.name,e.isSelfClosing?0:offset+1]; // [tagname, 1-base offset]
		
		context.tags.push(formatTag(e,offset) );
		tagstack.push([context.tags.length,T]);
	}
	
	var formatTag=function(tag,start){
		var arr=[start,0,tag.name+(tag.isSelfClosing?"/":"")];

		if (Object.keys(tag.attributes).length) arr.push(tag.attributes);
		return arr;
	}
	var onprocessinginstruction=function(obj) {
		var offset=context.text.length+context.tags.length;
		context.tags.push([offset,0,"<?"+obj.name+" "+obj.body+"?>"]);
	}

	var oncomment=function(comment) {
		var offset=context.text.length+context.tags.length;
		context.tags.push([offset,0,"<!--"+comment+"-->"]);
	}

	var onclosetag=function(name){
		var T=tagstack.pop();
		if (!T || T[1][0]!==name){
			throw "unbalance tag"
		}

		var ntag=T[0],pair=T[1];
		
		if (pair[1]>0){
			var offset=context.text.length+context.tags.length;
			context.tags[ntag-1][1]=offset-pair[1]+1; //1 base offset
		} else { //null tag
			context.tags[ntag-1][1]=0;
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