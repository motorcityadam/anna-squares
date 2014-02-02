/*global angular:false*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.username = $scope.user.username;

    $scope.signout = function() {
      Auth.signout(function() {
        $location.path('/signin');
      }, function() {
        $rootScope.danger = 'Failed to sign out.';
      });
    };
  }]);

angular.module('anna-squares')
  .controller('SidebarCtrl', ['$rootScope', '$scope', '$location', 'Auth',
    function($rootScope, $scope, $location, Auth) { }]);

angular.module('anna-squares')
  .controller('SigninCtrl',
    ['$rootScope', '$scope', '$location', '$window', 'Auth',
      function($rootScope, $scope, $location, $window, Auth) {

      $scope.signin = function() {
        Auth.signin({
          username: $scope.username,
          password: $scope.password
        },
        function(res) {
          $location.path('/' + Auth.user.username);
        },
        function(err) {
          $rootScope.danger = 'Failed to sign in.';
        });
      };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    }]);

angular.module('anna-squares')
    .controller('HomeCtrl',
        ['$rootScope', function($rootScope) { }]);

angular.module('anna-squares')
  .controller('RegisterCtrl',
    ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

      $scope.register = function() {
        Auth.register({
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          passwordConfirmation: $scope.passwordConfirmation
        },
        function(message) {
          $location.path('/signin');
          $rootScope.success = message;
        },
        function(err) {
          $rootScope.danger = err;
        });
      };
    }]);

angular.module('anna-squares')
  .controller('DashboardCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

      }]);

angular.module('anna-squares')
  .controller('SchedulesCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

      }]);

angular.module('anna-squares')
  .controller('FeedbackCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

      }]);