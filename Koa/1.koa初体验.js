const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  ctx.response.body = 'Hello koa';
});

app.listen(8800, () => {
  console.log('success create koa');
});
