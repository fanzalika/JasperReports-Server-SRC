define(["require","exports","module","inputControl/collection/InputControlCollection","inputControl/view/InputControlCollectionView","logger"],function(o,t,n){"use strict";var e=o("inputControl/collection/InputControlCollection"),i=o("inputControl/view/InputControlCollectionView"),r=o("logger").register(n),l=new e([],{contextPath:"http://localhost:8080/jasperserver-pro",resourceUri:"/organizations/organization_1/adhoc/topics/Cascading_multi_select_topic",container:"#inputControlsContainer"}),c=new i({collection:l});l.fetch(),r.debug("init returned: ",l,c)});