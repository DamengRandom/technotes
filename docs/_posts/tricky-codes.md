### Tricky and dirty JS recalls (before interview)

<b>1.</b> this value can be read by arrow function: Example

```js
// First example: value can be read by arrow function
class Person {
  constructor(name) {
    this.name = name;
  }

  printNameArrowFunction() {
    setTimeout(() => {
      console.log("Arrow Function: " + this.name); // Arrow function: its like reading the scoped value which is from constructor level
    }, 1000);
  }

  printNameNormalFunction() {
    setTimeout(function() {
      console.log("Normal Function: " + this.name); // Normal function: its like reading a global scope value which is not defined !!!
    }, 1000);
  }
}

let person = new Person("Damon");

person.printNameArrowFunction(); // Damon
person.printNameNormalFunction(); //

// Second example: `let` or `const`: will make output as nothing/empty !!
const name = "Ella";
// Or let name = 'Ella';

const arrowFunction = () => console.log(this.name);

function normalFunction() {
  console.log(this.name);
}

arrowFunction(); //
normalFunction(); //

// Third Example: if we need to display value by using let or const, we can remove this keyword
let nameWithoutThis = "Ella";

const arrowFunction = () => console.log(nameWithoutThis);

function normalFunction() {
  console.log(nameWithoutThis);
}

arrowFunction(); // Ella
normalFunction(); // Ella

// Fourth example: `var` will make this.name able to read the value !!!
var name = "Ella";

const arrowFunction = () => console.log(this.name);

function normalFunction() {
  console.log(this.name);
}

arrowFunction(); // Ella
normalFunction(); // Ella
```

<b>2.</b> OOP Overloading concept (Implemented by JS)

```js
function overloadingJS(arg1, arg2, arg3) {
  let word = "hi";
  let result = "no arguments passed in ..";

  if (typeof arg1 !== "undefined") result = arg1;
  if (typeof arg2 !== "undefined") result = word + ", " + arg1 + ", " + arg2;
  if (typeof arg3 !== "undefined")
    result = "All arguments overload word: " + arg1 + ", " + arg2 + ", " + arg3;

  return result;
}
undefined;
overloadingJS();
// "no arguments passed in .."
overloadingJS("overload", "with second argument.");
// "hi, overload, with second argument."
overloadingJS(
  "overload",
  "with second argument",
  "last argument also available."
);
// "All arguments overload word: overload, with second argument, last argument also available."
```

<b>3.</b> function class output

```js
function a() {
  this.site = "Damon";

  function b() {
    console.log(this.site);
  }

  b();
}

var site = "Ella";
new a();
// output is Ella
```

<b>4.</b> how easily to get undefined 😂😂😂😂

```js
let x = 5;
let obj = {
  x: 2,
  getX: function() {
    let x = 10;
    console.log(this.x);
  },
};
let y = obj.getX;
y(); // undefined

// even we change it to function
let y = obj.getX(); // 2
y; // undefined !!!
```

<b>5.</b> `Object.create()`

```js
var Employee = {
  company: "xyz",
};
var emp1 = Object.create(Employee);
delete emp1.company;
console.log(emp1.company); // xyz
emp1; // {}
console.log(emp1.hasOwnProperty("company")); // false
```

<b>6.</b> `delete`

```js
var output = (function(x) {
  delete x;
  return x;
})(0);

console.log(output); // 0

// reason: x is not an object it's local variable. delete operator doesn't affect local variable.
```

<b>7.</b> "-" (minus) type coercion would convert string to number type

```js
var x = 1;
var y = "1";

x - y; // 0
```

```js
0 == false; // true
0 === false; // false
```

```js
var x = 1;

(function() {
  var x = 2;
  (function random() {
    x++;
    console.log(x);
    var x = 3;
  })();
})(); // NaN

// Explanation:

// function random(){
//   var x; // x is hoisted
//   x++; // x is not a number since it is not initialized yet
//   console.log(x); // Outputs NaN
//   x = 3; // Initialization of x
// }
```

<b>8.</b> setTimeout wrapped by IIFE function

```js
function randomFunc() {
  for (var i = 0; i < 2; i++) {
    (function(i) {
      setTimeout(() => console.log(i), 1000);
    })(i);
  }
}

randomFunc(); // 0 1
```

```js
function func2() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 2000);
  }
}

func2(); // 3 3 3
```

<b>9.</b> eval??

```js
var k = 1;
if (1) {
  eval(function foo() {});
  k += typeof foo;
}
console.log(k);
```

<b>10.</b> `var` define

```js
(function fff() {
  var tt = "213";
})();

console.log(tt); // Uncaught ReferenceError: tt is not defined
```

```js
(function fff() {
  var tt = (gg = "213");
})();

console.log(gg); // 213
console.log(tt); // Uncaught ReferenceError: tt is not defined
```

<b>11.</b> another `this` example:

```js
function foo() {
  console.log(this.bar);
}

var bar = "global";

var obj1 = {
  bar: "obj1",
  foo: foo,
};

var obj2 = {
  bar: "obj2",
};

foo(); // "global"
obj1.foo(); // "obj1"
foo.call(obj2); // "obj2"
new foo(); // undefined
```

<b>11.</b> `++x`

```js
var x = 0;

switch (++x) {
  case 0:
    ++x;
    console.log("0: ", x);
  case 1:
    ++x;
    console.log("1: ", x);
  case 5:
    ++x;
    console.log("5: ", x);
}

console.log(x);
// 1: 2
// 5: 3
// 3
```

<b>12.</b>
