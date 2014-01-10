'use strict';

app.controller('signinController',
  function SigninController($scope) {

    $scope.formName = 'signinForm';

    $scope.fieldDefinitions = [
      {
        label: 'Username or Email Address',
        name: 'username',
        type: 'text',
        isRequired: true,
        hasPattern: '',
        maxLength: '',
        minLength: '',
        matchField: '',
        fieldHelp: '',
        fieldHelpItems: [],
        fieldErrorItems: [
          {
            errorKey: 'required',
            errorMessage: 'This field is required.'
          },
          {
            errorKey: 'minlength',
            errorMessage: ''
          },
          {
            errorKey: 'maxlength',
            errorMessage: ''
          },
          {
            errorKey: 'pattern',
            errorMessage: ''
          },
          {
            errorKey: 'email',
            errorMessage: ''
          },
          {
            errorKey: 'unique',
            errorMessage: ''
          },
          {
            errorKey: 'match',
            errorMessage: ''
          }
        ]
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        isRequired: true,
        hasPattern: '',
        maxLength: '',
        minLength: '',
        matchField: '',
        fieldHelp: '',
        fieldHelpItems: [],
        fieldErrorItems: [
          {
            errorKey: 'required',
            errorMessage: 'This field is required.'
          },
          {
            errorKey: 'minlength',
            errorMessage: ''
          },
          {
            errorKey: 'maxlength',
            errorMessage: ''
          },
          {
            errorKey: 'pattern',
            errorMessage: ''
          },
          {
            errorKey: 'email',
            errorMessage: ''
          },
          {
            errorKey: 'unique',
            errorMessage: ''
          },
          {
            errorKey: 'match',
            errorMessage: ''
          }
        ]
      }
    ];

    $scope.formData = {};

    $scope.formAgreementNotice = '';

    $scope.formAgreements = [
      {
        title : 'Reset your password?',
        url   : '#!/forgotpassword'
      }
    ];

    $scope.processForm = function () {
/*      $http({
        method  : 'POST',
        url     : '/users',
        data    : $.param($scope.formData),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
      .success(function(data) {
        console.log(data);

        if (!data.success) {
          // if not successful, bind errors to error variables
          $scope.errorName = data.errors.name;
          // $scope.errorSuperhero = data.errors.superheroAlias;
        } else {
          // if successful, bind success message to message
          $scope.message = data.message;
        }
      });*/
    };

  }
);