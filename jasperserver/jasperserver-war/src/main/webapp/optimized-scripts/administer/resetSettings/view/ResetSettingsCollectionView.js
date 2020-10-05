define(["require","jquery","underscore","backbone","bundle!EditSettingsBundle","common/component/baseTable/BaseTable","text!../templates/collectionViewTemplate.htm","common/component/base/OptionContainer","common/component/dialog/AlertDialog","common/component/notification/Notification","serverSettingsCommon/enum/confirmDialogTypesEnum","administer/resetSettings/factory/confirmationDialogFactory","css!attributes.css"],function(e){var t=e("jquery"),i=e("underscore"),n=e("backbone"),o=e("bundle!EditSettingsBundle"),s=e("common/component/baseTable/BaseTable"),a=e("text!../templates/collectionViewTemplate.htm"),l=(e("common/component/base/OptionContainer"),e("common/component/dialog/AlertDialog")),c=e("common/component/notification/Notification"),r=e("serverSettingsCommon/enum/confirmDialogTypesEnum"),h=e("administer/resetSettings/factory/confirmationDialogFactory");e("css!attributes.css");var m=s.extend({template:i.template(a),templateHelpers:function(){return{i18n:o}},childEvents:{"open:confirm":"_openConfirm"},initialize:function(e){s.prototype.initialize.apply(this,arguments),this.notification=new c,this.alertDialog=new l,this.model=new n.Model,this.changedViews=[],!i.isEmpty(e.buttons)&&e.buttonsContainer&&this._initButtons(e),this._initConfirmationDialogs(),this.tooltip&&this._initTooltipEvents(),this._initEvents()},fetchData:function(){return this.collection.fetch({reset:!0,headers:{Accept:"application/attributes.collection.hal+json"}})},saveChildren:function(){var e=this,t=[];i.each(e.changedViews,function(e){t.push(e.model)},e),t.length&&e.collection.save(t).done(i.bind(e._successAjaxCallback,e)).fail(i.bind(e._errorAjaxCallback,e))},revertChanges:function(){for(var e=this.changedViews.length,t=e-1;t>=0;t--)this._revertViewRemoval(this.changedViews[t]);this._resetChangedList()},containsUnsavedItems:function(){return!!this.changedViews.length},remove:function(){t(window).off("beforeunload",this._onPageLeave),this.confirmationDialog&&this.confirmationDialog.remove(),this.notification&&this.notification.remove(),this.alertDialog&&this.alertDialog.remove(),s.prototype.remove.apply(this,arguments)},_initEvents:function(){t(window).on("beforeunload",i.bind(this._onPageLeave,this))},_initTooltipEvents:function(){this.listenTo(this,"childview:mouseover",this._onChildViewMouseOver),this.listenTo(this,"childview:mouseout",this._onChildViewMouseOut)},_initConfirmationDialogs:function(){this.confirmationDialogs={},i.each(r,function(e){this.confirmationDialogs[e]=h(e)},this),this.listenTo(this.confirmationDialogs[r.DELETE_CONFIRM],"button:yes",this._onDeleteConfirm),this.listenTo(this.confirmationDialogs[r.CANCEL_CONFIRM],"button:yes",this.revertChanges),this._initPermissionConfirmEvents&&this._initPermissionConfirmEvents()},_successAjaxCallback:function(e){this.notification.show({message:o["editSettings.notification.message.saved"],type:"success"}),this._resetChangedList()},_errorAjaxCallback:function(e){var t;switch(e.status){case 401:t=o["editSettings.error.message.not.authenticated"];break;default:t=o["editSettings.error.message.unknown.error"]}this.alertDialog.setMessage(t),this.alertDialog.open()},_findChildrenByModel:function(e){return e=i.isString(e)?this._findModelsWhere({name:e}):e,e&&this.children.findByModel(e)},_resetChangedList:function(){this.changedViews.length=0,this.toggleButtons()},_revertViewRemoval:function(e){this._deleteViewFromChangedList(e),this.collection.add(e.model,{at:e.indexAt})},_openConfirm:function(e,t){this.model.set("changedChildView",e);var n=this.confirmationDialogs[t],s=t!==r.CANCEL_CONFIRM?!0:this.containsUnsavedItems();t===r.DELETE_CONFIRM&&n.setContent(i.template(o["editSettings.confirm.delete.dialog.text"],{name:e.model.get("name")})),s&&n.open()},_saveChildViewToChangedList:function(e,t){var n=i.indexOf(this.changedViews,e);-1!==n?!t&&this._deleteViewFromChangedList(e,n):t&&this.changedViews.push(e),this.toggleButtons()},_deleteViewFromChangedList:function(e,t){t=t||i.indexOf(this.changedViews,e),-1!==t&&this.changedViews.splice(t,1)},_removeModel:function(e){this.collection.remove(e)},_onPageLeave:function(e){return this.containsUnsavedItems()?((e||window.event).returnValue=o["editSettings.dialog.unsaved.changes"],o["editSettings.dialog.unsaved.changes"]):void 0},_onDeleteConfirm:function(){var e=this.model.get("changedChildView"),t=e.model;e.indexAt=this.collection.indexOf(t),this._saveChildViewToChangedList(e,!0),this._removeModel(t)},_onChildViewMouseOver:function(e,n,o){var s,a=t(o.target).closest(".table-column");a.hasClass("name")&&(s="name"),a.hasClass("value")&&(s="value"),this.tooltip.show(i.pick(n.toJSON(),s))},_onChildViewMouseOut:function(e,t,i){this.tooltip.hide()}});return m});