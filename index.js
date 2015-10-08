var requireDir = require('require-dir');
requireDir('./tasks');

module.exports.config = require('./config');
module.exports.utils = require('./utils');

module.exports.component = function(name) {
    if(! name) throw 'Need the base name of the component';

    this.config.js.src = [ name + '.js' ];
    this.config.js.dest = '';
    this.config.css.src = [ name + '.scss' ];
    this.config.css.dest = '';
	this.config.static.src.push(this.config.css.dir + '/**/*.scss');
};
