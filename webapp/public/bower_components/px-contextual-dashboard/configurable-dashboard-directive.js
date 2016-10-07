define(['angular', './module', 'text!./configurable-dashboard-template.html', 'css!./configurable-dashboard.css'], function(angular, module, template) {
    'use strict';

    module.directive('configurableDashboard', function() {
        return {
            restrict: 'E',
            template: template
        };
    });

    return module;
});