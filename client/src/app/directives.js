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
