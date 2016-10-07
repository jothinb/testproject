'use strict';

var contextSelector = require('../models/context-selector');
var contextBrowser = require('../models/context-browser');
var dashboardPage = require('../models/dashboard-page');
var editModeControls = require('../models/edit-mode-controls');
var viewSelector = require('../models/view-selector');

describe('The context selector', function() {
    afterEach(function() {
        contextSelector.isContextBrowserOpen().then(function(isOpen) {
            if (isOpen) {
                contextSelector.toggleContextBrowser();
            }
        });
    });

    //14.3_1347_1
    it('verify when no context is selected, Select context is displayed', function() {
        expect(contextSelector.getContextNameNoWait()).toBe('Select Context');
    });

    //14.3_1284_1
    it('When the user is on the dashboard for the first time (no context selected), the Breadcrumbs above the Select Context will not be displayed', function() {
        contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
            expect(breadcrumbs).toEqual('');
        });
    });

    //14.3_1284_2
    //14.3_1284_5
    it('breadcrumbs dont change as context browser is clicked', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                    contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
                        expect(breadcrumbs).toEqual('');
                    });
                });
            });
        });
    });

    //14.3_1346_5
    it('context browser is not displayed by default-without clicking on select context', function() {
        expect(contextSelector.isContextBrowserOpen()).toBe(false);
    });

    //14.3_1346_1
    it('context browser is displayed without any error- clicked on the drop down', function() {
        expect(contextSelector.isContextBrowserOpen()).toBe(false);
        contextSelector.toggleContextBrowser().then(function() {
            expect(contextSelector.isContextBrowserOpen()).toBe(true);
        });
    });

    //14.3_1346_3
    it('context browser is hidden- click on the drop down ', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextSelector.toggleContextBrowser().then(function() {
                expect(contextSelector.isContextBrowserOpen()).toBe(false);
            });
        });
    });

    //14.3_1346_2
    it('context browser is not displayed - clicked anywhere on the page', function() {
        dashboardPage.clickOutsideContextBrowser().then(function() {
            expect(contextSelector.isContextBrowserOpen()).toBe(false);
        });
    });

    //14.3_1346_4
    it('context browser is hidden - when clicked outside of the context browser', function() {
        contextSelector.toggleContextBrowser().then(function() {
            dashboardPage.clickOutsideContextBrowser().then(function() {
                expect(contextSelector.isContextBrowserOpen()).toBe(false);
            });
        });
    });

    //14.3_1347_3
    it('should display the name of the selected context', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getContextName().then(function(name) {
                            expect(name).toBe('Onemore');
                        });
                    });
                });
            });
        });
    });

    //14.3_1347_4
    it('if open second context name, then name of context will change', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getContextName().then(function(name) {
                            expect(name).toBe('Onemore');
                            contextSelector.toggleContextBrowser().then(function() {
                                contextBrowser.browseByContextNames(['Lastonehere']).then(function() {
                                    contextBrowser.clickOpenContext().then(function() {
                                        contextSelector.getContextName().then(function(name) {
                                            expect(name).toBe('Lastonehere');
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

    //14.3_1347_5
    it('When the context is selected, verify traversing through the tree and see the current contextname is not changed before clicking the open on any of the node (negative test case)', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getContextName().then(function(name) {
                            expect(name).toBe('Onemore');
                            contextSelector.toggleContextBrowser().then(function() {
                                contextBrowser.browseByContextNames(['Lastonehere']).then(function() {
                                    contextSelector.getContextName().then(function(name) {
                                        expect(name).toBe('Onemore');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should display the names of the selected context', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
                            expect(breadcrumbs).toContain('Sandy Bridges');
                            expect(breadcrumbs).toContain('Barr');
                            expect(breadcrumbs).toContain('Lots More!');
                        });
                    });
                });
            });
        });
    });

    //14.3_1610_1
    //14.3_1610_3
    it('context browser is enabled when application starts and user is viewing contexts.  disabled when enter edit mode', function() {
        contextSelector.isEnabled().then(function(isEnabled) {
            expect(isEnabled).toBe(true);
            contextSelector.toggleContextBrowser().then(function() {
                contextBrowser.resetToFirstLevel().then(function() {
                    contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                        contextBrowser.clickOpenContext().then(function() {
                            contextSelector.isEnabled().then(function(isEnabled) {
                                expect(isEnabled).toBe(true);
                                editModeControls.clickEnterEditModeButton().then(function() {
                                    contextSelector.isEnabled().then(function(isEnabled) {
                                        expect(isEnabled).toBe(false);
                                        editModeControls.clickRevertButton();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    //14.3_1610_2
    it('context browser is enabled/disabled as user toggles edit mode/save/revert', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        editModeControls.clickEnterEditModeButton().then(function() {
                            contextSelector.isEnabled().then(function(isEnabled) {
                                expect(isEnabled).toBe(false);
                                editModeControls.clickSaveButton().then(function() {
                                    contextSelector.isEnabled().then(function(isEnabled) {
                                        expect(isEnabled).toBe(true);
                                        editModeControls.clickEnterEditModeButton().then(function() {
                                            contextSelector.isEnabled().then(function(isEnabled) {
                                                expect(isEnabled).toBe(false);
                                                editModeControls.clickRevertButton().then(function() {
                                                    contextSelector.isEnabled().then(function(isEnabled) {
                                                        expect(isEnabled).toBe(true);
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

    //14.3_1435_1
    //14.3_1284_3
    it('the breadcrumbs show all parent contexts when there are less than 3, and does not show the ellipsis', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
                            expect(breadcrumbs).toContain('Sandy Bridges');
                            expect(breadcrumbs).toContain('Barr');
                            expect(breadcrumbs).not.toContain('...');
                        });
                    });
                });
            });
        });
    });

    //14.3_1435_2
    //14.3_1284_4
    it('the breadcrumbs show all parent contexts when there are exactly 3, and does not show the ellipsis', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
                            expect(breadcrumbs).toContain('Sandy Bridges');
                            expect(breadcrumbs).toContain('Barr');
                            expect(breadcrumbs).toContain('Lots More!');
                            expect(breadcrumbs).not.toContain('...');
                        });
                    });
                });
            });
        });
    });

    //14.3_1435_3
    it('the breadcrumbs show the last 3 parent contexts when there are more than 3, and does show the ellipsis', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'Lots More!', 'Onemore', 'Justoneherer']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        contextSelector.getBreadcrumbs().then(function(breadcrumbs) {
                            expect(breadcrumbs).toContain('Barr');
                            expect(breadcrumbs).toContain('Lots More!');
                            expect(breadcrumbs).toContain('Onemore');
                            expect(breadcrumbs).toContain('...');
                        });
                    });
                });
            });
        });
    });

    //14.3_1581_1
    describe('When open context', function() {
        var beforeChangeContextName;
        beforeEach(function() {
            beforeChangeContextName = contextSelector.getContextName();
            contextSelector.toggleContextBrowser().then(function() {
                contextBrowser.resetToFirstLevel();
            });
        });

        describe('context datasource meta returns error', function() {
            beforeEach(function() {
                contextBrowser.browseByContextNames(['Fetch Datasource Error']).then(function() {
                    contextBrowser.clickOpenContext();
                });
            });

            it('context name will not change', function() {
                expect(contextSelector.getContextName()).toEqual(beforeChangeContextName);
            });

            it('dashboard alert will show', function() {
                expect(dashboardPage.getErrorMessages()).toEqual('Error when fetching context metadata');
            });

            it('can still navigate to another context', function(){
                contextSelector.toggleContextBrowser().then(function() {
                    contextBrowser.resetToFirstLevel().then(function() {
                        contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                            contextBrowser.clickOpenContext().then(function() {
                                expect(contextSelector.getContextName()).toEqual('Sandy Bridges');
                            });
                        });
                    });
                });
            });
        });

        describe('context view returns error', function() {
            beforeEach(function() {
                contextBrowser.browseByContextNames(['Fetch View Error']).then(function() {
                    contextBrowser.clickOpenContext();
                });
            });

            it('context name will not change', function() {
                expect(contextSelector.getContextName()).toEqual(beforeChangeContextName);
            });

            it('dashboard alert will show', function() {
                expect(dashboardPage.getErrorMessages()).toEqual('Error when fetching context metadata');
            });

            it('can still navigate to another context', function(){
                contextSelector.toggleContextBrowser().then(function() {
                    contextBrowser.resetToFirstLevel().then(function() {
                        contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                            contextBrowser.clickOpenContext().then(function() {
                                expect(contextSelector.getContextName()).toEqual('Sandy Bridges');
                            });
                        });
                    });
                });
            });
        });

        afterEach(function() {
            dashboardPage.closeErrorMessage();
        });
    });
});