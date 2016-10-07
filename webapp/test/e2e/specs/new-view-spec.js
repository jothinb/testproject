'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var contextSelector = require('../models/context-selector');
var viewDialog = require('../models/view-dialog');

describe('When the user creates a new view', function() {

    describe('when user open a context which cannot add a new view', function() {
        var NewViewName = "New View Name";
        beforeEach(function() {
            dashboardPage.openContextWithPath(['Cannot Create View']).then(function() {
                dashboardPage.addView(NewViewName);
            });
        });

        //14.3_1351_7_1
        it('verify the modal is closed', function(){
            expect(viewDialog.isClosed()).toBe(true);
        });

        //14.3_1351_7_2
        it('verify view is not created in view selector', function() {
            expect(viewSelector.hasViewOption(NewViewName)).toBe(false);
        });

        //14.3_1351_7_3
        it('verify current view is not new view name', function() {
            expect(viewSelector.getCurrentViewName()).not.toEqual(NewViewName);
        });

        //14.3_1351_7_4
        it('verify dashboard alert is shown', function() {
            expect(dashboardPage.getErrorMessages()).toEqual('Error when creating context view');
        });

        afterEach(function() {
            viewSelector.isEnabled().then(function(isEnabled) {
                dashboardPage.closeErrorMessage();
                if (!isEnabled) {
                    editModeControls.clickRevertButton();
                }
            });
        });
    });

    describe('when open a normal context', function() {

        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges']);
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

        describe('when add a view to the context', function() {

            beforeEach(function() {
                dashboardPage.addView(Date.now());
            });

            //14.3_1610_4
            it('context browser is disabled', function() {
                contextSelector.isEnabled().then(function(isEnabled) {
                    expect(isEnabled).toBe(false);
                });
            });

            //14.3_1610_5
            it('when they click the revert button, context browser is enabled', function() {
                editModeControls.clickRevertButton().then(function() {
                    contextSelector.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(true);
                    });
                });
            });

            //14.3_1610_6
            it('when they click the save button, context browser is enabled', function() {
                editModeControls.clickSaveButton().then(function() {
                    contextSelector.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(true);
                    });
                });
            });

        });

        //14.3_1349_1
        //14.3_1351_1
        it('When the user is on the dashboard with a currently selected context, then they can select New View from the view dropdown and the New View modal will open.	', function () {
            browser.wait(function() {
                return viewSelector.isPresent() && viewSelector.isDisplayed();
            }, 2000).then(function() {
                viewSelector.selectViewByText('New View').then(function(){
                    browser.wait(function() {
                        return viewDialog.isOpen();
                    }, 2000).then(function(){
                        viewDialog.isOpen().then(function(isOpen) {
                            expect(isOpen).toBe(true);
                        });
                    });
                });
            });
        });

        //14.3_1351_2
        it('When the user types a name with over 2 non-whitespace characters into the New View modal and Clicks Save, the new View will be displayed in Edit Mode (the Add Widget button is displayed).	', function() {
            dashboardPage.addView(Date.now()).then(function() {
                editModeControls.isSaveButtonDisplayed().then(function(isSaveDisplayed) {
                    dashboardPage.isFullAddWidgetButtonDisplayed().then(function(isAddWidgetDisplayed) {
                        expect(isSaveDisplayed).toBe(true);
                        expect(isAddWidgetDisplayed).toBe(true);
                    });
                })
            });
        });

        //14.3_1351_3
        it('When the user types a name with over 2 non-whitespace characters into the New View modal and Clicks Save, the new View will be the currently selected view in the View dropdown', function() {
            var theName = Date.now() + '';
            dashboardPage.addView(theName).then(function() {
                viewSelector.getCurrentViewName().then(function(currentView) {
                    expect(currentView).toEqual(theName);
                })
            });
        });

        //14.3_1351_4
        it('When the user types only 1 character or no characters into the New View modal should disable the Save button.', function () {
            viewSelector.selectViewByText('New View').then(function(){
                browser.wait(function() {
                    return viewDialog.isOpen();
                }, 2000).then(function(){
                    viewDialog.enterName('a').then(function() {
                        viewDialog.isSaveButtonEnabled().then(function(isEnabled) {
                            expect(isEnabled).toBe(false);
                        });
                    });
                });
            });
        });

        //14.3_1351_5
        it('When the user is on the dashboard with selected context, when they select New View and then hit Cancel in the new view modal should previous view displayed (and selected in the View dropdown).', function() {
            viewSelector.selectViewByText('View 1').then(function(){
                viewSelector.selectViewByText('New View').then(function(){
                    browser.wait(function() {
                        return viewDialog.isOpen();
                    }, 2000).then(function(){
                        viewDialog.clickCancelButton().then(function() {
                            viewSelector.getCurrentViewName().then(function(currentView) {
                                expect(currentView).toEqual('View 1');
                            })
                        });
                    });
                });
            });
        });

        it('When the user save the view, after clicking the save view button, the button should be disabled', function(){
            viewSelector.selectViewByText('New View').then(function(){
                browser.wait(function() {
                    return viewDialog.isOpen();
                }, 2000).then(function(){
                    viewDialog.enterName('TestDisableButton').then(function() {
                        viewDialog.clickSaveButton().then(function() {
                            viewDialog.isSaveButtonEnabled().then(function(isEnabled) {
                                expect(isEnabled).toBe(false);
                            });
                        });
                    });
                });
            });
        });

    });

    describe('when open a context with no views', function() {

        afterEach(function() {
            viewDialog.isOpen().then(function(isOpen) {
                if(isOpen) {
                    viewDialog.clickCancelButton();
                }
            });
            viewSelector.isDisplayed().then(function(isDisplayed) {
                if(isDisplayed) {
                    viewSelector.isEnabled().then(function (isEnabled) {
                        if (!isEnabled) {
                            editModeControls.clickRevertButton();
                        }
                    });
                }
            });
        });

        //14.3_1348_1
        it('When the user clicks the Open button in the context browser for a context that has no views, then the Create New View link is there.', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges','Barr','I Have More!','nothing']).then(function() {
                dashboardPage.isCreateViewHyperlinkDisplayed().then(function(isDisplayed) {
                    expect(isDisplayed).toBe(true);
                });
            });
        });

        //14.3_1348_3
        it('When the user opens up a context with no views but hits the Cancel button on the New View modal that immediately pops up they will still see the Create View link', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges','Barr','I Have More!','nothing2']).then(function() {
                dashboardPage.clickCreateViewHyperlink().then(function(isDisplayed) {
                    browser.wait(function() {
                        return viewDialog.isOpen();
                    }, 2000).then(function() {
                        viewDialog.enterName(Date.now()).then(function() {
                            viewDialog.clickCancelButton().then(function() {
                                browser.wait(function() {
                                    return dashboardPage.isModalClosed();
                                }, 2000).then(function() {
                                    dashboardPage.isCreateViewHyperlinkDisplayed().then(function(isDisplayed) {
                                        expect(isDisplayed).toBe(true);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        //14.3_1348_2
        it('When the user opens up a context with no views and creates a view (using the Create New View link), then they will see that view on the dashboard.', function() {
            dashboardPage.openContextWithPath(['Sandy Bridges','Barr','I Have More!','nothing3']).then(function() {
                dashboardPage.clickCreateViewHyperlink().then(function(isDisplayed) {
                    browser.wait(function() {
                        return viewDialog.isOpen();
                    }, 2000).then(function() {
                        var myname = '' + Date.now();
                        viewDialog.enterName(myname).then(function() {
                            viewDialog.clickSaveButton().then(function() {
                                browser.wait(function() {
                                    return dashboardPage.isModalClosed();
                                }, 2000).then(function() {
                                    expect(viewSelector.getCurrentViewName()).toEqual(myname);
                                    expect(dashboardPage.getNumberWidgetSections()).toBe(0);
                                });
                            });
                        });
                    });
                });
            });
        });

    });

});