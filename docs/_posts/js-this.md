### JavaScript `this`:

<b>1.</b> `this` keyword in function, object literal and class:

```js
// function
function thisFn() {
  console.log("function this: ", this);
}

thisFn(); // Window object

// object literal

const thisObject = {
  insideFn() {
    console.log("object this: ", this);
  },
};

thisObject.insideFn(); // { insideFn: insideFn() }

// class
class ThisClass {
  method() {
    console.log("class this: ", this);
  }
}

const thisClassInstance = new ThisClass();

thisClassInstance.method(); // empty object {}
```
