define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    mockObjects = angular.copy(mockObjects);

    describe('The WidgetService', function() {
        var WidgetService;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_WidgetService_) {
            WidgetService = _WidgetService_;
        }));

        describe('before having its widget definitions set', function() {
            it('can set its list of widget definitions', function() {
                expect(WidgetService.getAllWidgetDefinitions().length).toBe(0);

                WidgetService.setWidgetDefinitions(mockObjects.widgetDefinitions);

                expect(WidgetService.getAllWidgetDefinitions().length).toBe(2);
            });
        });

        describe('after having its widget definitions set', function() {
            beforeEach(function() {
                WidgetService.setWidgetDefinitions(mockObjects.widgetDefinitions);
            });

            it('gets an array of widgets of only the specified type when getting widgets by type', function() {
                var timeSeriesWidgets = WidgetService.getWidgetDefinitionsForType('time-series');
                var someTypeWidgets = WidgetService.getWidgetDefinitionsForType('some-type');

                expect(timeSeriesWidgets.length).toBe(1);
                expect(timeSeriesWidgets[0].type).toEqual('time-series');
                expect(someTypeWidgets.length).toBe(1);
                expect(someTypeWidgets[0].type).toEqual('some-type');
            });

            it('gets an empty array when trying to get widgets for a type that has no widgets', function() {
                expect(WidgetService.getWidgetDefinitionsForType('xx')).toEqual([]);
            });

            it('can get a list of all widgets', function() {
                WidgetService.setWidgetDefinitions(mockObjects.widgetDefinitions);
                expect(WidgetService.getAllWidgetDefinitions()).toEqual(mockObjects.widgetDefinitions);
            });
        });

        describe('can build widget instance', function(){
            it('with datasource, datasourceOptions, widget, widgetOptions', function(){

                var mockWidgetOption = {title:'title', message: 'message', color: 'green', selectedSize: 'HalfPage'};
                var mockDatasourceOption = {sampleRate: '10', sampleRate2: '20'};
                var mockWidgetInstance = {
                    cardId: 'v-hello-world',
                    name: 'Hello World',
                    type: 'some-type',
                    size: 'HalfPage',
                    cardVersion: "1.0.0",
                    options: mockWidgetOption,
                    datasource: {
                        id: 'context.ds.2',
                        name: 'Temperature',
                        type: 'time-series',
                        options: mockDatasourceOption
                    }
                };

                var widget = WidgetService.buildWidgetInstance(mockObjects.datasourceDefinitions[1], mockDatasourceOption, mockObjects.widgetDefinitions[1], mockWidgetOption);

                expect(widget).toEqual(mockWidgetInstance);
            });

        });

    });
});