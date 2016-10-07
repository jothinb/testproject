define(['angular', 'angular-mocks'], function(angular) {
    describe('The ContextService', function() {
        var ContextService, ViewService, DatasourceService, q, successCallback, errorCallback, rootScope;

        var mockViews = [
            {id: 'view1'},
            {id: 'view2'}
        ];
        var mockDatasources = [
            {id: 'ds1'},
            {id: 'ds2'}
        ];

        var mockContext = {
            id: 'my.context.id',
            name: 'my.context.name',
            datasources: mockDatasources,
            views: mockViews
        };

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_ContextService_, _ViewService_, _DatasourceService_, $q, $rootScope) {
            ContextService = _ContextService_;
            ViewService = _ViewService_;
            DatasourceService = _DatasourceService_;
            q = $q;
            rootScope = $rootScope;
        }));

        describe('when fetch context', function() {
            var viewDefer, datasourceDefer;

            beforeEach(function() {
                viewDefer = q.defer();
                datasourceDefer = q.defer();

                spyOn(ViewService, "getViewsByContextId").andReturn(viewDefer.promise);
                spyOn(DatasourceService, "getDatasourcesByContextId").andReturn(datasourceDefer.promise);

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");

                ContextService.getContext('my.context.id', 'my.context.name').then(function(context) {
                    successCallback(context);
                }, function() {
                    errorCallback();
                });
            });
            it('fetch view from ViewService', function() {
                expect(ViewService.getViewsByContextId).toHaveBeenCalledWith('my.context.id');
            });

            it('fetch datasource from DatasourceService', function() {
                expect(DatasourceService.getDatasourcesByContextId).toHaveBeenCalledWith('my.context.id');
            });

            it('when view service and datasource return from server', function() {
                viewDefer.resolve(mockViews);
                datasourceDefer.resolve(mockDatasources);
                rootScope.$apply();
                expect(successCallback).toHaveBeenCalledWith(mockContext);
                expect(errorCallback).not.toHaveBeenCalled();
            });

            it('when only view service return', function() {
                viewDefer.resolve(mockViews);
                datasourceDefer.reject();
                rootScope.$apply();
                expect(successCallback).not.toHaveBeenCalled();
                expect(errorCallback).toHaveBeenCalled();
            });

            it('when only datasource service return', function() {
                viewDefer.reject();
                datasourceDefer.resolve(mockDatasources);
                rootScope.$apply();
                expect(successCallback).not.toHaveBeenCalled();
                expect(errorCallback).toHaveBeenCalled();
            });

            it('when both datasource and view service failed return', function() {
                viewDefer.reject();
                datasourceDefer.reject();
                rootScope.$apply();
                expect(successCallback).not.toHaveBeenCalled();
                expect(errorCallback).toHaveBeenCalled();
            });
        });


    });
});