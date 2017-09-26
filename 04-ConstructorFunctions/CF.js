//Classes
Constructor Function
	- invoked with new
		-> this = new object
		-> this = return value



function Employee(id, name, salary){
	//this -> new object
	this.id = id;
	this.name = name;
	this.salary = salary;
	//this -> returned
}
undefined
var emp = new Employee(100, 'magesh', 10000)
undefined
emp
Employee {id: 100, name: "magesh", salary: 10000}
emp instanceof Employee
true
emp.constructor
ƒ Employee(id, name, salary){
	//this -> new object
	this.id = id;
	this.name = name;
	this.salary = salary;
	//this -> returned
}
var e2 = Employee(200, 'Suresh', 20000)
undefined
e2
undefined
window.id
200
window.name
"Suresh"
window.salary
20000

//assignment
var s1 = new Spinner()

s1.up()
s1.up()
s1.up()

s1.down()
