var messageListModule={_list:null,_messageListId:"messageList",_flowExecutionKey:null,_systemConfirmMessages:[],toolbar:{_buttons:null,_id:"toolbar",initialize:function(){toolbarButtonModule.initialize({}),this._buttons=document.body.select(layoutModule.TOOLBAR_CAPSULE_PATTERN),this._initEventHandlers()},refresh:function(){this._buttons.each(function(e){toolbarButtonModule.setButtonState(e,messageListModule.hasSelectedMessages())}.bind(this))},_initEventHandlers:function(){$(this._id).observe("click",function(e){var t=matchAny(e.element(),[layoutModule.BUTTON_PATTERN],!0),s=t.identify();messageListModule.doAction(s,Object.toQueryString({selectedIds:messageListModule.getSelectedIds()}))}.bindAsEventListener(this))}},filter:{_id:"messageFilter",initialize:function(){this._initEventHandlers()},_initEventHandlers:function(){$(this._id).observe("change",function(e){e.element();messageListModule.doAction("changeEventsType",Object.toQueryString({messageFilter:$(this._id).getValue()}))}.bindAsEventListener(this))}},initialize:function(e){this._flowExecutionKey=e.flowExecutionKey,this._systemConfirmMessages=e.systemConfirmMessages,this._list=new dynamicList.List(this._messageListId,{listTemplateDomId:"list_fourColumn_type_message",itemTemplateDomId:"list_fourColumn_type_message:unread",multiSelect:!0});var t=this._list.selectItem;this._list.selectItem=function(e){e.getValue().isHeader||t.apply(this,arguments)},this._initListEvents(),this.toolbar.initialize(),this.filter.initialize(),this.doAction("getMessages","")},_getMessageItems:function(e){var t=function(e){var t=e.select(".subject a")[0];t.update(xssUtil.escape(this.getValue().subject)),t.writeAttribute("href","flow.html?_flowExecutionKey="+messageListModule._flowExecutionKey+"&_eventId=viewMessage&id="+this.getValue().id);var s=e.select(".date")[0];s.update(xssUtil.escape(this.getValue().date)),s.writeAttribute("title",this.getValue().timestamp);var i=e.select(".type")[0];i.update(xssUtil.escape(this.getValue().type));var n=e.select(".component")[0];return n.update(xssUtil.escape(this.getValue().component)),e};return e.unshift({isHeader:!0}),e.collect(function(e){var s;s=e.isHeader?"list_fourColumn_type_message:header":e.isRead?"list_fourColumn_type_message:read":"list_fourColumn_type_message:unread";var i=new dynamicList.ListItem({cssClassName:layoutModule.LEAF_CLASS,value:e,templateDomId:s});return e.isHeader?i.processTemplate=function(e){return e}:i.processTemplate=t,i}.bind(this))},_initListEvents:function(){this._list.observe("item:selected",function(e){this.refreshToolbar()}.bindAsEventListener(this)),this._list.observe("item:unselected",function(e){this.refreshToolbar()}.bindAsEventListener(this))},refreshToolbar:function(){messageListModule.toolbar.refresh()},hasSelectedMessages:function(){return this._list.getSelectedItems().length>0},getSelectedIds:function(){return this._list.getSelectedItems().collect(function(e){return e.getValue().id})},doAction:function(e,t){var s="flow.html?_flowExecutionKey="+messageListModule._flowExecutionKey+"&_eventId="+e;this._list.setItems([]),this.refreshToolbar(),ajaxTargettedUpdate(s,{postData:t,callback:function(e){"OK"==e.status?(this._list.setItems(this._getMessageItems(e.data)),this._list.show()):alert(e.data.message)}.bind(this),errorHandler:this._serverErrorHandler,mode:AjaxRequester.prototype.EVAL_JSON})},_serverErrorHandler:function(e){e.getResponseHeader("LoginRequested")&&(document.location="flow.html?_flowId=logEventFlow"),showErrorPopup=function(){window.alert("Server Error")};var t=baseErrorHandler(e);t||500!=e.status||(document.location="flow.html?_flowId=logEventFlow&_eventId=error",document.location="flow.html?_flowId=logEventFlow&_eventId=error")}};"undefined"==typeof require&&document.observe("dom:loaded",function(){messageListModule.initialize(localContext.initOptions)});