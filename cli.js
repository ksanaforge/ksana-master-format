var xml2standoff=require("./xml2standoff");

var testfile=process.argv[2]||"../../CBReader/xml/T01/T01n0001_008.xml";
var fs=require("fs");
var testcontent=fs.readFileSync(testfile,"utf8").replace(/\r\n/g,"\n");
var json=xml2standoff(testcontent);
var tags=json.tags, endtags=json.endtags;
var text=json.text.replace("`","\\`");


console.log("module.exports={header:{},text:`"+text+
	"`\n,tags:[\n"+tags.map(function(tag){return JSON.stringify(tag)}).join(",\n")+"\n]};");
