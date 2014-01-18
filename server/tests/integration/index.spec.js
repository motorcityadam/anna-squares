/*jshint unused: vars */
var app            = require('../../server')
    , request      = require('supertest')
    , passportStub = require('passport-stub');

passportStub.install(app);

// Test user account 1
// Username valid
// Email valid
// Password valid
//   - At least 7 characters in length
//   - Contains a lowercase letter
//   - Contains an uppercase letter
//   - Contains a numeral (no special characters)
// Confirmation password valid - matches password
// Role valid - 'user' role
var user1 = {
  'username':         'newUser1',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'as456Rt',
  'confirm_password': 'as456Rt'
};

// Test user account 2
// Username valid - contains a dash
// Email valid
// Password valid
//   - At least 7 characters in length
//   - Contains a lowercase letter
//   - Contains an uppercase letter
//   - Contains a special character (no numerals)
// Confirmation password valid - matches password
// Role valid - 'user' role
var user2 = {
  'username':         'new-User2',
  'email':            'acook@alliedstrand.co',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'aS#$%rt',
  'confirm_password': 'aS#$%rt'
};

// Test user account 3
// Username valid - ends with single a dash
// Email valid
// Password valid
//   - At least 7 characters in length
//   - Contains a lowercase letter
//   - Contains an uppercase letter
//   - Contains a special character and a numeral
// Confirmation password valid - matches password
// Role valid - 'user' role
var user3 = {
  'username':         'newUser3',
  'email':            'acook@alliedstrand.io',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'Aq#0%Rt',
  'confirm_password': 'Aq#0%Rt'
};

// Test user account 4
// Username valid
// Email valid
// Password invalid
//  - Is NOT at least 7 characters in length
// Confirmation password valid - matches password
// Role valid - 'user' role
var user4 = {
  'username':         'newUser4',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'as456R',
  'confirm_password': 'as456R'
};

// Test user account 5
// Username valid
// Email valid
// Password invalid
//  - Does NOT contain a lowercase letter
// Confirmation password valid - matches password
// Role valid - 'user' role
var user5 = {
  'username':         'newUser5',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'QW45ET6',
  'confirm_password': 'QW45ET6'
};

// Test user account 6
// Username valid
// Email valid
// Password invalid
//  - Does NOT contain a uppercase letter
// Confirmation password valid - matches password
// Role valid - 'user' role
var user6 = {
  'username':         'newUser6',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'bn4ert54yu',
  'confirm_password': 'bn4ert54yu'
};

// Test user account 7
// Username valid
// Email valid
// Password invalid
//  - Does NOT contain a numeral or special character
// Confirmation password valid - matches password
// Role valid - 'user' role
var user7 = {
  'username':         'newUser7',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'vhFgtYswEy',
  'confirm_password': 'vhFgtYswEy'
};

// Test user account 8
// Username valid
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role invalid - no role
var user8 = {
  'username':         'newUser8',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'confirm_password': 'aS#$%rt'
};

// Test user account 9
// Username valid
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role invalid - bad title
var user9 = {
  'username':         'newUser9',
  'password':         'aS#$%rt',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'something' },
  'confirm_password': 'aS#$%rt'
};

// Test user account 10
// Username invalid - no username
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user10 = {
  'username':         '',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'role':             { bitMask: 2, title: 'user' },
  'confirm_password': 'aS#$%rt'
};

// Test user account 11
// Username invalid - starts with a dash
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user11 = {
  'username':         '-newUser11',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'role':             { bitMask: 2, title: 'user' },
  'confirm_password': 'aS#$%rt'
};

// Test user account 12
// Username invalid - too long
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user12 = {
  'username':         'kfajsfoiwahojnsavodianidajdkajlkfiodsajfaskfjaweiofnaweiocnaosdsjgklsdjgksfdj',
  'password':         'aS#$%rt',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'confirm_password': 'aS#$%rt'
};

// Test user account 13
// Username invalid - start with a space
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user13 = {
  'username':         ' newUser13',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'role':             { bitMask: 2, title: 'user' },
  'confirm_password': 'aS#$%rt'
};

// Test user account 14
// Username invalid - contains special characters (besides a dash)
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user14 = {
  'username': 'new_Use.r14',
  'email':            'acook@alliedstrand.com',
  'password': 'aS#$%rt',
  'confirm_password': 'aS#$%rt',
  'role': { bitMask: 2, title: 'user' }
};

// Test user account 15
// Username valid - contains multiple dashes
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user15 = {
  'username':         'new-----User15',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'confirm_password': 'aS#$%rt',
  'role':             { bitMask: 2, title: 'user' }
};

// Test user account 16
// Username valid - ends with single a dash
// Email valid
// Password valid
//   - At least 7 characters in length
//   - Contains a lowercase letter
//   - Contains an uppercase letter
//   - Contains a special character and a numeral
// Confirmation password valid - matches password
// Role valid - 'user' role
var user16 = {
  'username':         'newUser16-',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 2, title: 'user' },
  'password':         'Aq#0%Rt',
  'confirm_password': 'Aq#0%Rt'
};

// Test user account 17
// Username invalid - ends with multiple dashes
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role valid
var user17 = {
  'username': 'newUser17---------------',
  'email':            'acook@alliedstrand.com',
  'password':         'aS#$%rt',
  'role':             { bitMask: 2, title: 'user' },
  'confirm_password': 'aS#$%rt'
};

// Test admin account
// Username valid
// Email valid
// Password valid
// Confirmation password valid - matches password
// Role invalid - 'admin' role
var admin = {
  'username':         'adminUser',
  'email':            'acook@alliedstrand.com',
  'role':             { bitMask: 4, title: 'admin' },
  'password':         'as456Rt',
  'confirm_password':         'as456Rt',
};

describe('Server Integration Tests - ', function (done) {
  afterEach(function() {
    passportStub.logout(); // Logout after each test
  });
  it('Homepage - Return a 200', function(done) {
    request(app).get('/').expect(200, done);
  });
  it('Logout - Return a 200', function(done) {
    request(app).post('/logout').expect(200, done);
  });
  it('As a Logout user, on /users - Return a 403', function(done) {
    request(app).get('/users').expect(403, done);
  });
  it('Register a new user (password contains a numeral) - Return a 200', function(done) {
    request(app).post('/register').send(user1).expect(200, done);
  });
  it('Register the same user twice - Return a 403', function(done) {
    request(app).post('/register').send(user1).expect(403, done);
  });
  it('Register a new user (username has dash, password has a special character) - Return a 200', function(done) {
    request(app).post('/register').send(user2).expect(200, done);
  });
  it('Register a new user (password has numeral and special character) - Return a 200', function(done) {
    request(app).post('/register').send(user3).expect(200, done);
  });
  it('Register a new user (password too short) - Return a 400', function(done) {
    request(app).post('/register').send(user4).expect(400, done);
  });
  it('Register a new user (password has no lowercase) - Return a 400', function(done) {
    request(app).post('/register').send(user5).expect(400, done);
  });
  it('Register a new user (password has no uppercase) - Return a 400', function(done) {
    request(app).post('/register').send(user6).expect(400, done);
  });
  it('Register a new user (password has no numeral and special character) - Return a 400', function(done) {
    request(app).post('/register').send(user7).expect(400, done);
  });
  it('Register a new user (no role) - Return a 400', function(done) {
    request(app).post('/register').send(user8).expect(400, done);
  });
  it('Register a new user (malformed role) - Return a 400', function(done) {
    request(app).post('/register').send(user9).expect(400, done);
  });
  it('Register a new user (no username) - Return a 400', function(done) {
    request(app).post('/register').send(user10).expect(400, done);
  });
  it('Register a new user (username starts with dash) - Return a 400', function(done) {
    request(app).post('/register').send(user11).expect(400, done);
  });
  it('Register a new user (username too long) - Return a 400', function(done) {
    request(app).post('/register').send(user12).expect(400, done);
  });
  it('Register a new user (username starts with a space) - Return a 400', function(done) {
    request(app).post('/register').send(user13).expect(400, done);
  });
  it('Register a new user (username has special characters that are not a dash) - Return a 400', function(done) {
    request(app).post('/register').send(user14).expect(400, done);
  });
  it('Register a new user (username has multiple dashes) - Return a 200', function(done) {
    request(app).post('/register').send(user15).expect(200, done);
  });
  it('Register a new user (username ends with a single dash) - Return a 200', function(done) {
    request(app).post('/register').send(user16).expect(200, done);
  });
  it('Register a new user (username ends with multiple dashes) - Return a 200', function(done) {
    request(app).post('/register').send(user17).expect(200, done);
  });
  it('Register a new admin user role through public /register - Return a 400', function(done) {
    request(app).post('/register').send(admin).expect(400, done);
  });
  it('Login as user - Return a 200', function(done) {
    request(app).post('/login').send(user1).expect(200, done);
  });
  it('As a non-admin user, tries to access /users - Return a 403', function(done) {
    passportStub.login(user1); // Login as user
    request(app).get('/users').expect(403, done);
  });

  // TODO: Add tests for invalid email and non-matching password and confirm_password.
});