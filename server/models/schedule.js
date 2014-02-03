'use strict';

var mongoose    = require('mongoose')
    , Schema    = mongoose.Schema
    , ObjectId  = Schema.ObjectId
    , validator = require('validator');

var RowSchema = new Schema({
  rowNumber: {
    type: Number,
    required: true
  },
  isMust: Boolean,
  hasDocs: Boolean,
  patientName: String,
  planMinutes: Number,
  metMinutes: Number
});

var ScheduleSchema = new Schema({
  scheduleDate: Date,
  startTime: Date,
  notes: String,
  rows: [RowSchema],
  owner: {
    type: ObjectId,
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

module.exports = mongoose.model('Schedule', ScheduleSchema);