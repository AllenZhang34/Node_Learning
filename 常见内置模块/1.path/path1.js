const path = require('path');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
console.log(path.normalize('/foo/bar//baz/asdf/quux/../..'));
console.log(path.join(''));
const basepath = './User/why';
const filename = './abc.txt';
const othername = './why.js';
console.log(path.join(basepath, filename));
console.log(path.extname('index.'));
console.log(typeof path.extname('index'));
console.log(typeof path.extname('.index'));

// 3.resolve路径拼接
// resolve会判断拼接的路径字符串中,是否有以/或./或../开头的路径
const filepath2 = path.resolve(basepath, filename, othername);
console.log(filepath2);

const basepath2 = '/User/coderwhy';
//const filename2 = '/why/abc.txt'; // /why/abc.txt
// const filename2 = './why/abc.txt'; // /User/coderwhy/why/abc.txt
//const filename2 = 'why/abc.txt'; // /User/coderwhy/why/abc.txt

const filename2 = '../why/abc.txt'; // /User/why/abc.txt

const result = path.resolve(basepath2, filename2);
console.log(result);

console.log(path.resolve());