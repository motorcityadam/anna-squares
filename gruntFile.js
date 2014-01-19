/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS_OPTS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    distdir:  './client/dist',
    viewsdir: './client/views',
    testdeps: [
      './client/lib/underscore/underscore-min.js',
      './client/lib/angular/angular.min.js',
      './client/lib/angular-mocks/angular-mocks.js',
      './client/lib/angular-cookies/angular-cookies.min.js',
      './client/lib/angular-route/angular-route.min.js'
    ],
    pkg: grunt.file.readJSON('package.json'),
    banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed under <%= pkg.license %>\n */\n',
    src: {
      app:         ['./client/src/app/**/*.js'],
      common:      ['./client/src/common/**/*.js'],
      specs:       ['./client/tests/**/*.spec.js'],
      scenarios:   ['./client/tests/**/*.scenario.js'],
      stylesheets: ['./client/stylesheets/**/*.styl']
    },
    clean: ['<%= distdir %>/*'],
    karma: {
      unit: { options: karmaConfig('./client/tests/config/karma.conf.js') },
      watch: { options: karmaConfig('./client/tests/config/karma.conf.js', { singleRun: false, autoWatch: true }) }
    },
    concat: {
      app: {
        options: {
          banner: '<%= banner %>'
        },
        src:['<%= src.app %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      common: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['<%= src.common %>'],
        dest: '<%= distdir %>/common.js'
      }
    },
    uglify: {
      app: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['<%= src.app %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      },
      common: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['<%= src.common %>'],
        dest: '<%= distdir %>/common.js'
      }
    },
    watch: {
      all: {
        files:['<%= src.app %>', '<%= src.common %>', '<%= viewsdir %>/**/*.jade', '<%= src.specs %>'],
        tasks:['default', 'timestamp']
      },
      build: {
        files:['<%= src.app %>', '<%= src.common %>', '<%= viewsdir %>/**/*.jade', '<%= src.specs %>'],
        tasks:['build', 'timestamp'],
        options: {
          livereload: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/tests/**/*.js']
      }
    },
    jasmine: {
      unit: {
        src: '<%= distdir %>/**/*.js',
        options : {
          vendor: '<%= testdeps %>',
          specs:  '<%= src.specs %>'
        }
      }
    },
    jshint: {
      server: {
        files: {
          src: [
            'gruntFile.js',
            './server/routes.js',
            './server/server.js',
            './server/controllers/**/*.js',
            './server/config/**/*.js',
            './server/models/**/*.js',
            './server/tests/**/*.js'
          ]
        },
        options: {
          jshintrc: __dirname + '/.jshintrc'
        }
      },
      client: {
        files: {
          src: [
            'gruntFile.js',
            '<%= src.app %>',
            '<%= src.common %>',
            '<%= src.specs %>',
            '<%= src.scenarios %>'
          ]
        },
        options: {
          jshintrc: __dirname + '/.jshintrc'
        }
      }
    },
    stylus: {
      compile: {
        options: {
          banner: '<%= banner %>',
          compress: true
        },
        files: {
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.stylesheets %>']
        }
      }
    },
    nodemon: {
      development: {
        script: './server/server.js',
        options: {
          nodeArgs: ['--debug'],
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          debug: true,
          delayTime: 3,
          env: {
            PORT: process.env.PORT
          }
        }
      },
      production: {
        script: './server/server.js',
        options: {
          nodeArgs: [],
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          debug: true,
          delayTime: 3,
          env: {
            PORT: process.env.PORT
          }
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'stack-trace-limit': 4
        }
      }
    },
    concurrent: {
      development: {
        tasks: ['nodemon:development', 'node-inspector', 'watch:build'],
        options: {
          logConcurrentOutput: true
        }
      },
      production: {
        tasks: ['nodemon:production', 'node-inspector', 'watch:all'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Set grunt default behavior to force.
  grunt.option('force', true);

  // Default task.
  grunt.registerTask('default', ['jshint', 'build', 'karma:unit']);

  // Client-specific tasks
  grunt.registerTask(
      'build',
      'Build development code package on client-side.',
      ['clean', 'concat', 'stylus']);
  grunt.registerTask(
      'release',
      'Build release code package on client-side.',
      ['clean', 'uglify', 'jshint', 'stylus', 'karma:unit']);
  grunt.registerTask(
     'test-client',
     'Run unit and e2e tests for client-side code.',
     ['build', 'jasmine:unit']);
/*  grunt.registerTask(
      'test-client',
      'Run Karma tests for client-side code.',
      ['karma:watch']);*/

  // Server-specific grunt tasks
  grunt.registerTask(
      'test-server',
      'Run Mocha tests for server-side code.',
      ['jshint:server', 'mochaTest']);

  // Application start task
  grunt.task.registerTask('start', 'Starts the application.', function() {
    if (process.env.NODE_ENV === 'development') {
      grunt.task.run('build', 'concurrent:development');
    }
    if (process.env.NODE_ENV === 'production') {
      grunt.task.run('release', 'concurrent:production');
    }
  });

};