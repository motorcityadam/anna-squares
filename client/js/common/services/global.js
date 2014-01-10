// annaSquaresApp.factory('schedulesService', ['$rootScope', function ($rootScope) {
//   var service = {
//     model: {
//       name: '',
//       email: ''
//     },

//     SaveState: function () {
//       sessionStorage.userService = angular.toJson(service.model);
//     },

//     RestoreState: function () {
//       service.model = angular.fromJson(sessionStorage.userService);
//     }
//   }

//   $rootScope.$on("savestate", service.SaveState);
//   $rootScope.$on("restorestate", service.RestoreState);

//   return service;
// }]);

/*
app.factory('MessageService', function ($rootScope) {

  return {
    show: function (message) {
      $rootScope.message = message;
      return message;
    },
    clear: function () {
      $rootScope.message = '';
      return null;
    }
  };

});*/
