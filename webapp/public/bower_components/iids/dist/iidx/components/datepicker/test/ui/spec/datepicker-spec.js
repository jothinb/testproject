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
 * @class UI test spec for datepicker
 *
 * @author Jeff Reichenberg
 *
 * TODO: make a selenium "PageObject out of the datepicker to provide an interface to expected behavior
 */

var webdriver = require('webdriver-support/node_modules/selenium-webdriver'),
    until = webdriver.until,
    chai = require('chai'),
    webdriverFactory = require('webdriver-support');

chai.use(require('chai-as-promised'));

describe('Datepicker tests', function () {

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

    describe('Instancing a Datepicker from provided DOM', function () {

        before(function() {
            return driver.get('../fixtures/datepicker-fixture.html');
        });

        it('should init a datepicker', function () {
            driver.wait(until.elementsLocated(webdriver.By.css(".test-ready")), 4000);
            return chai.expect(
                driver.findElement(webdriver.By.css(".test-ready")).isDisplayed()
            ).to.eventually.equal(true);
        });

        it('should open the datepicker when the button is clicked', function () {
            driver.findElement(webdriver.By.css("button")).click();
            driver.wait(until.elementsLocated(webdriver.By.css(".datepicker-dropdown")), 2000);
            return chai.expect(
                driver.findElement(webdriver.By.css(".datepicker-dropdown")).isDisplayed()
            ).to.eventually.equal(true);
        });

        it('should close the datepicker when something outside it is clicked', function () {
            driver.findElement(webdriver.By.css("div")).click();
            driver.wait((function() {
                return driver.isElementPresent(webdriver.By.css(".datepicker-dropdown")).then(function(present) {
                    return !present;
                })
            }), 2000);
            return chai.expect(
                driver.isElementPresent(webdriver.By.css(".datepicker-dropdown"))
            ).to.eventually.equal(false);
        });

        it('should open the datepicker when the input field is clicked', function () {
            driver.findElement(webdriver.By.css("input")).click();
            driver.wait(until.elementsLocated(webdriver.By.css(".datepicker-dropdown")), 2000);
            return chai.expect(
                driver.findElement(webdriver.By.css(".datepicker-dropdown")).isDisplayed()
            ).to.eventually.equal(true);
        });
    });
});

