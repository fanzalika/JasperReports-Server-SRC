define(["require","exports","module","jquery","underscore","../model/ListWithSelectionModel","./ScalableList"],function(e,t,i){var s=e("jquery"),o=e("underscore"),l=e("../model/ListWithSelectionModel"),n=e("./ScalableList"),h={LEFT:"left",RIGHT:"right"},a=n.extend({ListModel:l,globalEvents:!0,initialize:function(e){return o.bindAll(this,"onGlobalMouseup","onGlobalMousemove","_autoScroll","fetch"),this.eventListenerPattern=e.eventListenerPattern||"li",this.markerClass=e.markerClass?e.markerClass:"",this.selectedClass=e.selectedClass?e.selectedClass:"selected",this._initSelection(e.selection),n.prototype.initialize.call(this,e)},delegateEvents:function(){var e=n.prototype.delegateEvents.apply(this,arguments);return this.$el.on("mousedown",this.eventListenerPattern,o.bind(this.onMousedown,this)).on("mousemove",this.eventListenerPattern,o.bind(this.onMousemove,this)).on("dblclick",this.eventListenerPattern,o.bind(this.onMousedblclick,this)).on("contextmenu",this.eventListenerPattern,o.bind(this.onItemEvent,this,this.$el)).on("mouseout",this.eventListenerPattern,o.bind(this.onItemEvent,this,this.$el)).on("mouseover",this.eventListenerPattern,o.bind(this.onItemEvent,this,this.$el)),!this.globalEvents&&this.$el.on("mouseup",this.eventListenerPattern,this.onGlobalMouseup),e},undelegateEvents:function(){var e=n.prototype.undelegateEvents.apply(this,arguments);return this.$el.off("mouseup").off("mousedown").off("mousemove").off("dblclick").off("contextmenu").off("mouseout").off("mouseover"),e},_initSelection:function(e){e=o.extend({allowed:{}},e);var t=e.allowed,i=o.isObject(t)?t.left:t;this.selection={allowed:{left:void 0===i||i,right:void 0!==t.right&&t.right},multiple:void 0===e.multiple||e.multiple}},initListeners:function(){n.prototype.initListeners.call(this),this.listenTo(this.model,"selection:clear",this.clearSelection,this),this.listenTo(this.model,"selection:add",this.selectValue,this),this.listenTo(this.model,"selection:addRange",this.selectRange,this),this.listenTo(this.model,"selection:remove",this.deselectValue,this),this.globalEvents&&s("body").on("mouseup",this.onGlobalMouseup).on("mousemove",this.onGlobalMousemove)},postProcessChunkModelItem:function(e,t){n.prototype.postProcessChunkModelItem.call(this,e,t),e.selected=this.model.selectionContains&&this.model.selectionContains(e.value,e.index)},onMousedblclick:function(e){if(!this.selection.multiple&&(this.selection.allowed.left||this.selection.allowed.right)&&!this.getDisabled()){var t=this._getDomItemData(e.currentTarget);this._singleSelect(e,t.value,t.index),this.selectionChanged&&(this._triggerSelectionChanged(),this._triggerDblclicked(),this.selectionChanged=!1)}},getItemByEvent:function(e){return this._getDomItemData(e.currentTarget).item},onItemEvent:function(e,t){var i=t.type,s=this.getItemByEvent(t);this.trigger("list:item:"+i,s,t)},onMousedown:function(e){if(!this.getDisabled()&&(this.selection.allowed.left&&1===e.which||this.selection.allowed.right&&3===e.which)){var t=1===e.which?h.LEFT:h.RIGHT;this.selection.multiple&&(this[t+"MouseButtonPressed"]=!0,this.mouseDownPos=this._getMousePos(e));var i=this._getDomItemData(e.currentTarget);this.selection.multiple?this._multiSelect(e,i.value,i.index):this._singleSelect(e,i.value,i.index)}},onMousemove:function(e){if(this._allowMouseMoveSelection()&&(this._stopAutoScroll(),this._mouseMoved(e,this.mouseDownPos))){this.mouseDownPos=this._getMousePos(e);var t=this._getDomItemData(e.currentTarget);this.model.selectionContains(t.value,t.index)||this.model.addRangeToSelection(t.value,t.index)}},onGlobalMouseup:function(e){var t=this;(this.leftMouseButtonPressed||this.rightMouseButtonPressed)&&(o.each(h,function(e){t[e+"MouseButtonPressed"]=!1}),delete this.mouseDownPos,this._stopAutoScroll(),this.selectionChanged&&(this._triggerSelectionChanged(),this.selectionChanged=!1))},onGlobalMousemove:function(e){this._allowMouseMoveSelection()&&(this.mousePosY=e.clientY,this.scrollInterval||(this.scrollInterval=setInterval(this._autoScroll,this.manualScrollInterval)))},clearSelection:function(){this.$el.find("li."+this.selectedClass+this.markerClass).removeClass(this.selectedClass),this.selectionChanged=!0},selectValue:function(e){this.$el.find("li"+this.markerClass+"[data-index='"+e.index+"']:not(."+this.selectedClass+")").addClass(this.selectedClass),this.selection.multiple?this.selectionChanged=!0:this._triggerSelectionChanged()},selectRange:function(e){var t=this,i=Math.max(this.model.get("bufferStartIndex"),e.start),o=Math.min(this.model.get("bufferEndIndex"),e.end);this.$el.find("li"+this.markerClass+":not(."+this.selectedClass+")").each(function(){var e=s(this),l=parseInt(e.attr("data-index"),10);if(l>=i&&l<=o){var n=t.model.get("items")[l-t.model.get("bufferStartIndex")];t.model.selectionContains(n.value,l)&&e.addClass(t.selectedClass)}}),this.selectionChanged=!0},deselectValue:function(e){this.$el.find("li[data-index='"+e.index+"']."+this.selectedClass+this.markerClass).removeClass(this.selectedClass),this.selection.multiple?this.selectionChanged=!0:this._triggerSelectionChanged()},_autoScroll:function(){var e,t=this.$el.offset().top,i=this.$el.scrollTop(),s=void 0!==this.scrollTop?this.scrollTop:i,o=!1;this.mousePosY<t?(e=s-3*this.itemHeight,o=e<i):this.mousePosY>t+this.viewPortHeight&&(e=s+3*this.itemHeight,o=e>i),o&&(this.$el.scrollTop(e),this.scrollTop=this.$el.scrollTop(),this._fetchVisibleData()),this._selectRangeOnAutoScroll(s,e)},_selectRangeOnAutoScroll:function(e,t){var i;if(e<t?i=this._getVisibleItems().bottom:e>t&&(i=this._getVisibleItems().top),i){var s=this.model.get("items")[i-this.model.get("bufferStartIndex")];s&&(this.model.selectionContains(s.value,i)||this.model.addRangeToSelection(s.value,i))}},_stopAutoScroll:function(){this.scrollInterval&&(clearInterval(this.scrollInterval),this.scrollInterval=void 0,this.scrollTop=void 0)},_multiSelect:function(e,t,i){e.shiftKey?this.model.addRangeToSelection(t,i):e.ctrlKey||e.metaKey?this._singleSelect(e,t,i):this.model.toggleSelection(t,i)},_singleSelect:function(e,t,i){this.model.clearSelection().addValueToSelection(t,i)},_triggerSelectionChanged:function(){this.trigger("selection:change",this.getValue())},_triggerDblclicked:function(){this.trigger("item:dblclick",this.getValue())},_getDomItemData:function(e){for(var t=s(e),i=t.attr("data-index");void 0===i;)t=t.parent(),i=t.attr("data-index");i=parseInt(i,10);var o=this.model.get("items")[i-this.model.get("bufferStartIndex")];return{item:o,value:o.value,index:i}},_mouseMoved:function(e,t){return Math.abs(t.x-e.clientX)+Math.abs(t.y-e.clientY)>=1},_getMousePos:function(e){return{x:e.clientX,y:e.clientY}},_allowMouseMoveSelection:function(){return(this.selection.allowed.left&&this.leftMouseButtonPressed||this.selection.allowed.right&&this.rightMouseButtonPressed)&&this.selection.multiple&&!this.getDisabled()},getValue:function(){return this.model.getSelection()},setValue:function(e,t){return t=t||{},t&&t.silent||t.modelOptions&&t.modelOptions.silent||this.model.once("selection:change",this._triggerSelectionChanged,this),t=t.modelOptions,this.model.select(e,t),this},selectAll:function(e){return e&&e.silent||this.model.once("selection:change",this._triggerSelectionChanged,this),this.model.selectAll(),this},selectNone:function(e){return this.setValue({},e)},invertSelection:function(e){return e&&e.silent||this.model.once("selection:change",this._triggerSelectionChanged,this),this.model.invertSelection(),this},setDisabled:function(e){return this.disabled=e,this.disabled?this.$el.addClass("disabled"):this.$el.removeClass("disabled"),this},getDisabled:function(){return this.disabled},remove:function(){return s("body").off("mouseup",this.onGlobalMouseup).off("mousemove",this.onGlobalMousemove),n.prototype.remove.call(this)}});i.exports=a});