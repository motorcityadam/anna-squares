'use strict';

var mongoose    = require('mongoose')
    , Schema    = mongoose.Schema
    , ObjectId  = Schema.ObjectId;

// var validator = require('validator');

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

// TODO: Set owner field to 'required: true'
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
});

module.exports = mongoose.model('Schedule', ScheduleSchema);