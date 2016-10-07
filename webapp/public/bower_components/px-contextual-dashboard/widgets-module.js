define(['angular', 'angular-bootstrap'], function (angular) {
    var module = angular.module('predix.dashboard.widgets', ['ui.bootstrap.pagination']);

    module.config(function($compileProvider) {
        module.directive = function(name, factory) {
            $compileProvider.directive(name, factory);
            return( this );
        };
    });

    return module;
});