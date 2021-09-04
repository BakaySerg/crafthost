var   gulp          = require('gulp'),
		// gutil         = require('gulp-util' ),
		sourcemaps 	  = require('gulp-sourcemaps'),
		wait 			  = require('gulp-wait'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		// autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rigger        = require('gulp-rigger'),
		// rsync         = require('gulp-rsync'),
		imagemin      = require('gulp-imagemin');

gulp.task('browser-sync', function() {
	browserSync({
		server: {baseDir: 'app'},
		notify: false,
		// open: false,
		online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});


gulp.task('layout', function () {
   return gulp.src('src/*.html')
   // .pipe(plumber())
   .pipe(rigger())
   .pipe(gulp.dest('app/'))
   .pipe(browserSync.reload({ stream: true }))
});

gulp.task('styles', function() {
	return gulp.src('src/scss/**/*.scss')
	// return gulp.src('src/scss/*.scss')
	.pipe(wait(200))
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	// .pipe(autoprefixer(['last 4 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 }}})) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.reload({ stream: true }));
});
// gulp.task('styles-separated', function() {
// 	return gulp.src('src/scss/pages/*.scss')
// 	.pipe(sourcemaps.init({loadMaps: true}))
// 	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
// 	.pipe(rename({ suffix: '.min', prefix : '' }))
// 	.pipe(cleancss( {level: { 1: { specialComments: 0 }}})) // Opt., comment out when debugging
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(sourcemaps.write('./'))
// 	.pipe(gulp.dest('./app/css/'))
// 	.pipe(browserSync.reload({ stream: true }));
// });

gulp.task('scripts', function() {
	return gulp.src([
		'src/js/*.js', // Always (scripts) at the end
		])
	// .pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Minify js - opt.
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));  // 2nd argument if drive is not SSD - { delay: 350 }
	// gulp.watch('src/scss/**/*.scss', gulp.parallel('styles-separated'));
	gulp.watch(['src/**/*.js', 'src/js/main.js'], gulp.parallel('scripts'));
	gulp.watch('src/**/*.html', gulp.parallel('layout'))
});
gulp.task('default', gulp.parallel('layout','styles', 'scripts', 'browser-sync', 'watch'));