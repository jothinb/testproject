'use strict';

var ViewDialog = function() {
    var dialog = element(by.css('#view-creator'));
    var cancelButton = element(by.css('#view-creator-cancel-btn'));
    var saveButton = element(by.css('#view-creator-save-btn'));
    var viewNameInput = element(by.css('#viewName'));
    var closeButton = element(by.css('#view-creator .close'));
    var backdrop = element(by.css('#widget-selector'));

    this.isOpen = function() {
        return dialog.isDisplayed();
    };

    this.isClosed = function(){
        var deferred = protractor.promise.defer();

        dialog.isDisplayed().then(function(isDisplayed) {
            deferred.fulfill(!isDisplayed);
        });

        return deferred.promise;
    };

    this.clickCancelButton = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        cancelButton.click().then(function() {
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

    this.clickSaveButton = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        saveButton.click().then(function() {
            browser.wait(function() {
                return self.isClosed();
            }, 15000).then(function() {
                browser.wait(function () {
                    return self.isModalClosed();
                }, 2000).then(function(){
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    };

    this.enterName = function(text) {
        return viewNameInput.sendKeys(text);
    };

    this.clearName = function(){
        return viewNameInput.clear();
    };

    this.getEnteredViewName = function(){
        return viewNameInput.getAttribute('value');
    };

    this.isCancelButtonDisplayed = function(){
        return cancelButton.isDisplayed();
    };

    this.isSaveButtonDisplayed = function(){
        return saveButton.isDisplayed();
    };

    this.isSaveButtonEnabled = function(){
        return saveButton.isEnabled();
    };

    this.isCloseButtonDisplayed = function(){
        return closeButton.isDisplayed();
    };

    this.isModalClosed = function() {
        var deferred = protractor.promise.defer();
        backdrop.isDisplayed().then(function(isDisplayed) {
            deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
    };
};

module.exports = new ViewDialog();