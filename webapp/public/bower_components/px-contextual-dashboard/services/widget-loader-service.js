define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    module.provider('WidgetLoaderService', function() {
        var widgetSources = [];

        this.loadWidgetsFrom = function(sources) {
            sources.forEach(function(widgetSource, i) {
                if (typeof widgetSource === 'string') {
                    var widgetSourceObject = {
                        folderPath: widgetSource
                    };

                    widgetSources[i] = normalizeWidgetSource(widgetSourceObject);
                } else if (typeof widgetSource === 'object') {
                    widgetSources[i] = normalizeWidgetSource(widgetSource);
                }

            });
        };

        function normalizeFolderPath(folderPath) {
            var normalizedFolderPath = folderPath;

            normalizedFolderPath = removePrecedingTextIfPresent(normalizedFolderPath, '/');
            normalizedFolderPath = removeEndingTextIfPresent(normalizedFolderPath, '/');

            return normalizedFolderPath;
        }

        function normalizeWidgetSource(widgetSource) {
            var defaults = {
                main: 'main',
                schema: 'schema.json'
            };

            var normalizedWidgetSource = angular.extend({}, defaults, widgetSource);
            normalizedWidgetSource.folderPath = normalizeFolderPath(widgetSource.folderPath);
            normalizedWidgetSource.main = removeEndingTextIfPresent(normalizedWidgetSource.main, '.js');

            return normalizedWidgetSource;
        }

        function removePrecedingTextIfPresent(fullString, precedingTextToRemove) {
            var str = fullString;

            if (str.indexOf(precedingTextToRemove) === 0) {
                str = str.substring(precedingTextToRemove.length);
            }

            return str;
        }

        function removeEndingTextIfPresent(fullString, endingTextToRemove) {
            var str = fullString;

            if (str.indexOf(endingTextToRemove, str.length - endingTextToRemove.length) !== -1) {
                str = str.substring(0, str.length - endingTextToRemove.length);
            }

            return str;
        }

        this.$get = function($q, WidgetService) {
            function loadWidgets() {
                var deferred = $q.defer();

                $q.all([loadWidgetsOnPage(), loadWidgetSchemas()])
                    .then(function() {
                        return deferred.resolve();
                    }, function(reason) {
                        return deferred.reject(reason);
                    });

                return deferred.promise;
            }

            function loadWidgetsOnPage() {
                var deferred = $q.defer();
                var dependencies = [];

                widgetSources.forEach(function(widgetSource) {
                    dependencies.push(widgetSource.folderPath + '/' + widgetSource.main);
                });

                require(dependencies, function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject(vRuntime.messages('dashboard.widgetloaderservice.loadwidgetsonpage.error'));
                });

                return deferred.promise;
            }

            function loadWidgetSchemas() {
                var deferred = $q.defer();
                var dependencies = [];

                widgetSources.forEach(function(widgetSource) {
                    dependencies.push('json!' + widgetSource.folderPath + '/' + widgetSource.schema);
                });

                require(dependencies, function() {
                    WidgetService.setWidgetDefinitions(Array.prototype.slice.call(arguments));
                    deferred.resolve();
                }, function() {
                    deferred.reject(vRuntime.messages('dashboard.widgetloaderservice.loadwidgetschemas.error'));
                });

                return deferred.promise;
            }

            return {
                loadWidgets: loadWidgets
            };
        };
    });
});