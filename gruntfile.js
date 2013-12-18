module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    },

    uglify: {
      build: {
        files: {
          'es5shim.js': ['src/js/es5shim.js']
        }
      }
    },

    jshint: {
      src: ['gruntfile.js', 'src/js/*.js', 'test/spec/**/*.js'],
      options: {
        expr: true
      }
    },

    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },

      karma: {
        files: ['src/*.js', 'test/spec/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma', 'uglify']);
};