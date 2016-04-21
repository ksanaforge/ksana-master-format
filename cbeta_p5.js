var tagutils=require("./tagutils");

//
var xml_p_to_standoff=function(tags) {
	for (var i=0;i<tags.length;i++) {
		var tag=tags[i];
		if (!tag) continue; //might be removed
		if (tag[2]!=="p") continue;

		var closetag=tags[-tag[1]];
		//console.log('q',tag[1],tags[-tag[1]])
		var len=closetag[0]-tag[0];
		var index=-tag[1];
		tag[1]=len;
		tag.length=3; //remove property

		tags[index]=null;
	}

	tags=tags.filter((tag)=>!!tag);
	return tags;
}
var cbeta_p5=function(json) {
	//remove lb and g
	var tags=json.tags.filter((tag)=>tag[2]!=="lb/" && tag[2]!=="g" && tag[2]!=="anchor/");

	
	var body=tags.find((tag)=>tag[2]=="body");
	var body_end=tags.find((tag)=>{return tag[2]=="/body"});
	var start=body[0],end=body_end[0];

	//keep content inside <body>
	json.text=json.text.substring(start,end);
	tags=tags.filter((tag)=> tag[0]>=start && tag[0]<=end );

	tags.forEach((tag)=>tag[0]-=start);
	if (tags[0][2]=='text') tags.shift();

	//fix open and close tag position
	tags=tagutils.matchOpenCloseTag(tags);

	tags=xml_p_to_standoff(tags);

	json.tags=tags;
	return json;
}
module.exports=cbeta_p5;