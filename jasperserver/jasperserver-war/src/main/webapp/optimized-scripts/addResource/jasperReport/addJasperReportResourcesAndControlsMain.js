define("resource/resource.base",["require","exports","module","prototype","../util/touch.controller","../util/utils.common","../core/core.events.bis","../dynamicTree/dynamicTree.utils"],function(e,t,i){var r=e("prototype"),o=r.$,s=r.$$,n=r.$break,a=e("../util/touch.controller"),l=e("../util/utils.common"),c=l.buildActionUrl,d=l.isIPad,u=e("../core/core.events.bis"),h=e("../dynamicTree/dynamicTree.utils"),_={messages:{},resourceLabelMaxLength:100,resourceIdMaxLength:100,resourceDescriptionMaxLength:250,PROPAGATE_EVENT:"propagateEvent",STEP_DISPLAY_ID:"stepDisplay",FLOW_CONTROLS_ID:"flowControls",initSwipeScroll:function(){var e=o(_.STEP_DISPLAY_ID);e&&new a(e.up(),e.up(1),{})},submitForm:function(e,t,i){if(t){var r=c(t);i&&i(),o(e).writeAttribute("method","post").writeAttribute("action",r),o(e).submit()}},registerClickHandlers:function(e,t,i){if(_._bodyClickEventHandlers)return void(i?Array.prototype.unshift:Array.prototype.push).apply(_._bodyClickEventHandlers,e);_._bodyClickEventHandlers=e,s(t||"body")[0].observe("click",function(e){_._bodyClickEventHandlers&&_._bodyClickEventHandlers.each(function(t){var i=t(e);if(i)throw i!==_.PROPAGATE_EVENT&&Event.stop(e),n})})},TreeWrapper:function(e){var t=this;if(this._treeId=e.treeId,this._resourceUriInput=o(e.resourceUriInput||"resourceUri"),this._uri=this._resourceUriInput&&this._resourceUriInput.getValue()||e.uri||"/",!e.providerId)throw"There is no tree provider set for tree #{id}".interpolate({id:this._treeId});var i=["providerId","rootUri","organizationId","publicFolderUri","urlGetNode","urlGetChildren"].inject({},function(t,i){return null!==e[i]&&(t[i]=e[i]),t});return this._tree=new h.createRepositoryTree(this._treeId,i),this._tree.observe("tree:loaded",function(){t._tree.openAndSelectNode(o(t._resourceUriInput).getValue())}),this._tree.observe("leaf:selected",function(e){t._uri=e.memo.node.param.uri,t._resourceUriInput.setValue(t._uri)}),this._tree.observe("node:selected",function(){t._resourceUriInput.setValue(t._uri="")}),{getTreeId:function(){return t._treeId},getTree:function(){return t._tree},selectFolder:function(e){t._tree.openAndSelectNode(e)},getSelectedFolderUri:function(){return t._uri}}},switchButtonState:function(e,t){u[t?"enable":"disable"].call(u,e)},switchDisableState:function(e,t){(e=o(e))&&e[t?"disable":"enable"].call(e)},generateResourceId:function(e){if(window.localContext&&window.localContext.initOptions&&window.localContext.initOptions.resourceIdNotSupportedSymbols)return e.replace(new RegExp(window.localContext.initOptions.resourceIdNotSupportedSymbols,"g"),"_");throw"There is no resourceIdNotSupportedSymbols property in init options."},testResourceId:function(e){if(window.localContext&&window.localContext.initOptions&&window.localContext.initOptions.resourceIdNotSupportedSymbols)return new RegExp(window.localContext.initOptions.resourceIdNotSupportedSymbols,"g").test(e);throw"There is no resourceIdNotSupportedSymbols property in init options."},labelValidator:function(e){var t=!0,i="";return e.blank()?(i=_.messages.labelIsEmpty,t=!1):e.length>_.resourceLabelMaxLength&&(i=_.messages.labelToLong,t=!1),{isValid:t,errorMessage:i}},getLabelValidationEntry:function(e){return{element:e,validators:[{method:"mandatory",messages:{mandatory:_.messages.labelIsEmpty}},{method:"minMaxLength",messages:{tooLong:_.messages.labelToLong},options:{maxLength:_.resourceLabelMaxLength}}]}},getIdValidationEntry:function(e){return{element:e,validators:[{method:"resourceIdChars",messages:_.messages},{method:"mandatory",messages:{mandatory:_.messages.resourceIdIsEmpty}},{method:"minMaxLength",messages:{tooLong:_.messages.resourceIdToLong},options:{maxLength:_.resourceIdMaxLength}}]}},resourceIdValidator:function(e){var t=!0,i="";return this._isEditMode||(e.blank()?(i=_.messages.resourceIdIsEmpty,t=!1):e.length>_.resourceIdMaxLength?(i=_.messages.resourceIdToLong,t=!1):_.testResourceId(e)&&(i=_.messages.resourceIdInvalidChars,t=!1)),{isValid:t,errorMessage:i}},getDescriptionValidationEntry:function(e){return{element:e,validators:[{method:"minMaxLength",messages:{tooLong:_.messages.descriptionToLong},options:{maxLength:_.resourceDescriptionMaxLength}}]}},descriptionValidator:function(e){var t=!0,i="";return e.length>_.resourceDescriptionMaxLength&&(i=_.messages.descriptionToLong,t=!1),{isValid:t,errorMessage:i}},dataSourceValidator:function(e){var t=!0,i="";return""===e.trim()&&(i=_.messages.dataSourceInvalid,t=!1),{isValid:t,errorMessage:i}},queryValidator:function(e){var t=!0,i="";return""===e.trim()&&(i=_.messages.queryInvalid,t=!1),{isValid:t,errorMessage:i}},getValidationEntries:function(e){return e.collect(function(e){return e.validationEntry?e.validationEntry:{validator:e.validator,element:e}})}};void 0===e&&d()&&document.observe("dom:loaded",_.initSwipeScroll.bind(_)),i.exports=_}),define("components/components.pickers",["require","exports","module","prototype","../core/core.events.bis","underscore","../core/core.layout","../dynamicTree/dynamicTree.utils","./components.dialogs","../util/utils.common","jquery"],function(e,t,i){var r=e("prototype"),o=r.$,s=r.$F,n=e("../core/core.events.bis"),a=e("underscore"),l=e("../core/core.layout"),c=e("../dynamicTree/dynamicTree.utils"),d=e("./components.dialogs"),u=e("../util/utils.common"),h=u.matchAny,_=e("jquery"),p={};p.FileSelector=function(e){this._disabled=void 0!==e.disabled&&e.disabled,this._uriTextbox=o(e.uriTextboxId),this._browseButtonId=o(e.browseButtonId),this._onChange=e.onChange||!1,this._options=e,this._disabled?(n.disable(this._uriTextbox),n.disable(this._browseButtonId)):(this._id=e.id,this._suffix=e.suffix?e.suffix:(new Date).getTime(),this._treeDomId=e.treeId,this._selectLeavesOnly=void 0!==e.selectLeavesOnly&&e.selectLeavesOnly,this._selectedUri=s(this._uriTextbox),this._process(e),this._assignHandlers(),this._refreshButtonsState())},p.FileSelector.addVar("DEFAULT_TEMPLATE_DOM_ID","selectFromRepository"),p.FileSelector.addVar("DEFAULT_TREE_ID","selectFromRepoTree"),p.FileSelector.addVar("OK_BUTTON_ID","selectFromRepoBtnSelect"),p.FileSelector.addVar("CANCEL_BUTTON_ID","selectFromRepoBtnCancel"),p.FileSelector.addVar("TITLE_PATTERN","div.title"),p.FileSelector.addMethod("_process",function(e){!this._id&&(this._id=this.DEFAULT_TEMPLATE_DOM_ID),!o(this._id)&&this._options.template&&this._options.i18n?(this._dom=_(a.template(this._options.template,{i18n:this._options.i18n})),this._dom=this._dom[0]):this._dom=o(this._id).cloneNode(!0),this._dom.writeAttribute("id",this._id+this._suffix),this._okButton=this._dom.select("#"+this.OK_BUTTON_ID)[0],this._okButton.writeAttribute("id",this.OK_BUTTON_ID+this._suffix),this._cancelButton=this._dom.select("#"+this.CANCEL_BUTTON_ID)[0],this._cancelButton.writeAttribute("id",this.CANCEL_BUTTON_ID+this._suffix),!this._treeDomId&&(this._treeDomId=this.DEFAULT_TREE_ID),this._treeDom=this._dom.select("#"+this._treeDomId)[0],this._treeDom.writeAttribute("id",this._treeDomId+this._suffix),this._visible=!1,e.title&&this._dom.select(this.TITLE_PATTERN)[0].update(e.title),this._onOk=e.onOk,this._onCancel=e.onCancel,_(document.body).append(this._dom);var t,i=this._dom.down(l.SWIPE_SCROLL_PATTERN);i&&(t=l.createScroller(i));var r=Object.extend({providerId:e.providerId,scroll:t},e.treeOptions);this._tree=c.createRepositoryTree(this._treeDomId+this._suffix,r),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1)}),p.FileSelector.addMethod("_assignHandlers",function(){this._dom.observe("click",this._dialogClickHandler.bindAsEventListener(this)),["node:dblclick","leaf:dblclick"].each(function(e){this._tree.observe(e,this._treeClickHandler.bindAsEventListener(this))},this),["node:click","leaf:click","node:selected","leaf:selected"].each(function(e){this._tree.observe(e,this._refreshButtonsState.bindAsEventListener(this))},this),["childredPrefetched:loaded","tree:loaded"].each(function(e){this._tree.observe(e,this._treeLoadHandler.bindAsEventListener(this))},this),this._browseButtonId.observe("click",this._browseClickHandler.bindAsEventListener(this))}),p.FileSelector.addMethod("_canClickOk",function(e){return this._tree.getSelectedNode()&&(!this._selectLeavesOnly||this._tree.getSelectedNode().param.type!==this._tree.getSelectedNode().FOLDER_TYPE_NAME)}),p.FileSelector.addMethod("_dialogClickHandler",function(e){var t=e.element();if(h(t,["#"+this.OK_BUTTON_ID+this._suffix],!0)){e.stop();var i=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(i),this._onChange&&this._onChange(i),this._hide(),this._onOk&&this._onOk()}else h(t,["#"+this.CANCEL_BUTTON_ID+this._suffix],!0)&&(e.stop(),this._hide(),this._onCancel&&this._onCancel())}),p.FileSelector.addMethod("_treeClickHandler",function(e){if(this._canClickOk()){var t=this._tree.getSelectedNode().param.uri;this._uriTextbox.setValue(t),this._onChange&&this._onChange(t),this._hide(),this._onOk&&this._onOk()}}),p.FileSelector.addMethod("_treeLoadHandler",function(e){this._visible&&this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri)}),p.FileSelector.addMethod("_browseClickHandler",function(e){e.stop(),this._show()}),p.FileSelector.addMethod("_refreshButtonsState",function(){this._canClickOk()?n.enable(this._okButton):n.disable(this._okButton)}),p.FileSelector.addMethod("_hide",function(){d.popup.hide(this._dom),this._visible=!1}),p.FileSelector.addMethod("_show",function(){this._selectedUri=s(this._uriTextbox),this._selectedUri&&this._selectedUri.length>0?this._tree.showTreePrefetchNodes(this._selectedUri):this._tree.showTree(1),d.popup.show(this._dom,!0),this._visible=!0,this._selectedUri&&this._tree.openAndSelectNode(this._selectedUri),this._refreshButtonsState()}),p.FileSelector.addMethod("remove",function(){_(this._dom).remove()}),i.exports=p}),define("resource/resource.locate",["require","exports","module","prototype","underscore","./resource.base","../components/components.pickers","jquery"],function(e,t,i){var r=e("prototype"),o=r.$,s=e("underscore"),n=e("./resource.base"),a=e("../components/components.pickers"),l=e("jquery"),c={CONTENT_REPOSITORY:"CONTENT_REPOSITORY",LOCAL:"LOCAL",NONE:"NONE",FILE_SYSTEM:"FILE_SYSTEM",LOCATE_EVENT:"resource:locate",ALLOWED_FILE_RESOURCE_EXTENSIONS:["css","ttf","jpg","jpeg","gif","bmp","png","jar","jrxml","properties","jrtx","xml","agxml","docx","doc","ppt","pptx","xls","xlsx","ods","odt","odp","pdf","rtf","html"],initialize:function(e){var t=function(e){return s.isObject(e)?e:o(e)};this.resourceUri=t(e.resourceInput),this.browseButton=t(e.browseButton),this.filePath=t(e.fileUploadInput),this.fakeFilePath=t(e.fakeFileUploadInput),this.fakeFileInput=t(e.fakeFileUploadInputText),this.newResourceLink=t(e.newResourceLink);try{this._initFileSelector(e)}catch(e){}finally{this._initEvents(e)}return this},_initEvents:function(e){l(document).on("click","#CONTENT_REPOSITORY, #FILE_SYSTEM, #NONE, #LOCAL",this._clickHandler),"fileResourceTreeDataProvider"===e.providerId&&(l("#next").on("click",c._nextClickHandler),l("#filePath").on("change",c._uploadChangeHandler))},_nextClickHandler:function(e){l("#fileUpload").hasClass("error")&&e.preventDefault()},_uploadChangeHandler:function(e){l("#fileUpload").removeClass("error");var t=!0;if(l("#filePath")[0].value){var i=l("#filePath")[0].value.match(/.*\.([^\.]+)$/);if(i){var r=i[1];s.indexOf(c.ALLOWED_FILE_RESOURCE_EXTENSIONS,r)<0&&(t=!1)}else t=!1}else t=!1;if(!t){var o=n.messages["resource.report.unsupportedFileType.error"]+" "+c.ALLOWED_FILE_RESOURCE_EXTENSIONS.join(", ");l("#fileUpload").addClass("error").find("span.warning").html(o)}},_clickHandler:function(e){c._updateResourceSelectorState(e.target.id)},_updateResourceSelectorState:function(e){n.switchButtonState(this.filePath,e===this.FILE_SYSTEM),n.switchButtonState(this.fakeFilePath,e===this.FILE_SYSTEM),n.switchButtonState(this.fakeFileInput,e===this.FILE_SYSTEM),n.switchButtonState(this.browseButton,e===this.CONTENT_REPOSITORY),n.switchDisableState(this.resourceUri,e!==this.CONTENT_REPOSITORY);var t=e===this.LOCAL?["disabled","launcher"]:[];this._switchElementClasses(this.newResourceLink,t)},_initFileSelector:function(e){this.fileSelector=new a.FileSelector(s.extend({},e,{uriTextboxId:this.resourceUri,browseButtonId:this.browseButton,title:e.dialogTitle}))},remove:function(e){this.fileSelector.remove()},_switchElementClasses:function(e,t){e&&t&&e.removeClassName(t[0]).addClassName(t[1])}};i.exports=c}),define("resource/resource.report",["require","exports","module","prototype","./resource.base","./resource.locate","../util/utils.common","jquery"],function(e,t,i){var r=e("prototype"),o=r.$,s=e("./resource.base"),n=e("./resource.locate"),a=e("../util/utils.common"),l=a.ValidationModule,c=a.isIE,d=a.isIE7,u=a.isIE8,h=a.isIE9,_=a.isIE10,p=e("jquery"),m={SET_UP_PAGE_ID:"addReport_SetUp",LABEL_ID:"label",RESOURCE_ID_ID:"resourceID",DESCRIPTION_ID:"reportUnit.description",FILE_PATH_ID:"filePath",RESOURCE_URI_ID:"resourceUri",FILE_SYSTEM_SOURCE_ID:"FILE_SYSTEM",CONTENT_REPOSITORY_SOURCE_ID:"CONTENT_REPOSITORY",RESOURCE_NAME_ID:"resourceName",EDIT_RESOURCE_BUTTON_ID:"editResourceButton",REMOVE_RESOURCE_BUTTON_ID:"removeResourceButton",ADD_RESOURCE_BUTTON_ID:"addResourceButton",EDIT_CONTROL_BUTTON_ID:"editControlButton",REMOVE_CONTROL_BUTTON_ID:"removeControlButton",ADD_CONTROL_BUTTON_ID:"addControlButton",FILE_NAME_ID:"fileName",FILE_UPLOAD_BUTTON_ID:"fake_upload_button",SAVE_BUTTON_ID:"done",JRXML_FILE_PATH_COOKIE:"jrxmlFilePath",_canGenerateId:!0,initialize:function(e){this._setUpPage=o(this.SET_UP_PAGE_ID),this._setUpPage&&(this._form=o(document.body).select("form")[0],this._label=o(this.LABEL_ID),this._resourceId=o(this.RESOURCE_ID_ID),this._description=o(this.DESCRIPTION_ID),this._filePath=o(this.FILE_PATH_ID),this._resourceUri=o(this.RESOURCE_URI_ID),this._fileName=o(this.FILE_NAME_ID),this._fileSystemSource=o(this.FILE_SYSTEM_SOURCE_ID),this._contentRepositorySource=o(this.CONTENT_REPOSITORY_SOURCE_ID),this._saveButton=o(this.SAVE_BUTTON_ID),this._isEditMode=!!e&&e.isEditMode,this._initialSource=this._fileSystemSource.checked?this._fileSystemSource:this._contentRepositorySource,this._jrxmlFileResourceAlreadyUploaded=e.jrxmlFileResourceAlreadyUploaded,this._label.validator=s.labelValidator.bind(this),this._resourceId.validator=s.resourceIdValidator.bind(this),this._description.validator=s.descriptionValidator.bind(this),this._filePath.validator=this._filePathValidator.bind(this),this._resourceUri.validator=this._resourceUriValidator.bind(this),this._initEvents(),this._adjustFileSelectorPosition(),this._fileName.value=this._jrxmlFileResourceAlreadyUploaded);var t={fileUploadInput:"filePath",fakeFileUploadInput:"fake_upload_button",fakeFileUploadInputText:"fileName",resourceInput:"resourceUri",browseButton:"browser_button",uploadButton:"upload_button",treeId:"resourceTreeRepoLocation",dialogTitle:s.messages["resource.Report.Title"],selectLeavesOnly:!0};e&&o(t.browseButton)&&("fileResource"==e.type?t.providerId="fileResourceTreeDataProvider":"jrxml"==e.type?t.providerId="jrxmlTreeDataProvider":"olapMondrianSchema"==e.type?t.providerId="olapSchemaTreeDataProvider":"folder"==e.type&&(t.treeId="addFileTreeRepoLocation",t.providerId="repositoryExplorerTreeFoldersProvider",t.resourceInput="folderUri"),n.initialize(t),n._updateResourceSelectorState(p("input[type=radio]:checked").attr("id")))},_initEvents:function(){var e=this;p("#"+this.FILE_UPLOAD_BUTTON_ID).click(function(t){t.preventDefault(),p("#"+e.FILE_PATH_ID).trigger("click")}),this._saveButton.observe("click",function(t){e._isDataValid()||t.stop()}),this._form.observe("keyup",function(t){var i=t.element();[e._label,e._resourceId,e._description].include(i)&&(l.validate(s.getValidationEntries([i])),i==e._resourceId&&e._resourceId.getValue()!=s.generateResourceId(e._label.getValue())&&(e._canGenerateId=!1),i==e._label&&!e._isEditMode&&e._canGenerateId&&(e._resourceId.setValue(s.generateResourceId(e._label.getValue())),l.validate(s.getValidationEntries([e._resourceId]))))}),this._filePath.observe("change",function(){c()?-1!=this.value.toLowerCase().indexOf("c:\\fakepath\\")?e._fileName.value=this.value.substring("c:\\fakepath\\".length,this.value.length):e._fileName.value=this.value:e._fileName.value=this.files[0].name,o("fileUpload").removeClassName("error"),e._adjustFileSelectorPosition()})},_isDataValid:function(){var e=[this._label,this._resourceId,this._description,this._filePath,this._resourceUri];return c()?this.file=this._filePath.value:this.file=this._filePath.files[0],this.html=p(this._filePath).html(),l.validate(s.getValidationEntries(e))},_filePathValidator:function(e){var t=!0,i="";return!this._fileSystemSource.checked||!e.blank()||this._isEditMode&&this._initialSource==this._fileSystemSource||this._jrxmlFileResourceAlreadyUploaded||(i=s.messages.filePathIsEmpty,t=!1),t?l.hideError(o("fileName")):l.showError(o("fileName"),i),{isValid:t,errorMessage:i}},_resourceUriValidator:function(e){var t=!0,i="";return this._contentRepositorySource.checked&&e.blank()&&(i=s.messages.resourceUriIsEmpty,t=!1),{isValid:t,errorMessage:i}},_adjustFileSelectorPosition:function(){var e=p("#filePath");if(d()||u()||h()||_()){var t=20;e.parents("label").hasClass("error")&&(t+=13),e.css({opacity:"0",position:"absolute",right:0,top:t,width:95,height:30})}else e.css({position:"fixed",right:"-1000px",top:"-1000px"})},editResource:function(e){o(this.RESOURCE_NAME_ID).setValue(e),o(this.EDIT_RESOURCE_BUTTON_ID).click()},removeResource:function(e){o(this.RESOURCE_NAME_ID).setValue(e),o(this.REMOVE_RESOURCE_BUTTON_ID).click()},addResource:function(){o(this.ADD_RESOURCE_BUTTON_ID).click()},editControl:function(e){o(this.RESOURCE_NAME_ID).setValue(e),o(this.EDIT_CONTROL_BUTTON_ID).click()},removeControl:function(e){o(this.RESOURCE_NAME_ID).setValue(e),o(this.REMOVE_CONTROL_BUTTON_ID).click()},addControl:function(){o(this.ADD_CONTROL_BUTTON_ID).click()}};void 0===e&&document.observe("dom:loaded",function(){m.initialize(window.localContext.initOptions)}),i.exports=m}),define("components/components.templateengine",["require","exports","module","jquery","underscore","../namespace/namespace"],function(e,t,i){var r=e("jquery"),o=e("underscore"),s=e("../namespace/namespace"),n=s.jaspersoft;n.components.templateEngine=function(e,t){return{render:function(e,i,r){if(!r)return t.template(e)(i);if(r==this.STD_PLACEHOLDERS){var o=String(e);return t.each(i,function(e,t){var i=new RegExp("\\{"+t+"\\}");o=o.replace(i,e)}),o}},renderUrl:function(e,i,r){var o=t.template(e)(i);return r&&(o=encodeURI(o)),o},getTemplateText:function(t){return e("#"+t).html()},createTemplate:function(i){var r=e("#"+i),o=r.html();if(o&&o.length>0)return function(e){return t.template(o)(e)}},createTemplateFromText:function(e){if(e&&e.length>0)return function(i){return t.template(e)(i)}},createTemplateSection:function(e,i){var r="\x3c!--#val--\x3e(\\s|\\S)*\x3c!--/val--\x3e",o=r.replace(/val/g,e),s=new RegExp(o,"g"),n=this.getTemplateText(i),a=n.match(s)[0];return function(e){return t.template(a)(e)}},STD_PLACEHOLDERS:"std_placeholder"}}(r,o),i.exports=n.components.templateEngine}),define("addResource/jasperReport/addJasperReportResourcesAndControlsMain",["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.report","../../components/components.templateengine","jquery","../../util/utils.common"],function(e,t,i){function r(e,t){var i=p.getTemplateText("addJasperReportAddResourceTemplate"),r=m(p.render(i,t));r.find("a.launcher").on("click",function(){return _.addResource(),!1}),e.append(r)}function o(e,t){var i=p.getTemplateText("addJasperReportAddControlTemplate"),r=m(p.render(i,t));r.find("a.launcher").on("click",function(){return _.addControl(),!1}),e.append(r)}function s(e,t){var i=p.getTemplateText("addJasperReportSuggestedResourceTemplate");d.each(t,function(t){var r=m(p.render(i,d.defaults({},t,{fileType:""})));r.find("a.emphasis").on("click",function(){return _.editResource(t.name),!1}),t.located||r.find("a.launcher").on("click",function(){return _.editResource(t.name),!1}),e.append(r)})}function n(e,t){var i=p.getTemplateText("addJasperReportSuggestedControlTemplate");d.each(t,function(t){var r=m(p.render(i,t));r.find("a.emphasis").on("click",function(){return _.editControl(t.name),!1}),t.located&&r.find("a.launcher").on("click",function(){return _.removeControl(t.name),!1}),e.append(r)})}function a(e,t,i){var r=p.getTemplateText("addJasperReportNonSuggestedResourceTemplate");d.each(t,function(t){var o=m(p.render(r,t));i&&(o.find("a.emphasis").on("click",function(){return _.editResource(t.name),!1}),o.find("a.launcher").on("click",function(){return _.removeResource(t.name),!1})),e.append(o)})}function l(e,t,i){var r=p.getTemplateText("addJasperReportNonSuggestedControlTemplate");d.each(t,function(t){var o=m(p.render(r,t));i&&(o.find("a.emphasis").on("click",function(){return t.local?_.editControl(t.name):_.editControl(t.referenceURI),!1}),o.find("a.launcher").on("click",function(){return t.local?_.removeControl(t.name):_.removeControl(t.referenceURI),!1})),e.append(o)})}var c=e("requirejs-domready"),d=e("underscore"),u=e("runtime_dependencies/js-sdk/src/jrs.configs"),h=e("../../resource/resource.base"),_=e("../../resource/resource.report"),p=e("../../components/components.templateengine"),m=e("jquery"),f=e("../../util/utils.common"),E=f.isIPad;c(function(){d.extend(h.messages,u.addJasperReport.resource.messages),_.initialize(),E()&&h.initSwipeScroll();var e=m(m("#resources ul")[0]);a(e,u.addJasperReport.nonSuggestedResources,u.addJasperReport.canChangeResources),s(e,u.addJasperReport.suggestedResources),r(e,{canChangeResources:u.addJasperReport.canChangeResources});var t=m(m("#controls ul")[0]);l(t,u.addJasperReport.nonSuggestedControls,u.addJasperReport.canChangeResources),n(t,u.addJasperReport.suggestedControls),o(t,{canChangeResources:u.addJasperReport.canChangeResources})})});