define(["require","exports","module","underscore","backbone","text!./template/overlayLayout.htm"],function(e,t,i){var r=e("underscore"),n=e("backbone"),s=e("text!./template/overlayLayout.htm");i.exports=n.View.extend({template:r.template(s),initialize:function(e){this.delay=e.delay,this.render()},render:function(){return this.$el.append(this.template()),this.$elSpinner=this.$(".jr-mSpinnerDatatable"),this.$elOverlay=this.$(".jr-mOverlay"),this},show:function(e){var t=this,i=function(){t.$elSpinner.show(),t.$elOverlay.show()};this.delay||e?this._timer||(this._timer=setTimeout(i,this.delay||e)):i()},hide:function(){this._timer&&(clearTimeout(this._timer),this._timer=null),this.$elSpinner.hide(),this.$elOverlay.hide()},remove:function(){return this.$elSpinner.remove(),this.$elOverlay.remove(),this.stopListening(),this}})});