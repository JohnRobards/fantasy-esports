const gulp        = require('gulp');
const cleanCSS    = require('gulp-clean-css');
const concat      = require('gulp-concat');
const sass        = require('gulp-sass');
const runSequence = require('run-sequence');
const uglify      = require('gulp-uglify');
const nodemon     = require('gulp-nodemon');

gulp.task('build-css', function() {
	return gulp.src('./public/css/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/dist/css'));
});

gulp.task('minify-css', function() {
	return gulp.src(['./public/dist/css/*.css', '!./public/dist/css/*.min.css'])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('./public/dist/css'));
});

gulp.task('compile-css', function(done) {
	runSequence('build-css', 'minify-css', function() {
		done();
	});
});

gulp.task('uglify-js', function() {
	return gulp.src('./public/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist/js'));
});

gulp.task('start', function() {
	nodemon({ script: 'server.js' })
		.once('exit', function() {
			console.log('Exiting process');
			process.exit();
		});
});

//Watch task - not working currently
// gulp.task('watch-css', function() {
//     gulp.watch('./public/css/sass/*.scss', ['compile-css']);
// });

//Default task for distribution
gulp.task('default', ['compile-css']);