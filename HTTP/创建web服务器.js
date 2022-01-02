const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello Server');
});

server.listen(8888, '0.0.0.0', () => {
  console.log('create success');
});

const server2 = new http.Server((req, res) => {
  res.end('Hello Server 2');
});

server2.listen(8889, '0.0.0.0', () => {
  console.log('create success 2');
});
