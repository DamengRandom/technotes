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
