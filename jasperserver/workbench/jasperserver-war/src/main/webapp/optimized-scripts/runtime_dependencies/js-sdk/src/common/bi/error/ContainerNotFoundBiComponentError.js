define(["require","exports","module","./BiComponentError","./enum/biComponentErrorCodes","./enum/biComponentErrorMessages"],function(o,r,e){var n=o("./BiComponentError"),t=o("./enum/biComponentErrorCodes"),s=o("./enum/biComponentErrorMessages");e.exports=n.extend({constructor:function(o){n.prototype.constructor.call(this,t.CONTAINER_NOT_FOUND_ERROR,s[t.CONTAINER_NOT_FOUND_ERROR],[o])}})});