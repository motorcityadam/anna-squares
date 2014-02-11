/*global
 angular:false
 */
angular.module('anna-squares')
  .factory('Schedule', function($http){

    return {
      getAll: function(success, error) {
        $http
            .get('/schedules')
            .success(success)
            .error(error);
      },
      postNew: function(schedule, success, error) {
        $http
            .post('/schedule/new', schedule)
            .success(function(schedule){
              success(schedule);
            })
            .error(error);
      }
    };
  });