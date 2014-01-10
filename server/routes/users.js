// ****** REST Layout ******
// :user     - username {String}
//
// *** Users app routes ***
// GET     /users             ->  index
// GET     /users/new         ->  new
// POST    /users             ->  create
// GET     /users/:user       ->  show
// GET     /users/:user/edit  ->  edit
// PUT     /users/:user       ->  update
// DELETE  /users/:user       ->  destroy

var mongoose = require('mongoose');
var User     = mongoose.model('User');

var users = require('../controllers/users');

exports.index = function(req, res){
  res.send('user index');
};

exports.new = function(req, res){
  res.send('new user');
};

exports.create = function(req, res){
  users.create(req, res)
};

exports.show = function(req, res){
  res.send('show user ' + req.params.user);
};

exports.edit = function(req, res){
  res.send('edit user ' + req.params.user);
};

exports.update = function(req, res){
  res.send('update user ' + req.params.user);
};

exports.destroy = function(req, res){
  res.send('destroy user ' + req.params.user);
};