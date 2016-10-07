/*global define */
define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    'use strict';

    module.provider('ContextBrowserService', function() {

        var contextTreeUrl = '(dashboardContextTree)';
         /**
         * Override the url to fetch the context tree.
         * @param url
         */
        this.setContextTreeUrl = function(url) {
            contextTreeUrl = url;
        };

        this.$get = function($q, DashboardSettingsService) {
            var contextTreeDatasource = vRuntime.datasource.create("ContextTreeDS", DashboardSettingsService.getHttpProtocol() + contextTreeUrl, {});

            return {
                contexts: [],
                loadContextTree: function() {
                    var self = this;
                    return contextTreeDatasource.getById('root/children', {}
                        ).done(function (data) {
                            self.contexts = data;
                        }).fail(function () {
                            window.logger.error('Error when the fetching context tree');
                        });
                },
                getChildren: function(id) {
                    var defer = $q.defer();

                    if(contextTreeDatasource === undefined || contextTreeDatasource === null) {
                        window.logger.error('node.nodeIdentifier is not valid, not setting the children');
                        defer.reject();
                    }
                    else {
                        contextTreeDatasource.getById(id + '/children'
                        ).done(function (data) {
                                defer.resolve(data);
                            }).fail(function () {
                                window.logger.error('Error when the fetching children for context tree');
                                defer.reject();
                            });
                    }

                    return defer.promise;
                }
            };
        };
    });
});