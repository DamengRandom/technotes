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

[3] Side effects example:

```js
const thesis = { name: ’text’, date: Date.now() };

function renameThesis(newName) {
	thesis.name = newName;
	console.log(thesis);
}

renameThesis(’New Text’); // { name: ’New Text’, date: Date.now() };
thesis; // { name: ’New Text’, date: Date.now() };
```

[4] NO Side effects example:

```js
const thesis = { name: ’text’, date: Date.now() };

function renameThesis(newName, oldThesis) {
	return { name: newName, date: oldThesis.date }
}

const thesisTwo = renameThesis(’New Text’, thesis);

thesis; // { name: ’text’, date: Date.now() };
thesisTwo; // { name: ’New Text’, date: Date.now() };
```

Exercise:

Check the question to give your answers about pure or impure functions: https://observablehq.com/@anjana/exercise-pure-functions?collection=@anjana/functional-javascript-first-steps

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

Answer: `Tail call optimisation`
