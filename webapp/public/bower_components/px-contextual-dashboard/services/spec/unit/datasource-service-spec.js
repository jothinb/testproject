define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks', 'vruntime'], function(angular, mockObjects, undefined, vRuntime) {
    describe('The DatasourceService', function() {
        var DatasourceService, q, successCallback, errorCallback, rootScope;
        var mockDefer = {
            resolve: function() {
            },
            reject: function() {
            },
            promise: {}
        };

        var ajaxSuccessResponse = {
            status: 200,
            responseText: JSON.stringify({"success": true, "data": mockObjects.datasourceDefinitions, "errors": {}})
        };

        var ajaxFailureResponse = {
            status: 500,
            responseText: '{"success": false,"data": {"url": "", "data":{"newData": "","message": ""} },"errors": {}}'
        };

        beforeEach(module('predix.configurable-dashboard'));

        describe('When using default context metadata url', function() {
            beforeEach(inject(function(_DatasourceService_, $q, $rootScope) {
                DatasourceService = _DatasourceService_;
                q = $q;
                rootScope = $rootScope;
            }));

            beforeEach(function() {
                clearAjaxRequests();
                jasmine.Ajax.useMock();

                spyOn(vRuntime.datasource, "create").andCallThrough();
                spyOn(window.logger, "error").andCallThrough();
                spyOn(q, "defer").andReturn(mockDefer);
                spyOn(mockDefer, "resolve");
                spyOn(mockDefer, "reject");
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
            });

            describe('when fetch datasource metadata by context id', function() {
                var request, promise;

                beforeEach(function() {
                    clearAjaxRequests();

                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                });

                it('with default context metadata url is set', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual('http://(dashboardContextMetadata)/1/metadata?type=Asset');
                });

                describe('when server return context metadata', function() {
                    beforeEach(function() {
                        request.response(ajaxSuccessResponse);
                    });

                    it('expect to return context', function() {
                        expect(mockDefer.resolve).toHaveBeenCalledWith(mockObjects.datasourceDefinitions);
                    });
                });

                describe('when server failed to return metadata', function() {
                    beforeEach(function() {
                        request.response(ajaxFailureResponse);
                    });

                    it('expect to show error in modal', function() {
                        expect(mockDefer.reject).toHaveBeenCalled();
                        expect(window.logger.error).toHaveBeenCalledWith('dashboard.context.datasource.fetchfail');
                    });
                });
            });

            describe('when get datasource definition by id', function() {
                beforeEach(function() {
                    //populate ds service
                    clearAjaxRequests();
                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                    request.response(ajaxSuccessResponse);
                });

                it('can return datasource definition', function() {
                    var dsDefn = DatasourceService.getDatasourceDefinitionById("context.ds.1");
                    expect(dsDefn.id).toEqual("context.ds.1");
                });

                it('will return null when fail to find datasource by id', function() {
                    var dsDefn = DatasourceService.getDatasourceDefinitionById('x');
                    expect(dsDefn).toEqual(null);
                });
            });

            describe('when getting all datasource definitions', function() {
                beforeEach(function() {
                    clearAjaxRequests();
                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                    request.response(ajaxSuccessResponse);
                });

                it('when getting all datasources', function() {
                    expect(DatasourceService.getAllDatasourceDefinitions()).toEqual(mockObjects.datasourceDefinitions);
                });
            });

            describe('when getting datasource definitions for a specified type', function() {
                beforeEach(function() {
                    clearAjaxRequests();
                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                    request.response(ajaxSuccessResponse);
                });

                it('when getting all datasources', function() {
                    var timeSeriesDatasources = DatasourceService.getDatasourceDefinitionsForType('time-series');
                    var someTypeDatasources = DatasourceService.getDatasourceDefinitionsForType('some-type');

                    expect(timeSeriesDatasources.length).toBe(2);
                    expect(timeSeriesDatasources[0].type).toBe('time-series');
                    expect(timeSeriesDatasources[1].type).toBe('time-series');

                    expect(someTypeDatasources.length).toBe(1);
                    expect(someTypeDatasources[0].type).toBe('some-type');
                });
            });
        });

        describe('When using customized context metadata url', function() {
            var customUrl = "localhost:9000/service/readerApp/CustomEntity";

            beforeEach(function() {
                angular.module('testModule', ['predix.configurable-dashboard'])
                    .config(function(DatasourceServiceProvider) {
                        DatasourceServiceProvider.setContextMetadataUrl(customUrl);
                    });

                module('testModule');
            });

            beforeEach(inject(function(_DatasourceService_, $q) {
                DatasourceService = _DatasourceService_;
                q = $q;
            }));

            beforeEach(function() {
                clearAjaxRequests();
                jasmine.Ajax.useMock();

                spyOn(vRuntime.datasource, "create").andCallThrough();
                spyOn(window.logger, "error").andCallThrough();
                spyOn(q, "defer").andReturn(mockDefer);
                spyOn(mockDefer, "resolve");
                spyOn(mockDefer, "reject");
                successCallback = jasmine.createSpy('successCallback');
                errorCallback = jasmine.createSpy('errorCallback');
            });

            describe('when fetch datasource metadata by context id', function() {
                var request, promise;

                beforeEach(function() {
                    clearAjaxRequests();

                    DatasourceService.getDatasourcesByContextId(1);
                    request = mostRecentAjaxRequest();
                });

                it('with custom context metadata url is set', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual("http://" + customUrl + '/1/metadata?type=Asset');
                });
            });
        });
    });
});