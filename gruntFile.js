/*global module*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-karma');
  // grunt.loadNpmTasks('grunt-html2js');

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
    distdir: './client/js_dist',
    pkg: grunt.file.readJSON('package.json'),
    banner:
        '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['./client/js/**/*.js'],
      specs: ['./client/tests/**/*.spec.js'],
      scenarios: ['./client/tests/**/*.scenario.js']
    },
    clean: ['<%= distdir %>/*'],
    karma: {
      unit: { options: karmaConfig('./client/tests/config/unit.js') },
      watch: { options: karmaConfig('./client/tests/config/unit.js', { singleRun: false, autoWatch: true }) }
    },
    concat:{
      dist:{
        options: {
          banner: '<%= banner %>'
        },
        src:['<%= src.js %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist:{
        options: {
          banner: '<%= banner %>'
        },
        src:['<%= src.js %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      }
    },
    watch:{
      all: {
        files:['<%= src.js %>', '<%= src.specs %>'],
        tasks:['default','timestamp']
      },
      build: {
        files:['<%= src.js %>', '<%= src.specs %>'],
        tasks:['build','timestamp']
      }
    },
    nodeunit: ['./server/tests/**/*.js'],
    jshint: {
      server: {
        files: [
          'gruntFile.js',
          './server/routes.js',
          './server/server.js',
          './server/controllers/**/*.js',
          './server/config/**/*.js',
          './server/models/**/*.js',
          './server/tests/**/*.js'
        ],
        options: {
          jshintrc: __dirname + '.jshintrc'
        }
      },
      client: {
        files:[
          'gruntFile.js',
          '<%= src.js %>',
          '<%= src.specs %>',
          '<%= src.scenarios %>'
        ],
        options: {
          jshintrc: __dirname + '.jshintrc'
        }
      }
    }
  });

  // Set grunt default behavior to force.
  grunt.option('force', true);

  // Default task.
  grunt.registerTask('default', ['jshint','build','karma:unit']);

  // Client-specific tasks
  grunt.registerTask('build', ['clean', 'concat']);
  grunt.registerTask('release', ['clean', 'uglify','jshint','karma:unit']);
  grunt.registerTask('test-client', ['karma:watch']);

  // Server-specific grunt tasks
  grunt.registerTask('test-server', ['jshint','nodeunit']);

  grunt.registerTask('supervise', function() {
    this.async();
    require('supervisor').run(['./server/server.js']);
  });

};