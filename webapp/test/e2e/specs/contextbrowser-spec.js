'use strict';

var contextBrowser = require('../models/context-browser');
var contextSelector = require('../models/context-selector');
var dashboardPage = require('../models/dashboard-page');
var helper = require('../models/helper');

describe('The context browser', function() {

    afterEach(function() {
        dashboardPage.clickOutsideContextBrowser();
    });

    //14.3_1276_1
    //14.3_1278_1
    //14.3_1278_2
    //14.3_1278_3
    //14.3_1278_4
    //14.3_1278_5
    //14.3_1278_6
    //14.3_1278_7
    it('has the expected content in all panes', function() {
        //this test requires browser to refresh to reset the state of the context browser to the initial state
        helper.refreshBrowser(5000).then(function(){
            contextSelector.toggleContextBrowser().then(function() {
                contextBrowser.resetToFirstLevel().then(function() {
                    contextBrowser.getContextNames(0).then(function(topLevelNames) {
                        contextBrowser.getContextNames(1).then(function(firstLevelNames) {
                            expect(topLevelNames).toContain('Sandy Bridges');
                            expect(topLevelNames).toContain('Mustang');
                            expect(topLevelNames).not.toContain('Wheels'); // children not displayed if not selected
                            expect(topLevelNames).not.toContain('Foo');
                            expect(firstLevelNames).toBe(null); // no children are displayed
                            contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                                contextBrowser.getContextNames(1).then(function(firstLevelNames) {
                                    contextBrowser.getContextNames(2).then(function(secondLevelNames) {
                                        expect(firstLevelNames.length).toBe(2);
                                        expect(firstLevelNames).toContain('Foo'); // correct children are displayed
                                        expect(firstLevelNames).toContain('Barr');
                                        expect(firstLevelNames).not.toContain('Wheels'); // other parent's children not displayed
                                        expect(firstLevelNames).not.toContain('Brakes');
                                        expect(secondLevelNames).toBe(null); // no children are displayed
                                        contextBrowser.browseByContextNames(['Barr']).then(function() {
                                            contextBrowser.getContextNames(2).then(function(secondLevelNames) {
                                                expect(secondLevelNames).toContain('I Have More!');
                                                expect(secondLevelNames).toContain('Lots More!');
                                                expect(secondLevelNames).not.toContain('Lastone'); // other parent's children not displayed
                                                contextBrowser.browseByContextNames(['Lots More!']).then(function() {
                                                    contextBrowser.getContextNames(2).then(function(thirdLevelNames) {
                                                        contextBrowser.getContextNames(0).then(function(firstLevelNames) {
                                                            expect(thirdLevelNames).toContain('Lastonehere');
                                                            expect(firstLevelNames).toContain('Foo'); // the root level is no longer displayed, 2nd level is
                                                            expect(firstLevelNames).toContain('Barr');
                                                            expect(firstLevelNames).not.toContain('Sandy Bridges');
                                                            expect(firstLevelNames).not.toContain('Mustang');
                                                            contextBrowser.browseByContextNames(['Foo']).then(function() { // backward navigation
                                                                contextBrowser.getContextNames(0).then(function(firstLevelNames) {
                                                                    contextBrowser.getContextNames(1).then(function(secondLevelNames) {
                                                                        contextBrowser.getContextNames(2).then(function(thirdLevelNames) {
                                                                            expect(firstLevelNames).toContain('Sandy Bridges');
                                                                            expect(secondLevelNames).toContain('Foo');
                                                                            expect(thirdLevelNames).toContain('Lastone');
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

    //14.3_1279_5
    //14.3_1279_6
    //14.3_1279_7
    it('the breadcrumbs in the context browser are displayed correctly and perform as expected when clicked', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.getContextNames(0).then(function(topLevelNames) {
                    expect(topLevelNames).toContain('Sandy Bridges');
                    contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                        contextBrowser.getContextNames(1).then(function(firstLevelNames) {
                            contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                expect(firstLevelNames).toContain('Foo');
                                expect(breadcrumbs).toEqual(['Sandy Bridges > ']);
                                contextBrowser.browseByContextNames(['Barr']).then(function() {
                                    contextBrowser.getContextNames(2).then(function(secondLevelNames) {
                                        contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                            expect(secondLevelNames).toContain('I Have More!');
                                            expect(breadcrumbs).toEqual(['Sandy Bridges > ', 'Barr > ']);
                                            contextBrowser.browseByContextNames(['Lots More!']).then(function() {
                                                contextBrowser.getContextNames(2).then(function(thirdLevelNames) {
                                                    contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                                        expect(thirdLevelNames).toContain('Lastonehere');
                                                        expect(breadcrumbs).toEqual(['Sandy Bridges > ', 'Barr > ', 'Lots More! > ']);
                                                        contextBrowser.browseByContextNames(['Foo']).then(function() { // backward navigation
                                                            contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                                                expect(breadcrumbs).toEqual(['Sandy Bridges > ', 'Foo > ']);
                                                                contextBrowser.browseByContextNames(['Barr', 'I Have More!', 'nothing']).then(function() {
                                                                    contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                                                        expect(breadcrumbs).toEqual(['Barr > ', 'I Have More! > ', 'nothing > ']);
                                                                        contextBrowser.clickBreadcrumb('I Have More!').then(function() {
                                                                            contextBrowser.getContextNames(1).then(function(firstLevelNames) {
                                                                                contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                                                                    expect(firstLevelNames).toContain('I Have More!');
                                                                                    expect(breadcrumbs).toEqual(['Sandy Bridges > ', 'Barr > ', 'I Have More! > ']);
                                                                                    contextBrowser.clickBreadcrumb('Sandy Bridges').then(function() {
                                                                                        contextBrowser.getContextNames(0).then(function(firstLevelNames) {
                                                                                            contextBrowser.getCbBreadcrumbs().then(function(breadcrumbs) {
                                                                                                expect(firstLevelNames).toContain('Sandy Bridges');
                                                                                                expect(breadcrumbs).toEqual(['Sandy Bridges > ']);
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
            });
        });
    });

    //14.5_1279_1
    it('shows the Open button when a context on the left pane that is openable is selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                    expect(contextBrowser.isOpenContextDisplayed()).toBe(true);
                });
            });
        });
    });

    //14.3_1279_3
    it('does not show the Open button when a context on the left pane that is not openable is selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Nothing Below Me']).then(function() {
                    expect(contextBrowser.isOpenContextDisplayed()).toBe(false);
                });
            });
        });
    });

    //14.5_1279_1
    it('shows the Open button when a context on the middle pane that is openable is selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Foo']).then(function() {
                    expect(contextBrowser.isOpenContextDisplayed()).toBe(true);
                });
            });
        });
    });

    //14.3_1279_3
    it('does not show the Open button when a context on the middle pane that is not openable is selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr']).then(function() {
                    expect(contextBrowser.isOpenContextDisplayed()).toBe(false);
                });
            });
        });
    });

    //14.3_1715_1
    it('ellipsis not shown with 3 selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'I Have More!']).then(function() {
                    contextBrowser.isCbEllipsisShown().then(function(isShown) {
                        expect(isShown).toBe(false);
                    });
                });
            });
        });
    });

    //14.3_1715_2
    it('ellipsis is shown with 4 selected', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Barr', 'I Have More!', 'nothing']).then(function() {
                    contextBrowser.isCbEllipsisShown().then(function(isShown) {
                        expect(isShown).toBe(true);
                    });
                });
            });
        });
    });

    //14.3_1279_2
    it('can open a context that is openable in the left pane', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        expect(contextSelector.getContextName()).toBe('Sandy Bridges');
                    });
                });
            });
        });
    });

    //14.3_1279_2
    it('can open a context that is openable in the middle pane', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Sandy Bridges', 'Foo']).then(function() {
                    contextBrowser.clickOpenContext().then(function() {
                        expect(contextSelector.getContextName()).toBe('Foo');
                    });
                });
            });
        });
    });

    it('shows the text "This context has no children" in the left pane when it has no children in it.', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Mustang', 'Wheels', 'Thisisit not openable']).then(function() {
                    expect(contextBrowser.getTextInPaneAtIndex(2)).toContain('This context has no children.');
                });
            });
        });
    });

    it('shows the text "This context has no children" in the middle pane when it has no children in it.', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Nothing Below Me']).then(function() {
                    expect(contextBrowser.getTextInPaneAtIndex(1)).toContain('This context has no children.');
                });
            });
        });
    });

    it('does not show the text "This context has no children" in a pane when it has children in it.', function() {
        contextSelector.toggleContextBrowser().then(function() {
            contextBrowser.resetToFirstLevel().then(function() {
                contextBrowser.browseByContextNames(['Mustang']).then(function() {
                    expect(contextBrowser.getTextInPaneAtIndex(1)).not.toContain('This context has no children.');
                })
            })
        })
    });
});