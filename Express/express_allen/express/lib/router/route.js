const Layer = require('./layer');
function Route() {
  this.stack = [];
}
Route.prototype.dispatch = function () {};
Route.prototype.get = function (handlers) {
  handlers.forEach((handler) => {
    let layer = new Layer(_, handle);
    layer.method = 'get';
    this.stack.push(layer);//里层的route存放的是用户的真实回调，并且每个layer上有标记对应的方法
  });
};
module.exports = Route;

//外层的stack 存的是 路径对应的dispatch方法
//里层的stack 存的是 用户的回调