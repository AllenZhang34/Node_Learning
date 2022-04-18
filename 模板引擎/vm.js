// 字符串如何能变成js来执行？
// eval 会受执行环境影响 
// new Function “模板引擎的实现原理”  可以获取全局变量，还是会有污染的清空
// node中自己实现了一个模块 vm  不受影响 （沙箱环境）  快照（执行前记录信息，执行后还原信息）  proxy来实现



// new Function('b','console.log(a,b)')('b');
const vm  =require('vm');
vm.runInThisContext(`console.log(a)`); // 在node中全局变量是在多个模块下共享的, 所以不要通过global来定义属性


// 们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量


// 全局 1个上下文 global.xxx
    // function (exports,module,require,__direname,filename){ var a = 100}
    // runInThisContext 和 new Function 对不 不需要产生函数
// runInNewContext