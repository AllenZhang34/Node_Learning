//nextTick node中自己实现的，不属于node中的eventloop 优先级比promise高

Promise.resolve().then(() => {
  console.log('promise');
});

//nextTick在当前执行栈的底部
process.nextTick(() => {
  console.log('nextTick');
});

//事件环需要了解的部分
//timers(本阶段执行已经被setTimeout()和setInterval()的调度回调函数)
//pending callbacks(执行延迟到下一个循环迭代的I/O回调)
//idle,prepare(仅供系统内部使用)
//poll(检索新的I/O事件，执行与I/O相关的回调)
//check(setImmediate()回调函数在这执行)
//close callbacks(一些关闭的回调函数)

//setImmediate对比setTimeout
//setImmediate()设计为一旦在当前 轮询 阶段完成，就执行脚本
//setTimeout()在最小阈值（ms单位）过后运行脚本

//执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时器将受
//进程性能的约束
//例如运行以下不在I/O周期（即主模块）内的脚本，则两个计时器的顺序是非确定性的，受进程性能的约束

setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
}, 0);

//poll阶段：
//1.检测poll队列中是否为空，如果不为空则执行队列中的任务，直到超时或者全部执行完毕
//2.执行完毕后检测setImmediate队列是否为空，如果不为空则执行check阶段，如果为空则等待时间到达，时间到达后回到timmer阶段
//3.等待时间到达可能会出现新的callback，此时也在当前阶段清空

//浏览器的特点是 先执行执行栈中的代码，清空后会执行微任务，取出一个宏任务来执行，不停的循环
//node先执行当前执行栈中的代码，执行完毕后，会进入到事件环中，拿出来一个执行，每执行完毕后会清空微任务（nextTick,promise.then）

//global上有属性直接访问的叫全局属性
//require exports module __dirname __filename 也可以直接访问，他们不在global上
//