var passport =  require('passport');

module.exports = {
  signin: function(req, res, next) {
    passport.authenticate('local', function(err, user) {

      if(err)     { return next(err); }
      if(!user)   { return res.send(400); }

      req.logIn(user, function(err) {
        if(err) {
          return next(err);
        }

        res.json(200, { 'username': user.username, 'role': user.role });
      });
    })(req, res, next);
  },

  signout: function(req, res) {
    req.logout();
    res.send(200);
  }
};