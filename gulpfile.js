const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		online: true
	})
}

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.min.js',
		'node_modules/scrollreveal/dist/scrollreveal.min.js',
		'app/js/form.js',
    'app/js/inputmask.min.js',
		'app/js/app.js',
	])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js/'))
		.pipe(browserSync.stream())
}

function styles() {
	return src([
    'node_modules/normalize.css/normalize.css',
		'node_modules/swiper/swiper-bundle.min.css',
		'app/sass/*.scss'
	])
		.pipe(sass())
		.pipe(concat('app.min.css'))
		.pipe(autoprefixer({ overrideBrowserslist: [">0.2%"], grid: true }))
		.pipe(cleancss(({ level: { 1: { specialComents: 0 } }/*, format: 'beautify' */})))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/images/src/**/*')
		.pipe(newer('app/images/dest/'))
		.pipe(imagemin())
		.pipe(dest('app/images/dest/'))
}

function cleanimg() {
	return del('app/images/dest/**/*', { force: true })
}

function cleandist() {
	return del('dist/**/*', { force: true })
}

function buildCopy() {
	return src([
		'app/css/**/*.min.css',
		'app/*.php',
		'app/phpmailer/*',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/fonts/**/*',
		'app/**/*.html',
	], { base: 'app' })
		.pipe(dest('dist'));
}

function startwatch() {
	watch('app/sass/*.scss', styles);
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
	watch('app/**/*.html').on('change', browserSync.reload);
	watch('app/images/src/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleandist = cleandist;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buildCopy);

exports.default = parallel(styles, scripts, browsersync, startwatch);

