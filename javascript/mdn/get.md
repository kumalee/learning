# Get Syntax

The get syntax binds an object property to a function that will be called when that property is looked up.


## Syntax

```
{get prop() { ... } }
{get [expression]() { ... } }
```

## Parameters

**prop**
The name of the property to bind to the given function.

**expression**
Starting with ECMAScript 6, you can also use expressions for a computed property name to bind to the given function.

### Note the following when working with the get syntax:

* It can have an identifier which is either a number or a string;
* It must have exactly zero parameters (see Incompatible ES5 change: literal getter and setter functions must now have exactly zero or one arguments for more information);
* It must not appear in an object literal with another get or with a data entry for the same property ({ get x() { }, get x() { } } and { x: ..., get x() { } } are forbidden).

### A getter can be removed using the delete operator.

```
var log = ['test'];
var obj = {
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  }
}
console.log (obj.latest); // Will return "test".

delete obj.latest;

//Defining a getter on existing objects using defineProperty

var o = { a:0 }

Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });

console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)

//ES6 Using a computed property name

var expr = "foo";

var obj = {
  get [expr]() { return "bar"; }
};

console.log(obj.foo); // "bar"
```

Smart / self-overwriting / lazy getters

Getters give you a way to define a property of an object, but they do not calculate the property's value until it is accessed. A getter defers the cost of calculating the value until the value is needed, and if it is never needed, you never pay the cost.

An additional optimization technique to lazify or delay the calculation of a property value and cache it for later access are smart or memoized getters. The value is calculated the first time the getter is called, and is then cached so subsequent accesses return the cached value without recalculating it. The is useful in the following situations:

If the calculation of a property value is expensive (takes much RAM or CPU time, spawns worker thread, retrieves remote file, etc).
If the value isn't needed just now. It will be used later, or in some case it's not used at all.
If it's used, it will be accessed several times, and there is no need to re-calculate that value will never be changed, or shouldn't be re-calculated.
This means that you shouldn't use a lazy getter for a property whose value you expect to change, because the getter will not recalculate the value.

In the following example, the object has a getter as it's own property. On getting the property, the property removed from the object and re-added, but implicitly as a data property this time. Finally the value gets returned.

```
get notifier() {
  delete this.notifier;
  return this.notifier = document.getElementById("bookmarked-notification-anchor");
},
```
