!function(t,e){function n(t){if(void 0===e.escapeXSS)throw new Error("$.escapeXSS must be defined in order to use this version of Scriptaculous.Builder.");return e.escapeXSS(t)}var r={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(t){t=t.toUpperCase();var r=this.NODEMAP[t]||"div",i=document.createElement(r);try{i.innerHTML=n("<"+t+"></"+t+">")}catch(t){}var a=i.firstChild||null;if(a&&a.tagName.toUpperCase()!=t&&(a=a.getElementsByTagName(t)[0]),a||(a=document.createElement(t)),a){if(arguments[1])if(this._isStringOrNumber(arguments[1])||arguments[1]instanceof Array||arguments[1].tagName)this._children(a,arguments[1]);else{var T=this._attributes(arguments[1]);if(T.length){try{i.innerHTML=n("<"+t+" "+T+"></"+t+">")}catch(t){}if(!(a=i.firstChild||null)){a=document.createElement(t);for(attr in arguments[1])a["class"==attr?"className":attr]=arguments[1][attr]}a.tagName.toUpperCase()!=t&&(a=i.getElementsByTagName(t)[0])}}return arguments[2]&&this._children(a,arguments[2]),e(a)}},_text:function(t){return document.createTextNode(t)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(t){var e=[];for(attribute in t)e.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+t[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');return e.join(" ")},_children:function(t,e){if(e.tagName)return void t.appendChild(e);"object"==typeof e?e.flatten().each(function(e){"object"==typeof e?t.appendChild(e):r._isStringOrNumber(e)&&t.appendChild(r._text(e))}):r._isStringOrNumber(e)&&t.appendChild(r._text(e))},_isStringOrNumber:function(t){return"string"==typeof t||"number"==typeof t},build:function(t){var n=this.node("div");return e(n).update(t.strip()),n.down()},dump:function(t){"object"!=typeof t&&"function"!=typeof t&&(t=window),"A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/).each(function(e){t[e]=function(){return r.node.apply(r,[e].concat($A(arguments)))}})}};t.Builder=r}(this,$);