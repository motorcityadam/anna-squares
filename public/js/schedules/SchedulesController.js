'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController($scope) {

    $scope.setupFormFields = [
      {
        label: 'Start Time',
        type: 'text',
        model: 'startTime',
        isRequired: true
      }
    ];

    $scope.setupFormData = {};

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

  }
  
);

