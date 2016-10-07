define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects','angular-mocks'], function(angular, mockObjects) {
    var CurrentStateService;
    var context = mockObjects.context;
    
    describe('The CurrentStateService', function() {
        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_CurrentStateService_) {
            CurrentStateService = _CurrentStateService_;
        }));

        describe('for not having a set context', function() {
            it('knows no context has been set', function() {
                expect(CurrentStateService.hasContext()).toBeFalsy();
            });

            it('returns an empty array for the list of context views', function() {
                expect(CurrentStateService.getViewList()).toEqual([]);
            });

            it('returns an empty array for the list of context datasources', function() {
                expect(CurrentStateService.getDatasources()).toEqual([]);
            });

            it('returns null for the current context\'s name', function() {
                expect(CurrentStateService.getContextName()).toBeNull();
            });

            it('returns an empty array for the breadcrumbs', function() {
                expect(CurrentStateService.getBreadcrumbs()).toEqual([]);
            });

            it('returns an empty array for widgets', function() {
                expect(CurrentStateService.getWidgetList()).toEqual([]);
            });
           
        });

        describe('for having the context set to null', function() {
            beforeEach(function() {
                CurrentStateService.setContext(null);
            });

            it('knows no context has been set', function() {
                expect(CurrentStateService.hasContext()).toBeFalsy();
            });

            it('returns an empty array for the list of context views', function() {
                expect(CurrentStateService.getViewList()).toEqual([]);
            });

            it('returns an empty array for the list of context datasources', function() {
                expect(CurrentStateService.getDatasources()).toEqual([]);
            });

            it('returns null for the current context\'s name', function() {
                expect(CurrentStateService.getContextName()).toBeNull();
            });

            it('returns an empty array for the breadcrumbs', function() {
                expect(CurrentStateService.getBreadcrumbs()).toEqual([]);
            });

            it('returns an empty array for widgets', function() {
                expect(CurrentStateService.getWidgetList()).toEqual([]);
            });

        });

        describe('for a set context and breadcrumbs', function() {
            beforeEach(function() {
                CurrentStateService.setContext(mockObjects.context);
                CurrentStateService.setBreadcrumbs(['a','b']);
            });

            it('knows if a context has been set', function() {
                expect(CurrentStateService.hasContext()).toBeTruthy();
            });

            it('can get a list of the current context\'s views', function() {
                expect(CurrentStateService.getViewList()).toBe(mockObjects.context.views);
            });

            it('can get a list of the current context\'s datasources', function() {
                expect(CurrentStateService.getDatasources()).toBe(mockObjects.context.datasources);
            });

            it('returns the current context\'s name', function() {
                expect(CurrentStateService.getContextName()).toBe("first context");
            });

            it('returns the current context\'s breadcrumbs', function() {
                expect(CurrentStateService.getBreadcrumbs()).toEqual(['a','b']);
            });
        });

        describe('for a set view', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[1]);
            });

            it('can set the current widgets', function() {
                expect(CurrentStateService.getWidgetList().length).toBe(2);
                expect(CurrentStateService.getWidgetList()[0].cardId).toBe('v-hello-world');
                expect(CurrentStateService.getWidgetList()[1].cardId).toBe('v-simplest-directive');
            });

            it('returns an array of widgets', function() {
                expect(CurrentStateService.getWidgetList()).toEqual(mockObjects.context.views[1].cards);
            });
        });

        it('can set the view to none', function() {
            CurrentStateService.setViewToNone();
            expect(CurrentStateService.hasView()).toBe(false);
        });
    });
});