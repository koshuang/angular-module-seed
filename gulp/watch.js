'use strict';

var gulp = require('gulp');

module.exports = function(options) {
  gulp.task('watch', ['test'], function() {

    gulp.watch([
      options.src + options.allJs,
      options.test + options.allSpec,
    ], function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

      gulp.start('compile');
      gulp.start('lint');
      gulp.start('test');
    });
  });
};
