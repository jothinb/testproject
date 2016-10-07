/**
 * Created by 212362824 on 3/27/15.
 */

define(['angular', 'controllers-module', 'vruntime'], function (angular, controllers) {
    'use strict';

    controllers.controller('connectionStringCtrl', ['$scope', '$rootScope', '$http', '$modalInstance', 'connectionStr', function ($scope, $rootScope, $http, $modalInstance, connectionStr) {

        $scope.dbConnectionString = connectionStr;

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };

    }]);
});
