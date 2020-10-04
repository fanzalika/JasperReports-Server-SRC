define(["require","exports","module","../namespace/namespace","underscore","jquery","./controls.core"],function(e,t,i){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s=e("../namespace/namespace"),r=s.JRS,l=e("underscore"),o=e("jquery");e("./controls.core"),r.Controls=function(e,t,i){function s(e){if(t.isArray(e)){var i=t.filter(e,function(e){return e.selected});return t.map(i,function(e){return e.id||""===e.id?e:e.value})}return e}return t.extend(i,{BaseControl:i.Base.extend({id:null,elem:null,error:null,templateChunks:{},constructor:function(e){this.initialize.apply(this,arguments)},getElem:function(){return this.elem},setElem:function(e){this.elem=e},bindCustomEventListeners:function(){},isSingleSelect:function(){return!t.isArray(this.get("selection"))},isSingleValue:function(){return!t.isArray(this.get("values"))},getTemplateSection:function(e){return this.templateChunks[this.type+"_"+e]||(this.templateChunks[this.type+"_"+e]=i.TemplateEngine.createTemplateSection(e,this.type)),this.templateChunks[this.type+"_"+e]},initialize:function(e){this.baseRender(e),this.isVisible(e)&&this.bindCustomEventListeners()},fireControlSelectionChangeEvent:function(t){e(document).trigger(i.CHANGE_CONTROL,this,t)},baseRender:function(n){n&&t.extend(this,n);var s=i.TemplateEngine.createTemplate(this.type);if(s){var r=e(s(this));this.setElem(r)}},update:function(e){},get:function(e){return this[e]},isValid:function(){return null===this.error||this.error&&this.error instanceof String&&0===this.error.length},isVisible:function(e){return!e||void 0===e.visible||!0===e.visible},updateWarningMessage:function(){var e=null!=this.error?this.error:"";this.getElem()&&this.getElem().find(".warning").text(e)},refresh:function(){var e=this.get("values"),t=this.get("selection");e=this.isSingleValue()?t:i.BaseControl.merge(e,t),this.values=e,this.initialize(this),this.isVisible(this)&&this.update(e)},set:function(e,i){if(t.extend(this,e),void 0!==e.values&&(this.isVisible(this)&&this.update(e.values),this.isSingleValue()?this.selection=e.values:this.isSingleSelect()?this.selection=s(e.values)[0]:this.selection=s(e.values)),void 0!==e.selection&&(this.isSingleValue()&&(this.values=e.selection),!i&&this.fireControlSelectionChangeEvent()),void 0!==e.disabled&&!this.get("readOnly")){var n=e.disabled;i||(n?this.disable():this.enable())}void 0!==e.error&&this.updateWarningMessage()},find:function(e){if(void 0!==e&&e&&"object"==n(e)){var i=t.keys(e)[0],s=t.values(e)[0];return t.find(this.get("values"),function(e){return e[i]===s})}},enable:function(){this.getElem().find("input").prop("disabled",!1),this.getElem().find("select").prop("disabled",!1)},disable:function(){this.getElem().find("input").prop("disabled",!0),this.getElem().find("select").prop("disabled",!0)}},{merge:function(e,i){return t.isNull(e)||t.isUndefined(e)?i:t.isNull(i)||t.isUndefined(i)?e:t.isArray(i)?t.map(e,function(e){return void 0!==t.find(i,function(t){return t===e.value})?e.selected=!0:delete e.selected,e}):this.merge(e,[i])}}),CHANGE_CONTROL:"changed:control"})}(o,l,r.Controls),i.exports=r.Controls});