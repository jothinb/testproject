'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var deleteWidgetDialog = require('../models/delete-widget-dialog');
var widgetDialog = require('../models/widget-dialog');

describe('Rendering different sized widgets', function() {

    beforeEach(function() {
        dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
            dashboardPage.addView(Date.now());
        });
    });

    afterEach(function() {
        viewSelector.isEnabled().then(function(isEnabled) {
            if(!isEnabled) {
                editModeControls.clickRevertButton();
            }
        });
    });

    //14.3_1342_1
    //14.3_1342_2
    //14.3_1292_1
    it('when they add a Full widget, the dashboard should have a FULL widget and a FULL Add button', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                    dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                        expect(allModulesText.length).toBe(2);
                        expect(allModulesText[0]).toContain('Yay');
                        expect(allModulesText[1]).toContain('Add Widget');
                        expect(allModules[0].getAttribute('class')).toContain('12');
                        expect(allModules[1].getAttribute('class')).toContain('12');
                    });
                });
            });
        });
    });

    //14.3_1292_2
    it('when they add a Half widget, the dashboard should have a Half Widget Half Add Full Add', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                    dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                        expect(allModulesText.length).toBe(3);
                        expect(allModulesText[0]).toContain('Yay');
                        expect(allModulesText[1]).toContain('Add Widget');
                        expect(allModulesText[2]).toContain('Add Widget');
                        expect(allModules[0].getAttribute('class')).toContain('6');
                        expect(allModules[1].getAttribute('class')).toContain('6');
                        expect(allModules[2].getAttribute('class')).toContain('12');
                    });
                });
            });
        });
    });

    //14.3_1292_3
    it('when they add a Half then Half widget, the dashboard should have a Half Widget Half Widget Full Add', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.addHalfSizeWidget("Simple Directive", "HelloWorldDS").then(function() {
                    dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                            expect(allModulesText.length).toBe(3);
                            expect(allModulesText[0]).toContain('Yay');
                            expect(allModulesText[1]).toContain('I am a');
                            expect(allModulesText[2]).toContain('Add Widget');
                            expect(allModules[0].getAttribute('class')).toContain('6');
                            expect(allModules[1].getAttribute('class')).toContain('6');
                            expect(allModules[2].getAttribute('class')).toContain('12');
                        });
                    });
                });
            });
        });
    });

    //14.3_1292_4
    it('when they add a Half then Half widget Half Widget, the dashboard should have a Half Widget Half Widget Half Widget Half Add Full Add', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.addHalfSizeWidget("Simple Directive", "HelloWorldDS").then(function() {
                    dashboardPage.addHalfSizeWidget("Datagrid", "MockDatagridDS").then(function() {
                        dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                            dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                                expect(allModulesText.length).toBe(5);
                                expect(allModulesText[0]).toContain('Yay');
                                expect(allModulesText[1]).toContain('I am a');
                                expect(allModulesText[2]).toContain('Datagrid');
                                expect(allModulesText[3]).toContain('Add Widget');
                                expect(allModulesText[4]).toContain('Add Widget');
                                expect(allModules[0].getAttribute('class')).toContain('6');
                                expect(allModules[1].getAttribute('class')).toContain('6');
                                expect(allModules[2].getAttribute('class')).toContain('6');
                                expect(allModules[3].getAttribute('class')).toContain('6');
                                expect(allModules[4].getAttribute('class')).toContain('12');
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_1292_5
    it('when they add a Half then Full widget, the dashboard should have a Half Widget Half Add Full Widget Full Add', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.addFullSizeWidget("Simple Directive", "HelloWorldDS").then(function() {
                    dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                            expect(allModulesText.length).toBe(4);
                            expect(allModulesText[0]).toContain('Yay');
                            expect(allModulesText[1]).toContain('Add Widget');
                            expect(allModulesText[2]).toContain('I am a');
                            expect(allModulesText[3]).toContain('Add Widget');
                            expect(allModules[0].getAttribute('class')).toContain('6');
                            expect(allModules[1].getAttribute('class')).toContain('6');
                            expect(allModules[2].getAttribute('class')).toContain('12');
                            expect(allModules[3].getAttribute('class')).toContain('12');
                        });
                    });
                });
            });
        });
    });

    //14.3_1344_2
    //14.3_1342_3
    //14.3_1292_6
    it('when they add a Half then Full widget then Half in hole, the dashboard should have a Half Widget Half Widget Full Widget Full Add', function () {
        dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
            expect(allModulesText.length).toBe(1);
            expect(allModulesText[0]).toContain('Add Widget');
            dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.addFullSizeWidget("Simple Directive", "HelloWorldDS").then(function() {
                    dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                        dashboardPage.addHalfSizeWidgetTo(allModules[1], "Datagrid", "MockDatagridDS").then(function() {
                            dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
                                dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                                    expect(allModulesText.length).toBe(4);
                                    expect(allModulesText[0]).toContain('Yay');
                                    expect(allModulesText[1]).toContain('Datagrid');
                                    expect(allModulesText[2]).toContain('I am a');
                                    expect(allModulesText[3]).toContain('Add Widget');
                                    expect(allModules[0].getAttribute('class')).toContain('6');
                                    expect(allModules[1].getAttribute('class')).toContain('6');
                                    expect(allModules[2].getAttribute('class')).toContain('12');
                                    expect(allModules[3].getAttribute('class')).toContain('12');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});