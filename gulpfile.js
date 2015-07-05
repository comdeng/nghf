var gulp = require('gulp');
var jade = require('gulp-jade-for-php');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var minifyJs = require('gulp-minify');

gulp.task('css', function() {
	gulp.src('./src/static/css/**/*.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest('./build/static/css/'))
		;
});

gulp.task('js', function() {
	gulp.src('./src/static/js/**/*.js')
		.pipe(minifyJs())
		.pipe(gulp.dest('./build/static/js/'))
		;
});

gulp.task('template', function() {
	gulp.src('./src/view/**/*.jade')
		.pipe(jade({
			extension: '.phtml',
			pretty: true
		}))
		.pipe(gulp.dest('./build/view/'));
});

gulp.task('watch', function() {
	gulp.watch('./src/view/**/*.jade', batch(function(events, done) {
		gulp.start('template', done);
	}));
	gulp.watch('./src/static/css/**/*.less', batch(function(events, done) {
		gulp.start('css', done);
	}));
	
	gulp.watch('./src/static/js/**/*.js', batch(function(events, done) {
		gulp.start('js', done);
	}));
});

gulp.task('default', ['css', 'js', 'template', 'watch']);