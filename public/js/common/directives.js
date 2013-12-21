'use strict';

annaSquaresApp.directive('asFocus', function ($timeout) {
  return function (scope, elem, attr) {
    $timeout(function () {
      console.log(elem);
      console.log(attr);
      elem[0].focus();
    }, 0, false);
  };
});