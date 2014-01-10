var mongoose = require('mongoose');
var User     = mongoose.model('User');

// Auth callback
exports.authCallback = function(req, res) {
  res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
  res.render('user/signin', {
    title: 'Signin',
    message: req.flash('error')
  });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
  res.redirect('/');
};

exports.create = function(req, res) {
  var user = new User(req.body);
  var message = null;

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'The username provided has already been taken. Please choose another username.';
          break;
        default:
          message = 'Please complete all the fields in this form.';
      }

      return res.send({
        success : 'false',
        message : message,
        user    : user
      });
    } else {
      message = 'An activation link has been sent to the e-mail address provided. Please follow the instructions provided to activate your account.';

      return res.send({
        success : 'true',
        message : message,
        user    : user
      });

    }
    /*    req.logIn(user, function(err) {
     if (err) return next(err);
     return res.redirect('/');
     });*/
  });
}
/**
 * Create user
 */
/*exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      return res.render('users/signup', {
        errors: err.errors,
        user: user
      });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  });
};*/

/**
 *  Show profile
 */
exports.show = function(req, res) {
  var user = req.profile;

  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Send User
 */
exports.me = function(req, res) {
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
  User
    .findOne({
      _id: id
    })
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};