define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.factory('WidgetService', function(DashboardSettingsService) {
        var widgetDefinitions = [];

        function setWidgetDefinitions(definitions) {
            widgetDefinitions = definitions;
        }

        function getWidgetDefinitionById(id) {
            for (var index in widgetDefinitions) {
                if (widgetDefinitions[index].id == id) {
                    return widgetDefinitions[index];
                }
            }
            return null;
        }

        function getWidgetDefinitionsForType(type) {
            return widgetDefinitions.filter(function(widgetDefinition) {
                return widgetDefinition.type === type;
            });
        }

        function getAllWidgetDefinitions() {
            return widgetDefinitions;
        }

        function buildWidgetInstance(datasource, datasourceOptions, widget, widgetOptions) {
            return {
                cardId: widget.id,
                name: widget.name,
                type: widget.type,
                size: widgetOptions.selectedSize,
                cardVersion: "1.0.0",
                options: widgetOptions,
                datasource: {
                    id: datasource.id,
                    name: datasource.name,
                    type: datasource.type,
                    options: datasourceOptions
                }
            };
        }

        return {
            setWidgetDefinitions: setWidgetDefinitions,
            getWidgetDefinitionById: getWidgetDefinitionById,
            getWidgetDefinitionsForType: getWidgetDefinitionsForType,
            getAllWidgetDefinitions: getAllWidgetDefinitions,
            buildWidgetInstance: buildWidgetInstance
        };
    });
});