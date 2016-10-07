define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    'use strict';

    module.controller('ContextSelectorController', function(CurrentStateService, EditModeService) {



//        this.getContextName = function() {
//            if (CurrentStateService.hasContext()) {
//                return CurrentStateService.getContextName();
//            }
//            else {
//                return vRuntime.messages('dashboard.context.none');
//            }
//        };
//
//        this.hasContext = function() {
//            return CurrentStateService.hasContext();
//        };
//
//        this.shouldShowBreadcrumbEllipsis = function() {
//            return CurrentStateService.getBreadcrumbs().length > 3;
//        };
//
//        this.getBreadcrumbs = function() {
//            var fullBreadcrumbs = CurrentStateService.getBreadcrumbs();
//            if (fullBreadcrumbs.length > 3) {
//                return fullBreadcrumbs.slice(fullBreadcrumbs.length - 3, fullBreadcrumbs.length);
//            } else {
//                return fullBreadcrumbs;
//            }
//        };
//
//        this.isEnabled = function() {
//            return !EditModeService.isInEditMode();
//        };
    });
});