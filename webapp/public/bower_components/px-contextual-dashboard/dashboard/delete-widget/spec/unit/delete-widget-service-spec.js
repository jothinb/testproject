define(['angular', 'angular-mocks'], function(angular) {
    'use strict';

    describe('The DeleteWidgetService', function() {
        var DeleteWidgetService;
        var EditModeService;
        
        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function($injector) {
            DeleteWidgetService = $injector.get('DeleteWidgetService');
            EditModeService = $injector.get('EditModeService');

            setFixtures(sandbox({
                id: 'test-container'
            }));

            var $testContainer = $("#test-container");
            $testContainer.append('<div id="mydiv"><delete-widget  id="delete-widget" class="modal fade"><div class="modal-dialog"></div></delete-widget></div>');
            
            spyOn(EditModeService,'deleteWidget');
        }));

        describe('should contains', function(){
            it('getModalInstance', function(){
                expect(typeof DeleteWidgetService.modalInstance === "function").toBeDefined();
            });

            it('getModalInstance should return modalInstance', function(){
                expect(DeleteWidgetService.getModalInstance().modal).toBeDefined();
            });

            it('showModal method', function(){
                expect(typeof DeleteWidgetService.showModal === "function").toBe(true);
            });

            it('hideModal method', function(){
                expect(typeof DeleteWidgetService.hideModal === "function").toBe(true);
            });

            it('getWidgetIndex', function(){
                expect(typeof DeleteWidgetService.getWidgetIndex === "function").toBe(true);
                DeleteWidgetService.showModal(1);
                expect(DeleteWidgetService.getWidgetIndex()).toEqual(1);
            });

            it('deleteWidget', function(){
                DeleteWidgetService.showModal(1);
                DeleteWidgetService.deleteWidget();
                expect(EditModeService.deleteWidget).toHaveBeenCalledWith(1);
            });
        });

        describe('should able show / hide modal', function(){
            beforeEach(function(){
                spyOn(DeleteWidgetService.getModalInstance(), 'modal');
            });

            describe('when showModal is called', function() {

                beforeEach(function(){
                    DeleteWidgetService.showModal(1);
                });

                it('should set widget index', function(){
                    expect(DeleteWidgetService.getWidgetIndex()).toEqual(1);
                });

                it('delete widget modal dialog will open', function(){
                    expect(DeleteWidgetService.getModalInstance().modal).toHaveBeenCalledWith('show');
                });
            });

            describe('when hideModal is called', function() {
                beforeEach(function(){
                    DeleteWidgetService.hideModal();
                });

                it('modal dialog is called to close', function(){
                    expect(DeleteWidgetService.getModalInstance().modal).toHaveBeenCalledWith('hide');
                });
            });

        });
        
    });
});