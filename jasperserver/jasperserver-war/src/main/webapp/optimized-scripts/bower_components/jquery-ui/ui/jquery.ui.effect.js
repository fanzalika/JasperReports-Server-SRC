define(["require","jquery"],function(t){var e=t("jquery"),n="ui-effects-";return e.effects={effect:{}},function(t,e){function n(t,e,n){var r=l[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function r(e){var n=c(),r=n._rgba=[];return e=e.toLowerCase(),h(u,function(t,o){var a,i=o.re.exec(e),s=i&&o.parse(i),u=o.space||"rgba";return s?(a=n[u](s),n[f[u].cache]=a[f[u].cache],r=n._rgba=a._rgba,!1):void 0}),r.length?("0,0,0,0"===r.join()&&t.extend(r,a.transparent),n):a[e]}function o(t,e,n){return n=(n+1)%1,1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t}var a,i="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,u=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],c=t.Color=function(e,n,r,o){return new t.Color.fn.parse(e,n,r,o)},f={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=c.support={},p=t("<p>")[0],h=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,h(f,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),c.fn=t.extend(c.prototype,{parse:function(o,i,s,u){if(o===e)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=t(o).css(i),i=e);var l=this,d=t.type(o),p=this._rgba=[];return i!==e&&(o=[o,i,s,u],d="array"),"string"===d?this.parse(r(o)||a._default):"array"===d?(h(f.rgba.props,function(t,e){p[e.idx]=n(o[e.idx],e)}),this):"object"===d?(o instanceof c?h(f,function(t,e){o[e.cache]&&(l[e.cache]=o[e.cache].slice())}):h(f,function(e,r){var a=r.cache;h(r.props,function(t,e){if(!l[a]&&r.to){if("alpha"===t||null==o[t])return;l[a]=r.to(l._rgba)}l[a][e.idx]=n(o[t],e,!0)}),l[a]&&t.inArray(null,l[a].slice(0,3))<0&&(l[a][3]=1,r.from&&(l._rgba=r.from(l[a])))}),this):void 0},is:function(t){var e=c(t),n=!0,r=this;return h(f,function(t,o){var a,i=e[o.cache];return i&&(a=r[o.cache]||o.to&&o.to(r._rgba)||[],h(o.props,function(t,e){return null!=i[e.idx]?n=i[e.idx]===a[e.idx]:void 0})),n}),n},_space:function(){var t=[],e=this;return h(f,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var r=c(t),o=r._space(),a=f[o],i=0===this.alpha()?c("transparent"):this,s=i[a.cache]||a.to(i._rgba),u=s.slice();return r=r[a.cache],h(a.props,function(t,o){var a=o.idx,i=s[a],c=r[a],f=l[o.type]||{};null!==c&&(null===i?u[a]=c:(f.mod&&(c-i>f.mod/2?i+=f.mod:i-c>f.mod/2&&(i-=f.mod)),u[a]=n((c-i)*e+i,o)))}),this[o](u)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),o=c(e)._rgba;return c(t.map(n,function(t,e){return(1-r)*o[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),c.fn.parse.prototype=c.fn,f.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,o=t[1]/255,a=t[2]/255,i=t[3],s=Math.max(r,o,a),u=Math.min(r,o,a),c=s-u,f=s+u,l=.5*f;return e=u===s?0:r===s?60*(o-a)/c+360:o===s?60*(a-r)/c+120:60*(r-o)/c+240,n=0===c?0:.5>=l?c/f:c/(2-f),[Math.round(e)%360,n,l,null==i?1:i]},f.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],a=t[3],i=.5>=r?r*(1+n):r+n-r*n,s=2*r-i;return[Math.round(255*o(s,i,e+1/3)),Math.round(255*o(s,i,e)),Math.round(255*o(s,i,e-1/3)),a]},h(f,function(r,o){var a=o.props,i=o.cache,u=o.to,f=o.from;c.fn[r]=function(r){if(u&&!this[i]&&(this[i]=u(this._rgba)),r===e)return this[i].slice();var o,s=t.type(r),l="array"===s||"object"===s?r:arguments,d=this[i].slice();return h(a,function(t,e){var r=l["object"===s?t:e.idx];null==r&&(r=d[e.idx]),d[e.idx]=n(r,e)}),f?(o=c(f(d)),o[i]=d,o):c(d)},h(a,function(e,n){c.fn[e]||(c.fn[e]=function(o){var a,i=t.type(o),u="alpha"===e?this._hsla?"hsla":"rgba":r,c=this[u](),f=c[n.idx];return"undefined"===i?f:("function"===i&&(o=o.call(this,f),i=t.type(o)),null==o&&n.empty?this:("string"===i&&(a=s.exec(o),a&&(o=f+parseFloat(a[2])*("+"===a[1]?1:-1))),c[n.idx]=o,this[u](c)))})})}),c.hook=function(e){var n=e.split(" ");h(n,function(e,n){t.cssHooks[n]={set:function(e,o){var a,i,s="";if("transparent"!==o&&("string"!==t.type(o)||(a=r(o)))){if(o=c(a||o),!d.rgba&&1!==o._rgba[3]){for(i="backgroundColor"===n?e.parentNode:e;(""===s||"transparent"===s)&&i&&i.style;)try{s=t.css(i,"backgroundColor"),i=i.parentNode}catch(u){}o=o.blend(s&&"transparent"!==s?s:"_default")}o=o.toRgbaString()}try{e.style[n]=o}catch(u){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=c(e.elem,n),e.end=c(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},c.hook(i),t.cssHooks.borderColor={expand:function(t){var e={};return h(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function t(t){var n,r,o=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(o&&o.length&&o[0]&&o[o[0]])for(r=o.length;r--;)n=o[r],"string"==typeof o[n]&&(a[e.camelCase(n)]=o[n]);else for(n in o)"string"==typeof o[n]&&(a[n]=o[n]);return a}function n(t,n){var r,a,i={};for(r in n)a=n[r],t[r]!==a&&(o[r]||(e.fx.step[r]||!isNaN(parseFloat(a)))&&(i[r]=a));return i}var r=["add","remove","toggle"],o={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,n){e.fx.step[n]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,n,t.end),t.setAttr=!0)}}),e.fn.addBack||(e.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),e.effects.animateClass=function(o,a,i,s){var u=e.speed(a,i,s);return this.queue(function(){var a,i=e(this),s=i.attr("class")||"",c=u.children?i.find("*").addBack():i;c=c.map(function(){var n=e(this);return{el:n,start:t(this)}}),a=function(){e.each(r,function(t,e){o[e]&&i[e+"Class"](o[e])})},a(),c=c.map(function(){return this.end=t(this.el[0]),this.diff=n(this.start,this.end),this}),i.attr("class",s),c=c.map(function(){var t=this,n=e.Deferred(),r=e.extend({},u,{queue:!1,complete:function(){n.resolve(t)}});return this.el.animate(this.diff,r),n.promise()}),e.when.apply(e,c.get()).done(function(){a(),e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),u.complete.call(i[0])})})},e.fn.extend({addClass:function(t){return function(n,r,o,a){return r?e.effects.animateClass.call(this,{add:n},r,o,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(n,r,o,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:n},r,o,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(n,r,o,a,i){return"boolean"==typeof r||void 0===r?o?e.effects.animateClass.call(this,r?{add:n}:{remove:n},o,a,i):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:n},r,o,a)}}(e.fn.toggleClass),switchClass:function(t,n,r,o,a){return e.effects.animateClass.call(this,{add:n,remove:t},r,o,a)}})}(),function(){function t(t,n,r,o){return e.isPlainObject(t)&&(n=t,t=t.effect),t={effect:t},null==n&&(n={}),e.isFunction(n)&&(o=n,r=null,n={}),("number"==typeof n||e.fx.speeds[n])&&(o=r,r=n,n={}),e.isFunction(r)&&(o=r,r=null),n&&e.extend(t,n),r=r||n.duration,t.duration=e.fx.off?0:"number"==typeof r?r:r in e.fx.speeds?e.fx.speeds[r]:e.fx.speeds._default,t.complete=o||n.complete,t}function r(t){return!t||"number"==typeof t||e.fx.speeds[t]?!0:"string"!=typeof t||e.effects.effect[t]?e.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}e.extend(e.effects,{version:"@VERSION",save:function(t,e){for(var r=0;r<e.length;r++)null!==e[r]&&t.data(n+e[r],t[0].style[e[r]])},restore:function(t,e){var r,o;for(o=0;o<e.length;o++)null!==e[o]&&(r=t.data(n+e[o]),void 0===r&&(r=""),t.css(e[o],r))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var n={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),o={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(i){a=document.body}return t.wrap(r),(t[0]===a||e.contains(t[0],a))&&e(a).focus(),r=t.parent(),"static"===t.css("position")?(r.css({position:"relative"}),t.css({position:"relative"})):(e.extend(n,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,r){n[r]=t.css(r),isNaN(parseInt(n[r],10))&&(n[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(o),r.css(n).show()},removeWrapper:function(t){var n=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===n||e.contains(t[0],n))&&e(n).focus()),t},setTransition:function(t,n,r,o){return o=o||{},e.each(n,function(e,n){var a=t.cssUnit(n);a[0]>0&&(o[n]=a[0]*r+a[1])}),o}}),e.fn.extend({effect:function(){function n(t){function n(){e.isFunction(a)&&a.call(o[0]),e.isFunction(t)&&t()}var o=e(this),a=r.complete,s=r.mode;(o.is(":hidden")?"hide"===s:"show"===s)?(o[s](),n()):i.call(o[0],r,n)}var r=t.apply(this,arguments),o=r.mode,a=r.queue,i=e.effects.effect[r.effect];return e.fx.off||!i?o?this[o](r.duration,r.complete):this.each(function(){r.complete&&r.complete.call(this)}):a===!1?this.each(n):this.queue(a||"fx",n)},show:function(e){return function(n){if(r(n))return e.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="show",this.effect.call(this,o)}}(e.fn.show),hide:function(e){return function(n){if(r(n))return e.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="hide",this.effect.call(this,o)}}(e.fn.hide),toggle:function(e){return function(n){if(r(n)||"boolean"==typeof n)return e.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="toggle",this.effect.call(this,o)}}(e.fn.toggle),cssUnit:function(t){var n=this.css(t),r=[];return e.each(["em","px","%","pt"],function(t,e){n.indexOf(e)>0&&(r=[parseFloat(n),e])}),r}})}(),function(){var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),e.each(t,function(t,n){e.easing["easeIn"+t]=n,e.easing["easeOut"+t]=function(t){return 1-n(1-t)},e.easing["easeInOut"+t]=function(t){return.5>t?n(2*t)/2:1-n(-2*t+2)/2}})}(),e});