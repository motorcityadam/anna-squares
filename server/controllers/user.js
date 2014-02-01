/*jshint unused: vars */

var User = require('../models/User.js');

module.exports = {

  user: function(req, res, next, id) {
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
  },

  create: function(req, res, next) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
      if (err) {
        return res.send(400, err.message);
      }
      return res.send(200, 'User successfully created.');
    });
  }
};