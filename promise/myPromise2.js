/**
 * promise当调用then方法后返回一个全新的promise
 * 1.then中方法返回的是一个普通值，会作为外层下一次then的成功结果
 * 2.then中方法执行出错，会走到外层下一次then的失败结果
 * 3.如果then中的方法返回的是一个promise对象，此时会根据promise的结果来处理走成功还是走失败（传人的是成功或者失败的内容）
 * 无论上一次then 走的是成功还是失败，只要返回的是普通值，都会执行下一次then的成功
 */
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

//利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
  //核心流程
  if (promise2 === x) {
    return reject(new TypeError('error'));
  }
  //考虑不是自己写的promise的情况
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //别人的promise可能调用成功后，还能调用失败。确保别人的promise符合规范
    let called = false;
    //有可能then 方法是通过defineProperty来实现的，取值的时候可能会发生异常
    try {
      let then = x.then;
      if (typeof then === 'function') {
        //这里就认为是promise
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            //直到解析他不是promise的位置
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x); //常量
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    //返回的是一个普通值。直接将它放在promise2.resolve中
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING; //promise 默认状态
    this.value = undefined; //成功的原因
    this.reason = undefined; //失败的原因
    this.onResolvedCallbacks = []; //存放成功的回调方法
    this.onRejectedCallbacks = []; //存放失败的回调方法

    //成功resolve函数
    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;

        //异步调用
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    //失败reject函数
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        //异步调用
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  //then中的参数是可选的
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
    //用于实现链式调用
    let promise2 = new Promise((resolve, reject) => {
      //成功调用的方法
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            //此x可能是一个promise,如果是promise需要看这个promise是成功还是失败（.then）
            //如果成功则把成功的结果 调用promise2的resolve传递进去，如果失败则同理

            //总结 x的值 决定是调用promise2 的resolve还是reject,如果是promise则取他的状态，如果是普通值则直接调用resolve
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      //失败调用的方法
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 代码是异步调用resolve或者reject的
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          //AOP
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
