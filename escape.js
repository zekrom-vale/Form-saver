function escapes(){
	var ret=[];
	for(var U in arguments){
		ret[U]= arguments[U].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	return ret;
}

function polyEscape(obj, J, option){
	if(typeof option!= 'object') option={};
	if(typeof option.swap== 'undefined') option.swap= [/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'];
	if(typeof option.forceKey== 'undefined') forceKey= false;
	function strEsc(str){
		return str.replace(option.swap[0], option.swap[1]);
	}
	switch(typeof obj){
		case 'string':
			return strEsc(obj);
		case 'object':
			if(Array.isArray(obj)){
				for(var i in obj){
					switch(typeof obj[i]){
						case 'string':
							obj[i]= strEsc(obj[i]);
							break;
						case 'object':
							obj[i]= OBJ(obj[i]);
							break;
						default:
							continue;
					}
				}
				if(typeof J== 'string') return obj.join(J);
				return obj;
			}
			else{
				var keys= Object.key(obj);
				for(var i in keys){
					switch(typeof obj[keys[i]]){
						case 'string':
							obj[keys[i]]= strEsc(obj[keys[i]]);
							break;
						case 'object':
							obj[keys[i]]= OBJ(obj[keys[i]]);
							break;
						default:
							continue;
					}
				}
			}
		default:
			console.warn(new TypeError('argument 0 is invalid: '+ typeof obj));
			return obj;
	}
	function OBJ(inst){
		if(Array.isArray(inst)){
			var ret=[];
			for(var i in obj){
				switch(typeof inst[i]){
					case 'string':
						obj[i]= strEsc(inst);
						break;
					case 'object':
						obj[i]= OBJ(inst[i]);
						break;
					default:
						continue;
				}
			}
		}
		else{
			var keys= Object.key(inst);
			for(var i in keys){
				switch(typeof inst[keys[i]]){
					case 'string':
						inst[keys[i]]= strEsc(inst[keys[i]]);
						break;
					case 'object':
						inst[keys[i]]= OBJ(inst[keys[i]]);
						break;
					default:
						continue;
				}
			}
		}
		return inst;
	}
}