define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),s={activate:function(e,t){if("number"!=typeof e)return void this.setActive(n.extend({},t));if(t=t||{},e>=this.get("bufferStartIndex")&&e<=this.get("bufferEndIndex")){var i=this.get("items")[e-this.get("bufferStartIndex")];i&&this.setActive(n.extend(t,{index:e,item:i}))}else{var s=this;this.getData({offset:e,limit:1}).done(function(i){s.setActive(n.extend(t,{index:e,item:i.data[0]}))}).fail(this.fetchFailed)}},setActive:function(e){this.active&&e.index===this.active.index&&e.item.value===this.active.value||(this.active=e&&"number"==typeof e.index?{index:e.index,value:e.item.value,label:e.item.label}:void 0,e&&e.silent||(this.trigger("change"),this.trigger("active:changed",this.active)))},getActive:function(){return this.active}};i.exports=s});