const express = require('express');
const app = express();

//自己编写的json解析

app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    req.on('data', (data) => {
      const info = JSON.parse(data.toString());
      req.body = info;
    });

    req.on('end',()=>{
      
    })
  }
});

//app.use(express.json());

// extended
// true: 那么对urlencoded进行解析时, 它使用的是第三方库: qs
// false: 那么对urlencoded进行解析时, 它使用的是Node内置模块: querystring

app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('login success');
});
app.listen(8000, () => {
  console.log('form-data解析服务器启动成功~');
});
