/*jshint unused: vars */
/*jslint maxlen: 130 */
var app            = require('../../server')
    , request      = require('supertest')
    , passportStub = require('passport-stub')
    , mongoose     = require('mongoose');

var User  = mongoose.model('User');
var users = require('../mocks/users');

passportStub.install(app);

describe('Server Integration Tests - ', function() {
  afterEach(function(done) {
    passportStub.logout();
    done();
  });

  after(function(done) {
    User.remove().exec();
    done();
  });
  describe('Through "/" - ', function() {
    it('should return a 200 response on GET', function(done) {
      request(app).get('/').expect(200, done);
    });
  });

  describe('Through "/signout" - ', function() {
    it('should return a 200 response on POST', function(done) {
      request(app).post('/signout').expect(200, done);
    });
  });

  describe('Through "/users" - ', function() {
    it('should return a 200 response if user is valid on POST', function(done) {
      request(app).post('/users').send(users.user1).expect(200, done);
    });

    it('should return a 400 response if username is taken on POST', function(done) {
      request(app).post('/users').send(users.user2).expect(400, done);
    });

    it('should return a 400 response if e-mail address is taken on POST', function(done) {
      request(app).post('/users').send(users.user3).expect(400, done);
    });

    it('should return a 400 response if username is empty on POST', function(done) {
      request(app).post('/users').send(users.user4).expect(400, done);
    });

    it('should return a 400 response if username is longer than 39 characters on POST', function(done) {
      request(app).post('/users').send(users.user5).expect(400, done);
    });

    it('should return a 200 response if username contains a dash on POST', function(done) {
      request(app).post('/users').send(users.user6).expect(200, done);
    });

    it('should return a 200 response if username contains multiple dashes on POST', function(done) {
      request(app).post('/users').send(users.user7).expect(200, done);
    });

    it('should return a 200 response if username contains has an ending dash on POST', function(done) {
      request(app).post('/users').send(users.user8).expect(200, done);
    });

    it('should return a 200 response if username contains has multiple ending dashes on POST', function(done) {
      request(app).post('/users').send(users.user9).expect(200, done);
    });

    it('should return a 400 response if username starts with a dash on POST', function(done) {
      request(app).post('/users').send(users.user10).expect(400, done);
    });

    it('should return a 400 response if username starts with multiple dashes on POST', function(done) {
      request(app).post('/users').send(users.user11).expect(400, done);
    });

    it('should return a 400 response if e-mail address is empty on POST', function(done) {
      request(app).post('/users').send(users.user12).expect(400, done);
    });

    it('should return a 400 response if e-mail address is malformed on POST', function(done) {
      request(app).post('/users').send(users.user13).expect(400, done);
    });

    it('should return a 400 response if e-mail address is longer than 100 characters on POST', function(done) {
      request(app).post('/users').send(users.user14).expect(400, done);
    });

    it('should return a 400 response if password and confirmation password is empty on POST', function(done) {
      request(app).post('/users').send(users.user15).expect(400, done);
    });

    it('should return a 400 response if password and confirmation password do not match on POST', function(done) {
      request(app).post('/users').send(users.user16).expect(400, done);
    });

    it('should return a 400 response if password is less than 7 characters on POST', function(done) {
      request(app).post('/users').send(users.user17).expect(400, done);
    });

    it('should return a 400 response if password does not contain an uppercase letter on POST', function(done) {
      request(app).post('/users').send(users.user18).expect(400, done);
    });

    it('should return a 400 response if password does not contain a lowercase letter on POST', function(done) {
      request(app).post('/users').send(users.user19).expect(400, done);
    });

    it('should return a 400 response if password does not contain a number or special character on POST', function(done) {
      request(app).post('/users').send(users.user20).expect(400, done);
    });

    it('should return a 200 response if password is valid by containing a number on POST', function(done) {
      request(app).post('/users').send(users.user21).expect(200, done);
    });

    it('should return a 200 response if password is valid by containing a special character on POST', function(done) {
      request(app).post('/users').send(users.user22).expect(200, done);
    });

  });

});