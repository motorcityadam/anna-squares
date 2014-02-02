/*jshint unused: vars */

var User = require('../models/User.js');

module.exports = {

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