const createReadStream = require('./ReadStream');
const path = require('path');
const filePath = path.resolve(__dirname, 'test.txt');

let rs = createReadStream(filePath, {
  flags: 'r',
  highWaterMark: 3,
  start: 0,
  end: 4,
  autoClose: true,
  emitClose: true
});

rs.on('open', function (fd) {
  console.log('open', fd);
});

let arr = [];

rs.on('data', function (chunk) {
  rs.pause();
  arr.push(chunk);
  console.log(chunk);
});

rs.on('error', function (err) {
  console.log('====' + err);
});

rs.on('close', function () {
  console.log('close');
});

rs.on('end', function () {
  console.log('end');
  console.log(Buffer.concat(arr).toString());
});

setInterval(() => {
  rs.resume();
}, 1000);
