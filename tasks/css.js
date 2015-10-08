var utils = require('../utils');

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
	return utils.srcFor('css')
		.pipe(sourcemaps.init())
	    .pipe(sass({
			importer: require('../sass-npm-importer')()
		}))
		.pipe(sourcemaps.write())
		.pipe(utils.destFor('css'));
});
