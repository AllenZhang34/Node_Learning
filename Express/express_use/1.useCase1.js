const express = require('express');

const app = express();

//请求的路径中如果有一些参数
//  /users/:userId；
// 在request对象中药获取可以通过req.params.userId;
app.get('/users/:userId', (req, res, next) => {
  console.log(req.params.userId);
  res.end('Get Express');
});

app.post('/', (req, res, next) => {
  res.end('Post Express');
});

app.listen(8000, () => {
  console.log('Create express success');
});
