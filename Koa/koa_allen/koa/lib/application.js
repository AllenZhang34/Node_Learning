const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
class Application {
  constructor() {
    //每个应用都扩展了一个全新的context request response，实现了应用的隔离
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  createContext(res, req) {
    //每次请求到来应该根据当前应用的上下文创建一个全新的上下文
    let ctx = Object.create(this.context);
    let request = Object.create(this.request);
    let response = Object.create(this.response);

    ctx.request = request; //这个是koa中封装的属性
    ctx.request.req = ctx.req = req; //这个是将原生的req放到了封装的request上
    return ctx;
  }
  use(middleware) {
    this.fn = middleware;
  }

  handleRequest = (res, req) => {
    let ctx = this.createContext(res, req);
    this.fn(ctx);
  };
  listen() {
    const server = http.createServer(this.handleRequest);
    server.listen(...arguments);
  }
}

module.exports = Application;
