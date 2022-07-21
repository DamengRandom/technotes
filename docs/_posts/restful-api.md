### RestFul API

#### Concept:

Wording: Representational State Transfer (REST)

`REST !== HTTP`

Currently understanding (might be wrong), RESTFul API is an architectural style which uses HTTP requests to access/use data (resource), more like an architectural design pattern

REST is web standards based architecture which uses HTTP protocol

REST determines how the API looks like, developers can set bunch of rules to create their own customized APIs

1). Common Http request consists of

```
- The endpoint: URL for the request
- The method: GET/PUT/POST/DELETE/PATCH
- The headers: cookie/token/content-type/parameters ...
- The data (or body): object to save to db ...
```

2). Data format supported:

```
- application/json
- application/xml
- application/x-wbe+xml
- application/x-www-form-urlencoded
- multipart/form-data
```

#### Rules to follow:

\*. Accept and respond with JSON

Example: Express `bodyParser` Middleware

```js
// old version
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// newer version
app.use(express.json());
```

\*. Use nouns instead of verbs in endpoint paths and naming collections with plural nouns, eg: `/products`

\*. Handle errors gracefully and return standard HTTP error codes

\*. Allow filtering, sorting, and pagination (For larger data loading consideration)

\*. Cache data to improve performance, consider like `Redis`

\*. Versioning our APIs, How? see below:

Commonly, put the route under each of `folder`, like v1, v2 etc ..

Example:

```js
import * as express from "express";

// v1/get-product.js
const router = express.Router();
router.post("/products/:id", middlewareFn(), (req, res) => {
  // Your code logic
});
app.use("/v1", router);

// v2/get-product.js
const router = express.Router();
router.post("/products/:id", middlewareFn(), (req, res) => {
  // Your code logic
});
app.use("/v2", router);
```

\*. Nesting resources for hierarchical objects

Example: If we have comments nested with each post, we need to define our API route like this:

`posts/:postId/comments`

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
// or use this version
// app.use(express.json());

app.get("/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const comments = [];
  // code to get comments by postId
  res.json(comments);
});

app.listen(3000, () => console.log("server started"));
```

#### How to handle API request failure

When you write an API, you need to consider about API request failure case, when API request failed, normally we want to give a chance a retry in order to make request again and again.

However, if you consider the retry too frequently, it will cause the issue which is DDOS (Distributed Denial of Service), which means too many requests for the server to handle, which will cause server down !!

In the above case, the solution for resolving the issue is to use a BACK-OFF strategy, which will play a similar role like Gmail, retry 30s, retry 1 min, retry 2 mins, retry 5 mins, retry 10 mins so on and so on.

In this way, we can make server handle request not too frequently so we can avoid the DDOS attack from the requester side.

References:

(1). <a href="https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/" target="_blank">Restful API design</a>
