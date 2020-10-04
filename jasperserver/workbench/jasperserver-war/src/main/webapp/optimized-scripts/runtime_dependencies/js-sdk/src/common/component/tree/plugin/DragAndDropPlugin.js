define(["require","exports","module","underscore","jquery","./TreePlugin","jquery-ui/ui/widgets/draggable"],function(t,e,r){var a=t("underscore"),n=t("jquery"),i=t("./TreePlugin");t("jquery-ui/ui/widgets/draggable"),r.exports=i.extend({initialize:function(t){this.onDragStart=t.onDragStart,this.onDrag=t.onDrag,this.onDragStop=t.onDragStop,i.prototype.initialize.apply(this,arguments)},itemsRendered:function(t){var e=this;this.$draggableElements=this.$("> .subcontainer > .j-view-port-chunk > ul > li > .draggable"),this.$draggableElements.draggable({cursor:"move",appendTo:n("#display"),cursorAt:{top:0,left:0},helper:function(t){return n('<div class="wrap button draggable dragging dragHelper"></div>')},start:function(r,i){for(var o=n(this),g=o.attr("data-index");void 0===g;)o=o.parent(),g=o.attr("data-index");g=parseInt(g,10);var d=a.reject(t.get("items"),function(t){return t.index!==g})[0].value;i.helper.text(d.label).data("data",d),e.onDragStart&&e.onDragStart(d,r)},drag:function(t,r){e.onDrag&&e.onDrag(r.helper.data("data"),t)},stop:function(t,r){e.onDragStop&&e.onDragStop(r.helper.data("data"),t)}})},remove:function(){try{this.$draggableElements.draggable("destroy")}catch(t){}i.prototype.remove.apply(this,arguments)}})});