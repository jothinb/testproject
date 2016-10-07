/**
 * Created by 212430289 on 10/24/14.
 */
'use strict';

var ContextSelector = function() {
    var contextBrowserPopup = element(by.css("#context-browser-dropdown .dropdown-menu"));
    var contextBrowserName = element(by.css('#context-browser-name'));
    var breadcrumbs = element(by.css('context-selector #breadcrumbs'));
    var contextBrowserDropdownToggle = element(by.css("#context-browser-dropdown .dropdown-toggle"));

    this.isContextBrowserOpen = function() {
        return contextBrowserPopup.isDisplayed();
    };

    this.toggleContextBrowser = function() {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return contextBrowserName.isPresent();
        }, 2000).then(function() {
            contextBrowserName.click().then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.isContextNameDisplayed = function() {
        var deferred = protractor.promise.defer();
        contextBrowserName.isPresent().then(function(isPresent) {
            if(isPresent) {
                contextBrowserName.isDisplayed().then(function(isDisplayed) {
                    deferred.fulfill(isDisplayed);
                });
            }
            else {
                deferred.fulfill(false);
            }
        });
        return deferred.promise;
    };

    this.getContextName = function() {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            var anotherDeferred = protractor.promise.defer();
            contextBrowserName.getText().then(function(text) {
                anotherDeferred.fulfill(text != "Select Context");
            });
            return anotherDeferred.promise;
        }, 4000).then(function() {
            deferred.fulfill(contextBrowserName.getText());
        });

        return deferred.promise;
    };

    this.getContextNameNoWait = function() {
        return contextBrowserName.getText();
    };

    this.getBreadcrumbs = function() {
        return breadcrumbs.getText();
    };

    this.isEnabled = function() {
        var deferred = protractor.promise.defer();

        contextBrowserDropdownToggle.getAttribute('class').then(function(classAttrsStr) {
            var classAttrs = classAttrsStr.split(' ');
            for (var i in classAttrs) {
                if (classAttrs[i] == 'disabled') {
                    deferred.fulfill(false);
                }
            }
            deferred.fulfill(true);
        });
        return deferred.promise;
    };
};

module.exports = new ContextSelector();