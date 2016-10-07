/**
 * Created by 212430289 on 10/24/14.
 */
'use strict';
var deleteViewDialog = require('../models/delete-view-dialog');
var viewDialog = require('../models/view-dialog');

var EditModeControls = function() {
    var editModeButton = element(by.css('#enter-edit-mode-btn'));
    var revertButton = element(by.css('#revert-view-btn'));
    var saveButton = element(by.css('#save-view-btn'));
    var editViewButton = element(by.css("#edit-view-btn"));
    var deleteViewButton = element(by.css("#delete-view-btn"));

    this.isEnterEditButtonPresentNoWait = function() {
        return editModeButton.isPresent();
    };

    this.isEnterEditButtonPresent = function(){
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return editModeButton.isPresent();
        }, 2000).then(function(isPresent) {
            deferred.fulfill(isPresent);
        });

        return deferred.promise;
    }

    this.isEnterEditButtonDisplayed = function() {
        return editModeButton.isDisplayed();
    };

    this.clickEnterEditModeButton = function() {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return editModeButton.isDisplayed();
        }, 2000).then(function() {
            editModeButton.click().then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.isSaveButtonDisplayed = function() {
        return saveButton.isDisplayed();
    };

    this.isSaveButtonPresent = function() {
        return saveButton.isPresent();
    };

    this.isSaveButtonEnabled = function() {
        return saveButton.isEnabled();
    };

    this.clickSaveButton = function() {
        var deferred = protractor.promise.defer();
        saveButton.click().then(function() {
            browser.wait(function() {
                return editModeButton.isPresent();
            }, 12000).then(function() {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };

    this.clickSaveButtonNoWait = function() {
        var deferred = protractor.promise.defer();
        saveButton.click().then(function() {
            deferred.fulfill();
        });
        return deferred.promise;
    };

    this.isRevertButtonDisplayed = function() {
        return revertButton.isDisplayed();
    };

    this.isRevertButtonEnabled = function() {
        return revertButton.isEnabled();
    };

    this.clickRevertButton = function() {
        return revertButton.click();
    };

    this.isEditViewButtonDisplayed = function(){
        return editViewButton.isDisplayed();
    };

    this.isEditViewButtonEnabled = function() {
        return editViewButton.isEnabled();
    };

    this.clickEditViewButton = function(){
        var deferred = protractor.promise.defer();

        editViewButton.click().then(function() {
            browser.wait(function() {
                return viewDialog.isOpen();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.isDeleteViewButtonDisplayed = function(){
        return deleteViewButton.isDisplayed();
    };

    this.isDeleteViewButtonPresent = function(){
        return deleteViewButton.isPresent()
    };

    this.isDeleteViewButtonEnabled = function() {
        return deleteViewButton.isEnabled();
    };

    this.clickDeleteViewButton = function(){
        var deferred = protractor.promise.defer();

        deleteViewButton.click().then(function() {
            browser.wait(function() {
                return deleteViewDialog.isOpen();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };
};

module.exports = new EditModeControls();