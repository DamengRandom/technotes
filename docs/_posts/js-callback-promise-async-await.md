### JavaScript Callback, Promise & Async Await

Before figure out callback, we need to understand we can pass function like a variable in JavaScript,

Example:

``` js
function PassingAsAVariable() {
  console.log('We can pass a function like a variable into another function and then get called');
}

function Caller(PassingAsAVariable){
  PassingAsAVariable();
}

Caller(PassingAsAVariable);
```

This is due to the fact that JavaScript functions are `first-class objects` which can be passed as variable format.

Conclusion: A callback is a function passed as an argument to another function. This technique allows a function to call another function


#### Important tips for Callback - I will call you back later !!

<b>One word: </b> Functions that are used as an argument to another function are called callback functions


<i><strong>A callback function can run after another function has finished.</strong></i>

1). A JavaScript Callback Function is a function that is passed as a parameter to another JavaScript function, and the callback function is run inside of the function it was passed into


2). JavaScript Callback Functions can be used synchronously or asynchronously

Basic Example:

``` js
function Main(message, callback){
  callback(message);
};

Main('Hi there ..', function(message) {console.log(message)});
```

Classic Example:

``` js
const getCalled = () => console.log('get called by caller as callback function');
const middler = cb => cb();
const caller = () => setTimeout(_ => middler(getCalled), 1000);
caller();

// Or
const url = 'http://test.com/test.jpg';
function download(url, callback){
  console.log(`Downloading ${url} ...`);

  setTimeout(() => {
    callback(url);
  }, 2000);
};

function process(url) {
  console.log(`Downloaded ${url} ...`);
  console.log('All done !!');
};

download(url, process);
```



#### Important Tips for Promise - A Promise is a JavaScript object that links producing code and consuming code

`Producing code` is code that can take some time

`Consuming code` is code that must wait for the result

<hr/>

Technically, the reason why we need `Promise` is we need to make things happen `asynchronously` without `waiting`, better performance and got error handlings as well.

Imagine when you call server to get data, you don't know server is down or gives back with a slower response. In this case, you don't want to make the entire process blocked, so you choose `asynchronous` way to deal with this situation, making sure nothing is blocked!

Another reason for using `Promise` is to avoid callback hell.

Promise has 3 states:

1. Pending: waiting for response
2. Fulfilled: happy ending with response
3. Rejected: unhappy ending with errors

Basic Syntax:

``` js
new Promise(function(resolve, reject){ ... });
```

Classic Example:

``` js
var buyEllaGift = true;
var willBuyEllaGiftPromise = new Promise((resolve, reject) => {
  if (buyEllaGift) {
    var gift = {
      name: 'test'
    };
    resolve(gift);
  } else {
    var error = new Error("Sorry, didn't make it");
    reject(error);
  }
});

var receiveGiftPromise = gift => {
  const message = `Ella received the gift: ${gift.name}`;
  return Promise.resolve(message);
};

var buyingAndReceiving = () => {
  console.log("Before buying gift for Ella .."); // run order: 1
  willBuyEllaGiftPromise
    .then(receiveGiftPromise)
    .then(response => {
      console.log(response); // run order: 3
    })
    .catch(error => {
      console.log(error.message); // run order: 3
      // error.message can read the error details !!
    });
  console.log("After buying check whether Ella received gift or not .."); // run order: 2
};

buyingAndReceiving();
```



#### Important tips for Async Await - async and await make promises easier to write

`async` makes a function return a Promise

`await` makes a function wait for a Promise

Basic Concept: also a way to handle things `asynchronously`. Better version of Promise.

Example compared with Promise:

``` js
// Using Async await way to write buyingAndReceiving() function:
var buyingAndReceiving = async () => {
  console.log("Before buying gift for Ella .."); // run order: 1
  try {
    const gift = await callWillBuyEllaGiftPromise;
    const response = await receiveGiftPromise(gift);
    console.log(response);
  } catch(error) {
    console.log(error.message);
  }
  console.log("After buying check whether Ella received gift or not .."); // run order: 2
};
```

Classic Example:

``` js
const rollerPromise = () => {
  return new Promise((resolve, reject) => {
    const roller = Math.round(Math.random() * 1); // return 0 or 1
    return roller ? resolve("Yeah, we made it !!") : reject("See you next year ..");
  });
};

const rollerCaller = async () => {
  try { // try catch is very important for async await structure, good practice
    const caller = await rollerPromise();
    console.log(caller);
  } catch(error) {
    console.log(error);
  }
};

rollerCaller();
```

Basic example: <i>always remember async keyword will return the function as a <b>PROMISE</b> instead of a normal function result !!</i>

```js
const xx3 = async () => {
  return '1';
}; // return as a promise object

const yy3 = () => {
  return '1';
}; // return as string '1'

console.log(xx3() === yy3()); // false
xx3().then(data => console.log(data === yy3())); // true
```

Another Example with or without `await`:

```js
// Without await keyword, resolve() is not going to run:
function returnPromises() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("not going to trigger resolve() ..");
      resolve('Aloha ..');
    }, 3000);
  });
}

function run() {
  var getPromiseTriggered = returnPromises();
  console.log(getPromiseTriggered);
}

run();
// result: not going to trigger resolve() ..

// With await keyword, resolve() result will get returned ~~
function returnPromises() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("will trigger resolve() because of 'await' ..");
      resolve('Aloha ..');
    }, 3000);
  });
}

async function run() {
  var getPromiseTriggered = await returnPromises();
  console.log(getPromiseTriggered);
}

run();
// result:
// not going to trigger resolve() ..
// Aloha ..
```

<i>Just add .catch() method at the end of the promise</i>

```js
// we can choose not using try catch, just directly using catch, like below:

async function catchAfterMethod() {
  await apiCall().catch(error => errorHandler(error));
}
```


`Asynchronous`:

Quick concept recall for `Asynchronous`: I will finish up later ~~

Functions running in parallel with other functions are called asynchronous. A good example is JavaScript `setTimeout()`.
