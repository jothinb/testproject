/*global define */
define(['angular', '../../module', 'text!./edit-mode-controls-template.html'], function(angular, module, template) {
    'use strict';

    module.directive('editModeControls', function() {
        return {
            restrict: 'E',
            template: template,
            controller: 'EditModeControlsController',
            controllerAs: 'editModeControls'
        };
    });

    return module;
});