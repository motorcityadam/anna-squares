angular.module('asc.ui.ascalert', [])

.controller('AscAlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = 'close' in $attrs;
}])

.directive('alert', function () {
  return {
    restrict:'EA',
    controller:'AscAlertController',
    templateUrl:'template/ascalert/ascalert.html',
    transclude:true,
    replace:true,
    scope: {
      type: '=',
      close: '&'
    }
  };
});
