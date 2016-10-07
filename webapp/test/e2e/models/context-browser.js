'use strict';

var contextBrowser = function() {
    var openContextButton = element(by.css("button.btn.px-tree-open-btn"));

    this.isOpenContextDisplayed = function() {
        return openContextButton.isDisplayed();
    };

    this.clickOpenContext = function() {
        return openContextButton.click();
    };

    this.browseByContextNames = function(contextNames) {
        var contextNamesCopy = contextNames.slice();
        var deferred = protractor.promise.defer();
        browseByContextNamesHelper(contextNamesCopy, deferred);
        return deferred.promise;
    };

    function browseByContextNamesHelper(contextNames, deferred) {
        if (contextNames.length > 0) {
            clickContextName(contextNames[0]).then(function() {
                contextNames.shift();
                browseByContextNamesHelper(contextNames, deferred);
            });
        } else {
            deferred.fulfill();
        }
    }

    function clickContextName(contextName) {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return element(by.cssContainingText('.px-tree-item', contextName)).isPresent();
        }, 8000).then(function() {
            element(by.cssContainingText('.px-tree-item', contextName)).then(function(treeItem) {
                treeItem.click();
                deferred.fulfill();
            });
        });

        return deferred.promise;
    }

    this.getContextNames = function(level) {
        var deferred = protractor.promise.defer();

        browser.wait(function() {
            return element(by.css('.px-tree-item')).isPresent();
        }, 2000).then(function() {
            element.all(by.css('.px-tree-level')).then(function(levels) {
                if(level >= levels.length) {
                    // if no children level
                    deferred.fulfill(null);
                }
                else {
                    levels[level].all(by.css('.px-tree-item')).then(function(elts) {
                       if(elts.length <= 0) {
                           deferred.fulfill(null);
                       }
                       else {
                           levels[level].all(by.css('.px-tree-item'))
                               .map(function(name) {
                                   return name.getText();
                               })
                               .then(function(names) {
                                   deferred.fulfill(names);
                               });
                       }
                    });
                }
            });
        });

        return deferred.promise;
    };

    this.waitForContextName = function(level, child) {
        var deferred = protractor.promise.defer();

        browser.wait(function() {

            var anotherDeferred = protractor.promise.defer();
            element.all(by.css('.px-tree-level')).then(function(levels) {
                if(level >= levels.length) {
                    anotherDeferred.fulfill(false);
                }
                else {
                    anotherDeferred.fulfill(levels[level].element(by.cssContainingText('.px-tree-item', child)).isPresent());
                }
            });

            return anotherDeferred.promise;

        }, 4000).then(function() {
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.resetToFirstLevel = function() {
        var deferred = protractor.promise.defer();

        resetToFirstLevelHelper(deferred);

        return deferred.promise;
    };

    function resetToFirstLevelHelper(deferred) {
        var breadcrumbs = element.all(by.css('.px-tree-breadcrumb'));
        breadcrumbs.count().then(function(count) {
            if (count > 1) {
                breadcrumbs.first().click().then(function() {
                    resetToFirstLevelHelper(deferred);
                });
            } else {
                deferred.fulfill();
            }
        });
    };

    this.clickBreadcrumb = function(name) {
        var deferred = protractor.promise.defer();

        element(by.cssContainingText('.px-tree-breadcrumb', name)).then(function(elt) {
            elt.click().then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.getCbBreadcrumbs = function() {
        var deferred = protractor.promise.defer();

        element.all(by.css('.px-tree-breadcrumb'))
            .map(function(name) {
                return name.getText();
            }).then(function(names) {
                deferred.fulfill(names);
            });

        return deferred.promise;
    };

    this.isCbEllipsisShown = function() {
        var deferred = protractor.promise.defer();

        element.all(by.css('#px-tree-breadcrumbs-ellipsis'))
            .then(function(ellipsis) {
                if(ellipsis.length  > 0) {
                    deferred.fulfill(true);
                }
                else {
                    deferred.fulfill(false);
                }
            });

        return deferred.promise;
    };

    this.getTextInPaneAtIndex = function(index) {
        var panes = element.all(by.css('.px-tree-level'));

        if (index > panes.length - 1) {
            return protractor.promise.fulfilled('');
        } else {
            return panes.get(index).getText();
        }
    };
};

module.exports = new contextBrowser();

