### Understanding arrow function (this) in JavasScript

arrow function do NOT bind its own this, it inherits parent this scope.

When to use arrow functions (common cases): when working with `closures` and `callbacks`

When NOT consider arrow function (common cases): when working with class/objects methods and constructor

Classic Example:

```js
const obj = {
  fn: () => {
    console.log(this); // `this` refers to window or global object
  },
};
```

Difference between arrow function and normal function

```js
// Arrow function
const anotherObject = {
  asyncCall: (param, cb, parameter) => {
    console.log(`${param}, ${cb(parameter)}`); // Result is: "Arrow function output: , undefined " because parameter was not defined from global window object
  },
};

const callback = (parameter) => {
  return parameter;
};

const obj = {
  parameter: "parameter example 1",
  fn: () => {
    // here is the key, if we use arrow function here, this refers to global object
    anotherObject.asyncCall(
      "Arrow function output: ",
      callback,
      this.parameter
    );
  },
};

console.log(obj.fn());
```

```js
// Normal Function
const anotherObject = {
  asyncCall: (param, cb, parameter) => {
    console.log(`${param}, ${cb(parameter)}`); // Result is: "Arrow function output: , parameter example 1"
  },
};

const callback = (parameter) => {
  return parameter;
};

const obj = {
  parameter: "parameter example 1",
  fn: function() {
    // here is the key, we need to use `normal` function here in order to pass this.parameter value into other object
    anotherObject.asyncCall(
      "Arrow function output: ",
      callback,
      this.parameter
    );
  },
};

console.log(obj.fn());
```

Shorter example to compare result of Normal function and Arrow function:

```js
// Normal  function
const const myObject = {
  p: 1,
  myMethod: function () {
    console.log(this); // `this` refers to `myObject`
  },
};
myObject.myMethod(); // {p: 1, myMethod: ƒ}

// Arrow function
const myObject1 = {
  p: 1,
  myMethod: () => {
    console.log(this); // `this` refers as `window` object
  },
};
myObject1.myMethod(); // window object
```

Last example for Normal function & Arrow function:

```js
// Arrow function
const anotherObject = {
  asyncCall: function(param, cb) {
    console.log(`${param}, ${cb()}`);
  },
};

const arrowFnCallback = () => {
  return this.parameter;
};

const obj = {
  parameter: "parameter example",
  fn: function() {
    anotherObject.asyncCall(
      "Normal function output: ",
      arrowFnCallback.bind(this)
    );
  },
};

console.log(obj.fn()); // Normal function output: , undefined
```

```js
// Normal function
const anotherObject = {
  asyncCall: function(param, cb) {
    console.log(`${param}, ${cb()}`);
  },
};

function normalFnCallback() {
  return this.parameter;
}

const obj = {
  parameter: "parameter example",
  fn: function() {
    anotherObject.asyncCall(
      "Normal function output: ",
      normalFnCallback.bind(this)
    );
  },
};

console.log(obj.fn());
```
