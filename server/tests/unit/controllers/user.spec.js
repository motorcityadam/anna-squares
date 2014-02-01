/*jshint expr: true */

var expect     = require('chai').expect
    , sinon    = require('sinon')
    , UserCtrl = require('../../../controllers/user')
    , User     = require('../../../models/User');

describe('User Controller Unit Tests - ', function() {

  var req = { }
      , res = {}
      , next = {}
      , sandbox = sinon.sandbox.create();

  beforeEach(function() {

  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#create() - ', function() {

    after(function(done) {
      User.remove().exec();
      done();
    });

    it('should return a 400 response when user validation fails', function(done) {

      // Password complexity requirements are not met - request should fail validation.
      req.body = {
        username             : 'user',
        email                : 'user@example.com',
        password             : 'pass',
        passwordConfirmation : 'pass'
      };

      res.send = function(httpStatus) {
        expect(httpStatus).to.equal(400);
        done();
      };

      UserCtrl.create(req, res, next);
    });

    it('should return a 200 response when user validation succeeds', function(done) {
      req.body = {
        username             : 'user',
        email                : 'user@example.com',
        password             : 'as456Rt',
        passwordConfirmation : 'as456Rt'
      };

      res.send = function(httpStatus) {
        expect(httpStatus).to.equal(200);
        done();
      };

      UserCtrl.create(req, res, next);
    });

    it('should return a 403 response when the user already exists', function(done) {
      req.body = {
        username             : 'user',
        email                : 'user@example.com',
        password             : 'as456Rt',
        passwordConfirmation : 'as456Rt'
      };

      res.send = function(httpStatus) {
        expect(httpStatus).to.equal(403);
        done();
      };

      UserCtrl.create(req, res, next);
    });

  });
});