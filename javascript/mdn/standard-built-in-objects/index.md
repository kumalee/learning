# Standard built-in objects

## Value properties
These global properties return a simple value; they have no properties or methods.

### Infinity
- The initial value of Infinity is Number.POSITIVE_INFINITY. 
- Examples
    ```js
    console.log(Infinity          ); /* Infinity */  
    console.log(Infinity + 1      ); /* Infinity */  
    console.log(Math.pow(10, 1000)); /* Infinity */  
    console.log(Math.log(0)       ); /* -Infinity */  
    console.log(1 / Infinity      ); /* 0 */
    ```

### NaN
- The initial value of NaN is Not-A-Number — the same as the value of Number.NaN. In modern browsers, NaN is a non-configurable, non-writable property. Even when this is not the case, avoid overriding it.
- Examples
    ```js
    NaN === NaN;        // false
    Number.NaN === NaN; // false
    isNaN(NaN);         // true
    isNaN(Number.NaN);  // true

    function valueIsNaN(v) { return v !== v; }
    valueIsNaN(1);          // false
    valueIsNaN(NaN);        // true
    valueIsNaN(Number.NaN); // true

    // the difference between isNaN() and Number.isNaN()
    isNaN('hello world');        // true
    Number.isNaN('hello world'); // false
    ```

### undefined
- The global undefined property represents the primitive value undefined. It is one of JavaScript's primitive types.
- Syntax
    ```js
    undefined
    ```
- Examples
    ```js
    // Strict equality and undefined
    var x;
    if (x === undefined) {
        // these statements execute
    }
    else {
        // these statements do not execute
    }

    // Typeof operator and undefinedSection
    var x;
    if (typeof x === 'undefined') {
        // these statements execute
    }

    // x has not been declared before
    if (typeof x === 'undefined') { 
        // evaluates to true without errors
        // these statements execute
    }

    if (x === undefined) { 
        // throws a ReferenceError
    }

    // Void operator and undefined
    var x;
    if (x === void 0) {
        // these statements execute
    }

    // y has not been declared before
    if (y === void 0) {
        // throws a - Uncaught ReferenceError: y is not defined
    }
    ```

### null literal
- The value null represents the intentional absence of any object value. It is one of JavaScript's primitive values.
- Syntax
    ```js
    null
    ```
- Examples
    ```js
    // foo does not exist. It is not defined and has never been initialized:
    foo;
    "ReferenceError: foo is not defined"

    // foo is known to exist now but it has no type or value:
    var foo = null; 
    foo;
    "null"

    // difference between null and undefined
    // When checking for null or undefined, beware of the differences between equality (==) and identity (===) operators, as the former performs type-conversion.
    typeof null          // "object" (not "null" for legacy reasons)
    typeof undefined     // "undefined"
    null === undefined   // false
    null  == undefined   // true
    null === null        // true
    null == null         // true
    !null                // true
    isNaN(1 + null)      // false
    isNaN(1 + undefined) // true
    ```

### globalThis
- The global globalThis property returns the top level global object.
- Syntax
    ```js
    globalThis
    ```
- DescriptionSection
    ```js
    Historically, accessing the global scope has required different syntax in different JavaScript environments. On the web you can use window, self or frames - but in Web Workers only self will work. In Node.js none of these work, and you must instead use global.
    The this keyword could be used inside functions running in sloppy mode, but this will be undefined in modules and inside functions running in strict mode.

    The globalThis property provides a standard way of accessing the global object across environments. Unlike similar properties such as window and self, it's guaranteed to work in window and non-window contexts. In this way, you can access the global object in a consistent manner without having to know which environment the code is being run in.

    To help you remember the name, just remember that in global scope the this value is globalThis.
    ```
- Naming
    ```js
    Several other popular name choices such as self and global were removed from consideration because of their potential to break compatibility with existing code.
    ```
- Examples
    ```js
    var getGlobal = function () { 
        if (typeof self !== 'undefined') { return self; } 
        if (typeof window !== 'undefined') { return window; } 
        if (typeof global !== 'undefined') { return global; } 
        throw new Error('unable to locate global object'); 
    }; 

    var globals = getGlobal(); 

    if (typeof globals.setTimeout !== 'function') { 
        // no setTimeout in this environment! 
    }

    // With globalThis available, the additional search for the global across environments is not necessary anymore:

    if (typeof globalThis.setTimeout !== 'function') {
        // no setTimeout in this environment!
    }
    ```

## Function properties

## Fundamental objects

## Numbers and dates

## Text processing

## Indexed collections

## Keyed collections

## Structured data

## Control abstraction objects

## Reflection

## Internationalization

## WebAssembly

## Other
### arguments