var fs = require('fs');
var testDir = process.cwd() + '/test-target';

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	suites: {
		TSO: [
			'test/e2e/specs/login_spec.js',
			'test/e2e/specs/visualizationMain_spec.js',
            'test/e2e/specs/fileImport-spec.js',
            'test/e2e/specs/databaseImport-spec.js'
		]
	},

	//  If running protractor directly, can change url with --params.url 'http://localhost:9001'
	params: {
		url: 'http://localhost:9000/hopper/'
	},
	multiCapabilities: [
		// { 'browserName': 'firefox' },
		{
			'name': 'Hopper',
			'browserName': 'chrome',
			'chromeOptions': {
				'args': [ 'show-fps-counter=true', 'window-size=1440,900', 'fast-start' ]
			}
		}
	],
	onPrepare: function() {

		//Global variables
		//prop = require('./test/e2e/testdata/'+browser.params.env);

		// Page variables
		visualPage = require('./test/e2e/pages/visualizationMain_page.js');
        fileImport = require('./test/e2e/pages/fileImport.js');
        databaseImport = require('./test/e2e/pages/databaseImport.js');

		if (!fs.existsSync(testDir)) {
			fs.mkdirSync(testDir);
		}

		require('jasmine-reporters');

		jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(testDir, true, true, null, false));
		//https://github.com/larrymyers/jasmine-reporters/blob/jasmine1.x/src/jasmine.junit_reporter.js

		var SpecReporter = require('jasmine-spec-reporter');
		jasmine.getEnv().addReporter(new SpecReporter({
			displayStacktrace: true
		}));

		var HtmlReporter = require('protractor-html-screenshot-reporter');
		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: testDir + '/screenshots',
			takeScreenShotsForSkippedSpecs: true,
			takeScreenShotsOnlyForFailedSpecs: true
		}));

		browser.driver.get(browser.params.url);
	},
	jasmineNodeOpts : {
		isVerbose : true,
		showColors : true,
		includeStackTrace : true,
		defaultTimeoutInterval : 1200000
	},
	allScriptsTimeout: 1200000
//	onComplete: function() {
//		require('./test/e2e/models/dashboard-page').logout();
//		browser.driver.close();
//	}
};