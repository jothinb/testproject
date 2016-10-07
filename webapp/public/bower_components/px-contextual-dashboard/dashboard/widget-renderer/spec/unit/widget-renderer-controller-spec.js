define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'vruntime', 'angular-mocks'], function(angular, mockObjects) {
    'use strict';

    describe('The WidgetRendererController', function () {

        beforeEach(module('predix.configurable-dashboard'));

        var $controller, controller, scope, WidgetRendererController, WidgetService, DatasourceService, directiveBinder, $sce;

        var myFakeDS = {
            trigger: function() {}
        };

        beforeEach(inject(function ($injector, _WidgetService_, _DatasourceService_, _$sce_, _directiveBinder_) {
            spyOn(window.logger, 'error');
            spyOn(window.logger, 'info');

            var $rootScope = $injector.get('$rootScope');
            WidgetService = _WidgetService_;
            DatasourceService = _DatasourceService_;
            $sce = _$sce_;
            directiveBinder = _directiveBinder_;
            scope = new $rootScope.$new();
            $controller = $injector.get('$controller');
        }));

        describe('when scope doesnt have expected information', function() {

            it('logs an error if no widgetInstance', function() {
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widgetInstance is not valid - cannot render widget');
            });

            it('logs an error if no widgetInstance.widget', function() {
                scope.widgetInstance = {
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widgetInstance is not valid - cannot render widget');
            });

            it('logs an error if no widgetInstance.datasource', function() {
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widgetInstance is not valid - cannot render widget');
            });

            it('logs an error if the widget definition cant be found', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(null);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid",
                        options: {

                        }
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widget definition was not found - cannot render widget');
            });

            it('logs an error if the datasource definition cant be found', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(null);
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('datasource definition was not found - cannot render widget');
            });

            it('logs to info and continues on if the widget definition is invalid', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn({});
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.info).toHaveBeenCalledWith('widgetDefinition does not have schema.properties - assuming none');
            });

            it('logs to info and continues on if the datasource definition is invalid', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn({});
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid",
                        options: {

                        }
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.info).toHaveBeenCalledWith('datasource definition does not have get.response.schema.properties - assuming none');
            });

            it('logs an error if widgetInstance does not have widgetOptions', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(null);
                scope.widgetInstance = {
                    id: 'different-widget',
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widgetInstance is not valid - cannot render widget');
            });

            it('logs an error if widgetInstance does not have datasourceOptions', function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(null);
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "dsid"
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
                expect(window.logger.error).toHaveBeenCalledWith('widgetInstance is not valid - cannot render widget');
            });
        });

        describe('if no static or datasource properties', function() {

            beforeEach(function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[0]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[0]);
                spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                spyOn(myFakeDS, 'trigger');
                spyOn(directiveBinder, 'bind');
                scope.widgetInstance = {
                    cardId: 'my-widget',
                    options: {},
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                scope.index = 0;
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
            });

            it('builds the markup on the scope with just the id as the tag', function() {
                expect(scope.markup.$$unwrapTrustedValue()).toEqual('<my-widget></my-widget>');
            });

            it('builds the _id and _datasourceConfig on the scope', function() {
                expect(scope._id).toEqual("dsidmy-widget0");
                expect(scope._datasourceConfig).toEqual({});
            });

            it('calls datasource.create', function() {
                expect(vRuntime.datasource.create).toHaveBeenCalledWith("dsidmy-widget0",
                    "http://simpleds.com", {});
                }
            );

        });

        describe('if several static and datasource properties but no datasourceOptions', function() {

            beforeEach(function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                spyOn(myFakeDS, 'trigger');
                spyOn(directiveBinder, 'bind');
                scope.index = 3;
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "mydatasource",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
            });

            it('builds the markup with the id as the tag and all the properties as attributes (slugified if needed)', function() {
                expect(scope.markup.$$unwrapTrustedValue()).toEqual('<different-widget data-title="title" ' +
                    'data-message="message" data-color="color" data-table-data="tableData" data-columns="columns"></different-widget>');
            });

            it('builds the _id using the datasourceid + widgetid + index', function() {
                expect(scope._id).toEqual("mydatasourcedifferent-widget3");
            });

            it('builds the _id and _datasourceConfig on the scope', function() {
                expect(scope._datasourceConfig).toEqual({
                    tableData: 'tableData',
                    columns: 'columns'
                });
            });

            it('sets scope properties', function() {
                expect(scope.title).toBe('My Title');
                expect(scope.message).toBe('A Message');
                expect(scope.color).toBe('green');
                expect(scope.tableData).toBe('');
                expect(scope.columns).toBe('');
            });

            it('creates a datasource to the provided url', function() {
                expect(vRuntime.datasource.create).toHaveBeenCalledWith("mydatasourcedifferent-widget3",
                    "http://complexds.com", {});
            });

            it('binds to the scope', function() {
                expect(directiveBinder.bind).toHaveBeenCalledWith(scope,myFakeDS);
            });

            it('triggers a fetch on that datasource', function() {
                expect(myFakeDS.trigger).toHaveBeenCalledWith("FETCH", {
                    urlParamsObj: {}
                });
            });

        });

        describe('if several static and datasource properties and there are datasource options', function() {

            var mydsoptions = {
                option1: "boo",
                anotherOption: "hereitis"
            };

            beforeEach(function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                spyOn(myFakeDS, 'trigger');
                spyOn(directiveBinder, 'bind');
                scope.index = 3;
                scope.widgetInstance = {
                    cardId: 'different-widget',
                    options: {
                        title: "My Title",
                        message: "A Message",
                        color: "green"
                    },
                    datasource: {
                        id: "mydatasource",
                        options: mydsoptions
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
            });

            it('creates a datasource to the provided url', function() {
                expect(vRuntime.datasource.create).toHaveBeenCalledWith("mydatasourcedifferent-widget3",
                    "http://complexds.com", {});
            });

            it('triggers a fetch on that datasource', function() {
                expect(myFakeDS.trigger).toHaveBeenCalledWith("FETCH", {
                    urlParamsObj: mydsoptions
                });
            });

        });

        describe('if malicious input', function() {

            describe('widget id (schema)', function() {
                var mydsoptions = {
                    option1: "boo",
                    anotherOption: "hereitis"
                };

                beforeEach(function() {
                    spyOn(WidgetService, 'getWidgetDefinitionById').andReturn({
                        id: '><script>alert(\'foo\')</script>',
                        name: 'Hello World',
                        path: '/hello/hello.js',
                        type: 'some-type',
                        schema: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    minLength: 2,
                                    title: 'Title'
                                },
                                message: {
                                    type: 'string',
                                    title: 'Message'
                                },
                                color: {
                                    type: 'string',
                                    title: 'Color'
                                }
                            },
                            required: ['title', 'message']
                        },
                        defaultOptions: {'title': 'Hello', 'message': 'World', 'color': 'color-green'}
                    });
                    spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                    spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                    spyOn(myFakeDS, 'trigger');
                    spyOn(directiveBinder, 'bind');
                    scope.index = 3;
                    scope.widgetInstance = {
                        cardId: '><script>alert(\'foo\')</script>',
                        options: {
                            title: "My Title",
                            message: "A Message",
                            color: "green"
                        },
                        datasource: {
                            id: "mydatasource",
                            options: mydsoptions
                        }
                    };
                    controller = $controller('WidgetRendererController', {
                        '$scope': scope
                    });
                });

                it('escapes the widget tag', function() {
                    expect(scope.markup.$$unwrapTrustedValue()).toContain('&gt;');
                });
            });

            describe('widget property (schema)', function() {
                var mydsoptions = {
                    option1: "boo",
                    anotherOption: "hereitis"
                };

                beforeEach(function() {
                    spyOn(WidgetService, 'getWidgetDefinitionById').andReturn({
                        id: 'different-widget',
                        name: 'Hello World',
                        path: '/hello/hello.js',
                        type: 'some-type',
                        schema: {
                            type: 'object',
                            properties: {
                                '><script>alert(\'foo\')</script>': {
                                    type: 'string',
                                    minLength: 2,
                                    title: 'Title'
                                },
                                message: {
                                    type: 'string',
                                    title: 'Message'
                                },
                                color: {
                                    type: 'string',
                                    title: 'Color'
                                }
                            },
                            required: ['title', 'message']
                        },
                        defaultOptions: {'title': 'Hello', 'message': 'World', 'color': 'color-green'}
                    });
                    spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                    spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                    spyOn(myFakeDS, 'trigger');
                    spyOn(directiveBinder, 'bind');
                    scope.index = 3;
                    scope.widgetInstance = {
                        cardId: 'different-widget',
                        options: {
                            '><script>alert(\'foo\')</script>': "My Title",
                            message: "A Message",
                            color: "green"
                        },
                        datasource: {
                            id: "mydatasource",
                            options: mydsoptions
                        }
                    };
                    controller = $controller('WidgetRendererController', {
                        '$scope': scope
                    });
                });

                it('escapes the directive attributes', function() {
                    expect(scope.markup.$$unwrapTrustedValue()).toContain('&gt;');
                });
            });

            describe('attributes in widget editor', function() {
                var mydsoptions = {
                    option1: "boo",
                    anotherOption: "hereitis"
                };

                beforeEach(function() {
                    spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                    spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                    spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                    spyOn(myFakeDS, 'trigger');
                    spyOn(directiveBinder, 'bind');
                    scope.index = 3;
                    scope.widgetInstance = {
                        cardId: 'different-widget',
                        options: {
                            title: "><script>alert(\'foo\')</script>",
                            message: "A Message",
                            color: "green"
                        },
                        datasource: {
                            id: "mydatasource",
                            options: mydsoptions
                        }
                    };
                    controller = $controller('WidgetRendererController', {
                        '$scope': scope
                    });
                });

                it('sets scope properties as is (Angular will sanitize)', function() {
                    expect(scope.title).toBe('><script>alert(\'foo\')</script>');
                    expect(scope.message).toBe('A Message');
                    expect(scope.color).toBe('green');
                    expect(scope.tableData).toBe('');
                    expect(scope.columns).toBe('');
                });
            });

        });

        describe('if static properties are not initialized (may or may not be required)', function() {

            beforeEach(function() {
                spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(mockObjects.widgetDefinitions[1]);
                spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(mockObjects.datasourceDefinitions[1]);
                spyOn(vRuntime.datasource, 'create').andReturn(myFakeDS);
                spyOn(myFakeDS, 'trigger');
                spyOn(directiveBinder, 'bind');

                scope.widgetInstance = {
                    cardId: 'missing-static',
                    options: {
                        title: "My Title"
                    },
                    datasource: {
                        id: "dsid",
                        options: {}
                    }
                };
                controller = $controller('WidgetRendererController', {
                    '$scope': scope
                });
            });

            it('builds the markup without the missing ones', function() {
                expect(scope.markup.$$unwrapTrustedValue()).toEqual('<missing-static data-title="title" ' +
                    'data-table-data="tableData" data-columns="columns"></missing-static>');
            });

            it('logs to info that skipping those properties', function() {
                expect(window.logger.info).toHaveBeenCalledWith('color not initialized - assuming not required');
                expect(window.logger.info).toHaveBeenCalledWith('message not initialized - assuming not required');
            });

            it('only initializes the properties that were setup', function() {
                expect(scope.title).toBe('My Title');
                expect(scope.message).toBeUndefined();
                expect(scope.color).toBeUndefined();
                expect(scope.tableData).toBe('');
                expect(scope.columns).toBe('');
            });

            it('still creates the datasource as expected', function() {
                expect(vRuntime.datasource.create).toHaveBeenCalledWith(jasmine.any(String),
                    "http://complexds.com", {});
            });

        });

    });
});