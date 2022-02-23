### JavaScript Code Pieces


```js
function levelOne() {
  return (word) => word; 
}

const levelTwo = levelOne();

console.log(levelTwo('hi'))
```


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


how I reproduce map function in vanilla js:

function map(fn, array) {
  let newArray = [];
  for(let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i]));
  }
  return newArray;
}

map(n => n * 2, [1,2,3,4,5]);