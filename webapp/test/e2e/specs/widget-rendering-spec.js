'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var datagrid = require('../models/datagrid');
var timeseries = require('../models/timeseries');
var widgetDialog = require('../models/widget-dialog');

describe('When the user', function() {

    beforeEach(function() {
        dashboardPage.openContextWithPath(['Sandy Bridges']);
    });

    afterEach(function() {
        viewSelector.isEnabled().then(function(isEnabled) {
            if(!isEnabled) {
                editModeControls.clickRevertButton();
            }
        });
    });

    // 14.3_1197_20
    // 14.3_1293_1 (datagrid is option) and
    // 14.3_1293_2 (datagrid renders with default fields) and
    // 14.3_1365_1 (datasource with datagrid)
    // 14.3_1197_2 (default fields)
    // 14.3_1344_1
    it('chooses the Datagrid widget and datasource, the Datagrid will display on the page', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    datagrid.getContent(widget).then(function (content) {
                        expect(content.getTitle()).toEqual('Datagrid');
                        expect(content.getHeaders()).toEqual('ID Timestamp Quality Value');
                        expect(content.getNumRows()).toEqual(6);
                        expect(content.getRow(0)).toContain('Good');
                        expect(content.getRow(0)).toContain('1432');
                        expect(content.getRow(1)).toContain('Good');
                        expect(content.getRow(1)).toContain('1857');
                        expect(content.getRow(2)).toContain('Poor');
                        expect(content.getRow(2)).toContain('720');
                        expect(content.getRow(3)).toContain('Excellent');
                        expect(content.getRow(3)).toContain('2600');
                        expect(content.getRow(4)).toContain('Poor');
                        expect(content.getRow(4)).toContain('530');
                        expect(content.getRow(5)).toContain('Excellent');
                        expect(content.getRow(5)).toContain('2134');
                    });
                });
            });
        });
    });

    // 14.3_1197_3
    it('change the datagrid title, then it is reflected', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeWidgetText("title", "Diff Title").then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.getContent(widget).then(function(content) {
                                    expect(content.getTitle()).toEqual('Diff Title');
                                    expect(content.getHeaders()).toEqual('ID Timestamp Quality Value');
                                    expect(content.getNumRows()).toEqual(6);
                                    expect(content.getRow(0)).toContain('Good');
                                    expect(content.getRow(0)).toContain('1432');
                                    expect(content.getRow(1)).toContain('Good');
                                    expect(content.getRow(1)).toContain('1857');
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // 14.3_1539_1
    it('malicious content in field such as title is displayed as is, not executed', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeWidgetText("title", "foo\"></px-datagrid><script>alert(\"foo\")</script><!--").then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.getContent(widget).then(function(content) {
                                    expect(content.getTitle()).toEqual('foo\"></px-datagrid><script>alert(\"foo\")</script><!--');
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // 14.3_1197_6
    it('chooses the Datagrid widget and a BadDatagridDs datasource, the Datagrid will just have the title', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "BadDatagridDs").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    datagrid.getContent(widget).then(function (content) {
                        expect(content.getTitle()).toEqual('Datagrid');
                        expect(content.getHeaders()).toEqual('');
                        expect(content.getNumRows()).toEqual(0);
                    });
                });
            });
        });
    });

    //14.3_1365_2
    it('chooses the Hello World widget and datasource, then Hello World will display on the page', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    expect(widget.getText()).toContain('Yay: TitleFromDS');
                });
            });
        });
    });

    //14.3_1365_3
    it('chooses a datasource that doesnt return valid data, then the widget handles it how it wants', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.clickAddWidgetButton().then(function() {
                widgetDialog.selectDataSourceDropdown("BadDS").then(function() {
                    widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                        widgetDialog.clickFullPageRadioButton().then(function() {
                            widgetDialog.changeDatasourceText('startTime','2').then(function() {
                                widgetDialog.changeDatasourceText('endTime','5').then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                            expect(widget.getText()).toContain('Yay: undefined'); //this is how the Hello World widget handles it
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

    //14.3_1365_4
    it('chooses the view with a widget that cant render, then an error will display', function() {
        viewSelector.selectViewByText('Bad View').then(function() {
            dashboardPage.getErrorMessages().then(function(errorMessages) {
                expect(errorMessages).toContain("Widget rendering error.");
                dashboardPage.closeErrorMessage();
            });
        });
    });

    //14.3_1365_5
    //14.3_1365_7
    //14.3_1365_11
    // 14.3_1197_5
    it('chooses the Datagrid widget/datasource with property 2, the Datagrid will display on the page with different data (query params work)', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                        widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                            widgetDialog.clickSaveButton().then(function() {
                                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(content.getTitle()).toEqual('Datagrid');
                                        expect(content.getHeaders()).toEqual('ID Value');
                                        expect(content.getNumRows()).toEqual(10);
                                        expect(content.getRow(0)).toContain('12');
                                        expect(content.getRow(1)).toContain('15');
                                        expect(content.getRow(2)).toContain('18');
                                        expect(content.getRow(3)).toContain('17');
                                        expect(content.getRow(4)).toContain('25');
                                        expect(content.getRow(5)).toContain('22');
                                        expect(content.getRow(6)).toContain('12');
                                        expect(content.getRow(7)).toContain('36');
                                        expect(content.getRow(8)).toContain('47');
                                        expect(content.getRow(9)).toContain('25');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_1365_8
    it('chooses widget with no properties, renders properly on page', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Simple Directive", "HelloWorldDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    expect(widget.getText()).toContain('I am a directive.');
                });
            });
        });
    });

    //14.3_1390_13
    //14.3_1390_4
    it('When you use the default settings for the time series, it renders with the data returned. Default title, shows x axis titles, line chart.', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Time Series", "MockTimeSeriesDs").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    timeseries.getContent(widget).then(function (content) {
                        expect(content.getTitle()).toEqual(['Time Series Data']);
                        expect(content.getSubtitle()).toEqual([]);
                        expect(content.getXAxisTitle()).toEqual([]);
                        expect(content.getYAxisTitle()).toEqual([]);
                        expect(content.hasYAxisLabels()).not.toEqual(['']);
                        expect(content.numSeries()).toEqual(3);
                    });
                });
            });
        });
    });

    //14.3_1390_14
    //14.3_1390_5
    it('When you change the time series title, subtitle, xaxis, key, yaxis key, not show yaxis labels, points the new values are displayed on the widget accordingly.', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Time Series", "MockTimeSeriesDs").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeWidgetText("title", "DiffTitle").then(function() {
                        widgetDialog.changeWidgetText("subtitle", "something").then(function() {
                            widgetDialog.changeWidgetText("xAxisLabel", "XXXXX").then(function() {
                                widgetDialog.changeWidgetText("yAxisLabel", "YYYYYY").then(function() {
                                    widgetDialog.changeWidgetToggle('showYAxisUnits').then(function() {
                                        widgetDialog.changeWidgetDropdown("plotType", "points").then(function() {
                                            widgetDialog.clickSaveButton().then(function() {
                                                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                                    timeseries.getContent(widget).then(function(content) {
                                                        expect(content.getTitle()).toEqual(['DiffTitle']);
                                                        expect(content.getSubtitle()).toEqual(['something']);
                                                        expect(content.getXAxisTitle()).toEqual(['XXXXX']);
                                                        expect(content.getYAxisTitle()).toEqual(['YYYYYY']);
                                                        expect(content.hasYAxisLabels()).toEqual(['']);
                                                        expect(content.numSeries()).toEqual(3);
                                                        expect(content.getSeriesLabels()).toEqual([ 'Winter 2007-2008', 'Winter 2008-2009', 'Winter 2009-2010' ]);
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
    //14.3_1390_14
    //14.3_1390_7
    it('When you change the sampling rate to something else, the data changes. (this means the query parameters are being sent correctly).', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Time Series", "MockTimeSeriesDs").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('samplingRate', "24 hours").then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                timeseries.getContent(widget).then(function(content) {
                                    expect(content.getTitle()).toEqual(['Time Series Data']);
                                    expect(content.getSubtitle()).toEqual([]);
                                    expect(content.getXAxisTitle()).toEqual([]);
                                    expect(content.getYAxisTitle()).toEqual([]);
                                    expect(content.hasYAxisLabels()).not.toEqual(['']);
                                    expect(content.numSeries()).toEqual(1);
                                    expect(content.getSeriesLabels()).toEqual([ 'USD to EUR' ]);
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_1390_8
    it('When if datasource is down, then just see title', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Time Series", "BadTimeSeriesDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                    timeseries.getContent(widget).then(function(content) {
                        expect(content.getTitle()).toEqual(['Time Series Data']);
                        expect(content.getSubtitle()).toEqual([]);
                        expect(content.getXAxisTitle()).toEqual([]);
                        expect(content.getYAxisTitle()).toEqual([]);
                        expect(content.hasYAxisLabels()).not.toEqual(['']);
                        expect(content.numSeries()).toEqual(0);
                    });
                });
            });
        });
    });

    //14.3_1390_9
    it('When default EchoTimeSeriesDs params used – url has the default query params', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("EchoWidget", "EchoTimeSeriesDs").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                    widget.getText().then(function(text) {
                        expect(text).toEqual('/echo?timeFrameAmount=4&samplingRate=1%20minute&timeFrameUnit=Hours&samplingMode=Rolling%20average');
                    });
                });
            });
        });
    });

    //14.3_1390_10
    it('When EchoTimeSeriesDs params are changed – url has all the updated query params', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("EchoWidget", "EchoTimeSeriesDs").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceText('timeFrameAmount', "7").then(function() {
                        widgetDialog.changeDatasourceDropdown('timeFrameUnit', "Months").then(function() {
                            widgetDialog.changeDatasourceDropdown('samplingMode', "Raw").then(function() {
                                widgetDialog.changeDatasourceDropdown('samplingRate', "24 hours").then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                            widget.getText().then(function(text) {
                                                expect(text).toEqual('/echo?timeFrameAmount=7&samplingRate=24%20hours&timeFrameUnit=Months&samplingMode=Raw');
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

    // 14.3_1197_16
    // 14.3_1197_7
    it('When you click on a column, the table is sorted by that column', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function (widget) {
                    datagrid.clickColumn(widget, 2).then(function() {
                        datagrid.getContent(widget).then(function(content) {
                            expect(content.getNumRows()).toEqual(6);
                            expect(content.getRow(0)).toContain('Excellent');
                            expect(content.getRow(0)).toContain('2600');
                            expect(content.getRow(1)).toContain('Excellent');
                            expect(content.getRow(1)).toContain('2134');
                            expect(content.getRow(2)).toContain('Good');
                            expect(content.getRow(2)).toContain('1432');
                            expect(content.getRow(3)).toContain('Good');
                            expect(content.getRow(3)).toContain('1857');
                            expect(content.getRow(4)).toContain('Poor');
                            expect(content.getRow(4)).toContain('720');
                            expect(content.getRow(5)).toContain('Poor');
                            expect(content.getRow(5)).toContain('530');
                            datagrid.clickColumn(widget, 3).then(function() {
                                datagrid.getContent(widget).then(function(content) {
                                    expect(content.getNumRows()).toEqual(6);
                                    expect(content.getRow(0)).toContain('Poor');
                                    expect(content.getRow(0)).toContain('530');
                                    expect(content.getRow(1)).toContain('Poor');
                                    expect(content.getRow(1)).toContain('720');
                                    expect(content.getRow(2)).toContain('Good');
                                    expect(content.getRow(2)).toContain('1432');
                                    expect(content.getRow(3)).toContain('Good');
                                    expect(content.getRow(3)).toContain('1857');
                                    expect(content.getRow(4)).toContain('Excellent');
                                    expect(content.getRow(4)).toContain('2134');
                                    expect(content.getRow(5)).toContain('Excellent');
                                    expect(content.getRow(5)).toContain('2600');
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // 14.3_1197_8
    // 14.3_1197_18
    // 14.3_1197_19
    it('When you click on the same column multiple times, the table is flips the sort ordering', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.clickColumn(widget, 1).then(function() {
                                    datagrid.clickColumn(widget, 1).then(function() {
                                        datagrid.getContent(widget).then(function(content) {
                                            datagrid.getArrow(widget, 1).then(function(arrow) {
                                                expect(content.getNumRows()).toEqual(10);
                                                expect(content.getRow(0)).toContain('58');
                                                expect(content.getRow(1)).toContain('48');
                                                expect(content.getRow(2)).toContain('47');
                                                expect(content.getRow(3)).toContain('47');
                                                expect(content.getRow(4)).toContain('36');
                                                expect(content.getRow(5)).toContain('36');
                                                expect(content.getRow(6)).toContain('36');
                                                expect(content.getRow(7)).toContain('25');
                                                expect(content.getRow(8)).toContain('25');
                                                expect(content.getRow(9)).toContain('25');
                                                expect(arrow).toBe('down');
                                                datagrid.clickColumn(widget, 1).then(function() {
                                                    datagrid.getContent(widget).then(function(content) {
                                                        datagrid.getArrow(widget, 1).then(function(arrow) {
                                                            expect(content.getNumRows()).toEqual(10);
                                                            expect(content.getRow(0)).toContain('12');
                                                            expect(content.getRow(1)).toContain('12');
                                                            expect(content.getRow(2)).toContain('12');
                                                            expect(content.getRow(3)).toContain('15');
                                                            expect(content.getRow(4)).toContain('17');
                                                            expect(content.getRow(5)).toContain('17');
                                                            expect(content.getRow(6)).toContain('17');
                                                            expect(content.getRow(7)).toContain('18');
                                                            expect(content.getRow(8)).toContain('19');
                                                            expect(content.getRow(9)).toContain('21');
                                                            expect(arrow).toBe('up');
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

    // 14.3_1197_9
    it('When you enter text in the search box, the table is sorted by that data', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.searchFor(widget, "21").then(function() {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(content.getNumRows()).toEqual(3);
                                        expect(content.getRow(0)).toContain('18 21');
                                        expect(content.getRow(1)).toContain('21 25');
                                        expect(content.getRow(2)).toContain('24 21');
                                        datagrid.searchFor(widget, "4").then(function() {
                                            datagrid.getContent(widget).then(function(content) {
                                                expect(content.getNumRows()).toEqual(6);
                                                expect(content.getRow(0)).toContain('4 17');
                                                expect(content.getRow(1)).toContain('9 47');
                                                expect(content.getRow(2)).toContain('14 58');
                                                expect(content.getRow(3)).toContain('17 47');
                                                expect(content.getRow(4)).toContain('20 48');
                                                expect(content.getRow(5)).toContain('24 21');
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

    // 14.3_1197_10
    it('When you type in text in the search box that has no matches, it shows no data', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.searchFor(widget, "57").then(function() {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(content.getNumRows()).toEqual(0);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // 14.3_1197_11
    it('With multiple pages of data, forward/backward navigates between pages.  Enabled/disabled buttons correctly.', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.checkPagination(widget).then(function(paginationDetails) {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(paginationDetails.isForwardEnabled()).toBe(true);
                                        expect(paginationDetails.isBackwardEnabled()).toBe(false);
                                        expect(paginationDetails.getSelected()).toEqual('1');
                                        expect(paginationDetails.getAll()).toEqual(['','1','2','3','']);
                                        expect(content.getNumRows()).toEqual(10);
                                        expect(content.getRow(0)).toContain('1 12');
                                        expect(content.getRow(1)).toContain('2 15');
                                        datagrid.clickForward(widget).then(function() {
                                            datagrid.checkPagination(widget).then(function(paginationDetails) {
                                                datagrid.getContent(widget).then(function(content) {
                                                    expect(paginationDetails.isForwardEnabled()).toBe(true);
                                                    expect(paginationDetails.isBackwardEnabled()).toBe(true);
                                                    expect(paginationDetails.getSelected()).toBe('2');
                                                    expect(content.getNumRows()).toEqual(10);
                                                    expect(content.getRow(0)).toContain('11 19');
                                                    expect(content.getRow(1)).toContain('12 25');
                                                    datagrid.clickForward(widget).then(function() {
                                                        datagrid.checkPagination(widget).then(function(paginationDetails) {
                                                            datagrid.getContent(widget).then(function(content) {
                                                                expect(paginationDetails.isForwardEnabled()).toBe(false);
                                                                expect(paginationDetails.isBackwardEnabled()).toBe(true);
                                                                expect(paginationDetails.getSelected()).toBe('3');
                                                                expect(content.getNumRows()).toEqual(5);
                                                                expect(content.getRow(0)).toContain('21 25');
                                                                expect(content.getRow(1)).toContain('22 17');
                                                                datagrid.clickBackward(widget).then(function() {
                                                                    datagrid.checkPagination(widget).then(function(paginationDetails) {
                                                                        datagrid.getContent(widget).then(function(content) {
                                                                            expect(paginationDetails.isForwardEnabled()).toBe(true);
                                                                            expect(paginationDetails.isBackwardEnabled()).toBe(true);
                                                                            expect(paginationDetails.getSelected()).toBe('2');
                                                                            expect(content.getNumRows()).toEqual(10);
                                                                            expect(content.getRow(0)).toContain('11 19');
                                                                            expect(content.getRow(1)).toContain('12 25');
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
            });
        });
    });

    // 14.3_1197_12
    it('With multiple pages of data, clicking navigates between pages.  Enabled/disabled buttons correctly.', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.clickPagination(widget, 3).then(function() {
                                    datagrid.checkPagination(widget).then(function(paginationDetails) {
                                        datagrid.getContent(widget).then(function(content) {
                                            expect(paginationDetails.isForwardEnabled()).toBe(false);
                                            expect(paginationDetails.isBackwardEnabled()).toBe(true);
                                            expect(paginationDetails.getSelected()).toBe('3');
                                            expect(paginationDetails.getAll()).toEqual(['','1','2','3','']);
                                            expect(content.getNumRows()).toEqual(5);
                                            expect(content.getRow(0)).toContain('21 25');
                                            expect(content.getRow(1)).toContain('22 17');
                                            datagrid.clickPagination(widget, 2).then(function() {
                                                datagrid.checkPagination(widget).then(function(paginationDetails) {
                                                    datagrid.getContent(widget).then(function(content) {
                                                        expect(paginationDetails.isForwardEnabled()).toBe(true);
                                                        expect(paginationDetails.isBackwardEnabled()).toBe(true);
                                                        expect(paginationDetails.getSelected()).toBe('2');
                                                        expect(content.getNumRows()).toEqual(10);
                                                        expect(content.getRow(0)).toContain('11 19');
                                                        expect(content.getRow(1)).toContain('12 25');
                                                        datagrid.clickPagination(widget, 1).then(function() {
                                                            datagrid.checkPagination(widget).then(function(paginationDetails) {
                                                                datagrid.getContent(widget).then(function(content) {
                                                                    expect(paginationDetails.isForwardEnabled()).toBe(true);
                                                                    expect(paginationDetails.isBackwardEnabled()).toBe(false);
                                                                    expect(paginationDetails.getSelected()).toBe('1');
                                                                    expect(content.getNumRows()).toEqual(10);
                                                                    expect(content.getRow(0)).toContain('1 12');
                                                                    expect(content.getRow(1)).toContain('2 15');
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
    });

    // 14.3_1197_13
    it('With only 1 page of data, forward/backward disabled and clicking 1 does nothing', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                    datagrid.checkPagination(widget).then(function(paginationDetails) {
                        datagrid.getContent(widget).then(function(content) {
                            expect(paginationDetails.isForwardEnabled()).toBe(false);
                            expect(paginationDetails.isBackwardEnabled()).toBe(false);
                            expect(paginationDetails.getSelected()).toBe('1');
                            expect(paginationDetails.getAll()).toEqual(['', '1', '']);
                            expect(content.getNumRows()).toEqual(6);
                            expect(content.getRow(0)).toContain('1432');
                            expect(content.getRow(1)).toContain('1857');
                            datagrid.clickPagination(widget, 1).then(function() {
                                datagrid.checkPagination(widget).then(function(paginationDetails) {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(paginationDetails.isForwardEnabled()).toBe(false);
                                        expect(paginationDetails.isBackwardEnabled()).toBe(false);
                                        expect(paginationDetails.getSelected()).toBe('1');
                                        expect(content.getNumRows()).toEqual(6);
                                        expect(content.getRow(0)).toContain('1432');
                                        expect(content.getRow(1)).toContain('1857');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // 14.3_1197_14
    it('Verify user is on page 1 and is able to select Show X (10,20,50) entries and the data is displayed as per the selection', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.getContent(widget).then(function (content) {
                                    expect(content.getNumRows()).toEqual(10);
                                    expect(content.getRow(0)).toContain('1 12');
                                    expect(content.getRow(1)).toContain('2 15');
                                    expect(content.getRow(2)).toContain('3 18');
                                    expect(content.getRow(9)).toContain('10 25');
                                    datagrid.changeNumEntries(20).then(function() {
                                        datagrid.getContent(widget).then(function(content) {
                                            expect(content.getNumRows()).toEqual(20);
                                            expect(content.getRow(0)).toContain('1 12');
                                            expect(content.getRow(9)).toContain('10 25');
                                            expect(content.getRow(17)).toContain('18 21');
                                            expect(content.getRow(19)).toContain('20 48');
                                            datagrid.changeNumEntries(50).then(function() {
                                                datagrid.getContent(widget).then(function(content) {
                                                    expect(content.getNumRows()).toEqual(25);
                                                    expect(content.getRow(0)).toContain('1 12');
                                                    expect(content.getRow(1)).toContain('2 15');
                                                    expect(content.getRow(17)).toContain('18 21');
                                                    expect(content.getRow(24)).toContain('25 25');
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

    // 14.3_1197_15
    it('Verify user is on page 2 and is able to select Show X (10,20,50) entries and the data is displayed as per the selection	', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                    widgetDialog.changeDatasourceDropdown('dataSet', '2').then(function() {
                        widgetDialog.clickSaveButton().then(function() {
                            dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                                datagrid.clickPagination(widget, 2).then(function() {
                                    datagrid.getContent(widget).then(function(content) {
                                        expect(content.getNumRows()).toEqual(10);
                                        expect(content.getRow(0)).toContain('11 19');
                                        expect(content.getRow(4)).toContain('15 36');
                                        expect(content.getRow(9)).toContain('20 48');
                                        datagrid.changeNumEntries(20).then(function() {
                                            datagrid.getContent(widget).then(function(content) {
                                                expect(content.getNumRows()).toEqual(5);
                                                expect(content.getRow(0)).toContain('21 25');
                                                expect(content.getRow(4)).toContain('25 25');
                                                datagrid.changeNumEntries(50).then(function() {
                                                    datagrid.getContent(widget).then(function(content) {
                                                        expect(content.getNumRows()).toEqual(25);
                                                        expect(content.getRow(0)).toContain('1 12');
                                                        expect(content.getRow(1)).toContain('2 15');
                                                        expect(content.getRow(17)).toContain('18 21');
                                                        expect(content.getRow(24)).toContain('25 25');
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

    // 14.3_1197_17
    it('Verify searching on a string field and a number field', function() {
        dashboardPage.addView(Date.now()).then(function() {
            dashboardPage.addFullSizeWidget("Datagrid", "MockDatagridDS").then(function () {
                dashboardPage.getWidgetAtIndex(0).then(function(widget) {
                    datagrid.searchFor(widget, "goo").then(function() {
                        datagrid.getContent(widget).then(function(content) {
                            expect(content.getNumRows()).toEqual(2);
                            expect(content.getRow(0)).toContain('1432');
                            expect(content.getRow(1)).toContain('1857');
                            datagrid.searchFor(widget, "5").then(function() {
                                datagrid.getContent(widget).then(function(content) {
                                    expect(content.getNumRows()).toEqual(3);
                                    expect(content.getRow(0)).toContain('1432');
                                    expect(content.getRow(1)).toContain('1857');
                                    expect(content.getRow(2)).toContain('530');
                                });
                            });
                        });
                    });
                });
            });
        });
    });


});