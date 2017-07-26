function SET(){
	var form=[],
	elments=document.querySelectorAll('input, textarea, select');
	for(var i=0; elments.length>i; i++){
		form[window.location.href][i]={
			"id": elments[i].id,
			"type": elments[i].type,
			"name": elments[i].name
		}
		if(elments[i].type== 'checkbox'){
			form[window.location.href][i]["checked"]= elments[i].checked;
		}
		else form[window.location.href][i]["value"]= elments[i].value;
	}
	chrome.storage.local.set(form);
}
function GET(){
	chrome.storage.local.get(window.location.href, (items)=>{
		for(var i=0; items[window.location.href].length>0; i++){
			if(items[window.location.href][i]["type"]!= 'checkbox'){
				document.getElementById(items[window.location.href][i]["id"]).value=items[window.location.href][i]["value"];
			}
			else{
				document.getElementById(items[window.location.href][i]["id"]).checked=items[window.location.href][i][checked];
			}
		}
	});
}