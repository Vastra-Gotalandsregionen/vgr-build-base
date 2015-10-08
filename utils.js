/*
 * Utilities for build tasks. This file contains utilities that makes it
 * easy to build tasks, such as getting a source stream or getting the
 * destination of files.
 */

var config = require('./config');

var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

// Map the given paths onto a common root
var map = function(root, paths) {
	if(! Array.isArray(paths)) {
		paths = [ paths ];
	}

	var self = this;
	return paths.map(function(p) {
		if(p[0] === '!') {
			return '!' + path.join(root, p.substring(1));
		}
		return path.join(root, p);
	});
};

/**
 * Take a Gulp stream and divert any errors to a notification.
 */
module.exports.noErrors = function(stream, title) {
	return stream.pipe(plumber({
		errorHandler: notify.onError({
			title: title || 'Build failed',
			message: '<%= error.message %>'
		})
	}));
};

/**
 * Get the source directory for the given type of file.
 */
module.exports.srcDir = function(type, base) {
	var root = (base || config.shared.src);
	return path.join(root, config[type].dir);
};

/**
 * Get the source files for the given type of file. Optionally pass along
 * some options and a base directory to use.
 */
module.exports.srcFor = function(type, opts, base) {
	var root = (base || config.shared.src);
	var t = config[type];
	if(! t) throw 'Unknown type ' + type + ', no configuration found for the given type';

	if(! t.src) throw 'Type ' + type + ' does not have a defined source';

	var paths = map(path.join(root, t.dir), t.src);
	return this.noErrors(gulp.src(paths, opts));
};

/**
 * Get the destination directory for the given type of file.
 */
module.exports.destDir = function(type, base) {
	var root = (base || config.shared.dest);
	var dest = config[type].dest;
	if(dest === '') return root;

	return path.join(root, dest || config[type].dir);
};

/**
 * Get the destination (via gulp.dest) for the given type of file.
 */
module.exports.destFor = function(type, base) {
	return gulp.dest(this.destDir(type, base));
};
