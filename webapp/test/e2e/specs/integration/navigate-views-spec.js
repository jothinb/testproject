'use strict';

var dashboardPage = require('../../models/dashboard-page');
var contextSelector = require('../../models/context-selector');
var viewSelector = require('../../models/view-selector');

describe('Navigate views', function() {

    //14.3_2
    it('Verify user is able to navigate to the Context for the first time and navigate through the views.', function() {
        dashboardPage.openContextWithPath(['California','Coastal Empire','Generator']).then(function() {
            expect(viewSelector.getNumberOfViews()).toBe(3); // (includes New View)
            expect(contextSelector.getContextName()).toBe('Generator');
            viewSelector.selectViewByText('PerfectView2').then(function() {
                validateSecondView().then(function() {
                    viewSelector.selectViewByText('PerfectView1').then(function() {
                        validateFirstView()
                    });
                });
            });
        });
    });

    var validateFirstView = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
            dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                expect(viewSelector.getCurrentViewName()).toBe('PerfectView1');
                expect(dashboardPage.getNumberWidgetSections()).toBe(2);
                expect(allModulesText.length).toBe(2);
                expect(allModulesText[0]).toContain('FirstHalfDatagrid');
                expect(allModulesText[1]).toContain('SecondHalfTS');
                expect(allModules[0].getAttribute('class')).toContain('6');
                expect(allModules[1].getAttribute('class')).toContain('6');
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };

    var validateSecondView = function() {
        var deferred = protractor.promise.defer();
        dashboardPage.getAllWidgetsAndModules().then(function(allModules) {
            dashboardPage.getAllWidgetsAndModulesText().then(function(allModulesText) {
                expect(viewSelector.getCurrentViewName()).toBe('PerfectView2');
                expect(dashboardPage.getNumberWidgetSections()).toBe(2);
                expect(allModulesText.length).toBe(2);
                expect(allModulesText[0]).toContain('FirstTSFull');
                expect(allModulesText[1]).toContain('SecondDGFull2');
                expect(allModules[0].getAttribute('class')).toContain('12');
                expect(allModules[1].getAttribute('class')).toContain('12');
                deferred.fulfill();
            });
        });
        return deferred.promise;
    };

});