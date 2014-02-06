var express      = require('express')
    , http       = require('http')
    , passport   = require('passport')
    , path       = require('path')
    , helpers    = require('view-helpers')
    , mongoose   = require('mongoose')
    , mongoStore = require('connect-mongo')(express);

// Require application models
require('./models/User.js');
require('./models/Schedule.js');

var config           = require('./config/config')
    , configPassport = require('./config/passport');

var app = module.exports = express();
var connectMongoose = function (connStr) {
  return(
    mongoose.connect(connStr, function (err) {
      if (err) throw err;
      console.log('');
      console.log('########################');
      console.log('Successfully connected mongoose to MongoDB on ' + connStr);
    })
  );
};
var db = connectMongoose(config.db);
var rootDir = __dirname + '/../';

app.set('views', rootDir + 'client/views');
app.set('view engine', 'jade');
app.set('view options', {
  pretty: true
});

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(express.static(path.join(rootDir, 'client')));
app.use(
  express.session({
    secret: config.sessionSecret,
    store: new mongoStore({
      db: db.connection.db,
      collection: 'sessions'
    })
  })
);

app.configure('development', 'production', function() {
  app.use(express.csrf());
  app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrftoken = req.csrfToken();
    next();
  });
});

app.use(helpers(config.app.name));

app.use(passport.initialize());
app.use(passport.session());

passport.use(configPassport.localStrategy());
passport.use(configPassport.twitterStrategy());
passport.use(configPassport.facebookStrategy());
passport.use(configPassport.githubStrategy());
passport.use(configPassport.googleStrategy());
passport.use(configPassport.linkedInStrategy());

passport.serializeUser(configPassport.serializeUser);
passport.deserializeUser(configPassport.deserializeUser);

require('./routes.js')(app);

app.set('port', config.port);
http.createServer(app).listen(app.get('port'), function(){
  console.log('');
  console.log('########################');
  console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
});