var gulp = require('gulp');
var jade = require('gulp-jade-for-php');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var minifyJs = require('gulp-minify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var path = require('path');

gulp.task('clean', function(){
	return gulp.src('./build/*	', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('css', function() {
	gulp.src('./src/static/css/**/*.css')
		.pipe(minifyCss())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('./build/static/css/'))
		;
	
	gulp.src('./src/static/css/**/*.less')
		.pipe(less())
		.pipe(minifyCss())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('./build/static/css/'))
		;
});

gulp.task('bower', function(){
	var resources = [
	  ['jquery/dist/jquery.min.js', 'js/ext/jquery/'],
	  ['jquery/dist/jquery.min.map', 'js/ext/jquery/'],
	  ['normalize.css/normalize.css', 'css/ext/', {
		  suffix: '.min'
	  }, true],
	  ['swiper/dist/css/swiper.min.css', 'css/ext/'],
	  ['swiper/dist/js/maps/swiper.jquery.min.js.map', 'js/ext/jquery/maps/'],
	  ['swiper/dist/js/swiper.jquery.min.js', 'js/ext/jquery/', function(path){
		  path.basename = 'jquery.swiper.min';
	  }],
	  ['html5shiv/dist/html5shiv.min.js', 'js/ext/', function(path){
		path.basename = 'html5.min';
	  }],
	  ['jquery.lazyload/jquery.lazyload.js', 'js/ext/jquery/', {
		  suffix: '.min'
	  }]
	];
	
	for(var i = 0, l = resources.length; i < l; i++) {
		var res = resources[i];
		var _gulp = gulp.src('./bower_components/' + res[0]);
		if (res.length > 3 && res[3]) {
			var ext = path.extname(res[0]);
			if (ext == 'css') {
				_gulp = _gulp.pipe(minifyCss());
			} else if (ext == 'js') {
				_gulp = _gulp.pipe(minifyJs());
			}
		}
		if (res.length > 2 && res[2]) {
			_gulp = _gulp.pipe(rename(res[2]));
		}
		_gulp.pipe(gulp.dest('./build/static/' + res[1]));
	}
});

gulp.task('js_pre', function() {
	gulp.src('./src/static/js/**/*.js')
		.pipe(minifyJs({
			ext: {
				src:'.debug.js',
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest('./build/static/js/'))
		;
});

gulp.task('js', ['js_pre'], function() {
	// TODO 此处不能正确删除文件
	gulp.src('./build/static/js/*.debug.js', {read:false})
		.pipe(clean());
});

gulp.task('template', function() {
	return gulp.src('./src/view/**/*.jade')
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
	gulp.watch(['./src/static/css/**/*.less', './src/static/css/**/*.css'], batch(function(events, done) {
		gulp.start('css', done);
	}));
	
	gulp.watch('./src/static/js/**/*.js', batch(function(events, done) {
		gulp.start('js', done);
	}));
});



gulp.task('default', ['clean'], function(){
	gulp.start(['css', 'js', 'template', 'bower', 'watch']);
});
