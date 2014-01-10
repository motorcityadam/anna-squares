/*jshint -W079 */

'use strict';

var app = angular.module('annaSquaresApp',
  [
    'ngRoute',
    'ngResource',
    'ngRoute',
    'ui.route',
    'asc.ui',
    'placeholders.img',
    'ui.sortable',
    'angular-flash.service',
    'angular-flash.flash-alert-directive'
  ]
);

app.config(['$routeProvider', function($routeProvider) {
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

  // *** User app routes ***
  // Route for user app - signup (new user registration)
  when('/signup', {
     templateUrl : '../../views_build/users/signup.html',
     controller  : 'signupController'
  }).

  // Route for user app - signin (existing user login)
  when('/signin', {
    templateUrl : '../../views_build/users/signin.html',
    controller  : 'signinController'
  }).

  // Route for user app - signout
  when('/signout', {
    templateUrl : '../../views_build/users/signout.html',
    controller  : 'signoutController'
  }).

  // *** Feedback app routes ***
  // Route for feedback app
  when('/feedback', {
    templateUrl : '../../views_build/feedback/index.html',
    controller  : 'feedbackController'
  }).

  // Default route
  otherwise({
    redirectTo: '/'
  });
}]);

// Setting HTML5 Location Mode
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

// Setting angular-flash
app.config(function (flashProvider) {
  flashProvider.errorClassnames.push('alert-danger');
  flashProvider.warnClassnames.push('alert-warning');
  flashProvider.infoClassnames.push('alert-info');
  flashProvider.successClassnames.push('alert-success');
});