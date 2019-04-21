# Array
The JavaScript Array object is a global object that is used in the construction of arrays; which are high-level, list-like objects.

## Loop over an Array
```
fruits.forEach(function(item, index, array) {
  console.log(item, index);
});
// Apple 0
// Banana 1
```

## Add to the end of an Array
```
var newLength = fruits.push('Orange');
// ["Apple", "Banana", "Orange"]
```

## Remove from the end of an Array
```
var last = fruits.pop(); // remove Orange (from the end)
// ["Apple", "Banana"];
```

## Remove from the front of an Array
```
var first = fruits.shift(); // remove Apple from the front
// ["Banana"];
```

## Add to the front of an Array
```
var newLength = fruits.unshift('Strawberry') // add to the front
// ["Strawberry", "Banana"];
```

## Find the index of an item in the Array
```
fruits.push('Mango');
// ["Strawberry", "Banana", "Mango"]

var pos = fruits.indexOf('Banana');
// 1
```

## Remove an item by index position
```
var removedItem = fruits.splice(pos, 1); // this is how to remove an item
                                        
// ["Strawberry", "Mango"]
```

## Remove items from an index position
```
var vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
console.log(vegetables); 
// ["Cabbage", "Turnip", "Radish", "Carrot"]

var pos = 1, n = 2;

var removedItems = vegetables.splice(pos, n); 
// this is how to remove items, n defines the number of items to be removed,
// from that position(pos) onward to the end of array.

console.log(vegetables); 
// ["Cabbage", "Carrot"] (the original array is changed)

console.log(removedItems); 
// ["Turnip", "Radish"]
```

## Copy an Array
```
var shallowCopy = fruits.slice(); // this is how to make a copy
// ["Strawberry", "Mango"]
```

## Relationship between length and numerical properties
```
var fruits = [];
fruits.push('banana', 'apple', 'peach');

console.log(fruits.length); // 3

fruits[5] = 'mango';
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits.length); // 6

fruits.length = 10;
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10

fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

## Creating an array using the result of a match
```js
// Match one d followed by one or more b's followed by one d
// Remember matched b's and the following d
// Ignore case

var myRe = /d(b+)(d)/i;
var myArray = myRe.exec('cdbBdbsbz');
// ["dbBd", "bB", "d", index: 1, input: "cdbBdbsbz", groups: undefined]

/*
myArray
input: cdbBdbsbz
A read-only property that reflects the original string against which the regular expression was matched.	

index: 1
A read-only property that is the zero-based index of the match in the string.

[0]	A read-only element that specifies the last matched characters.	dbBd
[1], ...[n]	 [1]: bB, [2]: d
Read-only elements that specify the parenthesized substring matches, if included in the regular expression. The number of possible parenthesized substrings is unlimited.
*/
```

## Properties
Array.length
  - The Array constructor's length property whose value is 1.

get Array[@@species]
  - The constructor function that is used to create derived objects.
  - Syntax
  ```js
  /**
   * return: The Array constructor.
   */
  Array[Symbol.species]
  ```
  - Examples
  ```js
  // The species accessor property returns the default constructor for Array objects. Subclass constructors may override it to change the constructor assignment.
  Array[Symbol.species]; // ƒ Array() { [native code] }
  class MyArray extends Array {
    // Overwrite MyArray species to the parent Array constructor
    static get [Symbol.species]() { return Array; }
  }
  MyArray[Symbol.species] // ƒ Array() { [native code] }
  ```

Array.prototype
  - Allows the addition of properties to all array objects.
  - Description
  ```
  Array instances inherit from Array.prototype. As with all constructors, you can change the constructor's prototype object to make changes to all Array instances. For example, you can add new methods and properties to extend all Array objects. This is used for polyfilling, for example.
  ```
  - Examples
  ```js
  Array.isArray(Array.prototype); // true
  ```

## Methods
Array.from()
- Creates a new Array instance from an array-like or iterable object.
- Description
  ```js
  Array.from() lets you create Arrays from:

  array-like objects (objects with a length property and indexed elements) or
  iterable objects (objects where you can get its elements, such as Map and Set).
  ```
- Syntax
  ```js
  Array.from(arrayLike[, mapFn[, thisArg]])
  ```
- Examples
  ```js
  Array.from('foo'); 
  // [ "f", "o", "o" ]
  
  const set = new Set(['foo', 'bar', 'baz', 'foo']);
  Array.from(set);
  // [ "foo", "bar", "baz" ]

  const map = new Map([[1, 2], [2, 4], [4, 8]]);
  Array.from(map);
  // [[1, 2], [2, 4], [4, 8]]

  const mapper = new Map([['1', 'a'], ['2', 'b']]);
  Array.from(mapper.values());
  // ['a', 'b'];

  Array.from(mapper.keys());
  // ['1', '2'];

  function f() {
    return Array.from(arguments);
  }

  f(1, 2, 3);

  // [ 1, 2, 3 ]

  // Using an arrow function as the map function to
  // manipulate the elements
  Array.from([1, 2, 3], x => x + x);      
  // [2, 4, 6]

  // Generate a sequence of numbers
  // Since the array is initialized with `undefined` on each position,
  // the value of `v` below will be `undefined`
  Array.from({length: 5}, (v, i) => i);
  // [0, 1, 2, 3, 4]

  // Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

  // Generate numbers range 0..4
  range(0, 4, 1);
  // [0, 1, 2, 3, 4] 

  // Generate numbers range 1..10 with step of 2 
  range(1, 10, 2); 
  // [1, 3, 5, 7, 9]

  // Generate the alphabet using Array.from making use of it being ordered as a sequence
  range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
  // ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  ```

Array.isArray()
- Returns true if a variable is an array, if not false.
- Syntax
  ```js
  Array.isArray(value)
  ```
- Examples
  ```js
  // all following calls return true
  Array.isArray([]);
  Array.isArray([1]);
  Array.isArray(new Array());
  Array.isArray(new Array('a', 'b', 'c', 'd'));
  Array.isArray(new Array(3));
  // Little known fact: Array.prototype itself is an array:
  Array.isArray(Array.prototype); 

  // all following calls return false
  Array.isArray();
  Array.isArray({});
  Array.isArray(null);
  Array.isArray(undefined);
  Array.isArray(17);
  Array.isArray('Array');
  Array.isArray(true);
  Array.isArray(false);
  Array.isArray(new Uint8Array(32));
  Array.isArray({ __proto__: Array.prototype });
  ```
- Tips
  ```js
  When checking for Array instance, Array.isArray is preferred over instanceof because it works through iframes.

  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  xArray = window.frames[window.frames.length-1].Array;
  var arr = new xArray(1,2,3); // [1,2,3]

  // Correctly checking for Array
  Array.isArray(arr);  // true
  // Considered harmful, because doesn't work through iframes
  arr instanceof Array; // false
  ```

Array.of()
- Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
- Syntax
  ```js
  Array.of(element0[, element1[, ...[, elementN]]])
  ```
- Exampls
  ```js
  Array.of(1);         // [1]
  Array.of(1, 2, 3);   // [1, 2, 3]
  Array.of(undefined); // [undefined]
  ```


## Array instancesSection

All Array instances inherit from  Array.prototype. The prototype object of the Array constructor can be modified to affect all Array instances.

### Properties
Array.prototype.constructor
- Specifies the function that creates an object's prototype.

Array.prototype.length
- Reflects the number of elements in an array.
- Description
  ```js
  The value of the length property is an integer with a positive sign and a value less than 2 to the 32nd power (232).

  var namelistA = new Array(4294967296); //2 to the 32nd power = 4294967296 
  var namelistC = new Array(-100) //negative sign

  console.log(namelistA.length); //RangeError: Invalid array length 
  console.log(namelistC.length); //RangeError: Invalid array length 



  var namelistB = [];
  namelistB.length = Math.pow(2,32)-1; //set array length less than 2 to the 32nd power 
  console.log(namelistB.length); 

  //4294967295

  const arr = [1, 2];
  console.log(arr);
  // [ 1, 2 ]

  arr.length = 5; // set array length to 5 while currently 2.
  console.log(arr);
  // [ 1, 2, <3 empty items> ]

  arr.forEeach(element => console.log(element));
  // 1
  // 2
  ```

Array.prototype[@@unscopables]
- A symbol containing property names to exclude from a with binding scope.

### Methods
#### Mutator methods
These methods modify the array:

Array.prototype.copyWithin()
- Copies a sequence of array elements within the array.
- Syntax
  ```js
  arr.copyWithin(target[, start[, end]])
  ```
- Examples
  ```js
  [1, 2, 3, 4, 5].copyWithin(-2);
  // [1, 2, 3, 1, 2]

  [1, 2, 3, 4, 5].copyWithin(0, 3);
  // [4, 5, 3, 4, 5]

  [1, 2, 3, 4, 5].copyWithin(0, 3, 4);
  // [4, 2, 3, 4, 5]

  [1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
  // [1, 2, 3, 3, 4]

  [].copyWithin.call({3: 1, length: 5}, 0, 3);
  // {0: 1, 3: 1, length: 5}
  // length will be treated as a array.length
  // 3:1 will be treated as index:3, value: 1
  // so the json object is like
  // [,,,1,]
  // [,,,1,].copyWithin(0, 3)
  // [1,,1,]
  ```

Array.prototype.fill()
- Fills all the elements of an array from a start index to an end index with a static value.
- Syntax
  ```js
  arr.fill(value[, start[, end]])
  /*
  default value:
    start: 0
    end: this.length
  */
  ```
- Examples
  ```js
  [1, 2, 3].fill(4);               // [4, 4, 4]
  [1, 2, 3].fill(4, 1);            // [1, 4, 4]
  [1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
  [1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
  [1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
  [1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
  [1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
  [1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
  Array(3).fill(4);                // [4, 4, 4]
  [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
  ```

Array.prototype.pop()
- Removes the last element from an array and returns that element.
- Syntax
  ```js
  arr.pop()
  ```
- Examples
  ```js
  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

  var popped = myFish.pop();

  console.log(myFish); // ['angel', 'clown', 'mandarin' ]

  console.log(popped); // 'sturgeon'

  var myFish = {0:'angel', 1:'clown', 2:'mandarin', 3:'sturgeon', length: 4};

  var popped = Array.prototype.pop.call(myFish); //same syntax for using apply( )

  console.log(myFish); // {0:'angel', 1:'clown', 2:'mandarin', length: 3} 

  console.log(popped); // 'sturgeon'
  ```

Array.prototype.push()
- Adds one or more elements to the end of an array and returns the new length of the array.
- Syntax
  ```js
  arr.push(element1[, ...[, elementN]])
  ```
- Examples
  ```js
  var sports = ['soccer', 'baseball'];
  var total = sports.push('football', 'swimming');

  console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
  console.log(total);  // 4

  var vegetables = ['parsnip', 'potato'];
  var moreVegs = ['celery', 'beetroot'];

  // Merge the second array into the first one
  // Equivalent to vegetables.push('celery', 'beetroot');
  Array.prototype.push.apply(vegetables, moreVegs);

  console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']


  var obj = {
    length: 0,

    addElem: function addElem(elem) {
        // obj.length is automatically incremented 
        // every time an element is added.
        [].push.call(this, elem);
    }
  };

  // Let's add some empty objects just to illustrate.
  obj.addElem({});
  obj.addElem({});
  console.log(obj.length);
  // → 2
  ```

Array.prototype.reverse()
- Reverses the order of the elements of an array in place — the first becomes the last, and the last becomes the first.
- Syntax
  ```js
  a.reverse()
  ```
- Examples
  ```
  const a = [1, 2, 3];

  console.log(a); // [1, 2, 3]

  a.reverse(); 

  console.log(a); // [3, 2, 1]


  const a = {0: 1, 1: 2, 2: 3, length: 3};

  console.log(a); // {0: 1, 1: 2, 2: 3, length: 3}

  Array.prototype.reverse.call(a); //same syntax for using apply()

  console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}
  ```

Array.prototype.shift()
- Removes the first element from an array and returns that element.
- Syntax
  ```js
  arr.shift()
  ```
- Examples
  ```js
  var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

  console.log('myFish before:', JSON.stringify(myFish));
  // myFish before: ['angel', 'clown', 'mandarin', 'surgeon']

  var shifted = myFish.shift(); 

  console.log('myFish after:', myFish); 
  // myFish after: ['clown', 'mandarin', 'surgeon']

  console.log('Removed this element:', shifted); 
  // Removed this element: angel


  var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

  while( (i = names.shift()) !== undefined ) {
      console.log(i);
  }
  // Andrew, Edward, Paul, Chris, John
  ```

Array.prototype.sort()
- Sorts the elements of an array in place and returns the array.
- Description
  ```js
  If compareFunction is not supplied, all non-undefined array elements are sorted by converting them to strings and comparing strings in UTF-16 code units order. For example, "banana" comes before "cherry". In a numeric sort, 9 comes before 80, but because numbers are converted to strings, "80" comes before "9" in Unicode order. All undefined elements are sorted to the end of the array.
  ```
- Syntax
  ```js
  arr.sort([compareFunction])
  ```
- Examples
  ```js
  function compare(a, b) {
    if (a is less than b by some ordering criterion) {
      return -1;
    }
    if (a is greater than b by the ordering criterion) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

  function compareNumbers(a, b) {
    return a - b;
  }

  var numbers = [4, 2, 5, 1, 3];
  numbers.sort(function(a, b) {
    return a - b;
  });
  console.log(numbers);

  // [1, 2, 3, 4, 5]


  var stringArray = ['Blue', 'Humpback', 'Beluga'];
  var numericStringArray = ['80', '9', '700'];
  var numberArray = [40, 1, 5, 200];
  var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

  function compareNumbers(a, b) {
    return a - b;
  }

  console.log('stringArray:', stringArray.join());
  console.log('Sorted:', stringArray.sort());
  /*
  stringArray: Blue,Humpback,Beluga
  Sorted: Beluga,Blue,Humpback
  */

  console.log('numberArray:', numberArray.join());
  console.log('Sorted without a compare function:', numberArray.sort());
  console.log('Sorted with compareNumbers:', numberArray.sort(compareNumbers));
  /*
  numberArray: 40,1,5,200
  Sorted without a compare function: 1,200,40,5
  Sorted with compareNumbers: 1,5,40,200
  */

  console.log('numericStringArray:', numericStringArray.join());
  console.log('Sorted without a compare function:', numericStringArray.sort());
  console.log('Sorted with compareNumbers:', numericStringArray.sort(compareNumbers));

  /*
  numericStringArray: 80,9,700
  Sorted without a compare function: 700,80,9
  Sorted with compareNumbers: 9,80,700
  */

  console.log('mixedNumericArray:', mixedNumericArray.join());
  console.log('Sorted without a compare function:', mixedNumericArray.sort());
  console.log('Sorted with compareNumbers:', mixedNumericArray.sort(compareNumbers));
  /*
  mixedNumericArray: 80,9,700,40,1,5,200
  Sorted without a compare function: 1,200,40,5,700,80,9
  Sorted with compareNumbers: 1,5,9,40,80,200,700
  */

  var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];
  items.sort(function (a, b) {
    return a.localeCompare(b);
  });

  // items is ['adieu', 'café', 'cliché', 'communiqué', 'premier', 'réservé']
  ```

Array.prototype.splice()
- Adds and/or removes elements from an array.
- Syntax
  ```js
  array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
  ```
- Examples
  ```js
  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
  var removed = myFish.splice(2, 0, 'drum');

  // myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"] 
  // removed is [], no elements removed

  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
  var removed = myFish.splice(2, 0, 'drum', 'guitar');

  // myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"] 
  // removed is [], no elements removed

  var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
  var removed = myFish.splice(3, 1);

  // removed is ["mandarin"]
  // myFish is ["angel", "clown", "drum", "sturgeon"]

  var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
  var removed = myFish.splice(2, 1, 'trumpet');

  // myFish is ["angel", "clown", "trumpet", "sturgeon"]
  // removed is ["drum"]

  var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
  var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

  // myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"] 
  // removed is ["angel", "clown"]

  var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
  var removed = myFish.splice(myFish.length - 3, 2);

  // myFish is ["parrot", "anemone", "sturgeon"] 
  // removed is ["blue", "trumpet"]

  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
  var removed = myFish.splice(-2, 1);

  // myFish is ["angel", "clown", "sturgeon"] 
  // removed is ["mandarin"]

  var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
  var removed = myFish.splice(2);

  // myFish is ["angel", "clown"] 
  // removed is ["mandarin", "sturgeon"]
  ```

Array.prototype.unshift()
- Adds one or more elements to the front of an array and returns the new length of the array.
- Syntax
  ```js
  arr.unshift(element1[, ...[, elementN]])
  ```
- Examples
  ```js
  let arr = [1, 2];

  arr.unshift(0); // result of the call is 3, which is the new array length
  // arr is [0, 1, 2]

  arr.unshift(-2, -1); // the new array length is 5
  // arr is [-2, -1, 0, 1, 2]

  arr.unshift([-4, -3]); // the new array length is 6
  // arr is [[-4, -3], -2, -1, 0, 1, 2]

  arr.unshift([-7, -6], [-5]); // the new array length is 8
  // arr is [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]
  ```

#### Accessor methods
These methods do not modify the array and return some representation of the array.

Array.prototype.concat()
- Returns a new array that is this array joined with other array(s) and/or value(s).
- Syntax
  ```js
  var new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])
  ```
- Examples
  ```js
  const letters = ['a', 'b', 'c'];
  const numbers = [1, 2, 3];

  letters.concat(numbers);
  // result in ['a', 'b', 'c', 1, 2, 3]

  const num1 = [1, 2, 3];
  const num2 = [4, 5, 6];
  const num3 = [7, 8, 9];

  const numbers = num1.concat(num2, num3);

  console.log(numbers); 
  // results in [1, 2, 3, 4, 5, 6, 7, 8, 9]


  const letters = ['a', 'b', 'c'];

  const alphaNumeric = letters.concat(1, [2, 3]);

  console.log(alphaNumeric); 
  // results in ['a', 'b', 'c', 1, 2, 3]



  const num1 = [[1]];
  const num2 = [2, [3]];

  const numbers = num1.concat(num2);

  console.log(numbers);
  // results in [[1], 2, [3]]

  // modify the first element of num1
  num1[0].push(4);

  console.log(numbers);
  // results in [[1, 4], 2, [3]]
  ```

Array.prototype.includes()
- Determines whether an array contains a certain element, returning true or false as appropriate.
- Syntax
  ```js
  arr.includes(valueToFind[, fromIndex])
  ```
- Examples
  ```js
  [1, 2, 3].includes(2);     // true
  [1, 2, 3].includes(4);     // false
  [1, 2, 3].includes(3, 3);  // false
  [1, 2, 3].includes(3, -1); // true
  [1, 2, NaN].includes(NaN); // true

  var arr = ['a', 'b', 'c'];

  arr.includes('c', 3);   // false
  arr.includes('c', 100); // false


  // array length is 3
  // fromIndex is -100
  // computed index is 3 + (-100) = -97

  var arr = ['a', 'b', 'c'];

  arr.includes('a', -100); // true
  arr.includes('b', -100); // true
  arr.includes('c', -100); // true
  arr.includes('a', -2); // false

  /*
  includes() method is intentionally generic. It does not require this value to be an Array object, so it can be applied to other kinds of objects (e.g. array-like objects). The example below illustrates includes() method called on the function's arguments object.
  */
  (function() {
    console.log([].includes.call(arguments, 'a')); // true
    console.log([].includes.call(arguments, 'd')); // false
  })('a','b','c');
  ```

Array.prototype.indexOf()
- Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
- Syntax
  ```js
  arr.indexOf(searchElement[, fromIndex])
  ```
- Examples
  ```js
  var array = [2, 9, 9];
  array.indexOf(2);     // 0
  array.indexOf(7);     // -1
  array.indexOf(9, 2);  // 2
  array.indexOf(2, -1); // -1
  array.indexOf(2, -3); // 0

  var indices = [];
  var array = ['a', 'b', 'a', 'c', 'a', 'd'];
  var element = 'a';
  var idx = array.indexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1);
  }
  console.log(indices);
  // [0, 2, 4]

  function updateVegetablesCollection (veggies, veggie) {
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        console.log('New veggies collection is : ' + veggies);
    } else if (veggies.indexOf(veggie) > -1) {
        console.log(veggie + ' already exists in the veggies collection.');
    }
  }

  var veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];

  updateVegetablesCollection(veggies, 'spinach'); 
  // New veggies collection is : potato,tomato,chillies,green-pepper,spinach
  updateVegetablesCollection(veggies, 'spinach'); 
  // spinach already exists in the veggies collection.
  ```

Array.prototype.join()
- Joins all elements of an array into a string.
- Syntax
  ```js
  arr.join([separator])
  ```
- Examples
  ```js
  var a = ['Wind', 'Rain', 'Fire'];
  a.join();      // 'Wind,Rain,Fire'
  a.join(', ');  // 'Wind, Rain, Fire'
  a.join(' + '); // 'Wind + Rain + Fire'
  a.join('');    // 'WindRainFire'

  function f(a, b, c) {
    var s = Array.prototype.join.call(arguments);
    console.log(s); // '1,a,true'
  }
  f(1, 'a', true);
  //expected output: "1,a,true"
  ```

Array.prototype.lastIndexOf()
- Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
- Syntax
  ```js
  arr.lastIndexOf(searchElement[, fromIndex])
  ```
- Examples
  ```js
  var numbers = [2, 5, 9, 2];
  numbers.lastIndexOf(2);     // 3
  numbers.lastIndexOf(7);     // -1
  numbers.lastIndexOf(2, 3);  // 3
  numbers.lastIndexOf(2, 2);  // 0
  numbers.lastIndexOf(2, -2); // 0
  numbers.lastIndexOf(2, -1); // 3

  var indices = [];
  var array = ['a', 'b', 'a', 'c', 'a', 'd'];
  var element = 'a';
  var idx = array.lastIndexOf(element);
  while (idx != -1) {
    indices.push(idx);
    idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
  }

  console.log(indices);
  // [4, 2, 0]
  ```

Array.prototype.slice()
- Extracts a section of an array and returns a new array.
- Syntax
  ```js
  arr.slice([begin[, end]])
  ```
- Examples
  ```js
  var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
  var citrus = fruits.slice(1, 3);

  // fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
  // citrus contains ['Orange','Lemon']

  // Using slice, create newCar from myCar.
  var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } };
  var myCar = [myHonda, 2, 'cherry condition', 'purchased 1997'];
  var newCar = myCar.slice(0, 2);

  // Display the values of myCar, newCar, and the color of myHonda
  //  referenced from both arrays.
  console.log('myCar = ' + JSON.stringify(myCar));
  // myCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2,
         'cherry condition', 'purchased 1997']
  console.log('newCar = ' + JSON.stringify(newCar));
  // newCar = [{color: 'red', wheels: 4, engine: {cylinders: 4, size: 2.2}}, 2]
  console.log('myCar[0].color = ' + myCar[0].color);
  // myCar[0].color = red 
  console.log('newCar[0].color = ' + newCar[0].color);
  // newCar[0].color = red

  // Change the color of myHonda.
  myHonda.color = 'purple';

  console.log('The new color of my Honda is ' + myHonda.color);
  The new color of my Honda is purple

  // Display the color of myHonda referenced from both arrays.
  console.log('myCar[0].color = ' + myCar[0].color);
  // myCar[0].color = purple
  console.log('newCar[0].color = ' + newCar[0].color);
  // newCar[0].color = purple

  function list() {
    return Array.prototype.slice.call(arguments);
  }

  var list1 = list(1, 2, 3); // [1, 2, 3]
  
  var unboundSlice = Array.prototype.slice;
  var slice = Function.prototype.call.bind(unboundSlice);

  function list() {
    return slice(arguments);
  }

  var list1 = list(1, 2, 3); // [1, 2, 3]
  ```

Array.prototype.toSource() 
- Returns an array literal representing the specified array; you can use this value to create a new array. Overrides the Object.prototype.toSource() method.
- Warning: Non-standard
This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future.

Array.prototype.toString()
- Returns a string representing the array and its elements. Overrides the Object.prototype.toString() method.
- Syntax
  ```js
  arr.toString()
  ```

Array.prototype.toLocaleString()
- Returns a localized string representing the array and its elements. Overrides the Object.prototype.toLocaleString() method.
- Syntax
  ```js
  arr.toLocaleString([locales[, options]]);
  ```
- Examples
  ```
  var prices = ['￥7', 500, 8123, 12];
  prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });

  // "￥7,￥500,￥8,123,￥12"
  ```

#### Iteration methods
Array.prototype.entries()
- Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
- Syntax
  ```js
  array.entries()
  ```
- Examples
  ```js
  const a = ['a', 'b', 'c'];

  for (const [index, element] of a.entries())
    console.log(index, element);

  // [0, 'a']
  // [1, 'b']
  // [2, 'c']

  var a = ['a', 'b', 'c'];
  var iterator = a.entries();

  for (let e of iterator) {
    console.log(e);
  }
  // [0, 'a']
  // [1, 'b']
  // [2, 'c']
  ```

Array.prototype.every()
- Returns true if every element in this array satisfies the provided testing function.
- Syntax
  ```js
  arr.every(callback[, thisArg])
  ```
- Examples
  ```js
  function isBigEnough(element, index, array) {
    return element >= 10;
  }
  [12, 5, 8, 130, 44].every(isBigEnough);   // false
  [12, 54, 18, 130, 44].every(isBigEnough); // true

  [12, 5, 8, 130, 44].every(x => x >= 10); // false
  [12, 54, 18, 130, 44].every(x => x >= 10); // true
  [].every(x => x >= 10); // true
  ```
- Tips
  ```js
  In particular, for an empty array, it returns true. (It is vacuously true that all elements of the empty set satisfy any given condition.)
  ```

Array.prototype.filter()
- Creates a new array with all of the elements of this array for which the provided filtering function returns true.
- Syntax
  ```js
  var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
  ```
- Examples
  ```js
  function isBigEnough(value) {
    return value >= 10;
  }

  var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
  // filtered is [12, 130, 44]

  var arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    { },
    { id: null },
    { id: NaN },
    { id: 'undefined' }
  ];

  var invalidEntries = 0;

  function isNumber(obj) {
    return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
  }

  function filterByID(item) {
    if (isNumber(item.id) && item.id !== 0) {
      return true;
    } 
    invalidEntries++;
    return false; 
  }

  var arrByID = arr.filter(filterByID);

  console.log('Filtered Array\n', arrByID); 
  // Filtered Array
  // [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

  console.log('Number of Invalid Entries = ', invalidEntries); 
  // Number of Invalid Entries = 5

  const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

  /**
  * Filter array items based on search criteria (query)
  */
  const filterItems = (arr, query) => {
    return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
  };

  console.log(filterItems(fruits, 'ap')); // ['apple', 'grapes']
  console.log(filterItems(fruits, 'an')); // ['banana', 'mango', 'orange']
  ```

Array.prototype.find()
- Returns the found value in the array, if an element in the array satisfies the provided testing function or undefined if not found.
- Syntax
  ```js
  arr.find(callback[, thisArg])
  ```
- Examples
  ```js
  var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
  ];

  const result = inventory.find( fruit => fruit.name === 'cherries' );

  console.log(inventory.find(isCherries)); 
  // { name: 'cherries', quantity: 5 }

  function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start++ < 1) {
        return false;
      }
    }
    return element > 1;
  }

  console.log([4, 6, 8, 12].find(isPrime)); // undefined, not found
  console.log([4, 5, 8, 12].find(isPrime)); // 5


  // Declare array with no element at index 2, 3 and 4
  var array = [0,1,,,,5,6];

  // Shows all indexes, not just those that have been assigned values
  array.find(function(value, index) {
    console.log('Visited index ' + index + ' with value ' + value); 
  });

  // Shows all indexes, including deleted
  array.find(function(value, index) {

    // Delete element 5 on first iteration
    if (index == 0) {
      console.log('Deleting array[5] with value ' + array[5]);
      delete array[5];
    }
    // Element 5 is still visited even though deleted
    console.log('Visited index ' + index + ' with value ' + value); 
  });
  // expected output:
  // Deleting array[5] with value 5 
  // Visited index 0 with value 0 
  // Visited index 1 with value 1 
  // Visited index 2 with value undefined 
  // Visited index 3 with value undefined 
  // Visited index 4 with value undefined 
  // Visited index 5 with value undefined 
  // Visited index 6 with value 6
  ```

Array.prototype.findIndex()
- Returns the found index in the array, if an element in the array satisfies the provided testing function or -1 if not found.
- Syntax
  ```js
  arr.findIndex(callback(element[, index[, array]])[, thisArg])
  ```
- Examples
  ```js
  function isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start < 1) {
        return false;
      } else {
        start++;
      }
    }
    return element > 1;
  }

  console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
  console.log([4, 6, 7, 12].findIndex(isPrime)); // 2 (array[2] is 7)


  const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];
  const index = fruits.findIndex(fruit => fruit === "blueberries");

  console.log(index); // 3
  console.log(fruits[index]); // blueberries
  ```

Array.prototype.forEach()
- Calls a function for each element in the array.
- Syntax
  ```js
  arr.forEach(function callback(currentValue [, index [, array]]) {
    //your iterator
  }[, thisArg]);
  ```
- Examples
  ```js
  const items = ['item1', 'item2', 'item3'];
  const copy = [];

  // before
  for (let i=0; i<items.length; i++) {
    copy.push(items[i]);
  }

  // after
  items.forEach(function(item){
    copy.push(item);
  });


  function logArrayElements(element, index, array) {
    console.log('a[' + index + '] = ' + element);
  }

  // Notice that index 2 is skipped since there is no item at
  // that position in the array.
  [2, 5, , 9].forEach(logArrayElements);
  // logs:
  // a[0] = 2
  // a[1] = 5
  // a[3] = 9


  function Counter() {
    this.sum = 0;
    this.count = 0;
  }
  Counter.prototype.add = function(array) {
    array.forEach(function(entry) {
      this.sum += entry;
      ++this.count;
    }, this);
    // ^---- Note
  };

  const obj = new Counter();
  obj.add([2, 5, 9]);
  obj.count;
  // 3 
  obj.sum;
  // 16


  function copy(obj) {
    const copy = Object.create(Object.getPrototypeOf(obj));
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function(name) {
      const desc = Object.getOwnPropertyDescriptor(obj, name);
      Object.defineProperty(copy, name, desc);
    });

    return copy;
  }

  const obj1 = { a: 1, b: 2 };
  const obj2 = copy(obj1); // obj2 looks like obj1 now


  var words = ['one', 'two', 'three', 'four'];
  words.forEach(function(word) {
    console.log(word);
    if (word === 'two') {
      words.shift();
    }
  });
  // one
  // two
  // four
  ```

Array.prototype.keys()
- Returns a new Array Iterator that contains the keys for each index in the array.
- Syntax
  ```js
  arr.keys()
  ```
- Examples
  ```js
  var arr = ['a', , 'c'];
  var sparseKeys = Object.keys(arr);
  var denseKeys = [...arr.keys()];
  console.log(sparseKeys); // ['0', '2']  Object.keys(arr) will ignore holes
  console.log(denseKeys);  // [0, 1, 2]  [].keys() doesn't ignore holes
  ```

Array.prototype.map()
- Creates a new array with the results of calling a provided function on every element in this array.
- Syntax
  ```js
  var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // Return element for new_array
  }[, thisArg])
  ```
- Examples
  ```js
  var numbers = [1, 4, 9];
  var roots = numbers.map(function(num) {
    return Math.sqrt(num)
  });
  // roots is now [1, 2, 3]
  // numbers is still [1, 4, 9]

  var kvArray = [{key: 1, value: 10}, 
               {key: 2, value: 20}, 
               {key: 3, value: 30}];

  var reformattedArray = kvArray.map(obj =>{ 
    var rObj = {};
    rObj[obj.key] = obj.value;
    return rObj;
  });
  // reformattedArray is now [{1: 10}, {2: 20}, {3: 30}], 

  // kvArray is still: 
  // [{key: 1, value: 10}, 
  //  {key: 2, value: 20}, 
  //  {key: 3, value: 30}]

  var numbers = [1, 4, 9];
  var doubles = numbers.map(function(num) {
    return num * 2;
  });

  // doubles is now [2, 8, 18]
  // numbers is still [1, 4, 9]


  var map = Array.prototype.map;
  var a = map.call('Hello World', function(x) { 
    return x.charCodeAt(0); 
  });
  // a now equals [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

  var elems = document.querySelectorAll('select option:checked');
  var values = Array.prototype.map.call(elems, function(obj) {
    return obj.value;
  });


  // Consider:
  ['1', '2', '3'].map(parseInt);
  // While one could expect [1, 2, 3]
  // The actual result is [1, NaN, NaN]

  // parseInt is often used with one argument, but takes two.
  // The first is an expression and the second is the radix.
  // To the callback function, Array.prototype.map passes 3 arguments: 
  // the element, the index, the array
  // The third argument is ignored by parseInt, but not the second one,
  // hence the possible confusion. See the blog post for more details
  // If the link doesn't work
  // here is concise example of the iteration steps:
  // parseInt(string, radix) -> map(parseInt(value, index))
  // first iteration (index is 0): parseInt('1', 0) // results in parseInt('1', 0) -> 1
  // second iteration (index is 1): parseInt('2', 1) // results in parseInt('2', 1) -> NaN
  // third iteration (index is 2): parseInt('3', 2) // results in parseInt('3', 2) -> NaN

  function returnInt(element) {
    return parseInt(element, 10);
  }

  ['1', '2', '3'].map(returnInt); // [1, 2, 3]
  // Actual result is an array of numbers (as expected)

  // Same as above, but using the concise arrow function syntax
  ['1', '2', '3'].map( str => parseInt(str) );

  // A simpler way to achieve the above, while avoiding the "gotcha":
  ['1', '2', '3'].map(Number); // [1, 2, 3]
  // but unlike `parseInt` will also return a float or (resolved) exponential notation:
  ['1.1', '2.2e2', '3e300'].map(Number); // [1.1, 220, 3e+300]


  var xs = ['10', '10', '10'];
  xs = xs.map(parseInt);
  console.log(xs);
  // Actual result of 10,NaN,2 may be unexpected based on the above description.
  ```

Array.prototype.reduce()
- Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
- Syntax
  ```js
  arr.reduce(callback[, initialValue])
  ```
- Examples
  ```js
  var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
  var maxCallback2 = ( max, cur ) => Math.max( max, cur );

  // reduce() without initialValue
  [ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
  [ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
  [                      ].reduce( maxCallback ); // TypeError

  // map/reduce; better solution, also works for empty or larger arrays
  [ { x: 22 }, { x: 42 } ].map( el => el.x )
                          .reduce( maxCallback2, -Infinity );

  // How reduce() works
  [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
    return accumulator + currentValue;
  });
  ```
  callback | accumulator | currentValue	|currentIndex | array | return value
  ---|---|---|---|---|---
  first call |	0	| 1	| 1	| [0, 1, 2, 3, 4]	| 1
  second call	| 1	| 2	| 2	| [0, 1, 2, 3, 4]	| 3
  third call |	3	| 3	| 3	| [0, 1, 2, 3, 4]	| 6
  fourth call	| 6	| 4	| 4	| [0, 1, 2, 3, 4]	| 10

  ```js
  // use arrow function
  [0, 1, 2, 3, 4].reduce( (accumulator, currentValue, currentIndex, array) => accumulator + currentValue );

  // provide an initial value to the second argument to reduce()
  [0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue;
  }, 10);
  ```
  callback | accumulator | currentValue	|currentIndex | array | return value
  ---|---|---|---|---|---
  first call |	10	| 0	| 0	| [0, 1, 2, 3, 4]	| 10
  second call |	10	| 1	| 1	| [0, 1, 2, 3, 4]	| 11
  third call	| 11	| 2	| 2	| [0, 1, 2, 3, 4]	| 13
  fourth call |	13	| 3	| 3	| [0, 1, 2, 3, 4]	| 16
  fifth call	| 16	| 4	| 4	| [0, 1, 2, 3, 4]	| 20
  ```js
  var initialValue = 0;
  var sum = [{x: 1}, {x: 2}, {x: 3}].reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.x;
  },initialValue)

  console.log(sum) // logs 6

  // written with an arrow function
  var initialValue = 0;
  var sum = [{x: 1}, {x: 2}, {x: 3}].reduce(
      (accumulator, currentValue) => accumulator + currentValue.x
      ,initialValue
  );

  console.log(sum) // logs 6


  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function(accumulator, currentValue) {
      return accumulator.concat(currentValue);
    },
    []
  );
  // flattened is [0, 1, 2, 3, 4, 5]

  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    ( accumulator, currentValue ) => accumulator.concat(currentValue),
    []
  );


  var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

  var countedNames = names.reduce(function (allNames, name) { 
    if (name in allNames) {
      allNames[name]++;
    }
    else {
      allNames[name] = 1;
    }
    return allNames;
  }, {});
  // countedNames is:
  // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }


  var people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
  ];

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  var groupedPeople = groupBy(people, 'age');
  // groupedPeople is:
  // { 
  //   20: [
  //     { name: 'Max', age: 20 }, 
  //     { name: 'Jane', age: 20 }
  //   ], 
  //   21: [{ name: 'Alice', age: 21 }] 
  // }


  // friends - an array of objects 
  // where object field "books" - list of favorite books 
  var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
  }, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
  }, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
  }];

  // allbooks - list which will contain all friends' books +  
  // additional list contained in initialValue
  var allbooks = friends.reduce(function(accumulator, currentValue) {
    return [...accumulator, ...currentValue.books];
  }, ['Alphabet']);

  // allbooks = [
  //   'Alphabet', 'Bible', 'Harry Potter', 'War and peace', 
  //   'Romeo and Juliet', 'The Lord of the Rings',
  //   'The Shining'
  // ]

  // Remove duplicate items in array
  var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
  var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
      accumulator.push(currentValue);
    }
    return accumulator
  }, [])

  console.log(myOrderedArray);

  // Running Promises in Sequence
  /**
  * Runs promises from array of functions that can return promises
  * in chained manner
  *
  * @param {array} arr - promise arr
  * @return {Object} promise object
  */
  function runPromiseInSequence(arr, input) {
    return arr.reduce(
      (promiseChain, currentFunction) => promiseChain.then(currentFunction),
      Promise.resolve(input)
    );
  }

  // promise function 1
  function p1(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 5);
    });
  }

  // promise function 2
  function p2(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 2);
    });
  }

  // function 3  - will be wrapped in a resolved promise by .then()
  function f3(a) {
    return a * 3;
  }

  // promise function 4
  function p4(a) {
    return new Promise((resolve, reject) => {
      resolve(a * 4);
    });
  }

  const promiseArr = [p1, p2, f3, p4];
  runPromiseInSequence(promiseArr, 10)
    .then(console.log);   // 1200

  // Function composition enabling piping
  // Building-blocks to use for composition
  const double = x => x + x;
  const triple = x => 3 * x;
  const quadruple = x => 4 * x;

  // Function composition enabling pipe functionality
  const pipe = (...functions) => input => functions.reduce(
      (acc, fn) => fn(acc),
      input
  );

  // Composed functions for multiplication of specific values
  const multiply6 = pipe(double, triple);
  const multiply9 = pipe(triple, triple);
  const multiply16 = pipe(quadruple, quadruple);
  const multiply24 = pipe(double, triple, quadruple);

  // Usage
  multiply6(6); // 36
  multiply9(9); // 81
  multiply16(16); // 256
  multiply24(10); // 240

  // write map using reduce
  if (!Array.prototype.mapUsingReduce) {
    Array.prototype.mapUsingReduce = function(callback, thisArg) {
      return this.reduce(function(mappedArray, currentValue, index, array) {
        mappedArray[index] = callback.call(thisArg, currentValue, index, array);
        return mappedArray;
      }, []);
    };
  }

  [1, 2, , 3].mapUsingReduce(
    (currentValue, index, array) => currentValue + index + array.length
  ); // [5, 7, , 10]
  ```

Array.prototype.reduceRight()
- Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.
- Syntax
  ```js
  arr.reduceRight(callback[, initialValue])
  ```
- Examples
  ```js
  [0, 1, 2, 3, 4].reduceRight(function(accumulator, currentValue, index, array) {
    return accumulator + currentValue;
  });
  ```
  callback | accumulator | currentValue	|currentIndex | array | return value
  ---|---|---|---|---|---
  first call |	4	| 3	| 3	| [0, 1, 2, 3, 4]	| 7
  second call	| 7	| 3	| 2	| [0, 1, 2, 3, 4]	| 9
  third call |	9	| 2	| 1	| [0, 1, 2, 3, 4]	| 10
  fourth call	| 10	| 0	| 0	| [0, 1, 2, 3, 4]	| 10
  ```js
  [0, 1, 2, 3, 4].reduceRight(function(accumulator, currentValue, index, array) {
    return accumulator + currentValue;
  }, 10);
  ```
  callback | accumulator | currentValue	|currentIndex | array | return value
  ---|---|---|---|---|---
  first call |	10	| 4	| 4	| [0, 1, 2, 3, 4]	| 14
  second call |	14	| 3	| 3	| [0, 1, 2, 3, 4]	| 17
  third call	| 17	| 3	| 2	| [0, 1, 2, 3, 4]	| 19
  fourth call |	19	| 2	| 1	| [0, 1, 2, 3, 4]	| 20
  fifth call	| 20	| 0	| 0	| [0, 1, 2, 3, 4]	| 20
  ```js
  var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
  }, []);
  // flattened is [4, 5, 2, 3, 0, 1]


  // Difference between reduce and reduceRight
  var a = ['1', '2', '3', '4', '5']; 
  var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
  var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 

  console.log(left);  // "12345"
  console.log(right); // "54321"
  ```

Array.prototype.some()
- Returns true if at least one element in this array satisfies the provided testing function.
- Syntax
  ```js
  arr.some(callback(element[, index[, array]])[, thisArg])
  ```
- Examples
  ```js
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }

  [2, 5, 8, 1, 4].some(isBiggerThan10);  // false
  [12, 5, 8, 1, 4].some(isBiggerThan10); // true

  // Arrow functions provide a shorter syntax
  [2, 5, 8, 1, 4].some(x => x > 10);  // false
  [12, 5, 8, 1, 4].some(x => x > 10); // true


  var fruits = ['apple', 'banana', 'mango', 'guava'];

  function checkAvailability(arr, val) {
    return arr.some(arrVal => val === arrVal);
  }

  checkAvailability(fruits, 'kela');   // false
  checkAvailability(fruits, 'banana'); // true

  var TRUTHY_VALUES = [true, 'true', 1];

  function getBoolean(value) {
    'use strict';
    
    if (typeof value === 'string') {
      value = value.toLowerCase().trim();
    }

    return TRUTHY_VALUES.some(function(t) {
      return t === value;
    });
  }

  getBoolean(false);   // false
  getBoolean('false'); // false
  getBoolean(1);       // true
  getBoolean('true');  // true
  ```

Array.prototype.values()
- Returns a new Array Iterator object that contains the values for each index in the array.
- Syntax
  ```js
  arr.values() // Returns A new Array iterator object.
  ```
- Examples
  ```js
  var arr = ['a', 'b', 'c', 'd', 'e'];
  var iterator = arr.values();

  for (let letter of iterator) {
    console.log(letter);
  }
  // Array.prototype.values is default implementation of Array.prototype[Symbol.iterator].
  Array.prototype.values === Array.prototype[Symbol.iterator]      //true
  ```

Array.prototype[@@iterator]()
- Returns a new Array Iterator object that contains the values for each index in the array.
- Syntax
  ```js
  arr[Symbol.iterator]()
  // The initial value given by the values() iterator. By default, using arr[Symbol.iterator] will return the values() function.
  ```
- Examples
  ```js
  var arr = ['a', 'b', 'c', 'd', 'e'];
  var eArr = arr[Symbol.iterator]();
  // your browser must support for..of loop
  // and let-scoped variables in for loops
  // const and var could also be used
  for (let letter of eArr) {
    console.log(letter);
  }


  var arr = ['a', 'b', 'c', 'd', 'e'];
  var eArr = arr[Symbol.iterator]();
  console.log(eArr.next().value); // a
  console.log(eArr.next().value); // b
  console.log(eArr.next().value); // c
  console.log(eArr.next().value); // d
  console.log(eArr.next().value); // e
  ```
