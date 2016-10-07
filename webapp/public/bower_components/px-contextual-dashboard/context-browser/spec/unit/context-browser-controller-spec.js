define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {

    var ContextBrowserController;
    var ContextBrowserService;
    var CurrentStateService;
    var ViewCreatorService;
    var ContextService;
    var DashboardAlertService;

    describe('The ContextBrowserController', function() {

        var fakeContextTree = "some kind of contexts";
        var myScope;

        describe('when displayLevels and labelField are not set on the scope', function() {

            beforeEach(module('predix.configurable-dashboard'));
            beforeEach(inject(function($controller, $rootScope, _ContextBrowserService_) {
                ContextBrowserService = _ContextBrowserService_;
                ContextBrowserService.contexts = fakeContextTree;

                myScope = $rootScope.$new();
                ContextBrowserController = $controller('ContextBrowserController', {
                    $scope: myScope
                });
            }));

            it('defaults to 3 display levels', function() {
                expect(ContextBrowserController.displayLevels).toBe(3);
            });

            it('defaults to name for labelField', function() {
                expect(ContextBrowserController.labelField).toBe('name');
            });

            it('defaults to category for parentIdField', function() {
                expect(ContextBrowserController.parentIdField).toBe('category');
            });

            it('defaults to entityType for idField', function() {
                expect(ContextBrowserController.idField).toBe('entityType');
            });

        });

        describe('when initialized properly', function() {

            var q, rootScope;

            beforeEach(module('predix.configurable-dashboard'));
            beforeEach(inject(function($controller, $rootScope, _ContextBrowserService_, _ContextService_, _CurrentStateService_, _ViewCreatorService_, $q, _DashboardAlertService_) {

                spyOn(window.logger, 'log');

                ContextBrowserService = _ContextBrowserService_;
                ContextService = _ContextService_;
                CurrentStateService = _CurrentStateService_;
                ViewCreatorService = _ViewCreatorService_;
                DashboardAlertService = _DashboardAlertService_;

                q = $q;
                rootScope = $rootScope;
                ContextBrowserService.contexts = fakeContextTree;

                myScope = $rootScope.$new();
                myScope.displayLevels = 9;
                myScope.labelField = "label";
                myScope.parentIdField = "x";
                myScope.idField = "y";
                ContextBrowserController = $controller('ContextBrowserController', {
                    $scope: myScope
                });
            }));

            it('sets the initialContexts property to ContextBrowserService.contexts', function() {
                expect(ContextBrowserController.initialContexts).toBe(fakeContextTree);
            });

            it('sets the display levels to the number from the scope', function() {
                expect(ContextBrowserController.displayLevels).toBe(9);
            });

            it('sets the label field from the scope', function() {
                expect(ContextBrowserController.labelField).toEqual('label');
            });

            it('sets the parentIdField from the scope', function() {
                expect(ContextBrowserController.parentIdField).toBe('x');
            });

            it('sets the idField from the scope', function() {
                expect(ContextBrowserController.idField).toBe('y');
            });

            describe('when isOpenable called', function() {

                it('return the value of the entity field', function() {
                    var test = ContextBrowserController.isOpenable({
                        entity: "trythis"
                    });
                    expect(test).toEqual("trythis");
                });

                it('logs error and returns false if node undefined', function() {
                    var imundefined;
                    var test = ContextBrowserController.isOpenable(imundefined);
                    expect(test).toEqual(false);
                    expect(window.logger.log).toHaveBeenCalledWith('node.entity does not exist, returning false for isOpenable');

                });

                it('logs error and returns false if no entity field', function() {
                    var test = ContextBrowserController.isOpenable({});
                    expect(test).toBeFalsy();
                    expect(window.logger.log).toHaveBeenCalledWith('node.entity does not exist, returning false for isOpenable');
                });

            });

            describe('when getChildren called', function() {

                var defer;

                beforeEach(function() {
                    defer = q.defer();
                    spyOn(ContextBrowserService, 'getChildren').andReturn(defer.promise);
                });

                it('returns the promise for the data from ContextBrowserService for the nodeIdentifier', function() {
                    var testPromise;
                    ContextBrowserController.getChildren({
                        nodeIdentifier: "foo"
                    }).then(function(data) {
                        testPromise = data;
                    });

                    defer.resolve("the children");
                    rootScope.$apply();

                    waitsFor(function() {
                        return testPromise;
                    }, "getChildren", 500);

                    runs(function() {
                        expect(testPromise).toEqual("the children");
                    });
                });

                it('should not call getChildren and logs error if node undefined', function() {
                    ContextBrowserController.getChildren();
                    expect(ContextBrowserService.getChildren).not.toHaveBeenCalled();
                    expect(window.logger.log).toHaveBeenCalledWith('node.nodeIdentifier is not valid, not setting the children');
                });

                it('rejects promise if node undefined', function() {
                    spyOn(q, "reject");
                    ContextBrowserController.getChildren();
                    expect(q.reject).toHaveBeenCalledWith("node.nodeIdentifier is not valid, not setting the children");
                });

                it('should not call getChildren and logs error if nodeIdentifier undefined', function() {
                    ContextBrowserController.getChildren({});
                    expect(ContextBrowserService.getChildren).not.toHaveBeenCalled();
                    expect(window.logger.log).toHaveBeenCalledWith('node.nodeIdentifier is not valid, not setting the children');
                });

                it('rejects promise if node undefined', function() {
                    spyOn(q, "reject");
                    ContextBrowserController.getChildren({});
                    expect(q.reject).toHaveBeenCalledWith("node.nodeIdentifier is not valid, not setting the children");
                });
            });

            it('defines the handlers object with the expected handlers', function() {
                expect(ContextBrowserController.handlers.itemOpenHandler).toBe(
                    ContextBrowserController.openContext);
                expect(ContextBrowserController.handlers.isOpenable).toBe(
                    ContextBrowserController.isOpenable);
                expect(ContextBrowserController.handlers.getChildren).toBe(
                    ContextBrowserController.getChildren);
                expect(ContextBrowserController.handlers.itemClickHandler).toBeUndefined();
            });

            describe('when openContext called', function() {

                var $testContainer;

                beforeEach(function() {
                    setFixtures(sandbox({
                        id: 'test-container'
                    }));
                    $testContainer = $("#test-container");
                    $testContainer.append('<div id="mydiv"><div id="context-browser-dropdown" class="foo open"></div></div>');

                    spyOn(CurrentStateService, 'setContext').andCallThrough();
                    spyOn(CurrentStateService, 'setView').andCallThrough();
                    spyOn(CurrentStateService, 'setViewToNone').andCallThrough();
                    spyOn(CurrentStateService, 'setBreadcrumbs').andCallThrough();
                    spyOn(ViewCreatorService, 'openViewCreator');
                });

                describe('With views in context', function() {
                    var defer;

                    beforeEach(function() {
                        defer = q.defer();

                        spyOn(ContextService, 'getContext').andReturn(defer.promise);
                        ContextBrowserController.openContext(mockObjects.context, [null, "breadcrumbs", "here"]);

                        defer.resolve(mockObjects.context);
                        rootScope.$apply();
                    });

                    it('calls ContextService.getContext with the context', function() {
                        expect(ContextService.getContext).toHaveBeenCalledWith(mockObjects.context.identifier, mockObjects.context.name);
                    });

                    it('set context in current state service', function() {
                        expect(CurrentStateService.setContext).toHaveBeenCalledWith(mockObjects.context);
                        expect(CurrentStateService.getContextName()).toEqual(mockObjects.context.name);
                    });

                    it('set breadcrum in current state service', function() {
                        expect(CurrentStateService.setBreadcrumbs).toHaveBeenCalledWith([null, "breadcrumbs", "here"]);
                        expect(CurrentStateService.getBreadcrumbs()).toEqual([null, "breadcrumbs", "here"]);
                    });

                    it('set the first view', function() {
                        expect(CurrentStateService.setView).toHaveBeenCalledWith(mockObjects.context.views[0]);
                        expect(CurrentStateService.getView()).toBe(mockObjects.context.views[0]);
                    });

                    it('closes the dropdown', function() {
                        expect(angular.element("#context-browser-dropdown").attr("class")).toBe("foo");
                    });
                });

                describe('with no views in context', function() {
                    var context = {};
                    var defer;

                    beforeEach(function() {
                        defer = q.defer();

                        //copy the context;
                        angular.copy(mockObjects.context, context);
                        //empty the view
                        context.views = [];

                        spyOn(ContextService, 'getContext').andReturn(defer.promise);
                        ContextBrowserController.openContext(context, [null, "breadcrumbs", "here"]);

                        defer.resolve(context);
                        rootScope.$apply();
                    });

                    it('calls ContextService.getContext with the context', function() {
                        expect(ContextService.getContext).toHaveBeenCalledWith(context.identifier, context.name);
                    });

                    it('set context in current state service', function() {
                        expect(CurrentStateService.setContext).toHaveBeenCalledWith(context);
                    });

                    it('set breadcrum in current state service', function() {
                        expect(CurrentStateService.setBreadcrumbs).toHaveBeenCalledWith([null, "breadcrumbs", "here"]);
                        expect(CurrentStateService.getBreadcrumbs()).toEqual([null, "breadcrumbs", "here"]);
                    });

                    it('cannot set view in current state', function() {
                        expect(CurrentStateService.setView).not.toHaveBeenCalled();
                    });

                    it('sets the view to none on the dashboard', function() {
                        expect(CurrentStateService.setViewToNone).toHaveBeenCalled();
                    });

                    it('closes the dropdown', function() {
                        expect(angular.element("#context-browser-dropdown").attr("class")).toBe("foo");
                    });
                });

                describe('with no context meta is resolved', function() {
                    var context = {};
                    var defer;

                    beforeEach(function() {
                        defer = q.defer();

                        //copy the context;
                        angular.copy(mockObjects.context, context);
                        //empty the view
                        context.views = [];

                        spyOn(ContextService, 'getContext').andReturn(defer.promise);
                        spyOn(DashboardAlertService, "addAlert");

                        ContextBrowserController.openContext(context, [null, "breadcrumbs", "here"]);

                        defer.reject();
                        rootScope.$apply();
                    });

                    it('calls ContextService.getContext with the context', function() {
                        expect(ContextService.getContext).toHaveBeenCalledWith(context.identifier, context.name);
                    });

                    it('will not set context in current state service', function() {
                        expect(CurrentStateService.setContext).not.toHaveBeenCalled();
                    });

                    it('will not set breadcrum in current state service', function() {
                        expect(CurrentStateService.setBreadcrumbs).not.toHaveBeenCalled();
                    });

                    it('cannot set view in current state', function() {
                        expect(CurrentStateService.setView).not.toHaveBeenCalled();
                    });

                    it('will show alert', function() {
                        expect(DashboardAlertService.addAlert).toHaveBeenCalledWith({
                            msg: vRuntime.messages('dashboard.context.metadata.fetchfail')
                        });
                    });

                    it('closes the dropdown', function() {
                        expect(angular.element("#context-browser-dropdown").attr("class")).toBe("foo");
                    });
                });
            });

        });

    });
});