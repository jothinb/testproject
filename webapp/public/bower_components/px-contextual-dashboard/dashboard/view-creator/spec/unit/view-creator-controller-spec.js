define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    'use strict';

    describe('The ViewCreatorController', function() {
        var controller, rootScope, scope, ViewCreatorService, CurrentStateService, q;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function($controller, $q, $rootScope, _ViewCreatorService_, _CurrentStateService_) {
            rootScope = $rootScope;
            scope = new $rootScope.$new();
            scope.addView = {
                $valid: true
            };
            q = $q;
            ViewCreatorService = _ViewCreatorService_;
            CurrentStateService = _CurrentStateService_;

            controller = $controller('ViewCreatorController', {
                $scope: scope,
                ViewCreatorService: ViewCreatorService
            });
            CurrentStateService.setContext(mockObjects.context);

        }));

        it('can clear its input fields', function() {
            controller.viewName = mockObjects.viewDefinition.name;

            controller.clearInputs();

            expect(controller.viewName).toBe('');
        });

        describe('opened to create a view', function() {
            beforeEach(function() {
                spyOn(ViewCreatorService, 'isEditingView').andReturn(false);
                spyOn(ViewCreatorService, 'createViewWithName').andCallFake(function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                });
            });

            it('defers to the ViewCreatorService\'s createViewWithName method and clears viewName after save', function() {
                controller.viewName = 'my view';
                controller.save();
                expect(controller.isViewUpdating).toBe(true);
                rootScope.$apply();
                expect(ViewCreatorService.createViewWithName).toHaveBeenCalledWith('my view');
                expect(controller.isViewUpdating).toBe(false);
                expect(controller.viewName).toEqual('');
            });
        });

        describe('opened to edit a view', function() {
            beforeEach(function() {
                controller.setFieldsFromModel({
                    viewName: 'my name'
                });

                spyOn(ViewCreatorService, 'isEditingView').andReturn(true);
                spyOn(ViewCreatorService, 'changeViewNameTo');
            });

            it('sets its input field to the given model', function() {
                expect(controller.viewName).toBe('my name');
            });

            it('updates that view\'s name on save and clears viewName after save', function() {
                controller.save();

                expect(ViewCreatorService.changeViewNameTo).toHaveBeenCalledWith('my name');
                expect(controller.viewName).toEqual('');
            });
        });
    });
});