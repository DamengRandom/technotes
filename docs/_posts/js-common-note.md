### JavaScript General Tips

<b>1.</b> When you pass a function by name without parentheses, you are passing the function object itself. When you pass it with parentheses, you are passing the result of executing that function.

<b>2.</b> Why we use filter instead of find?

The `find()` method doesn’t work in IE <= 11. The `filter()` method works in all browsers, including IE9+.
<a href="https://www.c-sharpcorner.com/blogs/find-vs-filter-in-javascrtipt#:~:text=Find%20and%20Filter&text=The%20find()%20method%20returns,values%20in%20the%20array%20collection.&text=The%20filter()%20method%20returns,an%20array%20from%20the%20collection" target="_blank">Reference</a>

<b>3.</b> `Maps`:
In ES6: `Map` method which uses `get` and `set` methods to get and set values, code example:

```js
const map = new Map();
const KEY = {};
map.set(KEY, "with a value"); // Set a value for key
map.get(KEY); // OUTPUT: with a value
map.has(KEY); // true
map.delete(KEY); // true
map.has(KEY); // false

// Another example:
const mapArray = new Map([
  [0, "value 1"],
  [1, "value 2"],
  [2, "value 3"],
]);
mapArray.get(0); // OUTPUT: value 1
```

<b>4.</b> `Sets`: a unique value collections of data set, code example:

```js
const setUnique = new Set([1, 2, 3, 4, 4, 7, 8, 94, 1, 2]); // OUTPUT: {1,2,3,4,7,8,94,1,2}
// convert setUnique set data to array format
const convertToArray = Array.from(setUnique); // OUTPUT: [1,2,3,4,7,8,94,1,2]
// Quick knowledge recall:
const obj = { a: 1, b: 2 };
Object.keys(obj); // ['a', 'b']
Object.values(obj); // [1, 2]
Object.assign(obj, { c: 3 }); // {a: 1, b: 2, c: 3}
```

<b>5.</b> `class` is a `function` type in ES6, example:

```js
class A { ... }
typeof A // OUTPUT: function
```

<b>6.</b> ES6: Another way to declare function (`['functionName'](){}`)

```js
var obj = {
  ["hi"]() {
    // ['functionName'](){} a new way to define function
    console.log("hello");
  },
};

obj.hi(); // OUTPUT: hello
```

<b>7.</b> `Iterators` VS `Iterable`:

- Iterators: is a pointer for traversing the elements of a data structure

- Iterable: a data structure which wants its elements to be accessible to the public,
  - values are iterable: 'Array', 'Maps', 'Strings', 'Sets'
  - plain objects are not iterable ..

<b>8.</b> Try to use `for-of` instead of using normal for loop, code example:

```js
var items = Array.of(...[1, 2, 3]);
for (var item of items) {
  console.log(item);
}
```

<b>9.</b> `Object.assign()` && `Object.defineProperty()`:

```js
Object.assign(obj, { newKey: newValue });
// example:
var assignObject = Object.assign({}, { newKey: "newValue" });
assignObject; // {newKey: 'newValue'}

Object.defineProperty(obj, prop, descriptor); // descriptor is an object which contains value and decide whether this object value is able to be reassigned or not
// example:
var obj = Object.defineProperty({}, "newProp", {
  value: "prop value",
  writable: false,
});
obj.newProp = "new value assigned";
obj.newProp; // OUTPUT is 'prop value' because the writable is false !!!
```

<b>10.</b> `bind()`, `apply()`, `call()`:

- `bind()`: Simple memo: you don't want to lose `this` for another function
  Example:

```js
var numberObject = {
  value: 100,
};

var outputValue = function() {
  console.log(this.value);
  return this.value;
};

outputValue(); // undefined

var afterBindOutput = outputValue.bind(numberObject);

afterBindOutput(); // 100
```

<a href="https://javascript.info/bind#solution-2-bind" target="_blank">Please read</a>

- `apply()`: calls a function with a given `this` value and arguments provided as an array

Example:

```js
// we call name attribute from another object
var guy = {
  name: function() {
    return "name: " + this.guyName;
  },
};

var anotherGuy = {
  guyName: "Another Guy",
};

console.log(guy.name.apply(anotherGuy)); // name: Another Guy

// we use apply to merge/combine array
const array = [1, 2];
const newElements = ["a", "b"];

array.push.apply(array, newElements); // [1, 2, 'a', 'b']
```

- `call()`: calls a function with a given `this` value and arguments provided individually

Example:

```js
// using the chain constructors for an object
function Item(name) {
  this.name = name;
}

function AnotherItem(name) {
  Item.call(this, name);
  this.newAttr = "new attribute";
}

console.log(new AnotherItem("damon").name); // damon

// we also can use as this referrer
var thisVar = "1";
function show() {
  return this.thisVar;
}
console.log(show.call()); // 1
```

`call()`: allows an object to use the function of another object.

`apply()`: similar with call(), but call() takes arguments separately whereas, apply() method takes arguments as an array.

`bind()`: returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter.

<b>11.</b> Another tips from egghead.io:

```js
// Tip 1: not everything in JavaScript is an Object !!!!
console.log(typeof "hi"); // string
console.log(typeof 1); // number
console.log(typeof false); // boolean
console.log(typeof 1n); // bigint
console.log(typeof Symbol()); // symbol
console.log(typeof null); // object - javascript initial bug (haven't fixed yet)
console.log(typeof undefined); // undefined

// Apart from value null, the rest of console values are not object - which means not everything in JavaScript is an Object !!!!

// Tip 2: mutating object, but cannot mutate primitive type values

// object mutate: (mutable)
let obj = { x: 1 };
const mutateObj = (objectValue) => {
  objectValue.x = 2;
};
mutateObj(obj);
obj; // {x: 2}

// primitive number cannot be mutated: (immutable)
let num = 1;
const tryToMutateNumber = (num) => {
  num = 2;
  console.log(num); // 2
};
tryToMutateNumber(num);
num; // 1

// Tip 3: primitive type autoBoxing
"string".length; // 6
// the primitive with dot means `primitive type autoBoxing`, that turns primitive into an object and call API .length, so people usually call everything in JavaScript is an object.
// Because of autoboxing, we treated JavaScript primitive type value as an `object`

// Tip 4: JavaScript dunder proto: __proto__
var obj = {};
obj.toString(); // "[object Object]"

// normally this dunder proto can be used for inheritance
var obj = {};
obj.toString = function() {
  return true;
};
var out = Object.create(obj);

out.toString(); // true (out value is inherited from obj value !!!!!)

// Tip 5: how to understand prototype in JavaScript
function foo() {}
foo.prototype.text = "aloha";
foo.prototype; // { text: "aloha" constructor: ƒ foo() __proto__: Object }
let instance = new foo();
instance.text; // "aloha"

// Thus function.prototype will create a dunder proto object + constructor function everytime !!!!!!

// Tip 6: Global functions in JavaScript
Object;
Array;
Map;
Set;
// ...

// These functions are global function, which has JavaScript builtin API in it, eg: Array.prototype.map() ... (Array.prototype.map === [].map // true)

// Tip 7: var && let in functional && block scope
// var in functional scope:
var x = 1;
function y() {
  var x = 2;
  console.log(x);
}
y(); // 2
x; // 1

// var in block scope:
var xx = 10;
{
  var xx = 20;
  console.log(xx); // 20
}
xx; // 20

// let in functional scope
let x = 1;
function y() {
  let x = 2;
  console.log(x);
}
y(); // 2
x; // 1

// let in block scope:
let xx = 10;
{
  let xx = 20;
  console.log(xx); // 20
}
xx; // 10

// Tip 8: powerful of window object + this can use window object !!!
window.name = "Damon";

function thisValueFromWindow() {
  return `Hi window object, I am ${this.name}.`;
}

thisValueFromWindow(); // Hi window object, I am Damon.

// Another example of reading this value from arrow function:
window.name = "Ella";
const lexicalScope = {
  variable: 1,
  readThisFromAnotherArrowFunction: () => {
    return `hi ${this.name} ..`;
  },
};
console.log(lexicalScope.readThisFromAnotherArrowFunction());

// Tip 9: bind for this in JavaScript (access different scope variable)
var person = {
  name: "ella",
};

function readName() {
  return this.name;
}

const newBind = readName.bind(person);
console.log(newBind());

// Tip 10: closure recall
let globalScope = "hello ";

function parent() {
  let functionScope = "I am ";
  return function() {
    let localVariable = "Ella";
    return `${globalScope}${functionScope}${localVariable}`;
  };
}

console.log("-> ", parent()());
```

<b>12.</b> Optional Chaining concept:

Try to avoid errors like:
`notExistedFunctionName is not a function`
or
`object.notExistedAttribute is not undefined`

How we fix these error by default? using ? or ?.

Example below:

```js
class Person {
  constructor(name, address, hobbies) {
    this.name = name;
    this.address = address;
    this.hobbies = hobbies;
  }

  print() {
    console.log(this);
  }
}

function printPersonStreet(person) {
  console.log(person?.address?.street); // variable? is quite powerful prevent error of undefined !!!!! its called optional chaining and which always returns undefined instead of output an error !!!!
  // If we don't put ?, we will get error for UI for sure !!!!!!!!

  // console.log(person.address.street); // normal case
}

// normal case
// const damon = new Person(
//   'kyle',
//   { street: '1st street', city: 'Jinan' },
//   ['jogging', 'movie', 'reading']
// );

// get data like undefined case!!!
const damon = new Person("kyle", undefined);

// damon.print();

printPersonStreet(damon);

// ?. : run the function if function is existed !!! (also try to avoid errors for UI !!!!) Example here:
damon.printName(); // function does not exist (General error: damon.printName is not a function)
damon.printName?.(); // not run because function does not existed
damon.print?.(); // normal case

// also works well for array: Example:
damon.hobbies?.[0]; // undefined (can be used for detect first element inside an array, especially the for case you don't know whether you can get first element from current array or not !!!!!)
```

<b>13.</b> Quick word for JavaScript strict mode:

`"user strict"` is a mode ensure developer write better and secure code:

Under these modes, developer cannot do these:

```js
// 1. None of these keywords can be used as variable name:
// implements
// interface
// let
// package
// private
// protected
// public
// static
// yield
// eval

// eg:
var public = 1; // cause error in strict mode
var eval = 3.14; // The word "eval" cannot be used as a variable

// 2. Octal numeric literals are not allowed
var x = 010;

// 3. Octal escape characters are not allowed
var x = "\010";

// 4. Writing to a read-only property is not allowed
var obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });
obj.x = 3.14;

// 5. Writing to a get-only property is not allowed
var obj = {
  get x() {
    return 0;
  },
};
obj.x = 3.14;

// 6. Deleting an undeletable property is not allowed
delete Object.prototype;
```

<b>14.</b> JavaScript Object methods (Recall by examples)

```js
// Example 1: using `get` inside object

let obj = {
  get fn() {
    return 1;
  },
};

console.log(obj.fn); // 1

// Example 2: adding function as a new attribute

let obj2 = {
  name: "damon",
};

obj2.word = function() {
  console.log(`Aloha, ${this.name} ..`);
};

console.log(obj2.word()); // Aloha, Damon ..

// Example 3: set a new value for object method

let obj3 = {
  result: 0,
  cost: 10,
  tax: 3.5,
  set total(val) {
    this.result = val;
  },
};

obj3.total = obj3.cost + obj3.tax;

console.log(obj3.result); // 13.5
```

<b>14.</b> Axios & Fetch

`Axios` support abort process, `fetch` needs to do extra configurations to support <a href="https://developers.google.com/web/updates/2017/09/abortable-fetch">abortable fetch</a>

- `Axios` as an npm package need to be imported to codebase which which will be warning by `synk` for vulnerability check, `fetch` is es6 builtin support feature

- size: `Axios` is larger than `fetch`

- `Axios` backward compatibility is better than `fetch`. IE11 is a big pain for fetch (Written at Year 2021)

- `Axios` automatically do json data transformation job, but for `fetch`, which needs to `res.json()` ..

- `Axios` support interceptors (Tricky part), `fetch` NO ..

`Conclusion`: depending on your specific situations, after discussion with your team members, you can select whichever is suitable for your team decision.

Another reference: <a href="https://blog.logrocket.com/axios-or-fetch-api/" target="_blank">here</a>

<b>15.</b> check variable type

```js
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call({}); // '[object Object]'

// Or another way to check:
function checker(param) {
  if (param.length) {
    console.log("array");
  } else {
    console.log("not array");
  }
}
```

<b>16.</b> What is `Recursion`?

Recursion is a technique to iterate over an operation by having a function call itself repeatedly until it arrives at a result.

```js
function add(number) {
  if (number <= 0) {
    return 0;
  } else {
    return number + add(number - 1);
  }
}
// Code execution process:
// add(2) => 2 + add(1)
//          2 + 1 + add(0)
//          2 + 1 + 0 = 3
```

<b>17.</b> Some words about JavaScript

1. JavaScript can execute not only in the browser, but also on the server, or actually on any device that has a special program called the JavaScript engine. The browser has an embedded engine sometimes called a "JavaScript virtual machine (JVM)", like Solidity for compiling smart contract.

2. two programming paradigms important for JavaScript app developers:

- Prototypal inheritance (also: prototypes, OLOO [Objects Linking Other Objects]).
- Functional programming (also: closures, first class functions, lambdas)

3. functional programming

- What? In JavaScript, simply example would be function nested inside another function
- Why? avoid side effects (keep data mutable), also make function as pure function (give input, get same output)

4. difference between classical inheritance and prototypal inheritance

- Class Inheritance: instances inherit from classes (eg: new ClassName())
  - when to use? React class component could be a good use case.
- Prototypal Inheritance: instances inherit directly from other objects. (eg: Object.create())
  - when to use? Data handling, especially when you need to compose objects from multiple resources

5. OOP vs FP (functional programming)

- OOP pro: It’s easy to understand the basic concept of objects and easy to interpret the meaning of method calls.

- OOP con: OOP Typically depends on shared state. Objects and behaviors are typically tacked together on the same entity, which may lead to undesirable behavior such as race conditions.

- FP pro: avoid any shared state or side-effects, which eliminates bugs caused by multiple functions competing for the same resources

- FP con: hard to read the code, which also cause hard to learn the codebase within a shorter time

6. two-way data binding vs one-way data binding?

- 2-way: UI fields are bound to model data dynamically such that when a UI field changes, the model data changes with it and vice-versa

- 1-way: the model is the single source of truth. The effect is that data always flows in a single direction, which makes it easier to understand.

<b>18.</b> `NaN` in JS

NaN mean not a number, and builtin api isNaN can be used for number typed value checking, eg:

```js
isNaN("Hi"); // true
isNaN(1); // false
isNaN("1"); // false
isNaN(true); // false
isNaN(false); // false
isNaN(undefined); // true
isNaN(null); // false
```

<b>19.</b> static type variable example

```csharp
string text;
text = 'static type is for defining a specific type value, eg: string';
text = 1; // error occurred
```

<b>20.</b> dynamic type variable example:

```js
var text;
text = "dynamic type can be any type, like string";
text = 1; // this is valid
```

<b>21.</b> difference of reverse a string between "" and " "

```js
var string = "Welcome to this Javascript Guide!";

// Output becomes !ediuG tpircsavaJ siht ot emocleW
var reverseEntireSentence = reverseBySeparator(string, "");

// Output becomes emocleW ot siht tpircsavaJ !ediuG
var reverseEachWord = reverseBySeparator(reverseEntireSentence, " ");

function reverseBySeparator(string, separator) {
  return string
    .split(separator)
    .reverse()
    .join(separator);
}
```

<b>22.</b> WebSocket (its a real-time communication technology):

Data is transferred as buffer format, and need to be converted/parsed as plain text at the end

Framework: socket.io (another version of web socket), just a tool !!

<b>23.</b> `Socket.io` has so many built in functionalities (eg: fallback) which can be directly used, and better for larger scale project
Web Socket is suitable for small projects, some functionalities you need to write it on your own to achieve your goal.

Message bus system (simple queue system): can be defined as Socket.IO

`Socket.io` has a room/grouping concept, you can send messages to a specific bunch of people ..

<b>24.</b> JavaScript `Map` vs `object`

````js
// -- create a map and an object

const { setEnvironmentData } = require("worker_threads");

const map = new Map([
  [1, "one"],
  [2, "two"],
]);
const object = { 1: "one", 2: "two" };

console.info("Output 🌶🌶🌶🌶: ", map, object, map === object);
// Output 🤖🤖🤖🤖:  Map(2) { 1 => 'one', 2 => 'two' } { '1': 'one', '2': 'two' } false

// -- set a value to map and object

map.set(3, "three");
object[3] = "three";

console.info("Output after set 🍒🍒🍒🍒: ", map, object);

// -- get a value from map and object

console.log("Output after get : 🥝🥝🥝🥝", map.get(3), object[3]);

// -- delete a value from map and object

map.delete(3);
delete object[3];

console.log("Output after delete : 🥭🥭🥭🥭", map, object);

// map, object -> keys

console.log(
  "Output for map & object keys 🌽🌽🌽🌽",
  map.keys(),
  Object.keys(object)
);

// map, object -> has

console.log(
  "Output for map & object has 🫐🫐🫐🫐",
  map.has(2),
  2 in object,
  object.hasOwnProperty(2)
);

// map, object -> entries

console.log(
  "Output for map & object entries 🍎🍎🍎🍎",
  map.entries(),
  Object.entries(object)
);

// map, object -> length

console.log(
  "Output for map & object length 🥦🥦🥦🥦",
  map.size,
  Object.keys(object).length
);

// map & object iterations

// for (entry of map) {
//   console.log('Iteration output for map 🥬🥬🥬🥬', entry);
// }

for ([key, value] of map) {
  console.log("Iteration output for map 🥬🥬🥬🥬", { key, value });
}

for ([key, value] of Object.entries(object)) {
  console.log("Iteration output for object 🥕🥕🥕🥕", { key, value });
}

// map & object foreach

map.forEach((value, key) =>
  console.log("Foreach output for map 🍍🍍🍍🍍", { key, value })
);

// Object.entries(object).forEach((value) => console.log('Foreach output for object 🥒🥒🥒🥒', {key: value[0], value: value[1]}));
Object.entries(object).forEach(([key, value]) =>
  console.log("Foreach output for object 🥒🥒🥒🥒", { key, value })
);

// map & object swap key & values

// console.log('swap map result 🍓🍓🍓🍓: ', Array.from(map).reduce((acc, [key, value]) => {
//   acc.set(value, key);

//   return acc;
// }, new Map()));

console.log(
  "swap map result 🍓🍓🍓🍓: ",
  Array.from(map).reduce((acc, [key, value]) => acc.set(value, key), new Map())
);

// console.log('swap object result 🍅🍅🍅🍅: ', Object.entries(object).reduce((acc, [key, value]) => {
//   acc[value] = key;

//   return acc;
// }, {}));

console.log(
  "swap object result 🍅🍅🍅🍅: ",
  Object.entries(object).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {}
  )
);

// Resource: https://dmitripavlutin.com/maps-vs-plain-objects-javascript/

// Normally, map is accepts key types, and will keep key types
// For normal JS object, the if the key is not a string typed value, the key will be converted to string automatically !!

// If the data structure is like this:

// ```js
// const obj1 = {key1 : 'value'};
// const obj2 = {key2 : 'value'};

// const setOfValues = [[ obj1, 'object 1 data' ], [ obj2, 'object 2 data' ]];
// ```

// When we need to get the value of 'object 2 data', how? Have to loop the array, which O(2) complexity is higher than using `Map()`

// if using Map(), we can use WeakMap(), which is for preventing memory leak purpose

// Like this:

// ```js
// const obj1 = {key1 : 'value'};
// const obj2 = {key2 : 'value'};

// const setOfValues = new WeakMap();

// setOfValues.set(obj1, 'object 1 data');
// setOfValues.set(obj2, 'object 2 data');
// ```

// Then we can simply get 'object 1 data' like this:

// ```js
// setOfValues.get(foo);
// ```

// Map is directly can be used for loop to do the iteration for its items,
// but if we want to do it for JS object, we have to use Object.entries(object) convert to array first then do the items iteration
// not that straight compared with Map for loop ...
````

<b>25.</b>
