'use strict';

var viewDialog = require('./view-dialog');

var ViewSelector = function() {
    var dropdown = element(by.css('view-selector'));
    var dropdownButton = element(by.css("#view-selector-dropdown-btn"));

    this.isPresent = function() {
        return dropdown.isPresent();
    };

    this.isDisplayed = function() {
        return dropdown.isDisplayed();
    };

    this.isEnabled = function() {
        var deferred = protractor.promise.defer();
        dropdownButton.getAttribute('class').then(function(classes) {
            var indexOfDisabled = classes.split(' ').indexOf('disabled');
            deferred.fulfill(indexOfDisabled < 0);
        });
        return deferred.promise;
    };

    this.hasViewOption = function(text) {
        return element(by.cssContainingText('view-selector .dropdown-menu a', text)).isPresent();
    };

    this.selectViewByText = function(text) {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return dropdownButton.isPresent();
        }, 2000).then(function() {
            dropdownButton.click().then(function() {
                element(by.cssContainingText('view-selector .dropdown-menu a', text)).then(function(menuOption) {
                    menuOption.click().then(function() {
                        deferred.fulfill();
                    });
                });
            });
        });

        return deferred.promise;
    };

    this.openCreateViewDialog = function() {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return dropdownButton.isPresent();
        }, 6000).then(function() {
            dropdownButton.click().then(function() {
                element(by.css('view-selector .dropdown-menu #view-selector-create-view-btn')).then(function(menuOption) {
                    menuOption.click().then(function() {
                        browser.wait(function() {
                            return viewDialog.isOpen();
                        }, 2000).then(function() {
                            deferred.fulfill();
                        });
                    });
                });
            });
        });

        return deferred.promise;
    };

    this.getCurrentViewName = function() {
        return dropdownButton.getText();
    };

    this.getNumberOfViews = function(){
        return element.all(by.css('view-selector a')).count();
    };

    this.getFirstViewName = function(){
        var deferred = protractor.promise.defer();
        dropdownButton.click().then(function() {
            deferred.fulfill(element.all(by.css('view-selector a')).first().getText());
        });
        return deferred.promise;
    };

};

module.exports = new ViewSelector();