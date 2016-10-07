define(['angular', '../module', 'text!./context-selector-template.html', 'css!./context-selector.css'], function(angular, module, template) {
    'use strict';

    module.directive('contextSelector', function() {
        return {
            restrict: 'E',
            template: template,
            controller: 'ContextSelectorController',
            controllerAs: 'contextSelector'
        };
    });
    return module;
});