function curring(fn) {
  //存储每次调用时候的变量
  const inner = (arg = []) => {
    //存储每次调用时候的参数
    return arg.length >= fn.length
      ? fn(...arg)
      : (...userArgs) => {
          return inner([...arg, ...userArgs]);
        };
  };
  return inner();
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

let sum1 = curring(sum);

let sum2 = sum1(1);
let sum3 = sum2(2, 3);
let result = sum3(4);

console.log(result);

//变量类型问题
function isType(typing, val) {
  return Object.prototype.toString.call(val) == `[object ${typing}]`;
}

let util = {};
['String', 'Number', 'Boolean', 'Null', 'Undefined'].forEach((type) => {
  util['is' + type] = curring(isType)(type);
});

console.log(util.isString('123'));
