'use strict';

var contextBrowser = require('../../models/context-browser');
var contextSelector = require('../../models/context-selector');
var dashboardPage = require('../../models/dashboard-page');

describe('Navigate context tree', function() {

    //14.3_1
    it('Verify user is able to navigate through the Context tree.', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.waitForContextName(0, 'Alabama').then(function() {
                    contextBrowser.getContextNames(0).then(function(topLevelNames) {
                        expect(topLevelNames.length).toBe(8);
                        expect(topLevelNames).toContain('Alabama');
                        expect(topLevelNames).toContain('Alaska');
                        expect(topLevelNames).toContain('Arizona');
                        expect(topLevelNames).toContain('Arkansas');
                        expect(topLevelNames).toContain('California');
                        expect(topLevelNames).toContain('Colorado');
                        expect(topLevelNames).toContain('Connecticut');
                        expect(topLevelNames).toContain('Delaware');
                        contextBrowser.browseByContextNames(['California']).then(function() {
                            contextBrowser.waitForContextName(1, 'Bakersville').then(function() {
                                contextBrowser.getContextNames(1).then(function(firstLevelNames) {
                                    expect(firstLevelNames.length).toBe(8);
                                    expect(firstLevelNames).toContain('Bakersville');
                                    expect(firstLevelNames).toContain('Boulder City');
                                    expect(firstLevelNames).toContain('Coastal Empire');
                                    expect(firstLevelNames).toContain('Hectorville');
                                    expect(firstLevelNames).toContain('Owens River');
                                    expect(firstLevelNames).toContain('Pine Bluff');
                                    expect(firstLevelNames).toContain('Rocky Flats');
                                    expect(firstLevelNames).toContain('Two Valleys');
                                    contextBrowser.isOpenContextDisplayed().then(function(isOpenable) {
                                        expect(isOpenable).toBe(true);
                                        contextBrowser.browseByContextNames(['Coastal Empire']).then(function() {
                                            contextBrowser.waitForContextName(2, 'Gas Turbine').then(function() {
                                                contextBrowser.getContextNames(2).then(function(secondLevelNames) {
                                                    expect(secondLevelNames.length).toBe(5);
                                                    expect(secondLevelNames).toContain('Gas Turbine');
                                                    expect(secondLevelNames).toContain('Generator');
                                                    expect(secondLevelNames).toContain('HRSG');
                                                    expect(secondLevelNames).toContain('Steam Generator');
                                                    expect(secondLevelNames).toContain('BOP');
                                                    contextBrowser.isOpenContextDisplayed().then(function(isOpenable) {
                                                        expect(isOpenable).toBe(true);
                                                        contextBrowser.browseByContextNames(['Generator']).then(function() {
                                                            // wait for it to shift
                                                            contextBrowser.waitForContextName(1, 'Gas Turbine').then(function() {
                                                                contextBrowser.getContextNames(2).then(function(thirdLevelNames) {
                                                                    expect(thirdLevelNames).toBe(null);
                                                                    contextBrowser.isOpenContextDisplayed().then(function(isOpenable) {
                                                                        expect(isOpenable).toBe(true);
                                                                        contextBrowser.clickOpenContext().then(function() {
                                                                            dashboardPage.waitForContextNameToBe('Generator').then(function() {
                                                                                expect(contextSelector.getContextName()).toBe('Generator');
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
    });

});