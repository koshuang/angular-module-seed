'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'karma', 'concat-stream', 'wiredep']
});

module.exports = function(options) {
  gulp.task('test', ['compile'], function (done) {
    runTests(true, done);
  });

  gulp.task('test:watch', ['watch']);

  function runTests(singleRun, done) {
    listFiles(function(files) {
      var server = new $.karma.Server({
        configFile: __dirname + '/../karma.conf.js',
        singleRun: singleRun,
        autoWatch: !singleRun,
        files: files,
        reporters: ['notify', 'dots']
      }, done);

      server.start();
    });
  }

  function listFiles(callback) {
    var bowerDeps = $.wiredep({
      directory: 'bower_components',
      exclude: [],
      dependencies: true,
      devDependencies: true
    });

    var customBowerDeps = [];

    var specFiles = [
      options.test + options.allSpec
    ];

    var srcFiles = [
      options.dist + options.allModule,
      options.dist + options.allJs
    ].concat(specFiles.map(function(file) {
      return '!' + file;
    }));


    gulp.src(srcFiles)
      .pipe($.angularFilesort())
      .on('error', options.errorHandler('AngularFilesort'))
      .pipe($.debug())
      .pipe($.concatStream(function(files) {
        callback(customBowerDeps
          .concat(bowerDeps.js)
          .concat(_.pluck(files, 'path'))
          .concat(specFiles));
      }));
  }
};
