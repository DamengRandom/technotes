### Code for "Whats the output"

1). test `let` and `var` declaration understanding:

```js
function testLetVarDeclarationUnderstanding() {
  console.log('output for var: ', outputVar);
  console.log('output for let: ', outputLet);
  var outputVar = 'hi'; // memory space is setup during variable creation, so undefined is default value
  let outputLet = 'hello'; // not accessible before declare it
}

testLetVarDeclarationUnderstanding(); // undefined ReferenceError
// undefined
// Error: Uncaught ReferenceError: Cannot access 'outputLet' before initialization
```


```js
// Version 1
var outputVar = 'aloha';

function testVarDeclarationUnderstanding() {
  console.log('output for var: ', outputVar);
  var outputVar = 'hi';
}

testVarDeclarationUnderstanding(); // undefined

// Version 2
var outputVar = 'aloha';

function testVarDeclarationUnderstanding() {
  var outputVar = 'hi';
  console.log('output for var: ', outputVar);
}

testVarDeclarationUnderstanding(); // hi

// Version 3
var outputVar = 'aloha';

function testVarDeclarationUnderstanding() {
  console.log('output for var: ', outputVar);
}

testVarDeclarationUnderstanding(); // aloha
```


2). Be CAREFUL with utilizing `use strict` inside a function

```js
function useStrict() {
  'use strict';
  word = 'hi';
  console.log(word); // Uncaught ReferenceError: word is not defined
}
```


3). JavaScript characters & meanings

```js
+true // 1
!'hahha' // false
!'' // true
```


4). `variable++` or `++variable`? Answer: `++variable`

```js
var number = 0;
console.log(number++); // 0
console.log(++number); // 2
console.log(number); // 2
// ++var: effect on current line
// var++: effect on next line
```


```js
// Another version ..
var number = 0;
console.log(number++) // 0
console.log(number) // 1
console.log(++number) // 2
console.log(number) // 2
```


5). `object !== object` in JS

```js
function checkNumber(data) {
  if (data === { number: 1 }) {
    console.log('Hey number ..');
  } else if (data == { number: 1 }) {
    console.log('Is a number ??');
  } else {
    console.log('It is not a number ..');
  }
}

checkNumber({ number: 1 }); // It is not a number ..
// because { number: 1 } === { number: 1 } or { number: 1 } == { number: 1 } are false !!
```


6). es6 object key and set key:

```js
const sampleObject = { 1: 'a', 2: 'b', 3: 'c' };
const sampleSet = new Set([1, 2, 3, 4, 5]);

sampleObject.hasOwnProperty('1'); // true
sampleObject.hasOwnProperty(1); // true
sampleSet.has('1'); // false
sampleSet.has(1); // true
```


7). `object["[object Object]"]`

```js
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 1;
a[c] = 2;

console.log(a[b], a[{}], a[{key: 'd'}], a[{'e': 'e'}]); // 2 2 2 2
// the object will be converted like this: a["[object Object]"], which means the key is always [object Object] thus, above results are all equal to 2 !!
```


8). `return; // [undefined]`

```js
[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
}); // [undefined, undefined, undefined]
```


9). prototype 🔗🔗

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person('Damon', 'Wu');
Person.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}; // Will get TypeError: member.getFullName is not a function

Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
}; // will return 'Damon Wu'

console.log(member.getFullName());
```


10). `var` reference Error

```js
(function(){
   var lang2 = 'java';
})();

console.log(lang2); // ReferenceError: lang2 is not defined

// Normally, var is global scoped, but for this case, lang2 cannot be accessed by outside of the function, since we defined lang2 inside the function !!
```


11). using `bind`, `call` and `apply`

```js
// when we use call:
(function(){
   console.log(this, typeof this); // Number {10} 'object'
}).call(10);
```

```js
// when we use bind:
(function(){
   console.log(this, typeof this);
}).bind(10)();
```

```js
// when we use apply:
(function(){
   console.log(this, typeof this);
}).apply(10);
```


12). `typeof []` is 'object'

```js
function getValue(...args) {
  console.log(args, typeof args); // 1, 'object' -> because typeof [] is 'object' !!
}

getValue(1);
```


13). `empty` expression inside Array

```js
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers); // [1, 2, 3, empty × 7, 11]
```


14). `const` value will never change example

```js
let person = { name: 'Damon' };
const members = [person];
person = null;

console.log(members); // [{ name: 'Damon' }]
// because only modified person, not modified members, thus, stay unchanged !!
```


15). `++variable`

```js
var a = 0;
var b = {
  a: 1,
  b: ++a
};

console.log(a + b.a + ++b.b); // 1 + 1 + 2

// console.log(a + b.a + b.b++); // 3 (because b.b++ is 1 in current line !!)
```


16). `filter(Boolean)` & `filter(!Boolean)`

```js
const arr1 = [1, 2, undefined, NaN, null, false, true, "", 'abc', 3];
console.log(arr1.filter(Boolean)); // [1, 2, true, 'abc', 3] -> basically return all truthy values !!
// Super useful to remove all falsey values inside array !!!!!!!
const arr2 = [1, 2, undefined, NaN, null, false, true, "", 'abc', 3];
console.log(arr2.filter(!Boolean)); // Uncaught TypeError: false is not a function // !Boolean will return as false which is not a function at all !!
```


17). Some console logs: (tricky ones ..)

```js
console.log(3 + 4 + '5') // "75"
console.log('1' == '01'); // false
console.log('1' - - '1'); // 2 -> [1 - (-1)]
console.log('1' + - '1'); // 1-1 -> ['1' + '1' ]

const obj = { a: '1', b: '2', a: '3' };
console.log(obj); // {a: '3', b: '2'}

console.log(new Number(3)); // Number: {3} // it's an object ..

console.log([] + []); // ""
console.log([1] + []); // 1
console.log([1] + "abc"); // 1abc
console.log([1, 2, 3] + [1, 3, 4]); // 1,2,31,3,4

const ans1 = NaN === NaN;
const ans2 = Object.is(NaN, NaN);
console.log(ans1, ans2); // false true

console.log(new Array(3).toString()); // ,,
```


18). The last element from second array is used for showing the first array index corresponded data

```js
const arrTest = [10, 20, 30, 40, 50][1, 3];
console.log(arrTest); // 40
const arrTest = [10, 20, 30, 40, 50][3];   
console.log(arrTest); // 40
```


19). another `call` vs `bind` example

```js
const person = { name: 'Damon' };

function greet(word) {
  return `${this.name} said ${word}`;
}

console.log(greet.call(person, 'hi')); // Damon said hi

console.log(greet.bind(person, 'hi')); 
// ƒ greet(word) {
//  return `${this.name} said ${word}`;
// }

// Reason why bind return a function, because bind is for returning a copy of function with a binding context, which is not executable function

// Workable for bind()
greet.bind(person)('hi')
```


20). JavaScript function class

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const personClass = new Person('Damon', 'Unknown');
console.log(personClass); // {firstName: 'Damon', lastName: 'Unknown'}

const functionPerson = Person('Damon', 'Unknown');
console.log(functionPerson); // undefined
```


21). For arrow function, `this` means current scope

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()); // NaN
```


22). var & let (in for loop)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1); // 3 3 3
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1); // 0 1 2
}

// var is global variable which will get the end of loop value which is 3 as each setTimeout output value
// let is block scope variable, which will run each of value from loop during setTimeout for each time
```


23). create a private variable in JS

```js
function func() {
  var _priv = "private variable example in JS";
  return function() {
    return _priv;
  }
}

var getPriv = func();
console.log(getPriv());
```


24). condition is not treated the function defined !!

```js
var y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y); // 1undefined
```


25). values which return false 

```js
"", 0, -0, NaN, null, undefined
```

values which return true

```js
"hi", 1, [], {}, function() { return true }
```


26). `private` counter

```js
function counter() {
  var _counter = 0;

  return {
    add: function(increment) { _counter += increment; },
    retrieve: function() { return 'The counter is currently at: ' + _counter; }
  }
}

var c = counter();
c.add(5); 
c.add(9);
```


27). array duplicate

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```


28). 
