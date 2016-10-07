define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.controller('ViewSelectorController', function(CurrentStateService, EditModeService) {
        this.isDisplayed = function() {
            return CurrentStateService.hasContext() && CurrentStateService.hasView();
        };

        this.selectView = function(view) {
            CurrentStateService.setView(view);
        };

        this.getCurrentViewName = function() {
            if (EditModeService.isInEditMode()) {
                return EditModeService.getViewWorkingCopy().name;
            } else if (CurrentStateService.hasView()) {
                return CurrentStateService.getView().name;
            } else {
                return "";
            }
        };

        this.getViewList = function() {
            return CurrentStateService.getViewList();
        };

        this.isDisabled = function() {
            return EditModeService.isInEditMode();
        };
    });
});