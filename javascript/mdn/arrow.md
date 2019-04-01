let assert = require('assert');

let empty = () => {};
 
// Single parameter case needs no parentheses around parameter list
let identity = x => x;
 
// No need for parentheses even for lower-precedence expression body
let square = x => x * x;
 
// Parenthesize the body to return an object literal expression
let key_maker = val => ({key: val});
 
// Statement body needs braces, must use 'return' explicitly if not void
let evens = [1,2,3,4];
let odds = evens.map(v => v + 1);
 
let fives = [];
let nats = [1,5,13,20,30];
nats.forEach(v => { if (v % 5 === 0) fives.push(v); });
 
// ''=>'' has only lexical ''this'', no dynamic ''this''
const obj = {
  method: function () {
    return () => this;
  }
};
assert(obj.method()() === obj);
 
let fake = {steal: obj.method()};
assert(fake.steal() === obj);
 
// But ''function'' still has dynamic ''this'' of course
let real = {borrow: obj.method};
assert(real.borrow()() === real);
