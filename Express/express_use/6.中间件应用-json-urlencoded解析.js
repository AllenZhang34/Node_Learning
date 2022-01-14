const express = require('express');

const app = express();

/* 
//自己编写解析json
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    req.on('data', (data) => {
      const info = JSON.parse(data.toString());
      req.body = info;
    });

    req.on('end', () => {
      next();
    });
  } else {
    next();
  }
});

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('Welcome Back~');
});

app.post('/products', (req, res, next) => {
  console.log(req.body);
  res.end('Upload Products success');
});

app.listen('8800', () => {
  console.log('Create Success 8800');
});

 */

//使用express 提供给我们body解析
//body-parser: express3.x 内置express框架
//body-parser: express4.x 被分离出去
//body-parser类似功能：express 4.16.x内置成函数

app.use(express.json());

//extend
//true 对urlencoded进行解析时，使用的是第三方库 qs
//false 对urlencoded进行解析时，使用的是node内置模块 querysting
app.use(
  express.urlencoded({
    extended: true
  })
);

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('Welcome Back~');
});

app.post('/products', (req, res, next) => {
  console.log(req.body);
  res.end('Upload Products success');
});

app.listen('8800', () => {
  console.log('Create Success 8800');
});
