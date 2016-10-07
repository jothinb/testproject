var defaultConfig = require('karma-support').defaultKarmaConf;

var defaultFiles = [
    {pattern: 'lib/**/*.js', included: false, watched: false},
    {pattern: 'components/**/*.js', included: false, watched: false},
    {pattern: 'bower_components/**/*.js', included: false, watched: false},
    {pattern: 'test/unit/spec/**/*.js', included: false},
        'node-modulesrequire.config.test.js'
]

module.exports = function(config) {

    defaultConfig(config); //inherit from default config

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'js/**/!(require.config).js', included: false, served: true }, // make everything in our project available (but don't load it) except require config
            {pattern: 'js/hdx-brandkit', included: true, served: true },
            'test/hdx-require.config.js' // require config needs to be loaded into the browser
        ].concat(config.getDefaultFilesForDX('hdx')), // concat together with all the default paths

        // enable / disable watching file and executing tests whenever any file changes, Defaults to false
        autoWatch: false
    });
};