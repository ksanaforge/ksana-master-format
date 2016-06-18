var offsetInMarkup=function(offset,markup){
	for (var i=0;i<markup.ranges.length;i++) {
		var r=markup.ranges[i];
		if (offset<r[0]||offset>r[0]+r[1]) return false;
	}
	return true;
}
var keyInMarkup=function(key,value,markup){
	return (markup.labels[key]===value);
}
var filterByRange=function(offset,mid,vars) {
	var out=[];
	for (var i=0;i<mid.length;i++) {
		if (offsetInMarkup(offset,vars[mid[i]])) out.push(mid[i]);
	}
	return out;
}
var filterByKey=function(key,value,mid,vars) {
	var out=[];
	for (var i=0;i<mid.length;i++) {
		
		if (keyInMarkup(key,value,vars[mid[i]])) out.push(mid[i]);
	}
	return out;	
}

var query=function(Q,vars) {
	var querys=Q.split("&");
	var out=Object.keys(vars);
	for (var i=0;i<querys.length;i++) {
		var q=querys[i];
		if (parseInt(q)>0) {
			out=filterByRange(parseInt(q),out,vars);
		} else {
			var m=q.match(/([a-z0-9]+):(.*)/);
			if (m) { //key:value
				out=filterByKey(m[1],m[2],out,vars);
			} else { //label
				out=filterByKey(m[1],true,out,vars);
			}
		}
	}
	return out;
}
module.exports=query;