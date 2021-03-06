### NodeJS Recall Tips

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

<b>10.</b>
