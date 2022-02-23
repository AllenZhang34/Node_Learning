const http = require('http');
class Application {
  use(handleRequest) {
      this.fn = handleRequest
  }

  handleRequest = (res,req) => {
      this.fn(res,req)
  };
  listen() {
    const server = http.createServer(this.handleRequest);
    server.listen(...arguments);
  }
}

module.exports = Application;
