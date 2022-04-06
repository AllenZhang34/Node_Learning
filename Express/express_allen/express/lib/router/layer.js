const pathToRegExp = require('path-to-regexp')

function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}

Layer.prototype.match = function (pathname) {
  //return this.path === pathname;
  if (this.path === pathname) {
    return true;
  }
  if (!this.route) {
    //中间件
    if (this.path === '/') return true; //表示匹配所有
    return pathname.startwith(this.path + '/'); //要求必须以路径开头
  }
  return;
};
Layer.prototype.handleRequest = function (req, res, next) {
  this.handler(req, res, next);
};
Layer.prototype.handleError = function (err, req, res, next) {
  if (this.handler.length === 4) {
    this.handler(err, req, res, next);
  } else {
    next(err);
  }
};
module.exports = Layer;
