const EventEmitter = require('events'); //发布订阅： 能解决什么问题？  异步， 解决代码耦合的问题 （组件通信）
const util = require('util');

function Girl() {}

util.inherits(Girl, EventEmitter);

let girl = new Girl();

// 批处理 例如多次修改数据只更新一次页面

let flag = false;

girl.on('newListener', (type) => {
  if (!flag) {
    process.nextTick(() => {
      girl.emit(type); // ?
    });
    flag = true;
  }
});

// 1.绑定事件触发newListener 但是立刻 emit了 ， 喝酒这件事还没放到队列中
girl.on('失恋了', () => {
  console.log('喝酒');
});

// 2.绑定事件触发newListener, 触发emit, 只有喝酒这在队列中
girl.on('失恋了', () => {
  console.log('抽烟');
});

// 3.绑定事件触发newListener, 触发emit, 只有喝酒、逛街这在队列中
girl.on('失恋了', () => {
  console.log('烫头');
});

/* girl.once('失恋了', () => {
  console.log('哭');
});
 */
//girl.emit('失恋了');
//girl.emit('失恋了');

// 让类继承原型方法
// ES6 直接extends 就可以了
// Girl.prototype.__proto__  = EventEmitter.prototype
// Girl.prototype =  object.create()
// Object.setProrotypeof()
