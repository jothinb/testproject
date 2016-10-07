/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'controllers/main', 'services/main', 'angular-ui-router'], function (angular) {
	'use strict';
	return angular.module('app.routes', ['ui.router'])
		.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {

			//Turn on or off HTML5 mode which uses the # hash
			$locationProvider.html5Mode(false);

			$stateProvider
				.state('yard', {
					url: '/yard',
					templateUrl: 'assets/views/yard-main.html',
					controller: 'YardMainCtrl',
					resolve: {
						// All items loaded here will execute in parallel.
						// NOTE: The application will not continue until all items have completed loading.
						'load': function(loaderSvc) {
							var x = loaderSvc.loadAll(
								[
									{category: 'locations', params:''},
									{category: 'units', params:'/type/C?location=ALL'}
								]
							);
							return x;
						}
					}
				});
//				.state('tso', {
//					url: '/tso',
//					templateUrl: 'assets/views/tso-main.html',
//					controller: 'TsoMainCtrl',
//					abstract: true
//				})
//				.state('mydata', {
//					url: '/tso-mydata',
//					templateUrl: 'assets/views/tso-mydata.html',
//					controller: 'TsoDataCtrl',
//					abstract: true
//				});

			$urlRouterProvider.otherwise('yard');
		}]);
});
