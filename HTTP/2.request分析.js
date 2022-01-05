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

//==================================================
//处理url
/* 
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  console.log(url.parse(req.url));
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

 */

//==================================================
//处理method
//获取这种body携带的数据，我们需要通过监听req的data事件来获取

/* 
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  if (pathname === '/login') {
    if (req.method === 'POST') {
      req.setEncoding('utf-8');
      req.on('data', (data) => {
        const { username, password } = JSON.parse(data);
        console.log(username, password);
      });
      res.end('Hello World');
    }
  }
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功~');
});
*/

//==================================================
//header

/*
content-type是这次请求携带的数据的类型
  papplication/json 表示是一个json类
  ptext/plain 表示是文本类型
  papplication/xml 表示是xml类型
  pmultipart/form-data 表示是上传文件

content-length：文件的大小和长度

keep-alive：
  http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断；
  在http1.0中，如果想要继续保持连接：
  浏览器需要在请求头中添加connection: keep-alive；
  服务器需要在响应头中添加connection:keey-alive；
  当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；
  在http1.1中，所有连接默认是connection: keep-alive的；
  不同的Web服务器会有不同的保持keep-alive的时间；
  Node中默认是5s中；

accept-encoding：告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应.gz文件；
accept：告知服务器，客户端可接受文件的格式类型；
user-agent：客户端相关的信息；

*/

/* 
const server = http.createServer((req, res) => {
  console.log(req.headers);

  req.on('data', (data) => {
    
  })

  res.end("Hello Server");
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log("服务器启动成功~");
});
 */

