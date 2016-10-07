/**
 * Created by 212359747 on 5/26/15.
 */
define(['angular','controllers-module', 'vruntime'], function (angular, controllers){
    'use strict';

//    controllers.controller('containerAccordionCtrl', ['$scope', '$rootScope', '$http', '$modalInstance','$log', function ($scope, $rootScope, $http, $modalInstance, $log) {
    controllers.controller('ContainerAccordionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Dynamic Group Header - 1',
                content: 'Dynamic Group Body - 1'
            },
            {
                title: 'Dynamic Group Header - 2',
                content: 'Dynamic Group Body - 2'
            }
        ];

//        console.log('$rootScope.unitData: '+$rootScope.unitData);

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
            console.log('$rootScope.unitData::::::'+$scope.unitData[1].x);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

//        $scope.init1 = function () {
//            $scope.unitData = $rootScope.unitData;
//        };

//        $scope.init();
    }]);
});
