var config = require('../config');

var gulp = require('gulp');
var browsersync = require('browser-sync');

gulp.task('dev', [ 'watch', 'build' ], function() {
	if(config.shared.browsersync) {
		browsersync({
			server: {
				baseDir: config.shared.dest,

				index: config.shared.browsersync === true ? 'index.html' : config.shared.browsersync
	        }
		});
	}
});
