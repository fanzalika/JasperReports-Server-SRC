define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/dialog/Dialog","bundle!ImportExportBundle","text!../import/template/dependentResourcesDialogTemplate.htm"],function(e,t,i){var n=e("underscore"),o=e("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog"),s=e("bundle!ImportExportBundle"),r=e("text!../import/template/dependentResourcesDialogTemplate.htm");i.exports=o.extend({events:{resize:"onResizeHeight"},onResizeHeight:function(){this.$contentContainer.height(this.$el.height()-this._resizableContainerShiftHeight),this.$(".control.groupBox").css("min-height",this.$contentContainer.height()-this.$(".message").outerHeight(!0))},constructor:function(e){e=e||{},this.options=e,o.prototype.constructor.call(this,{modal:!0,resizable:e.resizable,minWidth:e.minWidth,minHeight:e.minHeight,additionalCssClasses:e.additionalCssClasses||"dependent-resources-dialog jr-uWidth-725px jr-uHeight-500px",title:e.title||s["dialog.broken.dependencies.title"],content:"",buttons:e.buttons}),this.template=n.template(e.template||r)},open:function(e){this.setContent(this.template(n.defaults(e,{message:""}))),o.prototype.open.apply(this,arguments),this.$contentContainer.scrollTop(0);var t=this.$(".jr-mDialog-footer").outerHeight(),i=this.$(".jr-mDialog-header").outerHeight(),s=this.$contentContainer.outerHeight(),r=this.$contentContainer.height();this._resizableContainerShiftHeight=t+i+s-r,this.onResizeHeight()}})});