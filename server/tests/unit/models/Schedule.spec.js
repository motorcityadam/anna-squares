/*jslint maxlen: 200 */
'use strict';

var should     = require('should')
    , mongoose = require('mongoose');

var Schedule  = mongoose.model('Schedule');
var User      = mongoose.model('User');
var users     = require('../../mocks/users');
var schedules = require('../../mocks/schedules');

describe('Schedule Model Unit Tests - ', function() {
  describe('Model Schedule - ', function() {
    describe('#save() - ', function() {
      afterEach(function(done) {
        User.remove().exec();
        Schedule.remove().exec();
        done();
      });

      it('should begin with no schedules', function(done) {
        Schedule.find({}, function(err, schedules) {
          schedules.should.have.length(0);
          done();
        });
      });

      it('should be able to save a schedule without issue', function(done) {
        var user = new User(users.user1);
        var schedule = new Schedule(schedules.schedule1);
        schedule.owner = user;
        schedule.save(done);
      });

      /** Basic schema constraint tests */
      it('should fail to save a schedule with a patient name longer than 100 characters', function(done) {
        var user = new User(users.user1);
        var schedule = new Schedule(schedules.schedule2);
        schedule.owner = user;
        return schedule.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save a schedule with a row with plan minutes set to a negative value', function(done) {
        var user = new User(users.user1);
        var schedule = new Schedule(schedules.schedule3);
        schedule.owner = user;
        return schedule.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save a schedule with a row with met minutes set to a negative value', function(done) {
        var user = new User(users.user1);
        var schedule = new Schedule(schedules.schedule4);
        schedule.owner = user;
        return schedule.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save a schedule with a notes field longer than 63,206 characters', function(done) {
        var user = new User(users.user1);
        var schedule = new Schedule(schedules.schedule5);
        schedule.owner = user;
        return schedule.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });
  });
});