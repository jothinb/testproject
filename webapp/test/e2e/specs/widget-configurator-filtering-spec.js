var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var widgetDialog = require('../models/widget-dialog');

describe('The WidgetConfigurator', function() {

    afterEach(function() {
        widgetDialog.clickCancelButton().then(function() {
            editModeControls.clickRevertButton();
        });
    });

    describe('opened', function() {

        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
                editModeControls.clickEnterEditModeButton().then(function() {
                    dashboardPage.clickAddWidgetButton();
                })
            });
        });

        //14.3_1340_6
        //14.3_1421_1
        it('shows all widget options when no datasource is selected', function() {
            widgetDialog.selectDataSourceDropdown('Choose a Data Source').then(function() {
                widgetDialog.getAvailableWidgetNames().then(function(availableWidgets) {
                    expect(availableWidgets).toContain('Datagrid');
                    expect(availableWidgets).toContain('Hello World');
                    expect(availableWidgets).toContain('Simple Directive');
                });
            });
        });

        //14.3_1340_1
        //14.3_1340_2
        it('filters the list of widgets to the selected datasource\'s type and not widgets of other types', function() {
            widgetDialog.selectDataSourceDropdown('MockDatagridDS').then(function() {
                widgetDialog.getAvailableWidgetNames().then(function(availableWidgets) {
                    expect(availableWidgets).toContain('Datagrid');
                    expect(availableWidgets).not.toContain('Simple Directive');
                });
            });
        });

        //14.3_1340_5
        it('shows no widgets if a datasource is selected that has no compatible widgets', function() {
            widgetDialog.selectDataSourceDropdown('Other type').then(function() {
                widgetDialog.getAvailableWidgetNames().then(function(availableWidgets) {
                    expect(availableWidgets).toContain('Choose a Widget Type');
                });
            });
        });

        it('resets the list of widgets to all widgets when a datasource is selected then deselected', function() {
            widgetDialog.selectDataSourceDropdown('MockDatagridDS').then(function() {
                widgetDialog.getAvailableWidgetNames().then(function(availableWidgets) {
                    expect(availableWidgets).toContain('Datagrid');
                    widgetDialog.selectDataSourceDropdown('Choose a Data Source').then(function() {
                        widgetDialog.getAvailableWidgetNames().then(function(availableWidgets) {
                            expect(availableWidgets).toContain('Datagrid');
                            expect(availableWidgets).toContain('Hello World');
                            expect(availableWidgets).toContain('Simple Directive');
                        })
                    })
                });
            });
        });

        it('deselects the selected widget if a datasource is selected that is a different type', function() {
            widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                widgetDialog.getSelectedWidgetType().then(function(selectedWidgetName) {
                    expect(selectedWidgetName).toBe('Simple Directive');
                    widgetDialog.selectDataSourceDropdown('MockDatagridDS').then(function() {
                        widgetDialog.getSelectedWidgetType().then(function(selectedWidgetName2) {
                            expect(selectedWidgetName2.trim()).toBe('Choose a Widget Type');
                        });
                    });
                });
            });
        });

        it('selects a widget, the size option is defaulted to half', function() {
            widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                expect(widgetDialog.getSelectedSize()).toBe('half');
            });
        });

        it('selects another widget will not change the selected size', function() {
            widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                widgetDialog.clickFullPageRadioButton().then(function() {
                    widgetDialog.selectWidgetTypeDropdown('Datagrid').then(function() {
                        widgetDialog.selectWidgetTypeDropdown('Time Series').then(function() {
                            expect(widgetDialog.getSelectedSize()).toBe('full');
                        })
                    });
                });
            });
        });
    });

    describe('opened in edit mode', function() {
        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
                editModeControls.clickEnterEditModeButton().then(function() {
                    dashboardPage.clickEditWidgetButtonAtIndex(0);
                });
            });
        });

        //14.3_1340_3
        //14.3_1340_4
        it('has only the widgets available to the initially selected datasource', function() {
            expect(widgetDialog.getAvailableWidgetNames()).toContain('Datagrid');
            expect(widgetDialog.getAvailableWidgetNames()).not.toContain('Simple Directive');
        });

        it('shows all widgets when the datasource is deselected', function() {
            widgetDialog.selectDataSourceDropdown('Choose a Data Source').then(function() {
                var availableWidgets = widgetDialog.getAvailableWidgetNames();
                expect(availableWidgets).toContain('Datagrid');
                expect(availableWidgets).toContain('Hello World');
                expect(availableWidgets).toContain('Simple Directive');
            });
        });

        it('the size option is prepopulated with widget instance size', function() {
            expect(widgetDialog.getSelectedSize()).toBe('full');
        });

        it('selects another widget will not change the selected size', function() {
            widgetDialog.selectDataSourceDropdown('MockTimeSeriesDs').then(function() {
                widgetDialog.selectWidgetTypeDropdown('Time Series').then(function() {
                    expect(widgetDialog.getSelectedSize()).toBe('full');
                });
            });
        });
    });
});