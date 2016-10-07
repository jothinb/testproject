define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.factory('DashboardAlertService', function() {

        // alerts need to be an object { msg: 'My Alert Text Here' }
        // so that the ng-repeat will work with multiple alerts with the same text (ex: Widget rendering error.)
        var alerts = [];

        return {
            getAlerts: function() {
                return alerts;
            },
            addAlert: function(alert) {
                alerts.push(alert);
            },
            clearAlerts: function() {
                alerts = [];
            }
        };

    });
});