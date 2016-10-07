define(['angular', '../../module'], function(angular, module) {
    module.controller('ViewDeleterController', function(EditModeService) {

        this.deleteView = function() {
            EditModeService.removeCurrentViewFromContext();
        };

        this.getViewName = function() {
            return EditModeService.getViewName();
        }
    });
});