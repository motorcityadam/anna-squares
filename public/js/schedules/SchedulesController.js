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
        model: 'newTask',
        isRequired: true
      },
      {
        label: 'Minutes',
        type: 'number',
        model: 'newMinutes',
        isRequired: true
      },
    ];

    $scope.formData = {
      newTask: '',
      newMinutes: 0
    };

    $scope.timeChanged = function () {

      console.log('Time changed to: ' + $scope.startTime);

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

      scheduleItems.push({
        task: newTask,
        minutes: newMinutes
      });

      console.log(scheduleItems);

      $scope.formData.newTask = '';
      $scope.formData.newMinutes = 0;

    };

  }
  
);