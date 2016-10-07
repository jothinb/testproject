'use strict';

var dashboardPage = require('../models/dashboard-page');

var DeleteWidgetDialog = function() {
    var dialog = element(by.css('#delete-widget'));
    var cancelButton = element(by.css('#delete-widget-cancel-btn'));
    var okButton = element(by.css('#delete-widget-ok-btn'));
    var xButton = element(by.css('#delete-widget button.close'));
    var backdrop = element(by.css('.modal-backdrop'));

    this.getContent = function() {
        return dialog.getText();
    };

    this.isOpen = function() {
        return dialog.isDisplayed();
    };

    this.isClosed = function() {
        var deferred = protractor.promise.defer();

        dialog.isDisplayed().then(function(isDisplayed) {
            deferred.fulfill(!isDisplayed);
        });

        return deferred.promise;
    };

    this.clickCancel = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        cancelButton.click().then(function() {
            browser.wait(function() {
                return self.isClosed();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.clickOk = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        okButton.click().then(function() {
            browser.wait(function() {
                return self.isClosed();
            }, 2000).then(function() {
                browser.wait(function () {
                    return self.isModalClosed();
                }, 2000).then(function(){
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    };

    this.isModalClosed = function() {
        var deferred = protractor.promise.defer();
        backdrop.isPresent().then(function(isPresent) {
            deferred.fulfill(!isPresent);
        });
        return deferred.promise;
    };
};

module.exports = new DeleteWidgetDialog();