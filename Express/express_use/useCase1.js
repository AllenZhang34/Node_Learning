const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.end('Get Express');
});

app.post('/', (req, res, next) => {
  res.end('Post Express');
});

app.listen(8000, () => {
  console.log('Create express success');
});
