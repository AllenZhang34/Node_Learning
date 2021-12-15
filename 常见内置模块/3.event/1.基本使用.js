const EventEmitter = require('events');

// 1.创建发射器
const emitter = new EventEmitter();

// 2.监听某一个事件
// addListener是on的alias简写
emitter.on('click', (args) => {
  console.log('监听1到click事件', args);
});

const listener2 = (args) => {
  console.log('监听2到click事件', args);
};
emitter.on('click', listener2);


emitter.once('click', (args) => {
  console.log('监听once到click事件', args);
});

// 3.发出一个事件
setTimeout(() => {
  emitter.emit('click', 'test1');
  emitter.off('click', listener2);
  emitter.emit('click', 'test2');
}, 2000);

// 4.获取注册的事件
console.log(emitter.eventNames());
console.log(emitter.listenerCount('click'));
console.log(emitter.listeners('click'));

// 将本次监听放到最前面
emitter.prependListener('click', (arg1, arg2, arg3) => {
  console.log('监听3到click事件', arg1, arg2, arg3);
});
