//扩展方法会使用到高阶函数

Function.prototype.before = function (cb) {
  return (...args) => {
    cb();
    this(...args);
  };
};

//核心代码
function core(...args) {
  console.log('core', ...args);
}

//给core函数增加一些核心逻辑，但不能修改核心代码
let newCore = core.before(() => {
  console.log('before');
});

newCore('a', 'b');

//1.如果想给函数扩展，可以使用高阶函数
