define(['angular', '../../module'], function(angular, module) {
    'use strict';

    module.controller('ViewCreatorController', function($scope, ViewCreatorService) {
        var self = this;
        this.viewName = "";
        this.isViewUpdating = false;

        this.save = function() {
            if ($scope.addView.$valid) {
                if (ViewCreatorService.isEditingView()) {
                    ViewCreatorService.changeViewNameTo(this.viewName);
                    this.clearInputs();
                } else {
                    this.isViewUpdating = true;
                    ViewCreatorService.createViewWithName(this.viewName).finally(function() {
                        self.isViewUpdating = false;
                        self.clearInputs();
                    });
                }
            }
        };

        this.setFieldsFromModel = function(model) {
            this.viewName = model.viewName;
        };

        this.clearInputs = function() {
            this.viewName = "";
        };

    });
});