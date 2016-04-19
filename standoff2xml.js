var standoff2xml=function(content){
	var out="",i=0,len=content.text.length;
	var n=0;
	var tag=content.tags[n];

	while (i<=len) {
		while (tag && i===tag[0]) {
			var tagname=tag[1], nulltag=false;
			if (tagname[0]=="<") {//as it is, comment or directive
				out+=tagname;
			} else {
				if (tagname[tagname.length-1]==="/") {
					nulltag=true;
					tagname=tagname.substr(0,tagname.length-1);
				}

				out+="<"+tagname;
				var attrs=tag[2];
				if (attrs) {
					for (var attr in attrs) {
						out+=" "+attr+'="'+attrs[attr]+'"';
					}
				}

				if (nulltag) {
					out+="/>";
				} else {
					out+=">";
				}
			}
			tag=content.tags[++n];
		}
		if (i<len) out+=content.text[i];
		i++;
	}
	return out;
}

module.exports=standoff2xml;