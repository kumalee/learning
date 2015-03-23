# something about es6

## 2015年6月，ECMAScript 6预计将发布正式版本。

## ES6 支持情况表
![请戳这里](http://kangax.github.io/compat-table/es6/)

## ES6 -> ES5 转码工具
![Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started)
![Babel](https://babeljs.io/)

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
