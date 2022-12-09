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

5).

`flatMap(data)`:

Example:

```js
const badArray = [
  "Dog Soliders",
  ["In Bruges", "From Paris with Love", "Layer Cake"],
  "The Big Lebowski",
  "",
  "       ",
  "Mmemto, The paltform,Fight Club, ",
  "Hotel Rwanda, Moon, Under the Skin",
  "Lady Bird",
  ["Platoon", "Wall-E"],
];

const goodArray = badArray.flatMap((data) => {
  if (Array.isArray(data)) {
    return data;
  } else if (typeof data === "string" && data.trim() === "") {
    return [];
  } else {
    return data
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d !== "");
  }
});

console.log("flatten example 01: ", goodArray);
```

6).

another `flatMap(data)` recursive loop example:

```js
const nestedChildren = [
  {
    name: "test1",
    children: [
      { id: 11, hun: true },
      {
        id: 12,
        hun: false,
        children: [
          { nestId: 111, zi: false },
          { nestId: 112, zi: true },
        ],
      },
    ],
  },
  {
    name: "test2",
  },
  {
    name: "test3",
    children: [
      { id: 31, hun: true },
      { id: 32, hun: false },
      { id: 33, hun: false },
    ],
  },
  {
    name: "test4",
  },
];

const flattenNestedArray = (nestedChildren) =>
  nestedChildren.flatMap((data) => {
    let current = [];

    if (Array.isArray(data?.children)) {
      current = [...data?.children, ...flattenNestedArray(data?.children)];
      current.map((c) => {
        if (c?.children) delete c.children;

        return c;
      });

      return current;
    }

    return [];
  });

console.log("flatten example 02: ", flattenNestedArray(nestedChildren));
```

7).
