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
 * @class UI test spec for toggle-switch.
 *
 * @author Jeff Reichenberg
 *
 * TODO: make a selenium "PageObject" out of the toggle switch to provide an interface to expected behavior
 */

var webdriver = require('webdriver-support/node_modules/selenium-webdriver'),
    chai = require('chai'),
    webdriverFactory = require('webdriver-support');

var driver, driverSession;

chai.use(require('chai-as-promised'));

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

describe('Instancing Toggle Switch from provided DOM data attribute', function () {

    before(function() {
        return driver.get('../fixtures/index.html');
    });

    it('should automatically instance a toggle button from the expected DOM', function () {
        return chai.expect(
            driver.findElement(webdriver.By.css(".has-switch"))
        ).to.eventually.exist;
    });
});

describe('Instancing Toggle Switch via JavaScript', function () {

    it('should not automatically instance a toggle button without the expected DOM', function () {
        //verify the last input checkbox not auto-instanced as a toggle switch b/c it does not have the expected DOM
        return chai.expect(
            driver.isElementPresent(webdriver.By.xpath("//input[4]/ancestor::div[contains(@class, 'has-switch')]"))
        ).to.eventually.be.false;
    });

    it('should be instanced via JavaScript', function (done) {
        //verify the last input checkbox gets instanced as a toggle switch when called via JavaScript
        driver.findElement(webdriver.By.xpath("//button[last()]")).click();
        driver.isElementPresent(webdriver.By.xpath("//input[last()]/ancestor::div[contains(@class, 'has-switch')]")).then(function (exists) {
            chai.expect(exists).to.be.true;
            done();
        }, done);
    });
});

describe('Underlying form field interactions', function () {

    var lastSwitchLocator = webdriver.By.xpath("//input[last()]/ancestor::div[contains(@class, 'has-switch')]");

    it('should set the "checked" property of the checkbox inside the toggle button', function () {
        driver.findElement(lastSwitchLocator).click(); //toggle it

        return chai.expect(
            driver.findElement(lastSwitchLocator)
                .findElement(webdriver.By.xpath("//input")).isSelected()
        ).to.eventually.be.true;
    });

    it('should unset the "checked" property of the checkbox inside the toggle button', function () {
        driver.findElement(lastSwitchLocator).click(); //toggle it back

        return chai.expect(
            driver.findElement(lastSwitchLocator)
                .findElement(webdriver.By.xpath("//input")).isSelected()
        ).to.eventually.be.false;
    });
});
