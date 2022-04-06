const http = require('http');
const url = require('url');
const Router = require('./router');
const methods = require('methods');
function Application() {
  this.router = new Router();
}

methods.concat('all').forEach((method) => {
  Application.prototype[method] = function (path, ...handles) {
    this.router[method](path, handles);
  };
});
//中间件作用 (1)可以确定是否向下执行 （2）扩展属性和方法 （3）做权限处理，提出公共逻辑
Application.prototype.use = function () {
  this.router.use(...arguments);
};
Application.prototype.listen = function () {
  function done(req, res) {
    res.end(`Cannot ${req.method} ${req.url}`);
  }
  const server = http.createServer((req, res) => {
    this.router.handle(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;

//new Application 注册路由 创建服务
//new Router() 注册路由配置 请求时匹配路由
