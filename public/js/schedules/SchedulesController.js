'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController($scope) {

    $scope.startTime = new Date();

    $scope.hourStep = 1;
    $scope.minStep = 1;
    $scope.isMeridian = true;

    $scope.formFields = [
      {
        label: 'Task',
        type: 'text',
        model: 'patient',
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

  }
  
);