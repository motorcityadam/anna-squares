/*global angular:false*/
/*jshint unused: vars */
'use strict';

/* Controllers */

angular.module('anna-squares')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.signout = function() {
      Auth.signout(function() {
        $location.path('/signin');
      }, function() {
        $rootScope.error = 'Failed to sign out.';
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

      $scope.rememberme = true;
      $scope.signin = function() {
        Auth.signin({
          username: $scope.username,
          password: $scope.password
        },
        function(res) {
          $location.path('/dashboard');
        },
        function(err) {
          $rootScope.error = 'Failed to sign in.';
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
      $scope.role = Auth.userRoles.user;
      $scope.userRoles = Auth.userRoles;

      $scope.register = function() {
        Auth.register({
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          confirm_password: $scope.confirm_password,
          role: $scope.role
        },
        function() {
          $location.path('/dashboard');
        },
        function(err) {
          $rootScope.error = err;
        });
      };
    }]);

angular.module('anna-squares')
    .controller('DashboardCtrl',
        ['$rootScope', function($rootScope) { }]);

angular.module('anna-squares')
  .controller('SchedulesCtrl',
    ['$rootScope', function($rootScope) { }]);


angular.module('anna-squares')
  .controller('AdminCtrl',
    ['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
      $scope.loading = true;
      $scope.userRoles = Auth.userRoles;

      Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
      }, function(err) {
        $rootScope.error = 'Failed to fetch users.';
        $scope.loading = false;
      });

    }]);