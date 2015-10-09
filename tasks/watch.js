var config = require('../config');
var utils = require('../utils');

var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function() {
	config.watch.targets.forEach(function(target) {
		watch(utils.watchGlob(target), function() {
			gulp.start(target);
		});
	});
});
