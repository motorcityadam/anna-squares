/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

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
    distdir: './client/dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed under <%= pkg.license %>\n */\n',
    src: {
      app: ['./client/src/app/**/*.js'],
      common: ['./client/src/common/**/*.js'],
      specs: ['./client/tests/**/*.spec.js'],
      scenarios: ['./client/tests/**/*.scenario.js'],
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
        files:['<%= src.app %>', '<%= src.specs %>'],
        tasks:['default', 'timestamp']
      },
      build: {
        files:['<%= src.app %>', '<%= src.specs %>'],
        tasks:['build', 'timestamp']
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
    }
  });

  // Set grunt default behavior to force.
  grunt.option('force', true);

  // Default task.
  grunt.registerTask('default', ['jshint', 'build', 'karma:unit']);

  // Client-specific tasks
  grunt.registerTask('build', ['clean', 'concat', 'stylus']);
  grunt.registerTask('release', ['clean', 'uglify', 'jshint', 'stylus', 'karma:unit']);
  grunt.registerTask('test-client', ['karma:watch']);

  // Server-specific grunt tasks
  grunt.registerTask('test-server', ['jshint:server', 'mochaTest']);

  grunt.registerTask('supervise', function() {
    this.async();
    require('supervisor').run(['./server/server.js']);
  });

};