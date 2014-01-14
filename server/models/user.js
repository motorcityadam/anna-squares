var _                  = require('underscore')
    , LocalStrategy    = require('passport-local').Strategy
    , TwitterStrategy  = require('passport-twitter').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy   = require('passport-google').Strategy
    , LinkedInStrategy = require('passport-linkedin').Strategy
    , validator        = require('validator');

var userRoles = require('../../client/js_build/routingConfig').userRoles
    , config  = require('../../config/config');

var users = [
  {
    id:       1,
    username: 'user',
    password: '123',
    role:     userRoles.user
  },
  {
    id:        2,
    username: 'admin',
    password: '123',
    role:     userRoles.admin
  }
];

module.exports = {
  addUser: function(username, password, role, callback) {
    if(this.findByUsername(username) !== undefined)  return callback('UserAlreadyExists');

    // Clean up when 500 users reached
    if(users.length > 500) {
      users = users.slice(0, 2);
    }

    var user = {
      id:         _.max(users, function(user) { return user.id; }).id + 1,
      username:   username,
      password:   password,
      role:       role
    };
    users.push(user);
    callback(null, user);
  },

  findOrCreateOauthUser: function(provider, providerId) {
    var user = module.exports.findByProviderId(provider, providerId);
    if(!user) {
      user = {
        id: _.max(users, function(user) { return user.id; }).id + 1,
        username: provider + '_user', // Should keep Oauth users anonymous on demo site
        role: userRoles.user,
        provider: provider
      };
      user[provider] = providerId;
      users.push(user);
    }

    return user;
  },

  findAll: function() {
    return _.map(users, function(user) { return _.clone(user); });
  },

  findById: function(id) {
    return _.clone(_.find(users, function(user) { return user.id === id; }));
  },

  findByUsername: function(username) {
    return _.clone(_.find(users, function(user) { return user.username === username; }));
  },

  findByProviderId: function(provider, id) {
    return _.find(users, function(user) { return user[provider] === id; });
  },

  validate: function(user) {
    if (!(validator.isLength(user.username, 1, 39))) {
      throw new Error('The username provided is too long (must be a maximum is 39 characters).');
    }

    if (!(validator.matches(user.username, /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/))) {
      throw new Error('Username may only contain alphanumeric characters or dashes and cannot begin with a dash.');
    }

    if (!(validator.isLength(user.password, 7))) {
      throw new Error('The password provided is too short (must be a minimum of 7 characters).');
    }

    if (!(validator.matches(user.password, /^(?=.{0,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]|.*\\W).*$/))) {
      throw new Error('The password provided does not conform with the complexity characteristics.');
    }

    if (JSON.stringify(user.role) !== JSON.stringify(userRoles.user)) {
      throw new Error('The user role provided is invalid.');
    }
  },

  localStrategy: new LocalStrategy(
    function(username, password, done) {

      var user = module.exports.findByUsername(username);

      if(!user) {
        done(null, false, { message: 'Incorrect username.' });
      }
      else if(user.password !== password) {
        done(null, false, { message: 'Incorrect username.' });
      }
      else {
        return done(null, user);
      }

    }
  ),

  twitterStrategy: function() {
    if(!config.twitter.consumerID) {
      throw new Error('A Twitter Consumer Key is required if you want to enable login via Twitter.');
    }
    if(!config.twitter.consumerSecret) {
      throw new Error('A Twitter Consumer Secret is required if you want to enable login via Twitter.');
    }

    return new TwitterStrategy({
      consumerKey: config.twitter.consumerID,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL || 'http://localhost:8000/auth/twitter/callback'
    },
      function(token, tokenSecret, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
      });
  },

  facebookStrategy: function() {
    if(!config.facebook.appID) {
      throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');
    }
    if(!config.facebook.appSecret) {
      throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');
    }

    return new FacebookStrategy({
      clientID: config.facebook.appID,
      clientSecret: config.facebook.appSecret,
      callbackURL: config.facebook.callbackURL || 'http://localhost:8000/auth/facebook/callback'
    },
      function(accessToken, refreshToken, profile, done) {
        var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
        done(null, user);
      });
  },

  googleStrategy: function() {

    return new GoogleStrategy({
      returnURL: process.env.GOOGLE_RETURN_URL || 'http://localhost:8000/auth/google/return',
      realm: process.env.GOOGLE_REALM || 'http://localhost:8000/'
    },
      function(identifier, profile, done) {
        var user = module.exports.findOrCreateOauthUser('google', identifier);
        done(null, user);
      });
  },

  linkedInStrategy: function() {
    if(!config.linkedin.consumerKey) {
      throw new Error('A LinkedIn App Key is required if you want to enable login via LinkedIn.');
    }
    if(!config.linkedin.consumerSecret) {
      throw new Error('A LinkedIn App Secret is required if you want to enable login via LinkedIn.');
    }

    return new LinkedInStrategy({
      consumerKey: config.linkedin.consumerKey,
      consumerSecret: config.linkedin.consumerSecret,
      callbackURL: config.linkedin.callbackURL || 'http://localhost:8000/auth/linkedin/callback'
    },
      function(token, tokenSecret, profile, done) {
        var user = module.exports.findOrCreateOauthUser('linkedin', profile.id);
        done(null,user);
      }
    );
  },
  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    var user = module.exports.findById(id);

    if(user)    { done(null, user); }
    else        { done(null, false); }
  }
};