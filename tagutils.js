/**
	match open and close tag in tags index
*/
var matchOpenCloseTag=function(tags){
	var tagstack=[];
	for (var i=0;i<tags.length;i++) {
		var tag=tags[i];
		var ele=tag[2];

		//not a standoff
		if (tag[1]>0) continue;
		//only </body> might point to top of array, but it is not a standoff
		if (tag[1]==0 && ele[0]!=="/") continue; 

		//negative length, xml tag with tag[1] as index of pair in array
		if (ele[0]!=="/") {
			tag[1]=0;
			tagstack.push(["/"+ele,-i]);
		} else {
			var opentag=tagstack.pop();
			if (opentag[0]!==ele) throw "tag unbalance "+tagstack;

			var index=-opentag[1];
			tag[1]=-index;
			tags[index][1]=-i;
		}

	}
	return tags;
}
module.exports={matchOpenCloseTag};