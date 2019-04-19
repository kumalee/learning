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
