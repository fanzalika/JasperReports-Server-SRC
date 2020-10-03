define(["require","exports","module","prototype","./org.user.mng.main"],function(e,n,t){var r=e("prototype"),i=r.$,o=e("./org.user.mng.main");o.userActionFactory={enableAll:function(e){var n=e.users,t={userNames:Object.toJSON(n.collect(function(e){return e.getNameWithTenant()}))},r=new o.ServerAction("enableAll",t);return r.onSuccess=function(n){o.fire(o.userManager.Event.USERS_ENABLED,{inputData:e,responseData:n})},r.onError=function(n){o.fire(o.Event.SERVER_ERROR,{inputData:e,responseData:n})},r.beforeInvoke=function(){return o.invokeClientAction("cancelIfEdit",{entity:n[0]})},r},disableAll:function(e){var n=e.users,t={userNames:Object.toJSON(n.collect(function(e){return e.getNameWithTenant()}))},r=new o.ServerAction("disableAll",t);return r.onSuccess=function(n){o.fire(o.userManager.Event.USERS_DISABLED,{inputData:e,responseData:n})},r.onError=function(n){o.fire(o.Event.SERVER_ERROR,{inputData:e,responseData:n})},r.beforeInvoke=function(){return o.invokeClientAction("cancelIfEdit",{entity:n[0]})},r}},o.userManager.actionFactory={enableAllUsers:function(){var e=o.entityList.getSelectedEntities();return new o.Action(function(){o.invokeUserAction(o.userManager.Action.ENABLE_ALL,{users:e})})},disableAllUsers:function(){var e=o.entityList.getSelectedEntities();return new o.Action(function(){o.invokeUserAction(o.userManager.Action.DISABLE_ALL,{users:e})})},login:function(e){var n=e.user;return new o.Action(function(){i("j_username").setValue(n.getNameWithTenant()),i("loginAsForm").submit()})}},t.exports=o});