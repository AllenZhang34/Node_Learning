const Layer = require('./layer');
const methods = require('methods');
function Route() {
  this.stack = [];
  this.methods = {};
}

methods.concat('all').forEach((method) => {
  Route.prototype[method] = function (handlers) {
    this.methods[method] = true;
    handlers.forEach((handler) => {
      let layer = new Layer('_', handler);
      layer.method = method;
      this.stack.push(layer); //里层的route存放的是用户的真实回调，并且每个layer上有标记对应的方法
    });
  };
});

//稍后调用dispatch方法会去stack中迭代用户的回调来执行
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0;

  let next = (err) => {
    if (err) return out(err);
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase() || layer.method === 'all') {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Route;

//外层的stack 存的是 路径对应的dispatch方法
//里层的stack 存的是 用户的回调
