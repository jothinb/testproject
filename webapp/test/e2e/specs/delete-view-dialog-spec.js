'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var deleteViewDialog = require('../models/delete-view-dialog');
var viewDialog = require('../models/view-dialog');
var contextSelector = require('../models/context-selector');
var currentContextName = "Sandy Bridges";

describe('Delete view dialog', function() {

    describe('when dashboard in edit mode', function() {

        beforeEach(function() {
            dashboardPage.openContextWithPath([currentContextName]).then(function() {
                editModeControls.clickEnterEditModeButton();
            });
        });

        afterEach(function () {
            editModeControls.clickRevertButton();
        });

        describe('when user clicked on edit button of the context', function () {
            //14.3_1291_1
            it('verify the delete icon is displayed', function () {
                expect(editModeControls.isDeleteViewButtonDisplayed()).toBe(true);
            });
        });

        describe('when the user clicks on the delete view icon', function() {
            var currentViewName = "";

            beforeEach(function () {
                viewSelector.getCurrentViewName().then(function(viewName){
                    currentViewName = viewName;
                    editModeControls.clickDeleteViewButton();
                });
            });

            describe('when delete modal open', function () {
                afterEach(function () {
                    deleteViewDialog.clickCancel();
                });

                //14.3_1291_5_1
                it('modal has Delete View heading', function () {
                    expect(deleteViewDialog.getDialogTitle()).toEqual("Delete View");
                });

                //14.3_1291_5_2
                it('modal show confirm message', function () {
                    expect(deleteViewDialog.getDialogMessage()).toEqual("Are you sure you want to delete the view "+currentViewName+"?");
                });

                //14.3_1291_5_2
                it('modal contains delete, cancel and close button', function () {
                    expect(deleteViewDialog.isOkButtonDisplayed()).toBe(true);
                    expect(deleteViewDialog.isCancelButtonDisplayed()).toBe(true);
                    expect(deleteViewDialog.isCloseButtonDisplayed()).toBe(true);
                });
            });

            describe('when user do not want to delete the view', function () {
                //14.3_1291_6
                it('verify click close button will close the confirm message', function () {
                    deleteViewDialog.clickClose().then(function () {
                        expect(deleteViewDialog.isClosed()).toBe(true);
                    });
                });

                //14.3_1291_7_1
                it('verify clicking on \'Cancel\' will not delete the view', function () {
                    deleteViewDialog.clickClose().then(function () {
                        expect(viewSelector.getCurrentViewName()).toEqual(currentViewName);
                    });
                });

                //14.3_1291_7_2
                it('verify clicking on \'Cancel\' and \'Revert\' context button will not delete the view', function () {
                    deleteViewDialog.clickClose().then(function () {
                        editModeControls.clickRevertButton().then(function () {
                            expect(viewSelector.getCurrentViewName()).toEqual(currentViewName);
                            editModeControls.clickEnterEditModeButton();
                        });
                    });
                });

                //14.3_1291_8_1
                it('verify clicking on \'Cancel\' and \'Save\' context button will not delete the view', function () {
                    deleteViewDialog.clickClose().then(function () {
                        editModeControls.clickSaveButton().then(function () {
                            expect(viewSelector.getCurrentViewName()).toEqual(currentViewName);
                            editModeControls.clickEnterEditModeButton();
                        });
                    });
                });
            });

        });

        describe('when user wants to delete the view', function() {
            var testViewName, firstViewName;

            beforeEach(function() {
                //exit edit mode
                editModeControls.clickRevertButton().then(function() {
                    testViewName = Date.now();
                    //enter edit mode after adding a view
                    dashboardPage.addView(testViewName).then(function() {
                        editModeControls.clickDeleteViewButton();
                    });
                });
            });

            afterEach(function() {
                editModeControls.clickEnterEditModeButton();
            });

            //14.3_1291_9_1
            it('verify clicking on \'save\' will delete the view', function() {
                deleteViewDialog.clickOk().then(function() {
                    expect(viewSelector.getCurrentViewName()).not.toEqual(testViewName);
                });
            });

            //14.3_1610_7
            it('if delete view, then context browser is enabled', function() {
                deleteViewDialog.clickOk().then(function() {
                    contextSelector.isEnabled().then(function(isEnabled) {
                        expect(isEnabled).toBe(true);
                    });
                });
            });

            //14.3_1291_11
            it('verify when there is more than 1 view, the first view in the view is displayed', function() {
                deleteViewDialog.clickOk().then(function() {
                    //after deleting added view, view 1 to be the view again
                    expect(viewSelector.getNumberOfViews()).toBeGreaterThan(1);
                    expect(viewSelector.getFirstViewName()).toEqual(viewSelector.getCurrentViewName());
                });
            });
        });
    });

    describe('When dashboard not in edit mode', function () {
        beforeEach(function(){
            dashboardPage.openContextWithPath(['Sandy Bridges']);
        });

        //14.3_1291_2
        it('verify the delete icon is not displayed', function () {
            expect(editModeControls.isDeleteViewButtonPresent()).toBe(false);
        });
    });

    describe('when want to delete all views', function() {
        beforeEach(function() {
            dashboardPage.openContextWithPath(['Sandy Bridges','Barr','I Have More!', 'oneview']).then(function() {
                dashboardPage.addView(Date.now()).then(function() {
                    editModeControls.clickDeleteViewButton();
                });
            });
        });

        //14.3_1291_12
        it('verify when no views in the list, message is displayed', function () {
            //delete new view
            deleteViewDialog.clickOk().then(function () {
                // delete first view
                editModeControls.clickEnterEditModeButton().then(function () {
                    editModeControls.clickDeleteViewButton().then(function() {
                        deleteViewDialog.clickOk().then(function() {
                            expect(dashboardPage.getContextWithNoViewsText()).toEqual('No views are configured for this context. Create a view.');
                            expect(dashboardPage.isCreateViewHyperlinkEnabled()).toBe(true);
                        });
                    });
                });
            });
        });
    });

    describe('when the view is not deletable', function(){
        var undeletableViewName = 'UndeletableView'
        beforeEach(function() {
            dashboardPage.openContextWithPath([currentContextName]).then(function() {
                viewSelector.selectViewByText(undeletableViewName).then(function(){
                    editModeControls.clickEnterEditModeButton().then(function(){
                        editModeControls.clickDeleteViewButton().then(function(){
                            deleteViewDialog.clickOk();
                        });
                    });
                });
            });
        });

        //14.3_1291_13_1
        it('verify modal is closed', function(){
            expect(deleteViewDialog.isClosed()).toBe(true);
        });

        //14.3_1291_13_2
        it('verify view remains in view selector', function(){
            expect(viewSelector.hasViewOption(undeletableViewName)).toBe(true);
        });

        //14.3_1291_13_3
        it('verify current view remains the same', function(){
            expect(viewSelector.getCurrentViewName()).toEqual(undeletableViewName);
        });

        //14.3_1291_13_4
        it('verify dashboard alert is \'Error deleting context view\'', function(){
            expect(dashboardPage.getErrorMessages()).toEqual('Error when deleting context view');
        });

        afterEach(function () {
            dashboardPage.closeErrorMessage();
            editModeControls.clickRevertButton();
        });
    });

});