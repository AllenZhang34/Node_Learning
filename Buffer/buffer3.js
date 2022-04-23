// alloc from //创建一个buffer

// slice  buffer截取
/*
let buffer4 = Buffer.from([1,2,3,4,5]); // 内部存的是引用地址
let slicBuffer = buffer4.slice(0,1);
slicBuffer[0] = 100;
console.log(buffer4)

---------------

let arr = [[1],2,3,4];
let newArr = arr.slice(0,1); // 二维数组的slice 相当于buffer，数组中存的是引用地址slice是浅拷贝
newArr[0][0] = 100;
console.log(arr);
*/

/* Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = sourceStart; i < sourceEnd; i++) {
    targetBuffer[targetStart++] = this[i];
  }
};
 */
// copy 可以将buffer的数据拷贝到另一个buffer上 （一般用不到，concat是基于copy的）
let buf0 = Buffer.from('源');
let buf1 = Buffer.from('小');
let buf2 = Buffer.from('张');

/*  
  let bigBuffer = Buffer.alloc(9); // == new Buffer(12)
  buf0.copy(bigBuffer, 6, 0, 3);
  buf1.copy(bigBuffer, 3, 0, 3);
  buf2.copy(bigBuffer, 0); // 默认后两个参数不用传递
  
  console.log(bigBuffer.toString());

   */

Buffer.concat = function (bufferList = [], length = bufferList.reduce((a, b) => a + b.length, 0)) {
  let bigBuffer = Buffer.alloc(length);
  let offset = 0;
  bufferList.forEach((buf) => {
    buf.copy(bigBuffer, offset);
    offset += buf.length;
  });
  return bigBuffer;
};
let bigBuffer2 = Buffer.concat([buf0, buf1, buf2]);
console.log(bigBuffer2.toString());


//  isBuffer   
console.log(Buffer.isBuffer(bigBuffer2));
// buffer.length 
console.log(bigBuffer2.byteLength,bigBuffer2.length);