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

describe('Slider tests', function () {

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

    describe('Instancing a Slider from provided DOM', function () {

        before(function() {
            return driver.get('../fixtures/slider-fixture.html');
        });

        it('should init a slider', function () {
            driver.wait(until.elementsLocated(webdriver.By.css(".with-buttons")), 4000);
            return chai.expect(
                driver.findElement(webdriver.By.css(".with-buttons")).isDisplayed()
            ).to.eventually.equal(true);
        });

        it('should display the value in the label', function () {
            return chai.expect(
                driver.findElement(webdriver.By.css("label")).getText()
            ).to.eventually.equal("200");
        });

        it('should display a highlight properly', function () {
            return chai.expect(
                driver.findElement(webdriver.By.css(".highlight")).getAttribute("style")
            ).to.eventually.contain("width: 80%");
        });
    });

    describe('Slider controls', function () {

        it('should make plus increment the value in the label', function () {
            driver.findElement(webdriver.By.css(".slider-button.more button")).click();
            return chai.expect(
                driver.findElement(webdriver.By.css("label")).getText()
            ).to.eventually.equal("201");
        });

        it('should make minus decrement the value in the label', function () {
            driver.findElement(webdriver.By.css(".slider-button.less button")).click();
            return chai.expect(
                driver.findElement(webdriver.By.css("label")).getText()
            ).to.eventually.equal("200");
        });

        it('should make drag of thumb all the way left zero out the value', function () {
            new webdriver.ActionSequence(driver).
                dragAndDrop(driver.findElement(webdriver.By.css(".track-and-thumb button")), {x: -2000, y:0}).
                perform();
            return chai.expect(
                driver.findElement(webdriver.By.css("label")).getText()
            ).to.eventually.equal("0");
        });

        it('should make drag of thumb all the way right max out the value', function () {
            new webdriver.ActionSequence(driver).
                dragAndDrop(driver.findElement(webdriver.By.css(".track-and-thumb button")), {x: 2000, y:0}).
                perform();
            return chai.expect(
                driver.findElement(webdriver.By.css("label")).getText()
            ).to.eventually.equal("250");
        });
    });
});

