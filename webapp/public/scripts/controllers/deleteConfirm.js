/**
 * Created by 212362824 on 3/27/15.
 */

define(['angular', 'controllers-module', 'vruntime'], function (angular, controllers) {
    'use strict';

    controllers.controller('deleteCtrl', ['$scope', '$rootScope', '$http', '$modalInstance', 'dataId', function ($scope, $rootScope, $http, $modalInstance, dataId) {

        $scope.isClicked = false;

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.confirmDelete = function () {
            $scope.isClicked = true;
            var dataSetId = {"dataSetId": dataId};
            $http.post('api/v2/ingestion/delete', dataSetId)
                .success(function (response) {
                    $modalInstance.close(response);
                })
                .error(function () {
                    $modalInstance.dismiss('error');
                });
        };

    }]);
});
