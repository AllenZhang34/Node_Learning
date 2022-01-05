const http = require('http');

//http.createServer会返回服务器的对象
//底层实际上是直接使用new Server对象
const server = http.createServer((req, res) => {
  res.end('Hello Server');
});

server.listen(8888, () => {
  console.log('Create server success');
});

const server2 = new http.Server((req, res) => {
  res.end('Hello Server2');
});

server2.listen(8889, () => {
  console.log('Create server success');
});
