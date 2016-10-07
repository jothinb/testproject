define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    'use strict';

    module.controller('ContextBrowserController', function($scope, ContextService, CurrentStateService, ContextBrowserService, ViewCreatorService, $q, DashboardAlertService) {

        // default to 3 display levels if none are passed in
        this.displayLevels = $scope.displayLevels || 3;

        // the name to display in the context browser
        this.labelField = $scope.labelField || 'name';

        // the parent/child fields to matchup when checking if data should be added to the tree
        // (only add data if the child's parentId matches the parent's id)
        this.parentIdField = $scope.parentIdField || 'category';
        this.idField = $scope.idField || 'entityType';

        this.initialContexts = ContextBrowserService.contexts;

        this.openContext = function(contextIdentifier, breadcrumbs) {

            var getContextSuccessHandler = function(selectedContext) {

                CurrentStateService.setContext(selectedContext);
                CurrentStateService.setBreadcrumbs(breadcrumbs);

                if (selectedContext.views.length > 0) {
                    CurrentStateService.setView(selectedContext.views[0]);
                }
                else {
                    CurrentStateService.setViewToNone();
                }

            };

            var getContextErrorHandler = function() {
                DashboardAlertService.addAlert({
                    msg: vRuntime.messages('dashboard.context.metadata.fetchfail')
                });
            };

            ContextService.getContext(contextIdentifier.identifier, contextIdentifier.name).then(getContextSuccessHandler, getContextErrorHandler);

            angular.element('#context-browser-dropdown').removeClass('open');
        };

        this.getChildren = function(node) {
            if (node && node.nodeIdentifier) {
                return ContextBrowserService.getChildren(node.nodeIdentifier);
            }
            else {
                var error = 'node.nodeIdentifier is not valid, not setting the children';
                window.logger.log(error);
                return $q.reject(error);
            }
        };

        this.isOpenable = function(node) {
            if (node && node.entity) {
                return node.entity;
            }
            else {
                window.logger.log('node.entity does not exist, returning false for isOpenable');
                return false;
            }
        };

        this.handlers = {
            itemOpenHandler: this.openContext,
            isOpenable: this.isOpenable,
            getChildren: this.getChildren
        };

    });
});