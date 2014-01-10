/**
 * Module dependencies.
 */
 
var express    = require('express');
var mongoStore = require('connect-mongo')(express);
// var redisStore = require('connect-redis')(express);
var flash      = require('connect-flash');
var helpers    = require('view-helpers');
var config     = require('./config');

module.exports = function(app, passport, db) {

  app.set('showStackError', true);

  app.locals.pretty = true;

  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Setting the favicon and static folder
  app.use(express.favicon());
  app.use(express.static(config.root + '/client'));

  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  // Set views path, template engine and default layout
  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');

  // Enable JSONP
  app.enable("jsonp callback");

  app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Express/Redis session storage
/*    app.use(express.session({
      store: new redisStore({
        host: config.dataStore.host,
        port: config.dataStore.port,
        pass: config.dataStore.password
      }),
      secret: config.sessionSecret
    }));*/

    // Express/MongoDB session storage
    app.use(express.session({
      secret: config.sessionSecret,
      store: new mongoStore({
        db: db.connection.db,
        collection: 'sessions'
      })
    }));

    app.use(flash());

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);

    // Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
      if (~err.message.indexOf('not found')) return next();
      console.error(err.stack);
      res.status(500).render('500', {
        error: err.stack
      });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res, next) {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });

  });

};
