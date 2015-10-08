var utils = require('../utils');

var gulp = require('gulp');

gulp.task('static', function() {
	return utils.srcFor('static')
		.pipe(utils.destFor('static'));
});
