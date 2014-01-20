module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    // list of files / patterns to load in the browser
    files: [
      'lib/jquery/jquery.min.js',
      'lib/jquery-ui/ui/minified/jquery-ui.min.js',
      'lib/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
      'lib/bootstrap/dist/js/bootstrap.min.js',
      'lib/angular/angular.min.js',
      'lib/angular-route/angular-route.min.js',
      'lib/angular-cookies/angular-cookies.min.js',
      'lib/underscore/underscore-min.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/angular-asc-ui/dist/asc-ui-tpls.min.js',
      'lib/angular-ui-sortable/src/sortable.js',
      'lib/momentjs/min/moment.min.js',
      'dist/common.js',
      'dist/anna-squares.js',
      'tests/unit/**/*.spec.js'
    ],

    frameworks: ['jasmine'],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots' || 'progress'
    reporters: 'progress',

    // these are default values, just to show available options

    // web server port
    port: 8089,

    // cli runner port
    runnerPort: 9109,

    urlRoot: '/__test/',

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: 'LOG_INFO',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // polling interval in ms (ignored on OS that support inotify)
    autoWatchInterval: 0,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};