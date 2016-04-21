/* convert cbeta to a simpler format*/
var data=require("./1n8.kmf");
var standoffutils=require("./standoffutils");
var out=standoffutils.layout(data,"p");

var content=standoffutils.stringify(out);
require("fs").writeFileSync("1n8_o.kmf",content,"utf8");
