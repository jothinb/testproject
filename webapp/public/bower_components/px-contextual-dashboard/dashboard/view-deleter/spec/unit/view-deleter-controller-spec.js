define(['bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular', 'angular-mocks'], function(mockObjects) {
    describe('The ViewDeleterController', function() {
        var ViewDeleterController, EditModeService, q, rootScope;
        var viewName = "ViewName";

        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function($controller, _EditModeService_, $q, $rootScope) {
            q = $q;
            rootScope = $rootScope;
            EditModeService = _EditModeService_;
            ViewDeleterController = $controller('ViewDeleterController', {
                EditModeService: _EditModeService_
            });

        }));

        describe('deleting a view', function() {
            var deferred;
            beforeEach(function() {
                deferred = q.defer();
                spyOn(EditModeService.removeCurrentViewFromContext).andReturn(deferred.promise);
                ViewDeleterController.deleteView();

                it('Should invoke EditModeService.removeCurrentViewFromContext', function() {
                    expect(EditModeService.removeCurrentViewFromContext).toHaveBeenCalled();
                });

                it('Should invoke EditModeService.getViewName', function() {
                    var deleteViewName = ViewDeleterController.getViewName();
                    expect(EditModeService.getViewName).toHaveBeenCalled();
                    expect(deleteViewName).toEqual(viewName);
                });

            });

        });
    });
});

