define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/base/OptionContainer","../../enum/confirmDialogTypesEnum","text!../../templates/buttonTemplate.htm"],function(t,n,e){var o=t("underscore"),s=t("runtime_dependencies/js-sdk/src/common/component/base/OptionContainer"),i=t("../../enum/confirmDialogTypesEnum"),u=t("text!../../templates/buttonTemplate.htm");e.exports={_initButtons:function(t){this.buttons=new s({options:t.buttons,el:t.buttonsContainer,contextName:"button",optionTemplate:u}),this.buttons.disable(),this.listenTo(this.buttons,"button:save",this.saveChildren),this.listenTo(this.buttons,"button:cancel",o.bind(this._openConfirm,this,null,i.CANCEL_CONFIRM))},toggleButtons:function(){var t=this.buttons;this.containsUnsavedItems()?t.enable():(o.each(t.options,function(t){t.$el.removeClass("over")}),t.disable())}}});