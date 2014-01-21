/*global
 expect:false,
 inject:false
 */
'use strict';

describe('directives', function() {
  beforeEach(module('anna-squares'));

  describe('NavCtrl', function() {
    var $rootScope, $scope, $location, Auth, createController;

    beforeEach(inject(function($injector) {
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();

      var Auth = $injector.get('Auth');

      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('NavCtrl', {
          '$scope': $scope
        });
      };
    }));

    it('should have a method to check if the path is active', function() {
      createController();
    });
  });
});