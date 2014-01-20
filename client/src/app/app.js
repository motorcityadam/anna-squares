/*global
  angular:false,
  routingConfig:false
*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares', ['ngCookies', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {

      var access = routingConfig.accessLevels;

      $routeProvider.when('/',
        {
          templateUrl:    'home',
          controller:     'HomeCtrl',
          access:         access.user
        });
      $routeProvider.when('/signin',
        {
          templateUrl:    'signin',
          controller:     'SigninCtrl',
          access:         access.anon
        });
      $routeProvider.when('/register',
        {
          templateUrl:    'register',
          controller:     'RegisterCtrl',
          access:         access.anon
        });
      $routeProvider.when('/private',
        {
          templateUrl:    'private',
          controller:     'PrivateCtrl',
          access:         access.user
        });
      $routeProvider.when('/admin',
        {
          templateUrl:    'admin',
          controller:     'AdminCtrl',
          access:         access.admin
        });
      $routeProvider.when('/404',
        {
          templateUrl:    '404',
          access:         access.public
        });
      $routeProvider.otherwise({redirectTo:'/404'});

      $locationProvider.html5Mode(true);

      $httpProvider.interceptors.push(function($q, $location) {
        return {
          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $location.path('/signin');
              return $q.reject(response);
            }
            else {
              return $q.reject(response);
            }
          }
        };
      });

    }])

    .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {

      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        $rootScope.error = null;
        if (!Auth.authorize(next.access)) {
          if(Auth.isSignedIn()) $location.path('/');
          else                  $location.path('/signin');
        }
      });

    }]);