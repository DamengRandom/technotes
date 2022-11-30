### NodeJS Recall Tips

Node JS concept:

It is an open-souce JavaScript runtime envrionment which is built on Chrome V8 JavaScript engine which allow javascript code to run on server

<b>1.</b> Dependency Injection

In NodeJS, Dependency Injection (DI) is a common design pattern for your codebase, normally we consider to use DI when we want to make our life easier as developer, especially deal with unit tests, so we only mock it locally, eg: we don't need to make a real / remote API call from other servers, we can do it internally with DI concept.

<string>DI concept is a `wrapper` concept which includes the dependent classes into the major class, functions can be straight away used</string>

<i>-- Similar like HOF (High Order Function): `() => () => {...}`</i>

<b>-- Purposes --</b>

-- We are going to inject something (eg: class, function) instead of import something !!!
-- Made code reusable easily with this pattern
-- Able to supply dummy data for unit testing

eg:

```js
// function 1: walawala function file
module.exports = function() {
  return {
    walawala: function() {
      console.log("ma mi ma mi hong ..");
    },
  };
};

// function 2: aloha function file
module.exports = function(walawalaClass) {
  return {
    aloha: function() {
      walawalaClass.walawala();
    },
  };
};

// index.js
var walawalaClass = require("./walawala")();
var alohaClass = require("./aloha")(walawalaClass); // DI
alohaClass.aloha(); // ma mi ma mi hong ..
```

- Practical example codebase: <a href="https://github.com/DamengRandom/node-dependency-injection-concept" target="_blank">click here</a>

<b>2.</b> General error handling

When we write NodeJS API, we can write a class and middleware function to handle generic errors,

Code example:

```js
// Step 1: error handling class
class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static generalServerError(msg) {
    return new ApiError(500, msg);
  }
}

module.exports = ApiError;

// Step 2: middleware function
const ApiError = require("./ApiError");

// Error handler middleware function !!!!!
function apiErrorHandler(err, req, res, next) {
  // For developer (maybe cloudwatch ..)
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Server is down at moment .." });
}

module.exports = apiErrorHandler;

// Step 3: calling the error handler functionality:
router.get("/api/employees/:id", (req, res, next) => {
  Employee.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      next(
        ApiError.badRequest(
          `Error for fetching /api/employees/:id, details are: ${err}`
        )
      );
      return; // stop the program when error detected ..
    }
  });
});
```

Complete version of codebase: <a href="" target="_blank">here</a>
Reference: <a href="youtube.com/watch?v=DyqVqaf1KnA" target="_blank">here</a>

<b>3.</b> ExpressJS `next()`

In ExpressJS, next function is in express router which allows to pass the current route and `find next middleware function` to run, can be treated as skip it and go for next (function)

Without `next()`, it will cause the application api request process hang there which is not responding ...

Reference: <a href="https://expressjs.com/en/guide/writing-middleware.html">here</a>

<b>4.</b> When building node API, remember:

- Write clean and readable code
- Write reusable pieces of code across our application
- Avoid repetition
- Add new features without disrupting existing code

<b>5.</b> Common good practices when building node restful API

(1). Create a folder structure for your project
(2). Separate business logic and API routes
(3). Use a service layer (controller class -> service class -> database access layer (DAL))
(4). Use dependency injection
(5). Use a config folder to organize configuration files
(6). Use another layer for third-party services calls
(7). Use a linter tool
(8). Put comments in your codebase (especially business logic related)

Reference: <a href="https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/#rule3useaservicelayer" target="_blank">here</a>

<b>6.</b> Remember always save time to UTC time string for database (Backend development)

Examples:

```js
// save time to UTC time string
$(".datetime").each(function(idx) {
  $(this).val(
    moment($(this).val(), "DD/MM/YYYY hh:mm A")
      .utc()
      .toISOString()
  );
});

// when front-end read the UTC time, please convert time from UTC time string to local time string, example:
const momentTZ = require("moment-timezone");
const localTime = momentTZ(UTCTime)
  .tz(currentTimeZone)
  .format("DD/MM/YYYY hh:mm A");
```

<b>7.</b> Using node `https` to make API

```js
const https = require("https");

const errorMessage = "Username Not Found";

function httpGet({ body, ...options }) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        ...options,
      },
      (res) => {
        const stream = [];
        let body = "";

        res.on("data", (data) => stream.push(data));
        res.on("end", () => {
          body += stream;

          body = JSON.parse(body);
          resolve(body);
        });
      }
    );

    req.on("[error]:", reject);

    if (body) {
      req.write(body);
    }

    req.end();
  }).catch((err) => {
    console.error("Error: ", err);
  });
}

async function getNumTransactions(username) {
  const usernameResponse = await httpGet({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    hostname: "jsonmock.hackerrank.com",
    path: `/api/article_users?username=${username}`,
  });

  if (
    usernameResponse &&
    usernameResponse.data &&
    usernameResponse.data[0] &&
    usernameResponse.data[0].id
  ) {
    console.log(usernameResponse);
    const userId = usernameResponse.data[0].id;
    try {
      const userIdResponse = await httpGet({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        hostname: "jsonmock.hackerrank.com",
        path: `/api/transactions?&userId=${userId}`,
      });

      if (userIdResponse && userIdResponse.total) {
        console.log(userIdResponse.total);
        return userIdResponse.total;
      }

      return errorMessage;
    } catch (error) {
      return errorMessage;
    }
  }
  return errorMessage;
}

// console.log(getNumTransactions("jay"));
console.log(getNumTransactions("epaga"));
```

<b>8.</b> API Folder structure (2021 understanding)

```block
assets
  - images
  - fonts (optional)
src
  - apis
    - v1
      - controllers (MVC: C: Controller Layer)
        - tests
        - index.j(t)s (for general import purpose)
      - utils (helper/utility functions)
        - tests
      - constants
        - types (if using typescript)
        - normal constants files based on category
      - middleware
        - tests
      - models (MVC: M: Model Layer)
        - index.j(t)s (for general import purpose)
      - routes
        - index.j(t)s (for general import purpose)
      - services (Service layer for extract business logics !!)
      - validations
        - tests (optional)
        - index.j(t)s (for general import purpose)
  - config
    - database config
    -
  index.ts (root file like do all imports and server boot up)
  .env (variables setup)
  .e(t)slintignore
  .gitignore
  jest.config.json
  package.json
  tsconfig.json (optional typescript only)
  yarn.lock

Reference Link: <a href="https://www.youtube.com/watch?v=oNlMrpnUSFE" target="_blank">here</a>
```

<b>9.</b> Non-blocking in Node JS

Non-blocking means `Asynchronous` in Node JS

A non-blocking call is to provide a callback function that is to be called when operation is complete

Allow single thread processes multiple request at the same time. (More efficient, More performant)

<a href="https://bytearcher.com/articles/blocking-vs-non-blocking-in-node.js/#:~:text=A%20non%2Dblocking%20call%20in,these%20mechanisms%20into%20JavaScript%20callbacks." target="_blank">Reference</a>

<b>10.</b> URL module in Node: Split up a web address into readable parts, eg:

```js
var url = require("url");
var adr = "http://localhost:8080/default.htm?year=2021&month=september";
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2021&month=september'

var qdata = q.query; //returns an object: { year: 2021, month: 'september' }
console.log(qdata.month); //returns 'september'
```

<b>11.</b> In NodeJS, a way of making http request: using `const https = require('https');`

<b>12.</b> NodeJS runtime environment: is an environment which your application is running in

<b>13.</b> Please read event loop for NodeJS: <a href="https://github.com/learning-zone/nodejs-interview-questions#q-how-do-nodejs-works" target="_blank">How NodeJS works?</a>

<b>14.</b> NodeJS Error handlings:

2 types of errors:

- operational errors:
  - fail to connect with the server
  - request timeout
  - socket hang up
  - user invalid input
- programmer errors:
  - did not catch a rejected promise
  - pass an object where a string is required
  - forget to do the garbage collection

<b>15.</b> NodeJS error `stack`:

```js
const errorObject = new Error("Error message");
console.log(error.stack); // point where the error occurred
```

<b>16.</b> Common ways to do error handlings in NodeJS:

1). using `try { ... } catch (error) { ... }`

for example:

```js
const asyncTask = async () => {
  try {
    const t1 = await task1();
    const t2 = await task2();

    return [...t1, ...t2];
  } catch (error) {
    console.lot(error);
  } finally {
    // if has something need to clean up
    await cleanup();
  }
};
```

2). using `process.on('uncaughtException, callback)`:

This is a good way to capture the uncaughtException (programmer typed) errors

3). using `middleware`

For example:

```js
// middleware error handling example
const erorrHandler = (error, req, res, next) => {
  console.log(`Error: ${error.message}`);
  const status = error.status || 400;
  res.status(status).send({ error: error.message });
};

// use the middleware
app.use(erorrHandler);
```

<a href="https://www.becomebetterprogrammer.com/how-to-use-error-handler-middleware-with-express-js-and-typescript/" target="_blank">Reference</a>

4). using `Logging` system (eg: `winston` + `morgan`) to log all the errors either to a log file or to cloud to store all the error messages

To sum up: (The most important conceptual steps !!)

Step 1: create your own error handler class
Step 2: write all the error handler functions and ensure its all re-usable
Step 3: using some logging tools to minitor the errors inside your node app

<b>17.</b> NodeJS error handlings code peices (Recall only)

```js
const express = require("express");
const axios = require("axios");
const app = express();

// express way (expresss API) to handle errors
app.get("/expresshandler", (req, res) => {
  // res.send("response for request");
  let error = new Error(`Error occurred at ${req.url}`);
  error.statusCode = 400;
  // error.message = `Error occurred at ${req.url}`;
  throw error;
  // res.status(400).send({ error: error.message });
});

// try catch way of handling errors
app.get("/asyncerror", async (req, res, next) => {
  try {
    throw new Error("Error occurred (async function demo) ...");
  } catch (error) {
    next(error);
  }
});

// middleware error handling example
const erorrHandler = (error, req, res, next) => {
  console.log(`Error: ${error.message}`);
  const status = error.status || 400;
  res.status(status).send({ error: error.message });
};

const invalidPathHandler = (request, response, next) => {
  response.status(404);
  response.send({ error: "invalid path" });
};

app.get("/products", async (req, res, next) => {
  try {
    const apiResponse = await axios.get("http://localhost:3001/products");
    const jsonResponse = apiResponse.data;

    res.send(jsonResponse);
  } catch (error) {
    next(error);
  }
});

// we can add more than 1 middlware for handling different errors ~~
app.use(erorrHandler);
app.use(invalidPathHandler);

app.listen(3829, () => {
  console.log("Server is up ..");
});
```

<b>18.</b> What is `Error.captureStackTrace()`:

For instance:

```js
const fun1 = () => {
  fun2();
};
const fun2 = () => {
  fun3();
};
const fun3 = () => {
  log_stack();
};
function log_stack() {
  let err = {};
  Error.captureStackTrace(err);
  console.log(err.stack);
}
fun1();

// Error
//     at log_stack (<anonymous>:6:11)
//     at fun3 (<anonymous>:3:22)
//     at fun2 (<anonymous>:2:22)
//     at fun1 (<anonymous>:1:22)
//     at <anonymous>:9:1
```

Explanantion: As you can see, the error stack will call each level of the related functions (from bottom to top)
Also reflects the location of the specific error (Easier for developer to do som debuggings)

<b>19.</b> Node JS tips for interview:

(0). What is NodeJS:

Node.js is an open-source server side runtime environment built on Chrome's V8 JavaScript engine. It provides an event driven, non-blocking (asynchronous) I/O and cross-platform runtime environment for building highly scalable server-side applications using JavaScript.

(1). What is NodeJs process model:

NodeJS run in a `single process` and application code run in a `single thread` which cost less resources (better performance). Althpugh NodeJS is single threaded, each of I/O requests will be handled `asynchrounously` which means single thread does not need to wait the request to complete before handling the next request.

(2). NodeJS has one more type JavaScript does not have which is `Buffer`, Buffer is mainly used for storing the binary data, when reading a file or receing some packets from network.

```js
var buffer = new Buffer(string, [encoding]);
```

(3). Concept of `URL module` in NodeJS: mainly for splitting up the web address into few readable parts, eg:

```js
var url = require("url");
var adr = "http://localhost:8080/default.htm?year=2021&month=september";
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2021&month=september'

var qdata = q.query; //returns an object: { year: 2021, month: 'september' }
console.log(qdata.month); //returns 'september'
```

(4). What is NodeJS runtime mean?

Step 1: Runtime is just an environment your application is running in

Step 2: NodeJS runtime is a software stack which is responsible for installing the web services code and its dependencies and run the web services.

(5). How NodeJS work?

Step 1: Clients send request to server

Step 2: NodeJS server starts preparing `a thread pool` for providing services in order to handle the client requests

Step 3: NodeJS server receives requests and put requests into `event queue`.

Step 4: NodeJS uses its own component `event loop` to handle the requests by checking the `event queue`.

Step 5: If event queue has no tasks, waiting until it has some, else, event loop starts handling requests.

Step 5.5 If requests does not need any blocking I/O operations, the handling process will be asynchronous, which means requests can be handled at teh same time without any waiting. Else, handle the request step by step.

Step 6: After handled the reuqests, will send th response back to client side.

<a href="https://www.geeksforgeeks.org/explain-the-working-of-node-js/#:~:text=It%20is%20a%20used%20as,fast%2C%20and%20data%2Dintensive." target="_blank">Check the flow diagram !!</a>

(6). What is error-first callback in NodeJS? (Please remember a good practice is always check the error first ~~)

```js
fs.readFile("file.json", function(err, data) {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
```

(7). `Eslint` can be used for keeping code styling cosnistent

(8). How can we secure HTTP cookies in order to prevent XSS attack? Answer: using `HttpOnly` attribute, eg: `Set-Cookie: [name]=[value]; HttpOnly`

(9). Node comes with REPL (Read, Eval, Print, Loop) computer environment, similar to Shell (Liunx/Unix) and command prompt.

- Read: Read the user input and parse it to JavaScript data structure
- Eval: The parsed JavaScript structure is evaluated for the results
- Print: The result will be printed after evalution process
- Loop: Loop the input command

(10). Difference between Asychronous and Non-blocking: Asychrnous does not respond immediately, but Non-blocking does respond immediately if the data is available and not simply returns an error !!!!

(11). Using `node-inspector` to debug NodeJS application ~

(12). EventEmitter in NodeJS:

```js
const events = require("events");
const eventEmitter = new events.EventEmitter();

// listener #1
const listener1 = function listener1() {
  console.log("listener1 executed.");
};

// listener #2
const listener2 = function listener2() {
  console.log("listener2 executed.");
};

// Bind the connection event with the listener1 function
eventEmitter.addListener("connection", listener1);

// Bind the connection event with the listener2 function
eventEmitter.on("connection", listener2);

let eventListeners = eventEmitter.listenerCount("connection");
console.log(eventListeners + " Listener(s) listening to connection event");

// Fire the connection event
eventEmitter.emit("connection");

// Remove the binding of listener1 function
eventEmitter.removeListener("connection", listener1);
console.log("Listener1 will not listen now.");

// Fire the connection event
eventEmitter.emit("connection");

eventListeners = eventEmitter.listenerCount("connection");
console.log(eventListeners + " Listener(s) listening to connection event");

console.log("Program Ended.");
```

<b>20.</b>
