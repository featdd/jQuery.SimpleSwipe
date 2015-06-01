'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'jQuery.SimpleSwipe.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'jQuery.SimpleSwipe.min.js': ['jQuery.SimpleSwipe.js']
        }
      }
    },
		clean: [
			'.temp',
			'.sass-cache'
		]
  });

  grunt.registerTask('build', ['jshint', 'uglify', 'clean']);
};
