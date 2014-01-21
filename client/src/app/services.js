/*global
  angular:false,
  routingConfig:false,
  _:false
*/
'use strict';

angular.module('anna-squares')
  .factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined)
          role = currentUser.role;

        return accessLevel.bitMask & role.bitMask;
      },
      isSignedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      register: function(user, success, error) {
        $http.post('/register', user).success(function(res) {
          changeUser(res);
          success();
        }).error(error);
      },
      signin: function(user, success, error) {
        $http.post('/signin', user).success(function(user){
          changeUser(user);
          success(user);
        }).error(error);
      },
      signout: function(success, error) {
        $http.post('/signout').success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });

angular.module('anna-squares')
    .factory('Users', function($http) {
      return {
        getAll: function(success, error) {
          $http.get('/users').success(success).error(error);
        }
      };
    });
