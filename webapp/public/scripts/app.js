/** global angular, require */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'require',
    'jquery',
    'angular',
    'angular-resource',
    'vruntime',
    'directives/main',
    'filters/main',
    'services/main',
	'models/main',
    'controllers/main',
    'bower_components/px-contextual-dashboard/main',
	'd3-amd',
	'd3-threeD',
    'routes',
    'interceptors'
], function (require, $, angular, ngResource, vRuntime, directives, filters, services, models, controllers, dashboard, routes, interceptors) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'ngResource',
        'app.controllers',
        'app.directives',
        'app.services',
		'app.models',
        'app.filters',
        'app.routes',
        'app.interceptors',
        'predix.configurable-dashboard',
		'ui.bootstrap.typeahead',
		'ui.bootstrap.accordion'
    ]);

//    /**
//     * Override the url for fetching the context tree.
//     */
//    predixApp.config(['WidgetLoaderServiceProvider', 'DashboardSettingsServiceProvider', function (WidgetLoaderServiceProvider, DashboardSettingsServiceProvider) {
//        WidgetLoaderServiceProvider.loadWidgetsFrom([
//            'bower_components/px-datagrid',
//            'bower_components/px-time-series',
//            {
//                folderPath: 'directives/v-hello-world'
//            },
//            {
//                folderPath: 'directives/v-simplest-directive',
//                main: 'v-simplest-directive.js',
//                schema: 'v-simplest-directive.schema.json'
//            },
//            'px-widgets/bad-widget',
//            'px-widgets/echo-widget'
//        ]);
//
//        //DashboardSettingsServiceProvider.enableSecureNetworkProtocol(true);
//    }]);

    predixApp.run(['$location', '$rootScope', function ($location, $rootScope) {

        // Application DataSources can be defined here
        // vRuntime.datasource.create("ScatterChart", "http://predix.ge.com:9090/service/line", {});
    }]);


    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Dashboard',
            session: {},
			// Main navigation tabs.
            tabs: [
                {state: 'tso.main', label: 'My Projects'},
				{state: 'mydata.main', label: 'My Data'}
            ]
        };

        //Unbind all widgets from datasources and widgets when page changes
        $rootScope.$on('$routeChangeStart', function () {
            vRuntime.binder.unbindAll();
        });

        $rootScope.logout = function (event) {
            event.preventDefault();
            location.replace('logout');
        };

    }]);

    //Enable logging to the console. (levels are ERROR, WARN, SUCCESS, INFO, NONE)
    //get a logger instance
    window.logger = vRuntime.logger.create('config dash');
    //set logger instance level
    window.logger.setLevel(vRuntime.logger.global.WARN);

    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
