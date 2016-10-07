'use strict';

var dashboardPage = require('../../models/dashboard-page');
var datagrid = require('../../models/datagrid');
var timeseries = require('../../models/timeseries');
var editModeControls = require('../../models/edit-mode-controls');
var viewSelector = require('../../models/view-selector');
var widgetDialog = require('../../models/widget-dialog');
var deleteWidgetDialog = require('../../models/delete-widget-dialog');

describe('CRUD Widgets', function() {

    var testingContext = ['California','Coastal Empire','Steam Generator'];
    var testingContext2 = ['California','Coastal Empire','Gas Turbine'];

    var context1View = null;
    var context1View2 = null;
    var context2View = null;

    afterEach(function() {
        viewSelector.isEnabled().then(function(isEnabled) {
            if(!isEnabled) {
                editModeControls.clickRevertButton();
            }
        });

        // try deleting all these created views if they exist
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.deleteView(context1View).then(function() {
                context1View = null;
                dashboardPage.deleteView(context1View2).then(function() {
                    context1View2 = null;
                    dashboardPage.openContextWithPath(testingContext2).then(function() {
                        dashboardPage.deleteView(context2View).then(function() {
                            context2View = null;
                        });
                    });
                });
            });
        });
    });

    //14.3_5
    it('Verify user is able to have multiple data grid widgets from different datasources and time series with different datasources in one view.', function() {
        context1View = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function() {
                    dashboardPage.addFullSizeWidget("Datagrid", "DatagridDS2").then(function() {
                        dashboardPage.addFullSizeWidget("Time Series", "MockTimeSeriesDs").then(function() {
                            dashboardPage.addFullSizeWidget("Time Series", "TimeSeriesDs2").then(function() {
                                verify4Widgets();
                            });
                        });
                    });
                });
            });
        });
    });

    var verify4Widgets = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getWidgetAtIndex(0).then(function(dg1) {
            dashboardPage.getWidgetAtIndex(1).then(function(dg2) {
                dashboardPage.getWidgetAtIndex(2).then(function(ts1) {
                    dashboardPage.getWidgetAtIndex(3).then(function(ts2) {
                        datagrid.getContent(dg1).then(function(dg1content) {
                            datagrid.getContent(dg2).then(function(dg2content) {
                                timeseries.getContent(ts1).then(function(ts1content) {
                                    timeseries.getContent(ts2).then(function(ts2content) {

                                        expect(ts1content.getTitle()).toEqual(['Time Series Data']);
                                        expect(ts1content.numSeries()).toEqual(3);
                                        expect(ts1content.getSeriesLabels()).toEqual([ 'Winter 2007-2008', 'Winter 2008-2009', 'Winter 2009-2010' ]);

                                        expect(ts2content.getTitle()).toEqual(['Time Series Data']);
                                        expect(ts2content.numSeries()).toEqual(2);
                                        expect(ts2content.getSeriesLabels()).toEqual([ 'Jan', 'Apr' ]);

                                        expect(dg1content.getTitle()).toEqual('Datagrid');
                                        expect(dg1content.getNumRows()).toEqual(6);
                                        expect(dg1content.getRow(0)).toContain('1432');
                                        expect(dg1content.getRow(1)).toContain('1857');

                                        expect(dg2content.getTitle()).toEqual('Datagrid');
                                        expect(dg2content.getNumRows()).toEqual(10);
                                        expect(dg2content.getRow(0)).toContain('a 1');
                                        expect(dg2content.getRow(1)).toContain('b 2');
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

    //14.3_6
    it('Verify adding the same datagrid/timeseries widget to multiple views.(Negative)', function() {
        context1View = Date.now() + "view1";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                addACoupleWidgets().then(function() {
                    verify2Widgets().then(function() {
                        context1View2 = Date.now() + "view2";
                        dashboardPage.addView(context1View2).then(function() {
                            addACoupleWidgets().then(function() {
                                verify2Widgets().then(function() {
                                    dashboardPage.openContextWithPath(testingContext2).then(function() {
                                        context2View = Date.now() + "view3";
                                        dashboardPage.addView(context2View).then(function() {
                                            addACoupleWidgets().then(function() {
                                                verify2Widgets();
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

    var addACoupleWidgets = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function() {
            dashboardPage.addFullSizeWidget("Time Series", "MockTimeSeriesDs").then(function() {
                editModeControls.clickSaveButton().then(function() {
                    deferred.fulfill();
                });
            });
        });
        return deferred.promise;
    };

    var verify2Widgets = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getWidgetAtIndex(0).then(function(dg) {
            dashboardPage.getWidgetAtIndex(1).then(function(ts) {
                datagrid.getContent(dg).then(function(dgcontent) {
                    timeseries.getContent(ts).then(function(tscontent) {

                        expect(tscontent.getTitle()).toEqual(['Time Series Data']);
                        expect(tscontent.numSeries()).toEqual(3);
                        expect(tscontent.getSeriesLabels()).toEqual([ 'Winter 2007-2008', 'Winter 2008-2009', 'Winter 2009-2010' ]);

                        expect(dgcontent.getTitle()).toEqual('Datagrid');
                        expect(dgcontent.getNumRows()).toEqual(6);
                        expect(dgcontent.getRow(0)).toContain('1432');
                        expect(dgcontent.getRow(1)).toContain('1857');

                        deferred.fulfill();
                    });
                });
            });
        });
        return deferred.promise;
    };

    //14.3_7
    it('Verify editing the same data grid/timeseries widget properties on multiple views(Negative)', function() {
        context1View = Date.now() + "view1";
        context1View2 = Date.now() + "view2";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                addACoupleWidgets().then(function() {
                    verify2Widgets().then(function() {
                        dashboardPage.addView(context1View2).then(function() {
                            addACoupleWidgets().then(function() {
                                verify2Widgets().then(function() {
                                    makeSomeEdits().then(function() {
                                        widgetDialog.clickSaveButton().then(function() {
                                            editModeControls.clickSaveButton().then(function() {
                                                verifyEditedWidgets().then(function() {
                                                    viewSelector.selectViewByText(context1View).then(function() {
                                                        verify2Widgets();
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

    var makeSomeEdits = function() {
        var deferred = protractor.promise.defer();
        editModeControls.clickEnterEditModeButton().then(function() {
            dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                widgetDialog.changeWidgetText("title", "different title").then(function() {
                    widgetDialog.selectDataSourceDropdown("DatagridDS2").then(function() {
                        deferred.fulfill();
                    });
                });
            });
        });
        return deferred.promise;
    };

    var verifyEditedWidgets = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getWidgetAtIndex(0).then(function(dg) {
            dashboardPage.getWidgetAtIndex(1).then(function(ts) {
                datagrid.getContent(dg).then(function(dgcontent) {
                    timeseries.getContent(ts).then(function(tscontent) {

                        expect(tscontent.getTitle()).toEqual(['Time Series Data']);
                        expect(tscontent.numSeries()).toEqual(3);
                        expect(tscontent.getSeriesLabels()).toEqual([ 'Winter 2007-2008', 'Winter 2008-2009', 'Winter 2009-2010' ]);

                        expect(dgcontent.getTitle()).toEqual('different title');
                        expect(dgcontent.getNumRows()).toEqual(10);
                        expect(dgcontent.getRow(0)).toContain('a 1');
                        expect(dgcontent.getRow(1)).toContain('b 2');

                        deferred.fulfill();
                    });
                });
            });
        });
        return deferred.promise;
    };

    //14.3_8
    it('Verify deletion of a widget in a view is NOT deleting similar widget in other views (Negative)', function() {
        context1View = Date.now() + "view1";
        context1View2 = Date.now() + "view2";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                addACoupleWidgets().then(function() {
                    verify2Widgets().then(function() {
                        dashboardPage.addView(context1View2).then(function() {
                            addACoupleWidgets().then(function() {
                                verify2Widgets().then(function() {
                                    deleteWidgets().then(function() {
                                        editModeControls.clickSaveButton().then(function() {
                                            verifyNoWidgets().then(function() {
                                                viewSelector.selectViewByText(context1View).then(function() {
                                                    verify2Widgets();
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

    var deleteWidgets = function() {
        var deferred = protractor.promise.defer();
        editModeControls.clickEnterEditModeButton().then(function() {
            dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                deleteWidgetDialog.clickOk().then(function() {
                    dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                        deleteWidgetDialog.clickOk().then(function() {
                            deferred.fulfill();
                        });
                    });
                });
            });
        });
        return deferred.promise;
    };

    var verifyNoWidgets = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getAllWidgetsAndModules().then(function(modules) {
            expect(modules.length).toBe(0);
            deferred.fulfill();
        });
        return deferred.promise;
    };

    //14.3_10
    it('Verify user is able to delete widgets and recreate.', function() {
        context1View = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                addACoupleWidgets().then(function() {
                    verify2Widgets().then(function() {
                        deleteWidgets().then(function() {
                            editModeControls.clickSaveButton().then(function() {
                                verifyNoWidgets().then(function() {
                                    dashboardPage.openContextWithPath(testingContext2).then(function() {
                                        dashboardPage.openContextWithPath(testingContext).then(function() {
                                            viewSelector.selectViewByText(context1View).then(function() {
                                                verifyNoWidgets().then(function() {
                                                    dashboardPage.openContextWithPath(testingContext2).then(function() {
                                                        context2View = Date.now() + 'view2';
                                                        dashboardPage.addView(context2View).then(function() {
                                                            addACoupleWidgets().then(function() {
                                                                verify2Widgets();
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
    });

    //14.3_12
    it('Verify user is able to edit the data series and time series widgets and Cancel the changes.', function() {
        context1View = Date.now() + "view";
        dashboardPage.openContextWithPath(testingContext).then(function() {
            dashboardPage.addView(context1View).then(function() {
                addACoupleWidgets().then(function() {
                    verify2Widgets().then(function() {
                        makeSomeEdits().then(function() {
                            widgetDialog.clickCancelButton().then(function() {
                                editModeControls.clickSaveButton().then(function() {
                                    verify2Widgets().then(function() {
                                        dashboardPage.openContextWithPath(testingContext2).then(function() {
                                            dashboardPage.openContextWithPath(testingContext).then(function() {
                                                viewSelector.selectViewByText(context1View).then(function() {
                                                    verify2Widgets();
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
