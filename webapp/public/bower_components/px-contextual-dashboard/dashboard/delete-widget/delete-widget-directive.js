define(['angular', '../../module', 'text!./delete-widget-template.html', 'bootstrap-modal', 'bootstrap-transition'], function(angular, module, template) {
    'use strict';

    module.directive('deleteWidget', function(){
        return {
            restrict: 'AE',
            scope: true,
            controller: ['$scope', 'DeleteWidgetService', function($scope, DeleteWidgetService){
                $scope.delete = function(){
                    DeleteWidgetService.deleteWidget();
                };
            }],
            template: template,
            link: function(scope, element, attr, alertController){}
        };
    });
});