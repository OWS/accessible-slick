const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const { rimraf } = require('rimraf');
const sass = require('gulp-sass')(require('sass'));
const uglifyJS = require('gulp-uglify');

// Remove old files.
gulp.task('clean', function() {
  return rimraf('slick/*.min.*');
});

// Build the CSS.
gulp.task('build:css', function() {
  return gulp.src(['slick/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('slick'));
});

// Build the JavaScript.
gulp.task('build:js', function() {
  return gulp.src(['slick/slick.js'])
    .pipe(uglifyJS())
    .pipe(rename('slick.min.js'))
    .pipe(gulp.dest('slick'));
});

// Gulp build JS/CSS tasks in parallel.
gulp.task('build', gulp.parallel('build:js', 'build:css'));

// Watch source files for changes and automatically rebuild them on save.
gulp.task('watch', function() {
  gulp.watch('slick/*.scss', gulp.series(['build:css']));
  gulp.watch(['slick/*.js', '!slick/*.min.js'], gulp.series(['build:js']));
});

// Default task executes a fresh build of custom JS
gulp.task('default', gulp.series('clean', 'build'));
