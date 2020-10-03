define(["require","exports","module","jquery","underscore","../view/ScalableList","../view/ListWithSelection"],function(e,t,i){var s=e("jquery"),n=e("underscore"),l=e("../view/ScalableList"),o=e("../view/ListWithSelection");i.exports={initListeners:function(){l.prototype.initListeners.call(this),this.listenTo(this.model,"selection:clear",this.clearSelection,this),this.listenTo(this.model,"selection:add",this.selectValue,this),this.listenTo(this.model,"selection:addRange",this.selectRange,this),this.listenTo(this.model,"selection:remove",this.deselectValue,this),s("body").on("mouseup",this.onGlobalMouseup)},delegateEvents:function(){var e=o.prototype.delegateEvents.apply(this,arguments);return this.$el.on("mouseup",this.eventListenerPattern,n.bind(this._onMouseup,this)),e},onMousedblclick:function(e){if((this.selection.allowed.left||this.selection.allowed.right)&&!this.getDisabled()){var t=this._getDomItemData(e.currentTarget);this._singleSelect(e,t.value,t.index),this.selectionChanged&&(this._triggerSelectionChanged(),this._triggerDblclicked(),this.selectionChanged=!1)}},onMousemove:function(){},onGlobalMouseup:function(){this.selectionStarted=!1},_multiSelect:function(e,t,i){this.selectionStarted=!0;var s=this.model;e.shiftKey?s.addRangeToSelection(t,i):e.ctrlKey||e.metaKey?s.toggleSelection(t,i):n.compact(s.getSelection()).length<=1&&(this._singleSelect(e,t,i),this._triggerSelectionChanged())},_onMouseup:function(e){var t;this.selectionStarted&&(t=this._getDomItemData(e.currentTarget),e.ctrlKey||e.shiftKey||e.metaKey||this._singleSelect(e,t.value,t.index),this.selectionChanged&&(this._triggerSelectionChanged(),this.selectionChanged=!1)),this.selectionStarted=!1}}});