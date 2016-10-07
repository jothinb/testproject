define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    var EditModeService, CurrentStateService, WidgetService, ViewService, DashboardAlertService, q, rootScope;
    mockObjects = angular.copy(mockObjects);

    describe('The EditModeService', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function(_EditModeService_, _CurrentStateService_, _WidgetService_, _ViewService_, _DashboardAlertService_, $q, $rootScope) {
            EditModeService = _EditModeService_;
            CurrentStateService = _CurrentStateService_;
            WidgetService = _WidgetService_;
            ViewService = _ViewService_;
            DashboardAlertService = _DashboardAlertService_;
            q = $q;
            rootScope = $rootScope;
        }));

        beforeEach(function() {
            CurrentStateService.setContext(mockObjects.context);
        });

        describe('placing add widget buttons', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[2]);
                EditModeService.enterEditMode();
            });

            it('puts an add widget button next to a half size widget on the first row', function() {
                expect(EditModeService.shouldShowAddButtonForIndex(0)).toBe(true);
            });

            it('puts an add widget button next to a half size widget on a row other than the first or last', function() {
                expect(EditModeService.shouldShowAddButtonForIndex(2)).toBe(true);
            });

            it('puts an add widget button next to a half size widget on the last row', function() {
                expect(EditModeService.shouldShowAddButtonForIndex(4)).toBe(true);
            });

            it('does not put an add widget button next to a full size widget on the first row', function() {
                expect(EditModeService.shouldShowAddButtonForIndex(3)).toBe(false);
            });

            it('does not put an add widget button next to a full size widget on a row other than the first or last', function() {
                var mockView = angular.copy(mockObjects.context.views[2]);

                mockView.cards.push({
                    cardId: 'v-simplest-directive',
                    size: 'full',
                    cardVersion: "1.0.0",
                    options: {},
                    datasource: {
                        id: 'context.ds.1',
                        name: 'ds1',
                        url: 'predix.com/data1',
                        type: 'not-time-series',
                        options: {}
                    }
                });

                expect(EditModeService.shouldShowAddButtonForIndex(5)).toBe(false);
            });

            it('puts an add widget button next to a half size widget when there are an odd number of consecutive half widgets above it', function() {
                CurrentStateService.setView(mockObjects.context.views[3]);
                EditModeService.enterEditMode();
                expect(EditModeService.shouldShowAddButtonForIndex(2)).toBe(true);
            });

            it('does not put an add widget button for a half sized widget that is on the second half of a row', function() {
                CurrentStateService.setView(mockObjects.context.views[3]);
                EditModeService.enterEditMode();
                expect(EditModeService.shouldShowAddButtonForIndex(1)).toBe(false);
            });

            it('does not put an add widget button for a half sized widget that is on the first half of a filled row', function() {
                CurrentStateService.setView(mockObjects.context.views[3]);
                EditModeService.enterEditMode();
                expect(EditModeService.shouldShowAddButtonForIndex(0)).toBe(false);
            });
        });

        describe('adding widgets', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
                EditModeService.enterEditMode();
            });

            it('can cancel and no widgets will be added to the page', function() {
                var widget = mockObjects.widgetDefinitions[0];
                var datasource = mockObjects.datasourceDefinitions[1];
                var datasourceOptions = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndexToLast();
                EditModeService.addWidget(datasource, datasourceOptions, widget, {});

                var widget2 = mockObjects.widgetDefinitions[0];
                var datasource2 = mockObjects.datasourceDefinitions[1];
                var datasourceOptions2 = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndex(0);
                EditModeService.addWidget(datasource2, datasourceOptions2, widget2, {});

                EditModeService.cancelChanges();

                expect(CurrentStateService.getView()).toEqual(mockObjects.context.views[0]);
            });

            it('can save and will persist the widget changes to the view', function() {
                var uneditedView = CurrentStateService.getView();

                var widgetDefinition = mockObjects.widgetDefinitions[0];
                var datasourceDefinition = mockObjects.datasourceDefinitions[1];
                var datasourceOptions = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndexToLast();
                EditModeService.addWidget(datasourceDefinition, datasourceOptions, widgetDefinition, {});

                var widget2Definition = mockObjects.widgetDefinitions[0];
                var datasource2Definition = mockObjects.datasourceDefinitions[1];
                var datasourceOptions2 = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndex(0);
                EditModeService.addWidget(datasource2Definition, datasourceOptions2, widget2Definition, {});

                spyOn(ViewService, "updateView").andCallFake(function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                });

                EditModeService.saveChanges();
                rootScope.$apply();
                expect(CurrentStateService.getView()).not.toEqual(uneditedView);
                expect(CurrentStateService.getView().cards[0].cardId).toEqual(widget2Definition.id);
                expect(CurrentStateService.getView().cards[0].datasource.id).toEqual(datasource2Definition.id);
            });

            it('can add a widget to the end of the current view', function() {
                var widgetDefinition = mockObjects.widgetDefinitions[0];
                var datasourceDefinition = mockObjects.datasourceDefinitions[1];
                var datasourceOptions = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndexToLast();
                EditModeService.addWidget(datasourceDefinition, datasourceOptions, widgetDefinition, {});

                spyOn(ViewService, "updateView").andCallFake(function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                });

                EditModeService.saveChanges();
                rootScope.$apply();

                expect(CurrentStateService.getView().cards[CurrentStateService.getView().cards.length - 1].datasource.id).toBe(datasourceDefinition.id);
                expect(CurrentStateService.getView().cards[CurrentStateService.getView().cards.length - 1].cardId).toBe(widgetDefinition.id);
            });

            it('can add a widget at a specific index', function() {
                var widgetDefinition = mockObjects.widgetDefinitions[0];
                var datasourceDefinition = mockObjects.datasourceDefinitions[1];
                var datasourceOptions = mockObjects.datasourceInputProperties;

                EditModeService.setWidgetIndex(0);
                EditModeService.addWidget(datasourceDefinition, datasourceOptions, widgetDefinition, {});

                spyOn(ViewService, "updateView").andCallFake(function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                });

                EditModeService.saveChanges();
                rootScope.$apply();

                expect(CurrentStateService.getView().cards[0].datasource.id).toBe('context.ds.2');
                expect(CurrentStateService.getView().cards[0].cardId).toBe('v-simplest-directive');
            });
        });

        describe('Updating Widget', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
                EditModeService.enterEditMode();
            });

            it('can update a widget at a specific index ', function() {
                var widgetDefinition = mockObjects.widgetDefinitions[1];
                var datasourceDefinition = mockObjects.datasourceDefinitions[1];
                var datasourceOptions = mockObjects.datasourceInputProperties;
                var widgetOptions = {title: 'abcdefg'};

                var widgetInstance = WidgetService.buildWidgetInstance(datasourceDefinition, datasourceOptions, widgetDefinition, widgetOptions);
                var beforeUpdateWidgetLength = EditModeService.getViewWorkingCopy().cards.length;
                EditModeService.updateWidget(0, datasourceDefinition, datasourceOptions, widgetDefinition, widgetOptions);

                var viewWorkingCopy = EditModeService.getViewWorkingCopy();
                expect(viewWorkingCopy.cards[0].datasource.id).toBe(widgetInstance.datasource.id);
                expect(viewWorkingCopy.cards[0].options.title).toBe(widgetOptions.title);
                expect(viewWorkingCopy.cards.length).toEqual(beforeUpdateWidgetLength);

                spyOn(ViewService, "updateView").andCallFake(function() {
                    var deferred = q.defer();
                    deferred.resolve();
                    return deferred.promise;
                });

                EditModeService.saveChanges();
                rootScope.$apply();

                var savedView = CurrentStateService.getView();
                expect(savedView.cards[0].datasource.id).toBe(widgetInstance.datasource.id);
                expect(savedView.cards[0].cardId).toBe(widgetInstance.cardId);
                expect(savedView.cards[0].options.title).toBe('abcdefg');
            });

        });

        describe('Deleting Widget', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
                EditModeService.enterEditMode();
            });

            it('can remove widget at a specific index', function() {
                var viewWorkingCopy = EditModeService.getViewWorkingCopy();
                var widgetLength = viewWorkingCopy.cards.length;
                var index2Widget = angular.copy(viewWorkingCopy.cards[2]);

                EditModeService.deleteWidget(1);
                viewWorkingCopy = EditModeService.getViewWorkingCopy();
                expect(viewWorkingCopy.cards[1].cardId).toBe(index2Widget.cardId);
                expect(widgetLength - viewWorkingCopy.cards.length).toEqual(1);
            });

            it('can remove widget from the beginning of the widget list', function() {
                var viewWorkingCopy = EditModeService.getViewWorkingCopy();
                var widgetLength = viewWorkingCopy.cards.length;
                var index1Widget = angular.copy(viewWorkingCopy.cards[1]);

                EditModeService.deleteWidget(0);
                viewWorkingCopy = EditModeService.getViewWorkingCopy();
                expect(viewWorkingCopy.cards[0].cardId).toBe(index1Widget.cardId);
                expect(widgetLength - viewWorkingCopy.cards.length).toEqual(1);
            });

            it('can remove widget from the end of the widget list', function() {
                var viewWorkingCopy = EditModeService.getViewWorkingCopy();
                var widgetLength = viewWorkingCopy.cards.length;
                var lastWidget = angular.copy(viewWorkingCopy.cards[widgetLength - 1]);

                EditModeService.deleteWidget(widgetLength - 1);
                viewWorkingCopy = EditModeService.getViewWorkingCopy();
                expect(viewWorkingCopy.cards[widgetLength - 2].cardId).toBe(lastWidget.cardId);
                expect(widgetLength - viewWorkingCopy.cards.length).toEqual(1);
            });
        });

        describe('before entering edit mode', function() {
            it('should return empty string for view name', function() {
                expect(EditModeService.getViewName()).toBe('');
            });
        });
        
        describe('when entering edit mode', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
            });

            it('knows its in edit mode', function() {
                EditModeService.enterEditMode();
                expect(EditModeService.isInEditMode()).toBe(true);
            });

            it('makes a fresh copy of the widget\'s instance', function() {
                var oldInstance = CurrentStateService.getView().cards[0];
                EditModeService.enterEditMode();
                expect(EditModeService.getViewWorkingCopy().cards[0]).not.toBe(oldInstance);
            });

            it('knows about its view working copy', function() {
                var oldView = CurrentStateService.getView();
                EditModeService.enterEditMode();
                expect(oldView.id).toEqual(EditModeService.getViewWorkingCopy().id);
            });
        });

        describe('editing a view', function() {
            it('can change the view\'s name', function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
                EditModeService.enterEditMode();
                EditModeService.setViewName('changed');
                expect(EditModeService.getViewName()).toBe('changed');
            });
        });

        describe('deleting a view', function() {
            var deferred, successCallback, errorCallback, contextCopy, numOfViewsBeforeDelete, viewIdToBeDelete;

            beforeEach(function() {
                deferred = q.defer();

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");

                spyOn(ViewService, "deleteView").andReturn(deferred.promise);
                spyOn(DashboardAlertService, "addAlert");

                contextCopy = angular.copy(mockObjects.context);
                EditModeService.enterEditMode();
            });

            describe('with multiple views in context', function() {
                beforeEach(function() {
                    CurrentStateService.setContext(contextCopy);
                    CurrentStateService.setView(contextCopy.views[1]);

                    numOfViewsBeforeDelete = CurrentStateService.getViewList().length;
                    toBeDeletedViewId = contextCopy.views[1].id;

                    EditModeService.removeCurrentViewFromContext().then(successCallback, errorCallback);
                });

                describe('in successs', function() {
                    beforeEach(function() {
                        deferred.resolve();
                        rootScope.$apply();
                    });

                    it('should call ViewService', function() {
                        expect(ViewService.deleteView).toHaveBeenCalledWith(toBeDeletedViewId);
                    });

                    it('should resolve promise', function() {
                        expect(successCallback).toHaveBeenCalled();
                    });

                    it('should on remove 1 view', function() {
                        var diff = numOfViewsBeforeDelete - contextCopy.views.length;
                        expect(diff).toBe(1);
                    });

                    it('should remove view from current context', function() {
                        //find view
                        var deleteView = _.find(CurrentStateService.getViewList(), function(view) {
                            return (view.id === toBeDeletedViewId);
                        });
                        expect(deleteView).toBe(undefined);
                    });

                    it('sets the dashboard\'s view to the first view in the remaining list', function() {
                        var viewToBeSet = CurrentStateService.getViewList()[0];
                        expect(CurrentStateService.getView()).toEqual(viewToBeSet);
                    });

                    it('should exit edit mode', function() {
                        expect(EditModeService.isInEditMode()).toBe(false);
                    });
                });

                describe('in error', function() {
                    beforeEach(function() {
                        deferred.reject();
                        rootScope.$apply();
                    });

                    it('should reject promise', function() {
                        expect(errorCallback).toHaveBeenCalled();
                    });

                    it('should not exit edit mode', function() {
                        expect(EditModeService.isInEditMode()).toBe(true);
                    });

                    it('should show dashboard alert', function() {
                        expect(DashboardAlertService.addAlert).toHaveBeenCalledWith({
                            msg: vRuntime.messages("dashboard.context.view.deletefail")
                        });
                    });
                });
            });

            describe('when it is the last view for the context', function() {

                beforeEach(function() {
                    contextCopy = angular.copy(mockObjects.contextOneView);

                    CurrentStateService.setContext(contextCopy);
                    CurrentStateService.setView(contextCopy.views[0]);
                    numOfViewsBeforeDelete = CurrentStateService.getViewList().length;

                    EditModeService.removeCurrentViewFromContext().then(successCallback, errorCallback);
                });

                describe('in success', function() {
                    beforeEach(function() {
                        deferred.resolve();
                        rootScope.$apply();
                    });

                    it('should resolve promise', function() {
                        expect(successCallback).toHaveBeenCalled();
                    });

                    it('should on remove 1 view', function() {
                        var diff = numOfViewsBeforeDelete - contextCopy.views.length;
                        expect(diff).toBe(1);
                    });

                    it('should exit edit mode', function() {
                        expect(EditModeService.isInEditMode()).toBe(false);
                    });

                    it('sets the no view on the dashboard', function() {
                        expect(CurrentStateService.hasView()).toBe(false);
                    });
                });
            });
        });

        describe('can add a view', function() {
            var deferred, successCallback, errorCallback, contextCopy, numOfViewsBeforeDelete, viewIdToBeDelete, testNewViewName, viewNameBeforeAdd;

            beforeEach(function() {
                deferred = q.defer();
                testNewViewName = "TestViewName";

                contextCopy = angular.copy(mockObjects.contextOneView);

                CurrentStateService.setContext(contextCopy);
                CurrentStateService.setView(contextCopy.views[0]);

                viewNameBeforeAdd = CurrentStateService.getView().name;

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");

                spyOn(ViewService, "createView").andReturn(deferred.promise);
                spyOn(DashboardAlertService, "addAlert");

                contextCopy = angular.copy(mockObjects.context);
                EditModeService.addView(testNewViewName).then(successCallback, errorCallback);
            });

            describe('in success', function() {
                beforeEach(function() {
                    var mockViewObject = ViewService.buildViewInstance(testNewViewName);
                    deferred.resolve(mockViewObject);
                    rootScope.$apply();
                });

                it('can resolve promise', function() {
                    //not sure what server will return yet
                    expect(successCallback).toHaveBeenCalled();
                });

                it('can add a view to current context', function() {
                    //find view
                    var addedView = _.find(CurrentStateService.getViewList(), function(view) {
                        return (view.name === testNewViewName);
                    });
                    expect(addedView).not.toBe(undefined);
                });

                it('current view will be set to new view', function() {
                    expect(CurrentStateService.getView().name).toBe(testNewViewName);
                    expect(EditModeService.getViewName()).toEqual(testNewViewName);
                });

                it('will be in edit mode', function() {
                    expect(EditModeService.isInEditMode()).toBe(true);
                });
            });

            describe('in error', function() {
                beforeEach(function() {
                    deferred.reject();
                    rootScope.$apply();
                });

                it('will reject promise', function() {
                    expect(errorCallback).toHaveBeenCalled();
                });

                it('will not add view to current context', function() {
                    expect(CurrentStateService.getView().name).not.toBe(testNewViewName);
                });

                it('current view remains the same view', function() {
                    expect(CurrentStateService.getView().name).toEqual(viewNameBeforeAdd);
                });

                it('will not in edit mode', function() {
                    expect(EditModeService.isInEditMode()).toBe(false);
                });

                it('should show dashboard alert', function() {
                    expect(DashboardAlertService.addAlert).toHaveBeenCalledWith({
                        msg: vRuntime.messages("dashboard.context.view.createfail")
                    });
                });
            });
        });

        describe('When persist a view', function() {
            var deferred, successCallback, errorCallback, contextCopy, expectedViewWorkingCopy, expectContext;
            var newViewName = "TestSaveViewFeature";

            beforeEach(function() {
                deferred = q.defer();
                contextCopy = angular.copy(mockObjects.contextOneView);

                CurrentStateService.setContext(contextCopy);
                CurrentStateService.setView(contextCopy.views[0]);
                expectedViewWorkingCopy = angular.copy(contextCopy.views[0]);
                expectedViewWorkingCopy.name = newViewName;

                expectedContext = angular.copy(contextCopy);
                expectedContext.views[0] = expectedViewWorkingCopy;

                spyOn(ViewService, "updateView").andReturn(deferred.promise);
                spyOn(DashboardAlertService, "addAlert");

                successCallback = jasmine.createSpy("successCallback");
                errorCallback = jasmine.createSpy("errorCallback");

                //copy into viewWorkingCopy
                EditModeService.enterEditMode();
                //make view name change edits here
                EditModeService.setViewName('TestSaveViewFeature');
                EditModeService.saveChanges().then(successCallback, errorCallback);
            });

            it('should call view service with correct view', function() {
                expect(ViewService.updateView).toHaveBeenCalledWith(expectedViewWorkingCopy);
            });

            describe('in success', function() {
                beforeEach(function() {
                    deferred.resolve();
                    rootScope.$apply();
                });

                it('should resolve promise', function() {
                    expect(successCallback).toHaveBeenCalled();
                });

                it('should set context with working copy view', function() {
                    expect(CurrentStateService.getContext()).toEqual(expectedContext);
                });

                it('should set current view to working copy view', function() {
                    expect(CurrentStateService.getView()).toEqual(expectedViewWorkingCopy);
                    expect(EditModeService.getViewName()).toEqual(newViewName);
                });

                it('should exit edit mode', function() {
                    expect(EditModeService.isInEditMode()).toBe(false);
                });
            });

            describe('in error', function() {
                beforeEach(function() {
                    deferred.reject();
                    rootScope.$apply();
                });

                it('should reject promise', function() {
                    expect(errorCallback).toHaveBeenCalled();
                });

                it('should show dashboard alert', function() {
                    expect(DashboardAlertService.addAlert).toHaveBeenCalledWith({
                        msg: vRuntime.messages("dashboard.context.view.updatefail")
                    });
                });
            });
        });
    });
});




