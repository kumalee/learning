# Articles
[cracking the front end interview](https://medium.freecodecamp.org/cracking-the-front-end-interview-9a34cd46237)

## HTML & CSS
[HTML5 Semantic](https://www.hongkiat.com/blog/html-5-semantics/)

[Understanding CSS Grid System](https://www.sitepoint.com/understanding-css-grid-systems/)

[Pseudo Classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

[CSS Sprites](https://css-tricks.com/css-sprites/)

[CSS Animation](https://css-tricks.com/almanac/properties/a/animation/)

[SASS VS LESS](https://css-tricks.com/sass-vs-less/)

be familiar with CSS naming conventions like BEM and OOCSS.

css in js

css module

use codepen to do some dribbble sample layout

[medium css guide](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06)

## JavaScript

### Concepts
[What is `this`? The Inner Workings of JavaScript Objects](https://medium.com/javascript-scene/what-is-this-the-inner-workings-of-javascript-objects-d397bfa0708a)

[Prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[Scoping](https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/)

[Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

[The event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

[Event bubbling](http://javascript.info/tutorial/bubbling-and-capturing)

[Apply, call, and bind](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/)

[Callbacks and promises](https://www.quora.com/Whats-the-difference-between-a-promise-and-a-callback-in-Javascript)

[Variable and function hoisting](http://2ality.com/2015/02/es6-scoping.html)

[Currying](https://www.sitepoint.com/currying-in-functional-javascript/)

#### Test
[toptal js interview questions](https://www.toptal.com/javascript/interview-questions)

[codementor js interview questions and answers](https://www.codementor.io/nihantanu/21-essential-javascript-tech-interview-practice-questions-answers-du107p62z)

[guru99 js interview questions and answers](https://www.guru99.com/javascript-interview-questions-answers.html)

[interviewcake Javascript Interview Questions](https://www.interviewcake.com/javascript-interview-questions)

### Design Patterns
[Decorator](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript)

[Factory](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)

[Singleton](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

[Revealing module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript)

[Facade](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript)

[Observer](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript)

[MVC, MVP, MVVM](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvp)

### Master Javascript Interview
[Soft Skills](https://medium.com/javascript-scene/master-the-javascript-interview-soft-skills-a8a5fb02c466)

[What is functional programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

[What is Function Composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

[What is a Pure Function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)

[What’s the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)

[What is a Closure?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)

A closure is the combination of a function and the lexical environment within which that function was declared.

For every closure we have three scopes:-
* Local Scope (Own scope)
* Outer Functions Scope
* Global Scope

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

1. Emulating private methods with closures
2. Closure Scope Chain

* Creating closures in loops: A common mistake
* Performance considerations:

    negatively affects:
    1. processing speed
    2. memory consumption

    The reason is that whenever the constructor is called, the methods would get reassigned (that is, for every object creation).


[What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

### A Promise is in one of these states:

* pending: initial state, neither fulfilled nor rejected.
* fulfilled: meaning that the operation completed successfully.
* rejected: meaning that the operation failed.

### Instance Properties:
* Promise.length:
    Length property whose value is always 1 (number of constructor arguments).
* Promise.prototype:
    Represents the prototype for the Promise constructor.

### Instance Methods:
* Promise.all(iterable)

    Returns a promise that either fulfills when all of the promises in the iterable argument have fulfilled or rejects as soon as one of the promises in the iterable argument rejects. 

* Promise.race(iterable)

    Returns a promise that fulfills or rejects as soon as one of the promises in the iterable fulfills or rejects, with the value or reason from that promise.

* Promise.reject()

    Returns a Promise object that is rejected with the given reason.

*.Promise.resolve()

    Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. Generally, if you don't know if a value is a promise or not, Promise.resolve(value) it instead and work with the return value as a promise.

### Prototype Properties
* Promise.prototype.constructor

    Returns the function that created an instance's prototype. This is the Promise function by default.

### Prototype Methods
* Promise.prototype.catch()

    Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

* Promise.prototype.then()

    Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

* Promise.prototype.finally()

    Appends a handler to the promise, and returns a new promise which is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected.

As the Promise.prototype.then() and Promise.prototype.catch() methods return promises, they can be chained.

[10 Interview Questions
Every JavaScript Developer Should Know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95)

[5 Questions Every Unit Test Must Answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)
1. What are you testing?
2. What should it do?
3. What is the actual output?
4. What is the expected output?
5. How can the test be reproduced?


### React
[unit testing react components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2)

[10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)

### Advanced
[Transducers: Efficient Data Processing Pipelines in JavaScript](https://medium.com/javascript-scene/transducers-efficient-data-processing-pipelines-in-javascript-7985330fe73d)

[Curry and Function Composition](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983)

[The Forgotten History of OOP](https://medium.com/javascript-scene/the-forgotten-history-of-oop-88d71b9b2d9f)

[Rethinking Unit Test Assertions](https://medium.com/javascript-scene/rethinking-unit-test-assertions-55f59358253f)

[Speaking JavaScript (es5)](http://speakingjs.com/es5/)

[Exploring ES6](http://exploringjs.com/es6/)

[Exploring ES2016 and ES2017](http://exploringjs.com/es2016-es2017/)

[Exploring ES2018 and ES2019](http://exploringjs.com/es2018-es2019/toc.html)

[How numbers are encoded in JavaScript](http://2ality.com/2012/04/number-encoding.html)

[How to Build a High Velocity Development Team](https://medium.com/javascript-scene/how-to-build-a-high-velocity-development-team-4b2360d34021)

## Data Structures
Linked lists
Hashtables
Stacks and queues
Trees (binary trees and heaps)
Graphs

## Sorting
Binary search
Bubble sort
Insertion sort
Merge sort
Quick sort
Selection sort