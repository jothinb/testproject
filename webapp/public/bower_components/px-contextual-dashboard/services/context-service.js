define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.factory('ContextService', ['ViewService', 'DatasourceService', '$q', function(ViewService, DatasourceService, $q) {

        return {
            //this is where the $http request will be made to the server for the Context object
            //we'll only need to pass in the contextId. passing in the name is just for getting it to work now
            getContext: function(contextId, contextName) {
                var defer = $q.defer();

                var context = {
                    id: contextId,
                    name: contextName,
                    datasources: [],
                    views: []
                };

                var buildContextSuccessHandler = function(result) {
                    context.datasources = result[0];
                    context.views = result[1];

                    defer.resolve(context);
                };

                var buildContextErrorHandler = function() {
                    defer.reject();
                };

                $q.all([DatasourceService.getDatasourcesByContextId(contextId), ViewService.getViewsByContextId(contextId)]).then(buildContextSuccessHandler, buildContextErrorHandler);

                return defer.promise;
            }
        };
    }]);
});