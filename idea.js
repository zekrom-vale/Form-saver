//http://ramkulkarni.com/blog/encrypting-data-with-crypto-js-in-javascript/

function SET(){
	var form=[],
	elments=document.querySelectorAll('input, textarea, select');
	for(var i in elments){
		form[window.location.href][i]={
			"id": elments[i].id,
			"type": elments[i].type,
			"name": elments[i].name,
			"tagName": elements[i].tagName
		}
		if(elments[i].type== 'checkbox'){
			form[window.location.href][i].checked= elments[i].checked;
		}
		else form[window.location.href][i].value= elments[i].value;
	}
	chrome.storage.local.set(form);
}
function GET(){
	chrome.storage.local.get(window.location.href, (items)=>{
		for(var i=0; items[window.location.href].length>0; i++){
			if(items[window.location.href][i].type!= 'checkbox'){
				document.getElementById(items[window.location.href][i].id).value=items[window.location.href][i].value;
			}
			else{
				document.getElementById(items[window.location.href][i].id).checked=items[window.location.href][i].checked;
			}
		}
	});
}
function format(){
	chrome.storage.local.get(null, (items)=>{
		var keys= Object.keys(items),
		list= document.createElement('list');
		for(var i in keys){
			if(/^opt/.test(keys[i])) continue;
			var FORM= document.createElement('form');
				let label= document.createElement('label');
				label.innerHTML=keys[i];
				FORM.appendChild(label);
			var key= items[keys[i]];
			for(var e in key){
				var el= document.createElement(key[e].tagName);
				el.id= key[e].id;
				el.type= key[e].type;
				el.name= key[e].name;
				el.checked= key[e].checked;
				el.value= key[e].value;
				FORM.appendChild(el);
				FORM.appendChild(document.createElement('br'));
			}
			//option
			var option= document.createElement('div');
			option.id= 'option'+ key;
			option.classList.add('option');
			//bar
			var bar= document.createElement('div');
			bar.classList.add('bar');
			option.appendChild(bar);
			//rem
			let rem= document.createElement('button');
			rem.classList.add('rem');
			rem.addEventListener('click', (key)=>{
				var query= confirm('Are you sure you want to remove this form?\n'+ key);
				if(query===true){
					chrome.storage.local.remove(key);
					document.getElementById('option'+ key).classList.add('removed');
				}
			});
			bar.appendChild(rem);
			
			
			//FINAL
			option.appendChild(FORM);
			list.appendChild(option);
		}
	});
}