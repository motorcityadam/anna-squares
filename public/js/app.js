/*jshint -W079 */

'use strict';

var annaSquaresApp = angular.module('annaSquaresApp',
  [
    'ngRoute',
    'ngResource',
    'ngRoute',
    'ui.route',
    'ui.bootstrap',
    'ngGrid',
    'placeholders.img'
  ]
);

// ****** REST Layout (no user management) ******
// :schedule - schedule ID {String} - datecode hash (based on MM/DD/YYYY)
// :task     - task ID {String}     - SHA-1 hash of the task text
//
// *** Schedules app routes ***
// GET /schedules (List all schedules)
// POST /schedules (Create a new schedule)
// GET /schedules/:schedule (Retrieve a specific schedule)
// PATCH /schedules/:schedule (Edit an existing schedule)
// DELETE /schedules/:schedule (Delete an existing schedule)
//
// *** Tasks app routes ***
// GET /tasks (List all tasks)
// POST /tasks (Create a new task)
// GET /tasks/:task (Retrieve a specific task)
// PATCH /tasks/:task (Edit an existing task)
// DELETE /tasks/:task (Delete an existing task)
//
// ****** REST Layout (with user management) ******
// :user     - username {String}
// :schedule - schedule ID {String} - datecode hash (based on MM/DD/YYYY)
// :task     - task ID {String}     - SHA-1 hash of the task text
//
// *** Schedules app routes ***
// GET /:user/schedules (List all schedules for the currently logged in user)
// POST /:user/schedules (Create a new schedule for the currently logged in user)
// GET /:user/schedules/:schedule (Retrieve a specific schedule for the currently logged in user)
// PATCH /:user/schedules/:schedule (Edit an existing schedule for the currently logged in user)
// DELETE /:user/schedules/:schedule (Delete an existing schedule for the currently logged in user)
//
// *** Tasks app routes ***
// GET /:user/tasks (List all tasks for the currently logged in user)
// POST /:user/tasks (Create a new task for the currently logged in user)
// GET /:user/tasks/:task (Retrieve a specific task for the currently logged in user)
// PATCH /:user/tasks/:task (Edit an existing task for the currently logged in user)
// DELETE /:user/tasks/:task (Delete an existing task for the currently logged in user)
//

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