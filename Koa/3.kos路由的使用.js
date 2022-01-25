const Koa = require('koa');
const userRouter = require('./router/user');

const app = new Koa();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8800, () => {
  console.log('koa路由服务器启动成功~');
});
