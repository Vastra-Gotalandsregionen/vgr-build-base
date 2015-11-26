module.exports = {
    shared: {
        // Subfolder where the source files of the project exist
        src: 'src',

        dest: 'build',

        browsers: [
            'last 3 versions'
        ]
    },

	watch: {
		targets: [ 'css', 'js', 'static' ]
	},

    build: {
        // Tasks that perform sanity checks
        sanityChecks: [],

        // Tasks for static resorces such as icons and images
        static: [ 'static', 'copy' ],

        // Tasks for resources that are compiled, such as JS and CSS
        compiled: [ 'css', 'js' ]
    },

    // CSS configuration
    css: {
        // The subfolder that all CSS-files are in
        dir: 'css',

        src: [ 'main.scss' ],

		watch: '**/*.scss'
    },

    // JavaScript configuration
    js: {
        // The subfolder that all JS-files are in
        dir: 'js',

        // The main JS-files linkable from HTML
        src: [ 'main.js' ],

		watch: '**/*.js',

        jshint: {
            devel: true,
            browser: true,
            globalstrict: true,
            esnext: true
        }
    },

	// Static resources that are just copied
	static: {
		dir: '',

		src: []
	}
};
