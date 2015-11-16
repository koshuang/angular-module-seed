'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'eslint']
});
var noop = function() {};
var stylish = require('gulp-jscs-stylish');

module.exports = function(options) {
  gulp.task('lint', ['eslint', 'jshint', 'jscs']);

  gulp.task('eslint', function() {
    return gulp.src([
        options.src + options.allJs,
        options.src + options.allSpec,
      ])
      .pipe($.eslint())
      .pipe($.eslint.format());
  });

  gulp.task('jshint', function() {
    return gulp.src([
        options.src + options.allJs,
        options.src + options.allSpec,
      ])
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'));
  });

  gulp.task('jscs', function() {
    return gulp.src([
        options.src + options.allJs,
        options.src + options.allSpec,
      ])
      .pipe($.jscs())
      .on('error', noop)
      .pipe(stylish());
  });
};
