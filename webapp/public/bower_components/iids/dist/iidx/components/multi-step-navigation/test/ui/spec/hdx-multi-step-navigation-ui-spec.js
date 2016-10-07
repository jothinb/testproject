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
 * @class UI test spec for multi-step-navigation
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

describe('Instancing and using multi-step-nav', function () {
    before(function() {
        return driver.get('../../../test/fixtures/hdx-multi-step-navigation.html');
    });

    it('fixture should have a multi-step-nav', function () {
        return chai.expect(
            driver.findElement(webdriver.By.css(".multi-step-nav"))
        ).to.eventually.exist;
    });

    it('when hovered over the last (non-selected) item, it should be colored appropriately', function (done) {
        driver.findElement(webdriver.By.id("ex3")).then(function(elem){
            driver.actions().mouseMove(elem).perform();
            driver.sleep(1000);

            driver.findElement(webdriver.By.id("ex3")).getCssValue('background-color').then(function(result) {
                chai.expect(result).to.equal('rgba(225, 225, 225, 1)');
                done();
            });
        });
    });

    it('when clicked, the newly clicked thing should have an active state', function (done) {
        driver.findElement(webdriver.By.id("ex2")).click();

        driver.findElement(webdriver.By.id("ex2container")).getAttribute('class').then(function(result) {
            chai.expect(result).to.equal('active');
            done();
        });
    });

    it('when clicked the former selection should not have a completed state', function (done) {
        driver.findElement(webdriver.By.id("ex1container")).getAttribute('class').then(function(result) {
            chai.expect(result).to.equal('completed');
            done();
        });
    });

    it('when clicked the former selection should not have a completed state', function (done) {
        driver.findElement(webdriver.By.id("ex1container")).getAttribute('class').then(function(result) {
            chai.expect(result).to.equal('completed');
            done();
        });
    });


    it('when next is clicked, we should be at the final step 3', function (done) {
        driver.findElement(webdriver.By.css(".next")).click();

        driver.findElement(webdriver.By.id("ex3container")).getAttribute('class').then(function(result) {
            chai.expect(result).to.equal('active');
            done();
        });
    });

    it('when finish is clicked, we should be complete', function (done) {
        driver.findElement(webdriver.By.css(".finish")).click();

        driver.findElement(webdriver.By.css(".finish")).getAttribute('class').then(function(result) {
            chai.expect(result).to.equal('next finish disabled');
            done();
        });
    });

});