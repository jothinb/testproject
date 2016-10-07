define(['angular', 'angular-mocks'], function(angular) {
    describe('The DashboardAlertService', function() {
        var DashboardAlertService;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_DashboardAlertService_) {
            DashboardAlertService = _DashboardAlertService_;
        }));

        it('starts with no alerts', function(){
            expect(DashboardAlertService.getAlerts()).toEqual([]);
        });

        it('can add alerts', function(){
            DashboardAlertService.addAlert('a');
            expect(DashboardAlertService.getAlerts()).toEqual(['a']);
            DashboardAlertService.addAlert('b');
            expect(DashboardAlertService.getAlerts()).toEqual(['a','b']);
            DashboardAlertService.addAlert('c');
            expect(DashboardAlertService.getAlerts()).toEqual(['a','b','c']);
        });

        it('can clear alerts', function(){
            DashboardAlertService.addAlert('a');
            DashboardAlertService.addAlert('b');
            expect(DashboardAlertService.getAlerts()).toEqual(['a','b']);
            DashboardAlertService.clearAlerts();
            expect(DashboardAlertService.getAlerts()).toEqual([]);
        });
    });
});