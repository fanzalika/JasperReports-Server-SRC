define(["require","exports","module","prototype","../util/utils.common"],function(e,t,s){var n=e("prototype"),o=n.$,c=n.$$,l=e("../util/utils.common"),i=l.isArray,u=l.getAsFunction,a={};a.OVER="over",a.SELECTED="selected";a.mouseEnters=function(e){a.isSelected(e)||(e.className+=" "+a.OVER)},a.mouseLeaves=function(e){e.className=e.className.sub(a.OVER,"")},a.isSelected=function(e){if(e)return e.className.include(a.SELECTED)},a.setSelected=function(e){if(!a.isSelected(e)){var t=e.parentNode;a.unselectAll(t),e.className+=" "+a.SELECTED}},a.setUnselected=function(e){a.isSelected(e)&&(e.className=e.className.sub(a.SELECTED,""))},a.callAction=function(e){var t=u(e.parentNode.getAttribute("id"));t&&t(e.getAttribute("id"))},a.unselectAll=function(e){var t;t="tabSet"===e.className?e.select("li.tab"):e;for(var s=0;s<t.length;s++)a.setUnselected(t[s])},a.clicked=function(e,t,s){a.setSelected(e),s&&i(s)?t.apply(e,s):t(s)},function(){for(var e=c("ul.tabSet"),t=0;t<e.length;t++)for(var s=o(e[t]).select("li.tab"),n=0;n<s.length;n++)s[n].onmouseover=function(){a.mouseEnters(this)},s[n].onmouseout=function(){a.mouseLeaves(this)},s[n].onmousedown=function(){a.setSelected(this),a.callAction(this)}}(),s.exports=a});