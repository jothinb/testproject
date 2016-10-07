define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    var WidgetConfiguratorController;
    var WidgetConfiguratorService;
    var WidgetService;
    var DatasourceService;
    var scope;
    mockObjects = angular.copy(mockObjects);
    var savedWidget = mockObjects.context.views[0].cards[0];

    describe('The WidgetConfiguratorController', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function($controller, $rootScope, $log, _WidgetConfiguratorService_, _WidgetService_, _DatasourceService_) {
            WidgetConfiguratorService = _WidgetConfiguratorService_;
            WidgetService = _WidgetService_;
            DatasourceService = _DatasourceService_;

            scope = $rootScope.$new();
            scope.widgetForm = {$valid: true};
            scope.datasourceForm = {$valid: true};

            WidgetConfiguratorController = $controller('WidgetConfiguratorController', {
                $scope: scope,
                $log: $log,
                WidgetConfiguratorService: WidgetConfiguratorService
            });

            spyOn(WidgetConfiguratorService, 'save');
            spyOn(WidgetConfiguratorService, 'getSavedWidgetDatasourceDefinition').andReturn(mockObjects.datasourceDefinitions[1]);
            spyOn(WidgetConfiguratorService, 'getSavedWidgetDatasourceOptions').andReturn(savedWidget.datasource.options);
            spyOn(WidgetConfiguratorService, 'getSavedWidgetDefinition').andReturn(mockObjects.widgetDefinitions[1]);
            spyOn(WidgetConfiguratorService, 'getSavedWidgetOptions').andReturn(savedWidget.options);
            spyOn(WidgetConfiguratorService, 'getSavedWidgetSize').andReturn('half');
            spyOn(WidgetConfiguratorService, 'getAllDatasourceDefinitions').andReturn(mockObjects.datasourceDefinitions);
            spyOn(WidgetConfiguratorService, 'getAllWidgetDefinitions').andReturn(mockObjects.widgetDefinitions);

            spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);

            spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);

        }));

        it('onModalHide clears selections', function() {
            WidgetConfiguratorController.datasources = [
                {a: 1}
            ];
            WidgetConfiguratorController.widgets = [
                {a: 1}
            ];
            WidgetConfiguratorController.selectedDatasourceDefinition = {a: 1};
            WidgetConfiguratorController.selectedWidgetDefinition = {a: 1};
            WidgetConfiguratorController.datasourceOptions = {a: 1};
            WidgetConfiguratorController.widgetOptions = {a: 1};

            WidgetConfiguratorController.onModalHide();

            expect(WidgetConfiguratorController.datasources).toEqual([]);
            expect(WidgetConfiguratorController.widgets).toEqual([]);
            expect(WidgetConfiguratorController.selectedDatasourceDefinition).toBe(null);
            expect(WidgetConfiguratorController.selectedWidgetDefinition).toBe(null);
            expect(WidgetConfiguratorController.datasourceOptions).toEqual({});
            expect(WidgetConfiguratorController.widgetOptions).toEqual({});
        });

        describe('onModalShow in add mode', function() {
            beforeEach(function() {
                spyOn(WidgetConfiguratorService, 'isEditMode').andReturn(false);
                WidgetConfiguratorController.onModalShow();
            });

            it('should load the datasources', function() {
                expect(WidgetConfiguratorController.datasources).toEqual(mockObjects.datasourceDefinitions);
            });

            it('should load widgets', function() {
                expect(WidgetConfiguratorController.widgets).toEqual(mockObjects.widgetDefinitions);
            });

            it('should not load a saved widget', function() {
                expect(WidgetConfiguratorController.selectedWidgetDefinition).toBe(null);
                expect(WidgetConfiguratorController.selectedDatasourceDefinition).toBe(null);
            });

            it('able to save when form is valid', function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = {a: 1};
                WidgetConfiguratorController.selectedWidgetDefinition = {a: 2};
                WidgetConfiguratorController.datasourceOptions = {a: 3};
                WidgetConfiguratorController.widgetOptions = {a: 4};

                WidgetConfiguratorController.save();

                scope.widgetForm = {$valid: true};
                scope.datasourceForm = {$valid: true};

                expect(WidgetConfiguratorService.save).toHaveBeenCalledWith({a: 1}, {a: 3}, {a: 2}, {a: 4});
            });

            it('should not save when widgetForm or datasourceForm is invalid', function() {
                //invalid form
                scope.widgetForm = {$valid: true};
                scope.datasourceForm = {$valid: false};
                WidgetConfiguratorController.save();

                expect(WidgetConfiguratorService.save).not.toHaveBeenCalled();

                //invalid form
                scope.widgetForm = {$valid: false};
                scope.datasourceForm = {$valid: true};
                WidgetConfiguratorController.save();

                expect(WidgetConfiguratorService.save).not.toHaveBeenCalled();
            });
        });

        describe('onModalShow in edit mode', function() {
            var savedWidget = mockObjects.context.views[0].cards[0];

            beforeEach(function() {
                spyOn(WidgetConfiguratorService, 'isEditMode').andReturn(true);
                spyOn(WidgetConfiguratorService, 'getWidgetDefinitionsForDatasource');

                WidgetConfiguratorController.onModalShow();
                scope.$apply();
            });

            it('should filter the widget list', function() {
                expect(WidgetConfiguratorService.getWidgetDefinitionsForDatasource).toHaveBeenCalledWith(mockObjects.datasourceDefinitions[1]);
            });

            it('should not filter the datasource list', function() {
                expect(WidgetConfiguratorController.datasources).toBe(mockObjects.datasourceDefinitions);
            });

            it('should load datasource and widget from saved copy', function() {
                expect(WidgetConfiguratorController.widgetOptions).toEqual(savedWidget.options);
                expect(WidgetConfiguratorController.datasourceOptions).toEqual(savedWidget.datasource.options);
                expect(WidgetConfiguratorController.selectedDatasourceDefinition).toEqual(mockObjects.datasourceDefinitions[1]);
                expect(WidgetConfiguratorController.selectedWidgetDefinition).toEqual(mockObjects.widgetDefinitions[1]);
            });

            it('able to save when form is valid', function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = {a: 1};
                WidgetConfiguratorController.selectedWidgetDefinition = {a: 2};
                WidgetConfiguratorController.datasourceOptions = {a: 3};
                WidgetConfiguratorController.widgetOptions = {a: 4};

                WidgetConfiguratorController.save();

                scope.widgetForm = {$valid: true};
                scope.datasourceForm = {$valid: true};

                expect(WidgetConfiguratorService.save).toHaveBeenCalledWith({a: 1}, {a: 3}, {a: 2}, {a: 4});
            });

            it('should not save when widgetForm or datasourceForm is invalid', function() {
                //invalid form
                scope.widgetForm = {$valid: true};
                scope.datasourceForm = {$valid: false};
                WidgetConfiguratorController.save();

                expect(WidgetConfiguratorService.save).not.toHaveBeenCalled();

                //invalid form
                scope.widgetForm = {$valid: false};
                scope.datasourceForm = {$valid: true};
                WidgetConfiguratorController.save();

                expect(WidgetConfiguratorService.save).not.toHaveBeenCalled();
            });
        });

        describe('getDatasourceSchema', function() {

            it('logs to info if no schema', function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = {};
                spyOn(window.logger, 'info');
                WidgetConfiguratorController.getDatasourceSchema();
                expect(window.logger.info).toHaveBeenCalledWith('datasource definition does not have get.request.schema');
            });

            it('returns the schema if it exists', function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = {
                    get: {
                        request: {
                            schema: 'foo',
                            defaultOptions: {}
                        }
                    }
                };
                var schema = WidgetConfiguratorController.getDatasourceSchema();
                expect(schema).toBe('foo');
            });

        });

        describe('getWidgetSchema', function() {

            it('logs to info if no schema', function() {
                WidgetConfiguratorController.selectedWidgetDefinition = {};
                spyOn(window.logger, 'info');
                WidgetConfiguratorController.getWidgetSchema();
                expect(window.logger.info).toHaveBeenCalledWith('widget definition does not have schema');
            });

            it('returns the schema if it exists', function() {
                WidgetConfiguratorController.selectedWidgetDefinition = {
                    schema: 'myschema'
                };
                var schema = WidgetConfiguratorController.getWidgetSchema();
                expect(schema).toBe('myschema');
            });

        });

        describe('isValid', function() {

            beforeEach(function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = {a: 1};
                WidgetConfiguratorController.selectedWidgetDefinition = {a: 1};
                scope.widgetForm = {
                    $valid: true
                };
                scope.datasourceForm = {
                    $valid: true
                };
            });

            it('returns false if no selectedWidget', function() {
                WidgetConfiguratorController.selectedWidgetDefinition = false;
                expect(WidgetConfiguratorController.isValid()).toBe(false);
            });

            it('returns false if no selectedDatasourceDefinition', function() {
                WidgetConfiguratorController.selectedDatasourceDefinition = false;
                expect(WidgetConfiguratorController.isValid()).toBe(false);
            });

            it('returns false if widget form not valid', function() {
                scope.widgetForm.$valid = false;
                expect(WidgetConfiguratorController.isValid()).toBe(false);
            });

            it('returns false if datasource form not valid', function() {
                scope.datasourceForm.$valid = false;
                expect(WidgetConfiguratorController.isValid()).toBe(false);
            });

            it('returns true if all are valid', function() {
                expect(WidgetConfiguratorController.isValid()).toBe(true);
            });

        });

        describe('when the widget selection changes to', function() {

            describe('a widget', function() {
                beforeEach(function() {
                    spyOn(DatasourceService, 'getDatasourceDefinitionsForType');

                    WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[0];
                    WidgetConfiguratorController.changeWidget();
                });

                it('sets the widget options to the widget\'s defaults', function() {
                    expect(WidgetConfiguratorController.widgetOptions).toEqual(angular.extend({selectedSize: 'half'}, mockObjects.widgetDefinitions[0].defaultOptions));
                });
            });

            describe('no widget', function() {
                beforeEach(function() {
                    WidgetConfiguratorController.selectedWidgetDefinition = null;
                    WidgetConfiguratorController.changeWidget();
                });

                it('sets the widget options to the default ones', function() {
                    expect(WidgetConfiguratorController.widgetOptions).toEqual({selectedSize: 'half'});
                });
            });
        });

        describe('when the datasource selection changes to', function() {

            describe('a datasource', function() {
                beforeEach(function() {
                    spyOn(WidgetService, 'getWidgetDefinitionsForType');

                    WidgetConfiguratorController.selectedDatasourceDefinition = mockObjects.datasourceDefinitions[0];
                    WidgetConfiguratorController.changeDatasource();
                });

                it('filters the list of widgets by the datasource\'s type', function() {
                    expect(WidgetService.getWidgetDefinitionsForType).toHaveBeenCalledWith(mockObjects.datasourceDefinitions[0].type);
                });

                it('sets the datasource options to the datasource\'s default ones', function() {
                    expect(WidgetConfiguratorController.datasourceOptions).toEqual(mockObjects.datasourceDefinitions[0].get.request.defaultOptions);
                });

                it('deselects the current widget if it is a different type', function() {
                    WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[1];
                    WidgetConfiguratorController.changeDatasource();
                    expect(WidgetConfiguratorController.selectedWidgetDefinition).toBeNull();
                });
            });

            describe('no datasource', function() {
                beforeEach(function() {
                    WidgetConfiguratorController.selectedDatasourceDefinition = null;
                    WidgetConfiguratorController.changeDatasource();
                });

                it('sets the list of widgets to all available widgets', function() {
                    expect(WidgetConfiguratorController.widgets).toEqual(mockObjects.widgetDefinitions);
                });

                it('sets the datasource options to an empty object', function() {
                    expect(WidgetConfiguratorController.datasourceOptions).toEqual({});
                });
            });

            it('sets datasource options to an empty object with defaultOptions undefined (bug)', function() {
                WidgetConfiguratorController.selectedDatasource = {
                    "id": "badts-ds",
                    "name": "BadTimeSeriesDS",
                    "url": "thiswontwork",
                    "type": "timeseries",
                    "get": {
                        "request": {},
                        "response": {}
                    }
                };
                WidgetConfiguratorController.changeDatasource();
                expect(WidgetConfiguratorController.datasourceOptions).toEqual({});
            });
        });

        describe('size selected', function() {

            it('both return false when neither selected', function() {
                expect(WidgetConfiguratorController.isHalfSelected()).toBe(false);
                expect(WidgetConfiguratorController.isFullSelected()).toBe(false);
            });

            it('isHalfSelected is true if half', function() {
                WidgetConfiguratorController.widgetOptions.selectedSize = 'half';
                expect(WidgetConfiguratorController.isHalfSelected()).toBe(true);
                expect(WidgetConfiguratorController.isFullSelected()).toBe(false);
            });

            it('isFullSelected is true if full', function() {
                WidgetConfiguratorController.widgetOptions.selectedSize = 'full';
                expect(WidgetConfiguratorController.isHalfSelected()).toBe(false);
                expect(WidgetConfiguratorController.isFullSelected()).toBe(true);
            });

            it('to full size, changing widget selection will not change selected size', function() {
                //set widget size to full
                WidgetConfiguratorController.widgetOptions.selectedSize = 'full';
                WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[1];
                WidgetConfiguratorController.changeWidget();
                WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[0];
                WidgetConfiguratorController.changeWidget();
                expect(WidgetConfiguratorController.widgetOptions).toEqual(angular.extend({selectedSize: 'full'}, mockObjects.widgetDefinitions[0].defaultOptions));
            });

            it('to half size, changing widget selection will not change selected size', function() {
                //set widget size to full
                WidgetConfiguratorController.widgetOptions.selectedSize = 'half';
                WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[1];
                WidgetConfiguratorController.changeWidget();
                WidgetConfiguratorController.selectedWidgetDefinition = mockObjects.widgetDefinitions[0];
                WidgetConfiguratorController.changeWidget();
                expect(WidgetConfiguratorController.widgetOptions).toEqual(angular.extend({selectedSize: 'half'}, mockObjects.widgetDefinitions[0].defaultOptions));
            });

        });
    });
});
