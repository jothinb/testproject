define(['angular', 'angular-mocks'], function(angular) {
    describe('The WidgetLoaderService', function() {
        var WidgetService;
        var WidgetLoaderService;

        beforeEach(module('predix.configurable-dashboard', 'predix.dashboard.widgets'));

        beforeEach(function() {
            angular.module('myTestModule', ['predix.configurable-dashboard', 'predix.dashboard.widgets'])
                .config(function(WidgetLoaderServiceProvider) {
                    WidgetLoaderServiceProvider.loadWidgetsFrom([
                        '/my/location/1',
                        {
                            folderPath: 'my/location/2/'
                        },
                        {
                            folderPath: 'my/location/3',
                            main: 'myMain.js'
                        },
                        {
                            folderPath: 'my/location/4',
                            schema: 'mySchema.json'
                        }
                    ]);
                });
            module('myTestModule');
        });

        beforeEach(inject(function(_WidgetLoaderService_, _WidgetService_) {
            WidgetLoaderService = _WidgetLoaderService_;
            WidgetService = _WidgetService_;
        }));

        beforeEach(function() {
            spyOn(window, 'require').andCallFake(function(dependencies, callback) {
                callback('my', 'widgets');
            });
            spyOn(WidgetService, 'setWidgetDefinitions');

            WidgetLoaderService.loadWidgets();
        });

        describe('normalizing the folder path', function() {
            it('will remove a preceding /', function() {
                expect(window.require.calls[0].args[0]).toContain('my/location/1/main');
            });

            it('will remove a trailing /', function() {
                expect(window.require.calls[0].args[0]).toContain('my/location/2/main');
            });
        });

        it('will use the specified main file', function() {
            expect(window.require.calls[0].args[0]).toContain('my/location/3/myMain');
        });

        it('will use main.js as the main file if one isn\'t specified', function() {
            expect(window.require.calls[0].args[0]).toContain('my/location/2/main');
        });

        it('will use the specified schema file', function() {
            expect(window.require.calls[1].args[0]).toContain('json!my/location/4/mySchema.json');
        });

        it('will use schema.json as the schema file if one isn\'t specified ', function() {
            expect(window.require.calls[1].args[0]).toContain('json!my/location/3/schema.json');
        });

        it('loads widgets on to the page', function() {
            expect(window.require.calls[0].args[0]).toEqual(['my/location/1/main', 'my/location/2/main', 'my/location/3/myMain', 'my/location/4/main'], jasmine.any(Function));
        });

        it('loads widget schemas', function() {
            expect(window.require.calls[1].args[0]).toEqual(['json!my/location/1/schema.json', 'json!my/location/2/schema.json', 'json!my/location/3/schema.json', 'json!my/location/4/mySchema.json'], jasmine.any(Function));
        });

        it('sets the WidgetService\'s widget definitions', function() {
            expect(WidgetService.setWidgetDefinitions).toHaveBeenCalledWith(['my', 'widgets']);
        });
    });
});