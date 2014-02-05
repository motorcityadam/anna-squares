/*global
  angular:false
*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares',
        ['ui.router', 'ngCookies', 'asc.ui', 'placeholders.img', 'ui.sortable'])
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,  $state,  $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);

angular.module('anna-squares')
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'home',
        controller: 'HomeCtrl'
      })

      .state('signin', {
        url: '/signin',
        templateUrl: 'signin',
        controller: 'SigninCtrl'
      })

      .state('register', {
        url: '/register',
        templateUrl: 'register',
        controller: 'RegisterCtrl'
      })

      .state('404', {
        url: '/404',
        templateUrl: '404'
      });

  }]);

/*
.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

  var access = routingConfig.accessLevels;

  $routeProvider.when('/',
    {
      templateUrl:    'home',
      controller:     'HomeCtrl',
      access:         access.public
    });
  $routeProvider.when('/404',
    {
      templateUrl:    '404',
      access:         access.public
    });
  $routeProvider.when('/500',
    {
      templateUrl:    '500',
      access:         access.public
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
  $routeProvider.when('/:username',
    {
      templateUrl:    'dashboard',
      controller:     'DashboardCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules',
    {
      templateUrl:    'schedules/list',
      controller:     'SchedulesListCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/new',
    {
      templateUrl:    'schedules/form',
      controller:     'SchedulesNewCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/:scheduleid',
    {
      templateUrl:    'schedules/detail',
      controller:     'SchedulesDetailCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/:scheduleid/edit',
    {
      templateUrl:    'schedules/form',
      controller:     'SchedulesEditCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/feedback',
    {
      templateUrl:    'feedback',
      controller:     'FeedbackCtrl',
      access:         access.user
    });
  $routeProvider.otherwise({redirectTo: '/404'});

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

.run(['$rootScope', '$routeParams', '$location', '$http', 'Auth',
      function ($rootScope, $routeParams, $location, $http, Auth) {

  $rootScope.$on('$routeChangeStart', function (event, next, current) {

    $rootScope.success = null;
    $rootScope.info = null;
    $rootScope.warning = null;
    $rootScope.danger = null;

    if (!Auth.authorize(next.access)) {
      if(Auth.isSignedIn()) $location.path('/' + Auth.user.username);
      else                  $location.path('/signin');
    }

  });

}]);*/
