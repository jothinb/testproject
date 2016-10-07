define(['angular', '../../module', 'vruntime'], function(angular, module, vRuntime) {

    function isWidgetInstanceValid(widgetInstance) {
        if(!widgetInstance || !widgetInstance.cardId || !widgetInstance.options) {
            window.logger.error("widget instance missing id or options");
            return false;
        }
        if(!widgetInstance.datasource || !widgetInstance.datasource.id || !widgetInstance.datasource.options) {
            window.logger.error("widget instance missing datasource.id or datasource.options");
            return false;
        }
        return true;
    }

    function handleWidgetRenderingError(fullErrorMessage, DashboardAlertService) {
        window.logger.error(fullErrorMessage);
        DashboardAlertService.addAlert({
            msg: vRuntime.messages('dashboard.widgetrenderer.error')
        });
    }

    function getStaticAttributes(widgetDefinition, widgetOptions) {
        var properties = {};
        if(widgetDefinition && widgetDefinition.schema) {
            var widgetSchema = widgetDefinition.schema.properties;
            if (widgetSchema) {
                for (var prop in widgetSchema) {
                    if(widgetOptions.hasOwnProperty(prop)) {
                        properties[prop] = {
                            'initialize': widgetOptions[prop],
                            'dsconfig': false
                        };
                    }
                    else {
                        window.logger.info(prop+' not initialized - assuming not required');
                    }
                }
            }
        }
        else {
            window.logger.info("widgetDefinition does not have schema.properties - assuming none");
        }
        return properties;
    }

    function getDynamicAttributes(datasourceDefinition) {
        var properties = {};
        if(datasourceDefinition && datasourceDefinition.get && datasourceDefinition.get.response &&
            datasourceDefinition.get.response.schema) {
            var datasourceSchema = datasourceDefinition.get.response.schema.properties;
            if (datasourceSchema) {
                for (var prop in datasourceSchema) {
                    properties[prop] = {
                        'initialize': '',
                        'dsconfig': true
                    };
                }
            }
        }
        else {
            window.logger.info("datasource definition does not have get.response.schema.properties - assuming none");
        }
        return properties;
    }

    function getAllAttributes(widgetDefinition, widgetOptions, datasourceDefinition) {
        var staticAttributes = getStaticAttributes(widgetDefinition, widgetOptions);
        var dynamicAttributes = getDynamicAttributes(datasourceDefinition);
        return angular.extend({}, staticAttributes, dynamicAttributes);
    }

    function initializeAllScopeProperties(attributes, $scope) {
        for(var attribute in attributes) {
            $scope[attribute] = attributes[attribute].initialize;
        }
    }

    function createDatasourceAndFetchData(attributes, $scope, widgetId, datasourceId, datasourceUrl,
                                          index, directiveBinder, datasourceOptions) {

        // creating a unique id for the v datasource using the datasource and widget ids and index
        // (this way we don't create it every time, datasource.create handles fetching it if it already exists)
        var vDatasourceId = datasourceId + widgetId + index;

        $scope._id = vDatasourceId;
        $scope._datasourceConfig = {};

        for(var attribute in attributes) {
            if(attributes[attribute].dsconfig) {
                $scope._datasourceConfig[attribute] = attribute;
            }
        }

        var tmp = vRuntime.datasource.create(vDatasourceId, datasourceUrl, {});

        directiveBinder.bind($scope, tmp);

        tmp.trigger("FETCH", {
            urlParamsObj: datasourceOptions
        });
    }


    function addWidgetMarkup(id, attributes, SlugService, $scope, $sce, $sanitize) {
        var markup = '';

        var widgetTag = $sanitize(id);
        var templateTagStart = '<' + widgetTag;
        var templateTagEnd = '></' + widgetTag + '>';

        for(var attribute in attributes) {
            var sanitizedAttribute = $sanitize(attribute);
            markup += ' data-' + SlugService.makeAngularSlug(sanitizedAttribute) + '="' + sanitizedAttribute + '"';
        }

        markup = templateTagStart + markup + templateTagEnd;

        $scope.markup = $sce.trustAsHtml(markup);
    }

    module.controller('WidgetRendererController',
        function($scope, $sce, $sanitize, directiveBinder, WidgetService, DatasourceService, SlugService, DashboardAlertService) {

        if(!isWidgetInstanceValid($scope.widgetInstance)) {
            handleWidgetRenderingError('widgetInstance is not valid - cannot render widget', DashboardAlertService);
            return;
        }

        var widgetId = $scope.widgetInstance.cardId;
        var datasourceId = $scope.widgetInstance.datasource.id;
        var widgetOptions = $scope.widgetInstance.options;
        var datasourceOptions = $scope.widgetInstance.datasource.options;

        var widgetDefinition = WidgetService.getWidgetDefinitionById(widgetId);
        var datasourceDefinition = DatasourceService.getDatasourceDefinitionById(datasourceId);

        if(!widgetDefinition) {
            handleWidgetRenderingError('widget definition was not found - cannot render widget', DashboardAlertService);
            return;
        }
        if(!datasourceDefinition) {
            handleWidgetRenderingError('datasource definition was not found - cannot render widget', DashboardAlertService);
            return;
        }

        var attributes = getAllAttributes(widgetDefinition, widgetOptions, datasourceDefinition);

        initializeAllScopeProperties(attributes, $scope);

        createDatasourceAndFetchData(attributes, $scope, widgetId, datasourceId, datasourceDefinition.url,
            $scope.index, directiveBinder, datasourceOptions);

        addWidgetMarkup(widgetId, attributes, SlugService, $scope, $sce, $sanitize);

    });

    return module;
});