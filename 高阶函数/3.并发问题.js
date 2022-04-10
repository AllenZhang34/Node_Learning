const fs = require('fs');

function after(times, cb) {
  let arr = [];
  return (data, index) => {
    arr[index] = data; //保证顺序，采用索引
    if (--times === 0) {
      //多个请求并发，需要计数器实现
      cb(arr);
    }
  };
}
let out = after(2, (arr) => {
  console.log(arr);
});

fs.readFile('./age.txt', 'utf8', (err, data) => {
  out(data, 0);
});

fs.readFile('./name.txt', 'utf8', (err, data) => {
  out(data, 1);
});
