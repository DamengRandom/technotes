### Recall some concepts knowledge I have learnt before ..

<strong>1.</strong> Redux Thunk (RT)

-- its a middleware like redux-saga which is used for handling action creator asynchronously !!!

-- one word: waiting for API request is done, then trigger dispatch action to put latest state data into reducer !!!

Classic Example:

```js
export function fetchProducts() {
  const request = axios.get("https://some.domain.app.com/products"); // API call

  return (dispatch) => {
    request.then(({ data }) => {
      // wait for API is done (request got some data) !!!
      dispatch({ type: "ACTION_TYPE", payload: data }); // then trigger the dispatch action !!!
    });
  };
}
```

<strong>2.</strong> Redux Saga (RS)

-- It is a middleware library for handling redux side effects, when we trigger some actions and then trigger state change, and later you need to reflect these changes for some purposes.

eg: fetch new data and then after new data fetched, we need to get the data displayed for the users, which means fetch process must be done and redux store needs to be updated before re-rendering latest data, so saga is handling this steps (`fetch data -> update redux store -> show latest data`) synchronously, but the coding looks like asynchronous style ~~

Core tech: Redux Saga is using generators functions which is like a bookmark, eg: `yield ...`

Good resource <a href="https://flaviocopes.com/redux-saga/#:~:text=Redux%20Saga%20is%20a%20library,derives%20from%20this%20state%20change" target="_blank">here</a>

Code example:

Pleas check Redux recalls note <a href="https://dm-tipify.netlify.app/redux-tips.html" target="_blank">here</a>

<strong>3.</strong> React Hooks

-- its a function hooks react state and lifecycle functions for functional components

-- hook function is for making developer life easier, using shorter logic to represent same logic as class component does, such as life cycle method

-- can create own/customized hook functions to be reusable

-- available after React v16.8

<strong>4.</strong> Framework vs Library

Library > framework (library contains framework), your code will get called by the framework functions and your code will call the library functions

<strong>5.</strong> Patterns we need to know as Senior developer

- Singleton pattern: like a given class can only has one instance at a time, doing functionalities eg: list of client configurations, database driver, current state in the app (redux store maybe) and etc ..

- Adapter(Bridge) pattern: like a database driver, can have a common driver interface, and multiple concrete implementations like, mongo database, or dynamodb database. (We can have an abstract class for multi-purposes, think about camera connector can have multiple different lens !!)

- Observer pattern: 2 roles (publisher: give stuff [eg: event(s)] && subscriber: listen stuff [eg: event(s)]), it allow losing coupling between publisher and subscriber !!

🎏 Mindset: Use these patterns when we found codebase(s) <b>NEED</b> them !!!!!!!!!!!!!!

Reference: <a href="https://www.youtube.com/watch?v=FLmBqI3IKMA" target="_blank">Click</a>

<strong>6.</strong> Big `O` notation

Purpose: Analyzing the algorithm you created !!

The time complexity is based on the operations inside loop,

Examples of Big O complexcity:

```js
// O(n):
let n = calcNValue();

for (let i = 0; i < n; i++) {
  console.log("Totally is going to loop n times: ", i);
}

// O(1):

for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 4; j++) {
    console.log(
      "Totally is going to loop 8 (2 x 4) times, values are constants, not like variable n"
    );
  }
}

// O(n^2)
let n = calcNValue();

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log("Totally is going to loop n * n times", i, j);
  }
}

// O(5n) === O(n)
let n = calcNValue();

for (let i = 0; i < 5n; i++) {
  console.log("Totally is going to loop n times", i);
}

// O(n ^ 3)

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n * n; j++) {
    console.log("Totally is going to loop n * n * n times", i, j);
  }
}
```

<!-- re-write please -->

References

1. Document: <a href="https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1176/handouts/midterm/5-BigO.pdf" target="_blank">here</a>

2. Video Study: <a href="https://www.youtube.com/watch?v=itn09C2ZB9Y" target="_blank">here</a>

<strong>7.</strong> Standing from library / service provider perspective to write functions

Recent example about vend integration, we have 2 parts, `spice-web` and `vend`. `spice-web` is the service provider, which write APIs for vend to be called.

For example, like a transaction, we need to pass transaction type, amount and pairing id to spice-web in order to complete the transaction, which means `spice-web` is like a black box which only get the parameters from `vend` side and based on vend requirements, the `spice-web` is going to handle the transaction.

My previously mistake was I put transaction type inside `spice-web` side, which means we defined the transaction behavior but which was wrong from the library perspective. Library should `NEVER define the rules` ~~

The rule should be defined from `vend` side, something like you give me what and you don't need to know what I will do but I will handle it well, you only wait for the result. However, before I (library) try to handle it, I need to know your rules so I know what to do ~~

<strong>8.</strong> ID token vs Access token

ID token: (For Authentication)

- required to be formatted as JWT, which consists of 3 parts: header, body and signature
- where it come from: Open ID connect, which is decentralized authentication, shorter word: let user authenticate themselves
- real life story: google login, redirect user to google login interface, once password input all good, redirect user back to dashboard page, then ID token was available
- remember: not for authorization, should not be sent to API

Access token: (For Authorization)

- mainly design to allow you to access the some resource, like db, api and etc
- where it come from: OAuth 2.0, which allows app to access certain resources based on user's behavior
- real life story: if you want to share a twitter link via Linkedin, and the Linkedin will redirect you to twitter to do authentication and after success, you can share this tweet link via Linkedin !!
- remember: not for authentication

<strong>9.</strong>
