/* jshint unused: false */
define(['angular','directives-module', 'text!./yard-panel.html'], function (angular, directives, viTmpl) {
    'use strict';
    return directives.directive('infoPanel', function () {
        return {
            restrict: 'E',
            replace: false,
            template: viTmpl,
            link: function(){
            },
            controller: function($scope, $rootScope, $timeout){

            }
        };
    });
});
