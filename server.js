/*
 * server.js
 * Entry point for anna-squares
 */

var express  = require('express');
var fs       = require('fs');
var passport = require('passport');
var Resource = require('express-resource');

// Load application configurations
var env      = process.env.NODE_ENV || 'development';
var config   = require('./config/config');
var auth     = require('./config/middlewares/auth');
var mongoose = require('mongoose');

// Configure database connection
var db = mongoose.connect(config.db);

// Load application models
var models_path = __dirname + '/server/models';
var walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    var newPath = path + '/' + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(models_path);

// Passport configuration
require('./config/passport')(passport);

var app = express();

// Express configuration
require('./config/express')(app, passport, db);

// Application routes
app.resource(require('./server/routes/index'));
app.resource('users', require('./server/routes/users'));
require('./server/routes/callbacks')(app, passport, auth);
app.resource('schedules', require('./server/routes/schedules'));

// Start the application
var port = config.port;
app.listen(port);
console.log('Express server listening on port ' + port + ' in ' + env + ' mode.');

exports = module.exports = app;