'use strict';

var viewSelector = require('../models/view-selector');
var viewDialog = require('../models/view-dialog');
var dashboardPage = require('../models/dashboard-page');
var editModeControls = require('../models/edit-mode-controls');

describe('The view selector', function() {

    describe('when a context with no views is selected', function() {

        /**
         * 14.3 1 1288
         */
        it('does not have a view selector', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges', 'Barr', 'I Have More!', 'nothing']).then(function(){
                 expect(viewSelector.isDisplayed()).toBe(false);
                 expect(dashboardPage.getContextWithNoViewsText()).toEqual("No views are configured for this context. Create a view.");
                 expect(dashboardPage.isCreateViewHyperlinkEnabled()).toBe(true);
            });
        });
    });

    describe('when a context with one view is selected', function() {

        /**
         * 14.3 2 1288
         */
        it('has a new view option in the dropdown', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges', 'Barr', 'I Have More!', 'oneview']);
            expect(viewSelector.hasViewOption('New View')).toBe(true);
        });

        //14.3_1280_1
        it('displays that view in the dashbaord', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges', 'Barr', 'I Have More!', 'oneview']).then(function() {
                expect(viewSelector.getCurrentViewName()).toBe('View 1');
                expect(dashboardPage.getNumberWidgetSections()).toBe(3);
                expect(viewSelector.getNumberOfViews()).toBe(2); // (newview too)
            });
        });
    });

    describe('when a context with many views is selected', function() {

        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges', 'Barr', 'Lots More!', 'Lastonehere']);
        });

        /**
         * 14.3 3 1288
         */
        it('has a new view option in the dropdown', function() {
            expect(viewSelector.hasViewOption('New View')).toBe(true);
        });

        /**
         * 14.3.4 1288
         */
        //14.3_1353_1
        it('the user can switch views', function() {
            expect(dashboardPage.getNumberWidgetSections()).toBe(3);
            viewSelector.selectViewByText('Empty view').then(function() {
                expect(dashboardPage.getNumberWidgetSections()).toBe(0);
            });
        });

        //14.3_1280_2
        it('displays that view in the dashbaord', function() {
            expect(viewSelector.getCurrentViewName()).toBe('View 1');
            expect(dashboardPage.getNumberWidgetSections()).toBe(3);
            viewSelector.getNumberOfViews().then(function(num) {
                expect(num > 2).toBe(true);
            });
        });

        //14.3_1341_1
        it('displays enter edit mode icon is displayed but the add widget is not displayed', function() {
            expect(editModeControls.isEnterEditButtonDisplayed()).toBe(true);
            expect(dashboardPage.isFullAddWidgetButtonPresent()).toBe(false);
        });
    });

    describe('clicking the Create View button', function() {

        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges', 'Barr', 'Lots More!', 'Lastonehere']).then(function() {
                viewSelector.selectViewByText('New View');
            });
        });

        it('opens the new view modal', function() {
            expect(viewDialog.isOpen()).toBe(true);
            viewDialog.clickCancelButton().then(function() {
                browser.wait(function() {
                    return dashboardPage.isModalClosed();
                }, 2000);
            });
        });

        describe('and saving the view', function() {

            //14.3 5 2
            //14.3 5 3
            it('creates a new view on the context, sets it to the active view, and enters edit mode', function() {
                viewDialog.enterName('my view').then(function() {
                    viewDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            expect(viewSelector.getCurrentViewName()).toBe('my view');
                            expect(dashboardPage.isInEditMode()).toBe(true);
                            //going to normal mode
                            editModeControls.clickRevertButton();
                        });
                    });
                });

            });
        });
    });
});