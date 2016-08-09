var x2s=require("./xml2standoff");
var s2x=require("./standoff2xml");
var input=process.argv[2];
var fs=require("fs");
var content=fs.readFileSync(input,"utf8");
output=input.replace(".html","").replace(".htm","").replace(".xml","");
var out=x2s(content);
var tags=out.tags.map(function(tag){return JSON.stringify(tag)});
fs.writeFileSync(output+".soff",tags.join(",\n"),"utf8");
fs.writeFileSync(output+".txt",out.text,"utf8");

console.log("text length",out.text.length);
console.log("number of tags",out.tags.length);