Underscore JS recalls:

1). _.each & _.map

In general,

`each()`: return the original array, won't create a new array, its mutable
`map()`: copy and modify new created  and return new array as result

e.g.:

```js
let a = [1,2,3],
i = 0;

_.map(a, function(num){ console.log(num*3); }); // return each value every time like a loop

_.each(a, function(num){ console.log(num*3); }); // return each value every time like a loop

_.each({one: 1, two: 2, three: 3}, console.log({one: 1, two: 2, three: 3})); return as object format

// _.each(a, console.log([1,2,3])); cannot return anything but an error : Uncaught TypeError: iteratee is not a function

let map_demo1 = _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }); // return as array
console.log("Map demo 1 (Object return example): " + map_demo1);

let map_demo2 = _.map(a, function(num){ return num * 3; }); // return as array
console.log("Map demo 2 (Array return example): " + map_demo2);
```

2). _.reduce, _.find & _.filter

usage example: happy sum

```js
let sum_val = _.reduce(a, function(memo, num){ return memo + num }, 0);

console.log("Sum value is: " + sum_val);

let reduce_right_demo = _.reduceRight([[1,2],[2,3],[3,4]], function(a, b) {
  return a.concat(b);
}, []);

console.log("Concatenation and reduce right demo result: " + reduce_right_demo);
```

_find && _filter:

```js
let find_demo = _.find([1,2,3,4,5,6], function(num){
  for(i = 0; i<[1,2,3,4,5,6].length; i++) {
    return num % 2 == 0;
  }
});

console.log("Find demo: " + find_demo);

let filter_demo = _.filter([1,2,3,4,5,6], function(num){
  return num % 2 == 0;
});

console.log("Filter demo: " + filter_demo);
```


3). _.pluck
`pluck`: find object all elements inside a specific row

eg：

```js
let list_demo = [
  {author: "dameng", rank: 1},
  {author: "Jenkins", rank: 2},
  {author: "Tomusey", rank: 3},
  {author: "Trumpg", rank: 4},
];

console.log("Pluck Demo: " + _.pluck(list_demo, "author")); // very important

console.log(_.max(list_demo, function(max_V_V){return max_V_V.rank;})); // do not add any string in front of _.max()
console.log(_.min(list_demo, function(list_demo_min){return list_demo_min.rank;})); // do not add any string in front of _.min()

console.log(_.groupBy([1.2, 3, 4.7, 4, 5.5], function(num){ return Math.floor(num) }));
console.log(_.countBy([1, 2, 3, 4, 5], function(num){ return num % 2 == 0? 'even' : 'odd'}));

console.log("SizeDemo: " + _.size(a));

let where_demo = _.where(list_demo, {author: "dameng"});
console.log("Where demo: " + where_demo);

console.log("contains demo: " + _.contains(a, 4));
```
