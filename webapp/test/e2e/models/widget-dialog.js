var contextBrowser = require('../models/context-browser');

var WidgetDialog = function() {
    var dialog = element(by.css('#widget-selector'));
    var saveButton = element(by.css('#widget-selector .modal-footer .btn-primary'));
    var cancelButton = element(by.css('#widget-selector .modal-footer .btn-default'));
    var halfPageRadioButton = element(by.css('#half-page-button'));
    var fullPageRadioButton = element(by.css('#full-page-button'));
    var backdrops = element.all(by.css('.modal-backdrop'));

    this.selectDataSourceDropdown = function(optionText) {
        var datasource = element(by.cssContainingText('.widget-visualization-panel .widget-datasource-choice .form-control option', optionText));
        return datasource.click();
    };

    var getSelectedFormItem = function(classType) {
        var deferred = protractor.promise.defer();

        element(by.css(classType + ' .form-control option:checked')).then(function(elt) {
            elt.getText().then(function(text) {
                deferred.fulfill(text);
            });
        });

        return deferred.promise;
    };

    this.getSelectedDataSource = function() {
        return getSelectedFormItem('.widget-datasource-choice');
    };

    this.selectWidgetTypeDropdown = function(optionText) {
        var widgetType = element(by.cssContainingText('.widget-visualization-panel .widget-visualization-choice .form-control option', optionText));
        return widgetType.click();
    };

    this.getSelectedWidgetType = function() {
        return getSelectedFormItem('.widget-visualization-choice');
    };

    this.getAvailableDatasources = function() {
        return element(by.model('widgetConfigurator.selectedDatasourceDefinition')).getText();
    };

    this.getAvailableWidgetNames = function() {
        return element(by.model('widgetConfigurator.selectedWidgetDefinition')).getText();
    };

    this.getSelectedSize = function() {
        var deferred = protractor.promise.defer();

        element(by.css('#halfPage_radio')).then(function(halfPage) {
            element(by.css('#fullPage_radio')).then(function(fullPage) {
                halfPage.isSelected().then(function(isHalfPageSelected) {
                    fullPage.isSelected().then(function(isFullPageSelected) {
                        var selected = '';
                        if(isHalfPageSelected) {
                            selected = 'half';
                        }
                        if(isFullPageSelected) {
                            selected = 'full';
                        }
                        deferred.fulfill(selected);
                    });
                });
            });
        });
        return deferred.promise;
    };

    this.isSaveEnabled = function() {
        var deferred = protractor.promise.defer();

        saveButton.isEnabled().then(function(isEnabled) {
            deferred.fulfill(isEnabled);
        });

        return deferred.promise;
    };

    this.clickSaveButton = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        saveButton.click().then(function() {
            browser.wait(function() {
                return self.isClosed();
            }, 2000).then(function() {
                browser.wait(function() {
                    return self.isBackdropGone();
                }, 2000).then(function() {
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    };

    this.clickSaveButtonNoWait = function() {
        return saveButton.click();
    };

    this.clickCancelButton = function() {
        var self = this;
        var deferred = protractor.promise.defer();

        cancelButton.click().then(function() {
            browser.wait(function() {
                return self.isClosed();
            }, 2000).then(function() {
                browser.wait(function() {
                    return self.isBackdropGone();
                }, 2000).then(function() {
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    };

    this.isBackdropGone = function() {
        var deferred = protractor.promise.defer();

        // need this check, because if no backdrop found then return true
        if(backdrops.count() > 0) {
            backdrops.get(0).isDisplayed().then(function() {
                deferred.fulfill(false);
            });
        }
        else {
            deferred.fulfill(true);
        }

        return deferred.promise;
    };

    this.clickHalfPageRadioButton = function() {
        return halfPageRadioButton.click();
    };

    this.clickFullPageRadioButton = function() {
        return fullPageRadioButton.click();
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

    this.hasWidgetError = function(error) {
        var deferred = protractor.promise.defer();

        element.all(by.cssContainingText('.widget-visualization-properties .help-block', error)).then(function(elements) {
            if(elements.length > 0) {
                deferred.fulfill(true);
            }
            else {
                deferred.fulfill(false);
            }
        });

        return deferred.promise;
    };

    this.hasDatasourceError = function(error) {
        var deferred = protractor.promise.defer();

        element.all(by.cssContainingText('.widget-datasource-parameters .help-block', error)).then(function(elements) {
            if(elements.length > 0) {
                deferred.fulfill(true);
            }
            else {
                deferred.fulfill(false);
            }
        });

        return deferred.promise;
    };

    this.changeDatasourceDropdown = function(model, optionValue) {
        var deferred = protractor.promise.defer();

        element(by.cssContainingText('.widget-datasource-parameters select[ng-model=\'model.' + model + '\'] option', optionValue)).then(function(dropdownOption) {
            dropdownOption.click();
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.changeWidgetDropdown = function(model, text) {
        var deferred = protractor.promise.defer();

        element(by.cssContainingText('.widget-visualization-properties select[ng-model=\'model.' + model + '\'] option', text)).then(function(dropdownOption) {
            dropdownOption.click();
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.changeDatasourceText = function(model, text) {
        var deferred = protractor.promise.defer();

        element(by.css('.widget-datasource-parameters input[ng-model=\'model.' + model + '\']')).then(function(input) {
            input.clear();
            input.sendKeys(text);
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.changeWidgetText = function(model, text) {
        var deferred = protractor.promise.defer();

        element(by.css('.widget-visualization-properties input[ng-model=\'model.' + model + '\']')).then(function(input) {
            input.clear();
            input.sendKeys(text);
            deferred.fulfill();
        });

        return deferred.promise;
    };

    this.changeWidgetToggle = function(model) {
        var deferred = protractor.promise.defer();

        element(by.css('.widget-visualization-properties input[ng-model=\'model.' + model + '\']')).then(function(input) {
            input.click();
            deferred.fulfill();
        });

        return deferred.promise;
    };

    var getProperties = function(fromClass) {
        var deferred = protractor.promise.defer();

        element.all(by.css(fromClass + ' form label'))
            .map(function(label) {
                return label.getText();
            })
            .then(function(labels) {
                deferred.fulfill(labels);
            });

        return deferred.promise;
    };

    this.getWidgetProperties = function() {
        return getProperties('.widget-visualization-properties');
    };

    this.getDataSourceProperties = function() {
        return getProperties('.widget-datasource-parameters');
    };

    this.isBackdropGone = function() {
        var deferred = protractor.promise.defer();

        // need this check, because if no backdrop found then return true
        if(backdrops.count() > 0) {
            backdrops.get(0).isDisplayed().then(function() {
                deferred.fulfill(false);
            });
        }
        else {
            deferred.fulfill(true);
        }

        return deferred.promise;
    };


};

module.exports = new WidgetDialog();