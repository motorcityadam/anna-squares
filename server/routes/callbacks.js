module.exports = function(app, passport, auth) {

  //User Routes
  var users = require('../controllers/users');

  // Github OAuth routes
  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.authCallback);

  // Google OAuth routes
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), users.authCallback);

};