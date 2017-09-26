var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'stationary'},
];

/*
Sort
	- any list by any attribute
	- any list by any comparer
Filter
	- any list by any criteria
Group
	- any list by any key
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default list', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default Sort (Products by id)', function(){
		function sort(){
			for(var i=0; i<products.length-1; i++)
				for(var j=i+1; j<products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	function sort(list, comparer, descending){
		let comparerFn = function(){ return 0;};
		if (typeof comparer === 'function')
			comparerFn = comparer;
		if (typeof comparer === 'string')
			comparerFn = function(item1, item2){
				if (item1[comparer] < item2[comparer]) return -1;
				if (item1[comparer] > item2[comparer]) return 1;
				return 0
			}
		if (descending)
			comparerFn = getDescending(comparerFn);
		for(var i=0; i<products.length-1; i++)
				for(var j=i+1; j<products.length; j++){
					var comparerResult = comparerFn(products[i], products[j]);
					if (comparerResult > 0){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
				}
	}
	function getDescending(comparer){
		return function(){
			return comparer.apply(undefined, arguments) * -1;
		}
	}

	describe('Any List by any attribute', function(){
		/*function sort(lsit, attrName){
			for(var i=0; i<products.length-1; i++)
				for(var j=i+1; j<products.length; j++)
					if (products[i][attrName] > products[j][attrName]){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}*/
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
		describe('Products by cost in descending', function(){
			sort(products, 'cost', true);
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});

	describe('Any list by any comparer', function(){
		/*function sort(list, comparer){
			for(var i=0; i<products.length-1; i++)
				for(var j=i+1; j<products.length; j++){
					var comparerResult = comparer(products[i], products[j]);
					if (comparerResult > 0){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
				}
		}*/
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			return p1Value - p2Value;
		};
		describe('Products by value [ cost * units ]', function(){
			sort(products, productComparerByValue);
			console.table(products);
		});
		describe('Products by value [ cost * units ][descending]', function(){
			sort(products, getDescending(productComparerByValue));
			console.table(products);
		});
	});
});

describe('Filter', function(){
	describe('All stationary products', function(){
		function filterStationaryProducts(){
			var result = [];
			for(var index=0; index < products.length; index++)
				if (products[index].category === 'stationary')
					result.push(products[index]);
			return result;
		}
		var allStationaryProducts = filterStationaryProducts();
		console.table(allStationaryProducts);
	});
	describe('Any list by any criteria', function(){
		function filter(list, criteria){
			var result = [];
			for(var index=0; index < list.length; index++)
				if (criteria(list[index]))
					result.push(list[index]);
			return result;
		}

		function negate(criteria){
			return function(){
				return !criteria.apply(undefined, arguments);
			};
		}

		var costlyProductCriteria = function(product){
			return product.cost > 50;
		};
		var underStockedProductCriteria = function(product){
			return product.units < 50;
		};
		describe('All costly products [cost > 50]', function(){
			
			var costlyProducts = filter(products, costlyProductCriteria);
			console.table(costlyProducts);
		});
		describe('All affordable products [!costlyProducts]', function(){
			var affordableProductCriteria = negate(costlyProductCriteria);
			var affordableProducts = filter(products, affordableProductCriteria);
			console.table(affordableProducts);
		})
		describe('All understocked products [units < 50]', function(){
			
			var underStockedProducts = filter(products, underStockedProductCriteria);
			console.table(underStockedProducts);
		});
		describe('All wellstocked products [!underStockedProducts]', function(){
			var wellStockedProductCriteria = negate(underStockedProductCriteria);
			var wellStockedProducts = filter(products, wellStockedProductCriteria);
			console.table(wellStockedProducts);
		});
	});
});
