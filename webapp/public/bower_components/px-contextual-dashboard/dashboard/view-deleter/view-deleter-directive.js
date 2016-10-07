define(['angular', '../../module', 'text!./view-deleter-template.html'], function(angular, module, template) {
    module.directive('viewDeleter', function() {
        return {
            restrict: 'E',
            scope: true,
            template: template,
            controller: 'ViewDeleterController',
            controllerAs: 'viewDeleter'
        };
    });
});