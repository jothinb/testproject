define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.controller('EditModeControlsController', function(EditModeService, CurrentStateService, ViewCreatorService) {
        var self = this;

        this.isSavingView = false;

        this.isDisplayed = function() {
            return CurrentStateService.hasContext() && CurrentStateService.hasView();
        };

        this.isInEditMode = function() {
            return EditModeService.isInEditMode();
        };

        this.enterEditMode = function() {
            EditModeService.enterEditMode();
        };

        this.saveChanges = function() {
            this.isSavingView = true;
            EditModeService.saveChanges().finally(function() {
                self.isSavingView = false;
            });
        };

        this.cancelChanges = function() {
            EditModeService.cancelChanges();
        };

        this.openViewEditor = function() {
            var currentViewModel = {
                viewName: EditModeService.getViewWorkingCopy().name
            };

            ViewCreatorService.openViewCreatorWithModel(currentViewModel);
        };
    });
});