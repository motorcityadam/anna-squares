app.directive('asOnTouch', function ($timeout) {

  return function (scope, elem, attrs) {
    $timeout(function () {
      elem.bind('touchstart', function(evt) {
        evt.target.focus();
      })
    }, 0, false);
  };

});

app.directive('asMatchField', [function () {
  return {
    restrict: 'A',
    scope: true,
    require: 'ngModel',
    link: function (scope, elem, attrs, control) {
      // Instruct directive to ignore input fields where the as-match-field attribute is empty.
      if (attrs.asMatchField === '') return;

      var checker = function () {
        // Store the value of the input field where the as-match-field attribute is not empty.
        var e1 = scope.$eval(attrs.ngModel);

        // Store the value of model assigned to the directive attribute.
        var e2 = scope.$eval(attrs.asMatchField);
        return e1 === e2;
      };

      // Set the match error key appropriately dependent on what checker() returns.
      scope.$watch(checker, function (n) {
        control.$setValidity('match', n);
      });
    }
  };
}]);
