define(['angular', '../../module'], function(angular, module) {
    module.factory('WidgetConfiguratorService', function(EditModeService, WidgetService, DatasourceService) {
        var modalInstance = angular.element('#widget-selector');
        var editMode = false;
        var widgetIndex = null;
        var savedWidget = null;

        function getModalInstance() {
            return modalInstance;
        }

        function openModalInEditMode(index) {
            editMode = true;
            widgetIndex = index;
            EditModeService.setWidgetIndex(index);

            loadSavedWidget();

            modalInstance.modal('show');
        }

        function openModalInAddMode(index) {
            if (index == null) { // jshint ignore:line
                EditModeService.setWidgetIndexToLast();
            }
            else {
                index = index + 1;
                EditModeService.setWidgetIndex(index);
            }
            editMode = false;
            widgetIndex = index;
            modalInstance.modal('show');
        }

        function getWidgetIndex() {
            return widgetIndex;
        }

        function isEditMode() {
            return editMode;
        }

        function loadSavedWidget() {
            var viewWorkingCopy = EditModeService.getViewWorkingCopy();

            if (editMode && viewWorkingCopy.cards && widgetIndex in viewWorkingCopy.cards) {
                savedWidget = angular.copy(viewWorkingCopy.cards[widgetIndex]);
            } else {
                savedWidget = null;
            }
        }

        function save(selectedDatasource, datasourceOptions, selectedWidget, widgetOptions) {
            if (editMode) {
                EditModeService.updateWidget(widgetIndex, selectedDatasource, datasourceOptions, selectedWidget, widgetOptions);
            }
            else {
                EditModeService.addWidget(selectedDatasource, datasourceOptions, selectedWidget, widgetOptions);
            }
        }

        function getWidgetDefinitionsForDatasource(datasource) {
            return WidgetService.getWidgetDefinitionsForType(datasource.type);
        }

        function getAllDatasourceDefinitions() {
            return DatasourceService.getAllDatasourceDefinitions();
        }

        function getAllWidgetDefinitions() {
            return WidgetService.getAllWidgetDefinitions();
        }

        function getSavedWidgetDatasourceDefinition() {
            return DatasourceService.getDatasourceDefinitionById(savedWidget.datasource.id);
        }

        function getSavedWidgetDatasourceOptions() {
            if (savedWidget) {
                return savedWidget.datasource.options;
            } else {
                return null;
            }
        }

        function getSavedWidgetDefinition() {
            return WidgetService.getWidgetDefinitionById(savedWidget.cardId);
        }

        function getSavedWidgetOptions() {
            if (savedWidget) {
                return savedWidget.options;
            } else {
                return null;
            }
        }

        function getSavedWidgetSize() {
            if (savedWidget) {
                return savedWidget.size;
            } else {
                return null;
            }
        }

        return {
            save: save,
            isEditMode: isEditMode,
            getWidgetIndex: getWidgetIndex,
            getModalInstance: getModalInstance,
            openModalInEditMode: openModalInEditMode,
            openModalInAddMode: openModalInAddMode,
            getWidgetDefinitionsForDatasource: getWidgetDefinitionsForDatasource,
            getAllDatasourceDefinitions: getAllDatasourceDefinitions,
            getAllWidgetDefinitions: getAllWidgetDefinitions,
            getSavedWidgetDatasourceDefinition: getSavedWidgetDatasourceDefinition,
            getSavedWidgetDatasourceOptions: getSavedWidgetDatasourceOptions,
            getSavedWidgetDefinition: getSavedWidgetDefinition,
            getSavedWidgetOptions: getSavedWidgetOptions,
            getSavedWidgetSize: getSavedWidgetSize
        };
    });
});