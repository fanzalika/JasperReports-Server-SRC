define(["require","exports","module","backbone-validation","underscore","../util/parse/NumberUtils"],function(t,e,n){var r=t("backbone-validation"),i=t("underscore"),a=t("../util/parse/NumberUtils"),o=new a,u=r.mixin.validate;r.mixin.validate=function(t,e){e||(e={});var n=this;return u.call(this,t,i.extend({valid:function(t,e){n.trigger("validate:"+e,n,e)},invalid:function(t,e,r){n.trigger("validate:"+e,n,e,r)}},e))},i.extend(r.validators,{doesNotContainSymbols:function(t,e,n){if(new RegExp("["+n+"]","g").test(t))return"Attribute '"+e+"' contains forbidden symbols"},integerNumber:function(t){if(!o.isNumberInt(t))return"Value is not a valid integer number"},type:function(t,e,n){function r(t){var e;return"string"==t?e=i.isString:"number"===t?e=i.isNumber:"object"===t?e=i.isObject:"boolean"===t?e=i.isBoolean:"null"===t?e=i.isNull:"undefined"===t&&(e=i.isUndefined),e}if(i.isArray(n)||(n=[n]),!n.some(function(e){return r(e)(t)}))return"'{attr}' is not {type}".replace("{attr}",e).replace("'{type}'",n.join(" "))},url:function(t){if(!/(http|https):\/\/.*\..*./.test(t))return"Value is not a valid url"},hexColor:function(t){if(!/^#[0-9a-f]{3,6}$/i.test(t))return"Value is not a valid hex color"},xRegExpPattern:function(t,e,n,r){if(!n.test(t))return"Value does not match pattern"},startsWithLetter:function(t,e,n,r){if(!t.substr(0,1).match(/[A-Za-z]/))return"Value should start with letter"},containsOnlyWordCharacters:function(t,e,n,r){if(t.search(/\W/)>=0)return"Value should contain only word characters (letters, digits and underscore)"},arrayMinLength:function(t,e,n,r){if(i.isArray(t)&&t.length<n)return"Array length is less than "+n}}),n.exports=r});