var gulp = require('gulp');       
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

  //styles
gulp.task('sass',function(){
	return gulp.src('./frontend/sass/*.scss')//z kad
	.pipe(sass())//przekompiluj
	.pipe(gulp.dest('./frontend/css'))//do
	.pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watch',function(){
	var server = livereload();
	gulp.watch('./frontend/sass/*.scss', ['sass']);
});

gulp.task('default',['sass','connect','watch']);