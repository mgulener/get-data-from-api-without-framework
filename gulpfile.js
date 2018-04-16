var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var less = require('gulp-less');
 
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true,
      host:'localhost',
      port:'8000'
    }));
});

gulp.task('less', function () {
  return gulp.src('./app/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function(){
  return gulp.src('app/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch', function(){
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/css/style.less',['less']);
});

gulp.task('default', ['js','webserver','watch','less']);