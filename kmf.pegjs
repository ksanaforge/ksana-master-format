/*
 * Standoff Markup notation and operation
 * =========================
 *
create a markup
markup with members

attach attribute

return a set of markup 


 */

{

}

start = Defination*

Defination 
  = Assignment / Modification

Assignment  
  = _ name:Name _ ":=" _ expr:(Expression) ";"? _ { 
  	options.vars[name]=options.types.createMarkup(expr); 
  }

Modification
  = _ name:Name _ "+=" _ expr:(Expression) ";"? _ { 
  	options.vars[name]=options.types.createMarkup(expr,options.vars[name]); 
  }
Expression
  = first:Factor rest:(_ "," _ Factor)* {
  	var r=[];
  	for (var i in rest) {
  		r.push(rest[i][3]);
  	}
  	return [first].concat(r)
  }

Factor
 =  Range
  / EmptyRange 
  / name:Name ":" value:String { var m={};m[name]=value; return m }
  / name:Name ":" value:Value { var m={}; m[name]=value; return m }
  / "@" query:String {return ["@"].concat(options.query(query,options.vars) ) }
  / "@" member:Name {return "@"+member}
  / label:Name

Range
  = ( start:[0-9]+ "-" len:[0-9]+ ) { 
  	var arr=[],l=parseInt(len.join(""),10),s=parseInt(start.join(""),10);
  	return [s,l];
   }

Name 
  = (n:[a-z]+ n2:[0-9]*) {return n.join("")+n2.join("")}

Value
  = chars:([0-9\u003B-\u00FF\u3400-\u9FFF\uD800-\uDCFF]+) {return chars.join("")}

String
  = quotation_mark chars:char* quotation_mark { return chars.join(""); }

Object
  = "{" chars:char* "}" { return chars.join(""); }

char
  = unescaped
  / escape
    sequence:(
      '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape         = "\\"
quotation_mark = '"'

unescaped      = [^\0-\x1F\x22\x5C}]
DIGIT  = [0-9]
HEXDIG = [0-9a-f]i
EmptyRange 
  = ( start:[0-9]+ ) { return [parseInt(start.join(""), 10),0]; }

_ "whitespace"
  = [ \t\n\r]*
