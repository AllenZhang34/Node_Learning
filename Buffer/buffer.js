// Buffer node中的16进制 内存的标识全部用二进制来表示
// 二进制中一个字节 需要8个位 11111111  用16进制来表示我们的整个大小会小一些 ff

// Buffer是node中提供的 老的用法 new Buffer
// Buffer代表的是内存 如果一旦声明好，不能扩展(随意更改大小)的。  如果想去更改buffer的大小，改小可以截取内存，改大的话需要创造一个大的内存空间，将数据拷贝过去

// 声明buffer的时候需要指定大小  npm install @types/node (仅仅是为了有代码提示 没有其他功能)
// 最小单位是 3字节， 最小单位就是字节  1024 * 1

let buf1 = Buffer.alloc(3);
console.log(buf1);

// 很少使用数组来定义buffer，因为需要指定存放的内容,放不识别的东西，是不能识别的 认为就是0
let buf2 = Buffer.from([255, 255, 255]);
console.log(buf2);

// 主要应用buffer，可以存储数据， 数据可以全部用buffer表示出来， 可以和字符串相互转化
let buf3 = Buffer.from('张小源');
console.log(buf3.toString());
console.log(buf3.toString('base64'));

const fs = require('fs');
const path = require('path');
let note = fs.readFileSync(path.resolve(__dirname, './note.md'));
// 49 代表的ascii 第49个
// 当我们读取操作时不指定编码 全部都是buffer类型， 如果取出来的buffer中的某一项都是10进制
console.log(note, note[0]);

// buf5 中存的都是地址
// 截取内存，拿到截取后的更改
let buf5 = Buffer.from([1, 2, 3, 4]);
console.log(buf5); //16进制

let buf6 = buf5.slice(0, 1);
console.log(buf6);
buf6[0] = 100;
console.log(buf5);

const buf7 = Buffer.from('张小源');
const buf8 = Buffer.from('雷阿伦');
const bigBuf = Buffer.alloc(18);
//把buf7 拷贝到目标buffer上，目标的开始，源的开始和结束
buf7.copy(bigBuf, 0, 0, 9);
buf8.copy(bigBuf, 9, 0, 9);
console.log(bigBuf);
console.log(bigBuf.toString());

Buffer.prototype.myCopy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    target[targetStart++] = this[i];
  }
};

buf7.myCopy(bigBuf, 0, 0, 9);
buf8.myCopy(bigBuf, 9, 0, 9);
console.log(bigBuf);
console.log(bigBuf.toString());

//concat 原理就是copy
console.log(Buffer.concat([buf7, buf8]).toString());

Buffer.myConcat = function (bufferList, len) {
  if (len == undefined) {
    len = bufferList.reduce((a, b) => a + b.length, 0);
  }
  let bigBuffer = Buffer.alloc(len);
  let offset = 0;
  for (let i = 0; i < bufferList.length; i++) {
    let buf = bufferList[i];
    if (Buffer.isBuffer(buf)) {
      buf.copy(bigBuffer, offset);
      offset += buf.length;
    }
  }
  return bigBuffer;
};

console.log(Buffer.myConcat([buf7, buf8]).toString());
