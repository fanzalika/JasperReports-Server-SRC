define(["require","exports","module","underscore","jquery","backbone","bundle!AttributesBundle","../../serverSettingsCommon/enum/confirmDialogTypesEnum","../../attributes/enum/attributesTypesEnum","../../attributes/factory/confirmationDialogFactory","../../attributes/factory/tableTemplatesFactory","../../attributes/factory/errorFactory","../../attributes/view/AttributesViewer","runtime_dependencies/js-sdk/src/common/component/notification/Notification","runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"],function(e,t,i){var n=e("underscore"),s=e("jquery"),o=e("backbone"),r=e("bundle!AttributesBundle"),a=e("../../serverSettingsCommon/enum/confirmDialogTypesEnum"),d=e("../../attributes/enum/attributesTypesEnum"),l=e("../../attributes/factory/confirmationDialogFactory"),h=e("../../attributes/factory/tableTemplatesFactory"),c=e("../../attributes/factory/errorFactory"),u=e("../../attributes/view/AttributesViewer"),f=e("runtime_dependencies/js-sdk/src/common/component/notification/Notification"),m=e("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"),v=u.extend({className:"attributesDesigner",ui:{addNewBtn:".addNewItem"},events:{"click @ui.addNewBtn":"_addNewChildView","mousedown .filterItems, .actions.table-column button, .permission.table-column select, .secure.table-column input":"_checkCurrentAttribute","focus .filterItems, .actions.table-column button, .permission.table-column select, .secure.table-column input":"_checkCurrentAttribute"},childEvents:{active:"_activeChildView",changed:"_saveChildViewToChangedList","open:confirm":"_openConfirm",validate:"_validateChildView"},initialize:function(e){e=e||{};var t={type:e.type};this.notification=new f,this.alertDialog=new m,this.model=new o.Model,this.changedModels=[],this.overriddenInheritedModels=[],u.prototype.initialize.apply(this,arguments),this.childViewOptions=n.extend({},e.childViewOptions,t),this.emptyViewOptions=n.extend({},e.emptyViewOptions,t),this._initConfirmationDialogs(),this._initFilters&&this._initFilters(e),!n.isEmpty(e.buttons)&&e.buttonsContainer&&this._initButtons&&this._initButtons(e),this._initEvents()},render:function(e){return u.prototype.render.apply(this,arguments),this._renderFilters&&this._renderFilters(e),this},hide:function(){this._resetFilters&&this._resetFilters(),u.prototype.hide.apply(this,arguments)},saveChildren:function(){var e=this,t=this._filterChangeList("isDeleted"),i=n.difference(this.changedModels,t);return this.saveDfD=new s.Deferred,this._validateNotAcceptedChildView().done(function(){e.containsUnsavedItems()?e.collection.save(e.changedModels,i).done(n.bind(e._successAjaxCallback,e)).fail(n.bind(e._errorAjaxCallback,e)):e.saveDfD.resolve()}).fail(function(){e.saveDfD.reject()}),this.saveDfD},_validateNotAcceptedChildView:function(){var e=new s.Deferred;return this.currentChildView?this.currentChildView.runValidation(null,{dfd:e}):e.resolve(),e},revertChanges:function(){this.revertDfd=new s.Deferred;var e,t=this,i=new s.Deferred;return this.currentChildView?this.currentChildView.toggleActive().done(i.resolve):i.resolve(),i.done(function(){for(var i=t.changedModels.length,n=i-1;n>=0;n--)e=t.changedModels[n],e.isDeleted?t.revertViewRemoval(e):e.isNew()?t._removeModel(e):e.reset().setState("confirmedState",e.getState());t._resetChangedList(),t.revertDfd.resolve()}),this.revertDfd},getTemplate:function(){return n.template(h())},containsUnsavedItems:function(){return!!this.changedModels.length},removeView:function(e){var t=this._findChildrenByModel(e);e.isDeleted={index:this.collection.indexOf(e)},e.get("inherited")?this._saveRemovedOverriddenInheritedModelToList(e):this._saveChildViewToChangedList(t,!e.isNew()),this._removeModel(e)},revertViewRemoval:function(e){var t=e.isDeleted&&e.isDeleted.index,i=n.isNumber(t)?t:this.collection.models.length;this._deleteViewFromChangedList(e),e.reset(),this.collection.add(e,{at:i}),delete e.isDeleted},remove:function(){s(window).off("beforeunload",this._onPageLeave),this._removeConfirmationDialogs(),this.notification&&this.notification.remove(),this.alertDialog&&this.alertDialog.remove(),u.prototype.remove.apply(this,arguments)},_initEvents:function(){s(window).on("beforeunload",n.bind(this._onPageLeave,this))},_initConfirmationDialogs:function(){this.confirmationDialogs={},n.each(a,function(e){this.confirmationDialogs[e]=l(e)},this),this.listenTo(this.confirmationDialogs[a.DELETE_CONFIRM],"button:yes",this._onDeleteConfirm),this.listenTo(this.confirmationDialogs[a.NAME_CONFIRM],"button:yes",this._onNameConfirm),this.listenTo(this.confirmationDialogs[a.NAME_CONFIRM],"button:no",n.bind(this._revertChangedModelProperty,this,"name")),this.listenTo(this.confirmationDialogs[a.CANCEL_CONFIRM],"button:yes",this.revertChanges),this.listenTo(this.confirmationDialogs[a.EDIT_CONFIRM],"button:yes",this._onEditConfirm),this._initPermissionConfirmEvents&&this._initPermissionConfirmEvents()},_removeConfirmationDialogs:function(){n.each(this.confirmationDialogs,function(e){e.remove()},this)},_successAjaxCallback:function(e){this.notification.show({message:r["attributes.notification.message.saved"],type:"success"}),this._sendSearchRequest()?this._searchForInherited(n.union(this.deletedModels,this.renamedModels)).then(this.saveDfD.resolve,this.saveDfD.reject):this.saveDfD.resolve(),e&&this._postProcessItems(e),this._resetChangedList()},_sendSearchRequest:function(){return!this._isServerLevel()&&this._searchForInherited&&this._deletedRenamedModels()},_deletedRenamedModels:function(){return this.deletedModels=this._filterChangeList("isDeleted"),this.renamedModels=this._filterChangeList("isRenamed"),this.deletedModels.length||this.renamedModels.length},_filterChangeList:function(e){var t;return n.compact(n.filter(this.changedModels,function(i){if(t=i[e],!i.get("inherited"))return n.isFunction(t)?i[e]():t}))},_postProcessItems:function(e){var t,i=e.attribute;n.each(i,function(e){(t=this._findChildrenByModel(e.name))&&t._onSaveSuccess()},this)},_errorAjaxCallback:function(e){this.alertDialog.setMessage(c(e)),this.alertDialog.open(),this.saveDfD.reject()},_toggleAddNewItemButton:function(e){var t=s(this.ui.addNewBtn);e?t.show():t.hide()},_checkCurrentAttribute:function(e){this.currentChildView&&(e.preventDefault(),this.confirmationDialogs[a.EDIT_CONFIRM].open())},_onPageLeave:function(e){if(this.containsUnsavedItems())return(e||window.event).returnValue=r["attributes.dialog.unsaved.changes"],r["attributes.dialog.unsaved.changes"]},_onEditConfirm:function(){this.currentChildView.cancel()},_onNameConfirm:function(){this.validateDfD&&this.validateDfD.resolve()},_onDeleteConfirm:function(){var e=this.model.get("changedChildView"),t=e.model,i=t.get("name");e.isInherited()&&!t.isRenamed()?t.reset():(this.removeView(t),this._revertInheritedRemoval&&this._revertInheritedRemoval(i))},_isServerLevel:function(){return this.type===d.SERVER||null===this.collection.getContext().id},_revertChangedModelProperty:function(e){(this.model.get("changedChildView")||this.currentChildView).model.reset(e,"confirmedState")},_addNewChildView:function(){var e=this.collection.addNew(),t=this._findChildrenByModel(e);this._saveChildViewToChangedList(t,!0),t.toggleActive()},_scrollToChildView:function(e){var t=this.$el.closest(".body"),i=t.height(),n=e.$el,s=n.height(),o=n.position(),r=i<o.top+s&&{scrollTop:t.scrollTop()+(o.top+s-i)};r&&t.animate(r,900)},_successValidationCallback:function(e,t,i){var n=this,s=e.model;this._filterInheritedViews&&this._filterInheritedViews(i),e.validateIfSecure(),e.toggleIfModelIsValid().done(function(){n._removeInheritedView&&n._removeInheritedView(s),n._addInheritedView&&n._addInheritedView(s),n._showPermissionConfirm&&n._showPermissionConfirm(e),n._resetFilters&&n._resetFilters(),t.resolve()})},_deleteViewFromChangedList:function(e){var t=n.indexOf(this.changedModels,e);-1!==t&&this.changedModels.splice(t,1)},_removeModel:function(e){this.collection.remove(e)},_findModelsWhere:function(e){return this.collection.findWhere(e)},_findChildrenByModel:function(e){return(e=n.isString(e)?this._findModelsWhere({name:e}):e)&&this.children.findByModel(e)},_resetChangedList:function(){this.changedModels.length=0,this.overriddenInheritedModels.length=0,this._triggerChangeEvent()},_triggerChangeEvent:function(){this.toggleButtons&&this.toggleButtons(),this.trigger("change")},_activeChildView:function(e,t,i){this._setCurrentChildView(t?e:null),this._scrollToChildView(e),i&&i.resolve()},_saveChildViewToChangedList:function(e,t){var i=e.model;n.contains(this.changedModels,i)?!t&&this._deleteViewFromChangedList(i):t&&this.changedModels.push(i),e.invokeFiltration()&&this._resetFilters&&this._resetFilters(),this._triggerChangeEvent()},_saveRemovedOverriddenInheritedModelToList:function(e){!n.contains(this.overriddenInheritedModels,e)&&this.overriddenInheritedModels.push(e)},_openConfirm:function(e,t,i){this.validateDfD=i.dfd,this.model.set("changedChildView",e);var s=this.confirmationDialogs[t],o=t!==a.CANCEL_CONFIRM||this.containsUnsavedItems();switch(t){case a.DELETE_CONFIRM:s.setContent(n.template(r["attributes.confirm.delete.dialog.text"],{name:e.model.get("name")}));break;case a.PERMISSION_CONFIRM:s.setContent(r["attributes.confirm.permission.dialog.text"])}o&&s.open()},_validateChildView:function(e,t){t=t||{};var i=e.model,o=t.dfd?t.dfd:new s.Deferred,r=!i.isOriginallyInherited(),a=n.bind(this._successValidationCallback,this,e,o),d=this._isServerLevel();return e.getChangedProperties("name")&&!this._sendValidateSearchRequest(i)?this.collection.validateSearch(i,this.changedModels,r,d).then(a):a(),o},_sendValidateSearchRequest:function(e){var t=this._filterChangeList("isDeleted"),i=n.filter(t,function(t){return e.get("name")===t.get("name")}).length,s=n.filter(this.changedModels,function(t){return e.get("name")===t.get("name")}).length;return i&&!e.isDeleted&&s<=2},_setCurrentChildView:function(e){this._toggleAddNewItemButton(!e);var t=this.currentChildView;if(t){var i=t.model;i.isNew()&&!t.isStateConfirmed()&&this.removeView(i)}this.currentChildView=e}});i.exports=v});