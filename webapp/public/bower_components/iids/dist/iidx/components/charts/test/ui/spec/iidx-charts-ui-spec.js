'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class UI test spec for this component using https://github.sw.ge.com/DT/webdriver-support.
 *
 * @author
 *
 * TODO: make a selenium "PageObject" out of the toggle switch to provide an interface to expected behavior
 */

var webdriver = require('webdriver-support/node_modules/selenium-webdriver'),
    chai = require('chai'),
    webdriverFactory = require('webdriver-support');

chai.use(require('chai-as-promised'));

describe('Chart tests', function () {

    var driver, driverSession;

    before(function() {
        driverSession = webdriverFactory.create();
        driver = driverSession.setup({spec: __filename});
    });

    after(function(done) {
        driverSession.teardown(done);
    });

    afterEach(function (done) {
        driverSession.logState(this.currentTest, done);
    });

    describe('Simple Time Series Chart', function () {

        before(function() {
            //nav to our test fixture.  Can pull this up outside of tests with "$ http-server" and then http://localhost:8080../fixtures/data-loading.html
            return driver.get('../fixtures/time-series.html');
        });

        it('chart was rendered', function () {

            //assert chart was rendered
            return chai.expect(
                driver.findElements(webdriver.By.css(".highcharts-container"))
            ).to.eventually.exist;
        });

        it('x-axis range begins as expected', function () {

            //assert first x-axis label is correct
            return chai.expect(
                driver.findElement(webdriver.By.css("#highcharts-0 > svg > g.highcharts-axis-labels.highcharts-xaxis-labels > text:first-child > tspan")).getAttribute('textContent')
            ).to.eventually.equal("May");

        });

        it('x-axis range ends as expected', function () {

            //assert last x-axis label is correct
            return chai.expect(
                driver.findElement(webdriver.By.css("#highcharts-0 > svg > g.highcharts-axis-labels.highcharts-xaxis-labels > text:last-child > tspan")).getAttribute('textContent')
            ).to.eventually.equal("Dec");

        });

    });

    describe('Double Y-Axis Time Series Chart', function() {
      before(function() {
            //nav to our test fixture.  Can pull this up outside of tests with "$ http-server" and then http://localhost:8080../fixtures/data-loading.html
            return driver.get('../fixtures/double-y-axis.html');
        });

        it('first y-axis rendered', function () {

            //assert first y-axis label is correct
            return chai.expect(
                driver.findElement(webdriver.By.css("#highcharts-0 > svg > g:nth-child(7) > text > tspan")).getAttribute('textContent')
            ).to.eventually.equal("MW");
        });

        it('second y-axis rendered', function () {

            //assert second y-axis label is correct
            return chai.expect(
                driver.findElement(webdriver.By.css("#highcharts-0 > svg > g:nth-child(8) > text > tspan")).getAttribute('textContent')
            ).to.eventually.equal("Kj/KWh");
        });
    });
});