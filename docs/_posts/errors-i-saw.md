### Some errors I saw before

1). Common `Cannot read property 'property' of undefined` error:

```js
// Case 1:

function x() {
  const val = { a: { b: [] } };
  if (val.a.b[0] === 1) {
    return "I love JavaScript";
  }
  return "nope ...";
}

x();
// nope ...

// Case 2:

function x() {
  const val = { a: { b: undefined } };
  if (val.a.b[0] === 1) {
    return "I love JavaScript";
  }
  return "wrong ...";
}

x();
// VM31650:3 Uncaught TypeError: Cannot read property '0' of undefined
//     at x (<anonymous>:3:13)
//     at <anonymous>:9:1

// Case 3:

function x() {
  const val = null;
  if (val && val.a && val.a.b && val.a.b[0].value === 1) {
    return "I love JavaScript";
  }
  return "nope ...";
}

x();
// nope ...

// Case 4:

var val = { a: { b: [] } };
var thresh = { q: [1] };
function x() {
  if (
    (val && val.a && val.a.b && val.a.b[0] && val.a.b[0].value) ===
    (thresh && thresh.q && thresh.q[0])
  ) {
    return "I love JavaScript";
  }

  return "nope ...";
}

x();
// nope ...
val.a.b[0];
// undefined
val && val.a && val.a.b && val.a.b[0] && val.a.b[0].value;
// undefined
thresh && thresh.q && thresh.q[0];
// 1
val.a.b[0].value;
// VM104:1 Uncaught TypeError: Cannot read property 'value' of undefined
// at <anonymous>:1:12
```

2). Uncaught ReferenceError: `variable` is not defined

```js
function error() {
  let y = 2;
}

error();
console.log("y: ", y); // Uncaught ReferenceError: y is not defined
```

3). Uncaught TypeError: `functionName` is not a function

```js
aloha();
// TypeError

var aloha = function aloha() {
  console.log("Hello!");
};

// TypeError means we're trying to do something with a value that is not allowed
```

4). Jest test error: `Invalid hook call.`

How to fix: jest mock that hook function before each test cases. Eg:

```js
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useMemo: () => jest.fn(),
}));
```

<a href="https://stackoverflow.com/questions/62360926/invalid-hook-call-when-mocking-react-hoc-with-jest" target="_blank">Reference</a>

5). Common typescript error: `npm package error`

In typescript, when you install package and shown some error "Try `npm install @types/package-name`“

Here is the <a href="https://github.com/react-component/animate/issues/79" target="_blank">solution</a>

6). How to clean up the `useDispatch` action inside useEffect hook?

<a href="https://stackoverflow.com/questions/63944762/how-to-clean-up-a-redux-usedispatch-action-inside-useeffect" target="_blank">Solution</a>

`With a void return, I thought my dispatch calls in the action creator will go straight to my reducer, but in my component nothing will be returned, so I shouldn't have to cleanup anything.`

<a href="https://redux.js.org/usage/deriving-data-selectors#creating-unique-selector-instances" target="_blank">Reference 1</a>

<a href="https://daveceddia.com/useeffect-hook-examples/" target="_blank">Reference 2</a>

7). I found that if we use <StrictMode></StrictMode> in React, its going to be render things twice at first time rendering or page loading

```js
import { useEffect, useRef, useState } from "react";

const UseRefDemo = () => {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  console.log("re-rendered??");

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
};

export default UseRefDemo;
```

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import UseRefDemo from "./UseRefDemo";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // with Stict mode, useRef trigger 2 times, without StrictMode, useRef trigger only 1 time
  <StrictMode>
    <UseRefDemo />
  </StrictMode>
);
```

8).
