/*jslint maxlen: 200 */
'use strict';

var should     = require('should')
    , mongoose = require('mongoose');

var Schedule = mongoose.model('Schedule');
// var users = require('../../mocks/users');

var schedule1 = {
  scheduleDate : new Date(),
  startTime    : new Date(),
  notes        : '',
  rows         : [{
    rowNumber   : 1,
    isMust      : true,
    hasDocs     : true,
    patientName : 'Adam J. Cook',
    planMinutes : 0,
    metMinutes  : 0
  },{
    rowNumber   : 2,
    isMust      : true,
    hasDocs     : false,
    patientName : 'Anna Acosta',
    planMinutes : 60,
    metMinutes  : 10
  }]

};

/*var RowSchema = new Schema({
  rowNumber: {
    type: Number,
    unique: true,
    required: true
  },
  isMust: Boolean,
  hasDocs: Boolean,
  patientName: String,
  planMinutes: {
    type: Number,
    required: true,
    default: 0
  },
  metMinutes: {
    type: Number,
    required: true,
    default: 0
  }
});

var ScheduleSchema = new Schema({
  scheduleDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  notes: String,
  rows: [RowSchema],
  owner: {
    type: ObjectId
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date()
  }
});*/

describe('Schedule Model Unit Tests - ', function() {
  describe('Model Schedule - ', function() {
    describe('#save() - ', function() {
      afterEach(function(done) {
        Schedule.remove().exec();
        done();
      });

      it('should begin with no schedules', function(done) {
        Schedule.find({}, function(err, schedules) {
          schedules.should.have.length(0);
          done();
        });
      });

      it('should be able to save a user without issue', function(done) {
        new Schedule(schedule1).save(done);
      });

    });
  });
});