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
These global functions—functions which are called globally rather than on an object—directly return their results to the caller.

### eval()
- The eval() function evaluates JavaScript code represented as a string.
- Syntax
    ```js
    eval(string)
    ```
- Examples
    ```js
    eval(new String('2 + 2')); // returns a String object containing "2 + 2"
    eval('2 + 2');             // returns 4

    var expression = new String('2 + 2');
    eval(expression.toString());            // returns 4

    function test() {
        var x = 2, y = 4;
        console.log(eval('x + y'));  // Direct call, uses local scope, result is 6
        var geval = eval; // equivalent to calling eval in the global scope
        console.log(geval('x + y')); // Indirect call, uses global scope, throws ReferenceError because `x` is undefined
        (0, eval)('x + y'); // another example of Indirect call
    }
    ```
- **Do NOT use eval**
    ```js
    eval() is a dangerous function, which executes the code it's passed with the privileges of the caller.

    eval() is also slower than the alternatives, since it has to invoke the JS interpreter, while many other constructs are optimized by modern JS engines.

    Additionally, modern javascript interpreters convert javascript to machine code. This means that any concept of variable naming gets obliterated.

    Additonally, new things can be introduced to that variable through eval() such as changing the type of that variable, forcing the browser to reevaluate all of the generated machine code to compensate. 
    ```
### uneval() **Non-standard**
- The uneval() function creates a string representation of the source code of an Object.
- This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future.
- Syntax
    ```js
    uneval(object)
    ```

### isFinite()
- The global isFinite() function determines whether the passed value is a finite number. If  needed, the parameter is first converted to a number.
- Syntax
    ```js
    isFinite(testValue)
    ```
- Examples
    ```js
    isFinite(Infinity);  // false
    isFinite(NaN);       // false
    isFinite(-Infinity); // false

    isFinite(0);         // true
    isFinite(2e64);      // true
    isFinite(910);       // true

    isFinite(null);      // true, would've been false with the 
                        // more robust Number.isFinite(null)

    isFinite('0');       // true, would've been false with the 
                        // more robust Number.isFinite("0")
    ```

### isNaN()
- The isNaN() function determines whether a value is NaN or not. Note: coercion inside the isNaN function has interesting rules; you may alternatively want to use Number.isNaN(), as defined in ECMAScript 2015.
- Syntax
    ```js
    isNaN(value)
    ```
- Examples
    ```js
    isNaN(NaN);       // true
    isNaN(undefined); // true
    isNaN({});        // true

    isNaN(true);      // false
    isNaN(null);      // false
    isNaN(37);        // false

    // strings
    isNaN('37');      // false: "37" is converted to the number 37 which is not NaN
    isNaN('37.37');   // false: "37.37" is converted to the number 37.37 which is not NaN
    isNaN("37,5");    // true
    isNaN('123ABC');  // true:  parseInt("123ABC") is 123 but Number("123ABC") is NaN
    isNaN('');        // false: the empty string is converted to 0 which is not NaN
    isNaN(' ');       // false: a string with spaces is converted to 0 which is not NaN

    // dates
    isNaN(new Date());                // false
    isNaN(new Date().toString());     // true

    // This is a false positive and the reason why isNaN is not entirely reliable
    isNaN('blabla');   // true: "blabla" is converted to a number. 
                    // Parsing this as a number fails and returns NaN
    ```
### parseFloat()
- The parseFloat() function parses an argument and returns a floating point number.
- Syntax
    ```js
    parseFloat(value)
    ```
- Examples
    ```js
    parseFloat(3.14);
    parseFloat('3.14');
    parseFloat('314e-2');
    parseFloat('0.0314E+2');
    parseFloat('3.14more non-digit characters');

    var foo = Object.create(null);
    foo.toString = function () { return "3.14"; };
    parseFloat(foo);

    var foo = Object.create(null);
    foo.valueOf = function () { return "3.14"; }; 
    parseFloat(foo);​​​​​

    parseFloat('FF2');
    ```
### parseInt()
- The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems).
- Syntax
    ```js
    parseInt(string, radix);
    ```
- Examples
    ```js
    // The following examples all return 15:
    parseInt('0xF', 16);
    parseInt('F', 16);
    parseInt('17', 8);
    parseInt(021, 8);
    parseInt('015', 10);   // parseInt(015, 10); will return 13
    parseInt(15.99, 10);
    parseInt('15,123', 10);
    parseInt('FXX123', 16);
    parseInt('1111', 2);
    parseInt('15 * 3', 10);
    parseInt('15e2', 10);
    parseInt('15px', 10);
    parseInt('12', 13);

    //The following examples all return NaN:
    parseInt('Hello', 8); // Not a number at all
    parseInt('546', 2);   // Digits are not valid for binary representations

    // The following examples all return -15
    parseInt('-F', 16);
    parseInt('-0F', 16);
    parseInt('-0XF', 16);
    parseInt(-15.1, 10);
    parseInt('-17', 8);
    parseInt('-15', 10);
    parseInt('-1111', 2);
    parseInt('-15e1', 10);
    parseInt('-12', 13);

    // The following examples all return 4
    parseInt(4.7, 10);
    parseInt(4.7 * 1e22, 10); // Very large number becomes 4
    parseInt(0.00000000000434, 10); // Very small number becomes 4

    // The following example returns 224:
    parseInt('0e0', 16);

    /* **Always specify a radix to avoid this unreliable behavior.** */
    parseInt('0e0'); // 0
    parseInt('08'); // 0, '8' is not an octal digit.
    ```

### decodeURI()
- The decodeURI() function decodes a Uniform Resource Identifier (URI) previously created by encodeURI() or by a similar routine.
- Syntax
    ```js
    decodeURI(encodedURI)
    ```
- Examples
    ```js
    // Decoding a Cyrillic URL
    decodeURI('https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B');
    // "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"

    // catching errors
    try { 
        var a = decodeURI('%E0%A4%A'); 
    } catch(e) { 
        console.error(e); 
    }

    // URIError: malformed URI sequence
    ```
### decodeURIComponent()
- The decodeURIComponent() function decodes a Uniform Resource Identifier (URI) component previously created by encodeURIComponent or by a similar routine.
- Syntax
    ```js
    decodeURIComponent(encodedURI)
    ```
- Examples
    ```js
    // Decoding a Cyrillic URL component
    decodeURIComponent('JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B');
    // "JavaScript_шеллы"

    // Catching errors
    try { 
        var a = decodeURIComponent('%E0%A4%A'); 
    } catch(e) { 
        console.error(e); 
    }

    // URIError: malformed URI sequence
    ```
### encodeURI()
- The encodeURI() function encodes a Uniform Resource Identifier (URI) by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).
- Syntax:
    ```js
    encodeURI(URI)
    ```
- EncodeURI escapes all characters except:
    ```
    A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #
    ```
- Examples:
    ```js
    // encodeURI differs from encodeURIComponent as follows:
    var set1 = ";,/?:@&=+$#";  // Reserved Characters
    var set2 = "-_.!~*'()";   // Unreserved Marks
    var set3 = "ABC abc 123"; // Alphanumeric Characters + Space

    console.log(encodeURI(set1)); // ;,/?:@&=+$#
    console.log(encodeURI(set2)); // -_.!~*'()
    console.log(encodeURI(set3)); // ABC%20abc%20123 (the space gets encoded as %20)

    console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24%23
    console.log(encodeURIComponent(set2)); // -_.!~*'()
    console.log(encodeURIComponent(set3)); // ABC%20abc%20123 (the space gets encoded as %20)

    // Note that a URIError will be thrown if one attempts to encode a surrogate which is not part of a high-low pair, e.g.,
    // high-low pair ok
    console.log(encodeURIComponent('\uD800\uDFFF'));

    // lone high surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURIComponent('\uD800'));

    // lone low surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURIComponent('\uDFFF'));
    // https://stackoverflow.com/questions/16868415/encodeuricomponent-throws-an-exception

    // Note that an URIError will be thrown if one attempts to encode a surrogate which is not part of a high-low pair, e.g.,
    // high-low pair ok
    console.log(encodeURI('\uD800\uDFFF'));

    // lone high surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURI('\uD800'));

    // lone low surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURI('\uDFFF'));
    ```
### encodeURIComponent()
- The encodeURIComponent() function encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).
- Syntax
    ```js
    encodeURIComponent(str);
    ```
- **encodeURIComponent escapes all characters except:**
    ```
    A-Z a-z 0-9 - _ . ! ~ * ' ( )
    ```
- Examples
    ```js
    // encodeURIComponent differs from encodeURI as follows:
    var set1 = ";,/?:@&=+$";  // Reserved Characters
    var set2 = "-_.!~*'()";   // Unescaped Characters
    var set3 = "#";           // Number Sign
    var set4 = "ABC abc 123"; // Alphanumeric Characters + Space

    console.log(encodeURI(set1)); // ;,/?:@&=+$
    console.log(encodeURI(set2)); // -_.!~*'()
    console.log(encodeURI(set3)); // #
    console.log(encodeURI(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

    console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
    console.log(encodeURIComponent(set2)); // -_.!~*'()
    console.log(encodeURIComponent(set3)); // %23
    console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

    // Note that a URIError will be thrown if one attempts to encode a surrogate which is not part of a high-low pair, e.g.,
    // high-low pair ok
    console.log(encodeURIComponent('\uD800\uDFFF'));

    // lone high surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURIComponent('\uD800'));

    // lone low surrogate throws "URIError: malformed URI sequence"
    console.log(encodeURIComponent('\uDFFF'));
    ```
### escape() **This deprecated API should no longer be used, but will probably still work.**
- Warning: Although escape() is not strictly deprecated (as in "removed from the Web standards"), it is defined in Annex B of the ECMA-262 standard, whose introduction states:
- Syntax
    ```js
    escape(str)
    ```

### unescape() **This deprecated API should no longer be used, but will probably still work.**
- Warning: Although unescape() is not strictly deprecated (as in "removed from the Web standards"), it is defined in Annex B of the ECMA-262 standard, whose introduction states:
- Syntax
    ```js
    unescape(str)
    ```

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