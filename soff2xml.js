var s2x=require("./standoff2xml");
var fs=require("fs")
var input=process.argv[2];
var tags=JSON.parse("["+fs.readFileSync(input+".soff","utf8")+"]");
var text=fs.readFileSync(input+".txt","utf8");

var xml=s2x({text,tags});

if (fs.existsSync(input+".xml")){
	console.log(input+".xml exists! not writing");
} else {
	fs.writeFileSync(input+".xml",xml,"utf8");
}
