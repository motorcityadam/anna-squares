/*! anna-squares - v0.1.7 - 04-01-2014 */
"use strict";

var annaSquaresApp = angular.module("annaSquaresApp", [ "ngRoute", "ngResource", "ngRoute", "ui.route", "asc.ui", "placeholders.img", "ui.sortable" ]);

annaSquaresApp.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "../../views_build/homepage/index.html",
        controller: "homepageController"
    }).when("/schedules", {
        templateUrl: "../../views_build/schedules/index.html",
        controller: "schedulesController"
    }).when("/signup", {
        templateUrl: "../../views_build/user/signup.html",
        controller: "signupController"
    }).when("/signin", {
        templateUrl: "../../views_build/user/signin.html",
        controller: "signinController"
    }).when("/signout", {
        templateUrl: "../../views_build/user/signout.html",
        controller: "signoutController"
    }).when("/feedback", {
        templateUrl: "../../views_build/feedback/index.html",
        controller: "feedbackController"
    }).otherwise({
        redirectTo: "/"
    });
} ]);

annaSquaresApp.config([ "$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix("!");
} ]);