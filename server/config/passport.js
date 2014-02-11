'use strict';

var mongoose           = require('mongoose')
    , LocalStrategy    = require('passport-local').Strategy
    , TwitterStrategy  = require('passport-twitter').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , GitHubStrategy = require('passport-github').Strategy
    , LinkedInStrategy = require('passport-linkedin').Strategy;

var User = mongoose.model('User')
    , config = require('./config');


module.exports = {

  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  },

  // Use local strategy
  localStrategy: function() {
    return new LocalStrategy(
      function(username, password, done) {
        User.findOne({
          username: username
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, {
              message: 'Incorrect username.'
            });
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }
          return done(null, user);
        });
      }
    );
  },

  twitterStrategy: function() {
    return new TwitterStrategy({
        consumerKey: config.twitter.consumerID,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL
      },
      function(token, tokenSecret, profile, done) {
        User.findOne({
          'twitter.id_str': profile.id
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              username: profile.username,
              provider: 'twitter',
              twitter: profile._json
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
      }
    );
  },

  facebookStrategy: function() {
    return new FacebookStrategy({
        clientID: config.facebook.appID,
        clientSecret: config.facebook.appSecret,
        callbackURL: config.facebook.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
          'facebook.id': profile.id
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: 'facebook',
              facebook: profile._json
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
      }
    );
  },

  githubStrategy: function() {
    return new GitHubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
          'github.id': profile.id
        }, function(err, user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: 'github',
              github: profile._json
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
      }
    );
  },

  googleStrategy: function() {
    return new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
          'google.id': profile.id
        }, function(err, user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.username,
              provider: 'google',
              google: profile._json
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
      }
    );
  },

  linkedInStrategy: function() {
    return new LinkedInStrategy({
        consumerKey: config.linkedin.consumerKey,
        consumerSecret: config.linkedin.consumerSecret,
        callbackURL: config.linkedin.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'email-address']
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({
          'linkedin.id': profile.id
        }, function (err, user) {
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              username: profile.emails[0].value,
              provider: 'linkedin'
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            return done(err, user);
          }
        });
      }
    );
  }
};