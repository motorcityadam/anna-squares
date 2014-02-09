/*global
  angular:false,
  routingConfig:false,
  _:false
*/
'use strict';

angular.module('anna-squares')
  .factory('Auth', function($http, $cookieStore){

    var accessLevels  = routingConfig.accessLevels
        , userRoles   = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined) {
          role = currentUser.role;
        }

        return accessLevel.bitMask & role.bitMask;
      },
      isSignedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      checkUsername: function(username) {
        if (username === currentUser.username) return true;
      },
      register: function(user, success, error) {
        $http
          .post('/users', user)
          .success(function(res) {
            success(res);
          })
          .error(error);
      },
      signin: function(user, success, error) {
        $http
          .post('/signin', user)
          .success(function(user){
            changeUser(user);
            success(user);
          })
          .error(error);
      },
      signout: function(success, error) {
        $http
          .post('/signout')
          .success(function(){
            changeUser({
              username: '',
              role: userRoles.public
            });
            success();
          })
          .error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });

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


angular.module('anna-squares')
  .factory('requestCommunicationChannel', ['$rootScope', function ($rootScope) {

    var _EDIT_DATA_ = '_EDIT_DATA_';
    var _DATA_UPDATED_ = '_DATA_UPDATED_';

    // Publish edit data notification
    var editData = function (item) {
      $rootScope.$broadcast(_EDIT_DATA_, {item: item});
    };

    // Subscribe to edit data notification
    var onEditData = function($scope, handler) {
      $scope.$on(_EDIT_DATA_, function(event, args) {
        handler(args.item);
      });
    };

    // Publish data changed notification
    var dataUpdated = function () {
      $rootScope.$broadcast(_DATA_UPDATED_);
    };

    // Subscribe to data changed notification
    var onDataUpdated = function ($scope, handler) {
      $scope.$on(_DATA_UPDATED_, function (event) {
        handler();
      });
    };

    return {
      editData      : editData,
      onEditData    : onEditData,
      dataUpdated   : dataUpdated,
      onDataUpdated : onDataUpdated
    };
  }]);

// Define the data service for application toolbars
angular.module('anna-squares')
  .factory('toolbarService', ['requestCommunicationChannel', function (requestCommunicationChannel) {
    var items = [
      {'_id': { '$oid': '50ae677361d118e3646d7d6c'},
        'name': 'New Schedule...',
        'icon': 'fa fa-plus',
        'action': '#',
        'show': true
      },
      {'_id': { '$oid': '50ae677361d118e3646d7d6d'},
        'name': 'Edit Schedule',
        'icon': 'fa fa-edit',
        'action': '#',
        'show': true
      }
    ];

    // Sends notification that data has been updated
    var saveItem = function(item) {
      requestCommunicationChannel.dataUpdated();
    };

    // Removes the item from the array and sends a notification that data has been updated
    var deleteItem = function(item) {
      for(var i = 0; i < items.length; i++) {
        if(items[i]._id.$oid === item._id.$oid) {
          items.splice(i, 1);
          requestCommunicationChannel.dataUpdated();
          return;
        }
      }
    };

    // Removes the all items from the array and sends a notification that data has been updated
    var deleteItems = function() {
      items.length = 0;
      requestCommunicationChannel.dataUpdated();
      return;
    };

    // Internal function to generate a random number GUID generation
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    // Generates a GUID for adding items to array
    var guid = function () {
      return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0,3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    };

    // Function to add a item to the array and sends a notification that data has been updated
    var addItem = function(item) {
      items.id.$oid = guid();
      items.push(item);
      requestCommunicationChannel.dataUpdated();
    };

    // Returns the array of items
    var getItems = function() {
      return items;
    };

    // Returns a specific item with the given ID
    var getItem = function(id) {
      for(var i = 0; i < items.length; i++) {
        if(items[i]._id.$oid === id) {
          return items[i];
        }
      }
    };

    return {
      getItems    : getItems,
      getItem     : getItem,
      saveItem    : saveItem,
      deleteItems : deleteItems,
      deleteItem  : deleteItem,
      addItem     : addItem
    };
  }]);
