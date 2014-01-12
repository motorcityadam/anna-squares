/*! anna-squares - v0.1.7 - 11-01-2014 */
"use strict";

angular.module("anna-squares").controller("NavCtrl", [ "$rootScope", "$scope", "$location", "Auth", function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.logout = function() {
        Auth.logout(function() {
            $location.path("/login");
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
} ]);

angular.module("anna-squares").controller("SidebarController", [ "$rootScope", "$scope", "$location", "Auth", function($rootScope, $scope, $location, Auth) {} ]);

angular.module("anna-squares").controller("LoginCtrl", [ "$rootScope", "$scope", "$location", "$window", "Auth", function($rootScope, $scope, $location, $window, Auth) {
    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberme
        }, function(res) {
            $location.path("/");
        }, function(err) {
            $rootScope.error = "Failed to login";
        });
    };
    $scope.loginOauth = function(provider) {
        $window.location.href = "/auth/" + provider;
    };
} ]);

angular.module("anna-squares").controller("HomeCtrl", [ "$rootScope", function($rootScope) {} ]);

angular.module("anna-squares").controller("RegisterCtrl", [ "$rootScope", "$scope", "$location", "Auth", function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;
    $scope.register = function() {
        Auth.register({
            username: $scope.username,
            password: $scope.password,
            role: $scope.userRoles.user
        }, function() {
            $location.path("/");
        }, function(err) {
            $rootScope.error = err;
        });
    };
} ]);

angular.module("anna-squares").controller("PrivateCtrl", [ "$rootScope", function($rootScope) {} ]);

angular.module("anna-squares").controller("AdminCtrl", [ "$rootScope", "$scope", "Users", "Auth", function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;
    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });
} ]);