define([], function () {
    'use strict';

    /** Tree Data **/
    var topLevelData = [
        {
            "name": "Mustang",
            "identifier": "001-1",
            "nodeIdentifier": "0:001-1",
            "hasChildren": true,
            "entity": true,
            "entityType": 'top',
            "category": 'parent'
        },
        {
            "name": "Sandy",
            "identifier": "001-2",
            "nodeIdentifier": "0:001-2",
            "hasChildren": true,
            "entity": true,
            "entityType": 'top',
            "category": 'parent'
        },
        {
            "name": "Nothing",
            "identifier": "001-3",
            "nodeIdentifier": "0:001-3",
            "hasChildren": true,
            "entity": true,
            "entityType": 'top',
            "category": 'parent'
        }
    ];
    var secondLevelData = [
        {
            "name": "Wheels",
            "identifier": "001-1-1",
            "nodeIdentifier": "1:001-1-1",
            "hasChildren": true,
            "entity": true,
            "entityType": '2nd',
            "category": 'top'
        },
        {
            "name": "Brakes",
            "identifier": "001-1-2",
            "nodeIdentifier": "1:001-1-2",
            "hasChildren": true,
            "entity": true,
            "entityType": '2nd',
            "category": 'top'
        }
    ];
    var thirdLevelData = [
        {
            "name": "ThirdLevel",
            "identifier": "001-1-1-1",
            "nodeIdentifier": "2:001-1-1-1",
            "hasChildren": true,
            "entity": false,
            "entityType": '3rd',
            "category": '2nd'
        },
        {
            "name": "ThirdLevelV2",
            "identifier": "001-1-1-1",
            "nodeIdentifier": "2:001-1-1-1",
            "hasChildren": true,
            "entity": false,
            "entityType": '3rd',
            "category": '2nd'
        }
    ];
    var fourthLevelData = [
        {
            "name": "4thLevel",
            "identifier": "001-1-1-1",
            "nodeIdentifier": "2:001-1-1-1",
            "hasChildren": true,
            "entity": false,
            "entityType": '4th',
            "category": '3rd'
        }
    ];
    var anotherThirdLevelData = [
        {
            "name": "4thLevelAnother",
            "identifier": "001-1-2-1",
            "nodeIdentifier": "2:001-1-2-1",
            "hasChildren": true,
            "entity": false,
            "entityType": '4th',
            "category": '3rd'
        }
    ];
    var anotherSecondLevelData = [
        {
            "name": "Another3rdLevel",
            "identifier": "001-1-2-1",
            "nodeIdentifier": "2:001-1-2-1",
            "hasChildren": true,
            "entity": false,
            "entityType": '3rd',
            "category": '2nd'
        }
    ];

    var context = {
        id: 'my.context',
        name: 'first context',
        datasources: [
            {
                id: 'my.context.ds.1',
                name: 'Datasource 1',
                url: 'http://my.datasource.com',
                type: 'time-series'
            }
        ],
        views: [
            {
                id: 'context.view1',
                name: 'View 0',
                cards: [
                    {
                        type: 'time-series',
                        cardId: 'v-hello-world',
                        size: 'full',
                        cardVersion: "1.0.0",
                        displayOrder: 1,
                        options:{
                            title: 'A',
                            message: 'B',
                            color: 'C'
                        },
                        datasource: {
                            id: 'context.ds.2',
                            name: 'ds3',
                            url: 'predix.com/data3',
                            type: 'time-series',
                            options: {
                                sampleRate: '10',
                                sampleRate2: '20',
                                value: 1,
                                message: 'message',
                                data: '1'
                            }
                        }
                    }
                ]
            },
            {
                id: 'context.view2',
                name: 'View 2',
                cards: [
                    {
                        type: 'time-series',
                        cardId: 'v-hello-world',
                        size: 'half',
                        cardVersion: "1.0.0",
                        displayOrder: 1,
                        options:{
                            title: 'A',
                            message: 'B',
                            color: 'C'
                        },
                        datasource: {
                            id: 'context.ds.2',
                            name: 'ds3',
                            url: 'predix.com/data3',
                            type: 'time-series',
                            options: {
                                sampleRate: '10',
                                sampleRate2: '20',
                                value: 1,
                                message: 'message',
                                data: '1'
                            }
                        },
                        "applicationCollectionId": "context.view2"
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'full',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 2,
                        options: {},
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    }
                ]
            },
            {
                id: 'context.view3',
                name: 'View 3',
                cards: [
                    {
                        cardId: 'v-hello-world',
                        size: 'half',
                        type: 'time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 1,
                        options:{
                            title: 'A',
                            message: 'B',
                            color: 'C'
                        },
                        datasource: {
                            id: 'context.ds.2',
                            name: 'ds3',
                            url: 'predix.com/data3',
                            type: 'time-series',
                            options: {
                                sampleRate: '10',
                                sampleRate2: '20',
                                value: 1,
                                message: 'message',
                                data: '1'
                            }
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'full',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 2,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'half',
                        type:' not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 3,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'full',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 4,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'half',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 5,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    }
                ]
            },
            {
                id: 'context.view4',
                name: 'View 4',
                cards: [
                    {
                        cardId: 'v-simplest-directive',
                        size: 'half',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 1,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'half',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 2,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'half',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 3,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    },
                    {
                        cardId: 'v-simplest-directive',
                        size: 'full',
                        type: 'not-time-series',
                        cardVersion: "1.0.0",
                        displayOrder: 4,
                        options: {
                        },
                        datasource: {
                            id: 'context.ds.1',
                            name: 'ds1',
                            url: 'predix.com/data1',
                            type: 'not-time-series',
                            options: {}
                        }
                    }
                ]
            }
        ]
    };

    var contextOneView = {
        id: 'my.context',
        name: 'first context',
        datasources: [
            {
                id: 'my.context.ds.1',
                name: 'Datasource 1',
                url: 'http://my.datasource.com',
                type: 'time-series'
            }
        ],
        views: [
            {
                id: 'context.view1',
                name: 'View 0',
                cards: [
                    {
                        cardId: 'my.context.ds.1.time-series',
                        size: 'full',
                        cardVersion: "1.0.0",
                        displayOrder: 1,
                        options:{
                            title: 'A',
                            message: 'B',
                            color: 'C'
                        },
                        datasource: {
                            id: 'my.context.ds.1',
                            name: 'ds3',
                            url: 'predix.com/data3',
                            type: 'time-series',
                            options: {}
                        }
                    }
                ]
            }
        ]
    };

    var simpleWidget = {
        id: 'v-simplest-directive',
        path: '/simple/simple.js',
        name: 'Simple Directive',
        type: 'time-series',
        schema: {
            type: 'object',
            properties: {
            },
            required: []
        },
        defaultOptions: {}
    };

    var complexWidget = {
        id: 'v-hello-world',
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
    };

    var widgetDefinitions = [
        simpleWidget,
        complexWidget
    ];

    var simpleDatasourceDefinition = {
        id: 'context.ds.1',
        name: "Temperature",
        url: "http://simpleds.com",
        type: "time-series",
        get: {
            request: {
                schema: {
                    type: "object",
                    properties: {
                    }
                },
                required: [],
                defaultOptions: {
                }
            },
            response: {
                schema: {
                    type: "object",
                    properties: {
                    }
                }
            }
        }
    };

    var complexDatasourceDefinition = {
        id: 'context.ds.2',
        name: "Temperature",
        url: "http://complexds.com",
        type: "time-series",
        get: {
            request: {
                schema: {
                    type: "object",
                    properties: {
                        sampleRate: {
                            type: "string",
                            title: "Sampling rate",
                            enum: ['10', '15', '30', '45', '60']
                        },
                        sampleRate2: {
                            type: "string",
                            title: "Sampling rate 2",
                            enum: ['10', '15', '30', '45', '60']
                        }
                    }
                },
                required: ['sampleRate', 'sampleRate2'],
                defaultOptions: {
                    startTime: 1000,
                    endTime: 2000
                }
            },
            response: {
                schema: {
                    type: "object",
                    properties: {
                        tableData: {
                            type: "array"
                        },
                        columns: {
                            type: "array"
                        }
                    }
                }
            }
        }
    };

    var differentTypeDatasourceDefinition = {
        id: 'context.ds.1',
        name: "Temperature",
        url: "http://simpleds.com",
        type: "some-type",
        get: {
            request: {
                schema: {
                    type: "object",
                    properties: {
                    }
                },
                required: [],
                defaultOptions: {
                }
            },
            response: {
                schema: {
                    type: "object",
                    properties: {
                    }
                }
            }
        }
    };

    var datasourceDefinitions = [
        simpleDatasourceDefinition,
        complexDatasourceDefinition,
        differentTypeDatasourceDefinition
    ];


    var viewDefinition = {
        id: "123",
        name: "New View",
        cards: []
    };

    var createViewServiceResponse = {name:"newViewName",cards:null,description:null,id:"newViewId"};

    return {
        context: context,
        contextOneView: contextOneView,
        widgetDefinitions: widgetDefinitions,
        datasourceDefinitions: datasourceDefinitions,
        viewDefinition: viewDefinition,
        createViewServiceResponse: createViewServiceResponse,
        topLevelData: topLevelData,
        secondLevelData: secondLevelData,
        thirdLevelData: thirdLevelData,
        fourthLevelData: fourthLevelData,
        anotherThirdLevelData: anotherThirdLevelData,
        anotherSecondLevelData: anotherSecondLevelData
    };
});