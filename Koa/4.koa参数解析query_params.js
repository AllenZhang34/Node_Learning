const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const userRouter = new Router({
  prefix: '/users'
});

userRouter.get('/:id', (ctx, next) => {
  console.log('fasfgasfas');
  console.log(ctx.request.params);
  console.log(ctx.request.query);
});

app.use((ctx, next) => {
  //console.log(ctx.request.url);
  console.log(ctx.request.query);
  //console.log(ctx.request.params);
  ctx.response.body = 'Hello World';
  next()
});

app.use(userRouter.routes());

app.listen(8800, () => {
  console.log('参数处理服务器启动成功~');
});
