var utils = require('../utils');
var config = require('../config');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('css', function() {
	return utils.srcFor('css')
		.pipe(sourcemaps.init())
	    .pipe(sass({
			importer: require('../sass-npm-importer')()
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: config.shared.browsers
			})
		]))
		.pipe(sourcemaps.write('.'))
		.pipe(utils.destFor('css'));
});
