//node 执行文件会把这个文件当成一个模块
//默认修改了this
console.log(this);

//自执行函数中的this 默认指向global
(function () {
  console.log(this === global);
})();

//想访问全局属性需要通过global
(function () {
  console.dir(global, {
    showHidden: true
  });
})();

//global中的一些内置属性:
//Buffer node中的一些二进制对象（最早的时候浏览器不能直接读写文件）
//__dirname __filename
console.log(__dirname); //当前文件执行时的目录 绝对路径
console.log(__filename); //文件自己的绝对路径

//platform win32 mac->(darwin)
//chdir 修改当前执行文件的路径
//cwd current working directory 当前工作目录 可以改变，webpack会自动查找运行webpack的目录下的webpack.config.js
//env执行代码时传入的环境
//argv执行代码时传入的参数([执行node所在的exe文件，当前执行的文件，...其他参数])

//console.log(process);
console.log(process.cwd());
console.log(process.env);
if (process.env.NODE_ENV === 'dev') {
  console.log('dev');
} else {
  console.log('prod');
}

console.log(process.argv); //会根据用户传递的参数来解析，生成对应的功能

let argv = process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.startsWith('--')) {
    memo[current.slice(2)] = arr[index + 1];
  }
  return memo;
}, {});
//console.log(argv);

//commander
const program = require('commander');
program.option('-p,--port <n>', 'set user port');
program.option('-f,--file <n>', 'set user directory');
program.parse(process.argv);

const options = program.opts();
console.log(options);
if (options.port) {
  console.log('port');
}
