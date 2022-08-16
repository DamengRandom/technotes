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

<b>2.</b> Another version with spread operator:

```js
function callApply3(...text) {
  console.log("function with bind, call and apply: ", this, text);
}

const bindFn = callApply3.bind(thisObject);
bindFn("123", "456");

callApply3("ABC", "DEF");
callApply3.call(thisObject, "ABC", "DEF");
callApply3.apply(thisObject, ["ABC", "DEF"]);
// function with bind, call and apply:  {insideFn: ƒ} (2) ['123', '456']
// function with bind, call and apply:  Window {window: Window, self: Window, document: document, name: '', location: Location, …} (2) ['ABC', 'DEF']
// function with bind, call and apply:  {insideFn: ƒ} (2) ['ABC', 'DEF']
// function with bind, call and apply:  {insideFn: ƒ} (2) ['ABC', 'DEF']
```

<b>3.</b>
