define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.controller('DashboardAlertController', function(DashboardAlertService) {

        this.getAlerts = function() {
            return DashboardAlertService.getAlerts();
        };

        this.close = function() {
            DashboardAlertService.clearAlerts();
        };
    });
});