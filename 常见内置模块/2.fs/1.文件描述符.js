const fs = require('fs');
const path = require('path');
// 案例: 读取文件的信息
const filepath = './abc.txt';

// 1.方式一: 同步操作
/* const info = fs.statSync(filepath);
console.log("后续需要执行的代码");
console.log(info); */
/* 
console.log(__dirname);
console.log(process.cwd());
console.log(path.resolve('./'));
 */

// 2.方式二: 异步操作
/* 
fs.stat(filepath, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(info);
  console.log(info.isFile());
  console.log(info.isDirectory());
});
console.log('后续需要执行的代码');
*/

// 3.方式三: Promise
// fs.promises.stat(filepath).then(info => {
//   console.log(info);
// }).catch(err => {
//   console.log(err);
// });

// console.log("后续需要执行的代码");


fs.open("./abc.txt", (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }

  //4. 通过描述符去获取文件的信息
  fs.fstat(fd, (err, info) => {
    console.log(info);
  })
})