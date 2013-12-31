annaSquaresApp.directive('asOnTouch', function ($timeout) {
  return function (scope, elem, attrs) {
    $timeout(function () {
      elem.bind('touchstart', function(evt) {
        evt.target.focus();
      })
    }, 0, false);
  };
});