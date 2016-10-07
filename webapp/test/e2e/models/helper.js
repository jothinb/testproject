'use strict';

var Helper = function () {

    this.refreshBrowser = function (timeToWaitForAngular) {
        var deferred = protractor.promise.defer();
        browser.refresh(timeToWaitForAngular).then(function() {
            browser.waitForAngular(function() {
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };
};

module.exports = new Helper();