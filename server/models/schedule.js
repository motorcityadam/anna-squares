'use strict';

var mongoose    = require('mongoose')
    , validator = require('validator')
    , Schema    = mongoose.Schema
    , ObjectId  = Schema.ObjectId;

var RowSchema = new Schema({
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
    type: ObjectId,
    ref : 'User',
    required: true
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
});

RowSchema.path('patientName').validate(function(patientName) {
  if (!(validator.isLength(patientName, 0, 100))) {
    this.invalidate('patientName', 'The patient name cannot be more than 100 characters long.');
  }
}, null);

RowSchema.path('planMinutes').validate(function(planMinutes) {
  if (planMinutes < 0) {
    this.invalidate('planMinutes', 'The plan minutes cannot be negative.');
  }
}, null);

RowSchema.path('metMinutes').validate(function(metMinutes) {
  if (metMinutes < 0) {
    this.invalidate('metMinutes', 'The met minutes cannot be negative.');
  }
}, null);

ScheduleSchema.path('notes').validate(function(notes) {
  if (!(validator.isLength(notes, 0, 63206))) {
    this.invalidate('notes', 'Notes cannot be more than 63,206 characters long.');
  }
}, null);

ScheduleSchema.statics = {
  load: function (username, cb) {
    this.findOne({ username: username }, '_id').populate('owner').exec(cb);
  }
};

module.exports = mongoose.model('Schedule', ScheduleSchema);