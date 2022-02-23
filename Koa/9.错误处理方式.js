const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  const isLogin = false;
  if (!isLogin) {
    ctx.app.emit('error', new Error('You are not login'), ctx);
  }
});

app.on('error', (err, ctx) => {
  ctx.status = 401;
  ctx.body = err.message;
});

app.listen(8800, () => {
  console.log('Koa server success');
});
