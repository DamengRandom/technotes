### React Hooks Tips

What is react hook?

- Addition feature start from React 16.8
- Achieve some functionality without creating a class, such as `useEffect` hook for life cycle functions
- Make some part of code logics re-usable & sharable across different components by creating your own hook function(s)
- Shorter syntax compared with class based components (eg: life cycle methods)

### Example codebase

Please find my personal react hooks practices <a href="https://github.com/DamengRandom/hooks-recall" target="_blank">here</a>.

#### useMemo vs useCallback

- <p>`useMemo`: returns the value of that callback function</p>
- <p>`useCallback`: returns the callback function</p>

<!-- 当一个 component 里面出现多个 useState 的时候， 应该 警觉起来，看看是否需要 应用 useCallback 去 memorize 某些 function， 避免 re-render -->

<a href="https://codesandbox.io/s/usecallback-usememeo-demo-42s9h" target="_blank">Quick Example</a> I have done for useMemo & useCallback hook

#### useContext

Usage: share state values between components

- Example:

```js
// Step 1: Define a context:
import { createContext } from "react";
export default createContext(null);

// Step 2: set context provider value:
import UserContext from "../src/context/UserContext";

<UserContext.Provider value={{ userData, setUserData }}>
  ...
</UserContext.Provider>;

// complete example:

import UserContext from "../src/context/UserContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      try {
        const tokenResponse = await axios.post(
          "http://localhost:6285/user/tokenIsValid",
          null,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (tokenResponse.data) {
          const getCurrentUser = await axios.get("http://localhost:6285/user", {
            headers: {
              "x-auth-token": token,
            },
          });

          if (getCurrentUser) {
            setUserData({
              token,
              user: getCurrentUser.data,
            });
          }
        }
      } catch (error) {
        console.log("error: ", error.message);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

// Step 3: use context value in components:
import UseContext from "../context/UserContext";

const {
  userData: { user },
} = useContext(UseContext);

// complete example:

export default function Home() {
  const [preLoader, setPreLoader] = useState(false);
  const {
    userData: { user },
  } = useContext(UseContext);
  const history = useHistory();

  useEffect(() => {
    setPreLoader(true);
    if (!user) {
      setPreLoader(false);
      history.push("/login");
    }
    setPreLoader(false);
  }, [history, user]);

  return preLoader ? <p>Loading ..</p> : <div className="page">Home</div>;
}

// Find details on codebase: mern-jwt-trial-front-end
```

#### useReducer

When we try to update more than 1 state at same time, we can consider to use reducer pattern trying to handle multiple states update.

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

#### Another useMemo/memo, useCallback example

Normally we try to avoid unnecessary re-render, we use memo or useMemo, and we parent passes `array or object (reference type of data)` to child, we need to use useMemo to avoid the re-render issue !!

When we pass function to child, we use useCallback for it

Code example of using useMemo:

```jsx
// Find code from: https://github.com/DamengRandom/hooks-recall/blob/master/src/components/useMemoUseCallbackThirdExample/TheParent.jsx#L12
// parent component:
const arrayReference = React.useMemo(() => [1, 2, 3], []);

// child component:
<SecondChild arrayReference={arrayReference} />;
```

Code example of using useCallback:

```jsx
// parent component
const fetcher = React.useCallback((type) => {
  return fetch(`https://jsonplaceholder.typicode.com/${type}/1`)
    .then((response) => response.json())
    .then((json) => console.log(json));
}, []);

React.useEffect(() => {
  fetcher("todos");
}, [fetcher]);

// child component:
<ThirdChild fetcher={fetcher} />;
```

<b>Situation: when the time we saw the dependencies comes from parent level, we may need to consider whether shall we use related useMemo/memo or useCallback hooks to enhance the performance</b>

Sometimes, <strong style="font-size: 1.5rem;">the cost of optimization would be more than not optimization ...</strong>

<p>Its fairly depending on the situations, if big list with handleClick, then we can use useCallback, but id the function is just for toggle state setup, then, its better not overuse useCallback hook ~~</p>

#### useLocalStorage

<a href="https://usehooks.com/useLocalStorage/" target="_blank">Reference here</a>

#### useStateWithValidator

UI section:

```js
import "./styles.css";
import useStateWithValidator from "./useStateWithValidator";

const usernameValidator = (name) => name.length >= 2;

export default function App() {
  const [username, setUsername, isNameValid] = useStateWithValidator(
    usernameValidator,
    ""
  );

  return (
    <div className="App">
      <h5>useStateWithValidator Demo</h5>
      <div>
        <label>Is Username Valid: {isNameValid.toString()}</label>{" "}
        <input
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Please enter username .."
          type="text"
          value={username}
        />
      </div>
    </div>
  );
}
```

Hook section:

```js
import { useState, useCallback } from "react";

export default function useStateWithValidator(validator, initialState) {
  const [state, setState] = useState(initialState);
  const [isValid, checkValidation] = useState(() => validator(state));

  const handleChange = useCallback(
    (nextState) => {
      const currentState =
        typeof nextState === "function" ? nextState(state) : nextState;

      setState(currentState);
      checkValidation(validator(currentState));
    },
    [validator, state]
  );

  return [state, handleChange, isValid];
}
```

#### useEventListener

Part 1: Example UI

```js
import "./styles.css";
import { useState } from "react";
import useEventListener from "./useEventListener";

function trackTyping(event) {
  document.querySelector("#output").textContent = event.target.value;
} // normally we can use onChange to track input value, but in this example we just demo the useEventListener hook. Thus, we did this ..

function scrollTracker(setScrollY) {
  setScrollY(window.scrollY);
}

export default function App() {
  const inputDOM = document.querySelector("#input");

  const [key, setKey] = useState("");
  const [scrollYValue, setScrollY] = useState(0);

  useEventListener("keydown", (event) => {
    setKey(event.key);
  });

  useEventListener("input", trackTyping);

  useEventListener("scroll", () => scrollTracker(setScrollY));

  return (
    <div className="App">
      <h5>useEventListener Demo</h5>
      <p>Scroll Y direction value: {scrollYValue}</p>
      <div>
        <input id="input" name="typings" type="text" />
        <p id="output"></p>
      </div>
      {inputDOM?.value && <div>The user last keyin chracter is: {key}</div>}
      <p>lorem text: </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
        vestibulum felis. Phasellus consectetur velit sit amet libero molestie
        ultricies. Aenean tortor dolor, tincidunt a justo et, hendrerit
        porttitor diam. Aliquam erat volutpat. Mauris vitae molestie mi. Duis ut
        ex consequat, aliquet justo quis, elementum felis. Mauris ullamcorper
        quis ipsum sit amet scelerisque. Nullam tincidunt mauris in tortor
        laoreet, non congue felis venenatis. Aliquam feugiat elit arcu, eget
        sodales urna varius vel. Vestibulum vitae elit diam. Ut vehicula
        pharetra risus nec condimentum. Mauris congue finibus dictum. Ut aliquam
        sagittis nisi id pretium. In hac habitasse platea dictumst. Aenean sit
        amet quam ut orci faucibus blandit quis eu urna. Suspendisse sodales
        arcu urna, id auctor ex vulputate a. Etiam id cursus massa, non pulvinar
        tortor. Phasellus eu lacus viverra, congue augue id, consequat dui.
        Integer quis interdum quam. Aenean metus lacus, pellentesque eget eros
        non, sollicitudin consectetur tellus. Integer tempus magna id purus
        ullamcorper fringilla. In sed pretium mauris, in placerat diam. Fusce
        pellentesque magna augue, consectetur tincidunt metus auctor a. Aliquam
        tortor nulla, maximus facilisis convallis id, gravida nec massa. Integer
        mattis tempor cursus. Pellentesque blandit viverra lacinia. Nunc tempus
        ligula ut ipsum vulputate molestie. In gravida sapien eget neque
        dignissim, quis faucibus eros vulputate. Maecenas sit amet efficitur
        dui. Maecenas ac elit laoreet, consequat ex a, aliquam lorem. Nunc
        malesuada enim sed elit tempus dapibus. Integer auctor elit erat, non
        eleifend nisl maximus non. Aenean lobortis velit non est semper feugiat.
        Curabitur metus ligula, dignissim eget dapibus sed, pretium eu tellus.
        Cras suscipit massa vulputate pellentesque ultricies. Aliquam vulputate
        mi quis arcu auctor lacinia. Morbi a gravida lectus, ac tristique
        libero. Proin condimentum sodales mi sit amet ullamcorper. Sed lobortis
        lacus et tortor pulvinar, sit amet tristique ex posuere. Donec finibus
        nibh nec enim lobortis pharetra.
        {scrollYValue > 200 && (
          <strong>
            {" "}
            This is added when scroll Y value is larger than 200.{" "}
          </strong>
        )}
        Pellentesque eu consequat elit. Vestibulum lobortis tincidunt turpis a
        ultricies. Suspendisse vulputate ante ligula, eget maximus magna
        lobortis sed. Duis maximus enim nec hendrerit molestie. Donec quis neque
        ornare, porta nunc vel, tincidunt eros. Aliquam lacinia tortor ut lectus
        lobortis, sit amet euismod ante porttitor. Integer in felis vitae urna
        faucibus imperdiet quis in purus. Nam vel gravida ante, in sodales
        neque.
      </p>
      <p>Scroll Y direction value: {scrollYValue}</p>
    </div>
  );
}
```

Part 2: Hook Function

```js
import { useEffect, useRef } from "react";

export default function useEventListener(
  eventName,
  callback,
  element = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
    const handler = (event) => callbackRef.current(event);
    element.addEventListener(eventName, handler);

    return () => {
      callbackRef.current = null;
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, callback, element]);
}
```

#### useLayoutEffect vs useEffect

- useLayoutEffect: synchronous (use case: if you need to move things in the DOM which is going to be visible) [performance is not good enough because it handles code synchronously]

- useEffect: asynchronous (use case: in general) [better performance]

#### Custom hook: useToggle

```js
import { useState } from "react";

interface IDefaultToggleValue {
  defaultValue: Any;
}

export default function useToggle(
  defaultValue: Any
): [IDefaultToggleValue, (param: IDefaultToggleValue) => void] {
  const [value, setValue] = useState(defaultValue);

  function toggleState(param: IDefaultToggleValue) {
    setValue((prevState: IDefaultToggleValue) =>
      typeof param === "boolean" ? param : !prevState
    );
  }

  return [value, toggleState];
}
```

#### `useReducer` vs `useState`

`useReducer` is handling mroe complext logic for the state change.
`useState` is more easier just focus on the value of the state.

eg: counter, setCounter -> one state action (useState)

counter, incrementCounter, decrementCounter, multiplyCounter, divideCounter -> more state actions (useReducer)

#### Normal function vs React custom hook function

- React custom hook function can use other react built-in hook functions, such as useState, useEffect and etc
- React custom hook function starts from `use` keyword
- React custom hook function cannot be used only in React component code, which cannot e used in normal functions

#### Another useCallback code example:

```js
// file 1: UseCallbackDemo.js
import { useCallback, useState } from "react";
import UseCallbackTodos from "./UseCallbackTodos";

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increaseCount = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "new todo"]);
  }, []);

  // const addTodo = () => {
  //   setTodos((t) => [...t, "new todo"]);
  // };

  return (
    <>
      <UseCallbackTodos todos={todos} addTodo={addTodo} />
      <div>
        <p>Count value: {count}</p>
        <button onClick={increaseCount}>+ count</button>
      </div>
    </>
  );
}

// file 2: UseCallbackTodos.js
import { memo } from "react";

const UseCallbackTodos = ({ todos, addTodo }) => {
  console.log("re-render the child Todos component");
  return (
    <>
      {todos.map((t, i) => (
        <p key={`the-${t}-${i}`}>{t}</p>
      ))}
      <button onClick={addTodo}>+ todo</button>
    </>
  );
};

export default memo(UseCallbackTodos);

// One word: if we don't use useCallback, when we click + count button, the todos component will get re-rendered !!!
// Thats why we need this hook, keep function memorized !!
```

#### Add useRef example code:

```js
import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [val, setVal] = useState("");
  const countRef = useRef(0);

  const handleTimesCount = (value) => {
    countRef.current = value?.length + 1;
  };

  return (
    <>
      {/* Test code only */}
      <input
        ref={countRef}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          handleTimesCount(val);
        }}
      />
      <p>input value change times (count): {countRef.current}</p>
    </>
  );
}
```

#### Pitfalls of overusing `useContext()`:

If you define a useContext and pass value object across the entire app.

In above case, if you have 2 components which needs 2 different context values for rendering each time, like below:

```js
<CompOne firstAttr={firstAttr} />
<CompTwo secondAttr={secondAttr} />
```

As you can see, when you update the state value of secondAttr, the CompOne and CompTwo will get re-rendered, because of they have shared value object which is defined globally ...

In this case, a big head time for large scale of project, because performance will be heaveily impacted ...

Even we add `useMemeo` for the provider value object, it still trigger re-rendered when value changed ...

something like this:

```js
const CounterProvider = ({ children }) => {
  const [count, setCount] = React.useState(0);
  const [hello, sayHello] = React.useState("Hello world");

  const increment = () => setCount((counter) => counter + 1);
  const decrement = () => setCount((counter) => counter - 1);

  const value = React.useMemo(
    () => ({
      count,
      increment,
      decrement,
      hello,
    }),
    [count, hello]
  );

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};
```

In conclusion, we should only consider to implement `useContext()` for the states those less changes, more frequent state updates, better not consider to use `useContext()`, which will cause performance issue when app scaling to larger app ...

This is why for larger app, better use Redux !!

<a href="https://blog.logrocket.com/pitfalls-of-overusing-react-context/" target="_blank">Reference</a>

#### How to access the DOM element in React?

Answer: `useRef()` hook

```js
const domRef = useRef(null); // [define]
<div ref={domRef}>...</div>; // Assign to element [mount]
domRef.current; // point to DOM element [mounted]
```

#### The equivlent method `useComponentWillMount` in react hook:

```js
const useComponentWillMount = (cb) => {
  const willMount = useRef(true);

  if (willMount.current) cb();

  willMount.current = false;
};
```

#### React hook can replace render props and HOC, examples below

HOC version:

```js
function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    };

    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      });
    };

    componentDidMount() {
      window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }
  // Extra bits like hoisting statics omitted for brevity
  return DerivedClass;
}

// To be used like this in some other file:

const MyComponent = (props) => {
  return <div>Window width is: {props.windowWidth}</div>;
};

export default withWindowWidth(MyComponent);
```

Render props version:

```js
class WindowWidth extends React.Component {
  propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    windowWidth: window.innerWidth,
  };

  onResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return this.props.children(this.state.windowWidth);
  }
}

// To be used like this:

const MyComponent = () => {
  return (
    <WindowWidth>{(width) => <div>Window width is: {width}</div>}</WindowWidth>
  );
};
```

Hook version:

```js
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
};

// To be used like this:

const MyComponent = () => {
  const width = useWindowWidth();
  return <div>Window width is: {width}</div>;
};
```
