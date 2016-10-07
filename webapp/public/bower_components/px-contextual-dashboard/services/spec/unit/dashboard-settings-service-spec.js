define(['angular', 'angular-mocks', 'vruntime'], function(angular, undefined, vRuntime) {
    describe('The Dashboard Setting Service', function() {
        var ContextBrowserService, ViewService, DatasourceService, WidgetService;
        //TODO: Remove it when we can confirm we do not need it
        //I did not remove it now just in case it could come back
        xdescribe('When customize dashboard appId setting', function() {

            beforeEach(function() {
                angular.module('testModule', ['predix.configurable-dashboard'])
                    .config(function(DashboardSettingsServiceProvider) {
                        DashboardSettingsServiceProvider.setAppId("TestAppId");
                    });

                module('testModule');
            });

            beforeEach(inject(function(_ViewService_, _DatasourceService_, _WidgetService_) {
                ViewService = _ViewService_;
                DatasourceService = _DatasourceService_;
                WidgetService = _WidgetService_;
            }));

            it('appId is in Widget Instance', function() {
                expect(WidgetService.buildWidgetInstance({id: 1, name: "", type: ""}, {}, {id: 2, name: "", type: ""}, {selectedSize: 'full'}).appId).toBe("TestAppId");
            });

            it('appId is in View Instance', function() {
                expect(ViewService.buildViewInstance("testView").appId).toBe("TestAppId");
            });
        });

        describe('When customize dashboard network security protocol setting', function() {

            describe('using non-secure network', function() {
                beforeEach(function() {
                    angular.module('testModule', ['predix.configurable-dashboard'])
                        .config(function(DashboardSettingsServiceProvider) {
                            DashboardSettingsServiceProvider.enableSecureNetworkProtocol(false);
                        });

                    module('testModule');
                });

                beforeEach(inject(function(_ContextBrowserService_, _DatasourceService_, _ViewService_) {
                    ContextBrowserService = _ContextBrowserService_;
                    DatasourceService = _DatasourceService_;
                    ViewService = _ViewService_;
                }));

                beforeEach(function() {
                    clearAjaxRequests();
                    jasmine.Ajax.useMock();
                });

                it('will fetch context in http', function() {
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 7)).toEqual("http://");
                });

                it('will fetch datasource in http', function() {
                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 7)).toEqual("http://");
                });

                it('will view in http', function() {
                    ViewService.getViewsByContextId(1);
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 7)).toEqual("http://");
                });

            });

            describe('using secure network', function() {

                beforeEach(function() {
                    angular.module('testModule2', ['predix.configurable-dashboard'])
                        .config(function(DashboardSettingsServiceProvider) {
                            DashboardSettingsServiceProvider.enableSecureNetworkProtocol(true);
                        });

                    module('testModule2');
                });

                beforeEach(inject(function(_ContextBrowserService_, _DatasourceService_, _ViewService_) {
                    ContextBrowserService = _ContextBrowserService_;
                    DatasourceService = _DatasourceService_;
                    ViewService = _ViewService_;
                }));

                beforeEach(function() {
                    clearAjaxRequests();
                    jasmine.Ajax.useMock();
                });

                it('will fetch context in https', function() {
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 8)).toEqual("https://");
                });

                it('will fetch datasource in https', function() {
                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 8)).toEqual("https://");
                });

                it('will view in https', function() {
                    ViewService.getViewsByContextId(1);
                    request = mostRecentAjaxRequest();
                    expect(request.requestHeaders['Service-End-Point'].substring(0, 8)).toEqual("https://");
                });

            });


        });
    });
});