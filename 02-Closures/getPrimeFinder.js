function getPrimeFinder(){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		for(var index=2; index <= (n/2); index++)
			if (n % index === 0){
				cache[n] = false;
				return cache[n];
			}
		cache[n] = true;
		return cache[n];
	}
}


function getEvenOddFinder(){
	var cache = {};
	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = n % 2 === 0 ? 'even' : 'odd';
		
		return cache[n];
	}
}

