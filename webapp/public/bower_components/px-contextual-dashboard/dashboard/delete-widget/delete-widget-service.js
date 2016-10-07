define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.factory('DeleteWidgetService', function(EditModeService){
        var modalInstance = angular.element('#delete-widget');
        var _widgetIndex = null;
        function getModalInstance(){
            return modalInstance;
        }

        function showModal(index){
            _widgetIndex = index;
            modalInstance.modal('show');
        }

        function hideModal(){
            modalInstance.modal('hide');
        }

        function getWidgetIndex(){
            return _widgetIndex;
        }

        function deleteWidget(){
            EditModeService.deleteWidget(_widgetIndex);
        }

        return {
            getWidgetIndex: getWidgetIndex,
            getModalInstance : getModalInstance,
            deleteWidget: deleteWidget,
            showModal: showModal,
            hideModal: hideModal
        };
    });
});