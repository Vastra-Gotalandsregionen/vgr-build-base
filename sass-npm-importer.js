/**
 * Custom SASS resolution of imports to allow for easier inclusion. Will look
 * through the NPM dependencies and find the matching module.
 */
var utils = require('./utils');

var resolve = require('resolve');
var path = require('path');
var fs = require('fs');

var locations = [
	'',
	'build/css',
	'build/scss',
	'build/sass',
	'css',
	'scss',
	'sass'
];

module.exports = function() {
	var cache = {};
	return function(url, file, done) {
		if(cache[url]) return done({ file: cache[url] });

		var parts = url.split('/');
		if(parts.length > 1) {
			var parent = module.parent;
			while(parent.parent && parent.parent.parent) {
				parent = parent.parent;
			}

			path.dirname(parent.filename);

			try {
				var resolve = require('resolve');
				var root = path.dirname(
					resolve.sync(parts[0], { basedir: path.dirname(parent.filename) })
				);

				var subPath = parts.slice(1).join('/');

				var exists = locations.every(function(location) {
					var file = path.join(root, location, subPath);
					if(fs.existsSync(file)) {
						cache[url] = file;
						done({ file: file });
						return false;
					}

					return true;
				});

				if(! exists) return;
			} catch(ex) {
				// Ignore these errors and allow regular resoultion to continue
			}
		}

		done({ file: url });
	};
};
