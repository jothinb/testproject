define(['angular', 'angular-schema-form', 'angular-schema-form-boostrap', 'angular-ui-router', 'widgets-module'], function(angular) {

    var module = angular.module('predix.configurable-dashboard', [
        'schemaForm',
        'ui.router',
        'PxTreeNavModule',
        'predix.dashboard.widgets',
        'vRuntime'])
        .config(function($stateProvider) {
            $stateProvider
				.state('tso.main', {
					url: '',
					resolve: {
						contextTree: function(ContextBrowserService) {
							return ContextBrowserService.loadContextTree();
						},
						widgets: function(WidgetLoaderService) {
							return WidgetLoaderService.loadWidgets();
						}
					}
				})
				.state('mydata.main', {
					url: '',
					resolve: {
						contextTree: function(ContextBrowserService) {
							return ContextBrowserService.loadContextTree();
						},
						widgets: function(WidgetLoaderService) {
							return WidgetLoaderService.loadWidgets();
						}
					}
				});
        })
        .run(function($rootScope, $state, DashboardAlertService) {
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                if (toState.name === 'dashboard') {
                    DashboardAlertService.addAlert({ msg: error});
                    $state.go('dashboard-error');
                }
            });
        });

//    module.config(['$compileProvider',function($compileProvider){
//
//        module._directive = module.directive;
//        module.directive = function(name, factory) {
//            $compileProvider.directive( name, factory );
//            return( this );
//        };
//
//        module._controller = module.controller;
//        module.controller = function(name, constructor) {
//            $controllerProvider.register(name, constructor);
//            return this;
//        };
//
//        module._filter = module.filter;
//        module.filter = function(name, filter) {
//            $filterProvider.register(name, filter);
//            return this;
//        };
//
//        module._service = module.service;
//        module.service = function( name, constructor ) {
//            $provide.service( name, constructor );
//            return( this );
//        };
//
//        module._factory = module.factory;
//        module.factory = function( name, factory ) {
//            $provide.factory( name, factory );
//            return( this );
//        };
//
//        module._value = module.value;
//        module.value = function( name, value ) {
//            $provide.value( name, value );
//            return( this );
//        };
//
//    }]);


    return module;
});
