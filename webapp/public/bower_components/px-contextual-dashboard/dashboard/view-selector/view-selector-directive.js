/*global define */
define(['angular', '../../module', 'text!./view-selector-template.html', 'bootstrap-dropdown'], function(angular, module, template) {
    'use strict';

    module.directive('viewSelector', function() {
        return {
            restrict: 'E',
            template: template,
            controller: 'ViewSelectorController',
            controllerAs: 'viewSelector'
        };
    });

    return module;
});