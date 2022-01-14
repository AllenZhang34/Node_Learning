const path = require('path');

const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage
});

app.use(upload.any());

app.post('/products', (req, res, next) => {
  console.log(req.body);
  res.end('Upload Products Success');
});

app.post('/upload', upload.single('file'), (req, res, next) => {
  console.log(req.files);
  res.end('Upload file success');
});

app.listen('8800', () => {
  console.log('Create success 8800');
});
