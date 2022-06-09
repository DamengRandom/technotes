### Just Code (Shhh)

<b>1.</b> If changes one of object values inside same array, we need to use spread operator (`...`) or `JSON.parse(JSON.stringify())` way to trigger the state changes and get component re-rendered !!!! Code example:

```js
// sort array of objects !!
function compareVotes(a, b) {
  if (a.upvotes < b.upvotes) return 1;
  if (a.upvotes > b.upvotes) return -1;
  return 0;
}

// Way 1:
const afterSorted = JSON.parse(JSON.stringify(articles.sort(compareVotes)));

// Way 2:
const afterSorted = [...articles.sort(compareVotes)];

// Then we can set the changed value:
setCurrent(afterSorted);
```

Completed version below:

```js
import React, { useState } from "react";
import Articles from "./Articles";

function compareDate(a, b) {
  if (a.date < b.date) return 1;
  if (a.date > b.date) return -1;
  return 0;
}

function compareVotes(a, b) {
  if (a.upvotes < b.upvotes) return 1;
  if (a.upvotes > b.upvotes) return -1;
  return 0;
}

let articles = [
  {
    title: "abc test",
    upvotes: 53,
    date: "2019-11-12",
  },
  {
    title: "cde omg, what?",
    upvotes: 23,
    date: "2020-1-12",
  },
  {
    title: "test me test now ...",
    upvotes: 33,
    date: "2021-9-12",
  },
];

export default function ArticleWrapper() {
  const [current, setCurrent] = useState(articles);

  const sortByVotes = () => {
    // const afterSorted = JSON.parse(JSON.stringify(articles.sort(compareVotes)));
    const afterSorted = [...articles.sort(compareVotes)];
    setCurrent(afterSorted);
    console.log("votes", current);
  };

  const sortByDate = () => {
    // const afterSorted = JSON.parse(JSON.stringify(articles.sort(compareDate)));
    const afterSorted = [...articles.sort(compareDate)];
    setCurrent(afterSorted);

    console.log("dates", current);
  };

  return (
    <div>
      <h3>Re-render the list after using sort !!!</h3>
      <div>
        <button onClick={sortByVotes}>sort by upvotes</button>
        <button onClick={sortByDate}>sort by date</button>
      </div>
      <Articles articles={current} />
      {/* Articles component is used for returning tables of articles */}
    </div>
  );
}
```

Reference: <a href="https://stackoverflow.com/questions/56266575/why-is-usestate-not-triggering-re-render" target="_blank">here</a>

<b>2.</b> How to save data like object format instead of array format in NodeJS

```js
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex"); // will generate a random hash id value
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // event bus (emit event !!!!)
  await axios.post("http://localhost:9225/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});
```

<b>3.</b> KnexJS insert data for existing records specific column

```js
// One example of using knex for seeding existing records specific column data

/**
 * Complete SETUP Guidance (V1.0)
 *
 * STEP 1: setup dbName value: either CLIENT_TABLE_NAME or AUDIT_CLIENT_TABLE_NAME
 * Code for client table -> const dbName = dbTableName.CLIENT_TABLE_NAME;
 * Code for audit_client table -> const dbName = dbTableName.AUDIT_CLIENT_TABLE_NAME;
 *
 * STEP 2: setup mode either mock/test data injection or real data injection
 * Code for mock/test injection -> const simulationEnabled = true;
 * Code for real injection -> const simulationEnabled = false;
 *
 * STEP 3: setup clientId either id or audit_id
 * Code for client table -> const clientId = client.id;
 * Code for audit_client table -> const clientId = client.audit_id;
 *
 * STEP 4: setup condition query id either id or audit_id
 * Code for client table -> .where("id", clientId)
 * Code for audit_client table -> .where("audit_id", clientId)
 */

"use strict";

require("dotenv").config();
const dbTableName = require("../lib/const/dbTableName");
const knexCustom = require("../lib/knexCustom");
const { uuid } = require("uuidv4");

// records batch
const itemsPerBatch = 100;
// need to use the table name which needs to generate existing cs_client_id (configurable)
// const dbName = dbTableName.CLIENT_TABLE_NAME;
const dbName = dbTableName.AUDIT_CLIENT_TABLE_NAME;
// Set this to 'true' to get the 'Total affected record' without actually affecting the records
// const simulationEnabled = true;
const simulationEnabled = false;

async function updateClientCsClientId(extractAllCsClientIds, client) {
  let csClientIdObject = {};

  if (
    !client.cs_client_id ||
    (client.cs_client_id && 10 !== client.cs_client_id.length)
  ) {
    while (true) {
      client.cs_client_id = uuid();
      csClientIdObject = {
        csClientId: client.cs_client_id,
        isNew: true,
      };

      if (!extractAllCsClientIds.includes(client.cs_client_id)) {
        break;
      }
    }
  } else {
    csClientIdObject = {
      csClientId: client.cs_client_id,
      isNew: false,
    };
  }

  return csClientIdObject;
}

async function main() {
  console.log("process.env.APP_ENV", process.env.APP_ENV);

  let sqlResponseCount;
  const extractAllCsClientIds = [];

  sqlResponseCount = await knexCustom(dbName)
    .count("*")
    .catch((err) => {
      console.error(err);
    });

  const recordCount = sqlResponseCount[0].count;
  const batchCount = Math.ceil((recordCount * 1.0) / itemsPerBatch);
  let errorRecordCount = 0;
  let affectedRecordCount = 0;
  let skippedRecordCount = 0;

  for (let i = 0; i < batchCount; i++) {
    console.log(`Processing batch sequence ${i}...`);

    sqlResponseCount = await knexCustom(dbName)
      .orderBy("id", "asc")
      .limit(itemsPerBatch)
      .offset(i * itemsPerBatch)
      .catch((err) => {
        console.error(err);
      });

    for (let j = 0; j < sqlResponseCount.length; j++) {
      const client = sqlResponseCount[j];
      // const theId = client.id;
      const theId = client.audit_id;
      const { csClientId, isNew } = await updateClientCsClientId(
        extractAllCsClientIds,
        client
      );
      extractAllCsClientIds.push(csClientId);

      if (isNew) {
        console.log(
          `Updating cs client id: ${csClientId} for id: ${theId} ...`
        );

        if (simulationEnabled) {
          affectedRecordCount++;
        } else {
          let errorFound = false;

          await knexCustom(dbName)
            .update({
              cs_client_id: csClientId,
            })
            // .where("id", theId)
            .where("audit_id", theId)
            .catch((err) => {
              errorFound = true;
              console.error(err);
            });

          if (errorFound) {
            errorRecordCount++;
          } else {
            affectedRecordCount++;
          }
        }
      } else {
        console.log(`Unmodified client ${theId} skipped.`);

        skippedRecordCount++;
      }
    }
  }

  await knexCustom.destroy();
  console.log(`simulationEnabled: ${simulationEnabled}`);
  console.log(`Total error record    : ${errorRecordCount}`);
  console.log(`Total affected record : ${affectedRecordCount}`);
  console.log(`Total skipped record  : ${skippedRecordCount}`);
  console.log(`Total record          : ${recordCount}`);
  console.log("Updating updateClientCsClientId done!");
}

main().catch((err) => {
  console.error(err);
});
```

<b>4.</b> Palindrome interview question demo:

```js
function palindrome(word) {
  if (typeof word === "string") {
    var regex = /[^A-Za-z]/g;

    word = word.toLowerCase().replace(regex, "");

    var wordLength = word.length;

    for (let i = 0; i < wordLength / 2; i++) {
      if (word[i] !== word[wordLength - 1 - i]) {
        return false;
      }

      return true;
    }
  } else {
    console.log("Input must be a string ..");
  }
}

console.log(palindrome("kyayk")); // true
console.log(palindrome("damon")); // false
```

<b>5.</b> Find the same elements which occurred in 2 arrays

```js
// 2 List of strings and return same elements which occurred in both array lists

// const arr1 = ['1', '2', '4'];
// const arr2 = ['11', '43', '55', '2', '832', '66', '4', '222', '1212'];
const arr1 = ["I", "love", "Ella", "!"];
const arr2 = ["Come", "on", "Ella", ",", "you", "can", "make", "it", "!"];

const commonElements = arr1.filter((el) => arr2.includes(el));

console.log(commonElements);

// if using underscore js or lodash js, we can use a function called `intersection`
// eg:
_.intersection(arr1, arr2);
```

<b>6.</b> Merge 2 arrays and remove repeated elements

```js
const arr2 = ["I", "love", "Ella", "!"];
const arr1 = ["Come", "on", "Ella", ",", "you", "can", "make", "it", "!"];

const merged = [...arr1, ...arr2];
const mergedWithoutRepeats = [...new Set(merged)]; // remove repeat elements inside array

console.log(mergedWithoutRepeats);
```

<b>7.</b> JavaScript Events and event listeners usage, especially <strong>Event Delegation</strong>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript Events Demo</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
      }

      body,
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .grandParent {
        width: 200px;
        height: 200px;
        background-color: red;
      }

      .parent {
        width: 130px;
        height: 130px;
        background-color: blue;
      }

      .child {
        width: 60px;
        height: 60px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div class="grandParent">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>
    <div class="hi">
      Click and see console (After 2 seconds, event will be removed ~~)
    </div>
  </body>

  <script>
    const grandParentNode = document.querySelector(".grandParent");
    const parentNode = document.querySelector(".parent");
    const childNode = document.querySelector(".child");

    grandParentNode.addEventListener("click", (event) => {
      console.log(
        "First time trigger click event on grandParent node: ",
        event.target
      );
    });

    grandParentNode.addEventListener(
      "click",
      (event) => {
        console.log(
          "Second time trigger click event on grandParent node: (trigger capture bubble) ",
          event.target
        );
      },
      { capture: true }
    );

    parentNode.addEventListener("click", (event) => {
      console.log(
        "First time trigger click event on parent node: ",
        event.target
      );
    });

    parentNode.addEventListener(
      "click",
      (event) => {
        console.log(
          "Second time trigger click event on parent node: (trigger capture bubble) ",
          event.target
        );
      },
      { capture: true }
    );

    childNode.addEventListener("click", (event) => {
      console.log(
        "First time trigger click event on child node: ",
        event.target
      );
    });

    childNode.addEventListener(
      "click",
      (event) => {
        // event.stopPropagation();
        console.log(
          "Second time trigger click event on child node: (trigger capture bubble) ",
          event.target
        );
      },
      { capture: true }
    );

    // { capture: true } is basically make child event run at last, make parent event run first ~~

    // event.stopPropagation(): stop capturing or bubbling events (please check above example console result ..) [More like a switch, ensure when you want to stop running events continue with children elements, just stop ~~]

    function printHi() {
      console.log("Hi ~~");
    }

    document.querySelector(".hi").addEventListener("click", printHi);
    setTimeout(() => {
      document.querySelector(".hi").removeEventListener("click", printHi);
    }, 2000);

    // Tricks above:

    //  MUST MUST define a function for add and remove event listener, if we put anonymous function for both listeners, the remove event listener will not work, because JS treated as 2 different events !!!

    // Finally: Event Delegation

    const divNodes = document.querySelectorAll("div");
    divNodes.forEach((div) => {
      div.addEventListener("click", () => {
        console.log(
          "You just triggered all dev elements under this web page .."
        );
      });
    });

    const newAddedNode = document.createElement("div");
    newAddedNode.style.width = "20px";
    newAddedNode.style.height = "20px";
    newAddedNode.style.backgroundColor = "orange";

    document.body.appendChild(newAddedNode);

    // Now when I click this newAddedNode element, console message won't show because of the node was added after `const divNodes = document.querySelectorAll('div');` Thus, div addEventListener will not trigger work for this newAddedNode. This is why we need event delegation:

    // how to do it? Basic event delegation version here:

    // document.addEventListener('click', (event) => {
    //   if (event.target.matches('div')) {
    //     console.log('event delegation: delegate for when clicking div element, console message get called');
    //   }
    // });

    // Upgraded version:

    function addGlobalEventListener(type, selector, callback) {
      document.addEventListener(type, (event) => {
        if (event.target.matches(selector)) callback(event);
      });
    }

    addGlobalEventListener("click", "div", (event) => {
      console.log(
        "event delegation: delegate for when clicking div element, console message get called"
      );
    });
  </script>
</html>
```

<b>8.</b> 4 Tips from Kyle: (Tip 1)

```js
// Tip 1: using ?? for setup default values !!!!

// Rookie code:
// function  calculatePrice(price, taxes, description) {
//   const total = price * (1 + taxes);

//   console.log(`%c${description} with Tax: %c$${total}`, 'font-weight: bold; color: red;', 'color: green;');
// };

// calculatePrice(100, 0.07, 'Damon\'s item 1'); // normal case [result: Damon's item 1 with Tax: $107]
// calculatePrice(100, undefined, undefined); // edge case [result: undefined with Tax: $NaN]
// // therefore we need put 'default' values

// Better code:
function calculatePrice(price, taxes, description) {
  // put default values to prevent edge cases cause error
  const defaultTaxes = 0.05;
  const defaultDescription = "Default Item";

  description = description ? description : defaultDescription;
  taxes = taxes ? taxes : defaultTaxes;

  const total = price * (1 + taxes);

  console.log(
    `%c${description} with Tax: %c$${total}`,
    "font-weight: bold; color: red;",
    "color: green;"
  );
}

calculatePrice(100, 0.07, "Damon's item 1"); // normal case [result: Damon's item 1 with Tax: $107]
// Now the when we face edge cases, we gor default value covered !!!
calculatePrice(200, undefined, ""); // edge case [result: Default Item with Tax: $210]
calculatePrice(100, undefined, undefined); // edge case [result: Default Item with Tax: $105]

// Future code (but currently not many browsers supported): so not well supported
// Reference: https://www.youtube.com/watch?v=v2tJ3nzXh8I
// function  calculatePrice(price, taxes, description) {
//   // put default values to prevent edge cases cause error
//   const defaultTaxes = 0.05;
//   const defaultDescription = 'Default Item';

//   description = description ?? defaultDescription;
//   taxes = taxes ?? defaultTaxes;

//   const total = price * (1 + taxes);

//   console.log(`%c${description} with Tax: %c$${total}`, 'font-weight: bold; color: red;', 'color: green;');
// };

// calculatePrice(100, 0.07, 'Damon\'s item 1'); // normal case [result: Damon's item 1 with Tax: $107]
// // Now the when we face edge cases, we gor default value covered !!!
// calculatePrice(200, undefined, ''); // edge case [result: Default Item with Tax: $210]
// calculatePrice(100, undefined, undefined); // edge case [result: Default Item with Tax: $105]
```

<b>9.</b> 4 Tips from Kyle: (Tip 2)

```js
// Tip 2: add some styles for console log
var x = "Damon",
  y = 120;
console.log(
  `%c${x} with Tax: %c$${y}`,
  "font-weight: bold; color: red;",
  "color: green;"
);
// %c is for setting up css stylings, second %c for second comma styling setup !!!
```

<b>10.</b> 4 Tips from Kyle: (Tip 3)

```js
// Tip 3: optional chaining
class Person {
  constructor(name, address, hobbies) {
    this.name = name;
    this.address = address;
    this.hobbies = hobbies;
  }

  print() {
    console.log(this);
  }
}

function printPersonStreet(person) {
  console.log(person?.address?.street); // variable? is quite powerful prevent error of undefined !!!!! its called optional chaining and which always returns undefined instead of output an error !!!!
  // If we don't put ?, we will get error for UI for sure !!!!!!!!

  // console.log(person.address.street); // normal case
}

// normal case
// const damon = new Person(
//   'kyle',
//   { street: '1st street', city: 'Jinan' },
//   ['jogging', 'movie', 'reading']
// );

// get data like undefined case!!!
const damon = new Person("kyle", undefined);

// damon.print();

printPersonStreet(damon);

// ?. : run the function if function is existed !!! (also try to avoid errors for UI !!!!) Example here:
damon.printName(); // function does not exist (General error: damon.printName is not a function)
damon.printName?.(); // not run because function does not existed
damon.print?.(); // normal case

// also works well for array: Example:
damon.hobbies?.[0]; // undefined (can be used for detect first element inside an array, especially the for case you don't know whether you can get first element from current array or not !!!!!)
```

<b>11.</b> 4 Tips from Kyle: (Tip 4)

```js
// Tip 4: using keyword 'defer' for writing script tag inside <header> section, Example:

<html>
  <head>
    <script src="main.js" defer></script>
  </head>
  <body> ... </body>
</html>

// top version is better than bottom version, because JavaScript downloads file at last because of the script tag put at last ...

<html>
  <head>
    ...
  </head>
  <body>
    <p>html doms ...</p>
    <script src="main.js"></script>
  </body>
</html>
```

<b>12.</b> Demo of palindrome

```js
function palindrome(word) {
  if (typeof word === "string") {
    var regex = /[^A-Za-z]/g;

    word = word.toLowerCase().replace(regex, "");

    var wordLength = word.length;

    for (let i = 0; i < wordLength / 2; i++) {
      if (word[i] !== word[wordLength - 1 - i]) {
        return false;
      }

      return true;
    }
  } else {
    console.log("Input must be a string ..");
  }
}

console.log(palindrome("kyayk"));
```

<b>13.</b> `toString()` & `join()` & `replace()`

```js
["test1@test.co", "test2@test.co"]
  .toString()
  [
    // "test1@test.co,test2@test.co"
    ("test1@test.co", "test2@test.co")
  ].join(", ")
  [
    // "test1@test.co, test2@test.co"
    ("test1@test.co", "test2@test.co")
  ].toString()
  .replace(",", ", ");
// "test1@test.co, test2@test.co"
```

<b>14.</b> `reducer()` method (array -> object) recall

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Reducer Demo</title>
  </head>
  <body>
    <p>Show case for reducer method (Functional Programming)</p>
    <script>
      const demoArray = [
        {
          id: "123-123-123",
          name: "damon",
          age: 30,
        },
        {
          id: "234-234-234",
          name: "ella",
          age: 2,
        },
        {
          id: "345-345-345",
          name: "unknown",
          age: 0,
        },
        {
          id: "456-456-456",
          name: "unknown",
          age: 0,
        },
      ];

      const initialObject = {};

      // convert to object
      function formatter(accumulator, current) {
        return {
          ...accumulator,
          [`${current.name}-${Date.now()}`]: current,
        };
      }

      const outputObject = demoArray.reduce(formatter, initialObject);

      console.log("outputObject: ", outputObject);

      // convert to object array
      const arrayFormator = (accumulator, currentValue) => {
        if (!accumulator.hasOwnProperty([currentValue.name])) {
          accumulator[currentValue.name] = [];
        } // create new coming object as a new array, eg:

        // accumulator: {
        // ...accumulator,
        //   name: []
        // }

        accumulator[currentValue.name].push(currentValue);
        // then put the object inside the new created array in line 53

        // accumulator: {
        //   ...accumulator,
        //   name: [
        //     id: "345-345-345",
        //     name: "unknown",
        //     age: 0
        //   ]
        // }

        return accumulator;
      };

      const outputObjectArray = demoArray.reduce(arrayFormator, initialObject);

      console.log("outputObjectArray: ", outputObjectArray);
    </script>
  </body>
</html>
```

<b>15.</b> Word Counter (JavaScript Observer Pattern)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Word Counter</title>
  </head>
  <body>
    <h3>
      Example of using JavaScript Observer Pattern to create a word counter
      example
    </h3>

    <textarea id="words" placeholder="Please type word here .."></textarea>

    <script>
      class Observer {
        constructor() {
          this.observers = [];
        }

        subscribe(fn) {
          this.observers.push(fn);
        }

        broadcast(data) {
          this.observers.forEach((subscriber) => subscriber(data));
        }
      }

      const getTextCountResult = (text) =>
        text ? text.trim().split(/\s+/).length : 0;

      const wordCountDOM = document.createElement("p");
      wordCountDOM.innerHTML = 'Word Count: <b id="counterValue">0</b>';

      document.body.appendChild(wordCountDOM);

      const inputObserver = new Observer();

      inputObserver.subscribe((text) => {
        const counterValueDOM = document.getElementById("counterValue");

        counterValueDOM.textContent = getTextCountResult(text);
      });

      const inputDOM = document.getElementById("words");

      inputDOM.addEventListener("keyup", () =>
        inputObserver.broadcast(inputDOM.value)
      );
    </script>
  </body>
</html>
```

<b>16.</b> One JS `anagram` example

```js
var firstWord = "Mary";
var secondWord = "Army";

isAnagram(firstWord, secondWord); // true

function isAnagram(first, second) {
  // For case insensitivity, change both words to lowercase.
  var a = first.toLowerCase();
  var b = second.toLowerCase();

  // Sort the strings, and join the resulting array to a string. Compare the results
  a = a
    .split("")
    .sort()
    .join("");
  b = b
    .split("")
    .sort()
    .join("");

  return a === b;
}
```

<b>17.</b> `shorter` version of fizz buzz ..

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? "FizzBuzz" : "Fizz") : b ? "Buzz" : i);
}
```

<b>18.</b> Example Test (Can be interview question)

```js
// Give [1,2,3,4,5], rotate r = 3 times for rotating the array, set value v = 5, make the output like this:

// rotation 1: [5,1,2,3,4]
// rotation 2: [1,5,2,3,4]
// rotation 3: [1,2,5,3,4]
```

```js
// Answer:
function arrayRotation(arr, r, v) {
  for (let i = 0; i < r; i++) {
    arr = [1, 2, 3, 4, 5]; // not good enough (still acceptable)
    arr.splice(i, 0, v);
    arr.pop();
    console.log(`Rotation ${i + 1}`, arr);
  }
}

arrayRotation([1, 2, 3, 4, 5], 3, 5);

// Better solution: we can make y as immutable array !! [...y]

const y = [1, 2, 3, 4, 5];
function arrayRotation(arr, r, v) {
  for (let i = 0; i < r; i++) {
    arr = [...y]; // make array y as immutable array [1,2,3,4,5]. if using y, the output result will be different, since the y and arr are shared with same memory address !!
    arr.splice(i, 0, v);
    arr.pop();
    console.log(`Rotation ${i + 1}`, arr);
  }
}
arrayRotation(y, 3, 5);
```

<b>19.</b> capitalize first letter

```js
function capitalizeFirstLetter(string) {
  const stringArray = string.split("") || [];
  const firstLetter = stringArray[0].toUpperCase();
  const oldString = stringArray.slice(1);

  return [firstLetter, ...oldString].join("");
}
```

<b>20.</b> camelized

```js
// Takes an ["array", "of", "strings"] and returns a camelized ["array", "Of", "Strings"]
function camelize(stringArray) {
  let result = [];
  for (let i = 0; i < stringArray.length; i++) {
    if (i > 0) {
      result.push(capitalizeFirstLetter(stringArray[i]));
    } else {
      result.push(stringArray[i]);
    }
  }

  return result;
}
```

<b>21.</b> snake_case_string to camelCaseString

```js
// Takes a "snake_case_string" and returns a "camelCaseString"
function snakeToCamel(snake_case_string) {
  const textArray = snake_case_string.split("_");
  return camelize(textArray).join("");
}
```

<b>22.</b> vanilla js pop function

```js
function pop(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i < array.length - 1) newArray.push(array[i]);
  }
  return newArray;
}

pop([1, 2, 3, 4]);
```

<b>23.</b> vanilla js update function

```js
function update(index, value, array) {
  let newArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i === index) {
      newArray.push(value);
    } else {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

update(0, "spelling", ["spelling", "is", "hard"]);
```

<b>24.</b> simple push

```js
function push(element, array) {
  return [...array, element];
}

const postPush = push(4, [1, 2, 3]);
```

<b>25.</b> simple nested functions

```js
function a() {
  function b() {
    function c() {
      console.log(foo);
    }

    c();
  }

  var foo = "foo";
  b();
}

a(); // foo
```

<b>26.</b> check anagrams code example:

```js
function sorting(arr1, arr2) {
  if (arr1.sort().toString() === arr2.sort().toString()) {
    return "Both are anangrams";
  } else {
    return "Not anagrams ..";
  }
}

sorting(["m", "a", "y"], ["a", "m", "y"]); // "Both are anangrams"
```

<b>27.</b> `Object.defineProperty` example

```js
let obj = {
  name: "value_name",
};

Object.defineProperty(obj, "name", { writable: true, value: "new_value" });

console.log(obj); // { name: 'new_value' }
```
