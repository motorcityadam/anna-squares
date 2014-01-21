/*! anna-squares - v0.1.7 - 2014-01-21
 * Copyright (c) 2014 Adam Joseph Cook <acook@alliedstrand.com>;
 * Licensed under MIT
 */
/*global
  angular:false,
  routingConfig:false
*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares', ['ngCookies', 'ngRoute', 'asc.ui', 'placeholders.img', 'ui.sortable'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {

      var access = routingConfig.accessLevels;

      $routeProvider.when('/',
        {
          templateUrl:    'home',
          controller:     'HomeCtrl',
          access:         access.anon
        });
      $routeProvider.when('/dashboard',
        {
          templateUrl:    'dashboard',
          controller:     'DashboardCtrl',
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
      $routeProvider.when('/schedules',
        {
          templateUrl:    'schedules',
          controller:     'SchedulesCtrl',
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
/*global angular:false*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares')
    .directive('accessLevel', ['Auth', function(Auth) {
      return {
        restrict: 'A',
        link: function($scope, element, attrs) {
          var prevDisp = element.css('display')
              , userRole
              , accessLevel;

          $scope.user = Auth.user;
          $scope.$watch('user', function(user) {
            if(user.role)
              userRole = user.role;
            updateCSS();
          }, true);

          attrs.$observe('accessLevel', function(al) {
            if(al) accessLevel = $scope.$eval(al);
            updateCSS();
          });

          function updateCSS() {
            if(userRole && accessLevel) {
              if(!Auth.authorize(accessLevel, userRole))
                element.css('display', 'none');
              else
                element.css('display', prevDisp);
            }
          }
        }
      };
    }]);

angular.module('anna-squares').directive('activeNav', ['$location', function($location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var nestedA = element.find('a')[0];
      var path = nestedA.href;

      scope.location = $location;
      scope.$watch('location.absUrl()', function(newPath) {
        if (path === newPath) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }

  };

}]);

// TODO: The 'matchField' directive needs tests!
angular.module('anna-squares').directive('matchField', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var otherInput = elem.inheritedData('$formController')[attrs.matchField];

      ctrl.$parsers.push(function(value) {
        if(value === otherInput.$viewValue) {
          ctrl.$setValidity('match', true);
          return value;
        }
        ctrl.$setValidity('match', false);
      });

      otherInput.$parsers.push(function(value) {
        ctrl.$setValidity('match', value === ctrl.$viewValue);
        return value;
      });
    }
  };
});


/*global
  angular:false,
  routingConfig:false,
  _:false
*/
'use strict';

angular.module('anna-squares')
  .factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined)
          role = currentUser.role;

        return accessLevel.bitMask & role.bitMask;
      },
      isSignedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/register', user).success(function(res) {
          changeUser(res);
          success();
        }).error(error);
      },
      signin: function(user, success, error) {
        $http.post('/signin', user).success(function(user){
          changeUser(user);
          success(user);
        }).error(error);
      },
      signout: function(success, error) {
        $http.post('/signout').success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });

angular.module('anna-squares')
    .factory('Users', function($http) {
      return {
        getAll: function(success, error) {
          $http.get('/users').success(success).error(error);
        }
      };
    });
