/* jshint unused: false */
define(['angular','directives-module', 'text!./yard-main-dir.html'], function (angular, directives, viTmpl) {
    'use strict';
    return directives.directive('resultsPane', function () {
        return {
            restrict: 'E',
            replace: false,
            template: viTmpl,
            link: function(){
            },
            controller: function($scope, $rootScope, $timeout){
                $scope.isSmallCard = true;
                $rootScope.focusedContainer = null;

                $scope.focusContainer = function ($event, unit) {

                    $event.preventDefault();
                    $event.stopPropagation();

		    if ($scope.trainContainers) {
                    	$scope.trainContainers = null;
                    	$scope.searchType = '';
                    }

                    if($rootScope.focusedContainer) {
                        $rootScope.focusedContainer.selected = false;
                    }
                    if(unit) {
                        unit.selected = true;
                        $scope.smallCardInfo = '';
                        $scope.selectContainerOnSearch(unit.unitNbr);
                    } else {
                        $scope.selectContainerByUnitNbr(null);
                    }
                    $rootScope.focusedContainer = unit;
                };

                $scope.$on('focusing', function ($event, item) {
                    if(item) {
                        $scope.selectContainerByUnitNbr(item.unitNbr);
                    }else {
                        $scope.selectContainerByUnitNbr(null);
                    }

                });

                $scope.dismissResults = function($event) {
                    $event.preventDefault();
                    $scope.focusContainer($event, null);
                    $scope.filteredResult = null;
                    $scope.selected = '';
                    $scope.searchType = '';
                };

            }
        };
    });
});
