var utils = require('../utils');

var gulp = require('gulp');

gulp.task('js', function() {
	return utils.srcFor('js')
		.pipe(utils.destFor('js'));
});
