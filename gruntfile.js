module.exports = function(grunt) {

  'use strict';

  // Configure grunt.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      compile: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          linenos: false,
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'client/stylesheets',
          src: [ '**/*.styl' ],
          dest: 'client/stylesheets_build/',
          ext: '.css'
        }]
      }
    },

    clean: {
      clientJs: {
        src: [ __dirname + '/client/js_build/' ]
      }
    },

    uglify: {
      development: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          cwd: 'client/js',
          src: [ '**/*.js' ],
          dest: 'client/js_build/',
          ext: '.js'
        }]
      },
      production: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: false,
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'client/js',
          src: [ '**/*.js' ],
          dest: 'client/js_build/',
          ext: '.js'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: __dirname + '/.jshintrc'
      },
      src: ['gruntfile.js', 'client/js/**/*.js', 'client/tests/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      serverTest: {
        options: {
          reporter: 'spec'
        },
        src: ['server/tests/**/*.js']
      }
    },

    watch: {
      stylus: {
        files: ['client/stylesheets/**'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      },
      clientJade: {
        files: ['client/views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['client/js/**', 'server/**/*.js'],
        tasks: ['clean', 'jshint', 'uglify:development', 'mochaTest'],
        options: {
          livereload: true
        }
      }
    },

    nodemon: {
      development: {
        options: {
          file: 'server.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['server', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    env: {
      development: {
        NODE_ENV: 'development'
      },
      stage: {
        NODE_ENV: 'stage'
      },
      production: {
        NODE_ENV: 'production'
      },
      test: {
        NODE_ENV: 'test'
      },
      travis: {
        NODE_ENV: 'travis'
      }
    }

  });

  // Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  // Set grunt default behavior to force.
  grunt.option('force', true);

  // Register grunt task to perform project tests.
  grunt.registerTask('test', ['env:test', 'mochaTest']);

  // Register default grunt tasks (default is also a development deployment).
  grunt.registerTask('default',
    ['env:development',
    'stylus',
    'jshint',
    'clean',
    'uglify:development',
    'concurrent']);

  // Register grunt task for a development environment.
  grunt.registerTask('development',
    ['env:development',
    'stylus',
    'jshint',
    'clean',
    'uglify:development',
    'concurrent']);

  // Register grunt task for a staging environment.
  grunt.registerTask('stage',
    ['env:stage',
    'stylus',
    'jshint',
    'clean',
    'uglify:production']);

  // Register grunt task for a production environment.
  grunt.registerTask('production',
    ['env:production',
    'stylus',
    'jshint',
    'clean',
    'uglify:production']);
};