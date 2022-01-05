const http = require('http');
const url = require('url');

function createApplication() {
  const router = [
    {
      method: 'all',
      pathname: '*',
      handler(req, res) {
        res.end(`Cannot ${req.method} ${req.url}`);
      }
    }
  ];
  const app = {
    get(pathname, handler) {
      router.push({
        method: 'get',
        pathname,
        handler
      });
    },
    listen() {
      const server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url);
        let method = req.method.toLowerCase();
        for (let i = 1; i < router.length; i++) {
          let { method: routeMethod, pathname: routePath, handler } = router[i];
          if (method === routeMethod && pathname === routePath) {
            return handler(req, res);
          }
        }
        router[0].handler(req, res);
      });
      server.listen(...arguments);
    }
  };
  return app;
}

module.exports = createApplication;
