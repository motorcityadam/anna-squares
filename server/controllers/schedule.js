/*jshint unused: vars */

var Schedule = require('../models/Schedule.js');

module.exports = {

  index: function(req, res, next) {

    Schedule.find({}, function (err, schedules) {
      if (err) {
        return res.send(400, err);
      }
      var scheduleMap = {};
      schedules.forEach(function(schedule) {
        scheduleMap[schedule._id] = schedule;
      });
      res.send(200, scheduleMap);
    });

  },

  create: function(req, res, next) {

  },

  show: function(req, res, next) {

  },

  update: function(req, res, next) {

  },

  destroy: function(req, res, next) {

  }

};