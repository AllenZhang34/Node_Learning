const fs = require('fs');
const path = require('path');
const filepath = './test.txt';
/* fs.writeFile(filepath, '+test', { flag: 'a' }, function (err) {
  console.log(err); // 程序员成长指北
});

fs.appendFile('./test2.txt', 'Allen', function (err) {
  if (err) {
    throw err;
  }
  // 写入成功后读取测试
  var data = fs.readFileSync('./test2.txt', 'utf-8');
  console.log(data);
});

fs.copyFileSync(filepath, './test3.txt');
let data = fs.readFileSync('./test3.txt', 'utf8');

console.log(data); */

fs.open(filepath,'r',function(err,fd){
    console.log('哈哈哈',fd);
 })