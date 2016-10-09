/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var KT_focusedEl=null;
KT_validateSingle=function(_964,_965){
var _966=_964.charCodeAt(0);
switch(_965){
case "9":
if(_966<58&&_966>47){
return true;
}
break;
case "A":
if((_966<91&&_966>64)||(_966<123&&_966>96)){
return true;
}
break;
case "X":
if((_966<91&&_966>64)||(_966<123&&_966>96)||(_966<58&&_966>47)){
return true;
}
break;
case "?":
return true;
break;
default:
return true;
break;
}
};
KT_maskDefaultValue=function(_967){
switch(_967){
case "9":
return "0";
break;
case "A":
return "a";
break;
case "X":
return "0";
break;
case "?":
return "0";
break;
default:
return "0";
break;
}
};
KT_isSpecialChar=function(_968){
if(_968=="9"||_968=="A"||_968=="X"||_968=="?"){
return true;
}else{
return false;
}
};
mask_onValueChanged=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(KT_focusedEl==null||KT_focusedEl.mask==null||KT_focusedEl.mask==""){
return;
}
var mask=KT_focusedEl.mask;
var val=KT_focusedEl.value;
var i=0;
var _96c=false;
if(val==KT_focusedEl.oldText){
return;
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_96c=true;
}
for(;i<mask.length;i++){
if(val.charCodeAt(i).toString()!="NaN"){
if(KT_isSpecialChar(mask.charAt(i))){
if(KT_validateSingle(val.charAt(i),mask.charAt(i))){
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
break;
}
}else{
if(val.charAt(i)!=mask.charAt(i)){
if(i==val.length-1){
var _96d=val.substr(val.length-1,val.length);
val=val.substr(0,val.length-1)+mask.charAt(i)+_96d;
_96c=true;
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
}
break;
}
}
}else{
if(val.length<KT_focusedEl.oldText.length){
break;
}
for(;i<mask.length;i++){
if(!KT_isSpecialChar(mask.charAt(i))){
val+=mask.charAt(i);
_96c=true;
}else{
break;
}
}
break;
}
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_96c=true;
}
if(KT_focusedEl.value!=val){
KT_focusedEl.value=val;
}
KT_focusedEl.oldText=val;
if(_96c){
}
};
mask_parseFirstTime=function(_96e,mask){
var _970="";
var _971="";
cond=1;
imask=0;
ival=0;
cnt=0;
while(cond==1){
cond=1;
if(!KT_isSpecialChar(mask.charAt(imask))){
if(_96e.charCodeAt(ival).toString()!="NaN"){
if(mask.charAt(imask)==_96e.charAt(ival)){
imask++;
ival++;
}else{
_96e=_96e.substr(0,ival)+mask.charAt(imask)+_96e.substr(ival,_96e.length);
imask=0;
ival=0;
cond=1;
}
}else{
_96e+=KT_maskDefaultValue(mask.charAt(imask));
}
}else{
imask++;
ival++;
}
if(imask>=mask.length||ival>=_96e.length){
cond=0;
}
}
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_970+=mask.charAt(i);
if(_96e.charCodeAt(i).toString()!="NaN"){
_971+=_96e.charAt(i);
}else{
_971+=KT_maskDefaultValue(mask.charAt(i));
}
}
}
oldvalue=_96e;
_96e=_971;
var _972="";
for(i=0;i<_970.length;i++){
if(!KT_validateSingle(_96e.charAt(i),_970.charAt(i))){
_972+=KT_maskDefaultValue(_970.charAt(i));
}else{
_972+=_96e.charAt(i);
}
}
var _973="";
var j=0;
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_973+=_972.charAt(j++);
}else{
_973+=mask.charAt(i);
}
}
return _973;
};
mask_onSetFocus=function(obj,mask){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(typeof obj.mask=="undefined"){
ret="";
if(obj.value!=""){
ret=mask_parseFirstTime(obj.value,mask);
}
obj.value=ret;
obj.mask=mask;
}
KT_focusedEl=obj;
if(typeof KT_focusedEl.oldText=="undefined"){
KT_focusedEl.oldText=obj.value;
mask_onValueChanged();
}
};
mask_onKillFocus=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
mask_onValueChanged();
KT_focusedEl=null;
};
