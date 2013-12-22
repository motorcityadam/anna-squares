'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController ($scope) {

    var scheduleItems = $scope.scheduleItems = [];

    var newStartTime = '';
    var newEndTime = '';
    var newLastTime = '';

    // var lastTime = '';

    var d = moment({hour: 12, minute: 0});
    $scope.startTime = d;

    $scope.hourStep = 1;
    $scope.minStep = 1;
    $scope.isMeridian = true;

    $scope.formFields = [
      {
        label: 'Task',
        type: 'text',
        model: 'newTask',
        doTrim: true,
        isRequired: true,
        hasFocus: true
      },
      {
        label: 'Minutes',
        type: 'number',
        model: 'newMinutes',
        doTrim: false,
        isRequired: true,
        hasFocus: false
      },
    ];

    $scope.formData = {
      newTask: '',
      newMinutes: 0
    };

    $scope.timeChanged = function () {

      var i = 0;
      var startTime;
      var endTime;
      var lastTime;

      startTime = $scope.startTime;

      for (i=0; i<scheduleItems.length; i++) {
        if (i === 0) {
          startTime = startTime
        } else {
          startTime = lastTime;
        }
        
        scheduleItems[i].startTime = startTime.format("LT");
        endTime = startTime.clone().add('minutes', scheduleItems[i].minutes);
        scheduleItems[i].endTime = endTime.format("LT");
        lastTime = endTime.clone();
      }

    };

    $scope.setTimeToNow = function() {

      $scope.startTime = moment();
      $scope.timeChanged();

    };

    $scope.addScheduleItem = function () {

      var newTask = $scope.formData.newTask.trim();
      var newMinutes = $scope.formData.newMinutes;

      if (newTask.length === 0) {
        $scope.formAlert = 'Please enter a task name.';
        return;
      }

      if (newMinutes === 0) {
        $scope.formAlert = 'Please enter the number of projected minutes for the task.';
        return;
      }
      
      if (scheduleItems.length === 0) {
        newStartTime = $scope.startTime;
      } else {
        newStartTime = newLastTime;
      }

      newEndTime = newStartTime.clone().add('minutes', newMinutes);
      newLastTime = newEndTime.clone();

      scheduleItems.push({
        task: newTask,
        minutes: newMinutes,
        startTime: newStartTime.format("LT"),
        endTime: newEndTime.format("LT")
      });

      $scope.formData.newTask = '';
      $scope.formData.newMinutes = 0;

      $scope.scheduleFormOuter.$setPristine();

    };

    $scope.printScheduleItems = function () {

      console.log('printScheduleItems');

    };

    $scope.emailScheduleItems = function () {

      console.log('emailScheduleItems');

    };

    $scope.sendScheduleItems = function () {

      console.log('sendScheduleItems');

    };

    $scope.clearAllScheduleItems = function () {

      scheduleItems.length = 0;

    };

  }
  
);