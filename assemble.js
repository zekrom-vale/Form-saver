const file= chrome.storage.local,
inv.file= chrome.storage.sync;
(function(){//Forces functions to be local
//[We]mVrcm9t
//(X[13]|I[FH])ZhbGU=
try{
	var root= document.body.attachShadow({mode: 'closed'});//Prevent external js actions
	format(root, true);
}catch(e){
	console.warn('[!SUPPORT]Shadow root not supported');
	var query= confirm('Data may be accesed by other sorces on this page.\nDo you trust this site?');
	if(query===true){
		var root= document.createElement('div-FS'),
		warn= document.createElement('h1');
		warn.innerHTML= 'Shadow root not supported, data may be at risk.';
		warn.id='warn';
		root.appendChild(warn);
		document.body.appendChild(root);
		format(root, 'pseudo');
	}
	else{
		console.info('[LIMITED]');
		format(root);
	}
}

function format(element, shadow=false){
	file.get(null, (items, element)=>{
		var keys= Object.keys(items),
		list= document.createElement('list');
		for(var i in keys){
			if(/^opt/.test(keys[i])) continue;
			if(shadow!=true){
				var regURL= new RegExp('^'+ window.location.protocol+ ':\/{2,3}'+ escape(window.location.hostname));
				if(regURL.test(keys[i])==false) continue;
			}
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
					file.remove(key);
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
	file.get(URL, (items)=>{
		var it= items[URL];
		for(var i in it){
			if(it[i].type!= 'checkbox'){
				document.getElementById(it[i].id).value=it[i].value;
			}
			else document.getElementById(it[i].id).checked=it[i].checked;
		}
	});
}
//
})();
function escape(s){
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}