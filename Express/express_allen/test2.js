const express = require('express');

const app = express();

app.get(
  '/',
  function (req, res, next) {
    console.log('1');
    next();
  },
  function (req, res, next) {
    console.log('11');
    next();
  },
  function (req, res, next) {
    console.log('111');
    next();
  },
  function (req, res, next) {
    console.log('1111');
    next();
  }
);

app.get('/', function (req, res, next) {
  res.end('end');
});
app.listen(3000, function () {
  console.log('Server start 3000');
});
