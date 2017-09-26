function memoize(fn){
	var cache = {};
	return function(){
		if (typeof cache[n] === 'undefined'){
			cache[n] = fn(n);
		}
		return cache[n];
	}
}



function memoize(fn){
	var cache = {};
	return function(){
		let key = JSON.stringify(arguments)
		if (typeof cache[key] === 'undefined'){
			cache[key] = fn.apply(undefined, arguments);
		}
		return cache[key];
	}
}