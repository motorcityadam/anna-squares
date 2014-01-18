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

angular.module('anna-squares').directive('matchField', [function () {
  return {
    restrict: 'A',
    scope: true,
    require: 'ngModel',
    link: function (scope, elem, attrs, control) {
      // Instruct directive to ignore input fields where the as-match-field attribute is empty.
      if (attrs.matchField === '') return;

      var checker = function () {
        // Store the value of the input field where the as-match-field attribute is not empty.
        var e1 = scope.$eval(attrs.ngModel);

        // Store the value of model assigned to the directive attribute.
        var e2 = scope.$eval(attrs.matchField);
        return e1 === e2;
      };

      // Set the match error key appropriately dependent on what checker() returns.
      scope.$watch(checker, function (n) {
        control.$setValidity('matchField', n);
      });
    }
  };
}]);