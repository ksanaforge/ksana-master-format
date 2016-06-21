var standoff2xml=function(content){
	var out="",i=0,len=content.text.length+content.tags.length;
	var n=0;
	var tag=content.tags[n];
	var tagstack=[],tagcount=0;

	var emitEndtag=function(){
		while( tagstack.length && i==tagstack[tagstack.length-1][0]) {
			out+="</"+tagstack[tagstack.length-1][1]+">";
			tagstack.pop();
		}	
	}
	while (i<=len) {
		while (tag && i===tag[0]) {
			var tagname=tag[2], nulltag=false;
			if (tagname[0]=="<") {//as it is, comment or directive
				out+=tagname;
			} else {
				if (tag[1]===0 && tagname[tagname.length-1]=="/") { 
					nulltag=true;
					tagname=tagname.substr(0,tagname.length-1);
				} else {
					tagstack.push([tag[0]+tag[1],tagname]);
				}

				out+="<"+tagname;
				var attrs=tag[3];
				if (attrs) {
					for (var attr in attrs) {
						out+=" "+attr+'="'+attrs[attr]+'"';
					}
				}

				out+=nulltag?"/>":">";
			
			}
			tag=content.tags[++n];
			i++;
			tagcount++;

			emitEndtag();	

		}

		if (i<len) out+=content.text[i-tagcount];
		emitEndtag();	
		i++;
		emitEndtag();	
	}
	return out;

}

module.exports=standoff2xml;