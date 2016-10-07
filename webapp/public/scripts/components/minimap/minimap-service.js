/*global define */
define(['angular', 'services-module'], function (angular, services) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('miniMap', function(){
		// x, y, z, yRotation, {r,g,b}
		var MOCK_DATA_CONTAINERS = [
			{x: 200, y: 0, z: 0, yRotation: 0, baseColor: {r: 0.66, g: 0, b: 0}},
			{x: 200, y: 18, z: 0, yRotation: 0, baseColor: {r: 0, g: 0.66, b: 0}},
			{x: 200, y: 0, z: 80, yRotation: 0, baseColor: {r: 0, g: 0, b: 0.66}},
			{x: 200, y: 0, z: 120, yRotation: 0, baseColor: {r: 0, g: 0, b: 0.66}},
		];

		this.getMatrix = function () {
			return MOCK_DATA_CONTAINERS;
		};

	});

	return services;
});
