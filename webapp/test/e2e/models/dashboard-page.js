'use strict';

var contextSelector = require('./context-selector');
var contextBrowser = require('./context-browser');
var widgetDialog = require('./widget-dialog');
var deleteWidgetDialog = require('./delete-widget-dialog');
var editModeControls = require('./edit-mode-controls');
var viewSelector = require('./view-selector');
var viewDialog = require('./view-dialog');
var deleteViewDialog = require('./delete-view-dialog');

var DashboardPage = function() {

    var elementOutOfContextBrowser = element(by.css(".content.container"));
    var widgetContainerSections = element.all(by.css("#widgets-container .widget-module"));
    var fullAddWidgetButton = element(by.css('.module-add-widget-full'));
    var widgetModules = element.all(by.css('.widget-module'));
    var deleteWidgetIcons = element.all(by.css('.delete-widget-btn'));
    var editWidgetIcons = element.all(by.css('.edit-widget-btn'));
    var backdrop = element(by.css('#widget-selector'));
    var noViewText = element(by.css('#no-view-text h2'));
    var createViewHyperLink = element(by.css('#no-view-text a'));
    var errors = element(by.css('#dashboardAlert div'));
    var errorClose = element(by.css('#dashboardAlert button'));
    var logoutDropdown = element(by.css('.btn-toolbar .btn'));
    var signoutLink = element(by.css('.icon-signout'));

    this.getAllWidgetsAndModules = function() {
        return element.all(by.css('#widgets-container > section'));
    };

    this.getAllWidgetsAndModulesText = function() {
        var deferred = protractor.promise.defer();

        element.all(by.css('#widgets-container > section'))
            .map(function(label) {
                return label.getText();
            })
            .then(function(allText) {
                deferred.fulfill(allText);
            });

        return deferred.promise;
    };

    this.clickOutsideContextBrowser = function() {
        return elementOutOfContextBrowser.click();
    };

    this.openContextWithPath = function(contextPath) {
        var deferred = protractor.promise.defer();

        var self = this;
        browser.wait(function() {
            return contextSelector.isContextNameDisplayed();
        }, 4000).then(function() {
            contextSelector.toggleContextBrowser().then(function() {
                contextBrowser.resetToFirstLevel().then(function() {
                    contextBrowser.waitForContextName(0, contextPath[0]).then(function() {
                        contextBrowser.browseByContextNames(contextPath).then(function() {
                            contextBrowser.clickOpenContext().then(function() {
                                self.waitForContextNameToBe(contextPath[contextPath.length-1]).then(function() {
                                    deferred.fulfill();
                                });
                            });
                        });
                    });
                });
            });
        });

        return deferred.promise;
    };

    this.waitForContextNameToBe = function(name) {
        var deferred = protractor.promise.defer();
        browser.wait(function() {
            var anotherDeferred = protractor.promise.defer();
            contextSelector.getContextNameNoWait().then(function(text) {
                anotherDeferred.fulfill(text == name);
            });
            return anotherDeferred.promise;
        }, 12000).then(function() {
            deferred.fulfill();
        });
        return deferred.promise;
    };

    this.isInEditMode = function() {
        return editModeControls.isSaveButtonDisplayed();
    };

    this.getNumberWidgetSections = function() {
        return widgetContainerSections.count();
    };

    this.isFullAddWidgetButtonDisplayed = function() {
        return fullAddWidgetButton.isDisplayed();
    };

    this.isFullAddWidgetButtonPresent = function() {
        return fullAddWidgetButton.isPresent();
    };

    this.getWidgetsCount = function() {
        return widgetModules.count();
    };

    this.getWidgetAtIndex = function(index) {
        return widgetModules.get(index);
    };

    this.getDeleteWidgetIconsCount = function() {
        return deleteWidgetIcons.count();
    };

    this.getEditWidgetIconsCount = function() {
        return editWidgetIcons.count();
    };

    this.clickDeleteWidgetButtonAtIndex = function(index) {
        var deferred = protractor.promise.defer();

        deleteWidgetIcons.get(index).click().then(function() {
            browser.wait(function() {
                return deleteWidgetDialog.isOpen();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.clickEditWidgetButtonAtIndex = function(index) {
        var deferred = protractor.promise.defer();

        editWidgetIcons.get(index).click().then(function() {
            browser.wait(function() {
                return widgetDialog.isOpen();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.clickAddWidgetButton = function() {
        var deferred = protractor.promise.defer();

        fullAddWidgetButton.click().then(function() {
            browser.wait(function() {
                return widgetDialog.isOpen();
            }, 2000).then(function() {
                deferred.fulfill();
            });
        });

        return deferred.promise;
    };

    this.addHalfSizeWidget = function(widget, datasource) {
        var self = this;
        var deferred = protractor.promise.defer();

        this.clickAddWidgetButton().then(function() {
            widgetDialog.selectDataSourceDropdown(datasource).then(function() {
                widgetDialog.selectWidgetTypeDropdown(widget).then(function() {
                    widgetDialog.clickHalfPageRadioButton().then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            browser.wait(function() {
                                return self.isModalClosed();
                            }, 2000).then(function() {
                                deferred.fulfill();
                            });
                        });
                    });
                })
            });
        });

        return deferred.promise;
    };

    /**
     * This little shortcut method opens the add widget dialog and fills out the datasource and widget type
     * (then you can change additional parameters and save)
     */
    this.startAddingWidget = function(widget, datasource) {
        var deferred = protractor.promise.defer();

        this.clickAddWidgetButton().then(function() {
            widgetDialog.selectDataSourceDropdown(datasource).then(function() {
                widgetDialog.selectWidgetTypeDropdown(widget).then(function() {
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    };

    this.addHalfSizeWidgetTo = function(module, widget, datasource) {
        var self = this;
        var deferred = protractor.promise.defer();

        module.click().then(function() {
            widgetDialog.selectDataSourceDropdown(datasource).then(function() {
                widgetDialog.selectWidgetTypeDropdown(widget).then(function() {
                    widgetDialog.clickHalfPageRadioButton().then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            browser.wait(function() {
                                return self.isModalClosed();
                            }, 2000).then(function() {
                                deferred.fulfill();
                            });
                        });
                    });
                })
            });
        });

        return deferred.promise;
    };

    this.addFullSizeWidget = function(widget, datasource) {
        var self = this;
        var deferred = protractor.promise.defer();

        this.clickAddWidgetButton().then(function() {
            widgetDialog.selectDataSourceDropdown(datasource).then(function() {
                widgetDialog.selectWidgetTypeDropdown(widget).then(function() {
                    widgetDialog.clickFullPageRadioButton().then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            browser.wait(function() {
                                return self.isModalClosed();
                            }, 2000).then(function() {
                                deferred.fulfill();
                            });
                        });
                    });
                });
            });
        });

        return deferred.promise
    };

    this.isModalClosed = function() {
        var deferred = protractor.promise.defer();
        backdrop.isDisplayed().then(function(isDisplayed) {
            deferred.fulfill(!isDisplayed);
        });
        return deferred.promise;
    };

    this.getContextWithNoViewsText = function() {
        return noViewText.getText();
    };

    this.isCreateViewHyperlinkEnabled = function() {
        return createViewHyperLink.isEnabled();
    };

    this.addView = function(viewName){
        var deferred = protractor.promise.defer();
        var self = this;
        viewSelector.openCreateViewDialog().then(function() {
            viewDialog.enterName(viewName).then(function() {
                viewDialog.clickSaveButton().then(function() {
                    browser.wait(function() {
                        return self.isModalClosed();
                    }, 2000).then(function() {
                        deferred.fulfill();
                    });
                });
            });
        });
        return deferred.promise;
    };

    this.deleteView = function(viewName) {
        var deferred = protractor.promise.defer();
        viewSelector.hasViewOption(viewName).then(function(hasView) {
            if(hasView) {
                viewSelector.selectViewByText(viewName).then(function() {
                    editModeControls.clickEnterEditModeButton().then(function() {
                        editModeControls.clickDeleteViewButton().then(function() {
                            deleteViewDialog.clickOk().then(function() {
                                browser.wait(function() {
                                    return editModeControls.isEnterEditButtonPresent();
                                }, 3000).then(function() {
                                    deferred.fulfill();
                                });
                            });
                        });
                    });
                });
            }
            else {
                deferred.fulfill();
            }
        });
        return deferred.promise;
    };

    this.isCreateViewHyperlinkDisplayed = function(){
        return createViewHyperLink.isDisplayed();
    };

    this.clickCreateViewHyperlink = function(){
        return createViewHyperLink.click();
    };

    this.getErrorMessages = function() {
        return errors.getText();
    };

    this.closeErrorMessage = function() {
        return errorClose.click();
    };

    this.logout = function() {
        logoutDropdown.click().then(function() {
            signoutLink.click();
        });
    }
};

module.exports = new DashboardPage();