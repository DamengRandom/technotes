### Functional programming:

#### Concept

- some people treated functional programming as pure functions (pure function will not have any side effects).
- it's a style of coding, similar with oop. It's just a mindset of coding !!
- supported languages like scala, js, haskell and etc
- programs as a function !! (What should my function take in, and what my functions will return out)
- avoid side effects (do nothing but return output based on nothing but input !!!!)

#### Example of pure and impure function:

[1] impure function code example:

```js
var name = "Damon";

function greet() {
  console.log(`Hi, ${name}`);
}

greet(); // Hi, Damon

name = "Ella";

greet(); // Hi, Ella
```

[2] pure function code example:

```js
function greet(name) {
  return `Hi, ${name}`;
}

greet("Damon"); // Hi, Damon
greet("Ella"); // Hi, Ella
```

pure function: (deterministic, predictable, easier to debug, return statement)

- will not have any side effects
- given the same input argument(s), will get the same output !! [One word; deterministic]
- must have return statement for pure function, because we need to see an output
- Also easier to debug based on the result is deterministic (When the function is deterministic, which means your program is more
  redictable, at least you already know the output will be the same when you type in the same argument !!)
