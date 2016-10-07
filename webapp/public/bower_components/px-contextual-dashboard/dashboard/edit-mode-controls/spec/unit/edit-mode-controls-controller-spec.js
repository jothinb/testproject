define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    var EditModeControlsController, CurrentStateService, ViewCreatorService;
    var EditModeService, q, rootScope;

    describe('The EditModeControlsController', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function($controller, _CurrentStateService_, _ViewCreatorService_, _EditModeService_, $q, $rootScope) {
            CurrentStateService = _CurrentStateService_;
            ViewCreatorService = _ViewCreatorService_;
            EditModeService = _EditModeService_;
            q = $q;
            rootScope = $rootScope;
            EditModeControlsController = $controller('EditModeControlsController');
        }));
        beforeEach(function() {
            CurrentStateService.setView(mockObjects.context.views[0]);
        });

        it('knows if the page is in edit mode', function() {
            expect(typeof EditModeControlsController.isInEditMode()).toBe('boolean');
        });

        it('can enter edit mode', function() {
            var isInEditMode = EditModeControlsController.isInEditMode();
            EditModeControlsController.enterEditMode();
            expect(EditModeControlsController.isInEditMode()).toBe(!isInEditMode);
        });

        describe('when deciding to display or not', function() {
            it('will display if the dashboard has a context and a view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(true);
                spyOn(CurrentStateService, 'hasView').andReturn(true);

                expect(EditModeControlsController.isDisplayed()).toBe(true);
            });

            it('will not display if the dashboard has a context and no view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(true);
                spyOn(CurrentStateService, 'hasView').andReturn(false);

                expect(EditModeControlsController.isDisplayed()).toBe(false);
            });

            it('will not display if the dashboard has no context and a view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(false);
                spyOn(CurrentStateService, 'hasView').andReturn(true);

                expect(EditModeControlsController.isDisplayed()).toBe(false);
            });

            it('will not display if the dashboard has no context and no view', function() {
                spyOn(CurrentStateService, 'hasContext').andReturn(false);
                spyOn(CurrentStateService, 'hasView').andReturn(false);

                expect(EditModeControlsController.isDisplayed()).toBe(false);
            });
        });

        it('doesn\'t display the edit mode controls if there is no selected context', function() {
            expect(EditModeControlsController.isDisplayed()).toBe(false);
        });

        it('does display the edit mode controls if there is a selected context', function() {
            CurrentStateService.setContext(mockObjects.context);
            expect(EditModeControlsController.isDisplayed()).toBe(true);
        });

        it('can open the edit view dialog', function() {
            spyOn(ViewCreatorService, 'openViewCreatorWithModel');
            CurrentStateService.setView(mockObjects.viewDefinition);
            EditModeControlsController.enterEditMode();
            EditModeControlsController.openViewEditor();
            expect(ViewCreatorService.openViewCreatorWithModel).toHaveBeenCalled();
            expect(ViewCreatorService.openViewCreatorWithModel.mostRecentCall.args[0].viewName).toEqual(mockObjects.viewDefinition.name);
        });
    });

    describe('it can toggle saving view indicator', function() {
        var deferred;
        beforeEach(function() {
            deferred = q.defer();
            spyOn(EditModeService,'saveChanges').andReturn(deferred.promise);
            EditModeControlsController.saveChanges();
        });

        it('can set isSavingView to true when saving view', function() {
            expect(EditModeControlsController.isSavingView).toBe(true);
        });

        it('can set isSavingView to false when saving view promise is resolved', function() {
            deferred.resolve();
            rootScope.$apply();
            expect(EditModeControlsController.isSavingView).toBe(false);
        });

        it('can set isSavingView to false when saving view promise is rejected', function() {
            deferred.reject();
            rootScope.$apply();
            expect(EditModeControlsController.isSavingView).toBe(false);
        });

    });
});