define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.controller('DashboardController', function(CurrentStateService, EditModeService, WidgetConfiguratorService, DeleteWidgetService) {
        this.getCurrentViewWidgets = function() {
            if (EditModeService.isInEditMode()) {
                return EditModeService.getViewWorkingCopy().cards;
            } else {
                return CurrentStateService.getWidgetList();
            }
        };

        this.hasContext = function() {
            return CurrentStateService.hasContext();
        };

        this.hasView = function() {
            return CurrentStateService.hasView();
        };

        this.getViewList = function() {
          return CurrentStateService.getViewList();
        };

        this.isInEditMode = function() {
            return EditModeService.isInEditMode();
        };

        this.shouldShowAddButtonForIndex = function(index) {
            if (EditModeService.isInEditMode()) {
                return EditModeService.shouldShowAddButtonForIndex(index);
            } else {
                return false;
            }
        };

        this.editWidget = function(index){
            WidgetConfiguratorService.openModalInEditMode(index);   
        };

        this.addWidget = function(event, index) {
            event.preventDefault();
            WidgetConfiguratorService.openModalInAddMode(index);
        };

        this.deleteWidget = function(index){
            DeleteWidgetService.showModal(index);
        };
    });
});