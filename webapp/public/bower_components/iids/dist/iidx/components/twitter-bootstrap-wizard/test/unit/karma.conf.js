// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var defaultConfig = require('karma-support').defaultKarmaConf;

module.exports = function(config) {

defaultConfig(config); //inherit from default config

config.set({
	// base path, that will be used to resolve files and exclude
	basePath: '../../',

	// list of files / patterns to load in the browser
	files: [
        {pattern: 'components/*/*.js', included: false},
        {pattern: 'jquery.bootstrap.wizard.js', included: false},
        {pattern: 'bootstrap/js/bootstrap.js', included: false},
		'test/require.config.js' // require config needs to be loaded into the browser
	].concat(config.defaultFiles), // concat together with all the default paths


    preprocessors: {
        'jquery.bootstrap.wizard.js': ['coverage']
    }
});
};
