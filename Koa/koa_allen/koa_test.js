const Koa = require('./koa');

const app = new Koa();

app.use((req, res) => {
  res.end('Hello Allen');
});

app.listen(8800, () => {
  console.log('server create success');
});
