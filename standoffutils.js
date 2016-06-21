var stringify=function(json){
	return "module.exports={header:{},text:`"+json.text+
	"`\n,tags:[\n"+json.tags.map(function(tag){return JSON.stringify(tag)}).join(",\n")+"\n]};"
}

// return text without crlf and array of text snippet 
// aaa\nbbb =>  [0,3], [4,3]
var replaceCRLF=function(text_with_crlf) {
	var last=0,snippet=[],text="";
	text_with_crlf.replace(/\n/g,function(m,idx){
		if (idx>last) {
			snippet.push([last,idx]);
			text+=text_with_crlf.substring(last,idx);
		}
		last=idx+1;
	});
	
	if (text_with_crlf.length>last) {
		text+=text_with_crlf.substring(last);
		snippet.push([last,text_with_crlf.length]);
	}
	return {text,snippet};
}

/** split text line by splittag, remove crlf, for cbeta paragraph view mode*/
var layout=function(json, splittag) {
	var last=0;
	var text="",tags=[],i=0;
	while (i<=json.tags.length) {
		var tag=json.tags[i];
		if ( (tag && tag[2]===splittag) || i==json.tags.length) {
			var end=tag?tag[0]:json.text.length;
			var r=replaceCRLF(json.text.substring(last,end));
			var start=text.length;

			r.snippet.forEach(function(t){
				tags.push([start, t[1]-t[0] ,"source",{s:last+t[0]}]); //source position
				start+=(t[1]-t[0]);
			});

			text+=r.text;

			tags.push([text.length,2,"p"]); //just to protect from modification
			text+="\n\n";

			if (tag) last=tag[0];
		}
		i++;
	}

	return {text,tags};
}

module.exports={stringify,layout};