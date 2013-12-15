// 'use strict';

// annaSquaresApp.directive('lsMatch', ['$timeout', function(timer) {

//   return {
//     require: 'ngModel',
//     link: function (scope, elem, attrs, ctrl) {
//       var run = function () {
//         var firstField = '#' + attrs.lsMatch;
//         elem.add(firstField).on('keyup', function () {
//           scope.$apply(function () {
//             var v = elem.val()===$(firstField).val();
//             ctrl.$setValidity('match', v);
//           });
//         });
//       };
//       timer(run, 0);
//     }
//   };

// }]);