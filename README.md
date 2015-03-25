# something about es6

## 2015年6月，ECMAScript 6预计将发布正式版本。

## ES6 支持情况表
[请戳这里](http://kangax.github.io/compat-table/es6/)

## ES6 -> ES5 转码工具
[Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started)
[Babel](https://babeljs.io/)

## let
1. 增加了块级作用域, 简单理解就是在一个 {} 范围内
2. 不能在同一区块重复声明
3. 不能在声明前调用（没有自动提升）,如果出现这种情况的错误，叫做 TDZ(temporal dead zone)

## const
与let的三点一样，但重复声明不会报错，会默默地失败
const是指向变量的地址，所以如果变量是一个object，可以后来添加修改属性，完全冻结要用
Object.freeze({})

## 全局变量
ES5规定，所有全局变量都是全局对象的属性。
ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；
let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。

## 变量解构赋值 Destructuring
var [a, b, c] = [1, 2, 3];
a // 1
b // 2
c // 3

对象解构必须变量名和属性名一样
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

可以指定默认值
var { x = 3 } = {};
x // 3

var {x, y = 5} = {x: 1};
console.log(x, y) // 1, 5

对象解构可以与函数参数的默认值一起使用。
function move({x=0, y=0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

便捷用法
let { log, sin, cos } = Math;

交换变量的值
[x, y] = [y, x];

函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};

遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}

输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
