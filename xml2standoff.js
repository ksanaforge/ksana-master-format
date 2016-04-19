var Sax=require("sax");

var xml2standoff=function(content){
	var tagstack=[],context={tags:[],text:""};

	var onopentag=function(e){
		var offset=context.text.length;
		var T=[e.name,e,offset];
		tagstack.push(T);

	}
	
	var formatTag=function(tag,offset,len){
		var arr=[offset,len,tag.name];
		if (Object.keys(tag.attributes).length) arr.push(tag.attributes);
		
		return arr;
	}
	var onclosetag=function(name){
		if (tagstack[tagstack[tagstack.length-1][0] != name]) {
			throw "unbalance tag"
		}
		var T=tagstack.pop();
		var offset=context.text.length;
		var len=offset-T[2];
		context.tags.push(formatTag(T[1],T[2],len));
	}
	var ontext=function(text){
		context.text+=text;
	}

	var parser=Sax.parser(true);
	parser.onopentag=onopentag;
	parser.onclosetag=onclosetag;
	parser.ontext=ontext;

	parser.write(content);
	context.tags.sort(function(tag1,tag2){
		return tag1[0]-tag2[0];
	});
	return context;
}
module.exports=xml2standoff;