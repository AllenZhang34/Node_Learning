const http = require('http');

//响应结果
//write方法：这种方式是直接写出数据，但是并没有关闭流；
//end方法：这种方式是写出最后的数据，并且写出后会关闭流；

/* 
const server = http.createServer((req, res) => {
  // 响应结果
  res.write('响应结果一');
  res.write('响应结果二');
  res.end('Hello World');
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功~');
});
 */

//================================
//响应码
/* 
const server = http.createServer((req, res) => {
  // 设置状态码
  // 方式一: 直接给属性赋值
  res.statusCode = 400;
  // 方式二: 和Head一起设置
  //res.writeHead(503)

  // 响应结果
  res.write('响应结果一');
  res.end('Hello World');
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功~');
});
 */

//================================
//响应头文件

const server = http.createServer((req, res) => {
  // 设置响应的header
  // 设置方式一:
  //res.setHeader：一次写入一个头部信息
  //res.setHeader('Content-Type', 'text/plain;charset=utf8');
  
  //设置方式二:
  //res.writeHead：同时写入header和status；
  //Header设置Content-Type有什么作用呢？
  //默认客户端接收到的是字符串，客户端会按照自己默认的方式进行处理
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf8'
  });

  // 响应结果
  res.end('<h2>Hello Server</h2>');
});

// 启动服务器,并且制定端口号和主机
server.listen(8888, '0.0.0.0', () => {
  console.log('服务器启动成功~');
});
