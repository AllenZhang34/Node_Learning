//global上有属性直接访问的叫全局属性
//require exports module __dirname __filename 也可以直接访问，他们不在global上
//
// 模块化规范 ~  commonjs规范 amd cmd esm模块 umd systemjs
// 为什么要有模块化
// 为了解决命名冲突问题 ( “单例模式” 不能完全解决这些问题)
// 用文件拆分的方式 配合 iife 子执行函数来解决
// 前端里会有 请求的问题 依赖问题 （amd cmd）

// umd 兼容amd 和 cmd  + commonjs 不支持es6模块

// commonjs规范  (基于文件读写的  如果依赖了某个文件我会进行文件读取) 动态的
// 一个文件就是一个模块
// 我想使用这个模块我就require
// 我想把模块给别人用 module.exports导出

// esModule规范 （每次你引用一个模块，发请求） 静态的  靠webpack编译   vite 就是靠发请求对请求来劫持 进行转义实现的
// es6 -> 一个文件一个模块
// 别人要用我 我就需要 export
// 我要用别人我就import

// es6Module / umd模块  webpack tree-shaking

/**
 * ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
 * CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
 */

/* 
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
 */

/**
 * 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），
 * 然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”
 */

//ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

// ES6模块
// import { stat, exists, readFile } from 'fs';

/**
 * 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载,
 * 即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象
 */

/**
 * 由于 ES6 模块是编译时加载，使得静态分析成为可能。
 * 有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。
 */

/**
 * 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
 */

//在export命令后面，使用大括号指定所要输出的一组变量

/* 
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
 */

//export命令除了输出变量，还可以输出函数或类（class）。
/* 
export function multiply(x, y) {
  return x * y;
}
 */

//export输出的变量就是本来的名字，但是可以使用as关键字重命名。

/* 
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
 */

//export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
/* 
// 报错
export 1;

// 报错
var m = 1;
export m;
 */

//function和class的输出，也必须遵守这样的写法。

/* 
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
 */

/**
 * export命令可以出现在模块的任何位置，只要处于模块顶层就可以。
 * 如果处于块级作用域内，就会报错，下一节的import命令也是如此。
 * 这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷
 */

/* 
function foo() {
  export default 'bar' // SyntaxError
}
foo()
 */

/**
 * import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。
 * 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
 */

//import { lastName as surname } from './profile.js';

//import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

/*
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
*/

/**
 * 上面代码中，脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口。但是，如果a是一个对象，改写a的属性是允许的。
 */

/* 
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
 */

//import命令具有提升效果，会提升到整个模块的头部，首先执行。
/* 
foo();

import { foo } from 'my_module';
 */

//import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

/* 
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
 */

//除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
/* 
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14))
 */

//注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的

/* 
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
 */

//export default命令，为模块指定默认输出。

/* 
// export-default.js
export default function () {
  console.log('foo');
}
 */

/* 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。

其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。 */

/* 
// import-default.js
import customName from './export-default';
customName(); // 'foo'
 */

//上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。

//export default命令用在非匿名函数前，也是可以的, foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。

/* 
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
 */

//=====================================================
/* 
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入

 */

/* 
上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。

export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

 */

/* 
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
 */

//export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句
/* 
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
 */

//因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。

/* 
// 正确
export default 42;

// 报错
export 42;
 */

//上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。

//有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。

/* 
import _, { each, forEach } from 'lodash';

export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
 */

//上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，即forEach和each指向同一个方法。

//export default也可以用来输出类。
/* 
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
 */

//=======================================
//export 与 import 的复合写法

/* 
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
 */

/* 
上面代码中，export和import语句可以结合在一起，写成一行。
但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar
*/

//模块的接口改名和整体输出，也可以采用这种写法。

/* 
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
 */

//默认接口的写法如下。
//export { default } from 'foo';

//===========================================
//模块的继承
// https://github.com/ruanyf/es6tutorial/blob/gh-pages/docs/module.md#%E6%A8%A1%E5%9D%97%E7%9A%84%E7%BB%A7%E6%89%BF

//=============================================

//要使用的常量非常多，可以建一个专门的constants目录，将各种常量写在不同的文件里面，保存在该目录下

/* 
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// constants/index.js
export {db} from './db';
export {users} from './users';

// script.js
import {db, users} from './constants/index';

 */

/**
 * CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。
 */

/* 
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
 */

//上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。

/**
 * 以后需要用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。
 * 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存
 */

/**
 * ES6 处理“循环加载”与 CommonJS 有本质的不同。
 * ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。
 */
