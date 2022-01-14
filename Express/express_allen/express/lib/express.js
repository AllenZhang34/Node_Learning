//const { application } = require('express');

const Application = require('./application');

//创建应用的过程

function createApplication() {
  return new Application();
}
module.exports = createApplication;
