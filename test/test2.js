var standoff2xml=require("../standoff2xml2");
var xml2standoff=require("../xml2standoff2");
var fs=require("fs");
var assert=require("assert");
var json=null,datafile=null;

describe('conversion', function() {

	it("should convert to standoff",function(){
		datafile=fs.readFileSync("test/T01n0001_008.xml","utf8").replace(/\r\n/g,"\n");
		//datafile=fs.readFileSync("test/1.xml","utf8").replace(/\r\n/g,"\n");
		json=xml2standoff(datafile);
		//console.log(json.tags.slice(0,10))

		assert.equal(json.text.length,14607)
		//console.log(json.tags.length)
		assert.equal(json.tags.length,1627);
	});


	it("should convert to xml",function(){
		var content=standoff2xml(json);
		var t1=content.split("\n");
		var t2=datafile.split("\n");
		assert.equal(t1.length,t2.length)
		for (var i=0;i<t1.length;i++) {
			if (t1[i]!==t2[i]) console.log("out:",t1[i],"\nori:",t2[i]);
		}
	});

});