var config = require('../config');

var gulp = require('gulp');
var run = require('run-sequence');

gulp.task('build', function(cb) {
	var tasks = [];

	function withTasks(task) {
		var data = config.build[task];
		if(data && data.length > 0) {
			tasks.push(data);
		}
	}

	withTasks('sanityChecks');
	withTasks('static');
	withTasks('compiled');

	tasks.push(cb);

	run.apply(this, tasks);
});
