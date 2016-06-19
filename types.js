var createMarkup=function(init,existing){
	var m={
		labels:{},
		ranges:[],  
		members:{}
	}
	if (existing) {
		m=JSON.parse(JSON.stringify(existing));
	}
	for (var i in init){
		if (init[i] instanceof Array) {
			if (init[i][0]=="@") {
				init[i].shift();
				for (var j=0;j<init[i].length;j++) {
					m.members[init[i][j]]=true;	
				}
			} else {
				m.ranges.push(init[i]);	
			}
		} else if (typeof init[i]==="string") {
			if (init[i][0]==="@") {
				m.members[init[i].substr(1)]=true;	
			} else{
				m.labels[init[i]]=true;
			}
			
		} else if (typeof (init[i]==="object")){
			for (var k in init[i]) {
				m.labels[k]=init[i][k];
			}		
		}
	}
	return m;
}
module.exports={createMarkup};