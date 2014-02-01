'use strict';

var mongoose    = require('mongoose')
    , Schema    = mongoose.Schema
    , crypto    = require('crypto')
    , uuid      = require('node-uuid')
    , validator = require('validator');

var userRoles = require('../../client/dist/common').userRoles;

var UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: String,
  passwordResetToken: String,
  passwordResetExpiration: Date,
  emailConfirmationToken: {
    type: String,
    default: function() { return uuid.v4(); }
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true
  },
  isStaff: {
    type: Boolean,
    default: false,
    required: true
  },
  isSuperuser: {
    type: Boolean,
    default: false,
    required: true
  },
  url: String,
  company: String,
  location: String,
  createdDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  lastIPAddress: String,
  provider: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  gravatar: {}
});

/** Virtuals */
UserSchema.virtual('password')
  .get(function() {
    return this._password;
  })
  .set(function(value) {
    this._password = value;
    this.salt = this.makeSalt();
    this.passwordHash = this.encryptPassword(value);
  });

UserSchema.virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(value) {
    this._passwordConfirmation = value;
  });

UserSchema.virtual('role')
  .get(function() {
    return this.getRole();
  });

/** Validations. If the provider is external, let the provider handle the data validations. */
var validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.path('username').validate(function(username) {
  if (!(validator.isLength(username, 1, 39))) {
    this.invalidate('username', 'The username provided is too long (must be a maximum is 39 characters).');
  }

  if (!(validator.matches(username, /^[A-Za-z0-9]+(-*[A-Za-z0-9]+-*)*$/))) {
    this.invalidate(
        'username',
        'Username may only contain alphanumeric characters or dashes and cannot begin with a dash.');
  }

  if (this.isNew && !username) {
    this.invalidate('username', 'Username cannot be blank.');
  }
}, null);

UserSchema.path('email').validate(function(email) {
  if (!(validator.isEmail(email))) {
    this.invalidate('email', 'The e-mail address provided is invalid or malformed.');
  }

  if (!(validator.isLength(email, 1, 100))) {
    this.invalidate('email', 'The e-mail address provided is invalid or malformed.');
  }

  if (this.isNew && !this.email) {
    this.invalidate('password', 'Email address cannot be blank.');
  }
}, null);

UserSchema.path('passwordHash').validate(function() {
  if (this._password || this._passwordConfirmation) {
    if (!(validator.isLength(this._password, 7))) {
      this.invalidate('password', 'The password provided is too short (must be a minimum of 7 characters).');
    }

    if (!(validator.matches(this._password, /^(?=.{0,})(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z]).*$/))) {
      this.invalidate('password', 'The password provided does not conform with the complexity characteristics.');
    }

    if (this._password !== this._passwordConfirmation) {
      this.invalidate(
          'passwordConfirmation',
          'The password provided is too short (must be a minimum of 7 characters).');
    }
  }

  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password cannot be blank.');
  }
}, null);

/** Pre hooks */
UserSchema.pre('save', function(next, done) {
  var self = this;

  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.provider)
    done(new Error('Invalid password.'));

  mongoose.models.User.findOne({username : self.username},function(err, user) {
    if(err) {
      done(err);
    } else if(user) {
      self.invalidate('username', 'The username provided is already taken. Please choose another username.');
      done(new Error('The username provided is already taken. Please choose another username.'));
    } else {
      mongoose.models.User.findOne({email : self.email},function(err, email) {
        if(err) {
          done(err);
        } else if(email) {
          self.invalidate('email', 'The e-mail address provided is already associated with another account.');
          done(new Error('The e-mail address provided is already associated with another account.'));
        } else {
          next();
        }
      });
    }
  });

});

/** Methods */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.passwordHash;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  /**
   * Get role for user based on
   *
   * @return {{bitMask:Number, title:String}}
   * @api public
   */
  getRole: function() {
    if (this.isActive) {
      if (this.isStaff && this.isSuperuser) return userRoles.admin;
      else return userRoles.user;
    }
  }
};

module.exports = mongoose.model('User', UserSchema);