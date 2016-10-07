define(['angular', '../module', 'text!./context-browser-template.html', 'css!./context-browser.css'], function(angular, module, template) {
	'use strict';

    module.directive('contextBrowser', function() {
        return {
            restrict: 'E',
            scope: {
                displayLevels: "@?",
                labelField: "@?"
            },
            template: template,
            controller: 'ContextBrowserController',
            controllerAs: 'contextBrowser',
            link: function(scope, element) {
            }
        };
    });
	
	return module;
});