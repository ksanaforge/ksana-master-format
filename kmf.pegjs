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
  function combine(first, rest, combiners) {
    var result = first, i;

    for (i = 0; i < rest.length; i++) {
      result = combiners[rest[i][1]](result, rest[i][3]);
    }
    return result;
  }

  function union(r1,r2) {
  	var s=new Set([...r1,...r2]);
  	return s;
  }
  function intersection(r1,r2) {
  	return new Set([...r1].filter(x => r2.has(x)));
  }
  function difference(r1,r2){
  	return new Set([...r1].filter(x => !r2.has(x)));
  }

  // var sets={};
}

start = Defination*

Defination 
  = _ name:Name _ "=" _ expr:(Expression/Factor) ";"? _ { options.sets[name.join("")]=expr; }

Expression
  = first:Term rest:(_ ("+" / "^" / "-") _ Term)* {
      return combine(first, rest, {
        "+": union
        ,"^": intersection
        ,"-": difference
      });
    }

Term
  = operator:( ("!" / "@") _ )*  factor:Factor {
  		if (operator=="!") {
  			//return [[0,factor[0]],[factor[0]+factor[1],-1] ];
  			throw "not supported yet"
  			return factor;
  		} else {
  			return factor;
  		}
    }

Factor
 = Ranges
  / Range
  / EmptyRange 
  / name:Name {return options.sets[name.join("")] }  ;

Ranges
  = first:Range rest:( _ "," _ (Range / EmptyRange))* {
  	if (rest.length) {
  		var r=first;
  		for (var i=0;i<rest.length;i++) {
  			r=union(r,rest[i][3]);
  		}
  		return r;
  	} else {
  		return first;
  	}
  }

Range
  = ( start:[0-9]+ "#" len:[0-9]+ ) { 
  	var arr=[],l=parseInt(len.join(""),10),s=parseInt(start.join(""),10);
  	for (var i=s;i<s+l;i++) {
  		arr.push(i);
  	}
  	var s=new Set(arr);
  	return s;
   }

Name 
  = ([a-z]+[0-9]+)

EmptyRange 
  = ( start:[0-9]+ ) { return new Set([parseInt(start.join(""), 10),0]); }

_ "whitespace"
  = [ \t\n\r]*
