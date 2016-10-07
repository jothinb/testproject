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
 * @class UI test spec for datagrids
 *
 * @author Jeff Reichenberg
 *
 * TODO: make a selenium "PageObject out of the toggle switch to provide an interface to expected behavior
 */

var webdriver = require('webdriver-support/node_modules/selenium-webdriver'),
    chai = require('chai'),
    vissert = require('vissert'),
    webdriverFactory = require('webdriver-support'),
    dataGridPageObj = require('../po/datagrid.js');


chai.use(vissert.chaiVissert);
chai.use(require('chai-as-promised'));

describe('Datagrids tests', function () {

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

    describe('Instancing dataGrid from supported data sources', function () {

        before(function() {
            //nav to our test fixture.  Can pull this up outside of tests with "$ http-server" and then http://localhost:8080/test/ui//fixtures/data-loading.html
            return driver.get('../fixtures/data-loading.html');
        });

        it('should instance a datagrid from the expected DOM', function () {
            var dataGridLocator = webdriver.By.css('table[data-table-name="dt-dom"].dataTable');

            driver.wait(function() {
                // explicit wait: until datagrid is ready
                return driver.isElementPresent(dataGridLocator);
            }, 3000);

            //assert number of body rows
            return chai.expect(
                driver.findElement(dataGridLocator).findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length(3);
        });

        it('should instance a datagrid from a provided Array', function () {

            var dataGridLocator = webdriver.By.css('table[data-table-name="dt-array"].dataTable');

            driver.wait(function() {
                // explicit wait: until datagrid is ready
                return driver.isElementPresent(dataGridLocator);
            }, 3000);

            //assert number of body rows
            return chai.expect(
                driver.findElement(dataGridLocator).findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length(3);
        });

        it('should instance a datagrid from an object array ajaxed in', function () {

            var dataGridLocator = webdriver.By.css('table[data-table-name="dt-ajax-objects"].dataTable');

            driver.wait(function() {
                // explicit wait: until datagrid is ready
                return driver.isElementPresent(dataGridLocator);
            }, 3000);

            //assert number of body rows
            return chai.expect(
                driver.findElement(dataGridLocator).findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length.above(9);
        });

        it('should instance a datagrid from an array of arrays ajaxed in', function () {

            var dataGridLocator = webdriver.By.css('table[data-table-name="dt-ajax-array"].dataTable');

            driver.wait(function() {
                // explicit wait: until datagrid is ready
                return driver.isElementPresent(dataGridLocator);
            }, 3000);

            //assert number of body rows
            return chai.expect(
                driver.findElement(dataGridLocator).findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length(5);
        });
    });

    describe('Column filtering', function () {

        before(function() {
            //nav to our test fixture.  Can pull this up outside of tests with "$ http-server" and then http://localhost:8080/test/ui/fixtures/data-loading.html
            driver.get('../fixtures/col-filtering.html');

            return driver.wait(webdriver.until.elementLocated(webdriver.By.css('table.dataTable tbody tr td')), 5000);
        });

    //    it('should be visually the same as a screenshot', function() {
    //        return chai.expect(
    //            driver.takeScreenshot()
    //        ).to.eventually.visuallyEqual(__dirname + '/../fixtures/col-filtering.png');
    //    });
    //
    //    it('should be dom-ally the same as a fixture', function() {
    //        var serializerScript = vissert.domDiffer.getSerializeFromBrowserScript();
    //        return chai.expect(
    //            driver.executeScript(serializerScript)
    //        ).to.eventually.domEqual(__dirname + '/../fixtures/col-filtering.json');
    //    });

        it('should not filter if nothing is in the filter fields', function () {

            driver.wait(function() {
                // explicit wait: until datagrid is ready
                return driver.isElementPresent(webdriver.By.css('table.dataTable'));
            }, 3000);

            //assert number of body rows
            return chai.expect(
                driver.findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length.above(9);
        });

        it('should filter based on a value in the filter fields', function () {
            driver.findElement(webdriver.By.xpath("(//thead//input[@type='search'])[3]"))
                .sendKeys("7");

            //assert number of body rows
            return chai.expect(
                driver.findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length(1);
        });

        it('should unfilter when a filter input value is removed', function () {
            //clear filter previously set
            driver.findElement(webdriver.By.xpath("(//thead//input[@type='search'])[3]"))
                .clear();
            driver.findElement(webdriver.By.xpath("(//thead//input[@type='search'])[3]"))
                .sendKeys(" ");//TODO: why doesn't clear() do the job?

            //assert number of body rows
            return chai.expect(
                driver.findElements(webdriver.By.css("tbody tr"))
            ).to.eventually.have.length.above(9);
        });
    });
});
