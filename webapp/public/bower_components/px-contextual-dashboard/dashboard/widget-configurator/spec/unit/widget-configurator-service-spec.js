define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    //make a copy for testing
    mockObjects = angular.copy(mockObjects);

    describe('The WidgetConfiguratorService', function() {
        var WidgetConfiguratorService;
        var CurrentStateService;
        var EditModeService;
        var WidgetService;
        var DatasourceService;
        var datasourceDefinitions = mockObjects.datasourceDefinitions;
        var widgetDefinitions = mockObjects.widgetDefinitions;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function(_WidgetConfiguratorService_, _CurrentStateService_, _EditModeService_, _WidgetService_, _DatasourceService_) {
            WidgetConfiguratorService = _WidgetConfiguratorService_;
            CurrentStateService = _CurrentStateService_;
            EditModeService = _EditModeService_;
            WidgetService = _WidgetService_;
            DatasourceService = _DatasourceService_;

            var context = mockObjects.context;
            CurrentStateService.setContext(context);
            CurrentStateService.setView(context.views[0]);

            EditModeService.enterEditMode();

            setFixtures(sandbox({
                id: 'test-container'
            }));

            var $testContainer = $("#test-container");
            $testContainer.append('<div id="mydiv"><widget-configurator id="widget-selector" class="modal fade"><div class="modal-dialog"></div></widget-configurator></div>');

            spyOn(EditModeService, "setWidgetIndex");
            spyOn(EditModeService, "setWidgetIndexToLast");
            spyOn(EditModeService, "updateWidget");
            spyOn(EditModeService, "addWidget");
            spyOn(EditModeService, "getViewWorkingCopy").andReturn(context.views[1]);

            spyOn(DatasourceService, 'getAllDatasourceDefinitions').andReturn(datasourceDefinitions);
            spyOn(DatasourceService, 'getDatasourceDefinitionById').andReturn(datasourceDefinitions[0]);

            spyOn(WidgetService, 'getAllWidgetDefinitions').andReturn(widgetDefinitions);
            spyOn(WidgetService, 'getWidgetDefinitionById').andReturn(widgetDefinitions[1]);
            spyOn(WidgetService, "getWidgetDefinitionsForType").andReturn(widgetDefinitions);
        }));

        describe('should return modal instance', function() {
            it('by invoke getModalInstance', function() {
                expect(WidgetConfiguratorService.getModalInstance().modal).toBeDefined();
            });
        });

        describe('When WidgetConfiguratorService is in update mode', function() {
            beforeEach(function() {
                modalInstance = WidgetConfiguratorService.getModalInstance();
                spyOn(modalInstance, "modal");

                WidgetConfiguratorService.openModalInEditMode(1);
            });

            it('expect widgetIndex is set', function() {
                expect(WidgetConfiguratorService.getWidgetIndex()).toBe(1);
            });

            it('expect setting EditModeService widgetIndex', function() {
                expect(EditModeService.setWidgetIndex).toHaveBeenCalledWith(1);
            });

            it('expect modal dialog to be open by calling modal("show")', function() {
                expect(modalInstance.modal).toHaveBeenCalledWith('show');
            });

            it('expect to return edit mode true', function() {
                expect(WidgetConfiguratorService.isEditMode()).toBe(true);
            });

            it('expect to save widget by invoke EditModeService.updateWiget', function(){
                var mockDatasourceOption = {sampleRate: 10};
                var mockWidgetOption = {lable: 'test'};
                WidgetConfiguratorService.save(mockObjects.datasourceDefinition, mockDatasourceOption, mockObjects.widgetDefinitions[0], mockWidgetOption);
                expect(EditModeService.updateWidget).toHaveBeenCalledWith(1, mockObjects.datasourceDefinition, mockDatasourceOption, mockObjects.widgetDefinitions[0], mockWidgetOption);
                expect(EditModeService.addWidget).not.toHaveBeenCalled();
            });

            it('can get the saved widget\'s widget definition', function() {
                expect(WidgetConfiguratorService.getSavedWidgetDefinition()).toEqual(widgetDefinitions[1]);
            });

            it('can get the saved widget\'s widget options', function() {
                expect(WidgetConfiguratorService.getSavedWidgetOptions()).toEqual(mockObjects.context.views[1].cards[1].options);
            });

            it('can get the saved widget\'s size', function() {
                expect(WidgetConfiguratorService.getSavedWidgetSize()).toEqual(mockObjects.context.views[1].cards[1].size);
            });

            it('can get the saved widget\'s datasource definition', function() {
                expect(WidgetConfiguratorService.getSavedWidgetDatasourceDefinition()).toEqual(datasourceDefinitions[0]);
            });

            it('can get the saved widget\'s datasource options', function() {
                expect(WidgetConfiguratorService.getSavedWidgetDatasourceOptions()).toEqual(mockObjects.context.views[1].cards[1].datasource.options);
            });

            it('has a copy of the saved widget, not the actual instance', function() {
                expect(WidgetConfiguratorService.getSavedWidgetDatasourceOptions()).not.toBe(datasourceDefinitions[0]);
            });
        });

        describe('When WidgetConfiguratorService is in add mode with index', function() {
            beforeEach(function() {
                modalInstance = WidgetConfiguratorService.getModalInstance();
                spyOn(modalInstance, "modal");
            });

            it('works when the index is 0', function() {
                WidgetConfiguratorService.openModalInAddMode(0);
                expect(WidgetConfiguratorService.getWidgetIndex()).toBe(1);
            });

            it('expect widgetIndex is set to one more than the index', function() {
                WidgetConfiguratorService.openModalInAddMode(1);
                expect(WidgetConfiguratorService.getWidgetIndex()).toBe(2);
            });

            it('expect setting EditModeService widgetIndex', function() {
                WidgetConfiguratorService.openModalInAddMode(1);
                expect(EditModeService.setWidgetIndex).toHaveBeenCalledWith(2);
            });

            it('expect modal dialog to be open by calling modal("show")', function() {
                WidgetConfiguratorService.openModalInAddMode(1);
                expect(modalInstance.modal).toHaveBeenCalledWith('show');
            });

            it('expect to return edit mode false', function() {
                WidgetConfiguratorService.openModalInAddMode(1);
                expect(WidgetConfiguratorService.isEditMode()).toBe(false);
            });

            it('expect to save widget by invoke EditModeService.addWidget', function() {
                WidgetConfiguratorService.openModalInAddMode(1);
                var mockDatasourceOption = {sampleRate: 10};
                var mockWidgetOption = {lable: 'test'};
                WidgetConfiguratorService.save(mockObjects.datasourceDefinition, mockDatasourceOption, mockObjects.widgetDefinitions[0], mockWidgetOption);
                expect(EditModeService.updateWidget).not.toHaveBeenCalled();
                expect(EditModeService.addWidget).toHaveBeenCalledWith(mockObjects.datasourceDefinition, mockDatasourceOption, mockObjects.widgetDefinitions[0], mockWidgetOption);
            });
        });

        describe('When WidgetConfiguratorService is in add mode without index', function() {
            beforeEach(function() {
                modalInstance = WidgetConfiguratorService.getModalInstance();
                spyOn(modalInstance, "modal");
                WidgetConfiguratorService.openModalInAddMode(null);
            });

            it('expect widgetIndex is set', function() {
                expect(WidgetConfiguratorService.getWidgetIndex()).toBe(null);
            });

            it('expect setting EditModeService setWidgetIndexToLast', function() {
                expect(EditModeService.setWidgetIndex).not.toHaveBeenCalled();
                expect(EditModeService.setWidgetIndexToLast).toHaveBeenCalled();
            });

            it('expect modal dialog to be open by calling modal("show")', function() {
                expect(modalInstance.modal).toHaveBeenCalledWith('show');
            });

            it('expect to return edit mode false', function() {
                expect(WidgetConfiguratorService.isEditMode()).toBe(false);
            });
        });

        it('defers to the DatasourceService to get all the datasource definitions', function() {
            WidgetConfiguratorService.getAllDatasourceDefinitions();
            expect(DatasourceService.getAllDatasourceDefinitions).toHaveBeenCalled();
        });

        it('defers to the WidgetService to get all the widget definitions', function() {
            WidgetConfiguratorService.getAllWidgetDefinitions();
            expect(WidgetService.getAllWidgetDefinitions).toHaveBeenCalled();
        });

    });
});