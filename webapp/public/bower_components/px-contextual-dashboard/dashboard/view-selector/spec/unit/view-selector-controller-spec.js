define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    var ViewSelectorController;
    var CurrentStateService;
    var EditModeService;

    describe('The ViewSelectorController', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function($controller, _CurrentStateService_, _EditModeService_) {
            ViewSelectorController = $controller('ViewSelectorController');
            CurrentStateService = _CurrentStateService_;
            EditModeService = _EditModeService_;
        }));

        describe('while not in edit mode', function() {
            it('can get the current view\'s name', function() {
                ViewSelectorController.selectView(mockObjects.context.views[0]);
                expect(ViewSelectorController.getCurrentViewName()).toBe(mockObjects.context.views[0].name);
            });

            it('enables the view dropdown list when the dashboard is not in edit mode', function() {
                expect(ViewSelectorController.isDisabled()).toBeFalsy();
            });

            it('can set the current view of the dashboard', function() {
                ViewSelectorController.selectView(mockObjects.context.views[0]);
                expect(CurrentStateService.getView()).toEqual(mockObjects.context.views[0]);
            });
        });

        describe('while in edit mode', function() {
            beforeEach(function() {
                ViewSelectorController.selectView(mockObjects.context.views[0]);
                EditModeService.enterEditMode();
            });

            it('can get the current view\'s name after its been changed', function() {
                EditModeService.setViewName('changed');
                expect(ViewSelectorController.getCurrentViewName()).toBe('changed');
            });

            it('disables the view dropdown list when the dashboard is in edit mode', function() {
                expect(ViewSelectorController.isDisabled()).toBeTruthy();
            });
        });

        it('can get the list of view\'s for the current context', function() {
            CurrentStateService.setContext(mockObjects.context);
            expect(ViewSelectorController.getViewList()).toEqual(mockObjects.context.views);
        });

        it('enables the view dropdown list when the dashboard is not in edit mode', function() {
            expect(ViewSelectorController.isDisabled()).toBeFalsy();
        });

        it('disables the view dropdown list when the dashboard is in edit mode', function() {
            CurrentStateService.setView(mockObjects.context.views[0]);
            EditModeService.enterEditMode();
            expect(ViewSelectorController.isDisabled()).toBeTruthy();
        });

        describe('deciding if it should be displayed', function() {
            it('will display if the dashboard has a context and a view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(true);
                spyOn(CurrentStateService, 'hasView').andReturn(true);

                expect(ViewSelectorController.isDisplayed()).toBe(true);
            });

            it('will not display if the dashboard has a context and no view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(false);
                spyOn(CurrentStateService, 'hasView').andReturn(true);

                expect(ViewSelectorController.isDisplayed()).toBe(false);
            });

            it('will not display if the dashboard has no context and a view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(true);
                spyOn(CurrentStateService, 'hasView').andReturn(false);

                expect(ViewSelectorController.isDisplayed()).toBe(false);
            });

            it('will not display if the dashboard has no context and no view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(false);
                spyOn(CurrentStateService, 'hasView').andReturn(false);

                expect(ViewSelectorController.isDisplayed()).toBe(false);
            });
        });
    });
});