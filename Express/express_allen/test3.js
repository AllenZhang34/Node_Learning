const express = require('./express');

const app = express();

app.use('/', function (req, res, next) {
  console.log(1);
  next('123');
  console.log(2);
});

app.use('/', function (req, res, next) {
  console.log(3);
  next();
  console.log(4);
});

app.get('/', function (req, res, next) {
  res.end('ok');
});

app.use('/', function (error, req, res, next) {
  res.end(error);
});
app.get('/user', function (req, res, next) {
  res.end('user');
});

app.listen(3000, function () {
  console.log('Server start 3000');
});
