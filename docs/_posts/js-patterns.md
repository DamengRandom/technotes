### JavaScript common Patterns

What is JavaScript pattern:

Can be treated as a general solution for resolving your current faced issue, more like a template or re-usable solution for resolving abit more complex project structure issues .. (2021 understanding)


1). JavaScript Singleton Pattern

```js
// A story: I want to display each of function files related log messages,
// so I create one singleton object as the ONLY instance,
// and I can call its instance function directly to KEEP (KEEP is similar like always adding) logging new messages !!

// Attention: the ONLY instance were created inside class and instantiate within its own class and the instance has finally been exported !!!
// Outside functions call directly use this instance and its methods !!

//  Code example:

class Messager {
  constructor() {
    if (!Messager.instance) {
      this.messages = [];
      Messager.instance = this;
    }

    return Messager.instance;
  }

  show(message) {
    this.messages.push(message);
    console.log(`Message content: ${message}`);
  }

  counter() {
    console.log(`This is ${this.messages.length} message ..`);
  }
}

const messager = new Messager();
Object.freeze(messager); // keep logger object unchanged

export default messager;

// Please create new file: singleton-pattern-consumer-A
import messager from './singleton-pattern-example';

export default function singletonConsumerA() {
  messager.show('Red book is helpful.');
  messager.counter();
}

// Please create new file: singleton-pattern-consumer-B
import messager from './singleton-pattern-example';

export default function singletonConsumerB() {
  messager.show('小红书不错。');
  messager.counter();
}

// imports
import A from './singleton-pattern-consumer-A';
import B from './singleton-pattern-consumer-B';

A();
B();
```


2). JavScript Factory Pattern

```js
// What is pattern in programming languages?
// A pattern is a general solution or mindset can be used for resolving your faced issues.

// JavaScript Factory Pattern:
// One word: it can be used for creating different types of objects, each of these object can be treated as a unique instance.

// A story: we have multiple terminal machines which wants to connect with POS system.
// And each of them will connect with a terminal connection library instance in order for tracking each terminal's specific behaviour.
// This process is called as pair a terminal. In order to achieve this functionality, we need to create library instance as an object to handle each of the pair connections.

// Code example:

function TerminalA(name, type) {
  this.name = name;
  this.type = type;
}

function TerminalB(name, type) {
  this.name = name;
  this.type = type;
}

function PairConnectionLibrary() {
  this.create = (name, type) => {
    switch (type) {
      case "TypeA":
        return new TerminalA(name, type);
      case "TypeB":
        return new TerminalB(name, type);
      default:
        return `Sorry ${name}, this type ${type} not support at moment ..`;
    }
  };
}

function readFactoryInstance() {
  console.log(
    `Thank you for adding ${this.name} to current terminal list with the type of ${this.type}`
  );
}

const factoryInstance = new PairConnectionLibrary();
const terminals = [];

terminals.push(factoryInstance.create("T1", "TypeA"));
terminals.push(factoryInstance.create("T2", "TypeB"));

terminals.forEach((terminal) => {
  readFactoryInstance.call(terminal);
});
```


3). JavaScript Constructor Pattern

```js
// Normally, JavaScript object constructors are used for creating object based on the specific needs
```

In JavaScript, 2 common ways to create an new object:

```js
let newObject = {}; // way 1
let newObject = new Object(); // way 2 
```

In JavaScript, 4 ways to assign attribute into an object

```js
// Dot Syntax
let newObject;
newObject.newProp = 'assigned newProp into object newObject';

// Square Bracket Syntax
let newObject;
newObject['key'] = 'value';

// Object.defineProperty
let newObject = {};
Object.defineProperty(newObject, 'newKey', {
  value: 'new value'
});

// Object.defineProperties
let newObject = {};
Object.defineProperties(newObject, {
  'key1': {
    value: 'value 1'
  },
  'key2': {
    value: 'value 2'
  }
});
```

Last example, constructor with prototypes

```js
function Property(type, year, owner) {
  this.type = type;
  this.year = year;
  this.owner = owner;
}

Property.prototype.word = function () {
  return `${this.owner} has own a year ${this.year} ${this.type}`;  
}

let exampleOne = new Property('apartment', '2018', 'MrX');
let exampleTwo = new Property('house', '2008', 'MrsY');

console.log(exampleOne.word());
console.log(exampleTwo.word());
```


4). JavaScript Module Pattern

```js
// It is a common pattern which was used for wrapping a set of variables or objects in a single scope 

// The reason why we use module pattern:
// 1). maintainability
// 2). reusability
```

<!-- Typical Example of implementing Module pattern -->
```js
function EmployeeDetails() {
  var name = 'MrX';
  var salary = 1000000;

  var totalSalary = function(bonus, expense = 0) {
    return salary + bonus + expense;
  }

  return {
    name,
    totalSalary
  }
}

var employeeDetails = new EmployeeDetails();
const getSalary = employeeDetails.totalSalary(20000, 10000);
console.log(getSalary); // 1030000
console.log(salary); // ReferenceError: salary is not defined

// This Example is a typical example when we want to keep some variable privately within that specific scope, we can use module pattern to only make the variables we want to public !!!

// Also keep employee details in one module, can be re-used for other functionalities or other classes/modules later
```


5). JavaScript Prototype Pattern

```js
var greetings = {
  word: 'Hello',
  phrase: function() {
    console.log("What's up");
  },
  sentence: function(name) {
    console.log(`Hi ${name}, how are you doing?`);
  }
}

const myGreetings = Object.create(greetings);
console.log(myGreetings.sentence('MrRight'));
```


6). JavaScript Observer Pattern

```js
// subject & observer are the 2 most essential parties for this pattern
// observer observes published/updated subject constantly
```

<!-- Typical example -->

```js
class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

const getTextCountResult = text => text ? text.trim().split(/s+/).length : 0;

const wordCountDOM = document.createElement('p');
wordCountDOM.innerHTML = 'Word Count: <strong id="counterValue">0</strong>';
document.body.appendChild(wordCountDOM);

const inputObserver = new Observer();

inputObserver.subscribe((text) => {
  const counterValueDOM = document.getElementById('counterValue');

  counterValueDOM.textContent = getTextCountResult(text);
});

const inputDOM = document.getElementById('words');

inputDOM.addEventListener('keyup', () => inputObserver.broadcast(inputDOM.value));

// HTML part
<textarea id="words" placeholder="Please type word here .."></textarea>
```


7). Strategy pattern (Purpose: try to make code more reusable)

Example: try to make if statement more reusable

```js
// before
function getExperience(level, experience) {
    const levelUpperCase = level.toUpperCase();

    if (levelUpperCase === 'S') {
        return experience * 10;
    }

    if (levelUpperCase === 'A') {
        return experience * 5;
    }

    if (levelUpperCase === 'B') {
        return experience * 2
    }

    return experience;
}

getExperience('A', 10); // 50
```


```js
// after
const strategy = {
  'S': function(experience) {
    return experience * 10;
  },
  'A': function(experience) {
    return experience * 5;
  },
  'D': function(experience) {
    return experience * 2;
  }
};

function getExperienceByStrategy(strategy, level, experience) {
  return (level in strategy) ? strategy[level](experience) : experience;
}

let s = getExperienceByStrategy(strategy, 'S', 10);

let a = getExperienceByStrategy(strategy, 'A', 10);

let d = getExperienceByStrategy(strategy, 'D', 10);

console.log(s, a, d); // 23 100 50 20
```
