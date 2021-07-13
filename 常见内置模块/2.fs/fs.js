const fs = require('fs');
const fsPromises = require('fs').promises;

/* 
//文件读取
//异步回调方式
fs.readFile('./test.txt', 'utf8', (err, data) => {
  console.log(data);
});
console.log('Allen');

//同步方式
let data = fs.readFileSync('./test.txt', 'utf8');
console.log(data);

//异步promise方式
fsPromises.readFile('./test.txt', 'utf8').then((res) => {
  console.log(res);
});
 */

/* 
//文件写入
let message = 'test1234';
let option = {
  encoding: 'utf8',
  flag: 'a+'
};
fs.writeFile('./test.txt', message, option, (err) => {
  console.log(err);
});
 */