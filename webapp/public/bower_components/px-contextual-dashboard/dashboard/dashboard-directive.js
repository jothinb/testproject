define(['angular', '../module', 'text!./dashboard-template.html'], function(angular, module, template) {
    'use strict';

    module.directive('dashboard', function() {
        return {
            restrict: 'E',
            template: template,
            controller: 'DashboardController',
            controllerAs: 'dashboard'
        };
    });

    module.directive('compileHtml', function($compile, $sce) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('compileHtml', function() {
                    var expression = $sce.parseAsHtml(attrs.compileHtml);
                    var html = expression(scope);
                    var linker = $compile(html);
                    element.append(linker(scope));
                });
            }
        };
    });
	
	return module;
});