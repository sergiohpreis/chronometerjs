var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('default', ['clean'], function() {
	gulp.src('src/*.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist'))
});

gulp.task('clean', function(){
	return del([
		'dist/*',
  	]);
});