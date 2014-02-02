/*! anna-squares - v0.1.7 - 2014-02-02
 * Copyright (c) 2014 Adam Joseph Cook <acook@alliedstrand.com>;
 * Licensed under MIT
 */
/*global
  angular:false,
  routingConfig:false
*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares',
        ['ngCookies', 'ngRoute', 'restangular', 'asc.ui', 'placeholders.img', 'ui.sortable'])

.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

  var access = routingConfig.userRoles;

  $routeProvider.when('/',
    {
      templateUrl:    'home',
      controller:     'HomeCtrl',
      access:         access.public
    });
  $routeProvider.when('/signin',
    {
      templateUrl:    'signin',
      controller:     'SigninCtrl',
      access:         access.public
    });
  $routeProvider.when('/register',
    {
      templateUrl:    'register',
      controller:     'RegisterCtrl',
      access:         access.public
    });
  $routeProvider.when('/:username/schedules',
    {
      templateUrl:    'schedules',
      controller:     'SchedulesCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/feedback',
    {
      templateUrl:    'feedback',
      controller:     'FeedbackCtrl',
      access:         access.user
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
  $routeProvider.when('/:username',
    {
      templateUrl:    'dashboard',
      controller:     'DashboardCtrl',
      access:         access.user
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

    $rootScope.success = null;
    $rootScope.info = null;
    $rootScope.warning = null;
    $rootScope.danger = null;

    if (!Auth.authorize(next.access)) {
      if(!Auth.isSignedIn()) $location.path('/signin');
    }

  });

}]);
/*global angular:false*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.username = $scope.user.username;

    $scope.signout = function() {
      Auth.signout(function() {
        $location.path('/signin');
      }, function() {
        $rootScope.danger = 'Failed to sign out.';
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

      $scope.signin = function() {
        Auth.signin({
          username: $scope.username,
          password: $scope.password
        },
        function(res) {
          $location.path('/' + Auth.user.username);
        },
        function(err) {
          $rootScope.danger = 'Failed to sign in.';
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

      $scope.register = function() {
        Auth.register({
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          passwordConfirmation: $scope.passwordConfirmation
        },
        function(message) {
          $location.path('/signin');
          $rootScope.success = message;
        },
        function(err) {
          $rootScope.danger = err;
        });
      };
    }]);

angular.module('anna-squares')
  .controller('DashboardCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

      }]);

angular.module('anna-squares')
  .controller('SchedulesCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

      }]);

angular.module('anna-squares')
  .controller('FeedbackCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth',
      function($rootScope, $scope, $routeParams, $location, Auth) {

        if (!Auth.checkUsername($routeParams.username)) $location.path('/404');

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

angular.module('anna-squares').directive('activeNav', ['$location', '$timeout', function($location, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function() {
        console.log(element.find('a'));
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

    var userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined) {
          role = currentUser.role;
        }

        return accessLevel.bitMask & role.bitMask;
      },
      isSignedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      checkUsername: function(username) {
        if (username === currentUser.username) return true;
      },
      register: function(user, success, error) {
        $http
          .post('/users', user)
          .success(function(res) {
            success(res);
          })
          .error(error);
      },
      signin: function(user, success, error) {
        $http
          .post('/signin', user)
          .success(function(user){
            changeUser(user);
            success(user);
          })
          .error(error);
      },
      signout: function(success, error) {
        $http
          .post('/signout')
          .success(function(){
            changeUser({
              username: '',
              role: userRoles.public
            });
            success();
          })
          .error(error);
      },
      userRoles: userRoles,
      user: currentUser
    };
  });
