module.exports = function(grunt) {

  'use strict';

  // Configure grunt.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    stylus: {
      development: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          linenos: false,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'client/stylesheets',
          src: [ '**/*.styl' ],
          dest: 'client/stylesheets_build/',
          ext: '.css'
        }]
      },
      production: {
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
      client_js: {
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

    jade: {
      development: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'client/views',
          src: [ '**/*.jade' ],
          dest: 'client/views_build/',
          ext: '.html'
        }]
      },
      production: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'client/views',
          src: [ '**/*.jade' ],
          dest: 'client/views_build/',
          ext: '.html'
        }]
      }
    },

    watch: {
      stylus: {
        files: ['client/stylesheets/**'],
        tasks: ['stylus:development'],
        options: {
          livereload: true
        }
      },
      server_jade: {
        files: ['server/views/**'],
        options: {
          livereload: true
        }
      },
      client_jade: {
        files: ['client/views/**'],
        tasks: ['jade:development'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['client/js/**', 'server/**/*.js'],
        tasks: ['clean:client_js', 'jshint', 'uglify:development'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['client/views/**'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['client/css/**'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: __dirname + '/.jshintrc'
      },
      src: ['gruntfile.js', 'client/js/**/*.js', 'test/**/*.js', 'server/**/*.js']
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

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['test/**/*.js']
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
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-env');

  // Set grunt default behavior to force.
  grunt.option('force', true);

  // Register individual grunt tasks.
  grunt.registerTask(
    'stylesheets',
    'Compiling Stylus stylesheets.',
    ['stylus:production']
  );

  grunt.registerTask(
    'templates',
    'Compiling Jade templates.',
    ['jade']
  );

  // Register default grunt tasks (default is also a development deployment).
  grunt.registerTask('default',
    ['env:development',
    'stylus:development',
    'jade',
    'jshint',
    'clean:client_js',
    'uglify:development',
    'concurrent']);
  // Register grunt task for a development environment.
  grunt.registerTask('development',
    ['env:development',
    'stylus:development',
    'jade',
    'jshint',
    'clean:client_js',
    'uglify:development',
    'concurrent']);

  // Register grunt task for a staging environment.
  grunt.registerTask('stage',
    ['env:stage',
    'stylus:production',
    'jade',
    'jshint',
    'clean:client_js',
    'uglify:production']);

  // Register grunt task for a production environment.
  grunt.registerTask('production',
    ['env:production',
    'stylus:production',
    'jade',
    'jshint',
    'clean:client_js',
    'uglify:production']);

  // Register grunt task to perform project tests.
  grunt.registerTask('test', ['env:test', 'mochaTest']);
};