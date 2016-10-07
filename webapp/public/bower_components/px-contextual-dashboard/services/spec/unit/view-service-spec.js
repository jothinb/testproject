define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks', 'vruntime'], function(angular, mockObjects, undefined, vRuntime) {
    describe('The ViewService', function() {
        var ViewService, successCallback, errorCallback, request, q, rootScope;

        var ajaxSuccessResponse = {
            status: 200,
            responseText: JSON.stringify({"success": true, "data": mockObjects.contextOneView.views, "errors": {}})
        };

        var ajaxSuccessMultiViewsResponse = {
            status: 200,
            responseText: JSON.stringify({"success": true, "data": mockObjects.context.views, "errors": {}})
        };

        var ajaxFailureResponse = {
            status: 500,
            responseText: '{"success": false,"data": {"url": "", "data":{"newData": "","message": ""} },"errors": {}}'
        };

        beforeEach(module('predix.configurable-dashboard'));

        describe('When using default url', function() {

            beforeEach(inject(function(_ViewService_, $q, $rootScope) {
                ViewService = _ViewService_;
                q = $q;
                rootScope = $rootScope;
            }));

            beforeEach(function() {
                clearAjaxRequests();
                jasmine.Ajax.useMock();

                spyOn(vRuntime.datasource, "create").andCallThrough();
                spyOn(window.logger, "error").andCallThrough();

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");
            });


            describe('fetching views from server by context id', function() {

                beforeEach(function() {
                    clearAjaxRequests();

                    ViewService.getViewsByContextId(1).then(successCallback, errorCallback);
                    request = mostRecentAjaxRequest();
                });

                it('request to server with default url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual('http://(dashboardViewService)/1/collections');
                    expect(request.method).toEqual('GET');
                });

                describe('server return success', function() {
                    describe('server return one view in context', function(){
                        beforeEach(function() {
                            request.response(ajaxSuccessResponse);
                            rootScope.$apply();
                        });

                        it('can return one view', function() {
                            expect(successCallback).toHaveBeenCalledWith(mockObjects.contextOneView.views);
                        });
                    });

                    describe('server returns multiple views with sorted widgets', function(){
                        beforeEach(function() {
                            request.response(ajaxSuccessMultiViewsResponse);
                            rootScope.$apply();
                        });

                        it('can return multiple views with widgets in correct display order', function() {
                            expect(successCallback).toHaveBeenCalledWith(mockObjects.context.views);
                        });
                    });

                    describe('server returns unsorted views', function(){
                        var ajaxSuccessShuffledWidgetsResponse;

                        beforeEach(function() {
                            var mockContext = angular.copy(mockObjects.context);

                            mockContext.views = angular.forEach(mockContext.views, function(view, key){
                                view.cards = _.shuffle(view.cards);
                            });

                            ajaxSuccessShuffledWidgetsResponse = {
                                status: 200,
                                responseText: JSON.stringify({"success": true, "data": mockContext.views, "errors": {}})
                            };

                            request.response(ajaxSuccessShuffledWidgetsResponse);
                            rootScope.$apply();
                        });

                        it('widgets in all views will be sorted according to displayOrder', function() {
                            expect(successCallback).toHaveBeenCalledWith(mockObjects.context.views);
                        });
                    });

                });

                describe('server return error', function() {
                    describe('status is 404', function(){
                        beforeEach(function() {
                            var noViewAjaxResponse = angular.copy(ajaxFailureResponse);
                            noViewAjaxResponse.status = 404;
                            request.response(noViewAjaxResponse);
                            rootScope.$apply();
                        });

                        it('will respove promise with empty view array', function(){
                            expect(successCallback).toHaveBeenCalledWith([]);
                        });
                    });

                    describe('statuses other than 404', function(){
                        beforeEach(function() {
                            request.response(ajaxFailureResponse);
                            rootScope.$apply();
                        });

                        it('cannot return list of view', function() {
                            expect(errorCallback).toHaveBeenCalled();
                        });

                        it('will log error', function() {
                            expect(window.logger.error).toHaveBeenCalledWith("dashboard.context.view.fetchfail");
                        });
                    });
                });
            });

            describe('creating view in server', function() {
                var mockNewView, createViewSuccessResponse, expectedNewViewModifiedByViewService;

                beforeEach(function() {
                    clearAjaxRequests();
                    //to set the base url to correct context, no need to wait for the promise to be resolved;
                    mockNewView = ViewService.buildViewInstance('newViewName');
                    ViewService.getViewsByContextId(1);
                    ViewService.createView(mockNewView).then(successCallback, errorCallback);
                    request = mostRecentAjaxRequest();

                    expectedNewViewModifiedByViewService = angular.copy(mockNewView);
                    expectedNewViewModifiedByViewService.description = null;
                    expectedNewViewModifiedByViewService.cards = [];
                    expectedNewViewModifiedByViewService.id = "newViewId";
                });

                it('request to server with default url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual('http://(dashboardViewService)/1/collections');
                    expect(request.method).toEqual('POST');
                });

                describe('server return success', function() {
                    beforeEach(function() {
                        var createViewSuccessResponse = {
                            status: 200,
                            responseText: JSON.stringify({"success": true, "data": mockObjects.createViewServiceResponse, "errors": {}})
                        };
                        request.response(createViewSuccessResponse);
                        rootScope.$apply();
                    });

                    it('can return a list of widgets', function() {
                        expect(successCallback).toHaveBeenCalledWith(expectedNewViewModifiedByViewService);
                    });

                });

                describe('server return error', function() {
                    beforeEach(function() {
                        request.response(ajaxFailureResponse);
                        rootScope.$apply();
                    });

                    it('cannot return list of widgets', function() {
                        expect(errorCallback).toHaveBeenCalled();
                    });

                    it('will log error', function() {
                        expect(window.logger.error).toHaveBeenCalledWith("dashboard.context.view.createfail");
                    });
                });
            });

            describe('updating view from server by view id', function() {
                var mockView = null;

                // prepare mock view to simulate view created by dashboard application
                var prepareMockView = function(view){
                    var mockView = angular.copy(view);

                    //setup a mockView for testing
                    for (var i=0; i < view.cards.length; i++){
                        delete view.cards[i].displayOrder;
                        delete view.cards[i].applicationCollectionId;
                        view.cards[i].$$hashKey = 'angularHashKey';
                    }

                    return mockView;
                };

                beforeEach(function() {
                    clearAjaxRequests();
                    //to set the base url to correct context, no need to wait for the promise to be resolved;
                    ViewService.getViewsByContextId(1);

                    mockView = prepareMockView(mockObjects.context.views[1]);

                    ViewService.updateView(mockView).then(successCallback, errorCallback);
                    request = mostRecentAjaxRequest();
                });

                it('request to server with default url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual('http://(dashboardViewService)/1/collections/context.view2');
                    expect(request.method).toEqual('PUT');
                });

                it('must sanitize the view before send', function(){
                    expect(mockView.cards[0].displayOrder).toBe(1);
                    expect(mockView.cards[0].$$hasKey).toBe(undefined);
                    expect(mockView.cards[1].displayOrder).toBe(2);
                    expect(mockView.cards[1].$$hasKey).toBe(undefined);

                });

                describe('server return success', function() {
                    beforeEach(function() {
                        request.response(ajaxSuccessResponse);
                        rootScope.$apply();
                    });

                    it('can return a list of widgets', function() {
                        expect(successCallback).toHaveBeenCalled();
                    });

                });

                describe('server return error', function() {
                    beforeEach(function() {
                        request.response(ajaxFailureResponse);
                        rootScope.$apply();
                    });

                    it('cannot return list of view', function() {
                        expect(errorCallback).toHaveBeenCalled();
                    });

                    it('will log error', function() {
                        expect(window.logger.error).toHaveBeenCalledWith("dashboard.context.view.udpatefail");
                    });
                });
            });

            describe('deleting view from server by context id', function() {

                beforeEach(function() {
                    clearAjaxRequests();
                    //to set the base url to correct context, no need to wait for the promise to be resolved;
                    ViewService.getViewsByContextId(1);
                    ViewService.deleteView(1).then(successCallback, errorCallback);
                    request = mostRecentAjaxRequest();
                });

                it('request to server with default url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual('http://(dashboardViewService)/1/collections/1');
                    expect(request.method).toEqual('DELETE');
                });

                describe('server return success', function() {
                    beforeEach(function() {
                        request.response(ajaxSuccessResponse);
                        rootScope.$apply();
                    });

                    it('can return a list of widgets', function() {
                        expect(successCallback).toHaveBeenCalled();
                    });

                });

                describe('server return error', function() {
                    beforeEach(function() {
                        request.response(ajaxFailureResponse);
                        rootScope.$apply();
                    });

                    it('cannot return list of widgets', function() {
                        expect(errorCallback).toHaveBeenCalled();
                    });

                    it('will log error', function() {
                        expect(window.logger.error).toHaveBeenCalledWith("dashboard.context.view.deletefail");
                    });
                });
            });
        });

        it('should able to create a new view instance', function() {
            var viewInstance = ViewService.buildViewInstance('testViewName');
            expect(viewInstance.hasOwnProperty('name')).toBe(true);
            expect(viewInstance.cards instanceof Array).toBe(true);
            expect(viewInstance.name).toEqual('testViewName');
        });

        describe('When a custom url is set', function() {
            var customUrl = "localhost:9000/service/appConfig/customApp";

            beforeEach(function() {
                angular.module('testModule', ['predix.configurable-dashboard'])
                    .config(function(ViewServiceProvider) {
                        ViewServiceProvider.setViewUrl(customUrl);
                    });

                module('testModule');
            });

            beforeEach(inject(function(_ViewService_, $q, $rootScope) {
                ViewService = _ViewService_;
                q = $q;
                rootScope = $rootScope;
            }));

            beforeEach(function() {
                clearAjaxRequests();
                jasmine.Ajax.useMock();

                spyOn(vRuntime.datasource, "create").andCallThrough();
                spyOn(window.logger, "error").andCallThrough();

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");
            });

            describe('fetch views by context id', function() {

                beforeEach(function() {
                    clearAjaxRequests();

                    ViewService.getViewsByContextId(1).then(successCallback, errorCallback);
                    request = mostRecentAjaxRequest();
                });

                it('with a custom url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual("http://" + customUrl + '/1/collections');
                });
            });

            describe('create view in server', function() {
                var mockNewView = {name: 1};

                beforeEach(function() {
                    clearAjaxRequests();

                    //set context id here
                    ViewService.getViewsByContextId(1);
                    ViewService.createView(mockNewView);
                    request = mostRecentAjaxRequest();
                });

                it('with a custom url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual("http://" + customUrl + '/1/collections');
                    expect(request.method).toEqual('POST');
                });
            });

            describe('update view in server', function() {
                var mockUpdateView = {id: 1, name: 'test'};

                beforeEach(function() {
                    clearAjaxRequests();

                    //set context id here
                    ViewService.getViewsByContextId(1);
                    ViewService.updateView(mockUpdateView);
                    request = mostRecentAjaxRequest();
                });

                it('with a custom url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual("http://" + customUrl + '/1/collections/1');
                    expect(request.method).toEqual('PUT');
                });
            });

            describe('delete view in server', function() {
                beforeEach(function() {
                    clearAjaxRequests();

                    //set context id here
                    ViewService.getViewsByContextId(1);
                    ViewService.deleteView(1);
                    request = mostRecentAjaxRequest();
                });

                it('with a custom url', function() {
                    expect(request.requestHeaders['Service-End-Point']).toEqual("http://" + customUrl + '/1/collections/1');
                    expect(request.method).toEqual('DELETE');
                });
            });
        });
    });
});