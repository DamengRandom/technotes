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

<b>2.</b> access `this` object with DOM

```js
const elem = document.querySelector(".click");

function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();

  console.log(this.href); // we can access this object which is pointing to the anchor element (`elem`) from the DOM tree
  // this.href: means we can access <a> tag related attributes !!!!
}

elem.addEventListener("click", handleClick, false); // actually `this` is pointing to `elem`

// Thus, we need to specify the element inside handleClick function !!!!
// Also check typescript configuration of "noImplicitThis" attribute !!!!
```

<b>3.</b>
