### JavaScript Call, Bind and Apply

<b>1.</b> Example of `apply` and `call`

```js
// example of call and apply -> "apply must pass params as array format !!"
function callApply1(text, arg2) {
  console.log("function with call and apply: ", this, text, arg2);
}

callApply1("ABC", "DEF");
callApply1.call(thisObject, "ABC", "DEF");
callApply1.apply(thisObject, ["ABC", "DEF"]);

// function with call and apply:  Window {window: Window, self: Window, document: document, name: '', location: Location, …} ABC DEF
// function with call and apply:  {insideFn: ƒ} ABC DEF
// function with call and apply:  {insideFn: ƒ} ABC DEF
```
