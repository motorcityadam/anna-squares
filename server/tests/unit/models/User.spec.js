/*jslint maxlen: 200 */
'use strict';

var should     = require('should')
    , mongoose = require('mongoose');

var User = mongoose.model('User');
var users = require('../../mocks/users');

describe('User Model Unit Tests - ', function() {
  describe('Model User - ', function() {
    describe('#save() - ', function() {
      afterEach(function(done) {
        User.remove().exec();
        done();
      });

      it('should begin with no users', function(done) {
        User.find({}, function(err, users) {
          users.should.have.length(0);
          done();
        });
      });

      it('should be able to save a user without issue', function(done) {
        new User(users.user1).save(done);
      });

      /** Basic schema constraint tests */
      it('should fail to save a user with the same username as an existing user', function(done) {
        new User(users.user1).save();
        return new User(users.user2).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save a user with the same e-mail address as an existing user', function(done) {
        new User(users.user1).save();
        return new User(users.user3).save(function(err) {
          should.exist(err);
          done();
        });
      });

      /** Username field tests */
      it('should fail to save an user with empty username', function(done) {
        return new User(users.user4).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a username longer than 39 characters', function(done) {
        return new User(users.user5).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to save a user without issue if the username contains a dash', function(done) {
        new User(users.user6).save(done);
      });

      it('should be able to save a user without issue if the username contains multiple dashes', function(done) {
        new User(users.user7).save(done);
      });

      it('should be able to save a user without issue if the username has an ending dash', function(done) {
        new User(users.user8).save(done);
      });

      it('should be able to save a user without issue if the username has multiple ending dashes', function(done) {
        new User(users.user9).save(done);
      });

      it('should fail to save an user with a username starting with a dash', function(done) {
        return new User(users.user10).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a username starting with multiple dashes', function(done) {
        return new User(users.user11).save(function(err) {
          should.exist(err);
          done();
        });
      });

      /** Email field tests */
      it('should fail to save an user with empty e-mail address', function(done) {
        return new User(users.user12).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a malformed e-mail address', function(done) {
        return new User(users.user13).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with an e-mail address longer than 100 characters', function(done) {
        return new User(users.user14).save(function(err) {
          should.exist(err);
          done();
        });
      });

      /** Password and passwordConfirmation field tests **/
      it('should fail to save an user with empty password and passwordConfirmation', function(done) {
        return new User(users.user15).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a differing password and passwordConfirmation', function(done) {
        return new User(users.user16).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a password less than 7 characters', function(done) {
        return new User(users.user17).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a password without an uppercase letter', function(done) {
        return new User(users.user18).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a password without a lowercase letter', function(done) {
        return new User(users.user19).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an user with a password without a number or special character', function(done) {
        return new User(users.user20).save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to save an user with a password with all complexity constraints met (number)',
        function(done) {
          new User(users.user21).save(done);
        }
      );

      it('should be able to save an user with a password with all complexity constraints met (special character)',
        function(done) {
          new User(users.user22).save(done);
        }
      );

    });
  });
});