const http = require('http');
const url = require('url');
const Router = require('./router');
function Application() {
  //应用和路由也是耦合在一起的
  /* 
    this.router = [
    {
      method: 'all',
      pathname: '*',
      handler(req, res) {
        res.end(`Cannot ${req.method} ${req.url}`);
      }
    }
  ];
   */

  this.router = new Router(); //创建一个路由系统
}

Application.prototype.get = function (pathname, ...handlers) {
  /* this.router.push({
    method: 'get',
    pathname,
    handler
  }); */
  this.router.get(pathname, handler);
};

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    //这里可以稍做优化，当路由系统处理不了，应用返回一个无法找到
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    /*     let { pathname } = url.parse(req.url);
    let method = req.method.toLowerCase();
    for (let i = 1; i < this.router.length; i++) {
      let { method: routeMethod, pathname: routePath, handler } = this.router[i];
      if (method === routeMethod && pathname === routePath) {
        return handler(req, res);
      }
    }
    this.router[0].handler(req, res); */
    this.router.handle(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
