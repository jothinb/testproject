/*
 * load angular app.services files - angular.module('app.services');
 */
define([
	// List service files here so requireJS will load them.
	'./sample-service',
	'./socket-service',
	'./loader-service',
	'./container-manager-service',
	'./hostler-manager-service',
	'./crane-manager-service'

], function () {
    'use strict';
});
