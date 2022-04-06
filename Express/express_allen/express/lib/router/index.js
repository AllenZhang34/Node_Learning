const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router() {
  this.stack = [];
}
Router.prototype.route = function (pathname) {
  //需要先产生route才能创建layer
  const route = new Route();
  const layer = new Layer(pathname, route.dispatch.bind(route));
  layer.route = route; //标识每一个路由都配备了一个route实例
  this.stack.push(layer);
  return route;
};

methods.concat('all').forEach((method) => {
  Router.prototype[method] = function (pathname, handlers) {
    let route = this.route(pathname);
    route[method](handlers);
  };
});

Router.prototype.use = function (path, ...handlers) {
  /* 
  if (typeof path === 'string') {
    handlers.forEach((handler) => {
      let layer = new Layer(path, handler);
    });
  } //如果是字符串说明传递了path
   */
  if (typeof path === 'function') {
    handlers.unshift(path);
    path = './';
  }
  handlers.forEach((handler) => {
    let layer = new Layer(path, handler);
    layer.route = undefined; //中间件上不存在route属性，可以根据这个属性来判断是不是路由
    this.stack.push(layer);
  });
};

Router.prototype.handle = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  //请求到来后，我们需要去stack中进行筛查
  let idx = 0;
  const next = (err) => {
    //里层调用next出错就会走到外层next
    if (idx >= this.stack.length) return out(req, res);
    let layer = this.stack[idx++];
    if (err) {
      //处理err 一直向下找的错误处理中间件
      if (!layer.route) {
        layer.handleError(err, req, res, next);
      } else {
        next(err); //不是中间件就直接跳过
      }
    } else {
      //路由的逻辑要匹配方法和路径，但中间件要求匹配路径就可以
      if (layer.match(pathname)) {
        if (layer.route) {
          if (layer.route.methods[req.method.toLowerCase()]) {
            layer.handleRequest(req, res, next);
          } else {
            next();
          }
        } else {
          //中间件
          if (layer.handler.length === 4) return next();
          layer.handleRequest(req, res, next);
        }
      } else {
        next();
      }

      /* 
      if (layer.match(pathname) && layer.route.methods[req.method.toLowerCase()]) {
        //layer.handler 就是route.dispatch.bind(route)
        //路径匹配到了，匹配到了交给route来处理，如果route处理完后，可以调用next,从上一个layer到下一个
        layer.handleRequest(req, res, next);
      } else {
        next();
      }
       */
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
