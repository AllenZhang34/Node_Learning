//前端是无法直接读取文件 操作文件的
//node需要对文件和前端传递的数据进行处理
//进制数据 所以内容都是以2进制来存储的，数据都是以2进制形式来表现的

//以字节为单位来存储数据 8位 -> 1个字节 1024字节 -> 1K 1024K-> 1m

let sum = 0;
for (let i = 0; i < 8; i++) {
  sum += Math.pow(2, i);
}
console.log(sum);

// 将一个10进制 转化成2进制 ？ 取余数倒着读 就可以获取对应的进制

console.log(parseInt('101', 2)); //把任意进制转化成10进制
//0b 二进制 0x 16进制

console.log((0x64).toString(2));

//node中用Buffer 来标识内存的数据 内容换成了16进制
let buffer1 = Buffer.alloc(5);
console.log(buffer1[0]);
//像数组，数组可以扩展，buffer不能扩展，可以用索引取值,取出来的内容是10进制

//也可以直接填16进制
let buffer2 = Buffer.from([0x25, 0x26, 300]); // 超过255 会取余
console.log(buffer2[0]);

let buffer3 = Buffer.from('珠峰'); //6个字节
console.log(buffer3);

//base64 的来源就是将每个字节转化成小于64的值

const r = Buffer.from('张');
console.log(r);
const r2 = Buffer.from('张').toString('base64');
console.log(r2);
//先将16进制转化成2进制
console.log((0xe5).toString(2));
console.log((0xbc).toString(2));
console.log((0xa0).toString(2));
// 11100101 10111100 10100000

//6位一截取 3*8 -> 6*4
// 111001 011011 110010 100000

//转换成10进制
console.log(parseInt('111001', 2));
console.log(parseInt('011011', 2));
console.log(parseInt('110010', 2));
console.log(parseInt('100000', 2));
//57 27 50 32 ->5byg
//base64编码表

// 0-63 取值范围是 64
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLocaleLowerCase();
str += '0123456789+/';
// 57 56  62 32
console.log(str[57] + str[27] + str[50] + str[32]); // 5byg 没有加密功能
