### JavaScript Code Pieces

1).

```js
function levelOne() {
  return (word) => word;
}

const levelTwo = levelOne();

console.log(levelTwo("hi"));
```

2).

isPrime??

```js
function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

find largest number inside array:
[7, 1, 3, 5, 6, 2, 8, 10, 0, 4, 9].reduce((acc, v) => acc > v ? acc : v);
```

3).

how I reproduce map function in vanilla js:

```js
function map(fn, array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i]));
  }
  return newArray;
}

map((n) => n * 2, [1, 2, 3, 4, 5]);
```

4).

`array.filter(Boolean)`:

What it does? Just filter out the false values inside array

Example:

```js
const array = [{ good: "good" }, null, { great: "great" }, undefined];

const truthyArray = array.filter(Boolean);

truthyArray; // [{good: 'good'}, {great: 'great'}]
```
