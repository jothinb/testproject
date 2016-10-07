define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.factory('ViewCreatorService', function($q, EditModeService) {
        var modalId = '#view-creator';
        var isEditing = false;

        function getModalInstance() {
            return angular.element(modalId);
        }

        function openViewCreator() {
            isEditing = false;

            showModal();
        }

        /*
         * model is an object with one property called `viewName`
         */
        function openViewCreatorWithModel(model) {
            isEditing = true;

            var ViewCreatorController = angular.element(modalId).controller('viewCreator');
            ViewCreatorController.setFieldsFromModel(model);

            showModal();
        }

        function showModal() {
            angular.element(modalId).modal('show');
        }

        function hideModal() {
            angular.element(modalId).modal('hide');
        }

        function isEditingView() {
            return isEditing;
        }

        function createViewWithName(name) {
            var deferred = $q.defer();
            EditModeService.addView(name).then(function() {
                hideModal();
                deferred.resolve();
            }, function() {
                hideModal();
                deferred.reject();
            });
            return deferred.promise;
        }

        function changeViewNameTo(name) {
            EditModeService.setViewName(name);
            hideModal();
            isEditing = false;
        }

        return {
            getModalInstance: getModalInstance,
            openViewCreator: openViewCreator,
            openViewCreatorWithModel: openViewCreatorWithModel,
            isEditingView: isEditingView,
            createViewWithName: createViewWithName,
            changeViewNameTo: changeViewNameTo
        };
    });
});