'use strict';

var DeleteViewDialog = function() {
    var dialog = element(by.css('#view-deleter'));
    var cancelButton = element(by.css('#delete-view-cancel-btn'));
    var okButton = element(by.css('#delete-view-ok-btn'));
    var closeButton = element(by.css('#view-deleter button.close'));
    var dialogBody = element(by.css('#view-deleter .modal-body'));
    var dialogTitle = element(by.css('#view-deleter .modal-title'));
    var backdrop = element(by.css('#widget-selector'));

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

    this.isCancelButtonDisplayed = function(){
        return cancelButton.isDisplayed();
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

    this.isOkButtonDisplayed = function(){
        return okButton.isDisplayed();
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

    this.isCloseButtonDisplayed = function(){
        return closeButton.isDisplayed();
    };

    this.clickClose = function(){
        var self = this;
        var deferred = protractor.promise.defer();

        closeButton.click().then(function() {
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

    this.getDialogMessage = function(){
        return dialogBody.getText();
    };

    this.getDialogTitle = function(){
        return dialogTitle.getText()
    };

    this.isModalClosed = function() {
        var deferred = protractor.promise.defer();
        backdrop.isDisplayed().then(function(isDisplayed) {
            deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
    };
};

module.exports = new DeleteViewDialog();