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
 * @class Node module that exports a PageObject that represents an iidsBasicDataGrid instance
 *
 * @author Jeff Reichenberg
 *
 */

module.exports = {

    root: null,

    name: null,

    driver: null,

    webdriver: null,

    init: function(driver, webdriver, name) {
        this.name = name;
        this.driver = driver;
        this.webdriver = webdriver;
        driver.findElement(this.webdriver.By.xpath("//table[@data-table-name='" + name + "']")).then(function(root) {
            console.log("ROOT=" + root);
            this.root = root;
        });
        return this;
    },

    isReady: function() {
        var promise = this.driver.isElementPresent(this.webdriver.By.xpath("//table[@data-table-name='" + name + "' and contains(@class='dataTable']")).then(function(present) {
            console.log("ROOT=" + this.root);
            if (present) {
                console.log("ROOT2=" + this.root);
                this.driver.findElement(this.webdriver.By.xpath("//table[@data-table-name='" + name + "']")).then(function(root) {
                    console.log("ROOT3=" + root);
                    this.root = root;
                });
            }
        });
        return promise;
    },

    sort: function(colIdx) {
        this.root.findElement(this.webdriver.By.xpath("//thead/tr/th[" + colIdx + 1 + "]")).then(function(headerCell) {
            headerCell.click();
        });
    },

    getSortedColumnIdx: function() {
        this.root.findElements(this.webdriver.By.xpath("//thead/th")).then(function(headerCells) {
            for (var i=0; i<headerCells.length; i++) {
            //TBD with promises, etc.
            }
        });
    },

    colFilter: function(colIdx, txt) {
        this.root.findElement(this.webdriver.By.xpath("//thead/tr[@class='filter-row']/td[" + colIdx + 1 + "]/input")).then(function(filterEl) {
            filterEl.sendKeys(txt);
            this.root.click();//focus elsewhere to fire the change event
        });
    }
};
