### Tips for quick recall

<b>1.</b> `href` vs `src`:
`href` resources are loaded based on a trigger
`src` resources are loaded automatically.

<b>2.</b> Ajax (Asynchronous JavaScript And XML): update a web page `without reloading` the page

Using XMLHttpRequest to create a http request and send to sever, and then server send data back to browser, and finally update page content

<b>3.</b> `splice` usage for remove one element from array:

```js
var list = [1, 2, 3, 4, 77, 5, 6];
var removeTheOne = (value) => {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === value) {
      list.splice(i, 1);
    }
  }
  return list;
};

var afterRemove5 = removeTheOne(5);
console.log(afterRemove5); // [1,2,3,4,77,6]
```

<b>4.</b> `session storage` vs `local storage` vs `cookie`

Common: all of these 3 are stored inside browser ..

- `cookie`:

  - `Capacity`: 4kb (much more smaller)
  - `Support`: Since from HTML 4
  - `Browser Tab`: Any
  - `Expires`: Manually set
  - `Storage Location`: Browser & Server
  - `Send with requests`: Yes

- `local storage`:

  - `Capacity`: 10mb (Maximum support)
  - `Support`: Since from HTML 5
  - `Browser Tab`: Any
  - `Expires`: Never
  - `Storage Location`: Browser only
  - `Send with requests`: No

- `session storage`:
  - `Capacity`: 10mb (also Maximum support)
  - `Support`: Since from HTML 5
  - `Browser Tab`: Same tab only
  - `Expires`: On tab close
  - `Storage Location`: Browser only
  - `Send with requests`: No

```js
// Short tips:

// local storage: expires until you delete it
// session storage: expires when you close current tab
// cookie: manually set expire time (eg: set a year, very very future ..)
// eg: document.cookie = 'name=damon; expires=' + new Date(2021, 12, 12).toUTCString();

// cookie will be sent every time when user sends API request to the server, thats why cookie needs to be smaller size

// when deal with server, use cookie, deal with browser use session.local storage
```

<b>5.</b> Please watch this video for recall token && session based authentications

- Session based authentication: stateful, using cookie

  - Flow:

  1. user submit login credentials (email + password)
  2. server verifies user input against `DB`
  3. server create a temporary user `session`
  4. server -issues a cookie with `session ID` (eg: `Set-Cookie` in header)
  5. user sends cookie with `each` request
  6. server validate user request via session store to check whether user cookie is whether `valid or not`
  7. when user logout, server `removes` session information, including with cookie

- Token based authentication: stateless, using JWT, OAuth and other [used for SPA web apps, web APIs] (expose data to XSS)

  - Flow:

  1. user submit login credentials (email + password)
  2. server verifies user input against `DB`
  3. server generates a `temporary token` and `embeds` user data into it
  4. server `responses` back with token (in body or header)
  5. user stores the token in `client storage`
  6. user sends cookie with `each` request
  7. server `validate` user request & grant access
  8. when user `logout`, token will be `cleared` by client storage

Reference: <a href="https://www.youtube.com/watch?v=2PPSXonhIck" target="_blank">Link</a>

<b>6.</b> Command `npx`:

The ability of `npx` is to run the scripts from npm packages without having to install them

<b>7.</b> VSCode Copy && Moving Code Block Hotkeys (Mac users):

```js
shift + option + down key // copying current line of code to next line (handy one)
alt + up / down // moving code up or down
ctrl + minus // look back previous file definitions/histories
```

<b>8.</b> Webhook concept:

Explanation: after date, you asked your girlfriend to send you a message once she reached to home. Then, after your girlfriend reached home, then she sends you a message. Then, you feel happy.

Example: Messaging/Notification app: once you sends out some dat via API, then maybe API can tell someone else you have successfully sent the data out, the notification message will be sent after your action is done.

Simple word: you did something, then some other things will be triggered after your action, and also let you know what happened.

<b>9.</b> Redis

It refers to a cache tool which helps developers to save some data as cache so when user refetch the data, user can get it from cache instead of making another API call, eg:

```js
cacheMiddleware() {
  // is a function to save data into redis server for cache purpose
  ...
}
app.get('/path/route', cacheMiddleware, () => { cb ... });
```

Reference <a href="https://www.youtube.com/watch?v=oaJq1mQ3dFI" target="_blank">Link</a>

<b>10.</b> How Vue event bus working? An simple example

```js
// Why we need event bus? We want to share the data/props .. between siblings components

// Example Case: we want to share the title between Header and Footer components (siblings)

// Step 1: create event bus instance inside main function
export const bus = new Vue();

// Step 2: using bus and emit event for another component to listen to [For fire the event]
bus.$emit("titleChanged", "New header title");

// completed version of Header Component:

// <template>
//   <div>
//     <h4 @click="changeTitle">{{ title }}</h4>
//   </div>
// </template>

// <script>
//   import { bus } from '../../main';
//   export default {
//     data() {
//       return {
//         title: 'Header before change'
//       }
//     },
//     methods: {
//       changeTitle: function() {
//         this.title = 'New header title'; // we trigger Header component title update
//         bus.$emit('titleChanged', 'New header title'); // we trigger Footer component title update
//       }
//     }
//   }
// </script>

// Step 3: the component which wants to get the updated data will listen and trigger the changes when another component fired the event bus [For listening the event]
bus.$on("titleChanged", (data) => {
  this.titleProp = data;
});

// completed version of Footer Component:

// <template>
//   <div>
//     <h4>{{ titleProp || 'default footer content' }}</h4>
//   </div>
// </template>

// <script>
//   import { bus } from '../../main';
//   export default {
//     props: {
//       titleProp: {
//         type: String,
//         required: true
//       }
//     },
//     created() {
//       bus.$on('titleChanged', data => {
//         this.titleProp = data;
//       });
//     }
//   }
// </script>
```

<b>11.</b> deploy docker container with CI/CD tool (Travis)

create a `.travis.yml` file and do the following setups:

```
sudo: required
services:
  - docker

before_install:
  - docker build -t damengrandom/docker-flow -f Dockerfile.dev .

script:
  - docker run damengrandom/docker-flow yarn run test --watchAll=false --coverage
```

Then connect travis with your github account: read doc and find the related github repository and connect it with Travis (every time commits a new PR, as long as merge into master, the Travis will get triggered to deploy the changes to certain environment)

<b>12.</b> Common regex

```js
// email validator:
function isValidEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// replace all occurrence in this string
stringTextVariable.replace(/filter/g, "&filter");

//
var str =
  "Remove  extra   spaces    inside  string       text          content";
var newStr = str.replace(/\s\s+/g, " ");
console.log(newStr); // "Remove extra spaces inside string text content"
```

Reference: <a herf="freecodecamp.org/news/javascript-regex-match-use-replace-on-string/" target="_blank">Link</a>

<b>13.</b> JWT (JSON Web Token)

3 parts: Header, Signature, Payload

Header:

```js
{
  "alg": "HS256", // JWT algorithm
  "typ": "JWT" // JWT type
}
```

Signature: to verify the message wasn't changed along the way

```js
// If we use SHA256 algorithm, this is how signature looks like:
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

Payload: contains tge data to be sent

```js
{
  name: 'damon',
  handsome: true
}
```

Good way to integrate is Auth0.

<b>14.</b> tilde (~) vs Caret (^) in npm

~version means: approximately equivalent to version. (update <b>patch</b> version)
Eg: ~1.2.3: means will use release from 1.2.3 to <1.3.0

^version means: compatible with version (update <b>minor</b> version)
Eg: ^2.3.4: means will use release from 2.3.4 to <3.0.0

Good reference <a href="https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json" target="_blank">here</a>

<b>15.</b> Create VanillaJS Router <b>(Sorry, this is a bad failed example, just another experience of coding Vanilla JS)</b>

```html
<!-- HTML part -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #category ul {
        list-style-type: none;
        display: flex;
      }

      #category ul li {
        flex-grow: 1;
        cursor: pointer;
      }

      .show {
        display: block;
      }

      .hide {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="category">
      <ul>
        <li id="pageOne">pageOne</li>
        <li id="pageTwo">pageTwo</li>
        <li id="pageThree">pageThree</li>
      </ul>
    </div>
    <div>
      <div id="pageOneRenderer" class="viewComponent"></div>
      <div id="pageTwoRenderer" class="viewComponent"></div>
      <div id="pageThreeRenderer" class="viewComponent"></div>
      <!-- <div id="errorRenderer" class="viewComponent"></div> -->
    </div>
    <script type="text/javascript" async defer src="main.js"></script>
  </body>
</html>
```

```js
// Javascript part: main.js
const constants = {
  pageOne: [
    {
      id: 1,
      name: "one 1",
    },
    {
      id: 2,
      name: "one 2",
    },
    {
      id: 3,
      name: "one 3",
    },
  ],
  pageTwo: [
    {
      id: 1,
      name: "two 1",
    },
    {
      id: 2,
      name: "two 2",
    },
    {
      id: 3,
      name: "two 3",
    },
  ],
  pageThree: [
    {
      id: 1,
      name: "three 1",
    },
    {
      id: 2,
      name: "three 2",
    },
    {
      id: 3,
      name: "three 3",
    },
  ],
};

const routes = ["pageOne", "pageTwo", "pageThree"];

document.getElementById("category").addEventListener("click", (e) => {
  // change url from url bar
  location.href = `${location.origin}${location.pathname}#${e.target.id}`;

  const nodes = document.getElementsByClassName("viewComponent");
  const pathHash = location.hash.substr(1);

  for (let index = 0; index < nodes.length; index++) {
    if (
      nodes[index].id.includes(pathHash) ||
      location.href.includes(nodes[index].id)
    ) {
      nodes[index].classList.remove("hide");
      nodes[index].classList.add("show");
    } else {
      nodes[index].classList.remove("show");
      nodes[index].classList.add("hide");
    }
  }
});

window.addEventListener("popstate", () => {
  module.renderOnPageLoadOrURLChange();
});

// popstate: is fired when active history entry get changed

window.onload = () => {
  module.renderOnPageLoadOrURLChange(); // get current route page content when page loaded
};

var module = {
  renderSpecificItems: (data, selector) => {
    var div = document.createElement("div");
    div.setAttribute("id", `component-${selector}`);

    if (!document.getElementById(`component-${selector}`)) {
      if (typeof data === "object") {
        data.map((item) => {
          var span = document.createElement("span");
          span.innerText = item.name;
          div.appendChild(span);
          div.appendChild(document.createElement("br"));
        });
      } else {
        div.innerHTML = "<p>Default Home Component</p>";
      }

      return document.querySelector(`#${selector}`).appendChild(div);
    }
  },
  renderOnPageLoadOrURLChange: () => {
    var currentPath = location.hash.substr(1);

    routes.map((route) =>
      currentPath === route
        ? module.renderSpecificItems(constants[route], `${route}Renderer`)
        : false
    );

    // using `map` just one line, using `switch` too many lines, thats the powerful place of using map method, better performance !!

    // switch(currentPath) {
    //   case 'pageOne':
    //     module.renderSpecificItems(constants.pageOne, 'pageOneRenderer');
    //     break;
    //   case 'pageTwo':
    //     module.renderSpecificItems(constants.pageTwo, 'pageTwoRenderer');
    //     break;
    //   case 'pageThree':
    //     module.renderSpecificItems(constants.pageThree, 'pageThreeRenderer');
    //     break;
    //   default:
    //     module.renderSpecificItems(constants.error, 'errorRenderer');
    //     break;
    // }
  },
};

// After few hours coding, just found that I just coded a big tab ...
// I was feeling like SPA is a big tab, each component is the tab content, each link is the tab title !!!
```

<b>16.</b> How to delete object from array by using `forEach`:

```js
// data to use
var data = [{ x: 1, y: 2 }, { a: 1, b: 2 }, { special: "hahaha" }];
// functionality
data.forEach((val) => {
  if (val.special === "hahaha") {
    const valIndex = data.indexOf(val);
    if (valIndex > -1) {
      data.splice(valIndex, 1);
    }
  }
});
// output:
data; // [{x: 1, y: 2}, {a: 1, b: 2}]
```

<b>17.</b> `axios.create()`

The `axios.create()` function creates a new Axios instance. When you `require('axios')`, you get back an the default Axios instance. The reason why you would create an instance is to set custom defaults for your application.

<b>18.</b> MicroServices

What is MicroServices: Divide one monolithic codebase into multiple services codebase:

One to many -> which means one service can have one UI + one API + one DB (database per services - DPS) !!

<b>19.</b> Loop until condition reaches

```js
const fn = () => {
  let rand = 0;

  while (true) {
    rand = Math.floor(Math.random() * 90 + 10);
    console.log(rand);
    if (rand === 12) {
      break;
    }
  }
};

fn();
```

<b>20.</b> Personal Dignity Note

<!-- I was in a 30 mins live coding test, and initially I wasn't able to think to use map to handle the array data, I was totally panic during live coding test and below is the code during test, which is pretty bad, I just want to remind myself I can do better next time ... -->

```js
console.clear();

const stores = [
  {
    items: ["apple", "banana", "flour", "salt"],
  },
  {
    items: ["flour", "salt", "sugar"],
  },
  {
    items: ["apple", "apple", "flour", "lemon", "salt", "sugar"],
  },
];

console.log("hello");

// my code: during live coding test

function getFirstFindResult(keyword) {
  let keywordFoundArray = [];

  for (var i = 0; i < stores.length; i++) {
    for (var j = 0; j < stores[i].items.length; j++) {
      for (var k = 0; k < keyword.length; k++) {
        if (stores[i].items[j] === keyword[k]) {
          keywordFoundArray.push(keyword[k]);
        }

        if (keywordFoundArray.length === keyword.length) {
          return stores[i].items;
        }
      }
    }
  }
}

console.log(getFirstFindResult(["flour", "salt"]));
```

<!-- After a day finished, I was thought I can do better if I have enough time, here is the better version I believe: -->

```js
console.clear();

const stores = [
  {
    items: ["apple", "banana", "flour", "salt"],
  },
  {
    items: ["flour", "salt", "sugar"],
  },
  {
    items: ["apple", "apple", "flour", "lemon", "salt", "sugar"],
  },
];

console.log("hello");

// my code: after one day I started for dignity fight

function getFirstElement(paramsArray) {
  return stores.map((store) => {
    if (store.items.join().includes(paramsArray.join())) {
      return store.items;
    }

    return false;
  })[0];
}

console.log(getFirstElement(["flour", "salt"]));
```

<b>21.</b> Why using `webpack` instead of put `script` tag inside html file?

Reason: Webpack make all the script files finally compiled as `1` bundle file, something like this:

```js
<script src="jquery.js" type="text/javascript"></script>
<script src="app.js" type="text/javascript"></script>
// without implementation (just put into html file)
```

becomes to

```js
<script src="bundle.js" type="text/javascript"></script>
// with webpack implementation
```

Advantage of using webpack instead of import inside html file is we have ability to set the environment variable to control whether shall we load this file as part of `bundle.js` or not !!!

something like this:

```js
let pluginPartial = "";

if (appcuesEnabled) {
  pluginPartial += fs.readFileSync(
    path.resolve(__dirname, `./src/partials/appcues.html`),
    "utf8"
  );
}
// include html inside `HtmlWebpackPlugin` plugin
new HtmlWebpackPlugin({
  title: "Bundle HTML files together",
  template: "index.html",
  plugin: pluginPartial,
}),
  (
    // inside `./src/partials/appcues.html` file, we have:
    <script src="//fast.appcues.com/specific_id.js"></script>
  );
```

<b>22.</b> STOP using: `obj && obj.attrOne && obj.attrOne.nested`

using <strong>lodash</strong> methods:

```js
_.get(obj, "attrOne.nested”);
```

<a href="https://stackoverflow.com/questions/47885165/lodash-check-if-object-exists-and-property-exists-and-is-true" target="_blank">Reference check</a>

<b>23.</b> `autoprefixer`: is a tool to automatically write the vendor properties,

eg:

```css
a {
  transition: transform 1s;
}

/* After use autoprefixer, above code will be represented as this: */

a {
  -webkit-transition: -webkit-transform 1s;
  transition: -ms-transform 1s;
  transition: transform 1s;
}
```

Support more properties for different browsers, such as IE, (polyfill consideration)

<b>24.</b> ESlint how to add specific rule instead of simply disable the rule <a href="https://stackoverflow.com/questions/44126983/eslint-unexpected-dangling-in-place-no-underscore-dangle" target="_blank">Reference</a>

```js
// ESlint rule value meaning:
"off" or 0 👉 turn the rule off
"warn" or 1 👉 turn the rule on as a warning
"error" or 2 👉 turn the rule on as an error
// https://www.samanthaming.com/tidbits/41-no-useless-escape/
```

<b>25.</b> MicroServices tips:

1). What is micro-services:

- Divide one monolithic codebase into multiple services codebases !! (Felt like do more works ...)

Term `one to many`: refers to one service can have one UI + one API + one DB (database per services - DPS) !!

2). Big problem about micro-services is database management, it's better `NOT to directly access service A for service B database`, not good at all.

<b>26.</b> const var let `table`

```js
keyword	          const	  let	  var
global scope	    no	    no	  yes
block scope	      yes	    yes	  no
can be reassigned	no	    yes	  yes
```

<b>27.</b> Another `bind` example

```js
function getAnimal() {
  return `Animal: ${this.animalName}`;
}

// try to use bind to get `this.animal` value
const animal = { animalName: "Corgi" };

console.log(getAnimal.bind(animal)());
```

<b>28.</b> check if value is integer in JS

```js
function isInt(num) {
  return num % 1 === 0;
}
```

<b>29.</b> how to reset array to empty array:

```js
// method 1
arrayList = [];

// method 2
arrayList.length = 0;

// method 3
var arrayList = [1]; // Created array
var newArrayList = arrayList; // Referenced arrayList by new array variable
arrayList.splice(0, arrayList.length); // Empty the array by setting length to 0
console.log(newArrayList);

// method 4
while (arrayList.length) {
  arrayList.pop();
}
```

<b>30.</b> Example of primitive type data

```js
var y = #8454; // y pointing to memory  address of the value 123

var z = y;

var z = #5411; // z pointing to a completely new memory address of the value 123

// Changing the value of y
y = 23;
console.log(z);  // Returns 234, since z points to a new address in the memory so changes in y will not effect z since they have 2 different memory addresses !!!
```

<b>31.</b> Example of non-primitive type data

```js
var obj = { name: "damon", surname: "wu" };
var obj2 = obj;

var obj = #8711;  // obj pointing to memory address of { name: "damon", surname: "wu" }
var obj2 = obj;
var obj2 = #8711; // obj2 pointing to the same memory address

// changing the value of obj1
obj1.name = "ella";
console.log(obj2);
// Returns {name:"ella", surname:"wu"} since both the variables are pointing to the same memory address.
```

In one word summary: primitive data pass by value, it means assign different address for new variable.
non-primitive data pass by reference, it means assign same address for new declared variable !!!!

<b>32.</b> whats `this` (window object)?

```js
function returnWindow() {
  console.log(this);
}

returnWindow(); // will return entire window object which is known as global object !!
```

<b>33.</b> What is `WeakSet` in JS?

- `WeakSet` is similar with `Set` which collect a unique and ordered elements, but `WeakSet` only can contain object type based data !! Set can contain many different types of data, like string, numbers and etc
- only have 3 methods: `add()`, `delete()` and `has()`

```js
let obj = { message: "Hi" };
const newSet = new WeakSet([obj]);
console.log(newSet); // {{...}} // {0: value: { message: 'Hi' }}
```

<b>34.</b> What is `WeakMap` in JS?

- `WeakMap` is similar with `Map` which store data as key-value pairs format, but `WeakMap` only can save object type based data !! Set can contain many different types of data, like string, numbers and etc
- only have 3 methods: `add()`, `delete()` and `has()`

```js
let obj = { name: "Ella" };
const mapObj = new WeakMap();
mapObj.set(obj, { age: 3 }); // {{ 0: { key: { name: 'Ella' }, { value: { age: 3 } } } }}
```

<b>35.</b> What is Temporal Dead Zone?

It is a phenomenon which stands for calling the variable before defined !!

```js
val = 1; // shows reference error in inspect element console tab

let val;

function throwErrorWhenUseBeforeDefine() {
  word = "Hello"; // throws a reference error in inspect element console tab

  let word;
}
throwErrorWhenUseBeforeDefine();
```

<b>36.</b> what does `fill` mean inside array?

`fill` means set element value

```js
function arrayFn() {
  let newArray = new Array(100).fill("♥");
  return (element) => newArray[element];
}

let getElement = arrayFn(); // Array is created only once

getElement(99);
getElement(70);
```

<b>36.</b> How to open devtools in Electron app

```js
targetWindow?.webContents?.openDevTools?.({ mode: "right" });
```

<a href="https://www.electronjs.org/docs/latest/api/web-contents#contentsopendevtoolsoptions" target="_blank">Reference</a>

<b>37.</b> Test Http2 API request locally, we have to generate the secrets in order to satisfy the SSH connections, how to do it?

MAC OS:

```bash
brew install openssl
openssl req -new -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```

- Make sure you have done the 2nd and 3rd command under your target folder !!!

For HTTP2 connections on browsers, eg: if you save a data record in one tab, another opened tab will get synchronous as well, both of them will show a new saved record !!! This is powerful of using HTTP2

HTTP transfers the data in stream format, json is not good at being a stream, so we have to convert the content-type to text/plain, which is easier to be formatted to stream format !!

HTTP2 is also a real-time, but one direction, only happened during request

<b>38.</b> Preact:

Lightweight version of react, and <a href="https://preactjs.com/guide/v10/differences-to-react#main-differences" target="_blank">main differences</a>

So far: Preact doesn’t use React Synthetic event system, it uses `addEventListener` (native JS API) for event handling !!

<b>39.</b> Difference between getStaticProps() and getServerSideProps() in next.js:

getServerSideProps():

- fetch the data first before sending to client browser.
- as the data is freshed everytime user loads the page, browser can get the latest data view

getStaticProps()

- is used for fetching the data at the build time
- a bit more faster, because of client side rendering for the data fetching process

<a href="https://medium.com/eincode/next-js-data-fetching-getstaticprops-vs-getserversideprops-fcbf43d0ccac" target="_blank">Reference</a>

<b>40.</b> Intersection Observer API

is used for observing the changes for the target element or ancestor element or with its top level document viewport

what can do:

- lazy load images during page scrolled or click 'load more' button
- infinite scrolling, the specific element can be visisble during user scrolling the page

<a href="https://github.com/thebuilder/react-intersection-observer" target="_blank">React version</a>

<b>41.</b> `Eventbus` in JS: is a `publisher / subscriber` pattern, can be used for `decoupling` the components of an application, which means a component can react to events fired from another component without them having direct dependencies with each other. <a href="https://pineco.de/creating-a-javascript-event-bus/" target="_blank">A Quick Reference</a>

<b>42.</b> Garbage Collector

What? is a background process in the JavaScript engine that identifies unreachable objects, removes them, and reclaims the underlying memory

<a href="https://www.ditdot.hr/en/causes-of-memory-leaks-in-javascript-and-how-to-avoid-them" target="_blank">Reference</a>

<b>43.</b> HTTP content-type header

`x-www-form-urlencoded`: only allow develoeprs to upload string typed data (send the data by key-value paires)

`form-data`: allow developers to upload file typed data, also support string based data (send the data by chunks)

Both of them are used for sending form data as POST request

<b>43.</b> Inversion of control: is a programming principle which originally coming from OOP (Object Oriented Programming).

Purpose: Inversion of control is used to increase modularity of the program and make it extensible

<a href="https://en.wikipedia.org/wiki/Inversion_of_control" target="_blank">Concept Reference</a>
<a href="https://en.wikipedia.org/wiki/Inversion_of_control" target="_blank">React Reference</a>

<b>44.</b> `new.target` in JS

to detect whether class or function has been called by using the `new` operator

example:

```js
function Called() {
  if (!new.target) throw new Error("Called() must be called with new !!");
}

try {
  Called();
} catch (error) {
  console.log(error); // Called() must be called with new !!
}
```

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target" target="_blank">reference</a>

<b>45.</b>
