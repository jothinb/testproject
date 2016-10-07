define(['angular', 'angular-mocks'], function(angular) {
    'use strict';
    
    var elm, $testContainer, $deleteWidgetModal, DeleteWidgetService;

    describe('The predix delete widget directive', function() {
        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(function() {
          module(function($provide) {
            $provide.value('vmessagesFilter', function(value) {
                return value;
            });
          });
        });

        beforeEach(inject(function($compile, $rootScope, _DeleteWidgetService_) {
            DeleteWidgetService = _DeleteWidgetService_;
            spyOn(DeleteWidgetService,"deleteWidget");
            
            var scope = $rootScope.$new();
            var elm = angular.element('<delete-widget  id="delete-widget" class="modal fade"></delete-widget>');

            setFixtures(sandbox({
                id: 'test-container'
            }));

            $testContainer = $("#test-container");
            $testContainer.append($compile(elm)(scope));
            $deleteWidgetModal = $testContainer.find('#delete-widget');
        }));

        describe('When delete button is clicked', function(){
            beforeEach(function(){
                DeleteWidgetService.showModal(1);
                $deleteWidgetModal.modal('show');                
            });

            //TODO: fix modal open detection
            xit('expect modal is open', function(){
                expect($testContainer.find('#delete-widget').hasClass('in')).toBe(true);
            });

            afterEach(function(){
                $deleteWidgetModal.modal('hide');                
            });
        });

        describe('When cancel button is clicked', function(){
            beforeEach(function(){
                DeleteWidgetService.showModal(1);
                $deleteWidgetModal.modal('show');
                $deleteWidgetModal.find("#delete-widget-cancel-btn").click();
            });

            it('Widget is not delete', function(){
                expect(DeleteWidgetService.deleteWidget).not.toHaveBeenCalled();  
            });

            it('Modal is closed', function(){
                expect($deleteWidgetModal.hasClass('in')).toBe(false);
            });

            afterEach(function(){
                $deleteWidgetModal.modal('hide');                
            });
        });

        describe('When ok button is clicked', function(){
            beforeEach(function(){
                DeleteWidgetService.showModal(1);
                $deleteWidgetModal.modal('show');
                $deleteWidgetModal.find("#delete-widget-ok-btn").click();
            });

            it('Widget is not delete', function(){
                expect(DeleteWidgetService.deleteWidget).toHaveBeenCalled();  
            });

            it('Modal is closed', function(){
                expect($deleteWidgetModal.hasClass('in')).toBe(false);
            });

            afterEach(function(){
                $deleteWidgetModal.modal('hide');                
            });
        });

    });
});