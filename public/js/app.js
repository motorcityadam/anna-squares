/*jshint -W079 */

'use strict';

var annaSquaresApp = angular.module('annaSquaresApp',
  [
    'ngRoute',
    'ngResource',
    'ngRoute',
    'ui.route',
    'placeholders.img'
  ]
);

annaSquaresApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.

  // Route for schedules app
  when('/', {
    templateUrl : '../../views_build/schedules/index.html',
    controller  : 'schedulesController'
  }).

  // Route for user app - signup (new user registration)
  // when('/signup', {
  //   templateUrl : '../../views_build/user/signup.html',
  //   controller  : 'signupController'
  // }).

  // Route for user app - signin (existing user login)
  // when('/signin', {
  //   templateUrl : '../../views_build/user/signin.html',
  //   controller  : 'signinController'
  // }).

  // Route for user app - signin (existing user login)
  // when('/signout', {
  //   templateUrl : '../../views_build/user/signout.html',
  //   controller  : 'signoutController'
  // }).

  // Route for patients app
  when('/patients', {
    templateUrl : '../../views_build/patients/index.html',
    controller  : 'patientsController'
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