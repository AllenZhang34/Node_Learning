const http = require('http');
const url = require('url');
const qs = require('querystring');

/* 
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  res.end("Hello Server");
});

server.listen(8888, '0.0.0.0', () => {
  console.log('create success');
});

 */

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  if (pathname === '/login') {
    console.log(query);
    console.log(qs.parse(query));
    const { username, password } = qs.parse(query);
    console.log(username, password);
    res.end('请求结果');
  }
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功~');
});
