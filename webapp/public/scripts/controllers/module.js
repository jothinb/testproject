/*
 * Define Angular controllers module
 */
define(['angular', 'angular-bootstrap', 'angular-bootstrap-tpl','vruntime'], function (angular) {
	'use strict';
	var module = angular.module('app.controllers', ['ui.bootstrap.modal', 'ui.bootstrap.tpls','vRuntime.services']);

	module.config(['$controllerProvider', function ($controllerProvider) {

		module._controller = module.controller;

		module.controller = function (name, constructor) {
			$controllerProvider.register(name, constructor);
		};

	}]);

	return module;
});
