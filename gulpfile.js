// GULP NODE MODULE
var gulp = require('gulp');

// GULP PLUGINS
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var autoPrefixer = require('gulp-autoprefixer');

// BROWSER SYNC
var browserSync = require('browser-sync').create();

//--------------------------------------------------------
//  GULP TASKS
//--------------------------------------------------------

//  LESS COMPILE 
gulp.task('less', function () {
  gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoPrefixer({ browsers: ['> 5%', 'last 5 versions'], cascade: false }))
    .pipe(minifyCss())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});

//  BROWSER SYNC SERVER
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

//  WATCHES
gulp.task('watch', function () {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('modules/**/*.js').on('change', browserSync.reload);
  gulp.watch('modules/**/*.html').on('change', browserSync.reload);
});

// GULP DEFAULT TASK
gulp.task('default', ['less', 'watch']);