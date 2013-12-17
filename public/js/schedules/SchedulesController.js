'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController($scope) {

    var scheduleItems = $scope.scheduleItems = [];

    $scope.startTime = new Date();

    $scope.hourStep = 1;
    $scope.minStep = 1;
    $scope.isMeridian = true;

    $scope.formFields = [
      {
        label: 'Task',
        type: 'text',
        model: 'task',
        isRequired: true
      },
      {
        label: 'Minutes',
        type: 'number',
        model: 'minutes',
        isRequired: true
      },
    ];

    $scope.formData = {};

    $scope.timeChanged = function () {

      console.log('Time changed to: ' + $scope.startTime);

    };

    $scope.addScheduleItem = function () {

      var newTask = $scope.formData.task.trim();
      var newMinutes = $scope.formData.minutes;

      if (newTask.length === 0 || newMinutes.length === 0) {
        return;
      }

      scheduleItems.push({
        task: newTask,
        minutes: newMinutes
      });

      console.log(scheduleItems);

      // todoStorage.put(todos);

      $scope.newTask = '';
      $scope.newMinutes = '';

      // $scope.remainingCount++;
    };

  }
  
);