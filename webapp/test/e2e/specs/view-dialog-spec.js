'use strict';

var contextBrowser = require('../models/context-browser');
var contextSelector = require('../models/context-selector');
var dashboardPage = require('../models/dashboard-page');
var viewDialog = require('../models/view-dialog');
var editModeControls = require('../models/edit-mode-controls');
var viewSelector = require('../models/view-selector');
var currentContextName = "Sandy Bridges";

describe('Edit view dialog', function() {

    describe('When view is editable', function(){
        beforeEach(function() {
            dashboardPage.openContextWithPath([currentContextName]).then(function() {
                editModeControls.clickEnterEditModeButton();
            });
        });

        afterEach(function() {
            editModeControls.clickRevertButton();
        });

        //14.3_1289_1
        it('verify edit view icon on the context view page.', function() {
            expect(editModeControls.isEditViewButtonDisplayed()).toBe(true);
        });

        describe('when user clicks edit view icon', function() {
            beforeEach(function() {
                editModeControls.clickEditViewButton();
            });

            describe('when edit view dialog opens', function() {

                afterEach(function() {
                    viewDialog.clickCancelButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000);
                    });
                });

                //14.3_1289_2_1
                it('verify dialog is opened (with the current view settings)', function() {
                    expect(viewDialog.isOpen()).toBe(true);
                });

                //14.3_1289_2
                it('verify dialog has view name field matches the name of the existing view and is not blank', function() {
                    expect(viewDialog.getEnteredViewName()).toEqual('View 1');
                });

                //14.3_1289_2_3,4
                it('verify dialog has save, cancel and close buttons are displayed', function() {
                    expect(viewDialog.isCancelButtonDisplayed()).toBe(true);
                    expect(viewDialog.isSaveButtonDisplayed()).toBe(true);
                    expect(viewDialog.isCloseButtonDisplayed()).toBe(true);
                });

            });

            describe('when user updates the name of the view and click on save button', function() {

                var inputVal;

                beforeEach(function() {
                    inputVal = Date.now();
                    viewDialog.clearName().then(function() {
                        viewDialog.enterName(inputVal).then(function() {
                            viewDialog.clickSaveButton();
                        });
                    });
                });

                //14.3_1289_3_1
                it('verify modal will be closed', function() {
                    expect(viewDialog.isOpen()).toBe(false);
                });

                //14.3_1289_3_2
                it('verify name of the view is updated and in the view dropdown', function() {
                    expect(viewSelector.getCurrentViewName()).toEqual(inputVal.toString());
                });

                //14.3_1610_9
                it('if edit and save view, then context browser is disabled (in edit mode)', function(){
                    contextSelector.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(false);
                    });
                });
            });

            describe('when user updates the name of the view and click on cancel button ', function() {

                var inputVal;

                beforeEach(function() {
                    inputVal = Date.now();
                    viewDialog.clearName().then(function() {
                        viewDialog.enterName(inputVal).then(function() {
                            viewDialog.clickCancelButton();
                        });
                    });
                });

                //14.3_1289_6_1
                it('verify dialog will be closed', function() {
                    expect(viewDialog.isOpen()).toBe(false);
                });

                //14.3_1289_6_2
                it('verify the name of the view is NOT updated in the view drop down', function() {
                    expect(viewSelector.getCurrentViewName()).not.toEqual(inputVal);
                });

                //14.3_1610_8
                it('if edit and cancel view, then context browser is disabled', function(){
                    contextSelector.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(false);
                    });
                });
            });

            describe('when user wants to save or revert context', function() {
                afterEach(function() {
                    //re-enter edit mode
                    editModeControls.clickEnterEditModeButton();
                });

                describe('when user saves view name and \'Save\' the context', function() {

                    //14.3_1289_4_1
                    it('verify new view name is displayed in the view drop down.', function() {

                        var inputVal = Date.now();
                        viewDialog.clearName().then(function() {
                            viewDialog.enterName(inputVal).then(function() {
                                viewDialog.clickSaveButton().then(function() {
                                    browser.wait(function() {
                                        return dashboardPage.isModalClosed();
                                    }, 2000).then(function() {
                                        editModeControls.clickSaveButton().then(function() {
                                            expect(viewSelector.hasViewOption(inputVal)).toBe(true);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });


                describe('when user saves the view name and \'Revert\' the context', function() {

                    it('verify old view name is displayed in the view drop down.', function() {

                        var inputVal = Date.now();
                        viewDialog.clearName().then(function() {
                            viewDialog.enterName(inputVal).then(function() {
                                viewDialog.clickSaveButton().then(function() {
                                    browser.wait(function() {
                                        return dashboardPage.isModalClosed();
                                    }, 2000).then(function() {
                                        editModeControls.clickRevertButton().then(function() {
                                            expect(viewSelector.hasViewOption(inputVal)).toBe(false);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });

                describe('verify updating the name of the view and click on save button, Navigate to different view in the context and click on the edit icon', function() {

                    //14.3_1289_8
                    it('ensure the correct context tree name is displayed. (Negative)', function() {
                        var inputVal = Date.now();
                        viewDialog.enterName(inputVal).then(function() {
                            viewDialog.clickSaveButton().then(function() {
                                browser.wait(function() {
                                    return dashboardPage.isModalClosed();
                                }, 2000).then(function() {
                                    editModeControls.clickSaveButton().then(function() {
                                        viewSelector.selectViewByText('Empty view').then(function() {
                                            expect(contextSelector.getContextName()).toEqual(currentContextName);
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

    describe('When view is not editable and user updates the view', function(){
        var updatedViewName;
        beforeEach(function(){
            dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
                viewSelector.selectViewByText('NotUpdatableView').then(function() {
                    editModeControls.clickEnterEditModeButton().then(function() {
                        editModeControls.clickEditViewButton().then(function() {
                            updatedViewName = Date.now();
                            viewDialog.clearName().then(function() {
                                viewDialog.enterName(updatedViewName).then(function() {
                                    viewDialog.clickSaveButton();
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('when user clicks save view button', function(){
            beforeEach(function(){
                editModeControls.clickSaveButtonNoWait();
            });

            //14.3_1289_9_1
            it('verify the modal is closed', function(){
                expect(viewDialog.isClosed()).toBe(true);
            });

            //14.3_1289_9_2
            it('verify view is not updated in view selector', function() {
                expect(viewSelector.hasViewOption(updatedViewName)).toBe(false);
            });

            //14.3_1289_9_3
            it('verify current view is not updated view name', function() {
                expect(viewSelector.getCurrentViewName()).not.toEqual(updatedViewName);
            });

            //14.3_1289_9_4
            it('verify dashboard alert is shown', function() {
                expect(dashboardPage.getErrorMessages()).toEqual('Error when updating context view');
            });

            afterEach(function(){
                dashboardPage.closeErrorMessage();
                editModeControls.clickRevertButton();
            });
        });

        describe('when user click revert button', function(){
            beforeEach(function(){
                editModeControls.clickRevertButton();
            });

            //14.3_1289_10_1
            it('verify the modal is closed', function(){
                expect(viewDialog.isClosed()).toBe(true);
            });

            //14.3_1289_10_2
            it('verify view is not updated in view selector', function() {
                expect(viewSelector.hasViewOption(updatedViewName)).toBe(false);
            });

            //14.3_1289_10_3
            it('verify current view is not updated view name', function() {
                expect(viewSelector.getCurrentViewName()).not.toEqual(updatedViewName);
            });

        });
    });
});