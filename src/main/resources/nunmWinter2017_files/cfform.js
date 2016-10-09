/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var _CF_error_messages=new Array();
var _CF_error_fields=new Object();
var _CF_FirstErrorField=null;
var _CF_submit_status=new Array();
_CF_signalLoad=function(){
_CF_loaded=1;
};
_CF_onError=function(_913,_914,_915,_916){
if(_CF_error_fields[_914]==null){
if(_CF_FirstErrorField==null){
_CF_FirstErrorField=_914;
}
_CF_error_exists=true;
_CF_error_fields[_914]=_916;
_CF_error_messages[_CF_error_messages.length]=_916;
}
};
_CF_onErrorAlert=function(_917){
var _918="";
for(var i=0;i<_917.length;i++){
_918+=_917[i]+"\n";
}
alert(_918);
return false;
};
updateHiddenValue=function(val,form,name){
if(form==null||form==""){
form=0;
}
if(document.forms[form]==null||document.forms[form][name]==null){
return;
}
document.forms[form][name].value=val;
};
_CF_hasValue=function(obj,_91e,_91f){
if(_91e=="TEXT"||_91e=="FILE"||_91e=="PASSWORD"||_91e=="CFTEXTAREA"||_91e=="TEXTAREA"||_91e=="CFTEXTINPUT"||_91e=="DATEFIELD"){
if(obj.value.length==0){
return false;
}else{
if(_91f){
str=obj.value.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
}
return true;
}else{
if(_91e=="SELECT"){
for(i=0;i<obj.length;i++){
if(obj.options[i].selected&&obj.options[i].value.length>0){
return true;
}
}
return false;
}else{
if(_91e=="SINGLE_VALUE_RADIO"||_91e=="SINGLE_VALUE_CHECKBOX"){
if(obj.checked){
return true;
}else{
return false;
}
}else{
if(_91e=="RADIO"||_91e=="CHECKBOX"){
if(obj.length==undefined&&obj.checked){
return true;
}else{
for(i=0;i<obj.length;i++){
if(obj[i].checked){
return true;
}
}
}
return false;
}else{
if(_91e=="CFTREE"){
if(obj["value"].length>0){
return true;
}else{
return false;
}
}else{
if(_91e=="RICHTEXT"){
var _920=FCKeditorAPI.GetInstance(obj.id);
var val=_920.GetXHTML();
if(val.length==0){
return false;
}else{
if(_91f){
str=val.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
return true;
}
}else{
return true;
}
}
}
}
}
}
};
_CF_checkdate=function(_922,_923){
_922=_922.replace(/^\s+/,"").replace(/\s+$/,"");
_922=_922=_922.replace(/{d \'/,"").replace(/'}/,"");
if(_923){
if(_922.length==0){
return false;
}
}else{
if(_922.length==0){
return true;
}
}
if(_922.length==0){
return true;
}
isplit=_922.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_922.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_922.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_922.length){
return false;
}
var _924=_922.substring(0,isplit);
if(_924.length==4){
sYear=_922.substring(0,isplit);
isplit=_922.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_922.length){
return false;
}
sMonth=_922.substring((sYear.length+1),isplit);
sDay=_922.substring(isplit+1);
}else{
sMonth=_922.substring(0,isplit);
isplit=_922.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_922.length){
return false;
}
sDay=_922.substring((sMonth.length+1),isplit);
sYear=_922.substring(isplit+1);
}
if((sDay.length==0)||(sMonth.length==0)||(sYear.length==0)){
return false;
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(sYear.length!=1&&sYear.length!=2&&sYear.length!=4){
return false;
}else{
if(!_CF_checkrange(sYear,0,9999)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
}
};
_CF_checkeurodate=function(_925,_926){
_925=_925.replace(/^\s+/,"").replace(/\s+$/,"");
_925=_925=_925.replace(/{d \'/,"").replace(/'}/,"");
if(_926){
if(_925.length==0){
return false;
}
}else{
if(_925.length==0){
return true;
}
}
isplit=_925.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_925.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_925.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_925.length){
return false;
}
var _927=_925.substring(0,isplit);
if(_927.length==4){
sYear=_925.substring(0,isplit);
isplit=_925.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_925.length){
return false;
}
sMonth=_925.substring((sYear.length+1),isplit);
sDay=_925.substring(isplit+1);
}else{
sDay=_925.substring(0,isplit);
isplit=_925.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_925.length){
return false;
}
sMonth=_925.substring((sDay.length+1),isplit);
sYear=_925.substring(isplit+1);
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(!_CF_checkrange(sYear,0,null)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
};
_CF_checkday=function(_928,_929,_92a){
maxDay=31;
if(_929==4||_929==6||_929==9||_929==11){
maxDay=30;
}else{
if(_929==2){
if(_928%4>0){
maxDay=28;
}else{
if(_928%100==0&&_928%400>0){
maxDay=28;
}else{
maxDay=29;
}
}
}
}
return _CF_checkrange(_92a,1,maxDay);
};
_CF_checkinteger=function(_92b,_92c,_92d){
_92b=_92b.replace(/^\s+/,"").replace(/\s+$/,"");
if(!_92d){
_92b=_92b.replace(/[$£¥€,~+]?/g,"");
}
if(_92c){
if(_92b.length==0){
return false;
}
}else{
if(_92b.length==0){
return true;
}
}
var _92e=".";
var _92f=_92b.indexOf(_92e);
if(_92f==-1){
return _CF_checknumber(_92b,_92c,_92d);
}else{
return false;
}
};
_CF_numberrange=function(_930,_931,_932,_933){
if(_933){
if(_930.length==0){
return false;
}
}else{
if(_930.length==0){
return true;
}
}
if(_931!=null){
if(_930<_931){
return false;
}
}
if(_932!=null){
if(_930>_932){
return false;
}
}
return true;
};
_CF_checknumber=function(_934,_935,_936){
var _937=" .+-0123456789";
var _938=" .0123456789";
var _939;
var _93a=false;
var _93b=false;
var _93c=false;
_934=_934.replace(/^\s+/,"").replace(/\s+$/,"");
if(!_936){
_934=_934.replace(/[$£¥€,~+]?/g,"");
}
if(_935){
if(_934.length==0){
return false;
}
}else{
if(_934.length==0){
return true;
}
}
_939=_937.indexOf(_934.charAt(0));
if(_939==1){
_93a=true;
}else{
if(_939<1){
return false;
}
}
for(var i=1;i<_934.length;i++){
_939=_938.indexOf(_934.charAt(i));
if(_939<0){
return false;
}else{
if(_939==1){
if(_93a){
return false;
}else{
_93a=true;
}
}else{
if(_939==0){
if(_93a||_93c){
_93b=true;
}
}else{
if(_93b){
return false;
}else{
_93c=true;
}
}
}
}
}
return true;
};
_CF_checkrange=function(_93e,_93f,_940,_941){
_93e=_93e.replace(/^\s+/,"").replace(/\s+$/,"");
if(_941){
if(_93e.length==0){
return false;
}
}else{
if(_93e.length==0){
return true;
}
}
if(!_CF_checknumber(_93e)){
return false;
}else{
return (_CF_numberrange((eval(_93e)),_93f,_940));
}
return true;
};
_CF_checktime=function(_942,_943){
_942=_942.replace(/^\s+/,"").replace(/\s+$/,"");
_942=_942.replace(/\s+:\s+/,":");
_942=_942=_942.replace(/{t \'/,"").replace(/'}/,"");
if(_943){
if(_942.length==0){
return false;
}
}else{
if(_942.length==0){
return true;
}
}
var _944=_CF_checkregex(_942,/^((([0-1]?\d)|(2[0-3])):[0-5]?\d)?(:[0-5]?\d)? ?([AP]M|[AP]m|[ap]m|[ap]M)?$/,_943);
return _944;
};
_CF_checkphone=function(_945,_946){
_945=_945.replace(/^\s+/,"").replace(/\s+$/,"");
if(_946){
if(_945.length==0){
return false;
}
}else{
if(_945.length==0){
return true;
}
}
if(_945.length==0){
return true;
}
return _CF_checkregex(_945,/^(((1))?[ ,\-,\.]?([\\(]?([1-9][0-9]{2})[\\)]?))?[ ,\-,\.]?([^0-1]){1}([0-9]){2}[ ,\-,\.]?([0-9]){4}(( )((x){0,1}([0-9]){1,5}){0,1})?$/,_946);
};
_CF_checkzip=function(_947,_948){
_947=_947.replace(/^\s+/,"").replace(/\s+$/,"");
if(_948){
if(_947.length==0){
return false;
}
}else{
if(_947.length==0){
return true;
}
}
return _CF_checkregex(_947,/^([0-9]){5,5}$|(([0-9]){5,5}(-| ){1}([0-9]){4,4}$)/,_948);
};
_CF_checkcreditcard=function(_949,_94a){
_949=_949.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94a){
if(_949.length==0){
return false;
}
}else{
if(_949.length==0){
return true;
}
}
if(_949.length==0){
return true;
}
var _94b=" -";
var _94c="";
var _94d;
for(var i=0;i<_949.length;i++){
_94d=_94b.indexOf(_949.charAt(i));
if(_94d<0){
_94c+=_949.substring(i,(i+1));
}
}
if(_94c.length<13||_94c.length>19){
return false;
}
if(_94c.charAt(0)=="+"){
return false;
}
if(!_CF_checkinteger(_94c)){
return false;
}
var _94f=_94c.length%2==1?false:true;
var _950=0;
var _951;
for(var i=0;i<_94c.length;i++){
_951=eval(_94c.charAt(i));
if(_94f){
_951*=2;
_950+=(_951%10);
if((_951/10)>=1){
_950++;
}
_94f=false;
}else{
_950+=_951;
_94f=true;
}
}
return (_950%10)==0?true:false;
};
_CF_checkssn=function(_952,_953){
_952=_952.replace(/^\s+/,"").replace(/\s+$/,"");
if(_953){
if(_952.length==0){
return false;
}
}else{
if(_952.length==0){
return true;
}
}
return _CF_checkregex(_952,/^[0-9]{3}(-| )[0-9]{2}(-| )[0-9]{4}$/,_953);
};
_CF_checkEmail=function(_954,_955){
_954=_954.replace(/^\s+/,"").replace(/\s+$/,"");
if(_955){
if(_954.length==0){
return false;
}
}else{
if(_954.length==0){
return true;
}
}
return _CF_checkregex(_954,/^[a-zA-Z_0-9-'\+~]+(\.[a-zA-Z_0-9-'\+~]+)*@([a-zA-Z_0-9-]+\.)+[a-zA-Z]{2,7}$/,_955);
};
_CF_checkURL=function(_956,_957){
_956=_956.replace(/^\s+/,"").replace(/\s+$/,"");
if(_957){
if(_956.length==0){
return false;
}
}else{
if(_956.length==0){
return true;
}
}
return _CF_checkregex(_956.toLowerCase(),/^((http|https|ftp|file)\:\/\/([a-zA-Z0-0]*:[a-zA-Z0-0]*(@))?[a-zA-Z0-9-\.]+(\.[a-zA-Z]{2,3})?(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9-\._\?\,\'\/\+&amp;%\$#\=~])*)|((mailto)\:[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,7})|((news)\:[a-zA-Z0-9\.]*)$/,_957);
};
_CF_checkUUID=function(_958,_959){
_958=_958.replace(/^\s+/,"").replace(/\s+$/,"");
if(_959){
if(_958.length==0){
return false;
}
}else{
if(_958.length==0){
return true;
}
}
return _CF_checkregex(_958,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{16,16}/,_959);
};
_CF_checkGUID=function(_95a,_95b){
_95a=_95a.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95b){
if(_95a.length==0){
return false;
}
}else{
if(_95a.length==0){
return true;
}
}
return _CF_checkregex(_95a,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{12,12}/,_95b);
};
_CF_checkBoolean=function(_95c,_95d){
_95c=_95c.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95d){
if(_95c.length==0){
return false;
}
}else{
if(_95c.length==0){
return true;
}
}
if(_95c.toUpperCase()=="TRUE"||_95c.toUpperCase()=="YES"||(_CF_checknumber(_95c)&&_95c!="0")){
return true;
}else{
if(_95c.toUpperCase()=="FALSE"||_95c.toUpperCase()=="NO"||_95c=="0"){
return true;
}else{
return false;
}
}
};
_CF_setFormParam=function(_95e,_95f,_960){
var _961="document['"+_95e+"']['"+_95f+"']";
var obj=eval(_961);
if(obj==undefined){
return false;
}else{
obj.value=_960;
return true;
}
};
_CF_checkregex=function(_963,_964,_965){
if(_965){
if(_963.length==0){
return false;
}
}else{
if(_963.length==0){
return true;
}
}
return _964.test(_963);
};
