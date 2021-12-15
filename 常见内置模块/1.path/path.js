let path = require('path');

//__dirname是node.js中的一个全局变量，用来获取当前模块文件所在目录的完整绝对路径
//console.log(__dirname);///Users/i337605/Documents/GitHub/Node_Learning/常见内置模块/1.path

//path.dirname(path) 返回 path 的目录名
//console.log(path.dirname('/Users/常见内置模块/1.path'));// /Users/常见内置模块

// 获取路径的信息
const filepath = '/User/why/abc.txt';

//console.log(path.dirname(filepath));
//console.log(path.basename(filepath));
//console.log(path.extname(filepath));

//var myPath = path.dirname(__dirname + '/test/util/helloWorld.js');// /Users/i337605/Documents/GitHub/Node_Learning/常见内置模块/1.path/test/util
//console.log(myPath);

//path.basename(path[, ext]) 获取文件名
//console.log(path.basename(__dirname + '/path.js', '.js')); //path

//path.extname(path) 返回path的扩展名
/* 
var filepath = '/tmp/demo/js/test.js';
// 输出：.js
console.log(path.extname(filepath));
 */

//console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));

