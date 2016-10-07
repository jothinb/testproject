/**
 * Created by 212359747 on 5/20/15.
 */

define(['angular','controllers-module', 'vruntime'], function (angular, controllers){
    'use strict';

    controllers.controller('containerModalCtrl', ['$scope', '$rootScope', '$http', '$modalInstance','$log', function ($scope, $rootScope, $http, $modalInstance, $log) {
        $scope.init = function(){

        };
        $scope.data="this is a sample test.";
        $scope.init();
    }]);
});

