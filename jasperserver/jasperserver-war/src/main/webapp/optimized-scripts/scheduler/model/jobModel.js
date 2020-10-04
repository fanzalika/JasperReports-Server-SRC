define(["require","exports","module","jquery","underscore","backbone","runtime_dependencies/js-sdk/src/jrs.configs","settings!globalConfiguration","xregexp","../enum/jobStateEnum","momentExtension","../../util/utils.common"],function(e,r,t){function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=e("jquery"),s=e("underscore"),a=e("backbone"),n=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("settings!globalConfiguration"),l=e("xregexp"),u=e("../enum/jobStateEnum"),g=e("momentExtension"),p=e("../../util/utils.common"),c=p.getTZOffset,f=!1,h={},m={},y=function(e){var r,t=[{id:0,value:"dd",key:"day-of-month-2",result:"DD"},{id:1,value:"DD",key:"day-of-week",result:"dddd"},{id:2,value:"mm",key:"month-2",result:"MM"},{id:3,value:"MM",key:"month-name",result:"MMMM"},{id:4,value:"yy",key:"year-4",result:"YYYY"},{id:5,value:"d",key:"day-of-month-1",result:"D"},{id:6,value:"D",key:"day-of-week-abbr",result:"ddd"},{id:7,value:"m",key:"month-1",result:"M"},{id:8,value:"M",key:"month-name-abbr",result:"MMM"},{id:9,value:"y",key:"year-2",result:"YY"},{id:10,value:"oo",key:"day-of-year-2",result:"DDDD"},{id:11,value:"o",key:"day-of-year-1",result:"DDD"}];for(r=0;r<t.length;r++)e=e.replace(new RegExp(t[r].value,"g"),"{"+t[r].id+"}");for(r=0;r<t.length;r++)e=e.replace(new RegExp("\\{"+t[r].id+"\\}","g"),t[r].result);return e}(n.calendar.timepicker.dateFormat),D=n.calendar.timepicker.timeFormat.replace(":ss",""),v=y+" "+D;t.exports=a.Model.extend({ftpPortDefaults:{ftp:"21",ftps:"990",sftp:"22"},urlRoot:n.contextPath+"/rest_v2/jobs",validateAll:function(e){var r=this,t=o.Deferred();return this.runServerValidationRequests().always(function(i){var o=r.isValid(e);i&&i.errorCode&&(o=!1,r.trigger("invalid",[i],{switchToErrors:!1})),o?t.resolve():t.reject()}),t},isValid:function(e){return!this.validate(this.attributes,{validate:!0,editMode:e}).length},validate:function(e,r){if(r=r||{},!0===r.validate){var t,i=[];e.trigger&&(2==e.trigger.startType&&(e.trigger.startDate?g(e.trigger.startDate,v,!0).isValid()?!r.editMode&&this.ifPastDate(e.trigger.startDate,e.trigger.timezone)&&i.push({field:"startDate",errorCode:"error.before.current.date.trigger.startDate"}):i.push({field:"startDate",errorCode:"error.invalid.date"}):i.push({field:"startDate",errorCode:"report.scheduling.job.edit.specify.startdate"})),"simple"===e.trigger.type?(this.isNumeric(e.trigger.recurrenceInterval)?this.isNumeric(e.trigger.recurrenceInterval,{minValue:-2147483648,maxValue:2147483647})||i.push({field:"recurrenceInterval",errorCode:"typeMismatch.java.lang.Integer"}):i.push({field:"recurrenceInterval",errorCode:"report.scheduling.job.edit.specify.recurrenceinterval"}),"numberOfTimes"===e.trigger.radioEndDate&&(this.isNumeric(e.trigger.occurrenceCount)?this.isNumeric(e.trigger.occurrenceCount,{minValue:-2147483648,maxValue:2147483647})||i.push({field:"occurrenceCount",errorCode:"typeMismatch.java.lang.Integer"}):i.push({field:"occurrenceCount",errorCode:"report.scheduling.job.edit.specify.numberoftimestorunreport"})),"specificDate"===e.trigger.radioEndDate&&(e.trigger.endDate?g(e.trigger.endDate,v,!0).isValid()?(this.ifPastDate(e.trigger.endDate,e.trigger.timezone)&&i.push({field:"simpleEndDate",errorCode:"error.before.current.date.trigger.endDate"}),2==e.trigger.startType&&e.trigger.startDate&&+new Date(e.trigger.startDate)>=+new Date(e.trigger.endDate)&&i.push({field:"simpleEndDate",errorCode:"error.before.start.date.trigger.endDate"})):i.push({field:"simpleEndDate",errorCode:"error.invalid.date"}):i.push({field:"simpleEndDate",errorCode:"report.scheduling.job.edit.specify.enddate"}))):"calendar"===e.trigger.type&&("selectedMonths"===e.trigger.radioWhichMonth&&0===e.trigger.months.month.length&&i.push({field:"monthSelector",errorCode:"report.scheduling.job.edit.specify.monthswhenjobshouldrun"}),e.trigger.endDate&&(g(e.trigger.endDate,v,!0).isValid()?(this.ifPastDate(e.trigger.endDate,e.trigger.timezone)&&i.push({field:"calendarEndDate",errorCode:"error.before.current.date.trigger.endDate"}),2==e.trigger.startType&&e.trigger.startDate&&+new Date(e.trigger.startDate)>=+new Date(e.trigger.endDate)&&i.push({field:"calendarEndDate",errorCode:"error.before.start.date.trigger.endDate"})):i.push({field:"calendarEndDate",errorCode:"error.invalid.date"})),"selectedDays"===e.trigger.radioWhichDay&&0===e.trigger.weekDays.day.length&&i.push({field:"daySelector",errorCode:"report.scheduling.job.edit.specify.dayswhenjobshouldrun"}),"datesInMonth"===e.trigger.radioWhichDay&&((t=this.parseIntervals(e.trigger.monthDays,"daysInMonth"))||i.push({field:"datesInMonth",errorCode:"report.scheduling.job.edit.specify.whenjobshouldrun"})),this.parseIntervals(e.trigger.hours,"hours")||i.push({field:"hours",errorCode:"error.not.empty.trigger.hours"}),this.parseIntervals(e.trigger.minutes,"minutes")||i.push({field:"minutes",errorCode:"error.not.empty.trigger.minutesshould"})));var o=e.repositoryDestination;if(o.outputDescription&&o.outputDescription.length>250&&i.push({field:"outputDescription",errorCode:"report.scheduling.job.output.long.description"}),o.sequentialFilenames&&!o.timestampPattern&&i.push({field:"timestampPattern",errorCode:"report.scheduling.job.output.timestamppattern"}),e.baseOutputFilename||i.push({field:"baseOutputFilename",errorCode:"error.not.empty.baseOutputFilename"}),e.baseOutputFilename&&!this.isValidFileName(e.baseOutputFilename)&&i.push({field:"baseOutputFilename",errorCode:"error.invalid.chars.baseOutputFilename"}),e.outputFormats.outputFormat&&e.outputFormats.outputFormat.length||i.push({field:"outputFormats",errorCode:"error.report.job.no.output.formats"}),o.saveToRepository&&!o.folderURI&&i.push({field:"outputRepository",errorCode:"error.not.empty.folderURI"}),o.saveToRepository&&o.folderURI&&!this.isValidUri(o.folderURI)&&i.push({field:"outputRepository",errorCode:"error.report.job.invalid.chars.folderURI"}),s.isUndefined(o.outputLocalFolder)||""!==o.outputLocalFolder||i.push({field:"outputHostFileSystem",errorCode:"error.not.empty.folder"}),o.outputFTPInfo.enabled&&(o.outputFTPInfo.serverName?this.isHostName(o.outputFTPInfo.serverName)||i.push({field:"ftpAddress",errorCode:"error.report.scheduling.empty.ftp.server"}):i.push({field:"ftpAddress",errorCode:"error.report.scheduling.empty.ftp.server"}),o.outputFTPInfo.port&&this.isNumeric(o.outputFTPInfo.port)?0<(t=parseInt(o.outputFTPInfo.port,10))&&t<=65535||i.push({field:"ftpPort",errorCode:"error.report.scheduling.empty.ftp.port"}):i.push({field:"ftpPort",errorCode:"error.report.scheduling.empty.ftp.port"}),"sftp"===o.outputFTPInfo.type&&o.outputFTPInfo.sshKeyEnabled&&(o.outputFTPInfo.sshKey&&""!==o.outputFTPInfo.sshKey?this.isValidUri(o.outputFTPInfo.sshKey)||i.push({field:"sshKey",errorCode:"error.report.job.invalid.chars.sshKey"}):i.push({field:"sshKey",errorCode:"error.not.empty.sshKey"}))),e.mailNotification){var a=e.mailNotification.toAddresses&&e.mailNotification.toAddresses.address||"",n=e.mailNotification.ccAddresses&&e.mailNotification.ccAddresses.address||"",d=e.mailNotification.bccAddresses&&e.mailNotification.bccAddresses.address||"",l=e.mailNotification.subject||"",u=e.mailNotification.messageText||"";a&&!this.validateEmails(a)&&i.push({field:"to_suc",errorCode:"error.invalid.mailNotification.invalidEmailaddresses"}),n&&!this.validateEmails(n)&&i.push({field:"cc_suc",errorCode:"error.invalid.mailNotification.invalidEmailaddresses"}),d&&!this.validateEmails(d)&&i.push({field:"bcc_suc",errorCode:"error.invalid.mailNotification.invalidEmailaddresses"}),(a||l)&&(a||i.push({field:"to_suc",errorCode:"error.invalid.mailNotification.specify.oneaddresses"}),l||i.push({field:"subject_suc",errorCode:"report.scheduling.job.edit.specify.messagesubject"})),u&&(a||i.push({field:"to_suc",errorCode:"error.invalid.mailNotification.specify.oneaddresses"}),l||i.push({field:"subject_suc",errorCode:"report.scheduling.job.edit.specify.messagesubject"}))}if(e.alert){var p=e.alert.toAddresses&&e.alert.toAddresses.address||"",c=e.alert.subject||"";e.alert.messageText,e.alert.messageTextWhenJobFails;p&&!this.validateEmails(p)&&i.push({field:"job_status_to",errorCode:"error.invalid.mailNotification.invalidEmailaddresses"}),(p||c)&&(p||i.push({field:"job_status_to",errorCode:"error.invalid.mailNotification.specify.oneaddresses"}),c||i.push({field:"job_status_subject",errorCode:"report.scheduling.job.edit.specify.messagesubject"})),-1===e.alert.jobState.indexOf("SUCCESS_ONLY")&&-1===e.alert.jobState.indexOf("ALL")||(p||i.push({field:"job_status_to",errorCode:"error.invalid.mailNotification.specify.oneaddresses"}),c||i.push({field:"job_status_subject",errorCode:"report.scheduling.job.edit.specify.messagesubject"})),-1===e.alert.jobState.indexOf("FAIL_ONLY")&&-1===e.alert.jobState.indexOf("ALL")||(p||i.push({field:"job_status_to",errorCode:"error.invalid.mailNotification.specify.oneaddresses"}),c||i.push({field:"job_status_subject",errorCode:"report.scheduling.job.edit.specify.messagesubject"}))}return this.trigger("clearAllErrors"),i.length?this.trigger("invalid",i):this.trigger("valid",[]),i}},update:function(e,r){if("object"===i(r)){r=s.extend({},this.get(e),r);for(var t in r)r.hasOwnProperty(t)&&void 0===r[t]&&delete r[t]}this.set(e,r)},value:function(e){var r=this.attributes;e=e.split("/");for(var t=0,i=e.length-1;t<i;t++){if(!r)return;r=r[e[t]]}if(r)return r[e[e.length-1]]},sync:function(e,r,t){return"update"===e?e="create":"create"===e&&(e="update"),t||(t={}),t.contentType="application/job+json",t.beforeSend=function(e){e.setRequestHeader("Accept","application/job+json")},t.cache=!1,a.sync(e,r,t)},parse:function(e){if(e.trigger&&("simpleTrigger"in e.trigger?e.trigger.type="simpleTrigger":"calendarTrigger"in e.trigger&&(e.trigger.type="calendarTrigger"),e.trigger.type&&(s.extend(e.trigger,e.trigger[e.trigger.type]),delete e.trigger[e.trigger.type]),"simpleTrigger"===e.trigger.type&&null===e.trigger.recurrenceInterval?e.trigger.type="none":"simpleTrigger"===e.trigger.type?e.trigger.type="simple":"calendarTrigger"===e.trigger.type?e.trigger.type="calendar":e.trigger.type="none","none"===e.trigger.type&&(e.trigger.occurrenceCount=""),void 0===e.trigger.startType&&(e.trigger.startType=1),e.trigger.startDate&&(e.trigger.startDate=this.formatDate(e.trigger.startDate)),void 0!==e.trigger.timezone&&null!==e.trigger.timezone||(e.trigger.timezone=n.usersTimeZone||"America/Los_Angeles"),"simple"!==e.trigger.type&&"calendar"!==e.trigger.type||void 0!==e.trigger.calendarName&&null!==e.trigger.calendarName||(e.trigger.calendarName=""),void 0!==e.trigger.recurrenceInterval&&null!==e.trigger.recurrenceInterval||(e.trigger.recurrenceInterval=1),void 0!==e.trigger.recurrenceIntervalUnit&&null!==e.trigger.recurrenceIntervalUnit||(e.trigger.recurrenceIntervalUnit="DAY"),void 0!==e.trigger.occurrenceCount&&null!==e.trigger.occurrenceCount||(e.trigger.occurrenceCount=""),void 0===e.trigger.endDate||null===e.trigger.endDate?e.trigger.endDate="":e.trigger.endDate=this.formatDate(e.trigger.endDate),e.trigger.endDate?e.trigger.endDate&&(e.trigger.radioEndDate="specificDate",e.trigger.occurrenceCount=""):-1!=e.trigger.occurrenceCount&&e.trigger.occurrenceCount?e.trigger.radioEndDate="numberOfTimes":(e.trigger.radioEndDate="indefinitely",e.trigger.occurrenceCount=""),e.trigger.months||(e.trigger.months={}),s.isArray(e.trigger.months.month)||(e.trigger.months.month=[]),e.trigger.radioWhichMonth="everyMonth",0<e.trigger.months.month.length&&e.trigger.months.month.length<12?e.trigger.radioWhichMonth="selectedMonths":12==e.trigger.months.month.length&&(e.trigger.radioWhichMonth="everyMonth",e.trigger.months.month=[]),e.trigger.weekDays||(e.trigger.weekDays={}),s.isArray(e.trigger.weekDays.day)||(e.trigger.weekDays.day=[]),void 0===e.trigger.monthDays||null===e.trigger.monthDays?e.trigger.monthDays="":e.trigger.monthDays=e.trigger.monthDays.toString().replace(/ /g,"").replace(/,/g,", "),void 0!==e.trigger.daysType?"month"==e.trigger.daysType.toLowerCase()?(e.trigger.radioWhichDay="datesInMonth",e.trigger.weekDays.day=[]):"week"==e.trigger.daysType.toLowerCase()?(e.trigger.radioWhichDay="selectedDays",e.trigger.monthDays=""):(e.trigger.radioWhichDay="everyDay",e.trigger.weekDays.day=[],e.trigger.monthDays=""):0<e.trigger.weekDays.day.length&&e.trigger.weekDays.day.length<7?e.trigger.radioWhichDay="selectedDays":e.trigger.monthDays?e.trigger.radioWhichDay="datesInMonth":e.trigger.radioWhichDay="everyDay",void 0===e.trigger.hours||null===e.trigger.hours?e.trigger.hours="0":e.trigger.hours=e.trigger.hours.toString().replace(/ /g,"").replace(/,/g,", "),void 0===e.trigger.minutes||null===e.trigger.minutes?e.trigger.minutes="0":e.trigger.minutes=e.trigger.minutes.toString().replace(/ /g,"").replace(/,/g,", ")),void 0===e.repositoryDestination||null===e.repositoryDestination)e.repositoryDestination={overwriteFiles:!0,sequentialFilenames:!1,saveToRepository:!0,timestampPattern:"yyyyMMddHHmm",outputFTPInfo:{propertiesMap:{},type:"ftp",port:"21",implicit:!0,pbsz:0}};else{if(void 0===e.repositoryDestination.outputFTPInfo||null===e.repositoryDestination.outputFTPInfo)e.repositoryDestination.outputFTPInfo={};else{var r=e.repositoryDestination.outputFTPInfo;r.enabled=!!r.serverName&&!!r.userName,r.sshKeyEnabled=!!r.sshKey,r.enabled&&(e.repositoryDestination.outputFTPInfo.password=n.VALUE_SUBSTITUTION),r.sshKeyEnabled&&(e.repositoryDestination.outputFTPInfo.sshPassphrase=n.VALUE_SUBSTITUTION)}e.repositoryDestination.timestampPattern||(e.repositoryDestination.timestampPattern="yyyyMMddHHmm")}void 0!==e.repositoryDestination.outputFTPInfo.port&&null!==e.repositoryDestination.outputFTPInfo.port||(e.repositoryDestination.outputFTPInfo.port=this.ftpPortDefaults[e.repositoryDestination.outputFTPInfo.type]);if(e.mailNotification=e.mailNotification||{toAddresses:{address:""},ccAddresses:{address:""},bccAddresses:{address:""},subject:"",messageText:"",resultSendType:"SEND"},e.alert=e.alert||{toAddresses:{address:""},subject:"",messageText:"",messageTextWhenJobFails:"",jobState:"NONE"},void 0===e.mailNotification.resultSendType||null===e.mailNotification.resultSendType)e.mailNotification.resultSendType="SEND";else{var t=e.mailNotification.resultSendType;"SEND"!==t&&"SEND_ATTACHMENT"!==t&&"SEND_ATTACHMENT_NOZIP"!==t&&"SEND_EMBED"!==t&&"SEND_ATTACHMENT_ZIP_ALL"!==t&&"SEND_EMBED_ZIP_ALL_OTHERS"!==t&&(e.mailNotification.resultSendType="SEND")}var i,o=["toAddresses","ccAddresses","bccAddresses"];for(i=0;i<o.length;i++)void 0===e.mailNotification[o[i]]||null===e.mailNotification[o[i]]?e.mailNotification[o[i]]={address:""}:void 0!==e.mailNotification[o[i]].address&&null!==e.mailNotification[o[i]].address||(e.mailNotification[o[i]].address=""),s.isArray(e.mailNotification[o[i]].address)&&e.mailNotification[o[i]].address.length>0?e.mailNotification[o[i]].address=e.mailNotification[o[i]].address.join(", "):e.mailNotification[o[i]].address="";return e.mailNotification.toAddresses.address||(e.mailNotification={toAddresses:{address:""},ccAddresses:{address:""},bccAddresses:{address:""},subject:"",messageText:"",resultSendType:"SEND"}),void 0===e.alert.toAddresses||null===e.alert.toAddresses?e.alert.toAddresses={address:""}:void 0!==e.alert.toAddresses.address&&null!==e.alert.toAddresses.address||(e.alert.toAddresses.address=""),s.isArray(e.alert.toAddresses.address)&&e.alert.toAddresses.address.length>0?e.alert.toAddresses.address=e.alert.toAddresses.address.join(", "):e.alert={toAddresses:{address:""},subject:"",messageText:"",messageTextWhenJobFails:"",jobState:"NONE",includingReportJobInfo:!1,includingStackTrace:!1},e},toJSON:function(){var e=o.extend(!0,{},this.attributes),r={};if(e.trigger&&(e.trigger.startType=parseInt(e.trigger.startType,10),1===e.trigger.startType?e.trigger.startDate=null:e.trigger.startDate=g(e.trigger.startDate,v,!0).format("YYYY-MM-DD HH:mm"),"none"===e.trigger.type?(e.trigger.type="simpleTrigger",e.trigger.endDate=null,e.trigger.occurrenceCount=1,e.trigger.recurrenceInterval=null,e.trigger.recurrenceIntervalUnit=null,delete e.trigger.hours,delete e.trigger.minutes,delete e.trigger.months,delete e.trigger.daysType,delete e.trigger.weekDays,delete e.trigger.monthDays,delete e.trigger.calendarName):"simple"===e.trigger.type?(e.trigger.type="simpleTrigger","numberOfTimes"==e.trigger.radioEndDate&&(e.trigger.endDate=null),"specificDate"==e.trigger.radioEndDate&&(e.trigger.occurrenceCount=-1,e.trigger.endDate=g(e.trigger.endDate,v,!0).format("YYYY-MM-DD HH:mm")),"indefinitely"==e.trigger.radioEndDate&&(e.trigger.occurrenceCount=-1,e.trigger.endDate=null),e.trigger.recurrenceInterval=parseInt(e.trigger.recurrenceInterval,10),e.trigger.recurrenceIntervalUnit=e.trigger.recurrenceIntervalUnit.toUpperCase(),""===e.trigger.calendarName&&(e.trigger.calendarName=null),delete e.trigger.hours,delete e.trigger.minutes,delete e.trigger.months,delete e.trigger.daysType,delete e.trigger.weekDays,delete e.trigger.monthDays):"calendar"===e.trigger.type&&(e.trigger.type="calendarTrigger","everyMonth"===e.trigger.radioWhichMonth&&(e.trigger.months.month=[1,2,3,4,5,6,7,8,9,10,11,12]),"everyDay"===e.trigger.radioWhichDay||7==e.trigger.weekDays.day.length?(e.trigger.daysType="ALL",e.trigger.weekDays.day=[],e.trigger.monthDays=""):"selectedDays"===e.trigger.radioWhichDay?(e.trigger.daysType="WEEK",e.trigger.monthDays=""):"datesInMonth"===e.trigger.radioWhichDay&&(e.trigger.daysType="MONTH",e.trigger.weekDays.day=[]),e.trigger.monthDays=e.trigger.monthDays.replace(/ /g,""),""===e.trigger.endDate?delete e.trigger.endDate:e.trigger.endDate=g(e.trigger.endDate,v,!0).format("YYYY-MM-DD HH:mm"),e.trigger.hours=e.trigger.hours.replace(/ /g,""),e.trigger.minutes=e.trigger.minutes.replace(/ /g,""),""===e.trigger.calendarName&&(e.trigger.calendarName=null),delete e.trigger.occurrenceCount,delete e.trigger.recurrenceInterval,delete e.trigger.recurrenceIntervalUnit),delete e.trigger.radioEndDate,delete e.trigger.radioWhichMonth,delete e.trigger.radioWhichDay,e.trigger&&e.trigger.type&&(r[e.trigger.type]=e.trigger,delete r[e.trigger.type].type,e.trigger=r)),e.repositoryDestination&&(e.repositoryDestination.outputFTPInfo&&(e.repositoryDestination.outputFTPInfo.enabled||(e.repositoryDestination.outputFTPInfo={type:"ftp",port:21,folderPath:null,password:null,propertiesMap:{},serverName:null,userName:null,sshKey:null,sshPassphrase:null}),e.repositoryDestination.outputFTPInfo.password===n.VALUE_SUBSTITUTION&&delete e.repositoryDestination.outputFTPInfo.password,"sftp"===e.repositoryDestination.outputFTPInfo.type&&e.repositoryDestination.outputFTPInfo.sshKeyEnabled?e.repositoryDestination.outputFTPInfo.sshPassphrase===n.VALUE_SUBSTITUTION&&delete e.repositoryDestination.outputFTPInfo.sshPassphrase:(delete e.repositoryDestination.outputFTPInfo.sshKey,delete e.repositoryDestination.outputFTPInfo.sshPassphrase),"enabled"in e.repositoryDestination.outputFTPInfo&&delete e.repositoryDestination.outputFTPInfo.enabled,"sshKeyEnabled"in e.repositoryDestination.outputFTPInfo&&delete e.repositoryDestination.outputFTPInfo.sshKeyEnabled),e.repositoryDestination.sequentialFilenames||(e.repositoryDestination.timestampPattern=null)),e.mailNotification){var t,i=["toAddresses","ccAddresses","bccAddresses"];for(t=0;t<i.length;t++)if(e.mailNotification[i[t]]&&void 0!==e.mailNotification[i[t]].address){if(!e.mailNotification[i[t]].address){delete e.mailNotification[i[t]];continue}e.mailNotification[i[t]].address=e.mailNotification[i[t]].address.replace(/ /g,"").split(",")}e.mailNotification.toAddresses&&void 0!==e.mailNotification.toAddresses.address||delete e.mailNotification}return e.alert&&(e.alert.toAddresses&&void 0!==e.alert.toAddresses.address&&(e.alert.toAddresses.address?e.alert.toAddresses.address=e.alert.toAddresses.address.replace(/ /g,"").split(","):delete e.alert.toAddresses.address),e.alert.toAddresses&&void 0!==e.alert.toAddresses.address||delete e.alert),e},state:function(e){var r={jobId:[this.id],toJSON:function(){return this},trigger:function(){return this}};return this.get("state").value=e?u.NORMAL:u.PAUSED,this.trigger("change"),a.sync.call(this,"update",r,{url:n.contextPath+"/rest_v2/jobs/"+(e?"resume":"pause"),type:"POST"})},loadParameters:function(e){e=e||this.get("source").reportUnitURI;var r=this,t=n.contextPath+"/rest_v2/reports"+encodeURI(e)+"/inputControls/";return a.sync.call(this,"read",new a.Model,{url:t,type:"GET"}).done(function(e){if(e&&e.inputControl){for(var t={},i=e.inputControl,o=0;o<i.length;o++)t[i[o].id]=null;r.update("source",{parameters:{parameterValues:t}})}else r.trigger("failedToGet_IC")}).fail(function(){r.trigger("failedToGet_IC")})},checkSaveValidation:function(e){e=e||{};var r=o.Deferred(),t=0,i=function(){3===++t&&r.resolve()},s=function(){r.reject()};return this.testDates(e.editMode).done(i).fail(s),this.validateParametersIC().done(i).fail(s),this.testOutputHostFileSystemFolder().done(i).fail(s),r},testDates:function(e){var r=[],t=o.Deferred(),i=this.attributes.trigger;return!e&&2==i.startType&&i.startDate&&this.ifPastDate(i.startDate,i.timezone)&&r.push({field:"startDate",errorCode:"error.before.current.date.trigger.startDate"}),"simple"===i.type&&"specificDate"===i.radioEndDate&&i.endDate&&this.ifPastDate(i.endDate,i.timezone)?r.push({field:"simpleEndDate",errorCode:"error.before.current.date.trigger.endDate"}):"calendar"===i.type&&i.endDate&&this.ifPastDate(i.endDate,i.timezone)&&r.push({field:"calendarEndDate",errorCode:"error.before.current.date.trigger.endDate"}),r.length?(this.trigger("invalid",r,{switchToErrors:!0}),t.reject()):t.resolve()},testFTPConnection:function(e){if(f)return void("function"==typeof e&&e());var r=this.get("repositoryDestination");if(!(r&&r.outputFTPInfo&&r.outputFTPInfo.enabled))return void("function"==typeof e&&e());r=r.outputFTPInfo;var t=this,i={host:r.serverName,userName:r.userName,folderPath:r.folderPath,type:r.type,protocol:r.protocol,port:r.port,implicit:r.implicit,prot:r.prot,pbsz:r.pbsz,toJSON:function(){return this},trigger:function(){return this}};return this.get("id")&&(i.holder="job:"+this.get("id")),r.password!==n.VALUE_SUBSTITUTION&&(i.password=r.password),"sftp"===r.type&&r.sshKeyEnabled&&(i.sshKey=r.sshKey,r.sshPassphrase!==n.VALUE_SUBSTITUTION&&(i.sshPassphrase=r.sshPassphrase)),f=!0,o("#ftpTestButton").addClass("checking"),o("[data-field=ftpTest]").text(""),a.sync.call(this,"update",i,{url:n.contextPath+"/rest_v2/connections",contentType:"application/connections.ftp+json",headers:{Accept:"application/json"},type:"POST",success:function(r,i){f=!1,o("#ftpTestButton").removeClass("checking"),t.trigger("valid",[{field:"ftpTest",errorCode:"report.scheduling.connection.passed"}]),"function"==typeof e&&e(void 0)},error:function(r){f=!1,o("#ftpTestButton").removeClass("checking"),t.trigger("invalid",[{field:"ftpTest",errorCode:"report.scheduling.connection.failed"}]),"function"==typeof e&&e(r)}})},validateParametersIC:function(){var e=this,r=o.Deferred();return this.get("source")&&this.get("source").parameters?(this.controlsController.validate().then(function(t){t?r.resolve():(e.trigger("invalid",[{field:"parametersErrorNotifierStub",errorCode:"report.scheduling.list.state.5"}],{switchToErrors:!0}),r.reject())}),r):r.resolve()},runServerValidationRequests:function(){var e=o.Deferred(),r=0,t=function(){2===++r&&e.resolve()},i=function(r){e.reject(r)};return this.testOutputRepositoryFolder().done(t).fail(i),this.testSshKey().done(t).fail(i),e},testSshKey:function(){var e=o.Deferred(),r=this.get("repositoryDestination")?this.get("repositoryDestination").outputFTPInfo:null;if(!r||!r.enabled||!r.sshKeyEnabled)return e.resolve();var t=r.sshKey;return t&&""!==t&&this.isValidUri(t)?s.isUndefined(m[t])?(this.resource("file",t,function(r,i){r?(m[t]={field:"sshKey",errorCode:"error.report.job.report.inexistent.sshKey",errorArguments:[t]},e.reject(m[t])):(m[t]={},e.resolve())}),e):m[t].errorCode?e.reject(m[t]):e.resolve():e.resolve()},testOutputRepositoryFolder:function(){var e=o.Deferred();if(!this.get("repositoryDestination"))return e.resolve();if(!this.get("repositoryDestination").saveToRepository)return e.resolve();var r=this.get("repositoryDestination").folderURI;return r&&""!==r?this.isValidUri(r)?s.isUndefined(h[r])?(this.checkPermissionOnFolder(r,function(t,i){var o=null;t?o="error.report.job.report.inexistent.output":1!==i&&30!==i&&6!==i&&(o="error.report.job.output.folder.notwriteable"),o?(h[r]={field:"outputRepository",errorCode:o,errorArguments:[r]},e.reject(h[r])):(h[r]={},e.resolve())}),e):h[r].errorCode?e.reject(h[r]):e.resolve():e.reject({field:"outputRepository",errorCode:"error.report.job.invalid.chars.folderURI"}):e.reject({field:"outputRepository",errorCode:"error.not.empty.folder"})},testOutputHostFileSystemFolder:function(){var e=this,r=o.Deferred();if("false"===n.enableSaveToHostFS||!1===n.enableSaveToHostFS)return r.resolve();if(!this.get("repositoryDestination"))return r.resolve();var t=this.get("repositoryDestination").outputLocalFolder;if(s.isUndefined(t)||null===t)return r.resolve();if(!t)return this.trigger("invalid",[{field:"outputHostFileSystem",errorCode:"report.scheduling.output.localhostpath"}],{switchToErrors:!0}),r.reject();var i={path:this.get("repositoryDestination").outputLocalFolder,toJSON:function(){return this},trigger:function(){return this}};return a.sync.call(this,"update",i,{url:n.contextPath+"/rest_v2/connections",contentType:"application/connections.lfs+json",type:"POST",headers:{Accept:"application/json"}}).done(function(){r.resolve()}).fail(function(){e.trigger("invalid",[{field:"outputHostFileSystem",errorCode:"report.scheduling.output.localhostpath"}],{switchToErrors:!0}),r.reject()}),r},checkPermissionOnFolder:function(e,r){return a.sync.call(this,"read",new a.Model,{url:n.contextPath+"/rest_v2/resources"+e,headers:{Accept:"application/repository.folder+json"},type:"GET",success:function(e,t){"function"==typeof r&&r(void 0,e.permissionMask)},error:function(e){try{e=JSON.parse(e.responseText)}catch(e){}"function"==typeof r&&r(e)}})},resource:function(e,r,t){return a.sync.call(this,"read",new a.Model,{url:n.contextPath+"/rest_v2/resources"+r,headers:{Accept:"application/repository."+e+"+json"},type:"GET",success:function(e,r){"function"==typeof t&&t(void 0,e)},error:function(e){"function"==typeof t&&t(e)}})},parseUri:function(e){var r;return"/"!==e[0]&&(e="/"+e),e&&(r=e.match(/^(.*)\/([^\/]+)$/))?(""===r[1]&&(r[1]="/"),{full:r[0],folder:r[1],file:r[2]}):{}},createFromUri:function(e){this.trigger("clearAllErrors"),this.clear({silent:!0}),e=this.parseUri(e);var r=s.extend({},n.reportJobEditorDefaults);this.set(this.parse({baseOutputFilename:e.file,outputFormats:{outputFormat:["PDF"]},source:{reportUnitURI:e.full},trigger:{timezone:n.usersTimeZone||"America/Los_Angeles"},outputTimeZone:n.usersTimeZone||"America/Los_Angeles",repositoryDestination:{overwriteFiles:!0,sequentialFilenames:!1,folderURI:void 0===r["scheduler.job.repositoryDestination.folderURI"]?e.folder:r["scheduler.job.repositoryDestination.folderURI"],saveToRepository:!0,timestampPattern:"yyyyMMddHHmm",outputFTPInfo:{propertiesMap:{},type:"ftp",port:"21",implicit:!0,pbsz:0}}}))},formatDate:function(e){return e?g(e,"YYYY-MM-DD HH:mm").format(v):""},parseIntervals:function(e,r){if(!(e=e||!1))return!1;e=e.replace(/ /g,"");var t,i,o,s=e.split(","),a=[],n={};1==s.length&&(s=e.split("/"));var d=1,l=31;if("hours"===r&&(d=0,l=23),"minutes"===r&&(d=0,l=59),s.length<1)return!1;for(t=0;t<s.length;t++)if(-1!==s[t].indexOf("-")){if(o=s[t].split("-"),!this.isNumeric(o[0],{allowZero:!0}))return!1;if(!this.isNumeric(o[1],{allowZero:!0}))return!1;if(o[0]=parseInt(o[0],10),o[1]=parseInt(o[1],10),!(d<=o[0]&&o[0]<=l))return!1;if(!(d<=o[1]&&o[1]<=l))return!1;if(o[0]>=o[1])return!1;for(i=o[0];i<=o[1];i++)void 0===n[i]&&(a.push(i),n[i]=1)}else{if(!this.isNumeric(s[t],{allowZero:!0}))return!1;if(s[t]=parseInt(s[t],10),!(d<=s[t]&&s[t]<=l))return!1;void 0===n[s[t]]&&(a.push(s[t]),n[s[t]]=1)}return a},ifPastDate:function(e,r){if(!e||!r)return!1;var t,i,o,s;return t=c(r),i=g().utcOffset()/60,o=i-t,s=+g().format("X"),+g(e,v,!0).add(1,"minute").format("X")+3600*o<s},isHostName:function(e){return!!e&&/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/.test(e)},isEmail:function(e){return!!e&&new l(d.emailRegExpPattern,"g").test(e)},isValidFileName:function(e){return!!e&&!new RegExp(d.resourceIdNotSupportedSymbols,"g").test(e)},isValidUri:function(e){return!!e&&!new RegExp(d.resourceIdNotSupportedSymbols,"g").test(e.replace(/\//g,""))},validateEmails:function(e){if(!e)return!1;e=e.split(new RegExp(" *, *"));for(var r=0;r<e.length;r++)if(!this.isEmail(e[r]))return!1;return!0},isNumeric:function(e,r){var t;if(!e)return!1;if(r=r||{},r.allowNegative=r.allowNegative||!1,r.allowZero=r.allowZero||!1,r.maxValue=r.maxValue||!1,r.minValue=r.minValue||!1,"string"==typeof e){if(e.match(/\D/))return!1;if(t=parseInt(e,10),s.isNaN(t))return!1}return!(!1===r.allowNegative&&t<0)&&((!1!==r.allowZero||0!==t)&&(!(r.maxValue&&r.maxValue<t)&&!(r.minValue&&t<r.minValue)))}})});