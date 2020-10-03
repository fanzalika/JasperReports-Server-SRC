define("resource/resource.base",["require","exports","module","prototype","../util/touch.controller","../util/utils.common","../core/core.events.bis","../dynamicTree/dynamicTree.utils"],function(e,t,i){var r=e("prototype"),o=r.$,s=r.$$,n=r.$break,l=e("../util/touch.controller"),c=e("../util/utils.common"),a=c.buildActionUrl,d=c.isIPad,u=e("../core/core.events.bis"),h=e("../dynamicTree/dynamicTree.utils"),_={messages:{},resourceLabelMaxLength:100,resourceIdMaxLength:100,resourceDescriptionMaxLength:250,PROPAGATE_EVENT:"propagateEvent",STEP_DISPLAY_ID:"stepDisplay",FLOW_CONTROLS_ID:"flowControls",initSwipeScroll:function(){var e=o(_.STEP_DISPLAY_ID);e&&new l(e.up(),e.up(1),{})},submitForm:function(e,t,i){if(t){var r=a(t);i&&i(),o(e).writeAttribute("method","post").writeAttribute("action",r),o(e).submit()}},registerClickHandlers:function(e,t,i){if(_._bodyClickEventHandlers)return void(i?Array.prototype.unshift:Array.prototype.push).apply(_._bodyClickEventHandlers,e);_._bodyClickEventHandlers=e,s(t||"body")[0].observe("click",function(e){_._bodyClickEventHandlers&&_._bodyClickEventHandlers.each(function(t){var i=t(e);if(i)throw i!==_.PROPAGATE_EVENT&&Event.stop(e),n})})},TreeWrapper:function(e){var t=this;if(this._treeId=e.treeId,this._resourceUriInput=o(e.resourceUriInput||"resourceUri"),this._uri=this._resourceUriInput&&this._resourceUriInput.getValue()||e.uri||"/",!e.providerId)throw"There is no tree provider set for tree #{id}".interpolate({id:this._treeId});var i=["providerId","rootUri","organizationId","publicFolderUri","urlGetNode","urlGetChildren"].inject({},function(t,i){return null!==e[i]&&(t[i]=e[i]),t});return this._tree=new h.createRepositoryTree(this._treeId,i),this._tree.observe("tree:loaded",function(){t._tree.openAndSelectNode(o(t._resourceUriInput).getValue())}),this._tree.observe("leaf:selected",function(e){t._uri=e.memo.node.param.uri,t._resourceUriInput.setValue(t._uri)}),this._tree.observe("node:selected",function(){t._resourceUriInput.setValue(t._uri="")}),{getTreeId:function(){return t._treeId},getTree:function(){return t._tree},selectFolder:function(e){t._tree.openAndSelectNode(e)},getSelectedFolderUri:function(){return t._uri}}},switchButtonState:function(e,t){u[t?"enable":"disable"].call(u,e)},switchDisableState:function(e,t){(e=o(e))&&e[t?"disable":"enable"].call(e)},generateResourceId:function(e){if(window.localContext&&window.localContext.initOptions&&window.localContext.initOptions.resourceIdNotSupportedSymbols)return e.replace(new RegExp(window.localContext.initOptions.resourceIdNotSupportedSymbols,"g"),"_");throw"There is no resourceIdNotSupportedSymbols property in init options."},testResourceId:function(e){if(window.localContext&&window.localContext.initOptions&&window.localContext.initOptions.resourceIdNotSupportedSymbols)return new RegExp(window.localContext.initOptions.resourceIdNotSupportedSymbols,"g").test(e);throw"There is no resourceIdNotSupportedSymbols property in init options."},labelValidator:function(e){var t=!0,i="";return e.blank()?(i=_.messages.labelIsEmpty,t=!1):e.length>_.resourceLabelMaxLength&&(i=_.messages.labelToLong,t=!1),{isValid:t,errorMessage:i}},getLabelValidationEntry:function(e){return{element:e,validators:[{method:"mandatory",messages:{mandatory:_.messages.labelIsEmpty}},{method:"minMaxLength",messages:{tooLong:_.messages.labelToLong},options:{maxLength:_.resourceLabelMaxLength}}]}},getIdValidationEntry:function(e){return{element:e,validators:[{method:"resourceIdChars",messages:_.messages},{method:"mandatory",messages:{mandatory:_.messages.resourceIdIsEmpty}},{method:"minMaxLength",messages:{tooLong:_.messages.resourceIdToLong},options:{maxLength:_.resourceIdMaxLength}}]}},resourceIdValidator:function(e){var t=!0,i="";return this._isEditMode||(e.blank()?(i=_.messages.resourceIdIsEmpty,t=!1):e.length>_.resourceIdMaxLength?(i=_.messages.resourceIdToLong,t=!1):_.testResourceId(e)&&(i=_.messages.resourceIdInvalidChars,t=!1)),{isValid:t,errorMessage:i}},getDescriptionValidationEntry:function(e){return{element:e,validators:[{method:"minMaxLength",messages:{tooLong:_.messages.descriptionToLong},options:{maxLength:_.resourceDescriptionMaxLength}}]}},descriptionValidator:function(e){var t=!0,i="";return e.length>_.resourceDescriptionMaxLength&&(i=_.messages.descriptionToLong,t=!1),{isValid:t,errorMessage:i}},dataSourceValidator:function(e){var t=!0,i="";return""===e.trim()&&(i=_.messages.dataSourceInvalid,t=!1),{isValid:t,errorMessage:i}},queryValidator:function(e){var t=!0,i="";return""===e.trim()&&(i=_.messages.queryInvalid,t=!1),{isValid:t,errorMessage:i}},getValidationEntries:function(e){return e.collect(function(e){return e.validationEntry?e.validationEntry:{validator:e.validator,element:e}})}};void 0===e&&d()&&document.observe("dom:loaded",_.initSwipeScroll.bind(_)),i.exports=_}),define("components/components.pickers",["require","exports","module","prototype","../core/core.events.bis","underscore","../core/core.layout","../dynamicTree/dynamicTree.utils","./components.dialogs","../util/utils.common","jquery"],function(e,t,i){var r=e("prototype"),o=r.$,s=r.$F,n=e("../core/core.events.bis"),l=e("underscore"),c=e("../core/core.layout"),a=e("../dynamicTree/dynamicTree.utils"),d=e("./components.dialogs"),u=e("../util/utils.common"),h=u.matchAny,_=e("jquery"),p={};p.FileSelector=function(e){this._disabled=void 0!==e.disabled&&e.disabled,this._uriTextbox=o(e.uriTextboxId),this._browseButtonId=o(e.browseButtonId),this._onChange=e.onChange||!1,this._options=e,this._disabled?(n.disable(this._uriTextbox),n.disable(this._browseButtonId)):(this._id=e.id,this._suffix=e.suffix?e.suffix:(new Date).getTime(),this._treeDomId=e.treeId,this._selectLeavesOnly=void 0!==e.selectLeavesOnly&&e.selectLeavesOnly,this._selectedUri=s(this._uriTextbox),this._process(e),this._assignHandlers(),this._refreshButtonsState())},p.FileSelector.addVar("DEFAULT_TEMPLATE_DOM_ID","selectFromRepository"),p.FileSelector.addVar("DEFAULT_TREE_ID","selectFromRepoTree"),p.FileSelector.addVar("OK_BUTTON_ID","selectFromRepoBtnSelect"),p.FileSelector.addVar("CANCEL_BUTTON_ID","selectFromRepoBtnCancel"),p.FileSelector.addVar("TITLE_PATTERN","div.title"),p.FileSelector.addMethod("_process",function(e){!this._id&&(this._id=this.DEFAULT_TEMPLATE_DOM_ID),!o(this._id)&&this._options.template&&this._options.i18n?(this._dom=_(l.template(this._options.template,{i18n:this._options.i18n})),this._dom=this._dom[0]):this._dom=o(this._id).cloneNode(!0),this._dom.writeAttribute("id",this._id+this._suffix),this._okButton=this._dom.select("#"+this.OK_BUTTON_ID)[0],this._okButton.writeAttribute("id",this.OK_BUTTON_ID+this._suffix),this._cancelButton=this._dom.select("#"+this.CANCEL_BUTTON_ID)[0],this._cancelButton.writeAttribute("id",this.CANCEL_BUTTON_ID+this._suffix),!this._treeDomId&&(this._treeDomId=this.DEFAULT_TREE_ID),this._treeDom=this._dom.select("#"+this._treeDomId)[0],this._treeDom.writeAttribute("id",this._treeDomId+this._suffix),this._visible=!1,e.title&&this._dom.select(this.TITLE_PATTERN)[0].update(e.title),this._onOk=e.onOk,this._onCancel=e.onCancel,_(document.body).append(this._dom);var t,i=this._dom.down(c.SWIPE_SCROLL_PATTERN);i&&(t=c.createScroller(i));var r=Object.extend({providerId:e.providerId,scroll:t},e.treeOptions);this._tree=a.createRepositoryTree(this._treeDomId+this._suffix,r),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1)}),p.FileSelector.addMethod("_assignHandlers",function(){this._dom.observe("click",this._dialogClickHandler.bindAsEventListener(this)),["node:dblclick","leaf:dblclick"].each(function(e){this._tree.observe(e,this._treeClickHandler.bindAsEventListener(this))},this),["node:click","leaf:click","node:selected","leaf:selected"].each(function(e){this._tree.observe(e,this._refreshButtonsState.bindAsEventListener(this))},this),["childredPrefetched:loaded","tree:loaded"].each(function(e){this._tree.observe(e,this._treeLoadHandler.bindAsEventListener(this))},this),this._browseButtonId.observe("click",this._browseClickHandler.bindAsEventListener(this))}),p.FileSelector.addMethod("_canClickOk",function(e){return this._tree.getSelectedNode()&&(!this._selectLeavesOnly||this._tree.getSelectedNode().param.type!==this._tree.getSelectedNode().FOLDER_TYPE_NAME)}),p.FileSelector.addMethod("_dialogClickHandler",function(e){var t=e.element();if(h(t,["#"+this.OK_BUTTON_ID+this._suffix],!0)){e.stop();var i=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(i),this._onChange&&this._onChange(i),this._hide(),this._onOk&&this._onOk()}else h(t,["#"+this.CANCEL_BUTTON_ID+this._suffix],!0)&&(e.stop(),this._hide(),this._onCancel&&this._onCancel())}),p.FileSelector.addMethod("_treeClickHandler",function(e){if(this._canClickOk()){var t=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(t),this._onChange&&this._onChange(t),this._hide(),this._onOk&&this._onOk()}}),p.FileSelector.addMethod("_treeLoadHandler",function(e){this._visible&&this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri)}),p.FileSelector.addMethod("_browseClickHandler",function(e){e.stop(),this._show()}),p.FileSelector.addMethod("_refreshButtonsState",function(){this._canClickOk()?n.enable(this._okButton):n.disable(this._okButton)}),p.FileSelector.addMethod("_hide",function(){d.popup.hide(this._dom),this._visible=!1}),p.FileSelector.addMethod("_show",function(){this._selectedUri=s(this._uriTextbox),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1),d.popup.show(this._dom,!0),this._visible=!0,this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri),this._refreshButtonsState()}),p.FileSelector.addMethod("remove",function(){_(this._dom).remove()}),i.exports=p}),define("resource/resource.locate",["require","exports","module","prototype","underscore","./resource.base","../components/components.pickers","jquery"],function(e,t,i){var r=e("prototype"),o=r.$,s=e("underscore"),n=e("./resource.base"),l=e("../components/components.pickers"),c=e("jquery"),a={CONTENT_REPOSITORY:"CONTENT_REPOSITORY",LOCAL:"LOCAL",NONE:"NONE",FILE_SYSTEM:"FILE_SYSTEM",LOCATE_EVENT:"resource:locate",ALLOWED_FILE_RESOURCE_EXTENSIONS:["css","ttf","jpg","jpeg","gif","bmp","png","jar","jrxml","properties","jrtx","xml","agxml","docx","doc","ppt","pptx","xls","xlsx","ods","odt","odp","pdf","rtf","html"],initialize:function(e){var t=function(e){return s.isObject(e)?e:o(e)};this.resourceUri=t(e.resourceInput),this.browseButton=t(e.browseButton),this.filePath=t(e.fileUploadInput),this.fakeFilePath=t(e.fakeFileUploadInput),this.fakeFileInput=t(e.fakeFileUploadInputText),this.newResourceLink=t(e.newResourceLink);try{this._initFileSelector(e)}catch(e){}finally{this._initEvents(e)}return this},_initEvents:function(e){c(document).on("click","#CONTENT_REPOSITORY, #FILE_SYSTEM, #NONE, #LOCAL",this._clickHandler),"fileResourceTreeDataProvider"===e.providerId&&(c("#next").on("click",a._nextClickHandler),c("#filePath").on("change",a._uploadChangeHandler))},_nextClickHandler:function(e){c("#fileUpload").hasClass("error")&&e.preventDefault()},_uploadChangeHandler:function(e){c("#fileUpload").removeClass("error");var t=!0;if(c("#filePath")[0].value){var i=c("#filePath")[0].value.match(/.*\.([^\.]+)$/);if(i){var r=i[1];s.indexOf(a.ALLOWED_FILE_RESOURCE_EXTENSIONS,r)<0&&(t=!1)}else t=!1}else t=!1;if(!t){var o=n.messages["resource.report.unsupportedFileType.error"]+" "+a.ALLOWED_FILE_RESOURCE_EXTENSIONS.join(", ");c("#fileUpload").addClass("error").find("span.warning").html(o)}},_clickHandler:function(e){a._updateResourceSelectorState(e.target.id)},_updateResourceSelectorState:function(e){n.switchButtonState(this.filePath,e===this.FILE_SYSTEM),n.switchButtonState(this.fakeFilePath,e===this.FILE_SYSTEM),n.switchButtonState(this.fakeFileInput,e===this.FILE_SYSTEM),n.switchButtonState(this.browseButton,e===this.CONTENT_REPOSITORY),n.switchDisableState(this.resourceUri,e!==this.CONTENT_REPOSITORY);var t=e===this.LOCAL?["disabled","launcher"]:[];this._switchElementClasses(this.newResourceLink,t)},_initFileSelector:function(e){this.fileSelector=new l.FileSelector(s.extend({},e,{uriTextboxId:this.resourceUri,browseButtonId:this.browseButton,title:e.dialogTitle}))},remove:function(e){this.fileSelector.remove()},_switchElementClasses:function(e,t){e&&t&&e.removeClassName(t[0]).addClassName(t[1])}};i.exports=a}),define("resource/resource.query.locate",["require","exports","module","prototype","./resource.locate"],function(e,t,i){var r=e("prototype"),o=r.$,s=e("./resource.locate"),n={messages:[],initialize:function(){s.initialize({resourceInput:"resourceUri",browseButton:"browser_button",newResourceLink:"newQueryLink",treeId:"queryTreeRepoLocation",providerId:"queryTreeDataProvider",dialogTitle:n.messages["resource.QueryLocate.Title"],selectLeavesOnly:!0});var e=o("newQueryLink");e&&e.observe("click",function(){o("LOCAL").checked&&o("next").click()})},jumpTo:function(e){return o("jumpToPage").setValue(e),o("jumpButton").click(),!1}};void 0===e&&document.observe("dom:loaded",function(){n.initialize()}),i.exports=n}),define("addResource/query/locateQueryMain",["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.query.locate","jquery","../../util/utils.common"],function(e,t,i){var r=e("requirejs-domready"),o=e("underscore"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),n=e("../../resource/resource.base"),l=e("../../resource/resource.query.locate"),c=e("jquery"),a=e("../../util/utils.common"),d=a.isIPad;r(function(){o.extend(l.messages,s.addJasperReport.resourceQueryLocate.messages),l.initialize(),d()&&n.initSwipeScroll(),c("#steps1_2").on("click",function(){return l.jumpTo("reportNaming")}),c("#step3").on("click",function(){return l.jumpTo("resources")}),c("#step4").on("click",function(){return l.jumpTo("dataSource")}),c("#step5").on("click",function(){return l.jumpTo("query")}),c("#step6").on("click",function(){return l.jumpTo("customization")})})});