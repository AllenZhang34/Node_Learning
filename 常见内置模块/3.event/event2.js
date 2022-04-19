const EventEmitter = require('./myEvents');
const util = require('util');

function Girl() {}
util.inherits(Girl, EventEmitter);
let girl = new Girl();
const cry = (a, b) => {
  // {'女生失恋':[fn1,fn2]}
  console.log('哭', a, b);
};
girl.on('女生失恋', cry);
girl.on('女生失恋', (a, b) => {
  console.log('吃', a, b);
});

const fn = () => {
  console.log('逛街');
};
girl.once('女生失恋', fn);

setTimeout(() => {
  //girl.off('女生失恋', fn);
  girl.emit('女生失恋', 'a', 'b');
  girl.off('女生失恋', cry);
  girl.emit('女生失恋', 'a', 'b');
}, 1000);

//原型链继承方式
//1.Girl.prototype.__proto__ = EventEmitter.prototype
//2.Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype)
//3.Girl.prototype = Object.create(EventEmitter.prototype)

/* function create(proto) {
  function Fn() {}
  Fn.prototype = proto;
  return new Fn(); //它上面有所有EventEmitter.prototype方法
}
 */
