define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.controller('WidgetConfiguratorController', function($scope, $log, WidgetConfiguratorService) {
        // Initialize all the variables
        // Make sure you add an entry to clearSelections() to reset any exposed variables you add.
        this.datasources = [];
        this.widgets = [];
        this.selectedDatasourceDefinition = null;
        this.selectedWidgetDefinition = null;
        this.datasourceOptions = {};
        this.widgetOptions = {};

        this.onModalHide = function() {
            clearSelections();
        }.bind(this);

        var clearSelections = function() {
            this.datasources = [];
            this.widgets = [];
            this.selectedDatasourceDefinition = null;
            this.selectedWidgetDefinition = null;
            this.datasourceOptions = {};
            this.widgetOptions = {};
        }.bind(this);

        this.onModalShow = function() {
            this.datasources = WidgetConfiguratorService.getAllDatasourceDefinitions();
            this.widgets = WidgetConfiguratorService.getAllWidgetDefinitions();
            if (WidgetConfiguratorService.isEditMode()) {
                loadSavedDatasourceAndWidget();
            }
        }.bind(this);

        var loadSavedDatasourceAndWidget = function() {
            this.selectedDatasourceDefinition = WidgetConfiguratorService.getSavedWidgetDatasourceDefinition();
            this.changeDatasource();
            this.datasourceOptions = WidgetConfiguratorService.getSavedWidgetDatasourceOptions();

            this.selectedWidgetDefinition = WidgetConfiguratorService.getSavedWidgetDefinition();
            this.changeWidget();
            this.widgetOptions = WidgetConfiguratorService.getSavedWidgetOptions();
            this.widgetOptions.selectedSize = WidgetConfiguratorService.getSavedWidgetSize();
        }.bind(this);

        this.changeWidget = function() {
            var widgetOptions = {selectedSize: 'half'};

            //selected size could come from saved widget instance or last selected size
            if (this.widgetOptions.selectedSize){
                widgetOptions.selectedSize = this.widgetOptions.selectedSize;
            }

            // if a widget was selected and not the 'choose a widget type' text
            if (this.selectedWidgetDefinition) {
                // set the widget options to the widget's default options
                widgetOptions = angular.extend({}, widgetOptions, this.selectedWidgetDefinition.defaultOptions);
            }

            this.widgetOptions = angular.copy(widgetOptions);
        };

        this.changeDatasource = function() {
            var datasourceOptions = {};

            //if a datasource was selected and not the 'choose a data source' text
            if (this.selectedDatasourceDefinition) {

                //if the currently selected widget is of a different type, deselect it
                if (this.selectedWidgetDefinition && this.selectedWidgetDefinition.type !== this.selectedDatasourceDefinition.type) {
                    this.selectedWidgetDefinition = null;
                    this.changeWidget();
                }

                //filter the widgets
                if (this.selectedDatasourceDefinition.type) {
                    this.widgets = WidgetConfiguratorService.getWidgetDefinitionsForDatasource(this.selectedDatasourceDefinition);
                }
                else {
                    window.logger.info('datasource definition missing type');
                }
            } else {
                //otherwise show all the widgets
                this.widgets = WidgetConfiguratorService.getAllWidgetDefinitions();
            }

            //set the datasource options to the datasources default options
            if (this.selectedDatasourceDefinition && this.selectedDatasourceDefinition.get && this.selectedDatasourceDefinition.get.request && this.selectedDatasourceDefinition.get.request.defaultOptions) {
                datasourceOptions = this.selectedDatasourceDefinition.get.request.defaultOptions;
            }
            this.datasourceOptions = angular.copy(datasourceOptions);
        };

        this.getDatasourceSchema = function() {
            if (this.selectedDatasourceDefinition && this.selectedDatasourceDefinition.get &&
                this.selectedDatasourceDefinition.get.request && this.selectedDatasourceDefinition.get.request.schema) {
                return this.selectedDatasourceDefinition.get.request.schema;
            }
            else {
                window.logger.info("datasource definition does not have get.request.schema");
                return null;
            }
        };

        this.getWidgetSchema = function() {
            if (this.selectedWidgetDefinition && this.selectedWidgetDefinition.schema) {
                return this.selectedWidgetDefinition.schema;
            }
            else {
                window.logger.info("widget definition does not have schema");
                return null;
            }
        };

        this.isHalfSelected = function() {
            return this.widgetOptions.selectedSize == "half";
        };

        this.isFullSelected = function() {
            return this.widgetOptions.selectedSize == "full";
        };

        this.isValid = function() {
            if (this.selectedDatasourceDefinition && this.selectedWidgetDefinition && $scope.widgetForm.$valid && $scope.datasourceForm.$valid) {
                return true;
            }
            return false;
        };

        this.save = function() {
            $scope.$broadcast('schemaFormValidate');

            if (this.isValid()) {
                WidgetConfiguratorService.save(this.selectedDatasourceDefinition, this.datasourceOptions, this.selectedWidgetDefinition, this.widgetOptions);
            }
            else {
                window.logger.error('Error when adding a widget - the datasource form or the widget form is invalid.');
            }
        };
    });
});