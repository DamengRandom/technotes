### React general tips

#### Make API call inside componentDidMount method instead of componentWillMount method:

Explanation:

Using a fetch call within `componentWillMount()` causes the component to render with empty data at first, because `componentWillMount()` will `NOT` return before the first render of the component.

Due to the fact that JavaScript events are async, when you make an API call, the browser continues to do other work while the call is still in motion. With React, while a component is rendering it `doesn’t wait` for `componentWillMount()` to finish, so the component continues to render.

<a href="https://dev.to/torianne02/componentwillmount-vs-componentdidmount-5f0n" target="_blank">Reference</a>

#### React Synthetic Events

Concept: whenever we are triggering an event in React Component, we are not actually dealing with the real DOM event, instead we are cope with React's custom event type, a synthetic event

Examples: `onClick()`, `onChange()`, `onBlur()` and etc ...

- Note: if you want to access the event properties in an asynchronous way, you need to use `event.persist()`. Normally, for synthetic events, we can't access event properties in an asynchronous way.

When we use `event.persist()`?

Code example:

```js
export class PageChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.persist(); // we need to use persist because of event has been used inside setState() callback function
    this.setState((prevState) => ({
      page: prevState + event.target.value, // event is used inside setState() callback function (here)
    }));
  }

  render() {
    return <button onClick={this.handleClick}>Check Page</button>;
  }
}
// Reference: https://deepscan.io/docs/rules/react-missing-event-persist#:~:text=persist()%20should%20be%20called,inside%20an%20asynchronous%20callback%20function&text=This%20rule%20applies%20when%20a,callback%20function%20without%20calling%20event.&text=If%20you%20need%20to%20access,an%20asynchronous%20callback%20function%2C%20event.
```

Reference: <a href="https://dev.to/nagwan/react-synthetic-events-34e5" target="_blank">here</a> And <a href="https://reactjs.org/docs/events.html" target="_blank">here</a>

#### React Side Effect

- Concept: it means anything that affects something outside of the scope of the current function thats being executed
  <!-- 影响与当前函数运行范围以外的（代码/功能） -->

In React, generally, side effects responsible for:

- API call from the server
- call authentication service
- Setting and clearing timers
- Interacting with the DOM

Reference <a href="https://frontarm.com/james-k-nelson/introduction-to-react-effects/" target="_blank">here</a>

#### Pure Component

- `React.PureComponent` make the component `NOT` getting re-rendered !!
- `React.PureComponent` implements `shouldComponentUpdate()` method
- Knowledge recall: `pure function`: given an input, and getting an output, thats it !!
- Why we use `PureComponent`: avoid unnecessary re-renders for the component and enhance the performance ..
- When we use `PureComponent`? When the time we do `NOT` want to re-render the component !!

Example:

Please find it over <a href="https://stackblitz.com/edit/react-h8oehs?file=src%2FParentComponent.js" target="_blank">here</a>

#### React Reconciliation

Simple word: its talks about the `diffing algorithm`, React uses `key` attribute, make sure its unique !!
According to the `diffing algorithm`, we update the Virtual DOM tree and re-render the specific DOM element !!

#### React Portals

Render the `tooltips`, `Modal` code out of the `<body>{...}</body>` element, something looks like this:

```js
<body>
  {... body code logics ...}
</body>
// below part is React Portals code !!!
<div class="portal-modal">
  {... modal code logics ...}
</div>
```

#### How to remove warning message inside useEffect like `[]`?

Concept is to set the function as a `ref`:

```js
// define a ref
const currentFetchRef = useRef(() => {});

// assign to current
currentFetchRef.current = async function fetchRandomData(pageNumber) {
  const response = await fetch(`https://randomuser.me/api?page=${pageNumber}`)
    .then((data) => data.json())
    .catch((error) => console.error(error));

  setStates({
    ...states,
    dataString: JSON.stringify(response.results, null, 2),
    totalDataLoaded: [
      ...states.totalDataLoaded,
      { [`page-${pageNumber}`]: response.results },
    ],
  });
};

// use the current ref function !!!
useEffect(() => {
  currentFetchRef.current(1);
}, []);
```

Example: <a href="https://codesandbox.io/s/hungry-brook-qb0g9?file=/src/App.js">Coded by me</a>

#### Error Boundaries

The idea of error boundary is a generic component that takes care of the errors for its children

- it's a concept which only workable for class based component
- catch errors in components tree and display fallback UI

For class component:

Example:

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo); // third party error tracking service, such as Rollbar ..
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong ..</h1>;
    return this.props.children;
  }
}

// Then in component, we can call like this:

<ErrorBoundary><YourComponent/></ErrorBoundary>

// Or you can make it event more specific: both of them will log its own errors
<ErrorBoundary><YourComponentOne/></ErrorBoundary>
<ErrorBoundary><YourComponentTwo/></ErrorBoundary>
```

For functional component, the way we handle errors is using `try {} catch {}`

Example:

```js
import * as React from "react";
import ReactDOM from "react-dom";

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function City({ name }) {
  try {
    return <div>Hello, visit {name.toUpperCase()}</div>;
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
}

function Country({ capital }) {
  try {
    return <div>Hello, visit {capital.toUpperCase()}</div>;
  } catch (error) {
    return <ErrorHandler error={error} />;
  }
}

function App() {
  return (
    <div>
      <Country />
      <City />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

#### forwardRef

Code example:

```js
import React from "react";

const ForwardInput = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      name="forwardInput"
      placeholder="trigger input focus effect by clicking button"
    />
  );
});

export class InputWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  inputRef = React.createRef();

  handleClick() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <ForwardInput ref={this.inputRef} />
        <button onClick={this.handleClick}>Click me to focus on input</button>
      </div>
    );
  }
}

export default InputWrapper;
```

#### React JSX

JSX stands for JavaScript XML

JSX allows us to write HTML in React

JSX made our life easier because we don't need to use `createElement()` or `appendChild()` to add HTML into DOM.

Example:

Without JSX

```js
const es6El = React.createElement("p", {}, "Hi there .."); // without JSX, headache
ReactDOM.render(es6El, document.getElementById("root"));
```

With JSX

```js
const jsxEl = <p>Hi there ..</p>;
ReactDOM.render(jsxEl, document.getElementById("root")); // life is easier ..
```

JSX expression: `{}`, eg: `{variableName}`

#### What is Virtual DOM

It is an object which represents the DOM tree. (Shortest version)

Try to get more details from this github repository: <a href="https://github.com/DamengRandom/virtual-dom-study" target="_blank">here</a>

#### In React, we need to `bind(this)` if we are <strong>NOT</strong> using arrow function

```js
// Arrow function does not contain these context:
// this
// arguments
// super
// new.target

// Conclusion, In React, we don't need functionName.bind(this) for arrow function

// Code Example:

const handleClick = () => {
  this.setState({
    isShown: !this.state.isShown
  });
};

// In normal function, we need to use functionName.bind(this);
// inside constructor, please add this bind function for using `this` context !!
this.handleClick = this.handleClick.bind(this);

handleClick () {
  this.setState({
    isShown: !this.state.isShown
  });
};
```

Reference: <a href="https://stackoverflow.com/questions/52979915/why-we-dont-need-to-bind-the-arrow-function-in-react" target="_blank">here</a>

#### extract component logic into a specific function

<a href="https://www.youtube.com/watch?v=ocKqJCYkJCs">Please follow with first 5 mins</a>

#### React reducer states update pattern

<b>Try to use reducer pattern to update api call (fetch) states ..</b>

```js
import React, { useEffect, useReducer } from "react";
import axios from "axios";
// will move to a constant file (Demo only so make it as one file)
const API_STATES = {
  ERROR: "error",
  LOADING: "loading",
  SUCCESS: "success",
};
// will move to a constant file (Demo only so make it as one file)
const initialState = {
  error: null,
  loading: false,
  posts: [],
};
// will move to a reducer file (Demo only so make it as one file)
function fetchReducer(state = initialState, action) {
  switch (action.type) {
    case API_STATES.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case API_STATES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case API_STATES.SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { posts, error, loading } = state;

  useEffect(() => {
    dispatch({ type: API_STATES.LOADING });
    // trigger fetch api call
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (res.status === 200) {
          dispatch({ type: API_STATES.SUCCESS, posts: res.data });
        } else {
          throw Error("Fetch failed ..");
        }
      } catch (error) {
        dispatch({ type: API_STATES.ERROR, error });
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading ...</p>;

  // if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (error) return <pre>{JSON.stringify(error?.message, null, 2)}</pre>;

  return (
    <div>
      <h3>List of post titles:</h3>
      {posts.map(({ id, title }) => (
        <p key={id}>{title}</p>
      ))}
    </div>
  );
}
```

### One typical example causing re-rendering without using React.memo

- The comment code is a good way to avoid component unnecessary re-renderings

```js
/* eslint-disable react/button-has-type */
import React from "react";
import { Box } from "@material-ui/core";
import products from "../../../definitions/constants/productList";
import Product from "../Product";

function ProductList(): React.ReactElement {
  const [toggle, setToggle] = React.useState(false);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        <button
          onClick={() => {
            setToggle(!toggle);
            console.log("re-rendered: all the products inside product list ..");
          }}
        >
          test re-render: {toggle.toString()}
        </button>
        {products.map((product) => (
          <Product key={product.name} product={product} />
        ))}
      </Box>
    </>
  );
}
export default ProductList;
import React, { memo } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import useStyles from "./index.styles";
import { ProductProps } from "./interfaces";

// export default memo(function Product({ product }: ProductProps): React.ReactElement {
//   const classes = useStyles();
//   const [cardValue, seCardValue] = React.useState('');

//   React.useEffect(() => {
//     console.log('do some actions with the product props: ', product.name);
//   });

//   return (
//     <Box
//       onClick={() => {
//         seCardValue(product.name);
//       }}
//     >
//       <Card className={classes.cardStyle}>
//         <CardActionArea>
//           <CardMedia className={classes.productText} title={product.name}>
//             <Box
//               className={classes.productImage}
//               bgcolor={product.backgroundColor}
//               display="flex"
//               justifyContent="center"
//             >
//               {product.image}
//             </Box>
//           </CardMedia>
//           <CardContent>
//             <Typography className={classes.productName} variant="h5" component="h2">
//               {product.name}
//             </Typography>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {product.price}
//             </Typography>
//             {cardValue && <div>show logic here</div>}
//           </CardContent>
//         </CardActionArea>
//       </Card>
//     </Box>
//   );
// } as Any);
```

```js
export default function Product({ product }: ProductProps): React.ReactElement {
  const classes = useStyles();
  const [cardValue, seCardValue] = React.useState("");

  React.useEffect(() => {
    console.log("do some actions with the product props: ", product.name);
  });

  return (
    <Box
      onClick={() => {
        seCardValue(product.name);
      }}
    >
      <Card className={classes.cardStyle}>
        <CardActionArea>
          <CardMedia className={classes.productText} title={product.name}>
            <Box
              className={classes.productImage}
              bgcolor={product.backgroundColor}
              display="flex"
              justifyContent="center"
            >
              {product.image}
            </Box>
          </CardMedia>
          <CardContent>
            <Typography
              className={classes.productName}
              variant="h5"
              component="h2"
            >
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.price}
            </Typography>
            {cardValue && <div>show logic here</div>}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
```

#### How to dynamically generate grid in react:

```js
const Template = ({ numberOfChildren, ...args }) => (
  <Stack {...args}>
    {[...Array(numberOfChildren).keys()].map((num) => (
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {num + 1}
      </div>
    ))}
  </Stack>
);
```

#### What is memoization?

- is a process to cache the values, so next time function gets values from cache rather than making a new request or recompute the function

Why we need memoization for React?

- we don't want to trigger whole component re-rendered ..

Here we go: `React.memo`

React.memo is a HOC, which takes a compoennt as prop and returns component that prevents a compoennt from re-rendering if props have not been changed

Example:

```js
import { memo, useRef } from "react";

function Counts() {
  const renderCount = useRef(0);
  return (
    <div>
      <p>
        Nothing has changed here but I've now rendered:{" "}
        <span>{renderCount.current++} time(s)</span>
      </p>
    </div>
  );
}
export default memo(Counts);
```

useMemo(): is a React hook functin which returns memorized values and avoid re-rendering if the dependencies to a function have not been changed

Example:

```js
import "./styles.css";
import { useState, useMemo } from "react";

export default function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([""]);

  const expensiveCalculation = (num) => {
    let newValue = 0;

    for (let i = 0; i < 1000; i++) {
      newValue = num + i;
    }
    console.log("new expensive calculated value rendered");
    return newValue;
  };

  const increaseCount = () => {
    setCount((c) => c + 1);
  };

  const addTodos = () => {
    setTodos((t) => [...t, "new todo"]);
  };

  // const showExpensiveCalculationResult = useMemo(() => expensiveCalculation(count), [count]);
  const showExpensiveCalculationResult = expensiveCalculation(count);

  console.log("will trigger re-render??");

  return (
    <div className="App">
      {todos.map((t, i) => (
        <p key={`the-${t}-${i}`}>
          <span>{t}</span>
        </p>
      ))}
      <button onClick={increaseCount}>+ count</button>
      <button onClick={addTodos}>+ todo</button>
      {showExpensiveCalculationResult}
    </div>
  );
}
// the most important thing is: if you were not using useMemo, the expensiveCalculation function will get re-rendered when you click add todo button !!!! (Please try on it when you recall useMemo hook)
// https://www.w3schools.com/react/react_usememo.asp
```

#### `Batchng` in react?

means group a couple of states update into a single re-renderer

```js
const App = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClickWithBatching = () => {
    setCounter1((count) => count + 1);
    setCounter2((count) => count + 1);
  };

  const handleClickWithoutBatching = () => {
    Promise.resolve().then(() => {
      setCounter1((count) => count + 1);
      setCounter2((count) => count + 1);
    });
  };

  console.log("counters", counter1, counter2);
  /* 
    On click of Single re-render
    conuters: 1 1
   
    On click of Multiple re-render
    conuters: 2 1
    counters: 2 2
   */

  return (
    <div className="App">
      <h2 onClick={handleClickWithBatching}>Single Re-render</h2>
      <h2 onClick={handleClickWithoutBatching}>Multiple Re-render</h2>
    </div>
  );
};
```

<a href="https://crypt.codemancers.com/posts/2021-06-29-batching-in-react/#:~:text=Batching%20means%20grouping%20multiple%20state%20updates%20into%20a%20single%20re%2Drender." target="_blank">Reference</a>
