const express = require('./express');

const app = express();

app.get('/hello', function (req, res) {
  res.end('hello1');
});

app.get('/hello', function (req, res) {
  res.end('hello2');
});

app.get('/world', function (req, res) {
  res.end('world');
});

/* 
app.all('*', function (req, res) {
  res.end('*');
});
 */

app.listen(3000, function () {
  console.log('Start:3000');
});
