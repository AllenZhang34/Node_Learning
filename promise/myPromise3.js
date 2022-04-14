//promise all 所有都成功才成功，有一个失败就失败了
//promsie race 有一个成功或者失败就采用他的结果，超时处理
//promise race 其中有一个完成了，其他的还会执行，并没有采用其他的结果

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let p = promises[i];
      if (p && typeof p.then === 'function') {
        p.then(resolve, reject);
      } else {
        resolve(p);
      }
    }
  });
};

//超时处理

//promise finally 无论如何都会执行，但是可以继续向下执行
Promise.prototype.finally = function (cb) {
  return this.then(
    (data) => {
      //如何能保证promise 执行完毕
      return Promise.resolve(cb()).then(() => data);
    },
    (err) => {
      //Promise.resolve 目的是等待cb()后的promise完成
      return Promise.resolve(cb()).then(() => {
        throw err;
      });
    }
  );
};

//promisify 主要是将一个异步的方法转化成promise的形式，node 使用
function promisify(readFile) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      readFile(...args, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  };
}
const fs = require('fs');
let readFile = promisify(fs.readFile);
readFile('./1.txt', 'utf8').then((data) => {
  console.log(data);
});

function promisifyAll(obj) {
  let o = {};
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      o[key + 'Promise'] = promisify(obj[key]);
    }
  }
  return o;
}
