define(['angular', 'angular-mocks', 'vruntime'], function(angular, undefined, vRuntime) {
    describe('The ContextBrowserService', function() {
        var ContextBrowserService, CurrentStateService;

        var ajaxSuccessResponse = {
            status: 200,
            responseText: '{"success": true,"data": [{"my":"data"}],"errors": {}}'
        };
        var ajaxFailureResponse = {
            status: 500,
            responseText: '{"success": false,"data": {"url": "", "data":{"newData": "","message": ""} },"errors": {}}'
        };

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(function() {
            clearAjaxRequests();
            jasmine.Ajax.useMock();
            spyOn(window.logger, 'error').andCallThrough();
        });

        describe('with the default contextTreeUrl', function() {

            var fakeDefer = {
                reject: function() {
                },
                resolve: function() {
                },
                promise: {}
            };
            var q;

            beforeEach(function() {
                angular.module('testModule', ['predix.configurable-dashboard']);
                module('testModule');
            });

            beforeEach(inject(function(_ContextBrowserService_, _CurrentStateService_, $q, $rootScope) {
                ContextBrowserService = _ContextBrowserService_;
                CurrentStateService = _CurrentStateService_;
                q = $q;
                rootScope = $rootScope;

                spyOn(q, "defer").andReturn(fakeDefer);
                spyOn(fakeDefer, "resolve");
                spyOn(fakeDefer, "reject");
            }));

            it('exposes a `contexts` property representing the context tree which is empty', function() {
                expect(ContextBrowserService.contexts.length).toBe(0);
            });

            describe('when loadContextTree is called', function() {

                var request;

                beforeEach(function() {
                    clearAjaxRequests();
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                });

                it('does a GET through the proxy to get the context tree data', function() {
                    expect(request.method).toBe('GET');
                    expect(request.url).toContain('api/v2/proxy');
                });

                it('does a GET to the default URL root/children', function() {
                    expect(request.requestHeaders['Service-End-Point']).toBe('http://(dashboardContextTree)/root/children');
                });

                it('sets the `contexts` property with the data from the context url', function() {
                    request.response(ajaxSuccessResponse);
                    expect(ContextBrowserService.contexts.length).toBe(1);
                    expect(ContextBrowserService.contexts[0].my).toBe('data');
                });

                it('logs an error and leaves the contexts empty if the GET fails', function() {
                    request.response(ajaxFailureResponse);
                    expect(ContextBrowserService.contexts.length).toBe(0);
                    expect(window.logger.error).toHaveBeenCalledWith('Error when the fetching context tree');
                });

                it('only calls vRuntime.datasource.create once when set multiple times', function() {
                    spyOn(vRuntime.datasource, 'create');
                    expect(vRuntime.datasource.create).not.toHaveBeenCalled();
                });
            });

            describe('when getChildren is called with an id', function() {

                var request, promise;

                beforeEach(function() {
                    clearAjaxRequests();
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                    request.response(ajaxSuccessResponse);
                    promise = ContextBrowserService.getChildren('myid');
                    request = mostRecentAjaxRequest();
                });

                it('does a GET through the proxy to get the context tree data', function() {
                    expect(request.method).toBe('GET');
                    expect(request.url).toContain('api/v2/proxy');
                });

                it('does a GET to the default URL with the id/children', function() {
                    expect(request.requestHeaders['Service-End-Point']).toBe('http://(dashboardContextTree)/myid/children');
                });

                it('resolves with the children on success', function() {
                    request.response(ajaxSuccessResponse);
                    expect(fakeDefer.resolve).toHaveBeenCalledWith([
                        {
                            "my": "data"
                        }
                    ]);
                });

                it('logs an error and rejects on failure', function() {
                    request.response(ajaxFailureResponse);
                    expect(window.logger.error).toHaveBeenCalledWith('Error when the fetching children for context tree');
                    expect(fakeDefer.reject).toHaveBeenCalled();
                });
            });
        });

        describe('when users override the contextTreeUrl', function() {

            var fakeDefer2 = {
                reject: function() {
                },
                resolve: function() {
                },
                promise: {}
            };
            var q;
            var userUrl = 'predix.com/this/is/fake';

            beforeEach(function() {
                angular.module('testModule', ['predix.configurable-dashboard'])
                    .config(function(ContextBrowserServiceProvider) {
                        ContextBrowserServiceProvider.setContextTreeUrl(userUrl);
                    });

                module('testModule');
            });

            beforeEach(inject(function(_ContextBrowserService_, _CurrentStateService_, $q) {
                ContextBrowserService = _ContextBrowserService_;
                CurrentStateService = _CurrentStateService_;
                q = $q;

                spyOn(q, "defer").andReturn(fakeDefer2);
                spyOn(fakeDefer2, "resolve");
                spyOn(fakeDefer2, "reject");
            }));

            describe('when loadContextTree is called', function() {

                var request;

                beforeEach(function() {
                    clearAjaxRequests();
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                });

                it('does a GET through the proxy to the user set URL/root/children', function() {
                    expect(request.requestHeaders['Service-End-Point']).toBe('http://' + userUrl + '/root/children');
                });
            });

            describe('when getChildren is called', function() {

                var request;

                beforeEach(function() {
                    clearAjaxRequests();
                    ContextBrowserService.loadContextTree();
                    request = mostRecentAjaxRequest();
                    request.response(ajaxSuccessResponse);
                    ContextBrowserService.getChildren('myspecialid');
                    request = mostRecentAjaxRequest();
                });

                it('does a GET through the proxy to the user set URL', function() {
                    expect(request.requestHeaders['Service-End-Point']).toBe('http://' + userUrl + '/myspecialid/children');
                });

                it('returns a promise with the data', function() {
                    request.response(ajaxSuccessResponse);
                    expect(fakeDefer2.resolve).toHaveBeenCalledWith([
                        {
                            "my": "data"
                        }
                    ]);
                });
            });

            xdescribe('when getChildren is called before loadContextTree', function() {

                beforeEach(function() {
                    clearAjaxRequests();
                    ContextBrowserService.getChildren('myspecialid');
                });

                it('logs an error and rejects', function() {
                    expect(window.logger.error).toHaveBeenCalledWith('contextbrowser.getchildren.dsnotdefined');
                    expect(fakeDefer2.reject).toHaveBeenCalled();
                });
            });

        });
    });
});