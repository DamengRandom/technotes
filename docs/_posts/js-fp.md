### Functional programming:

#### Concept

- some people treated functional programming as pure functions (pure function will not have any side effects).
- it's a style of coding, similar with oop. It's just a mindset of coding !!
- supported languages like scala, js, haskell and etc
- programs as a function !! (What should my function take in, and what my functions will return out)
- avoid side effects (do nothing but return output based on nothing but input !!!!)

[Side effect]: is when a function relies on or modifies something outside its parameters to do something.

```js
// Tiny example

var b = 1;

function sum(a) {
  return a + b; // b is out of sum scope, if value of b gets changed, means sum result will get changed as well: side effect !!
}

sum(1); // 2
```

For example: a function which reads or writes from a variable outside its own arguments, a database, a file or the console can be described as having side effects (
<a href="https://www.yld.io/blog/the-not-so-scary-guide-to-functional-programming/#:~:text=A%20side%20effect%20is%20when,described%20as%20having%20side%20effects." target="_blank">Reference</a>).

[Pure function]: if function is given same inputs, then will always returns the same output

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
  predictable, at least you already know the output will be the same when you type in the same argument !!)

[3] Side effects example:

```js
const thesis = { name: "text", date: Date.now() };

function renameThesis(newName) {
  thesis.name = newName;
  console.log(thesis);
}

renameThesis("New Text");
thesis; // { name: 'New Text', date: Date.now() };
```

[4] `NO` Side effects example:

```js
const thesis = { name: "text", date: Date.now() };

function renameThesis(newName, oldThesis) {
  return { name: newName, date: oldThesis.date };
}

const thesisTwo = renameThesis("New Text", thesis);

thesis; // { name: 'text', date: Date.now() };
thesisTwo; // { name: 'New Text', date: Date.now() };
```

Exercise:

Check the question to give your answers about pure or impure functions: <a href="https://observablehq.com/@anjana/exercise-pure-functions?collection=@anjana/functional-javascript-first-steps" target="_blank">here</a>

[5] Recursion: staying out of the loop with recursion

iterate function itself instead of using for loop. For example:

```js
function sum(numbers) {
  if (numbers.length === 1) {
    return numbers[0];
  } else {
    return numbers[0] + sum(numbers.slice(1));
  }
}

sum([1, 2, 3, 4, 5, 6]);
```

[6] iteration way of doing Fibonacci:

```js
function iterativeFibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let previous = 0;
  let current = 1;
  for (let i = n; i > 1; i--) {
    let next = previous + current;
    previous = current;
    current = next;
  }
  return current;
}
```

[7] recursion way of doing Fibonacci:

```js
function recursiveFibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return recursiveFibonacci(n - 2) + recursiveFibonacci(n - 1);
}
```

After you run both code with 50, the iteration method is much faster than the recursion method … In a word, why? stack overflow ...

How to improve performance of recursion functions??

Answer: `Tail call optimisation` <a href="https://medium.com/hackernoon/es6-tail-call-optimization-43f545d2f68b#:~:text=One%20of%20the%20behind%2Dthe,call%20stack%20does%20not%20grow." target="_blank">Reference</a>

What is Tail call optimisation (TCO)? Answer: to call a function from another function without growing the call stack

[8] First-class function: function as variables, which can be passed around as values, like callbacks, example:

assign a function to a variable:

```js
const foo = function() {
  console.log("hi");
};

foo();
```

[9] pass a function as an argument:

```js
function sayHi() { return 'hi' }

function greeting(hiMessage, name) { console.log(hiMessage() + ', ' + name) }

greeting(sayHi, 'Damon');

return a function:

const sayHi = function() { return function() { console.log('hi') } }
sayHi()();
```

[10] Higher-order function: take in a function as a parameter and return another function as output, eg: map, reduce, filter

Currying function: Chain function together, eg:

```js
function sum(n1) {
  return function(n2) {
    return n1 + n2;
  };
}
sum(1)(1);
```

Function composition: flowing data through ...

output of a function can be the next function input, so on and so on ..

Example: `g(f(x))` !!

[11] Immutability: it means unchangeable, can only copy a new one and modify instead of modify the original one …

Example: pop() in vanilla js

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

[12] `update()` in vanilla js

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

update(0, "spelling", ["spellling", "is", "hard"]);
```

[13] `push()` in vanilla js

```js
function push(element, array) {
  return [...array, element];
}

const postPush = push(4, [1, 2, 3]);
```
