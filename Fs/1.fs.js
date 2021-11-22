const fs = require('fs');
const path = require('path');

// copy功能的实现  i/o 文件读和写。 读取的概念是把读取到的内容放到是内存中，读取内存中的内容写入到文件中

fs.readFile(path.resolve(__dirname, './note.md'), 'utf-8', function (err, data) {
  fs.writeFile(path.resolve(__dirname, './copy.md'), data, function (err) {
    console.log(err);
    console.log('write success');
  });
});

// 不适合大文件读取，如果是简单的文件可以使用上面这种方式。 对于大文件来说我们操作全部使用“流” 流的特点就是有方向，从一个地方到另一个地方
// 底层的文件操作，需要对文件进行精确的读取 fs.open fs.read  fs.write (开发的时候用不到，通过这个些api 让大家掌握底层原理实现 stream实现原理 pipe)
// 流的特点 最终解决的问题 就是防止淹没可用内存
