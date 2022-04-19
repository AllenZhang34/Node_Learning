function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {};
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
};

EventEmitter.prototype.emit = function (eventName, ...args) {
  this._events[eventName].forEach((fn) => {
    fn(...args);
  });
};

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events && this._events[eventName]) {
    //如果传入的方法和存储的一样就删除掉
    this._events[eventName] = this._events[eventName].filter((fn) => fn !== callback && fn.l !== callback);
  }
};

EventEmitter.prototype.once = function (eventName, callback) {
  const one = () => {
    //绑定执行完毕后移出
    callback(); //切片编程 增加逻辑
    this.off(eventName, one);
  };
  one.l = callback; //off的时候使用
  this.on(eventName, one);
};

module.exports = EventEmitter;
