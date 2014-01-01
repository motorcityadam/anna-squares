/*jshint -W079 */

'use strict';

var annaSquaresApp = angular.module('annaSquaresApp',
  [
    'ngRoute',
    'ngResource',
    'ngRoute',
    'ui.route',
    'asc.ui',
    'placeholders.img',
    'ui.sortable'
  ]
);

annaSquaresApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.

  // *** Homepage app routes ***
  // Route for homepage app
  when('/', {
    templateUrl : '../../views_build/homepage/index.html',
    controller  : 'homepageController'
  }).

  // *** Schedules app routes ***
  // GET /schedules (List all schedules)
  when('/schedules', {
    templateUrl : '../../views_build/schedules/index.html',
    controller  : 'schedulesController'
  }).

  // *** Tasks app routes ***
  // GET /tasks (List all tasks)

  // *** User app routes ***
  // Route for user app - signup (new user registration)
  // when('/signup', {
  //   templateUrl : '../../views_build/user/signup.html',
  //   controller  : 'signupController'
  // }).

  // Route for user app - signin (existing user login)
  when('/signin', {
    templateUrl : '../../views_build/user/signin.html',
    controller  : 'signinController'
  }).

  // Route for user app - signout
  when('/signout', {
    templateUrl : '../../views_build/user/signout.html',
    controller  : 'signoutController'
  }).

  // Route for patients app
  when('/tasks', {
    templateUrl : '../../views_build/tasks/index.html',
    controller  : 'tasksController'
  }).

  // Default route
  otherwise({
    redirectTo: '/'
  });
}]);

//Setting HTML5 Location Mode
annaSquaresApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);