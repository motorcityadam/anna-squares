/*! anna-squares - v0.1.7 - 09-01-2014 */
"use strict";

var app = angular.module("annaSquaresApp", [ "ngRoute", "ngResource", "ngRoute", "ui.route", "asc.ui", "placeholders.img", "ui.sortable", "angular-flash.service", "angular-flash.flash-alert-directive" ]);

app.config([ "$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "../../views_build/homepage/index.html",
        controller: "homepageController"
    }).when("/schedules", {
        templateUrl: "../../views_build/schedules/index.html",
        controller: "schedulesController"
    }).when("/signup", {
        templateUrl: "../../views_build/users/signup.html",
        controller: "signupController"
    }).when("/signin", {
        templateUrl: "../../views_build/users/signin.html",
        controller: "signinController"
    }).when("/signout", {
        templateUrl: "../../views_build/users/signout.html",
        controller: "signoutController"
    }).when("/feedback", {
        templateUrl: "../../views_build/feedback/index.html",
        controller: "feedbackController"
    }).otherwise({
        redirectTo: "/"
    });
} ]);

app.config([ "$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix("!");
} ]);

app.config(function(flashProvider) {
    flashProvider.errorClassnames.push("alert-danger");
    flashProvider.warnClassnames.push("alert-warning");
    flashProvider.infoClassnames.push("alert-info");
    flashProvider.successClassnames.push("alert-success");
});