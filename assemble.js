try{
	var root= document.body.attachShadow({mode: 'closed'});
	format(root);
}catch(e){
	console.warn('shadow root not supported');
	var query= confirm('Shadow root not supported, data may be at risk.');
	if(query===true){
		var root= document.createElement('div-FS');
		var warn= document.createElement('h1');
		warn.innerHTML= 'Shadow root not supported, data may be at risk.  Do you trust this site?';
		warn.id='warn';
		root.appendChild(warn);
		document.body.appendChild(root);
		format(root);
	}
	else return;
}


function format(element){
	chrome.storage.local.get(null, (items, element)=>{
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
				var query= confirm(`Are you sure you want to permanently delete this form?\n${key}`);
				if(query===true){
					chrome.storage.local.remove(key);
					document.getElementById('option'+ key).classList.add('removed');
				}
			});
			bar.appendChild(rem);
			//act
			let act= document.createElement('button');
			act.addEventListener('click', (key)=>{
				GET(key);
			});
			
			//FINAL
			option.appendChild(FORM);
			list.appendChild(option);
		}
		element.appendChild(list);
	});
}
function GET(URL){
	chrome.storage.local.get(URL, (items)=>{
		for(var i=0; items[URL].length>0; i++){
			if(items[URL][i].type!= 'checkbox'){
				document.getElementById(items[URL][i].id).value=items[URL][i].value;
			}
			else{
				document.getElementById(items[URL][i].id).checked=items[URL][i].checked;
			}
		}
	});
}