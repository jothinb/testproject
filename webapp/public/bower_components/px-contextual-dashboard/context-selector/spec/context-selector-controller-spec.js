define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {

    var ContextSelectorController;
    var CurrentStateService;
    var EditModeService;

    describe('The ContextSelectorController', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function ($controller, _CurrentStateService_, _EditModeService_) {
            ContextSelectorController = $controller('ContextSelectorController');
            CurrentStateService = _CurrentStateService_;
            EditModeService = _EditModeService_;
        }));

        it('defers to the CurrentStateService for hasContext', function() {
            spyOn(CurrentStateService, 'hasContext');
            ContextSelectorController.hasContext();
            expect(CurrentStateService.hasContext).toHaveBeenCalled();
        });

        it('defers to the CurrentStateService for getContextName ' +
            'if a context is set', function() {
            spyOn(CurrentStateService, 'hasContext').andReturn(true);
            spyOn(CurrentStateService, 'getContextName');
            ContextSelectorController.getContextName();
            expect(CurrentStateService.getContextName).toHaveBeenCalled();
        });

        it('returns a default message if there is no context set', function() {
            var name = ContextSelectorController.getContextName();
            expect(name).toEqual('dashboard.context.none');
        });

        it('isEnabled returns true if NOT in edit mode', function() {
            spyOn(EditModeService, 'isInEditMode').andReturn(false);
            expect(ContextSelectorController.isEnabled()).toBe(true);
        });

        it('isEnabled returns false if in edit mode', function() {
            spyOn(EditModeService, 'isInEditMode').andReturn(true);
            expect(ContextSelectorController.isEnabled()).toBe(false);
        });

        describe('when getting the list of breadcrumbs', function() {

            describe('when there are more than 3 breadcrumbs', function() {

                beforeEach(function() {
                    var mockBreadcrumbs = [0, 1, 2, 3, 4, 5];
                    spyOn(CurrentStateService, 'getBreadcrumbs').andReturn(mockBreadcrumbs);
                });

                it('limits the breadcrumbs shown to the last 3', function() {
                    expect(ContextSelectorController.getBreadcrumbs()).toEqual([3, 4, 5]);
                });

                it('will show the ellipsis', function() {
                    expect(ContextSelectorController.shouldShowBreadcrumbEllipsis()).toBe(true);
                });
            });

            describe('when there are 3 breadcrumbs', function() {

                beforeEach(function() {
                    var mockBreadcrumbs = [0, 1, 2];
                    spyOn(CurrentStateService, 'getBreadcrumbs').andReturn(mockBreadcrumbs);
                });

                it('will show all the breadcrumbs', function() {
                    expect(ContextSelectorController.getBreadcrumbs()).toEqual([0, 1, 2]);
                });

                it('will not show the ellipsis', function() {
                    expect(ContextSelectorController.shouldShowBreadcrumbEllipsis()).toBe(false);
                });
            });

            describe('when there are 2 breadcrumbs', function() {

                beforeEach(function() {
                    var mockBreadcrumbs = [0, 1];
                    spyOn(CurrentStateService, 'getBreadcrumbs').andReturn(mockBreadcrumbs);
                });

                it('will show all the breadcrumbs', function() {
                    expect(ContextSelectorController.getBreadcrumbs()).toEqual([0, 1]);
                });

                it('will not show the ellipsis', function() {
                    expect(ContextSelectorController.shouldShowBreadcrumbEllipsis()).toBe(false);
                });
            });

            describe('when there is 1 breadcrumbs', function() {
                beforeEach(function() {
                    var mockBreadcrumbs = [0];
                    spyOn(CurrentStateService, 'getBreadcrumbs').andReturn(mockBreadcrumbs);
                });

                it('will show the one breadcrumb', function() {
                    expect(ContextSelectorController.getBreadcrumbs()).toEqual([0]);
                });

                it('will not show the ellipsis', function() {
                    expect(ContextSelectorController.shouldShowBreadcrumbEllipsis()).toBe(false);
                });
            });

            describe('when there are no breadcrumbs', function() {
                beforeEach(function() {
                    var mockBreadcrumbs = [];
                    spyOn(CurrentStateService, 'getBreadcrumbs').andReturn(mockBreadcrumbs);
                });

                it('will show no breadcrumbs', function() {
                    expect(ContextSelectorController.getBreadcrumbs()).toEqual([]);
                });

                it('will not show the ellipsis', function() {
                    expect(ContextSelectorController.shouldShowBreadcrumbEllipsis()).toBe(false);
                });
            });

            it('defers to the CurrentStateService for getBreadcrumbs', function() {
                spyOn(CurrentStateService, 'getBreadcrumbs').andReturn([]);

                ContextSelectorController.getBreadcrumbs();

                expect(CurrentStateService.getBreadcrumbs).toHaveBeenCalled();
            });
        });
    });
});