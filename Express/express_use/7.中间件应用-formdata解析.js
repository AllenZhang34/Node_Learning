const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({
  dest: './uploads/'
});

app.use(upload.any());

app.post('/products', (req, res, next) => {
  console.log(req.body);
  res.end('Upload Products Success');
});

app.post('/upload', upload.single('file'), (req, res, next) => {
  res.end('Upload file success');
});

app.listen('8800', () => {
  console.log('Create success 8800');
});
