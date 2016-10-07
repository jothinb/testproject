'use strict';

var dashboardPage = require('../../models/dashboard-page');
var contextSelector = require('../../models/context-selector');
var viewSelector = require('../../models/view-selector');
var widgetDialog = require('../../models/widget-dialog');
var editModeControls = require('../../models/edit-mode-controls');
var datagrid = require('../../models/datagrid');
var viewDialog = require('../../models/view-dialog');
var deleteViewDialog = require('../../models/delete-view-dialog');

describe('CRUD Views', function() {

    var testingContext = ['California', 'Coastal Empire', 'Gas Turbine'];
    var alternatePerfectContext = ['California', 'Coastal Empire', 'Generator'];

    var firstView = null;

    afterEach(function() {
        if (firstView != null) {
            dashboardPage.deleteView(firstView).then(function() {
                firstView = null;
            });
        }
    });

    //14.3_3
    it('Verify user is able to create new view with data series and time series widgets.', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            addTestingViewWithWidgets(firstView).then(function() {
                verifyMyView().then(function() {
                    dashboardPage.openContextWithPath(alternatePerfectContext).then(function() {
                        dashboardPage.openContextWithPath(testingContext).then(function() {
                            viewSelector.selectViewByText(firstView).then(function() {
                                verifyMyView();
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_4
    it('Verify user is able to edit the newly created view with data series and time series widgets.', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            addTestingViewWithWidgets(firstView).then(function() {
                verifyMyView().then(function() {
                    editModeControls.clickEnterEditModeButton().then(function() {
                        dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                            widgetDialog.clickFullPageRadioButton().then(function() {
                                widgetDialog.changeWidgetText("title", "diff datagrid").then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        editModeControls.clickSaveButton().then(function() {
                                            verifyMyRevisedView().then(function() {
                                                dashboardPage.openContextWithPath(alternatePerfectContext).then(function() {
                                                    dashboardPage.openContextWithPath(testingContext).then(function() {
                                                        viewSelector.selectViewByText(firstView).then(function() {
                                                            verifyMyRevisedView();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_9
    it('Verify user is able to delete the newly created view and recreate.', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            addTestingViewWithWidgets(firstView).then(function() {
                verifyMyView().then(function() {
                    expect(viewSelector.hasViewOption(firstView)).toBe(true);
                    dashboardPage.deleteView(firstView).then(function() {
                        expect(viewSelector.hasViewOption(firstView)).toBe(false);
                        dashboardPage.openContextWithPath(alternatePerfectContext).then(function() {
                            dashboardPage.openContextWithPath(testingContext).then(function() {
                                addTestingViewWithWidgets(firstView).then(function() {
                                    verifyMyView();
                                    expect(viewSelector.hasViewOption(firstView)).toBe(true);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_11
    it('Verify user is able to edit the newly created view with data series and time series widgets and Revert the changes.', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            addTestingViewWithWidgets(firstView).then(function() {
                verifyMyView().then(function() {
                    editModeControls.clickEnterEditModeButton().then(function() {
                        dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                            widgetDialog.clickFullPageRadioButton().then(function() {
                                widgetDialog.changeWidgetText("title", "diff datagrid").then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        editModeControls.clickRevertButton().then(function() {
                                            verifyMyView().then(function() {
                                                dashboardPage.openContextWithPath(alternatePerfectContext).then(function() {
                                                    dashboardPage.openContextWithPath(testingContext).then(function() {
                                                        viewSelector.selectViewByText(firstView).then(function() {
                                                            verifyMyView();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3
    it('Verify view dialog \'save\' button is disabled after clicking \'save\' button and enable again when adding another view', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            viewSelector.openCreateViewDialog().then(function() {
                viewDialog.enterName(firstView).then(function() {
                    viewDialog.clickSaveButton().then(function() {
                        expect(viewDialog.isSaveButtonEnabled()).toBe(false);
                        viewDialog.isModalClosed().then(function() {
                            editModeControls.clickRevertButton().then(function() {
                                viewSelector.openCreateViewDialog().then(function() {
                                    viewDialog.enterName(firstView).then(function() {
                                        expect(viewDialog.isSaveButtonEnabled()).toBe(true);
                                        viewDialog.clickCancelButton();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3
    it('Verify view \'save\', \'edit\', \'delete\'  buttons are disabled after clicking \'save\' view button on edit mode controls and re-enabled after enter edit mode', function() {
        firstView = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            editModeControls.isEnterEditButtonPresent().then(function(){
                editModeControls.clickEnterEditModeButton().then(function() {
                    editModeControls.clickSaveButtonNoWait().then(function() {
                        expect(editModeControls.isSaveButtonEnabled()).toBe(false);
                        expect(editModeControls.isDeleteViewButtonEnabled()).toBe(false);
                        expect(editModeControls.isEditViewButtonEnabled()).toBe(false);
                        editModeControls.isEnterEditButtonPresent().then(function(){
                            editModeControls.clickEnterEditModeButton().then(function() {
                                expect(editModeControls.isSaveButtonEnabled()).toBe(true);
                                expect(editModeControls.isDeleteViewButtonEnabled()).toBe(true);
                                expect(editModeControls.isEditViewButtonEnabled()).toBe(true);
                            });
                        });
                    });
                });
            });
        });
    });

    var addTestingViewWithWidgets = function(name) {
        var deferred = protractor.promise.defer();
        dashboardPage.addView(name).then(function() {
            dashboardPage.startAddingWidget("Datagrid", "MockDatagridDS").then(function() {
                widgetDialog.changeWidgetText("title", "My Datagrid!").then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        dashboardPage.startAddingWidget("Time Series", "MockTimeSeriesDs").then(function() {
                            widgetDialog.changeWidgetText("title", "My Timeseries!").then(function() {
                                widgetDialog.clickSaveButton().then(function() {
                                    editModeControls.clickSaveButton().then(function() {
                                        deferred.fulfill();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        return deferred.promise;
    };

    var verifyMyView = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
            dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                expect(allModulesText.length).toBe(2);
                expect(allModulesText[0]).toContain('My Datagrid!');
                expect(allModulesText[1]).toContain('My Timeseries!');
                expect(allModules[0].getAttribute('class')).toContain('6');
                expect(allModules[1].getAttribute('class')).toContain('6');
                datagrid.getContent(allModules[0]).then(function(content) {
                    expect(content.getNumRows()).toEqual(6);
                    expect(content.getRow(0)).toContain('1432');
                    expect(content.getRow(1)).toContain('1857');
                    deferred.fulfill();
                });
            });
        });
        return deferred.promise;
    };

    var verifyMyRevisedView = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
            dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                expect(allModulesText.length).toBe(2);
                expect(allModulesText[0]).toContain('diff datagrid');
                expect(allModulesText[1]).toContain('My Timeseries!');
                expect(allModules[0].getAttribute('class')).toContain('12');
                expect(allModules[1].getAttribute('class')).toContain('6');
                datagrid.getContent(allModules[0]).then(function(content) {
                    expect(content.getNumRows()).toEqual(6);
                    expect(content.getRow(0)).toContain('1432');
                    expect(content.getRow(1)).toContain('1857');
                    deferred.fulfill();
                });
            });
        });
        return deferred.promise;
    };

});