const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
function Router() {
  this.stack = [
    /* {
      method: 'all',
      pathname: '*',
      handler(req, res) {
        res.end(`Cannot ${req.method} ${req.url}`);
      }
    } */
  ];
}
Router.prototype.get = function (pathname, handlers) {
  /* this.stack.push({
    method: 'get',
    pathname,
    handler
  }); */
  const route = new Route();
  const layer = new Layer(pathname, route.dispatch.bind(route));
  layer.route = route; //标识每一个路由都配备了一个route实例
  this.stack.push(layer);
  route.get(handlers);
};

Router.prototype.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  let method = req.method.toLowerCase();
  /* for (let i = 0; i < this.stack.length; i++) {
    let { method: routeMethod, pathname: routePath, handler } = this.stack[i];
    if (method === routeMethod && pathname === routePath) {
      return handler(req, res);
    }
  }
  done(); */
  //this.stack[0].handler(req, res);

  let idx = 0;
  const next = () => {
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++];
    if (layer.path === pathname) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};
module.exports = Router;

//创建应用会有一个路由系统（存放的是一层一层的），每一层存放的是路径和方法，
//路由系统中的每一层我们都提供一个Route实例，layer.route = new Route
//Route是一个类，每一个路由都有这个实例，实例中会创造一个stack，用来存放用户注册的回调
//每一个layer需要存放方法
//外层的stack需要匹配路径，里层的stack需要匹配方法
