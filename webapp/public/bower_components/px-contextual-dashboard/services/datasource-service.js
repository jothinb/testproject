define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    'use strict';

    module.provider('DatasourceService', function() {
        //default url
        var contextMetadataUrl = '(dashboardContextMetadata)';

        this.setContextMetadataUrl = function(url) {
            contextMetadataUrl = url;
        };

        this.$get = function($q, DashboardSettingsService) {
            var datasourceDefinitions = [];
            var contextMetadataDatasource = vRuntime.datasource.create("ContextMetadataDS", DashboardSettingsService.getHttpProtocol() + contextMetadataUrl, {});

            function getDatasourcesByContextId(contextId) {
                var defer = $q.defer();

                contextMetadataDatasource.getById(contextId + '/metadata', {type: 'Asset'})
                    .done(function(data) {
                        datasourceDefinitions = data;
                        defer.resolve(data);
                    }).fail(function() {
                        var errmsg = vRuntime.messages('dashboard.context.datasource.fetchfail');
                        window.logger.error(errmsg);
                        defer.reject(errmsg);
                    });

                return defer.promise;
            }

            function getDatasourceDefinitionById(id) {
                for (var index in datasourceDefinitions) {
                    if (datasourceDefinitions[index].id == id) {
                        return datasourceDefinitions[index];
                    }
                }
                return null;
            }

            function getDatasourceDefinitionsForType(type) {
                return datasourceDefinitions.filter(function(datasourceDefinition) {
                    return datasourceDefinition.type === type;
                });
            }

            function getAllDatasourceDefinitions() {
                return datasourceDefinitions;
            }

            return {
                getDatasourcesByContextId: getDatasourcesByContextId,
                getDatasourceDefinitionById: getDatasourceDefinitionById,
                getDatasourceDefinitionsForType: getDatasourceDefinitionsForType,
                getAllDatasourceDefinitions: getAllDatasourceDefinitions
            };
        };

    });
});