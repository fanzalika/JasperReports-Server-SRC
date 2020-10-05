dynamicTree.Tree.addVar("NODE_PATTERN",".node").addVar("NODE_WRAPPER_PATTERN",".node > .wrap").addVar("NODE_ICON_PATTERN",".node > .wrap .icon").addVar("NODE_CUSTOM_PATTERNS",[]),dynamicTree.Tree.addVar("LEAF_PATTERN",".leaf").addVar("LEAF_WRAPPER_PATTERN",".leaf > .wrap").addVar("LEAF_ICON_PATTERN",".leaf > .wrap .icon").addVar("LEAF_CUSTOM_PATTERNS",[]),dynamicTree.Tree.addVar("EXPANDING_TIME",1e3),dynamicTree.Tree.addVar("draggables",[]),dynamicTree.Tree.addMethod("getTreeNodeByEvent",function(e){var t=Event.element(e);return this.getTreeNodeByElement(t)}),dynamicTree.Tree.addMethod("getTreeNodeByElement",function(e){for(;e&&e.readAttribute&&e.readAttribute("id")!==this.id;){var t=e.treeNode;if(t&&t.getTreeId()===this.getId())return t;e=$(e.parentNode)}return null}),dynamicTree.Tree.addMethod("isNodeEvent",function(e){var t=matchMeOrUp(e.element().parentNode,"LI");return t&&t.hasClassName(layoutModule.NODE_CLASS)}),dynamicTree.Tree.addMethod("isLeafEvent",function(e){var t=matchMeOrUp(e.element().parentNode,"LI");return t&&t.hasClassName(layoutModule.LEAF_CLASS)}),dynamicTree.Tree.addMethod("isIconEvent",function(e){return e.element().hasClassName(layoutModule.ICON_CLASS)}),dynamicTree.Tree.addMethod("_registerEvents",function(){this._cleanUpListeners(),this._registerClickEvents(),this._registerCustomEvents(),this._registerKeyEvents(),this._registerMouseEvents()}),dynamicTree.Tree.addMethod("_cleanUpListeners",function(){var e=this._getElement();e.stopObserving("click"),e.stopObserving("dblclick"),isSupportsTouch()?(e.stopObserving("touchstart"),e.stopObserving("drag:touchstart"),e.stopObserving("touchend")):(e.stopObserving("mousedown"),e.stopObserving("drag:mousedown"),e.stopObserving("mouseup")),e.stopObserving("mouseover"),e.stopObserving("mouseout")}),dynamicTree.Tree.addMethod("_registerClickEvents",function(){var e=this._getElement();e.observe("click",function(t){var n=matchMeOrUp(t.element(),layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);if(n){var i=this.isIconEvent(t),r=this.isNodeEvent(t),s=this.isLeafEvent(t);r?(i&&e.fire("nodeIcon:click",{targetEvent:t,node:n}),e.fire("node:click",{targetEvent:t,node:n})):s&&(i&&e.fire("nodeIcon:click",{targetEvent:t,node:n}),e.fire("leaf:click",{targetEvent:t,node:n})),!isIPad()&&r&&i&&n.handleNode(t)}}.bindAsEventListener(this)),e.observe("dblclick",function(t){var n=matchMeOrUp(t.element(),layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);if(n){var i=this.isIconEvent(t),r=this.isNodeEvent(t),s=this.isLeafEvent(t);r?(i&&e.fire("nodeIcon:dblclick",{targetEvent:t,node:n}),e.fire("node:dblclick",{targetEvent:t,node:n})):s&&(i&&e.fire("leafIcon:dblclick",{targetEvent:t,node:n}),e.fire("leaf:dblclick",{targetEvent:t,node:n})),this.handleNodeOnDblclick&&(r||s)&&!i&&n.handleNode(t)}}.bindAsEventListener(this))}),dynamicTree.Tree.addMethod("_registerMouseEvents",function(){var e=this._getElement();e.observe(isSupportsTouch()?"touchstart":"mousedown",function(t){var n=t.element(),i=matchMeOrUp(n,layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);if(i){t.treeEvent=!0;var r=this.isIconEvent(t),s=this.isNodeEvent(t),d=this.isLeafEvent(t);if(isSupportsTouch())if(JRS.vars.ajax_in_progress)alert("please wait");else if(this.twofingers=!1,2==t.touches.length&&(this.twofingers=!0,this._selectOrEditNode(t,i,isMetaHeld(t),isShiftHeld(t),isRightClick(t)),i.isSelected()||designerBase&&designerBase.isInSelection(i))){var o=jQuery(n).parents("li:first");return void(o.hasClass("selected")&&document.fire(layoutModule.ELEMENT_CONTEXTMENU,{targetEvent:t,node:n}))}isSupportsTouch()&&JRS.vars.ajax_in_progress||(!this.selectOnMousedown||isSupportsTouch()&&1!=t.touches.length||this._selectOrEditNode(t,i,isMetaHeld(t),isShiftHeld(t),isRightClick(t)),s?(r&&e.fire("nodeIcon:mousedown",{targetEvent:t,node:i}),e.fire("node:mousedown",{targetEvent:t,node:i})):d&&(r&&e.fire("leafIcon:mousedown",{targetEvent:t,node:i}),e.fire("leaf:mousedown",{targetEvent:t,node:i})))}}.bindAsEventListener(this)),e.observe(isSupportsTouch()?"drag:touchstart":"drag:mousedown",function(t){var n=t.memo.targetEvent,i=matchMeOrUp(n.element(),layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(n);if(i){n.treeEvent=!0;var r=this.isIconEvent(n),s=this.isNodeEvent(n),d=this.isLeafEvent(n);this.selectOnMousedown&&!isRightClick(n)&&this._selectOrEditNode(n,i,isMetaHeld(n),isShiftHeld(n),isRightClick(n)),s?(r&&e.fire("nodeIcon.drag:mousedown",{targetEvent:n,node:i}),e.fire("node.drag:mousedown",{targetEvent:n,node:i})):d&&(r&&e.fire("leafIcon.drag:mousedown",{targetEvent:n,node:i}),e.fire("leaf.drag:mousedown",{targetEvent:n,node:i}))}}.bindAsEventListener(this)),e.observe(isSupportsTouch()?"touchend":"mouseup",function(t){var n=matchMeOrUp(t.element(),layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);if(n){t.treeEvent=!0;var i=this.isIconEvent(t),r=this.isNodeEvent(t),s=this.isLeafEvent(t);if(this.twofingers&&(t.isEmulatedRightClick=!0),isSupportsTouch()&&!this.twofingers&&(this.clickid==n.id&&!JRS.vars.ajax_in_progress&&t.timeStamp-this.clicktime<700&&(r?(i&&e.fire("nodeIcon:dblclick",{targetEvent:t,node:n}),e.fire("node:dblclick",{targetEvent:t,node:n})):s&&(i&&e.fire("leafIcon:dblclick",{targetEvent:t,node:n}),e.fire("leaf:dblclick",{targetEvent:t,node:n})),this.handleNodeOnDblclick&&(r||s)&&!i&&n.handleNode(t)),this.clicktime=t.timeStamp,this.clickid=n.id),!isSupportsTouch()||!JRS.vars.ajax_in_progress){this.selectOnMousedown||TouchController.element_scrolled||isSupportsTouch()&&1!=t.changedTouches.length||this._selectOrEditNode(t,n,isMetaHeld(t),isShiftHeld(t),isRightClick(t)),this._deselectOthers(t,n,isMetaHeld(t),isShiftHeld(t),isRightClick(t));r?(i&&e.fire("nodeIcon:mouseup",{targetEvent:t,node:n}),e.fire("node:mouseup",{targetEvent:t,node:n})):s&&(i&&e.fire("leafIcon:mouseup",{targetEvent:t,node:n}),e.fire("leaf:mouseup",{targetEvent:t,node:n})),isSupportsTouch()&&r&&i&&!TouchController.element_scrolled&&n.handleNode(t)}}}.bindAsEventListener(this)),"createTouch"in document||(e.observe("mouseover",function(t){var n=t.element(),i=matchMeOrUp(n,layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);i&&(Draggables.dragging&&(clearTimeout(this.timeout_id),this.timeout_id=setTimeout(function(e){i.openNode(e)},this.EXPANDING_TIME)),this.createDraggableIfNeeded(t,i),!isIE7()&&e.fire("tree:mouseover",{targetEvent:t,node:i}))}.bindAsEventListener(this)),isIE7()||e.observe("mouseout",function(t){var n=matchMeOrUp(t.element(),layoutModule.BUTTON_PATTERN)&&this.getTreeNodeByEvent(t);n&&e.fire("tree:mouseout",{targetEvent:t,node:n})}.bindAsEventListener(this))),Droppables.add(e,{accept:this.dropClasses,onDrop:function(e){this.elementDropped=e}.bind(this)})}),dynamicTree.Tree.addMethod("_registerKeyEvents",function(){var e=this._getElement();e.observe("key:down",function(e){var t=this.getTreeNodeByEvent(e);dynamicTree.treeNodeEdited!==t&&t&&this._selectNextNode(t,e.memo.targetEvent)}.bindAsEventListener(this)),e.observe("key:up",function(e){var t=this.getTreeNodeByEvent(e);dynamicTree.treeNodeEdited!==t&&t&&this._selectPreviousNode(t,e.memo.targetEvent)}.bindAsEventListener(this)),e.observe("key:right",function(e){var t=this.getTreeNodeByEvent(e);dynamicTree.treeNodeEdited!==t&&t&&this._selectInwards(t,e.memo.targetEvent)}.bindAsEventListener(this)),e.observe("key:left",function(e){var t=this.getTreeNodeByEvent(e);dynamicTree.treeNodeEdited!==t&&t&&this._selectOutwards(t,e.memo.targetEvent)}.bindAsEventListener(this))}),dynamicTree.Tree.addMethod("_registerCustomEvents",function(){var e=this._getElement();e.observe("mousedown",function(t){dynamicTree.activeTreeId&&dynamicTree.activeTreeId===this.getId()||(e.fire("tree:blur",{targetEvent:t,tree:dynamicTree.getActiveTree()}),dynamicTree.activeTreeId=this.getId(),e.fire("tree:focus",{targetEvent:t,tree:dynamicTree.getActiveTree()}))}.bindAsEventListener(this)),e.observe("mouseover",function(t){var n=this.getTreeNodeByEvent(t);n||e.fire("tree:mouseover",{targetEvent:t,tree:this})}.bindAsEventListener(this)),e.observe("mouseout",function(t){var n=this.getTreeNodeByEvent(t);n||e.fire("tree:mouseout",{targetEvent:t,tree:this})}.bindAsEventListener(this))}),dynamicTree.Tree.addMethod("fireOpenEvent",function(e,t){var n=this._getElement();n.fire("node:open",{node:e,targetEvent:t})}),dynamicTree.Tree.addMethod("fireSelectEvent",function(e,t){var n=this._getElement();n.fire(e.isParent()?"node:selected":"leaf:selected",{node:e,targetEvent:t})}),dynamicTree.Tree.addMethod("fireUnSelectEvent",function(e,t){var n=this._getElement();n.fire(e.isParent()?"node:unselected":"leaf:unselected",{node:e,targetEvent:t})}),dynamicTree.Tree.addMethod("fireUnSelectAllEvent",function(e){var t=this._getElement();t.fire("items:unselected",{targetEvent:e})}),dynamicTree.Tree.addMethod("fireEditEvent",function(e,t){var n=this._getElement();n.fire(e.isParent()?"node:edit":"leaf:edit",{node:e,newValue:t})}),dynamicTree.Tree.addMethod("fireStartEditEvent",function(e,t){var n=this._getElement();n.fire(e.isParent()?"node:startEdit":"leaf:startEdit",{node:e,input:t})}),dynamicTree.Tree.addMethod("fireEndEditEvent",function(e){var t=this._getElement();t.fire(e.isParent()?"node:endEdit":"leaf:endEdit",{node:e})}),dynamicTree.Tree.addMethod("observe",function(e,t){this._getElement().observe(e,t)}),dynamicTree.Tree.addMethod("stopObserving",function(e,t){this._getElement().stopObserving(e,t)}),dynamicTree.Tree.addMethod("createDraggableIfNeeded",function(e,t){var n=e?e.element():t._getElement().down(this.dragPattern),i=this.draggables[n.identify()];if(this.dragPattern&&!i){var r=matchAny(n,[this.dragPattern],!0);if(r&&n.className.toLowerCase().indexOf("icon")<0&&!this.draggables[r.identify()])return this.draggables[r.identify()]=new Draggable(n,{superghosting:!0,mouseOffset:!0,delay:isIE()||isSupportsTouch()?200:0,onStart:this.setDragStartState.bind(this,t),onEnd:this.setDragEndState.bind(this,t)}),this.draggables[r.identify()]}return null}),dynamicTree.Tree.addMethod("setDragStartState",function(e,t,n){var i=e._getElement().templateClassName;i&&t.element.addClassName(i),t.element.setStyle({width:null,height:null}),t.element.addClassName(layoutModule.DRAGGING_CLASS).addClassName(this.getId()),this.dragClasses&&t.element.addClassName(this.dragClasses),this.selectedNodes.length>1&&t.element.update(new Template(this.TREE_NN_ITEMS_SELECTED).evaluate({count:this.selectedNodes.length})),t.element.node=e,t.element.nodes=this.selectedNodes,t.options.scroll=this._getElement(),t.options.scrollSensitivity=layoutModule.SCROLL_SENSITIVITY,Draggables.dragging=this.regionID||!0}),dynamicTree.Tree.addMethod("setDragEndState",function(e,t,n){delete Draggables.dragging});