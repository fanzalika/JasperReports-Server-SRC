define(["require","exports","module","underscore","../dataprovider/DelegatingDataProvider","../dataprovider/SelectedItemsDataProvider","../view/AvailableItemsListWithTrueAll","../view/MultiSelect"],function(e,t,a){var i=e("underscore"),s=e("../dataprovider/DelegatingDataProvider"),l=e("../dataprovider/SelectedItemsDataProvider"),r=e("../view/AvailableItemsListWithTrueAll"),n=e("../view/MultiSelect");a.exports=n.extend({_createAvailableItemsList:function(e){return this.availableItemsListDataProvider=e.getData,e.availableItemsList||new r({model:this.availableItemsListModel,getData:e.getData,bufferSize:e.bufferSize,loadFactor:e.loadFactor,chunksTemplate:e.chunksTemplate,scrollTimeout:e.scrollTimeout,trueAll:e.trueAll})},_createSelectedItemsListDataProvider:function(e){return this.selectedListOptions=e?e.selectedListOptions:{},this.selectedItemsDataProviderInstance=e?e.selectedItemsDataProvider:null,new s},selectionRemoved:function(e){if(this.getTrueAll()){var t;for(var a in e)if(e.hasOwnProperty(a)){t={value:e[a],index:a};break}this.availableItemsList.selectionAdd(t)}else n.prototype.selectionRemoved.call(this,e)},selectionChangeInternal:function(e){if(this.getTrueAll()){this.selectedItemsDataProvider.setGetData(this.availableItemsListDataProvider),this.selectedItemsDataProvider.setData=null;var t=this;this.selectedItemsList.fetch(function(){t._updateSelectedItemsCountLabel(),t.selectedItemsList.resize()}),this.silent?delete this.silent:this.triggerSelectionChange()}else{var a=this._getSelectedItemsDataProviderInstance();this.selectedItemsDataProvider.setGetData(a.getData),this.selectedItemsDataProvider.setData=i.bind(a.setData,a),this.selectedItemsDataProvider.getAllCachedData=i.bind(a.getAllCachedData,a),n.prototype.selectionChangeInternal.call(this,e)}},triggerSelectionChange:function(){this.trigger("selection:change",this.getValue(),{isTrueAll:this.getTrueAll()})},setTrueAll:function(e,t){t=t||{},t.silent&&(this.silent=!0),delete t.silent,this.availableItemsList.setTrueAll(e,t)},getTrueAll:function(){return this.availableItemsList.getTrueAll()},_getSelectedItemsDataProviderInstance:function(){var e=this.selectedItemsDataProviderInstance||new l(this.selectedListOptions);return e.setData([]),e}})});