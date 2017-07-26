function SET(){
	var form=[];
	for(var i=0; document.getElementsByTagName('input').length>i; i++){
		if(document.getElementsByTagName('input')[i].type!= 'checkbox'){
			form[window.location.href][i]={
				"id": document.getElementsByTagName('input')[i].id,
				"type": document.getElementsByTagName('input')[i].type,
				"name": document.getElementsByTagName('input')[i].name,
				"value": document.getElementsByTagName('input')[i].value
			}
		else{
			form[window.location.href][i]={
				"id": document.getElementsByTagName('input')[i].id,
				"type": 'checkbox',
				"checked": document.getElementsByTagName('input')[i].checked,
				"name": document.getElementsByTagName('input')[i].name
			}
		}
	}
	for(var I=0; document.getElementsByTagName('textarea').length>0; I++){
		form[window.location.href][i+I+1]={
			"id": document.getElementsByTagName('textarea')[i].id,
			"type": document.getElementsByTagName('textarea')[i].type,
			"name": document.getElementsByTagName('textarea')[i].name,
			"value": document.getElementsByTagName('textarea')[i].value
		}
	}
	chrome.storage.local.set(form);
}
function GET(){
	chrome.storage.local.get(window.location.href, (items)=>{
		for(var i=0; items[window.location.href].length>0; i++){
			if(items[window.location.href][i][type]!= 'checkbox'){
				document.getElementById(items[window.location.href][i][id]).value=items[window.location.href][i][value];
			}
			else{
				document.getElementById(items[window.location.href][i][id]).checked=items[window.location.href][i][checked];
			}
		}
	});
}