// 'use strict';

annaSquaresApp.directive('lsFocus', function ($timeout) {
  return function (scope, elem, attrs) {
    attrs.$observe('lsFocus', function (newVal) {
      if (newVal) {
        $timeout(function () {
          newVal === 'true' && elem[0].focus();
        }, 0, false);
      }
    });
  };
});