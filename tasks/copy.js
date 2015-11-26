var utils = require('../utils');
var config = require('../config');

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

gulp.task('copy', function(cb) {
	var running = 0;

	// Go through all modules and find those that have assets that should be copied
	var assetsToCopy = fs.readdirSync('node_modules')
		.map(function(m) {
			// Look for a package.json
			var pkgJson = path.join(process.cwd(), 'node_modules', m, 'package.json');
			if(! fs.existsSync(pkgJson)) return;

			// Look for copy definition
			var pkg = require(pkgJson);
			if(! pkg.buildSettings || ! pkg.buildSettings.copy) return;

			var copy = pkg.buildSettings.copy;
			var arr = Array.isArray(copy) ? copy : [ copy ];

			return {
				root: path.join(process.cwd(), 'node_modules', m, 'build'),
				files: arr
			};
		})
		.filter(function(files) {
			if(files) running++;
			return files;
		})
		.forEach(function(module) {
			var files = module.files.map(function(f) {
				return path.join(module.root, f);
			});

			utils.noErrors(gulp.src(files, {
				base: module.root
			}))
			.pipe(gulp.dest(config.shared.dest))
			.on('end', function() {
				running--;
				if(running === 0) {
					cb();
				}
			});
		});

	// If we did not actually run anything
	if(running === 0) cb();
});
