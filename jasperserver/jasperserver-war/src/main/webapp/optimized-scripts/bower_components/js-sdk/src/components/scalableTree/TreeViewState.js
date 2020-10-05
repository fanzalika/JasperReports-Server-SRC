define(["require","underscore","./factory/collectParentIdsFactory"],function(e){var t=e("underscore"),n=e("./factory/collectParentIdsFactory"),i="/",d=function(){this.initialize()};return t.extend(d.prototype,{initialize:function(e){e=e||{},this.clear(),this.collectParentIds=n.create(e.escapeCharacter,i)},clear:function(){this._TOGGLED_LEVELS_LIST=[{id:"/",collapsed:!1}],this._RECENTLY_EXPENDED_LEVELS_LIST={},this._SELECTION={}},selectItems:function(e){e=t.isArray(e)?e:[e],t.each(e,function(e){this._SELECTION[e]=!0},this)},deselectItems:function(e){e=t.isArray(e)?e:[e],t.each(e,function(e){this._SELECTION[e]=!1},this)},resetSelection:function(e){e=e||[],this._SELECTION={},t.each(e,function(e){this._SELECTION[e]=!0},this)},getSelection:function(){return this._SELECTION},getToggledLevels:function(){return t.map(this._TOGGLED_LEVELS_LIST,function(e){return e})},getExpandedLevels:function(){return t.filter(this._TOGGLED_LEVELS_LIST,function(e){var t=this.collectParentIds(e.id);return!this._isOneOfParentLevelsCollapsed(t)&&this.isExpanded(e.id)?e:void 0},this)},isSelected:function(e){return this._SELECTION[e]},isExpanded:function(e){var t=this._findToggledLevelById(e);return t&&!t.collapsed},markLevelAsRecentlyExpanded:function(e){this._RECENTLY_EXPENDED_LEVELS_LIST[e]=!0},removeRecentlyExpandedLevel:function(e){delete this._RECENTLY_EXPENDED_LEVELS_LIST[e]},isLevelRecentlyExpanded:function(e){return this._RECENTLY_EXPENDED_LEVELS_LIST[e]},addToggledLevel:function(e){var t=!this._findToggledLevelById(e);t&&this._addToggledLevel(e)},markToggledLevelExpanded:function(e){var t=this._findToggledLevelById(e);t&&(t.collapsed=!1)},markToggledLevelCollapsed:function(e){var t=this._findToggledLevelById(e);t&&(t.collapsed=!0)},_isOneOfParentLevelsCollapsed:function(e){return t.find(e,function(e){return!this.isExpanded(e)},this)},_addToggledLevel:function(e){this._TOGGLED_LEVELS_LIST.push({id:e,collapsed:!1})},_findToggledLevelById:function(e){return t.find(this._TOGGLED_LEVELS_LIST,function(t){return t.id===e})}}),d});