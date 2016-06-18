var createMarkup=function(init){
	var m={
		type:"",
		labels:{},
		ranges:[],  
		members:[]
	}

	for (var i in init){
		if (init[i] instanceof Array) {
			m.ranges.push(init[i]);
		} else if (typeof init[i]==="string") {
			console.log(typeof init[i])
			if (!m.type) {
				m.type=init[i];
			} else {
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