define(["require","exports","module","./RelativeDate","underscore"],function(e,r,t){var i=e("./RelativeDate"),n=e("underscore"),o=function(){i.apply(this,arguments)},u=function(){};u.prototype=i.prototype,o.prototype=new u,o.prototype.constructor=o,o.PATTERNS={DAY:/^(DAY)(([+|\-])(\d{1,9}))?$/i,WEEK:/^(WEEK)(([+|\-])(\d{1,9}))?$/i,MONTH:/^(MONTH)(([+|\-])(\d{1,9}))?$/i,QUARTER:/^(QUARTER)(([+|\-])(\d{1,9}))?$/i,SEMI:/^(SEMI)(([+|\-])(\d{1,9}))?$/i,YEAR:/^(YEAR)(([+|\-])(\d{1,9}))?$/i},o.parse=function(e){if(o.isValid(e))for(var r in o.PATTERNS){var t=o.PATTERNS[r].exec(e);if(null!==t&&n.isArray(t)&&5===t.length)return new o(t[1],t[3],t[4])}},o.isValid=function(e){if(e instanceof o)return""!==e.toString();if(n.isString(e))for(var r in o.PATTERNS)if(o.PATTERNS[r].test(e))return!0;return!1},t.exports=o});