if(typeof String.prototype.trim!=='function'){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'')}}var iPerceptions=iPerceptions||{};iPerceptions.ipEngine={url:"//ips-invite.iperceptions.com/wUniversal.aspx?sdfc=095904e8-{0}-fb330c52-9ae4-4a44-a31d-b80f2c680ca0&lID={1}&source=91787&visitorID=[ipe_v]&sessionID=[ipe_s]&device=[device]",device:"",culture:"",langId:0,pageViewed:0,launch:function(ipDef,dv,ct,visit,sId,key){"use strict";var wrapper=iPerceptions.Wrapper;var i,j,invites,invite,trigger,rate,expires,visitorId=visit.visitors[visit.visitors.length-1].id;if(ipDef===undefined||ipDef===null){}try{this.device=dv.toLowerCase();this.culture=ct;this.pageViewed=wrapper.getPageViewed();invites=ipDef.Invites;for(i=0;i<invites.length;i+=1){invite=invites[i];if(invite.CustomScript&&invite.CustomScript.length>0){eval(invite.CustomScript)}invite.ProjectInviteTriggers=this.shuffleObject(invite.ProjectInviteTriggers);if(invite.TemplateId===-10&&this.evaluateInvite(invite)){wrapper.injectJs("Iperceptions_"+invite.ProjectId.toString(),invite.CommentCardUrl,null,function(){var ipe={langID:langId};ipeCC[0].ipeIcon(ipe)})}}invites=this.reinvite(invites,visit.history);invites=wrapper.getIframeSessionStorage("ipe."+wrapper.companyId+".winning",invites)}catch(e){}},displayInvite:function(invites,ipDef,dv,ct,visit,sId,key){var wrapper=iPerceptions.Wrapper;var i,j,invite,trigger,rate,expires,visitorId=visit.visitors[visit.visitors.length-1].id;invites=this.shuffleObject(invites);for(i=0;i<invites.length;i+=1){invite=invites[i];for(j=0;j<invite.ProjectInviteTriggers.length;j+=1){trigger=invite.ProjectInviteTriggers[j];var disp=wrapper.getCookie('IPE_DISP_'+invite.ProjectId);var m=wrapper.getCookie('IPE_M_'+invite.ProjectId);if((disp==='1'&&m==='1')||this.evaluateTrigger(trigger)===true){wrapper.injectJs("Iperceptions_invite",this.url.replace("{0}",invite.ProjectId).replace("{1}",trigger.LanguageId).replace("[ipe_v]",visitorId).replace("[ipe_s]",sId).replace("[device]",dv),null,function(id,response){if(disp!=='1'||m!=='1'){expires=iPerceptions.ipEngine.setreinvite(invite,visit.history);iPerceptions.Wrapper.updateVisit(visit,expires)}});return}}}expires=new Date();expires.setFullYear(expires.getFullYear()+1);wrapper.updateVisit(visit,expires)},reinvite:function(def,ivs){var r=[],result=[],i,j,date,date1=new Date();for(i=0;i<def.length;i+=1){var disp=iPerceptions.Wrapper.getCookie('IPE_DISP_'+def[i].ProjectId);var m=iPerceptions.Wrapper.getCookie('IPE_M_'+def[i].ProjectId);if(disp==='1'&&m==='1'){result.push(def[i]);return result}if(def[i].TemplateId!=-10){r.push(def[i])}}date1.setYear(date1.getYear()-1);for(i=0;i<ivs.length;i+=1){var found=null;date=new Date(ivs[i].date);date1=date>date1?date:date1;for(j=0;j<r.length&&found===null;j+=1){if(r[j].ProjectId===ivs[i].id){found=j}}if(found!==null&&found!==undefined){date.setDate(date.getDate()+def[found].ReInviteProject);if(date>new Date()){r.splice(found,1)}}}for(i=0;i<r.length;i+=1){date=new Date(this.getString(date1));date.setDate(date.getDate()+r[i].ReInviteOtherProject);if(date<=new Date()||(disp==='1'&&m==='1')){result.push(r[i])}}return result},setreinvite:function(invite,ivs){var date=new Date(),reinvite,i,j=null,lastDate;lastDate=date;reinvite=this.getString(date);for(i=0;i<ivs.length;i+=1){if(ivs[i].id===invite.ProjectId){j=i}date=new Date(ivs[i].date);date.setDate(date.getDate()+ivs[i].ReInviteProject);lastDate=lastDate<date?date:lastDate}if(j!==null){ivs[j].date=reinvite}else{ivs.push({id:invite.ProjectId,date:reinvite,host:location.host})}return lastDate},evaluateRate:function(ivs,winnings,ipDef,dv,ct,visit,sId,key){var w=iPerceptions.Wrapper,result=[];if((winnings!=undefined||winnings!=null)&&winnings.length>0){winnings=JSON.parse(winnings)}else{winnings=[]}if(!(winnings instanceof Array)){winnings=[]}var initialwinnings=[];for(var i=0;i<ivs.length;i++){var invite=ivs[i];var r=[];for(j=0;j<invite.ProjectInviteTriggers.length;j+=1){trigger=invite.ProjectInviteTriggers[j];if(trigger.InviteTypeId===2)continue;if(winnings.indexOf(trigger.Id)!==-1){r.push(trigger);continue}if(winnings.length===0){rate=this.device==='tablet'?trigger.TabletRate:(this.device==='mobile'?trigger.MobileRate:trigger.DesktopRate);var diceroll=Math.random()*100;if(diceroll<rate){initialwinnings.push(trigger.Id);r.push(trigger)}}}if(r.length>0){invite.ProjectInviteTriggers=r;result.push(invite)}}if(initialwinnings.length==0)initialwinnings=winnings;w.setInvites(JSON.stringify(initialwinnings));this.displayInvite(result,ipDef,dv,ct,visit,sId,key)},getString:function(date){return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()},shuffleObject:function(object){var j,x,i;for(i=object.length-1;i>=0;i=i-1){if(Math.random()<0.5){j=Math.floor(Math.random()*i);x=object[i];object[i]=object[j];object[j]=x}}return object},evaluateInvite:function(invite){var i;for(i=0;i<invite.ProjectInviteTriggers.length;i+=1){if(this.evaluateTrigger(invite.ProjectInviteTriggers[i])===true){langId=invite.ProjectInviteTriggers[i].LanguageId;return true}}return false},evaluateTrigger:function(trigger){var condition=trigger.ProjectInviteTriggerConditions[0],result=this.evaluateCondition(condition),j;for(j=1;j<trigger.ProjectInviteTriggerConditions.length;j=j+1){condition=trigger.ProjectInviteTriggerConditions[j];if(condition.IsAnd===true){result=result&&this.evaluateCondition(condition)}else{result=result||this.evaluateCondition(condition)}}return result},evaluateCondition:function(condition){try{switch(condition.ConditionTypeId){case 1:return this.evaluateOperation(condition.ConditionOperationId,this.culture.toString(),condition.Value);case 2:var cleanUrl=location.href.toLowerCase();if(condition.ConditionOperationId===3||condition.ConditionOperationId===6){if(condition.Value.toLowerCase().indexOf("www")===0){cleanUrl=location.href.replace(/^https?:\/\//,"")}}return this.evaluateOperation(condition.ConditionOperationId,cleanUrl,condition.Value.toLowerCase());case 3:return this.evaluateOperation(condition.ConditionOperationId,this.getQueryParam(condition.Parameter),condition.Value);case 4:return this.evaluateOperation(condition.ConditionOperationId,iPerceptions.Wrapper.getCookie(condition.Parameter),condition.Value);case 5:return this.evaluateTrigger(condition.CompanyInviteRule);case 6:return this.evaluateOperation(condition.ConditionOperationId,this.pageViewed.toString(),condition.Value);case 7:return this.evaluateOperation(condition.ConditionOperationId,this.device.toLowerCase(),condition.Value.toLowerCase())}}catch(e){}},evaluateOperation:function(operationId,lValue,rValue){if(operationId>0&&operationId<11&&lValue===undefined){return false}lValue=lValue.trim();rValue=rValue.trim();try{switch(operationId){case 1:return lValue===rValue;case 2:return lValue!==rValue;case 3:return lValue.indexOf(rValue.toString())===0;case 4:return lValue.indexOf(rValue.toString())!==-1;case 5:return lValue.indexOf(rValue.toString())===-1;case 6:return lValue.toString()===rValue.toString();case 7:return rValue.length>0&&lValue.substring(lValue.length-rValue.length,lValue.length)===rValue;case 8:return parseInt(lValue)<parseInt(rValue);case 9:return parseInt(lValue)>parseInt(rValue);case 10:return lValue!=="";case 11:return lValue==="";case 12:return this.getDevice(parseInt(rValue));case 13:return!this.getDevice(parseInt(rValue));case 14:return lValue==="";case 15:return lValue!==""}}catch(e){}},getQueryParam:function(name){var value,pair,vars=location.search.substring(1).split("&"),i;for(i=0;i<vars.length;i+=1){pair=vars[i].split("=");if(pair[0]===name){if(value===undefined){value=pair[1]}else if(typeof value==="string"){value=[value,pair[1]]}else{value.push(pair[1])}}}return value instanceof Array?value.join():value},getDevice:function(value){return(value===1&&this.device==='desktop')||(value===3&&this.device==='tablet')||(value===2&&this.device==='mobile')},toJson:function(){var sobj={},i;for(i in this){if(this.hasOwnProperty(i))sobj[i]=typeof this[i]=='function'?this[i].toString():this[i]}return JSON.stringify(sobj)}};