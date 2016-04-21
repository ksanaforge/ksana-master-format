/* convert cbeta to a simpler format*/
var data=require("./1.js");
var cbeta_p5=require("./cbeta_p5");
var standoffutils=require("./standoffutils");
var out=cbeta_p5(data);


var content=standoffutils.stringify(out);
require("fs").writeFileSync("1n8.kmf",content,"utf8");

//remove lb
