var peg = require("pegjs");
var fs=require("fs");
var content=fs.readFileSync("kmf.pegjs","utf8");
var parser = peg.buildParser(content);
var text=fs.readFileSync("sample.txt","utf8");
var markups=fs.readFileSync("sample.mrk","utf8");

parser.parse(markups);