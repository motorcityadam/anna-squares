var _          = require('underscore')
    , path     = require('path')
    , passport = require('passport');

var AuthCtrl       = require('./controllers/auth')
    , UserCtrl     = require('./controllers/user')
    , ScheduleCtrl = require('./controllers/schedule')
    , userRoles    = require('../client/dist/common').userRoles
    , accessLevels = require('../client/dist/common').accessLevels;

var routes = [

  // Views
  {
    path: '/partials/*',
    httpMethod: 'GET',
    middleware: [function (req, res) {
      var requestedView = path.join('./', req.url);
      res.render(requestedView);
    }]
  },

  // OAUTH
  {
    path: '/auth/twitter',
    httpMethod: 'GET',
    middleware: [passport.authenticate('twitter')]
  },
  {
    path: '/auth/twitter/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })]
  },
  {
    path: '/auth/facebook',
    httpMethod: 'GET',
    middleware: [passport.authenticate('facebook')]
  },
  {
    path: '/auth/facebook/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })]
  },
  {
    path: '/auth/google',
    httpMethod: 'GET',
    middleware: [passport.authenticate('google')]
  },
  {
    path: '/auth/google/return',
    httpMethod: 'GET',
    middleware: [passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })]
  },
  {
    path: '/auth/linkedin',
    httpMethod: 'GET',
    middleware: [passport.authenticate('linkedin')]
  },
  {
    path: '/auth/linkedin/callback',
    httpMethod: 'GET',
    middleware: [passport.authenticate('linkedin', {
      successRedirect: '/',
      failureRedirect: '/signin'
    })]
  },

  // Local Authentication Routes
  {
    path: '/users',
    httpMethod: 'POST',
    middleware: [UserCtrl.create]
  },
  {
    path: '/signin',
    httpMethod: 'POST',
    middleware: [AuthCtrl.signin]
  },
  {
    path: '/signout',
    httpMethod: 'POST',
    middleware: [AuthCtrl.signout]
  },

  // Schedules API Routes
  // Routes Overview
  // GET    /schedules                   ->  index
  // GET    /schedules/new               ->  new (Client)
  // POST   /schedules                   ->  create
  // GET    /schedules/:scheduleid       ->  show
  // GET    /schedules/:scheduleid/edit  ->  edit (Client)
  // PUT    /schedules/:scheduleid       ->  update
  // DELETE /schedules/:scheduleid       ->  destroy
  {
    path: '/api/schedules',
    httpMethod: 'GET',
    middleware: [ScheduleCtrl.index],
    accessLevel: accessLevels.user
  },
  {
    path: '/api/schedules',
    httpMethod: 'POST',
    middleware: [ScheduleCtrl.create]
  },
  {
    path: '/api/schedules/:scheduleid',
    httpMethod: 'GET',
    middleware: [ScheduleCtrl.show]
  },
  {
    path: '/api/schedules/:scheduleid',
    httpMethod: 'PUT',
    middleware: [ScheduleCtrl.update]
  },
  {
    path: '/api/schedules/:scheduleid',
    httpMethod: 'DELETE',
    middleware: [ScheduleCtrl.destroy]
  },

  // Handle all other requests by AngularJS client-side routing system
  {
    path: '/*',
    httpMethod: 'GET',
    middleware: [function(req, res) {
      var role = userRoles.public, username = '';
      if(req.user) {
        role = req.user.role;
        username = req.user.username;
      }
      res.cookie('user', JSON.stringify({
        'username': username,
        'role': role
      }));
      res.render('index');
    }]
  }
];

function ensureAuthorized(req, res, next) {
  var role;
  if(!req.user) role = userRoles.public;
  else          role = req.user.role;

  var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

  if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
  return next();
}

module.exports = function(app) {

  _.each(routes, function(route) {
    route.middleware.unshift(ensureAuthorized);
    var args = _.flatten([route.path, route.middleware]);

    switch(route.httpMethod.toUpperCase()) {
      case 'GET':
        app.get.apply(app, args);
        break;
      case 'POST':
        app.post.apply(app, args);
        break;
      case 'PUT':
        app.put.apply(app, args);
        break;
      case 'DELETE':
        app.delete.apply(app, args);
        break;
      default:
        throw new Error('Invalid HTTP method specified for route ' + route.path);
    }
  });
};