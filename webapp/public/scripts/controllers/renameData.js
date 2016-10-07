/**
 * Created by 212362824 on 3/27/15.
 */

define(['angular', 'controllers-module', 'vruntime'], function (angular, controllers) {
    'use strict';

    controllers.controller('renameDataCtrl', ['$scope', '$rootScope', '$http', '$modalInstance', 'dataId', function ($scope, $rootScope, $http, $modalInstance, dataId) {

        $scope.dataset = {};
        $scope.error = {};
        $scope.dataset.id = dataId;

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

        $scope.validateNewName = function (name) {
            if(name !='') {
                $scope.error.missingName = false;
            }else {
                $scope.error.missingName = true;
            }
        };

        $scope.updateName = function () {
            console.log($scope.dataset);
            if($scope.dataset.updatedName === undefined || $scope.dataset.updatedName === '') {
                $scope.error.missingName = true;
            }else {
                $scope.error = {};
                var updatedDataSet = {
                    "dataSetId" : $scope.dataset.id,
                    "dataSetName": $scope.dataset.updatedName
                };
                $http.post('api/v2/ingestion/rename', updatedDataSet)
                    .success(function (response) {
                        $modalInstance.close(response);
                    })
                    .error(function () {
                        $modalInstance.dismiss('error');
                    });
            }
        };

    }]);
});
