### JavaScript Class & Prototype Concept Recall

<b>1.</b> Example of creating `class` by using `prototype`

```js
const { arguments } = require("file-loader");

// ES6 Class way of greeting functionality: ClassGreeting
class ClassGreeting {
  constructor(word = "Aloha", name = "Damon") {
    this.word = word;
    this.name = name;
  }

  greeting() {
    return `${this.word}, ${this.name}`;
  }
}

const greetingInstanceForClass = new ClassGreeting();
console.log(greetingInstanceForClass.greeting());

// How to achieve class functionality by using prototype in JavaScript: PrototypeGreeting
function PrototypeGreeting(word = "Hi", name = "Ella") {
  this.word = word;
  this.name = name;
}

PrototypeGreeting.prototype.greeting = function() {
  return `${this.word}, ${this.name}`;
};

const greetingInstanceForProtoType = new PrototypeGreeting("Hello", "Stranger");
console.log(greetingInstanceForProtoType.greeting());

// You can understand the way of JavaScript for creating class constructor method is like this:

function PrototypeGreeting(word = "Hi", name = "Ella") {
  this.word = word;
  this.name = name;
}

// If later you need to inherit an class and creating method for this class, you can do this:

PrototypeGreeting.prototype.greeting = function() {
  return `${this.word}, ${this.name}`;
};

// From this example, one word: it proves the class can be treated as an object in JavaScript
```

Reference: <a href="https://www.toptal.com/javascript/es6-class-chaos-keeps-js-developer-up#:~:text=Prototypes%20vs.-,Classes,is%20itself%20an%20object%20instance.&text=Functions%20are%20first%2Dclass%20in,be%20properties%20of%20other%20objects." target="_blank">here</a>

<b>2.</b> Understanding more on `prototype` and `class` concept in JavaScript, this is one typical example:

```js
function Person() {
  this.name = "Damon";
  return this;
}

Person.prototype.getName = function() {
  return this.name;
};

class PersonClass extends Person {
  constructor() {
    super();
    this.name = "Damon (From Class)";
  }
}

const personClassInstance = new PersonClass();

console.log(personClassInstance.getName()); // Damon (From Class)

Person.prototype.getName = function() {
  return "Overridden in Person";
};

console.log(personClassInstance.getName()); // Overridden in Person

PersonClass.prototype.getName = function() {
  return "Overridden in PersonClass";
};

console.log(personClassInstance.getName()); // 'Overridden in PersonClass'

personClassInstance.getName = function() {
  return "Overridden in person class instance";
};

console.log(personClassInstance.getName()); // Overridden in person class instance
```

<b>3.</b> What is `setPrototypeOf()`:

Example:

```js
var Animal = {
  speak() {
    console.log(this.name + " makes a nosie ..");
  },
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal); // Dog.prototype is the "target" object, and Animal is the "source" object

var d = new Dog("Haski");

d.speak(); // Haski makes a nosie ..
```

Explanantion:

The reason for calling `Object.setPrototypeOf` is to make sure that any objects created by the `Dog` constructor will get the `Animal` object in their prototype chain.

<b>4.</b> How class convert to es5 syntax:

```js
// From

class Foo {
  bar() {}
}

// to

function Foo2() {}
Foo2.prototype.Bar = function() {};
```

<b>5.</b> `instanceof` type guard

```js
class Foo {
bar() {}
}

const bar = new Foo();

console.log(Object.getPrototypeOf(bar) === Foo.prototype); // true

Object.getPrototypeOf(bar);

<!-- {constructor: ƒ, bar: ƒ}
bar: ƒ bar()
constructor: class Foo
[[Prototype]]: Object -->

// Thus, we can use instanceof method for the class based functions

console.log(bar instanceof Foo); // true
```

<b>6.</b>
