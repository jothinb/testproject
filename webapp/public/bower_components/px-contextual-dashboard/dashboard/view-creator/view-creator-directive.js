define(['angular', '../../module', 'text!./view-creator-template.html', 'bootstrap-modal', 'bootstrap-transition'], function(angular, module, template) {
    'use strict';

    module.directive('viewCreator', function() {
        return {
            restrict: 'AE',
            scope: true,
            controller: 'ViewCreatorController',
            controllerAs: 'viewCreator',
            template: template
        };
    });
});