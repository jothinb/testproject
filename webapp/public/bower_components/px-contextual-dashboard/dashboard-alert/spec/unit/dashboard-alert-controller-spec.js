define(['angular', 'angular-mocks'], function() {
    'use strict';

    describe('The DashboardAlertController', function () {
        var DashboardAlertService, DashboardAlertController;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function ($controller, _DashboardAlertService_) {
            DashboardAlertService = _DashboardAlertService_;
            DashboardAlertController = $controller('DashboardAlertController');
        }));

        it('getAlerts returns the service\'s alerts', function () {
            spyOn(DashboardAlertService, 'getAlerts').andReturn(['this alert', 'that alert']);
            var alerts = DashboardAlertController.getAlerts();
            expect(alerts).toEqual(['this alert', 'that alert']);
        });

        it('close clears the service\'s alerts', function () {
            spyOn(DashboardAlertService, 'clearAlerts');
            DashboardAlertController.close();
            expect(DashboardAlertService.clearAlerts).toHaveBeenCalled();
        });
    });

});