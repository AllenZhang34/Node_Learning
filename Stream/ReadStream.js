const EventEmitter = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.autoClose = !!options.autoClose;
    this.emitClose = !!options.emitClose;

    this.flowing = false; //默认叫非流动模式

    this.open(); //默认打开文件

    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
    this.offset = 0;
  }

  destory(err) {
    if (this.fd) {
      fs.close(this.fd, () => {
        if (this.emitClose) {
          this.emit('close');
        }
      });
    }
    if (err) {
      this.emit('error', err);
    }
  }

  pause() {
    this.flowing = false;
  }

  resume() {
    //这里可以恢复读取
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }

  read() {
    // 调用read 的时候如果fd不存在，就监听什么时候有了fd再读取
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read);
    }

    const howMutchToRead = this.end ? Math.min(this.end - this.offset + 1, this.highWaterMark) : this.highWaterMark;

    let buffer = Buffer.alloc(howMutchToRead);
    fs.read(this.fd, buffer, 0, howMutchToRead, this.offset, (err, bytesRead) => {
      if (bytesRead) {
        this.offset += bytesRead;
        this.emit('data', buffer.slice(0, bytesRead));
        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit('end');
        this.destory();
      }
    });
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destory(err);
      }
      this.fd = fd;
      this.emit('open', fd);
    });
  }
}
function createReadStream(path, options) {
  return new ReadStream(path, options);
}

module.exports = createReadStream;
