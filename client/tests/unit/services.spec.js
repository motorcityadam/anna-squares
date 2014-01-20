/*global
 _:false,
 expect:false,
 inject:false
 */
'use strict';

describe('services', function() {
  var Auth;
  var $httpBackend;

  // you need to indicate your module in a test
  beforeEach(function() {
    module('anna-squares');
  });

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Auth', function() {
    describe('instantiate', function() {
      it('should have isSignedIn function', function() {
        expect(Auth.isSignedIn).toBeDefined();
        expect(_.isFunction(Auth.isSignedIn)).toEqual(true);
      });

      it('should have authorize function', function() {
        expect(Auth.authorize).toBeDefined();
        expect(_.isFunction(Auth.authorize)).toEqual(true);
      });

      it('should have signin function', function() {
        expect(Auth.signin).toBeDefined();
        expect(_.isFunction(Auth.signin)).toEqual(true);
      });

      it('should have signout function', function() {
        expect(Auth.signout).toBeDefined();
        expect(_.isFunction(Auth.signout)).toEqual(true);
      });

      it('should have register function', function() {
        expect(Auth.register).toBeDefined();
        expect(_.isFunction(Auth.register)).toEqual(true);
      });

      it('should have the user object', function() {
        expect(Auth.user).toBeDefined();
        expect(_.isObject(Auth.user)).toEqual(true);
      });

      it('should have the userRoles object', function() {
        expect(Auth.userRoles).toBeDefined();
        expect(_.isObject(Auth.userRoles)).toEqual(true);
      });

      it('should have the accessLevels object', function() {
        expect(Auth.accessLevels).toBeDefined();
        expect(_.isObject(Auth.accessLevels)).toEqual(true);
      });

      it('should set the user object with no name and public role', function() {
        expect(Auth.user).toEqual({ username: '', role: Auth.userRoles.public });
      });
    });

    describe('authorize', function() {
      it('should return 0 when role not recognized', function() {
        expect(Auth.authorize('foo')).toEqual(0);
      });

      it('should return 1 when role is recognized', function() {
        var accessLevels = { bitMask: 1 };
        var role = { bitMask: 1 };
        expect(Auth.authorize(accessLevels, role)).toEqual(1);
      });

      it('should return 0 when role is omitted and not equal', function() {
        var accessLevels = { bitMask: 0 };
        expect(Auth.user.role.bitMask).toEqual(1);
        expect(Auth.authorize(accessLevels)).toEqual(0);
      });

      it('should return 1 when role is omitted but equal', function() {
        var accessLevels = { bitMask: 1 };
        expect(Auth.user.role.bitMask).toEqual(1);
        expect(Auth.authorize(accessLevels)).toEqual(1);
      });
    });

    describe('isSignedIn', function() {
      it('should use the currentUser when use omitted', function() {
        // current user has role public
        expect(Auth.isSignedIn()).toEqual(false);
      });

      it('should return false when user has role public', function() {
        var user = { role: { title: 'public' } };
        expect(Auth.isSignedIn(user)).toEqual(false);
      });

      it('should return true when user has role user', function() {
        var user = { role: { title: 'user' } };
        expect(Auth.isSignedIn(user)).toEqual(true);
      });

      it('should return true when user has role admin', function() {
        var user = { role: { title: 'admin' } };
        expect(Auth.isSignedIn(user)).toEqual(true);
      });
    });

    describe('register', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/register').respond();
        Auth.register({}, success, error);
        $httpBackend.flush();
        expect(invoked).toEqual(true);
      });

      it('should append the user', function() {
        var success = function() {};
        var error = function() {};
        $httpBackend.expectPOST('/register').respond({ 'user': 'foo' });
        Auth.register({}, success, error);
        $httpBackend.flush();
        expect(Auth.user).toEqual({ username : '', role : { bitMask : 1, title : 'public' }, user : 'foo' });
      });
    });

    describe('signin', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/signin').respond();
        Auth.signin({}, success, error);
        $httpBackend.flush();
        expect(invoked).toEqual(true);
      });

      it('should append the user', function() {
        var success = function() {};
        var error = function() {};
        $httpBackend.expectPOST('/signin').respond({ 'user': 'bar' });
        Auth.signin({}, success, error);
        $httpBackend.flush();
        expect(Auth.user).toEqual({ username : '', role : { bitMask : 1, title : 'public' }, user : 'bar' });
      });
    });

    describe('signout', function() {
      it('should make a request and invoke callback', function() {
        var invoked = false;
        var success = function() {
          invoked = true;
        };
        var error = function() {};
        $httpBackend.expectPOST('/signout').respond();
        Auth.signout(success, error);
        $httpBackend.flush();
        expect(invoked).toEqual(true);
      });
    });
  });
});