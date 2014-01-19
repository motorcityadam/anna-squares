var path     = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
  root : rootPath,
  env  : process.env.NODE_ENV,
  port : process.env.PORT || 3000
};