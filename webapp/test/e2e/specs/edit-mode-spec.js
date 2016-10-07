'use strict';

var editModeControls = require('../models/edit-mode-controls');
var dashboardPage = require('../models/dashboard-page');
var viewSelector = require('../models/view-selector');
var deleteWidgetDialog = require('../models/delete-widget-dialog');
var widgetDialog = require('../models/widget-dialog');

describe('When in edit mode', function() {

    beforeEach(function() {
        browser.driver.manage().window().setSize(1280, 1024).then(function() {

            dashboardPage.openContextWithPath(['Sandy Bridges']).then(function() {
                editModeControls.clickEnterEditModeButton();
            });
        });
    });

    describe('When user clicked on edit button of the context', function() {
        afterEach(function() {
            viewSelector.isEnabled().then(function(isEnabled) {
                if(!isEnabled) {
                    editModeControls.clickRevertButton();
                }
            });
        });

        //14.3_1430_1
        it('verify revert and save are displayed', function() {
            expect(editModeControls.isRevertButtonDisplayed()).toBe(true);
            expect(editModeControls.isSaveButtonDisplayed()).toBe(true);
        });

        //14.3_1341_2
        it('enter edit mode button is not displayed', function() {
            expect(editModeControls.isEnterEditButtonPresentNoWait()).toBe(false);
        });

        //14.3_1341_3
        it('full add widget button is displayed', function() {
            expect(dashboardPage.isFullAddWidgetButtonDisplayed()).toBe(true);
        });

        //14.3_1430_1
        //14.3_1353_2
        it('When user clicked on edit button of the context, verify view selector disabled', function() {
            expect(viewSelector.isEnabled()).toBe(false);
        });

        //14.3_1353_3
        it('When user clicked on edit button of the context but then hit revert, verify view selector is enabled and they can change views', function() {
            editModeControls.clickRevertButton().then(function() {
                expect(viewSelector.isEnabled()).toBe(true);
                viewSelector.selectViewByText('Empty view').then(function() {
                    expect(dashboardPage.getNumberWidgetSections()).toBe(0);
                });
            });
        });

        //14.3_1430_1
        it('When user clicked on edit button of the context, verify add full widget is displayed', function() {
            expect(dashboardPage.isFullAddWidgetButtonDisplayed()).toBe(true);
        });

        //14.3_1294_1
        it('shows delete buttons for each of the widgets', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                expect(dashboardPage.getDeleteWidgetIconsCount()).toBe(count);
            });
        });

        //14.3_1295_1
        it('shows edit buttons for each of the widgets', function() {
            dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function() {
                dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                    dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                        dashboardPage.getEditWidgetIconsCount().then(function(editWidgetIconsCount) {
                            expect(widgetsCount).toBe(editWidgetIconsCount);
                        });
                    });
                });
            });
        });
    });

    describe('when the delete widget button is clicked', function() {

        //14.3_1294_3
        //14.3_1593_1
        it('opens the delete widget modal dialog', function() {
            dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                expect(deleteWidgetDialog.isOpen()).toBe(true);
                expect(deleteWidgetDialog.getContent()).toContain('Are you sure you want to delete this widget?');
                expect(deleteWidgetDialog.getContent()).toContain('Cancel');
                expect(deleteWidgetDialog.getContent()).toContain('Ok');
                deleteWidgetDialog.clickCancel().then(function() {
                    browser.wait(function() {
                        return dashboardPage.isModalClosed();
                    }, 2000).then(function() {
                        editModeControls.clickRevertButton();
                    });
                });
            });
        });

        it('can cancel deleting the widget by clicking the x button in the top right corner', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickCancel().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                expect(widgetsCount).toBe(newWidgetsCount);
                                editModeControls.clickRevertButton();
                            });
                        });
                    });
                })
            });
        });

        //14.3_1294_7
        it('can save deleting a widget', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickOk().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                expect(widgetsCount).toBe(newWidgetsCount + 1);

                            });
                            editModeControls.clickSaveButton().then(function() {
                                dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                    expect(widgetsCount).toBe(newWidgetsCount + 1);

                                });
                            });
                        });
                    });
                })
            });
        });

        //14.3_1294_8
        it('can revert deleting a widget', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickOk().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                expect(widgetsCount).toBe(newWidgetsCount + 1);
                                editModeControls.clickRevertButton().then(function() {
                                    dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                        expect(widgetsCount).toBe(newWidgetsCount);
                                    });
                                });
                            });
                        });
                    });
                })
            });
        });

        //14.3_1294_6
        it('can save canceling the deletion of a widget', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickCancel().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                expect(widgetsCount).toBe(newWidgetsCount);
                                editModeControls.clickSaveButton().then(function() {
                                    dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                        expect(widgetsCount).toBe(newWidgetsCount);
                                    });
                                });
                            });
                        });
                    });
                })
            });
        });

        //14.3_1294_5
        it('can revert canceling the deletion of a widget', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickCancel().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                expect(widgetsCount).toBe(newWidgetsCount);
                                editModeControls.clickRevertButton().then(function() {
                                    dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                        expect(widgetsCount).toBe(newWidgetsCount);
                                    });
                                });
                            });
                        });
                    });
                })
            });
        });

        //14.3_1294_10
        it('can revert deleting multiple widgets', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickOk().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                                deleteWidgetDialog.clickOk().then(function() {
                                    browser.wait(function() {
                                        return dashboardPage.isModalClosed();
                                    }, 2000).then(function() {
                                        editModeControls.clickRevertButton().then(function() {
                                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                                expect(widgetsCount).toBe(newWidgetsCount);
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

        //14.3_1294_9
        it('can save deleting multiple widgets', function() {
            dashboardPage.getWidgetsCount().then(function(widgetsCount) {
                dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                    deleteWidgetDialog.clickOk().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.clickDeleteWidgetButtonAtIndex(0).then(function() {
                                deleteWidgetDialog.clickOk().then(function() {
                                    browser.wait(function() {
                                        return dashboardPage.isModalClosed();
                                    }, 2000).then(function() {
                                        editModeControls.clickSaveButton().then(function() {
                                            dashboardPage.getWidgetsCount().then(function(newWidgetsCount) {
                                                expect(widgetsCount).toBe(newWidgetsCount + 2);
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

    describe('when the edit widget button is clicked', function() {

        //14.3_1295_2
        it('opens the edit widget dialog', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(0).then(function() {
                expect(widgetDialog.isOpen()).toBe(true);
                widgetDialog.clickCancelButton().then(function() {
                    browser.wait(function() {
                        return dashboardPage.isModalClosed();
                    }, 2000).then(function() {
                        editModeControls.clickRevertButton();
                    });
                });
            });
        });

        //14.3_1295_6
        it('can save edits made to the widget', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                expect(text).toEqual('I am a directive.');
                                editModeControls.clickRevertButton();
                            });
                        });
                    });
                });
            });
        });

        //14.3_1295_8
        it('can persist edits made to the widget to the view', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            editModeControls.clickSaveButton().then(function() {
                                dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                    expect(text).toEqual('I am a directive.');
                                });
                            });
                        });
                    });
                });
            });
        });

        //14.3_1295_7
        it('can revert edits made to the widget', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            editModeControls.clickRevertButton().then(function() {
                                dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                    expect(text).toContain('Yay: TitleFromDS');
                                });
                            });
                        });
                    });
                });
            });
        });

        //14.3_1295_3
        it('can cancel edits made to the widget', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickCancelButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                expect(text).toContain('Yay: TitleFromDS');
                                editModeControls.clickRevertButton();
                            });
                        });
                    });
                })
            });
        });

        //14.3_1295_5
        it('can revert cancelling edits made to the widget', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickCancelButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            editModeControls.clickRevertButton().then(function() {
                                dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                    expect(text).toContain('Yay: TitleFromDS');
                                });
                            });
                        });
                    });
                });
            });
        });

        //14.3_1295_4
        it('can save cancelling edits made to the widget', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickCancelButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            editModeControls.clickSaveButton().then(function() {
                                dashboardPage.getWidgetAtIndex(1).getText().then(function(text) {
                                    expect(text).toContain('Yay: TitleFromDS');
                                });
                            });
                        });
                    });
                });
            });
        });

        //14.3_1295_9
        it('can save edits to multiple widgets', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.clickEditWidgetButtonAtIndex(2).then(function() {
                                widgetDialog.selectWidgetTypeDropdown('Hello World').then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        browser.wait(function() {
                                            return dashboardPage.isModalClosed();
                                        }, 2000).then(function() {
                                            editModeControls.clickSaveButton().then(function() {
                                                dashboardPage.getWidgetAtIndex(1).getText().then(function(widget1Text) {
                                                    dashboardPage.getWidgetAtIndex(2).getText().then(function(widget2Text) {
                                                        expect(widget1Text).toContain('I am a directive.');
                                                        expect(widget2Text).toContain('Yay: TitleFromDS');
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

        //14.3_1295_10
        //14.3_1365_12
        it('can revert edits to multiple widgets', function() {
            dashboardPage.clickEditWidgetButtonAtIndex(1).then(function() {
                widgetDialog.selectWidgetTypeDropdown('Simple Directive').then(function() {
                    widgetDialog.clickSaveButton().then(function() {
                        browser.wait(function() {
                            return dashboardPage.isModalClosed();
                        }, 2000).then(function() {
                            dashboardPage.clickEditWidgetButtonAtIndex(2).then(function() {
                                widgetDialog.selectWidgetTypeDropdown('Hello World').then(function() {
                                    widgetDialog.clickSaveButton().then(function() {
                                        browser.wait(function() {
                                            return dashboardPage.isModalClosed();
                                        }, 2000).then(function() {
                                            editModeControls.clickRevertButton().then(function() {
                                                dashboardPage.getWidgetAtIndex(1).getText().then(function(widget1Text) {
                                                    dashboardPage.getWidgetAtIndex(2).getText().then(function(widget2Text) {
                                                        expect(widget1Text).toContain('Yay: TitleFromDS');
                                                        expect(widget2Text).toContain('I am a directive.');
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

    describe('when changes are made and the revert button is clicked', function() {
        //14.3_1430_3
        it('Verify user is able to add full page widget to the view and click on the Revert button.', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS");
                editModeControls.clickRevertButton().then(function() {
                    expect(dashboardPage.getWidgetsCount()).toBe(count);
                });
            });
        });

        //14.3_1430_4
        it('Verify user is able to add half page widget to the view and click on the Revert button.', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS")
                editModeControls.clickRevertButton().then(function() {
                    expect(dashboardPage.getWidgetsCount()).toBe(count);
                });
            });
        });

        //14.3_1430_5
        it('Verify user is able to add full page and half page widget to the view - click on Revert button, to ensure changes are NOT saved.', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                    dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function() {
                        editModeControls.clickRevertButton().then(function() {
                            expect(dashboardPage.getWidgetsCount()).toBe(count);
                        });
                    });
                });
            });
        });
    });

    describe('when changes are made and the save button is clicked', function() {
        //14.3_1430_6
        it('Verify user is able to add full page widget to the view - click on the Save button, to ensure changes are saved', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function() {
                    editModeControls.clickSaveButton().then(function() {
                        expect(dashboardPage.getWidgetsCount()).toBe(count + 1);
                    });
                });
            });
        });

        //14.3_1430_7
        it('Verify user is able to add half page widget to the view - click on the Save button.', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                    editModeControls.clickSaveButton().then(function() {
                        expect(dashboardPage.getWidgetsCount()).toBe(count + 1);
                    });
                });
            });
        });

        //14.3_1430_8
        it('Verify user is able to add half page and full page widget to the view - click on the Save button.', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                dashboardPage.addHalfSizeWidget("Hello World", "HelloWorldDS").then(function() {
                    dashboardPage.addFullSizeWidget("Hello World", "HelloWorldDS").then(function() {
                        editModeControls.clickSaveButton().then(function() {
                            expect(dashboardPage.getWidgetsCount()).toBe(count + 2);
                            //editModeControls.clickRevertButton();
                        });
                    })
                })
            });
        });
    });

    describe('when no changes are made and clicked on Revert and Save buttons', function() {
        //14.3_1430_10
        it('Verify user is able to edit the view and without any changes able to click on Revert button', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                editModeControls.clickRevertButton().then(function() {
                    expect(dashboardPage.getWidgetsCount()).toBe(count);
                });
            });
        });

        //14.3_1430_11
        it('Verify user is able to edit the view and without any changes able to click on Save button', function() {
            dashboardPage.getWidgetsCount().then(function(count) {
                editModeControls.clickSaveButton().then(function() {
                    expect(dashboardPage.getWidgetsCount()).toBe(count);
                });
            });
        });
    });
});