var defaultConfig = require('karma-support').defaultKarmaConf;
module.exports = function(config) {

    defaultConfig(config); //inherit from default config

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'js/**/!(require.config).js', included: false, served: true }, // make everything in our project available (but don't load it) except require config
            {pattern: 'js/iidx-brandkit', included: true, served: true },
            'test/iidx-require.config.js' // require config needs to be loaded into the browser
        ].concat(config.getDefaultFilesForDX('iidx')), // concat together with all the default paths

        // enable / disable watching file and executing tests whenever any file changes, Defaults to false
        autoWatch: false
    });
};