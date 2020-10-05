define(["require","underscore","jquery","backbone","../error/biComponentErrorFactory","./util/biComponentUtil"],function(e){"use strict";function t(e,t,i){return function(o,c,s){var u=new r.Deferred;o&&n.isFunction(o)&&u.done(o),c&&n.isFunction(c)&&u.fail(c),s&&n.isFunction(s)&&u.always(s);try{var d=e.validate();d?u.reject(a.validationError(d)):i(t,u)}catch(p){u.reject(a.javaScriptException(p))}return u}}var n=e("underscore"),r=e("jquery"),i=e("backbone"),a=e("../error/biComponentErrorFactory"),o=e("./util/biComponentUtil"),c=function(e,t){this.instanceData={properties:n.extend({},t),data:null},this.schema=JSON.parse(e)};return c.prototype.decorateComponent=function(e,r){o.createInstancePropertiesAndFields(e,this.instanceData,n.keys(this.schema.properties),["properties"],["data"],new i.Model),n.extend(e,{validate:o.createValidateAction(this.instanceData,this.schema),run:t(e,this.instanceData,r)})},{newInstance:function(e,t){return new c(e,t)}}});