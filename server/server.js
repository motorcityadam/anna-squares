var express    = require('express')
    , http     = require('http')
    , passport = require('passport')
    , path     = require('path')
    , helpers  = require('view-helpers');

var User     = require('./models/User.js')
    , config = require('./config/config');

var app = module.exports = express();
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
  express.cookieSession({
    secret: config.cookieSecret
  })
);

app.use(express.csrf());

app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(helpers(config.app.name));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
passport.use(User.twitterStrategy());
passport.use(User.facebookStrategy());
passport.use(User.googleStrategy());
passport.use(User.linkedInStrategy());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

require('./routes.js')(app);

app.set('port', config.port);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
});