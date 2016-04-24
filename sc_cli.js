/* convert cbeta to a simpler format*/
var data=require("./dn33.kmf");
var sc=require("./sc");
var standoffutils=require("./standoffutils");
var out=sc(data);


var content=standoffutils.stringify(out);
require("fs").writeFileSync("dn33.js",content,"utf8");

//remove lb
