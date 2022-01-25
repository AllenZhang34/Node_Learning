const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
//const multer = require('koa-multer');
const Router = require('koa-router');

const app = new Koa();
//const upload = multer();

//解析json
//解析x-www-form-urlencoded
app.use(bodyParser());
//app.use(upload.any());

app.use((ctx, next) => {
  console.log(ctx.request.body);
  //console.log(ctx.req.body);
  ctx.response.body = 'Hello World';
});

app.listen(8800, () => {
  console.log('koa初体验服务器启动成功~');
});
