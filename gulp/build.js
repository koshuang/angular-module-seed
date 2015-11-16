'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence', 'del']
});

module.exports = function(options) {
  gulp.task('clean', $.del.bind(null, ['dist']));

  gulp.task('compile', function() {
    return gulp.src(options.src + options.allJs)
      .pipe($.angularFilesort())
      .on('error', options.errorHandler('AngularFilesort'))
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe($.concat(options.output))
      .pipe(gulp.dest(options.dist));
  });

  gulp.task('build', function(done) {
    $.runSequence('clean', 'lint', 'test', done);
  });
};
