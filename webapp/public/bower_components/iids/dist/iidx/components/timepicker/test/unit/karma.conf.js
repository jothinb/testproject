var defaultConfig = require('karma-support').defaultKarmaConf;
module.exports = function(config) {

    defaultConfig(config); //inherit from default config

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // list of files / patterns to load in the browser
        files: [
            //{pattern: 'test/fixtures/*.html', included: false, served: true },
            {pattern: 'lib/**/*.*', included: false, served: true},
            {pattern: 'js/**/*.js', included: false},
            'test/require.config.js' // require config needs to be loaded into the browser
        ].concat(config.defaultFiles), // concat together with all the default paths

        // enable / disable watching file and executing tests whenever any file changes, Defaults to false
        autoWatch: false,

        // single run: set to false to leave the browser/connection open and debug a page
        singleRun: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - DEFAULT: PhantomJS
        // - IE (only Windows)
      //  browsers: ['PhantomJS']
        browsers: ['PhantomJS']
    });
};
