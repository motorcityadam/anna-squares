'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController($scope) {

    var scheduleItems = $scope.scheduleItems = [];

    var newStartTime = '';
    var newEndTime = '';

    var d = new Date();
    d.setHours(12);
    d.setMinutes(0);
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
        isRequired: true
      },
      {
        label: 'Minutes',
        type: 'number',
        model: 'newMinutes',
        doTrim: false,
        isRequired: true
      },
    ];

    $scope.formData = {
      newTask: '',
      newMinutes: 0
    };

    $scope.timeChanged = function () {

      console.log($scope.startTime);

    };

    $scope.setTimeToNow = function() {

      $scope.startTime = new Date();
      $scope.timeChanged();

    };

    $scope.addScheduleItem = function () {

      var newTask = $scope.formData.newTask.trim();
      var newMinutes = $scope.formData.newMinutes;
      newStartTime = $scope.startTime;
      newEndTime = $scope.startTime;

      if (newTask.length === 0) {
        $scope.formAlert = 'Please enter a task name.';
        return;
      }

      if (newMinutes === 0) {
        $scope.formAlert = 'Please enter the number of projected minutes for the task.';
        return;
      }

      scheduleItems.push({
        task: newTask,
        minutes: newMinutes,
        startTime: newStartTime,
        endTime: newEndTime
      });

      $scope.formData.newTask = '';
      $scope.formData.newMinutes = 0;

      $scope.scheduleFormOuter.$setPristine();

    };

    $scope.printScheduleItems = function () {

    };

    $scope.emailScheduleItems = function () {

    };

    $scope.clearAllScheduleItems = function () {

      scheduleItems.length = 0;

    };

  }
  
);