define(["require","exports","module","jquery","runtime_dependencies/js-sdk/src/jrs.configs","runtime_dependencies/js-sdk/src/common/util/encrypter","../components/components.webHelp"],function(e,s,n){var o=e("jquery"),r=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("runtime_dependencies/js-sdk/src/common/util/encrypter"),i=e("../components/components.webHelp");o(function(){var e=o("#j_username"),s=o("#j_password_pseudo"),n=o("#orgId");i.setCurrentContext("login");var t=function(e){if(r.isEncryptionOn){var n={j_password:s.val()};if(void 0!==window.doesAllowUserPasswordChange&&window.doesAllowUserPasswordChange){var i=o("#j_newpassword1_pseudo").val(),t=o("#j_newpassword2_pseudo").val();o.trim(i)&&(n.j_newpassword1=i),o.trim(t)&&(n.j_newpassword2=t)}d.encryptData(n,function(e){for(var s in e)o("#"+s).val(e[s]),o("#"+s+"_pseudo").val("");o("#loginForm").submit()})}else o("#j_password").val(s.val()),o("#j_newpassword1").val(o("#j_newpassword1_pseudo").val()),o("#j_newpassword2").val(o("#j_newpassword2_pseudo").val()),o("#loginForm").submit();e.preventDefault()};o("#submitButton").click(t).removeAttr("disabled"),e.keypress(function(e){13==(e.keyCode||e.which)&&t(e)}),s.keypress(function(e){13==(e.keyCode||e.which)&&t(e)}),n.keypress(function(e){13==(e.keyCode||e.which)&&t(e)})})});