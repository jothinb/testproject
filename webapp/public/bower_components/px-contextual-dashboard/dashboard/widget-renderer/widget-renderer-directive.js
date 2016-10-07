define(['angular', '../../module'], function(angular, module) {

    module.directive('widgetRenderer', function() {
        return {
            restrict: 'E',
            template: '<div compile-html="markup"></div>',
            scope: {
                widgetInstance: '=',
                index: '='
            },
            controller: 'WidgetRendererController'
        };
    });

    return module;
});