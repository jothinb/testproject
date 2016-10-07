'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var widgetDialog = require('../models/widget-dialog');
var viewDialog = require('../models/view-dialog');

describe('When adding a widget', function() {

    beforeEach(function() {
        dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
            editModeControls.clickEnterEditModeButton().then(function() {
                dashboardPage.clickAddWidgetButton();
            })
        });
    });

    afterEach(function() {
        widgetDialog.clickCancelButton().then(function() {
            editModeControls.clickRevertButton();
        });
    });


    //14.3_1367_1
    it('the save button is initially disabled', function() {
        widgetDialog.isSaveEnabled().then(function(isEnabled) {
            expect(isEnabled).toBe(false);
        });
    });

    //14.3_1343_2
    it('the dropdown list of datasources has expected datasources', function() {
        widgetDialog.getAvailableDatasources().then(function(datasources) {
            expect(datasources).toContain('MockDatagridDS');
            expect(datasources).toContain('MockTimeSeriesDs');
            expect(datasources).toContain('HelloWorldDS');
            expect(datasources).toContain('BadDS');
        });
    });

    //14.3_1367_20
    it('the datasource, widget, half/full options are initially not filled in', function() {
        widgetDialog.getSelectedDataSource().then(function(selectedDatasource) {
            widgetDialog.getSelectedWidgetType().then(function(selectedWidget) {
                widgetDialog.getSelectedSize().then(function(selectedSize) {
                    expect(selectedDatasource.trim()).toBe('Choose a Data Source');
                    expect(selectedWidget.trim()).toBe('Choose a Widget Type');
                    expect(selectedSize).toBe('');
                });
            });
        });
    });

    //14.3_1367_2
    it('when the user selects a datasource (only), the save button is disabled', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.isSaveEnabled().then(function(isEnabled) {
                expect(isEnabled).toBe(false);
            });
        });
    });

    // TODO: this is disabled currently because you can't select that dropdown until you've chosen a datasource
    // after the filtering story this will work and we should enable this.
    //14.3_1367_3
    xit('when the user selects a widget (only), the save button is disabled', function() {
        widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
            widgetDialog.isSaveEnabled().then(function(isEnabled) {
                expect(isEnabled).toBe(false);
            });
        });
    });

    //14.3_1367_4
    it('When the user selects a widget and datasource with the default options (which are filled correctly), the save button is enabled', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.isSaveEnabled().then(function(isEnabled) {
                    expect(isEnabled).toBe(true);
                });
            });
        });
    });

    //14.3_1367_5
    it('When the user selects a valid datasource but a widget with the default options that ARE NOT filled correctly, the save button is disabled once you click submit', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("BadWidget").then(function() {
                widgetDialog.clickSaveButtonNoWait().then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(false);
                    });
                });
            });
        });
    });

    //14.3_1367_18
    it('When the user selects a valid widget but a datasource with the default options that ARE NOT filled correctly, the save button is disabled once you click submit', function() {
        widgetDialog.selectDataSourceDropdown("BadDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.clickSaveButtonNoWait().then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(false);
                    });
                });
            });
        });
    });

    //14.3_1367_6
    it('When the user changes the widget and datasource properties to other valid properties, the save button is enabled', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "valid message").then(function() {
                    widgetDialog.changeDatasourceText('startTime',"1234").then(function() {
                        widgetDialog.isSaveEnabled().then(function(isEnabled) {
                            expect(isEnabled).toBe(true);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_7
    it('When the user enters for the Hello World widget message no input, it says Missing required property', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('Missing required property').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_8
    it('When the user enters for the Hello World widget message a input, it says String is too short', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "a").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('String is too short').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_9
    it('When the user enters for the Hello World widget message ab input, the save button is enabled (no message)', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "ab").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError(' ').then(function(hasError) {
                            expect(isEnabled).toBe(true);
                            expect(hasError).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_10
    it('When the user enters for the Hello World widget message 123456789012345 input, the save button is enabled (no message)', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "123456789012345").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError(' ').then(function(hasError) {
                            expect(isEnabled).toBe(true);
                            expect(hasError).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_11
    it('When the user enters for the Hello World widget message 1234567890123456 input, it says String is too long', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "1234567890123456").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('String is too long').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_19
    it('When the user enters for the Hello World widget message ~!@#$%^&*()_+{ input, it says String is too long', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('message', "~!@#$%^&*()_+{").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError(' ').then(function(hasError) {
                            expect(hasError).toBe(false);
                            expect(isEnabled).toBe(true);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_12
    it('When the user enters for the Hello World widget color abc input, it says String does not match pattern', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('color', "abc").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('String does not match pattern').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_13
    it('When the user enters for the Hello World widget color color-blue input the save button is enabled (no message)', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeWidgetText('color', "color-blue").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError(' ').then(function(hasError) {
                            expect(isEnabled).toBe(true);
                            expect(hasError).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_14
    it('When the user enters for the Datasource startTime 123 input the save button is enabled (no message)', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeDatasourceText('startTime',"123").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError(' ').then(function(hasError) {
                            expect(isEnabled).toBe(true);
                            expect(hasError).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_15
    it('When the user enters for the Datasource startTime abc input, it says Missing required property', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeDatasourceText('startTime',"abc").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError('Missing required property').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_16
    it('When the user enters for the Datasource startTime -1 input, it says Value is less than minimum', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeDatasourceText('startTime',"-1").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError('Value is less than minimum').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1367_17
    it('When the user enters for the Datasource startTime 500000 input, it says Value is greater than maximum', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.changeDatasourceText('startTime',"500000").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError('Value is greater than maximum').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1596_1
    it('When the user selects the Hello World widget, all the properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Hello World").then(function() {
                widgetDialog.getWidgetProperties().then(function(properties) {
                    expect(properties.length).toBe(2);
                    expect(properties).toContain('Message');
                    expect(properties).toContain('Color');
                });
            });
        });
    });

    //14.3_1596_2
    it('When the user selects the Simple Directive widget (no properties), no properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Simple Directive").then(function() {
                widgetDialog.getWidgetProperties().then(function(properties) {
                    expect(properties.length).toBe(0);
                });
            });
        });
    });

    //14.3_1343_3
    it('When the user selects the a datasource with no properties, no properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("BadTimeSeriesDS").then(function() {
            widgetDialog.getDataSourceProperties().then(function(properties) {
                expect(properties.length).toBe(0);
            });
        });
    });

    //14.3_1343_4
    //14.3_1597_1
    it('When the user selects the HelloWorldDS, all the properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("HelloWorldDS").then(function() {
            widgetDialog.getDataSourceProperties().then(function(properties) {
                expect(properties.length).toBe(2);
                expect(properties).toContain('Start Time');
                expect(properties).toContain('End Time');
            });
        });
    });

    //14.3_1597_2
    it('When the user selects the Simple Directive widget (no properties), no properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("BadTimeSeriesDS").then(function() {
            widgetDialog.getWidgetProperties().then(function(properties) {
                expect(properties.length).toBe(0);
            });
        });
    });

    //14.3_1390_1 (timeseries datasource & widget is option)
    //14.3_1390_3 (timeseries widget has expected options)
    it('When the user selects the TimeSeries widget, all the properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("MockTimeSeriesDs").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Time Series").then(function() {
                widgetDialog.getWidgetProperties().then(function(properties) {
                    expect(properties.length).toBe(6);
                    expect(properties).toContain('Title');
                    expect(properties).toContain('Subtitle');
                    expect(properties).toContain('X-axis label');
                    expect(properties).toContain('Y-axis label');
                    expect(properties).toContain('Show y-axis units');
                    expect(properties).toContain('Plot type');
                });
            });
        });
    });

    //14.3_1390_1 (timeseries datasource & widget is option)
    //14.3_1390_2 (timeseries datasource has expected options)
    it('When the user selects the MockTimeSeriesDS datsource, all the properties are displayed', function() {
        widgetDialog.selectDataSourceDropdown("MockTimeSeriesDs").then(function() {
            widgetDialog.getDataSourceProperties().then(function(properties) {
                expect(properties.length).toBe(4);
                expect(properties).toContain('Timeframe amount');
                expect(properties).toContain('Timeframe unit');
                expect(properties).toContain('Sampling mode');
                expect(properties).toContain('Sampling rate');
            });
        });
    });

    //14.3_1390_6
    it('When you change the time series title to nothing, youll get a required error message', function() {
        widgetDialog.selectDataSourceDropdown("MockTimeSeriesDs").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Time Series").then(function() {
                widgetDialog.changeWidgetText("title", "").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('Missing required property').then(function(hasError) {
                            expect(isEnabled).toBe(false);
                            expect(hasError).toBe(true);
                        });
                    });
                });
            });
        });
    });

    //14.3_1390_11
    it('Timeframe amount is required property, if remove get error', function() {
        widgetDialog.selectDataSourceDropdown("MockTimeSeriesDs").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Time Series").then(function() {
                widgetDialog.changeDatasourceText('timeFrameAmount',"").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError('Missing required property').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1390_12
    it('Timeframe amount is required property, if use characters get error', function() {
        widgetDialog.selectDataSourceDropdown("MockTimeSeriesDs").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Time Series").then(function() {
                widgetDialog.changeDatasourceText('timeFrameAmount',"abc").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasDatasourceError('Missing required property').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

    //14.3_1197_1
    it('Verify datagrid widget has expected fields', function() {
        widgetDialog.selectDataSourceDropdown("MockDatagridDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Datagrid").then(function() {
                widgetDialog.getWidgetProperties().then(function(properties) {
                    expect(properties.length).toBe(1);
                    expect(properties).toContain('Title');
                });
            });
        });
    });

    //14.3_1197_4
    it('Verify when you change the title to nothing, youll get the required error message', function() {
        widgetDialog.selectDataSourceDropdown("MockDatagridDS").then(function() {
            widgetDialog.selectWidgetTypeDropdown("Datagrid").then(function() {
                widgetDialog.changeWidgetText('title',"").then(function() {
                    widgetDialog.isSaveEnabled().then(function(isEnabled) {
                        widgetDialog.hasWidgetError('Missing required property').then(function(hasError) {
                            expect(hasError).toBe(true);
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });
    });

});

describe('When adding a widget if there are no datasources', function() {

    beforeEach(function() {
        dashboardPage.openContextWithPath(['Mustang', 'Wheels', 'No datasources']).then(function() {
            dashboardPage.clickCreateViewHyperlink().then(function(isDisplayed) {
                browser.wait(function() {
                    return viewDialog.isOpen();
                }, 2000).then(function() {
                    viewDialog.enterName(Date.now()).then(function() {
                        viewDialog.clickSaveButton().then(function() {
                            browser.wait(function() {
                                return dashboardPage.isModalClosed();
                            }, 2000);
                        });
                    });
                });
            });
        });
    });

    afterEach(function() {
        viewDialog.isOpen().then(function(isOpen) {
            if(isOpen) {
                viewDialog.clickCancelButton();
            }
        });
        viewSelector.isEnabled().then(function(isEnabled) {
            if(!isEnabled) {
                editModeControls.clickRevertButton();
            }
        });
    });

    //14.3_1343_1
    it('if there are no datasources, then the dropdown with available datasource will be empty (they must x to close)', function() {
        dashboardPage.clickAddWidgetButton().then(function() {
            widgetDialog.isSaveEnabled().then(function(isEnabled) {
                widgetDialog.getAvailableDatasources().then(function(datasources) {
                    expect(isEnabled).toBe(false);
                    expect(datasources).toContain('Choose a Data Source');
                    widgetDialog.clickCancelButton().then(function() {
                        expect(widgetDialog.isClosed()).toBe(true);
                    })
                });
            });
        });
    });
});
