'use strict';

annaSquaresApp.controller('schedulesController',
  function SchedulesController ($scope, $timeout) {

    var scheduleItems = $scope.scheduleItems = [];

    // var newStartTime = '';
    // var newEndTime = '';
    // var newLastTime = '';

    // var lastTime = '';

    var d = moment();
    $scope.scheduleDate = d._d;
    $scope.startTime = d._d;

    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.openCalendar = function () {
      $timeout(function() {
        $scope.calendarOpened = true;
      });
    };

    $scope.datePickerOptions = {
      'year-format': "'yy'",
      'starting-day': 0
    };

    $scope.openTime = function () {
      $timeout(function() {
        $scope.timeOpened = true;
      });
    };

    $scope.timePickerOptions = {

    };

    $scope.hourStep = 1;
    $scope.minStep = 1;
    $scope.isMeridian = true;

    $scope.alerts = [];

    $scope.columnDefintions = [
      {
        name: 'isMust',
        displayName: 'Must',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'hasPBDoc',
        displayName: 'PB',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'hasPNDoc',
        displayName: 'PN',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'hasPCDoc',
        displayName: 'PC',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'hasDCDoc',
        displayName: 'DC',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'hasEVDoc',
        displayName: 'EV',
        type: 'checkbox',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'patient',
        displayName: 'Patient',
        type: 'text',
        isDisabled: false,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'minutes',
        displayName: 'Minutes',
        type: 'number',
        isDisabled: false,
        minNumber: '0',
        maxNumber: ''
      },
      {
        name: 'variance',
        displayName: 'Variance',
        type: 'number',
        isDisabled: false,
        minNumber: '',
        maxNumber: '0'
      },
      {
        name: 'startTime',
        displayName: 'Start Time',
        type: 'text',
        isDisabled: true,
        minNumber: '',
        maxNumber: ''
      },
      {
        name: 'endTime',
        displayName: 'End Time',
        type: 'text',
        isDisabled: true,
        minNumber: '',
        maxNumber: ''
      }
    ];

    $scope.rowIds = [1];

    $scope.cellData = {};

    $scope.addRow = function () {
      var nextRowId;
      nextRowId = Math.max.apply(Math, $scope.rowIds) + 1;
      $scope.rowIds.push(nextRowId);
    };

    $scope.removeRow = function (rowId) {
      var targetIndex;
      if ($scope.rowIds.length === 1) {
        $scope.alerts.length = 0;
        $scope.alerts.push({type: 'danger', msg: 'This row cannot be removed because it is the last one.'});
        return;
      }
      targetIndex = $scope.rowIds.indexOf(rowId);
      if (targetIndex > -1) {
        $scope.rowIds.splice(targetIndex, 1);
      }
    };

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    // $scope.formFields = [
    //   {
    //     label: 'Task',
    //     type: 'text',
    //     model: 'newTask',
    //     doTrim: true,
    //     isRequired: true,
    //     hasFocus: true
    //   },
    //   {
    //     label: 'Minutes',
    //     type: 'number',
    //     model: 'newMinutes',
    //     doTrim: false,
    //     isRequired: true,
    //     hasFocus: false
    //   },
    // ];

    // $scope.formData = {
    //   newTask: '',
    //   newMinutes: 0
    // };

    // $scope.scheduleData = [
    //   {
    //     task: 'Anna',
    //     minutes: 50,
    //     variance: 0,
    //     startTime: '',
    //     endTime: ''
    //   }, {
    //     task: 'Adam',
    //     minutes: 43,
    //     variance: 0,
    //     startTime: '',
    //     endTime: ''
    //   }, {
    //     task: 'Cassandra',
    //     minutes: 27,
    //     variance: 0,
    //     startTime: '',
    //     endTime: ''
    //   }, {
    //     task: 'Angel',
    //     minutes: 29,
    //     variance: 0,
    //     startTime: '',
    //     endTime: ''
    //   }, {
    //     task: 'Beverly',
    //     minutes: 34,
    //     variance: 0,
    //     startTime: '',
    //     endTime: ''
    //   }
    // ];

    // $scope.gridOptions = { 
    //   data: 'scheduleData',
    //   headerRowHeight: 30,
    //   enableCellSelection: true,
    //   enableRowSelection: true,
    //   enableCellEditOnFocus: true,
    //   multiSelect: false,
    //   columnDefs: [
    //     {
    //       field: 'isMust',
    //       displayName: 'Must',
    //       sortable: false,
    //       enableCellEdit: true,
    //       width: '50px'
    //     }, {
    //       field: 'hasDocs',
    //       displayName: 'Docs',
    //       sortable: false,
    //       enableCellEdit: true,
    //       width: '50px'
    //     }, {
    //       field: 'task',
    //       displayName: 'Task',
    //       sortable: false,
    //       enableCellEdit: true,
    //       width: '250px'
    //     }, {
    //       field: 'minutes', 
    //       displayName: 'Minutes',
    //       sortable: false,
    //       enableCellEdit: true,
    //       width: '75px'
    //     }, {
    //       field: 'variance',
    //       displayName: 'Variance',
    //       sortable: false,
    //       enableCellEdit: true,
    //       width: '75px'
    //     }, {
    //       field: 'startTime',
    //       displayName: 'Start Time',
    //       sortable: false,
    //       enableCellEdit: false,
    //       width: '100px'
    //     }, {
    //       field: 'endTime',
    //       displayName: 'End Time',
    //       sortable: false,
    //       enableCellEdit: false,
    //       width: '100px'
    //     }
    //   ]
    // };

    // $scope.timeChanged = function () {

    //   var i = 0;
    //   var startTime;
    //   var endTime;
    //   var lastTime;

    //   startTime = $scope.startTime;

    //   for (i=0; i<scheduleItems.length; i++) {
    //     if (i === 0) {
    //       startTime = startTime;
    //     } else {
    //       startTime = lastTime;
    //     }
        
    //     scheduleItems[i].startTime = startTime.format('LT');
    //     endTime = startTime.clone().add('minutes', scheduleItems[i].minutes);
    //     scheduleItems[i].endTime = endTime.format('LT');
    //     lastTime = endTime.clone();
    //   }

    // };

    // $scope.setTimeToNow = function() {

    //   $scope.startTime = moment();
    //   $scope.timeChanged();

    // };

    // $scope.addScheduleItem = function () {

    //   var newTask = $scope.formData.newTask.trim();
    //   var newMinutes = $scope.formData.newMinutes;

    //   if (newTask.length === 0) {
    //     $scope.formAlert = 'Please enter a task name.';
    //     return;
    //   }

    //   if (newMinutes === 0) {
    //     $scope.formAlert = 'Please enter the number of projected minutes for the task.';
    //     return;
    //   }
      
    //   if (scheduleItems.length === 0) {
    //     newStartTime = $scope.startTime;
    //   } else {
    //     newStartTime = newLastTime;
    //   }

    //   newEndTime = newStartTime.clone().add('minutes', newMinutes);
    //   newLastTime = newEndTime.clone();

    //   scheduleItems.push({
    //     task: newTask,
    //     minutes: newMinutes,
    //     startTime: newStartTime.format('LT'),
    //     endTime: newEndTime.format('LT')
    //   });

    //   $scope.formData.newTask = '';
    //   $scope.formData.newMinutes = 0;

    //   $scope.scheduleFormOuter.$setPristine();

    // };

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

      $scope.rowIds = [1];
      $scope.cellData = {};

    };

  }
  
);