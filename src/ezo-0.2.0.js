/**
* EzoJS is a JavaScript framework that create html documents and cascading style sheets plus add-ons for jQuery.
* The main purpose of EzoJS is to to let one JavaScript file with one html file to handle all the website and html and CSS thus
* reducing development time and lessen the files needed for 
* This framework has full useful variables and manipulations for dom elements and the document itself for
* design and development.
* EzoJS can also save made CSS data into an arrays and clone dom elements already created to prevent 
* reinventing the wheel.
* EzoJS uses some jQuery functions so make sure to include jQuery.js along your files.
* Note: ezo.min.js has jQuery built-in
*/

/** setup EzoJS
* To setup EzoJS for use first create an html file and include the jQuerry and EzoJS file.
* You can leave the body of the html empty because EzoJS will handle the creation of nodes and CSS through code
*/

/**  EzoJS note
* You can build a full website with EzoJS without need any extra html files nor CSS files. one html file and one script is
* sufficient to build a whole website only by using selectors and functions provided by EzoJS
*/

/** 
*  These are few flat design UI colours for your CSS.
* The colours are provided by http://flatuicolors.com/
*/

var eColor = {
  turquoise: "#1abc9c",
  emerald:"#2ecc71",
  peterRiver: "#3498db",
  amethyst: "#9b59b6",
  wetAsphalt: "#34495e",
  greenSea: "#16a085",
  nephretis: "#27ae60",
  belizeHole: "#2980b9",
  wisteria: "#8e44ad",
  midnightBlue: "#2c3e50",
  sunFlower: "#f1c40f",
  carrot: "#e67e22",
  alizarin: "#e74c3c",
  clouds: "#ecf0f1",
  concrete: "#95a5a6",
  orange: "#f39c12",
  pumpkin: "#d35400",
  pomegranate: "#c0392b",
  silver: "#bdc3c7",
  asbestos: "#7f8c8d"
};

/**
* These are few constants for CSS for fast production
*/
var eCon = {
	full: "100%",
	half: "50%",
	quarter: "25%",
	smallFont : "10px",
	medFont: "25px",
	bigFont: "35px",
	largeFont: "50px",
	center: "center",
	right: "right",
	left: "left",
	block: "block",
	inline: "inline",
	block_inline : "block-inline",
	auto: "auto"
};

/** 
* eSyntax is a syntax chooser for the code tag or for doc's function addSyntax();
* eSyntax use highlight.js for syntax highlight
*
*/

var eSyntax = {
	apache: "apache",
	css: "css",
	http: "http",
	javascript: "javascript",
	objectiveC: "objectivec",
	ruby: "ruby",
	bash: "bash",
	coffeeScript: "coffeescript",
	lni: "lni",
	makeFile: "makefile",
	php : "php",
	sql : "sql",
	cSharp: "c#",
	diff: "diff",
	json: "json",
	markDown : "markdown",
	perl: "perl",
	cpp : "c++",
	html: "html",
	xml: "xml",
	java: "java",
	nginx: "nginx",
	python: "python",
	scala: "scala",
	delphi: "delphi",
	fortan: "fortan",
	lisp: "lisp",
	haskell: "haskell",
	init: function () {
		hljs.initHighlighting();
	}
}

/**
* These arrays stores CSS styles and DOM objects or page for cloning
* to add new nodes, CSS  use push function on them
* Use eManager for storing pages
*/
var eCss = new Array(); //used to store CSS styles
var eNode = new Array(); //used to store Nodes
var ePage = new Object(); //used to store pages

/**
* eManager is page manager that saves your body (page) as functions.
* eManager save run and remove pages by using ePage array
*/

var eManager = {
	
	add: function (page,name) {
		ePage[name] = page;
	},
	
	run: function (name) {
	    e$("doc").clear();
		ePage[name]();
	},
	
	append: function (name) {
		ePage[name]();
	},
	
	remove: function (name) {
		for (key in ePage) {
			if (key === name) {
				key = null;
			}
		}
	},
	
	get: function (name) {
		return ePage[name];
	}
};

/**
* eData is a data manager that saves and loads the data 
* of EzoJS for later use
*/

var eData = {
	saveCSS: function () {
		localStorage.setItem("css",JSON.stringify(eCss));
	},
	loadCSS: function () {
		eCss = JSON.parse(localStorage.getItem("css"));
	}
/**
 * @issue please pull request for these functions
 * JSON can't stringify normal objects nor arrays 
 *
	saveNodes: function () {
		localStorage.setItem("nodes",JSON.stringify(eNode));
	},
	loadNodes: function () {
		eCss = localStorage.getItem("nodes");
	},
	savePages: function () {
		localStorage.setItem("pages",JSON.stringify(ePage));
	},
	loadPages: function () {
		eCss = localStorage.getItem("pages");
	},
	saveData: function () {
		this.saveCSS();
		this.saveNodes();
		this.savePages();
	},
	loadData: function () {
		this.loadCSS;
		this.loadNodes();
		this.loadPages();
	} */
};

/**
* This function returns a pixel value for an integer
* This is used for  CSS
*/
var px = function (num) {
	return num+"px";
}

/**
* This is the selector and the EzoJS main object.
* This function is branched into two types:
* 1. selecting a node using its ID and apply functions on it
* 2. selecting the document and create and manipulate the whole document
*/

var ezo = function (selector) { 

	var dom ;
	
	if (selector != "doc") {
	 dom = document.getElementById(selector);
	 initNode(dom);
	}
	else {
	 dom = document;
	 initDoc(dom);
	}
	
	ezo.toString = function () {
		this.version = "1.0.0";
		this.developer = "Naji Kadri";
		this.year = "2015"
		return this.version+"\n"+this.developer+"\n"+"all rights reserved , "+this.year;
};
	if ( selector != "doc") {
	return document.getElementById(selector);
	}
	else {
		return document;
	}
	
};

/** 
* This is the DOM elements and node creator. 
* It returns new elements and nodes for the function caller which is used
* for the creation of new nodes and even cloning;
* The main use for these functions are to append elements to the body of the html
* and to insert child nodes for existing nodes
*/

//this is the constructor for the DOM Creator
var DomCreator = function () {
	
	this.defText = function () {
		return '<h1> Hello World! </h1>';
	};
	
	
	this.header = function (num,id,cl) {
		if (arguments[2] != undefined) {
			
			return '<h'+num+' id='+id+' class='+cl+'></h'+num+'>';
		}
		else if (arguments[1] != undefined) {
			
			return '<h'+num+' id='+id+'></h'+num+'>';
		}
		else {
			
			return '<h'+num+'>'+'</h'+num+'>'
		}
	};
	
	this.par = function (id,cl) {
		if (arguments[1] != undefined) {
			
			return '<p id='+id+' class='+cl+'></p>';
		}
		else if (arguments[0] != undefined) {
			
			return '<p id='+id+'></p>';
		}
		else {
			
			return '<p></p>';
		}
	};
	
	this.clone = function (n,id) {
		var node = $(n).clone();
		$(node).attr('id',id);
		return node;
	};
	
	this.lnBreak = function () {
		return '<br>';
	};
	
	this.horRule = function () {
		return '<hr>';
	};
	
	this.oList = function (id) {
		var node = '<ol id='+id+'></ol>';
		return node;
	};
	
	this.uList = function (id) {
		return '<ul id='+id+'></ul>';
	};
	
	this.link = function (id,link,txt) {
		if (arguments[2] != undefined) {
			return '<a id='+id+' href='+link+'>'+txt+'</a>';
		}
		else if (arguments[1] != undefined) {
			return '<a id='+id+' href='+link+'></a>';
		}
		else  if (arguments[0] != undefined){
			return '<a id='+id+'></a>';
		}
		else {
			return '<a></a>';
		}
		
	};
	
	this.img = function (id,src,alt) {
		if (arguments[1] != undefined) {
			return '<img src='+src+' alt='+alt+'/>';;
		}
		else {
			return '<img src='+src+'/>';
		}
		
	};
	
	
	this.toListItems = function (arr) {
		var items = new Array(arr.length);
		for (var i=0;i < items.length;i++) {
			items[i] = '<li>'+arr[i]+'</li>';
		}
		return items;
	};
	
	this.addListItems = function (id, it) {
		var node = e$(id);
		for (var i=0; i < it.length;i++) {
			node.insert(it[i]);
		}
	};
	
	this.div = function (id, cl) {
		if (arguments[1] != undefined) {
			return '<div id='+id+' class='+cl+'></div>';
		}
		else if (arguments[0] != undefined) {
			return '<div id='+id+'></div>';
		}
		else {
			return '<div></div>'
		}
	};
	
	this.form = function (id,action,method) {
		if (arguments[2] != undefined) {
			return '<form id='+id+' action='+action+' method='+method+'></form>';
		}
		else if (arguments[1] != undefined) {
			return '<form id='+id+' action='+action+'></form>';
		}
		else if (arguments[0] != undefined) {
			return '<form id='+id+'></form>';
		}
		else {
			return '<form></form>';
		}
	};
	
	this.input = function (id,type,name,value) {
		if (arguments[3] != undefined) {
			return '<input id='+id+'type='+type+' name='+name+' value='+value+'/>';
		}
		else if (arguments[2] != undefined) {
			return '<input id='+id+'type='+type+' name='+name+'/>';
		}
		else if (arguments[1] != undefined) {
			return '<input id='+id+'type='+type+'/>';
		}
		else if (arguments[0] != undefined) {
		return '<input id='+id+'/>';
	}
	else {
		return '<input></input>';
	}
	};
	
	this.pre = function (id) {
		if (arguments[0] != undefined){
		return '<pre id='+id+'></pre>';
		}
		else {
		return '<pre></pre>';
		}
	};
	
	this.code = function (id,lng) {
		if (arguments[1] != undefined) {
			return '<code id='+id+' class='+lng+'></code>';
		}
		else if (arguments[0] != undefined) {
			return '<code id='+id+'></code>';
		}
		else {
			return '<code></code>';
		}
	};
	
	this.button = function (id,type,cls,name,value) {
		if (arguments[4] != undefined) {
			return '<button id='+id+' type='+type+' class='+cls+' name='+name+' value='+value+'</button>';
		}
		else if (arguments[3] != undefined) {
			return '<button id='+id+' type='+type+' class='+cls+' name='+name+'</button>';
		}
		else if  (arguments[2] != undefined){
			return '<button id='+id+' type='+type+' class='+cls+'</button>';
		}
		else if (arguments[1] != undefined) {
			return '<button id='+id+' type='+type+'</button>';
		}
		else if (arguments[0] != undefined) {
		   return '<button id='+id+'</button>';
		}
		else {
			return '<button></button>'
		}
	};
	
	this.script = function (src,type,async) {
		if (arguments[2] != undefined) {
		   if (async === true) {
		      return '<script src='+src+' type='+type+' async></script>';
		   }
		   else {
			 return '<script src='+src+' type='+type+' defer></script>';
		   }
	   }
	   else if (arguments[1] != undefined) {
		    return '<script src='+src+' type='+type+'></script>';
	   }
	   else if (arguments[0] != undefined) {
		   return'<script src='+src+'></script>';
	   }
	};
	
	this.stylesheet = function (href,rel,type) {
		if (arguments[2] != undefined){
		 return '<link href='+href+' rel='+rel+' type='+type+' >';
	   }
	   else if ( arguments[1] != undefined) {
		 return '<link href='+href+' rel='+rel+' >';
	   }
	   else if (arguments[0] != undefined) {
		 return '<link href='+href+' >';
	   }
	};
	
	this.custom =  function (tag,id,cls) {
		if (arguments[2] != undefined) {
			return '<'+tag+' id='+id+' class='+cls+'></'+tag+'>';
		}
		else if (arguments[1] != undefined) {
			return '<'+tag+' id='+id+'></'+tag+'>';
		}
		else if (arguments[0] != undefined) {
			return '<'+tag+'></'+tag+'>';
		}
	};
	
	this.meta = function (name,cont) {
		if (arguments[1] != undefined && arguments[0] != undefined) {
		return '<meta name='+name+' content='+cont+' >';
		}
	};
	
	this.init = function (n) {
		window.initNode(n);
	};
};

var eDom = new DomCreator(); //this variable is used for the creation of elements

/** Document Functions
* These functions are used for the html document itself.
* These functions can create nodes and remove nodes and structure the whole document
*/
var initDoc = function (doc) {
	
	doc.addDefText = function () {
		var node = eDom.defText();
		$('body').append(node);
	};
	
	doc.addHeader = function (num,id,cl) {
		var node = eDom.header(num,id,cl)
		$('body').append(node);
	};
	
	
	doc.addPar = function (id,cl) {
		var node = eDom.par(id,cl);
		$('body').append(node);
	};
	
	
	doc.addLink = function (id,link,txt) {
		var node = eDom.link(id,link,txt);
		$('body').append(node);
	};
	
	
	doc.addImg = function (id,src,alt) {
		var node = eDom.img(id,src,alt);
		$('body').append(node);
	};
	
	doc.addDiv = function (id,cl) {
		var node = eDom.div(id,cl);
		$('body').append(node);
	}
	
	doc.addStyleArray = function (arr,cl) {
		for (var i=0; i < arr.length;i++) {
			$("."+cl).css(arr[i][0],arr[i][1]);
		}
		};
		
	doc.setCSS = function (stylesheet,cl) {
	   for (key in stylesheet) {
		   var eKey = parseCSS(key);
		   $("."+cl).css(eKey,stylesheet[key]);
	   }
   };
	
	doc.cloneNode  = function (n,id) {
	   var node = eDom.clone(n,id);
	   $('body').append(node);
   };
   
   doc.lnBreak = function () {
	   var node = eDom.lnBreak();
	   $('body').append(node);
   };
   
   doc.horRule = function () {
	   var node = eDom.horRule();
	   $('body').append(node);
   };
   
    doc.addOList = function (arr,id) {
	   var node = eDom.oList(id);
	   var items = eDom.toListItems(arr);
	   $('body').append(node);
	   eDom.addListItems(id,items);
   };
   
   doc.adduList = function (arr,id) {
	   var node = eDom.uList(id);
	   var items = eDom.toListItems(arr);
	   $('body').append(node);
	   eDom.addListItems(id,items);
   };
   
   doc.addPre = function (id) {
	   var node = eDom.pre(id);
	   $('body').append(node);
   };
   
   doc.addCode = function (id,lng) {
	   var node = eDom.code(id,lng);
	   $('body').append(node);
   };
   
   doc.addSyntax = function (id,id2,syn) {
	   var node = eDom.pre(id);
	   $('body').append(node);
	   var code = eDom.code(id2,syn);
	   e$(id).insert(code);
   };
   
   doc.insert = function (n) {
	   if (typeof(n) === 'Array') {
		   for (var i=0;i < n.length;i++) {
			   $('body').append(n[i]);
		   }
	   }
	   else {
		     $('body').append(n);
	   }
   }
   
   doc.bodyCSS = function (stylesheet) {
	    for (key in stylesheet) {
		   var eKey = parseCSS(key);
		   $('body').css(eKey,stylesheet[key]);
	   }
   };
   
   doc.bodyCSSArray = function (arr) {
	   for (var i=0; i < arr.length;i++) {
			$('body').css(arr[i][0],arr[i][1]);
		}
   };
   
   doc.init = function () {
	   var b = $('body').get(0);
	   var count = b.children.length;
	   for (var i =0; i < count;i++) {
		   eDom.init(b.children[i]);
	   }
   }
   
   doc.addScript = function (src,type,async) {
	   var node = eDom.script(src,type,async);
	   $('head').append(node);
   };
   
   doc.addStylesheet = function (href,rel,type) {
	   var node = eDom.stylesheet(href,rel,type);
	   $('head').append(node);
   };
   
   doc.addMeta = function (name,cont) {
	   var node = eDom.meta(name,cont);
	   $('head').append(node);
   };
   
   doc.addCustom = function (tag,id,cls) {
	   var node = eDom.custom(tag,id,cls);
	   $('body').append(node);
   };
   
   doc.addForm  = function (id,action,method,inputs) {
	   var node = eDom.form(id,action,method);
	   $('body').append(node);
	   if (arguments[3] != undefined) {
		   for (var i=0; i < inputs.length;i++) {
			   $(node).append(inputs[i]);
		   }
	   }
   };
   
   doc.addButton = function (id,type,cls,name,value) {
	   var node = eDom.button(id,type,cls,name,value);
	   $('body').append(node);
   };
   
   doc.setTitle = function (name) {
	   document.title = name;
   };
   
	doc.destroy = function () {
		window.close();
	};
	
	doc.clear  = function () {
		$('body').empty();
	}
	
};


/** Node Functions
* These functions are used for each node in the html document.
* It contains functions for CSS and DOM manipulations
*/
var initNode = function (dom) {
	
	dom.setText = function (string) {
		dom.innerText = string;
	};
	
	dom.appendText = function (string) {
		dom.innerText = dom.innerText + string;
	};
	
	dom.setSize  = function (width,height) {
		$(dom).css("width",width);
		$(dom).css("height",height);
	};
	
	dom.setBGColor = function (color) {
		$(dom).css("background-color",color);
	};
	
	dom.setFontSize = function (size) {
		$(dom).css("font-size",size);
	}
	
	dom.setFontColor = function (color) {
		$(dom).css("color",color);
	}
	
	dom.alignText = function (al) {
		$(dom).css("text-align",al);
	};
	
	dom.getNodeName = function () {
       return $(dom)[0].nodeName;
	};
	
	dom.addStyleArray = function (arr) {
		for (var i=0; i < arr.length;i++) {
			$(dom).css(arr[i][0],arr[i][1]);
		}
	};
	
   dom.setCSS = function (stylesheet) {
	   for (key in stylesheet) {
		   var eKey = parseCSS(key);
		   $(dom).css(eKey,stylesheet[key]);
	   }
   };
   
   dom.addClass = function (cl) {
	   $(dom).addClass(cl);
   };
   
   dom.removeClass = function (cl) {
	   $(dom).removeClass(cl);
   };
   
   dom.setID = function (id) {
	   $(dom).attr('id',id);
   };
   
   dom.setAction = function (fun)  {
	   $(dom).click(fun);
   }
   
   dom.insert = function (n) {
	    if (typeof(n) === 'Array') {
		   for (var i=0;i < n.length;i++) {
			   $(dom).append(n[i]);
		   }
	   }
	   else {
		     $(dom).append(n);
	   }
   }
   
   dom.getChild = function (num) {
	   return dom.children[num];
   };
   
   dom.insertAt = function (index,n) {
	   var node = dom.getChild(index);
	      if (typeof(n) === 'Array') {
		   for (var i=0;i < n.length;i++) {
			   $(node).append(n[i]);
		   }
	   }
	   else {
		     $(node).append(n);
	   }
   };
   
   dom.insertAll = function (n) {
	   for (var i=0;i < n.length; i++) {
		   var node = dom.getChild(i);
		   $(node).insert(n[i]);
	   }
   };
   
   dom.setLink = function (lnk) {
	   $(dom).attr('href',lnk);
   };
   
   dom.setName = function (name) {
	   $(dom).attr('name',name);
   };
   
   dom.setValue = function (val) {
	   $(dom).attr('value',val);
   };
	
	dom.destroy = function () {
		dom.remove();
	};
	
	
};

/**
* This is my custom made CSS Parser for styling the nodes.
* Since keys in an object constructor doesn't allow variables with dashes during coding you have to use
* the underscore instead of dash for example use background_color instead of background-color
*
* Example for CSS style : //syntax is similar to CSS
*   var p = {
*	background_color: "blue",
*   color : "green";
* }
*/

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
var parseCSS = function (val) {
	var nVal = "";
	for (var i=0; i < val.length;i++) {
		if (val.charAt(i) === '_') {
			nVal = val.replaceAt(i, '-');
		}
	}
	if (nVal != "") {
		return nVal;
	}
	else {
		return val;
	}
}



var e$ = ezo; // e$ is mainly used to reduce code


/**
* highlight.js 
* don't delete anything from this code
* @src  https://github.com/isagalaev/highlight.js
*/
!function(e){"undefined"!=typeof exports?e(exports):(window.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return window.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){var n=(e.className+" "+(e.parentNode?e.parentNode.className:"")).split(/\s+/);return n=n.map(function(e){return e.replace(/^lang(uage)?-/,"")}),n.filter(function(e){return N(e)||/no(-?)highlight|plain|text/.test(e)})[0]}function i(e,n){var t,r={};for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function o(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3==i.nodeType?a+=i.nodeValue.length:1==i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function u(e,r,a){function i(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function u(e){l+="</"+t(e)+">"}function c(e){("start"==e.event?o:u)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=i();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(o)}else"start"==g[0].event?f.push(g[0].node):f.pop(),c(g.splice(0,1)[0])}return l+n(a.substr(s))}function c(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,o){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var u={},c=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?c("keyword",a.k):Object.keys(a.k).forEach(function(e){c(e,a.k[e])}),a.k=u}a.lR=t(a.l||/\b\w+\b/,!0),o&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&o.tE&&(a.tE+=(a.e?"|":"")+o.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(i(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,o);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function s(e,t,a,i){function o(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function f(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=E.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":x.classPrefix,i='<span class="'+a,o=t?"":"</span>";return i+=e+'">',i+n+o}function d(){if(!L.k)return n(y);var e="",t=0;L.lR.lastIndex=0;for(var r=L.lR.exec(y);r;){e+=n(y.substr(t,r.index-t));var a=g(L,r);a?(B+=a[1],e+=p(a[0],n(r[0]))):e+=n(r[0]),t=L.lR.lastIndex,r=L.lR.exec(y)}return e+n(y.substr(t))}function h(){if(L.sL&&!w[L.sL])return n(y);var e=L.sL?s(L.sL,y,!0,M[L.sL]):l(y);return L.r>0&&(B+=e.r),"continuous"==L.subLanguageMode&&(M[L.sL]=e.top),p(e.language,e.value,!1,!0)}function b(){return void 0!==L.sL?h():d()}function v(e,t){var r=e.cN?p(e.cN,"",!0):"";e.rB?(k+=r,y=""):e.eB?(k+=n(t)+r,y=""):(k+=r,y=t),L=Object.create(e,{parent:{value:L}})}function m(e,t){if(y+=e,void 0===t)return k+=b(),0;var r=o(t,L);if(r)return k+=b(),v(r,t),r.rB?0:t.length;var a=u(L,t);if(a){var i=L;i.rE||i.eE||(y+=t),k+=b();do L.cN&&(k+="</span>"),B+=L.r,L=L.parent;while(L!=a.parent);return i.eE&&(k+=n(t)),y="",a.starts&&v(a.starts,""),i.rE?0:t.length}if(f(t,L))throw new Error('Illegal lexeme "'+t+'" for mode "'+(L.cN||"<unnamed>")+'"');return y+=t,t.length||1}var E=N(e);if(!E)throw new Error('Unknown language: "'+e+'"');c(E);var R,L=i||E,M={},k="";for(R=L;R!=E;R=R.parent)R.cN&&(k=p(R.cN,"",!0)+k);var y="",B=0;try{for(var C,j,I=0;;){if(L.t.lastIndex=I,C=L.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}for(m(t.substr(I)),R=L;R.parent;R=R.parent)R.cN&&(k+="</span>");return{r:B,value:k,language:e,top:L}}catch(S){if(-1!=S.message.indexOf("Illegal"))return{r:0,value:n(t)};throw S}}function l(e,t){t=t||x.languages||Object.keys(w);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(N(n)){var t=s(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function f(e){return x.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,x.tabReplace)})),x.useBR&&(e=e.replace(/\n/g,"<br>")),e}function g(e,n,t){var r=n?E[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function p(e){var n=a(e);if(!/no(-?)highlight|plain|text/.test(n)){var t;x.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,i=n?s(n,r,!0):l(r),c=o(t);if(c.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=i.value,i.value=u(c,o(p),r)}i.value=f(i.value),e.innerHTML=i.value,e.className=g(e.className,n,i.language),e.result={language:i.language,re:i.r},i.second_best&&(e.second_best={language:i.second_best.language,re:i.second_best.r})}}function d(e){x=i(x,e)}function h(){if(!h.called){h.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function b(){addEventListener("DOMContentLoaded",h,!1),addEventListener("load",h,!1)}function v(n,t){var r=w[n]=t(e);r.aliases&&r.aliases.forEach(function(e){E[e]=n})}function m(){return Object.keys(w)}function N(e){return w[e]||w[E[e]]}var x={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},w={},E={};return e.highlight=s,e.highlightAuto=l,e.fixMarkup=f,e.highlightBlock=p,e.configure=d,e.initHighlighting=h,e.initHighlightingOnLoad=b,e.registerLanguage=v,e.listLanguages=m,e.getLanguage=N,e.inherit=i,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="\\b(0[xX][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"},i={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},o=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["m","mm","objc","obj-c"],k:i,l:o,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"preprocessor",b:"#",e:"$",c:[{cN:"title",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:o,c:[e.UTM]},{cN:"variable",b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("ini",function(e){return{cI:!0,i:/\S/,c:[e.C(";","$"),{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:!0,k:"on off true false yes no",c:[e.QSM,e.NM],r:0}]}]}});hljs.registerLanguage("json",function(e){var t={literal:"true false null"},i=[e.QSM,e.CNM],l={cN:"value",e:",",eW:!0,eE:!0,c:i,k:t},c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:l}],i:"\\S"},n={b:"\\[",e:"\\]",c:[e.inherit(l,{cN:null})],i:"\\S"};return i.splice(i.length,0,c,n),{c:i,k:t,i:"\\S"}});hljs.registerLanguage("powershell",function(e){var t={b:"`[\\s\\S]",r:0},r={cN:"variable",v:[{b:/\$[\w\d][\w\d_:]*/}]},o={cN:"string",b:/"/,e:/"/,c:[t,r,{cN:"variable",b:/\$[A-z]/,e:/[^A-z]/}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["ps"],l:/-?[A-z\.\-]+/,cI:!0,k:{keyword:"if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch",literal:"$null $true $false",built_in:"Add-Content Add-History Add-Member Add-PSSnapin Clear-Content Clear-Item Clear-Item Property Clear-Variable Compare-Object ConvertFrom-SecureString Convert-Path ConvertTo-Html ConvertTo-SecureString Copy-Item Copy-ItemProperty Export-Alias Export-Clixml Export-Console Export-Csv ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-Content Get-Credential Get-Culture Get-Date Get-EventLog Get-ExecutionPolicy Get-Help Get-History Get-Host Get-Item Get-ItemProperty Get-Location Get-Member Get-PfxCertificate Get-Process Get-PSDrive Get-PSProvider Get-PSSnapin Get-Service Get-TraceSource Get-UICulture Get-Unique Get-Variable Get-WmiObject Group-Object Import-Alias Import-Clixml Import-Csv Invoke-Expression Invoke-History Invoke-Item Join-Path Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Item New-ItemProperty New-Object New-PSDrive New-Service New-TimeSpan New-Variable Out-Default Out-File Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Remove-Item Remove-ItemProperty Remove-PSDrive Remove-PSSnapin Remove-Variable Rename-Item Rename-ItemProperty Resolve-Path Restart-Service Resume-Service Select-Object Select-String Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-Location Set-PSDebug Set-Service Set-TraceSource Set-Variable Sort-Object Split-Path Start-Service Start-Sleep Start-Transcript Stop-Process Stop-Service Stop-Transcript Suspend-Service Tee-Object Test-Path Trace-Command Update-FormatData Update-TypeData Where-Object Write-Debug Write-Error Write-Host Write-Output Write-Progress Write-Verbose Write-Warning",operator:"-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace"},c:[e.HCM,e.NM,o,a,r]}});hljs.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",e:/;/,eW:!0,k:{keyword:"abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("javascript",function(e){return{aliases:["js"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as await",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"pi",r:10,v:[{b:/^\s*('|")use strict('|")/},{b:/^\s*('|")use asm('|")/}]},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",b:"\\b(0[xXbBoO][a-fA-F0-9]+|(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/>\s*[);\]]/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[e.CLCM,e.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+e.IR,r:0},{bK:"import",e:"[;$]",k:"import from as",c:[e.ASM,e.QSM]},{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]}]}});hljs.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},s={b:"->{",e:"}"},n={cN:"variable",v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=e.C("^(__END__|__DATA__)","\\n$",{r:5}),o=[e.BE,r,n],a=[n,e.HCM,i,e.C("^\\=\\w","\\=cut",{eW:!0}),s,{cN:"string",c:o,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,i,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"sub",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",r:5},{cN:"operator",b:"-\\w\\b",r:0}];return r.c=a,s.c=a,{aliases:["pl"],k:t,c:a}});hljs.registerLanguage("lisp",function(b){var e="[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*",c="\\|[^]*?\\|",r="(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?",a={cN:"shebang",b:"^#!",e:"$"},i={cN:"literal",b:"\\b(t{1}|nil)\\b"},l={cN:"number",v:[{b:r,r:0},{b:"#(b|B)[0-1]+(/[0-1]+)?"},{b:"#(o|O)[0-7]+(/[0-7]+)?"},{b:"#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"},{b:"#(c|C)\\("+r+" +"+r,e:"\\)"}]},t=b.inherit(b.QSM,{i:null}),d=b.C(";","$",{r:0}),n={cN:"variable",b:"\\*",e:"\\*"},u={cN:"keyword",b:"[:&]"+e},N={b:e,r:0},o={b:c},s={b:"\\(",e:"\\)",c:["self",i,t,l,N]},v={cN:"quoted",c:[l,t,n,u,s,N],v:[{b:"['`]\\(",e:"\\)"},{b:"\\(quote ",e:"\\)",k:"quote"},{b:"'"+c}]},f={cN:"quoted",v:[{b:"'"+e},{b:"#'"+e+"(::"+e+")*"}]},g={cN:"list",b:"\\(\\s*",e:"\\)"},q={eW:!0,r:0};return g.c=[{cN:"keyword",v:[{b:e},{b:c}]},q],q.c=[v,f,g,i,l,t,d,n,u,o,N],{i:/\S/,c:[l,a,i,t,d,v,f,g,N]}});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"title",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("php",function(e){var c={cN:"variable",b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},i={cN:"preprocessor",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,i],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.CLCM,e.HCM,e.C("/\\*","\\*/",{c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},i]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[e.BE]},i,c,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}});hljs.registerLanguage("java",function(e){var a=e.UIR+"(<"+e.UIR+">)?",t="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",c="(\\b(0b[01_]+)|\\b0[xX][a-fA-F0-9_]+|(\\b[\\d_]+(\\.[\\d_]*)?|\\.[\\d_]+)([eE][-+]?\\d+)?)[lLfF]?",r={cN:"number",b:c,r:0};return{aliases:["jsp"],k:t,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",r:0,c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}]},e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return",r:0},{cN:"function",b:"("+a+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:t,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},r,{cN:"annotation",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("cpp",function(t){var i={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary intmax_t uintmax_t int8_t uint8_t int16_t uint16_t int32_t uint32_t  int64_t uint64_t int_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_t int_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_t uint_fast32_t int_fast64_t uint_fast64_t intptr_t uintptr_t atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong atomic_wchar_t atomic_char16_t atomic_char32_t atomic_intmax_t atomic_uintmax_t atomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_int_least8_t atomic_int_least16_t atomic_int_least32_t atomic_int_least64_t atomic_uint_least8_t atomic_uint_least16_t atomic_uint_least32_t atomic_uint_least64_t atomic_int_fast8_t atomic_int_fast16_t atomic_int_fast32_t atomic_int_fast64_t atomic_uint_fast8_t atomic_uint_fast16_t atomic_uint_fast32_t atomic_uint_fast64_t",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"};return{aliases:["c","cc","h","c++","h++","hpp"],k:i,i:"</",c:[t.CLCM,t.CBCM,t.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},t.CNM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line pragma",c:[{b:/\\\n/,r:0},{b:'include\\s*[<"]',e:'[>"]',k:"include",i:"\\n"},t.CLCM]},{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:i,c:["self"]},{b:t.IR+"::",k:i},{bK:"new throw return else",r:0},{cN:"function",b:"("+t.IR+"\\s+)+"+t.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:i,c:[{b:t.IR+"\\s*\\(",rB:!0,c:[t.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:i,r:0,c:[t.CBCM]},t.CLCM,t.CBCM]}]}});hljs.registerLanguage("actionscript",function(e){var a="[a-zA-Z_$][a-zA-Z0-9_$]*",c="([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)",t={cN:"rest_arg",b:"[.]{3}",e:a,r:10};return{aliases:["as"],k:{keyword:"as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",literal:"true false null undefined"},c:[e.ASM,e.QSM,e.CLCM,e.CBCM,e.CNM,{cN:"package",bK:"package",e:"{",c:[e.TM]},{cN:"class",bK:"class interface",e:"{",eE:!0,c:[{bK:"extends implements"},e.TM]},{cN:"preprocessor",bK:"import include",e:";"},{cN:"function",bK:"function",e:"[{;]",eE:!0,i:"\\S",c:[e.TM,{cN:"params",b:"\\(",e:"\\)",c:[e.ASM,e.QSM,e.CLCM,e.CBCM,t]},{cN:"type",b:":",e:c,r:10}]}]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",t={cN:"subst",b:/#\{/,e:/}/,k:c},r=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,t]},{b:/"/,e:/"/,c:[e.BE,t]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[t,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{cN:"property",b:"@"+n},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];t.c=r;var i=e.inherit(e.TM,{b:n}),s="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(r)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:r.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{cN:"attribute",b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("lua",function(e){var t="\\[=*\\[",a="\\]=*\\]",r={b:t,e:a,c:["self"]},n=[e.C("--(?!"+t+")","$"),e.C("--"+t,a,{c:[r],r:10})];return{l:e.UIR,k:{keyword:"and break do else elseif end false for if in local nil not or repeat return then true until while",built_in:"_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"},c:n.concat([{cN:"function",bK:"function",e:"\\)",c:[e.inherit(e.TM,{b:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{cN:"params",b:"\\(",eW:!0,c:n}].concat(n)},e.CNM,e.ASM,e.QSM,{cN:"string",b:t,e:a,c:[r],r:5}])}});hljs.registerLanguage("go",function(e){var t={keyword:"break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",constant:"true false iota nil",typename:"bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",built_in:"append cap close complex copy imag len make new panic print println real recover delete"};return{aliases:["golang"],k:t,i:"</",c:[e.CLCM,e.CBCM,e.QSM,{cN:"string",b:"'",e:"[^\\\\]'"},{cN:"string",b:"`",e:"`"},{cN:"number",b:e.CNR+"[dflsi]?",r:0},e.CNM]}});hljs.registerLanguage("http",function(t){return{aliases:["https"],i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]}});hljs.registerLanguage("xml",function(t){var e="[A-Za-z0-9\\._:-]+",s={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"},c={eW:!0,i:/</,r:0,c:[s,{cN:"attribute",b:e,r:0},{b:"=",r:0,c:[{cN:"value",c:[s],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},t.C("<!--","-->",{r:10}),{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"</script>",rE:!0,sL:""}},s,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},c]}]}});hljs.registerLanguage("cs",function(e){var r="abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",t=e.IR+"(<"+e.IR+">)?";return{aliases:["csharp"],k:r,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"xmlDocTag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},e.ASM,e.QSM,e.CNM,{bK:"class namespace interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}});hljs.registerLanguage("python",function(e){var r={cN:"prompt",b:/^(>>>|\.\.\.) /},b={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[r],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},e.ASM,e.QSM]},l={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},c={cN:"params",b:/\(/,e:/\)/,c:["self",r,l,b]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[r,l,b,e.HCM,{v:[{cN:"function",bK:"def",r:10},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,c]},{cN:"decorator",b:/@/,e:/$/},{b:/\b(print|exec)\(/}]}});hljs.registerLanguage("haskell",function(e){var c=[e.C("--","$"),e.C("{-","-}",{c:["self"]})],a={cN:"pragma",b:"{-#",e:"#-}"},i={cN:"preprocessor",b:"^#",e:"$"},n={cN:"type",b:"\\b[A-Z][\\w']*",r:0},t={cN:"container",b:"\\(",e:"\\)",i:'"',c:[a,i,{cN:"type",b:"\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"},e.inherit(e.TM,{b:"[_a-z][\\w']*"})].concat(c)},l={cN:"container",b:"{",e:"}",c:t.c};return{aliases:["hs"],k:"let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",c:[{cN:"module",b:"\\bmodule\\b",e:"where",k:"module where",c:[t].concat(c),i:"\\W\\.|;"},{cN:"import",b:"\\bimport\\b",e:"$",k:"import|0 qualified as hiding",c:[t].concat(c),i:"\\W\\.|;"},{cN:"class",b:"^(\\s*)?(class|instance)\\b",e:"where",k:"class family instance where",c:[n,t].concat(c)},{cN:"typedef",b:"\\b(data|(new)?type)\\b",e:"$",k:"data family type newtype deriving",c:[a,n,t,l].concat(c)},{cN:"default",bK:"default",e:"$",c:[n,t].concat(c)},{cN:"infix",bK:"infix infixl infixr",e:"$",c:[e.CNM].concat(c)},{cN:"foreign",b:"\\bforeign\\b",e:"$",k:"foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",c:[n,e.QSM].concat(c)},{cN:"shebang",b:"#!\\/usr\\/bin\\/env runhaskell",e:"$"},a,i,e.QSM,e.CNM,n,e.inherit(e.TM,{b:"^[_a-z][\\w']*"}),{b:"->|<-"}].concat(c)}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,e.NM,s,a,t]}});hljs.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"chunk",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"header",v:[{b:/Index: /,e:/$/},{b:/=====/,e:/=====$/},{b:/^\-\-\-/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+\+\+/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",a={cN:"function",b:c+"\\(",rB:!0,eE:!0,e:"\\("},r={cN:"rule",b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{cN:"value",eW:!0,eE:!0,c:[a,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]};return{cI:!0,i:/[=\/|']/,c:[e.CBCM,r,{cN:"id",b:/\#[A-Za-z0-9_-]+/},{cN:"class",b:/\.[A-Za-z0-9_-]+/,r:0},{cN:"attr_selector",b:/\[/,e:/\]/,i:"$"},{cN:"pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[a,e.ASM,e.QSM,e.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:/\S/,r:0,c:[e.CBCM,r]}]}});hljs.registerLanguage("scala",function(e){var t={cN:"annotation",b:"@[A-Za-z]+"},a={cN:"string",b:'u?r?"""',e:'"""',r:10},r={cN:"symbol",b:"'\\w[\\w\\d_]*(?!')"},c={cN:"type",b:"\\b[A-Z][A-Za-z0-9_]*",r:0},i={cN:"title",b:/[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,r:0},l={cN:"class",bK:"class object trait type",e:/[:={\[(\n;]/,c:[{cN:"keyword",bK:"extends with",r:10},i]},n={cN:"function",bK:"def val",e:/[:={\[(\n;]/,c:[i]};return{k:{literal:"true false null",keyword:"type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"},c:[e.CLCM,e.CBCM,a,e.QSM,r,c,n,l,e.CNM,t]}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("fortran",function(e){var t={cN:"params",b:"\\(",e:"\\)"},n={constant:".False. .True.",type:"integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",keyword:"kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure",built_in:"alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image"};return{cI:!0,aliases:["f90","f95"],k:n,c:[e.inherit(e.ASM,{cN:"string",r:0}),e.inherit(e.QSM,{cN:"string",r:0}),{cN:"function",bK:"subroutine function program",i:"[${=\\n]",c:[e.UTM,t]},e.C("!","$",{r:0}),{cN:"number",b:"(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",r:0}]}});hljs.registerLanguage("makefile",function(e){var a={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[a]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,a]}]}});hljs.registerLanguage("ruby",function(e){var c="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",b={cN:"yardoctag",b:"@[A-Za-z]+"},a={cN:"value",b:"#<",e:">"},n=[e.C("#","$",{c:[b]}),e.C("^\\=begin","^\\=end",{c:[b],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},i={cN:"params",b:"\\(",e:"\\)",k:r},d=[t,a,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+e.IR+"::)?"+e.IR}]}].concat(n)},{cN:"function",bK:"def",e:" |$|;",r:0,c:[e.inherit(e.TM,{b:c}),i].concat(n)},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[t,{b:c}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:[a,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(n),r:0}].concat(n);s.c=d,i.c=d;var o="[>?]>",l="[\\w#]+\\(\\w+\\):\\d+:\\d+>",u="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",N=[{b:/^\s*=>/,cN:"status",starts:{e:"$",c:d}},{cN:"prompt",b:"^("+o+"|"+l+"|"+u+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,c:n.concat(N).concat(d)}});hljs.registerLanguage("delphi",function(e){var r="exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure",t=[e.CLCM,e.C(/\{/,/\}/,{r:0}),e.C(/\(\*/,/\*\)/,{r:10})],i={cN:"string",b:/'/,e:/'/,c:[{b:/''/}]},c={cN:"string",b:/(#\d+)+/},o={b:e.IR+"\\s*=\\s*class\\s*\\(",rB:!0,c:[e.TM]},n={cN:"function",bK:"function constructor destructor procedure",e:/[:;]/,k:"function constructor|10 destructor|10 procedure|10",c:[e.TM,{cN:"params",b:/\(/,e:/\)/,k:r,c:[i,c]}].concat(t)};return{cI:!0,k:r,i:/"|\$[G-Zg-z]|\/\*|<\/|\|/,c:[i,c,e.NM,o,n].concat(t)}});
