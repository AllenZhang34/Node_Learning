const express = require('express');

const app = express();

app.get('/school/:name/:num', function (req, res, next) {
  log(req.params);
  res.end('ok');
});

app.listen(3000, function () {
  console.log('Server start 3000');
});
