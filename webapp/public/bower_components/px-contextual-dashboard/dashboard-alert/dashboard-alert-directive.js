define(['angular', '../module','text!./dashboard-alert-template.html'], function(angular, module, template) {
    'use strict';

    module.directive('dashboardAlert', function() {
        return {
            restrict: 'E',
            controller: 'DashboardAlertController',
            controllerAs: 'dashboardAlertController',
            template: template
        };
    });

    return module;
});