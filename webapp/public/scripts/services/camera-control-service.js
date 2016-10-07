/**
 * Created by 212361828 on 5/24/15.
 */
/**
 * Created by 212361828 on 5/17/15.
 */
/*global define */
define(['angular', 'services-module', 'models-module'], function (angular, services) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('cameraCtrlSvc', function(Hostler){

		var cameras = [];
		var camera;
		var nextId = 0;

		this.addCamera = function(cam) {

		};

		this.create = function(position, rotation, color) {
			var h = new Hostler(nextId, position, rotation, color);
			hostlers[nextId] = h;
			hostlersMapByName[h.name] = h;
			nextId++;
			return h;
		};

		this.applyMovements = function(movements) {

//			var hostlers = hostlerMgrSvc.getAllHostlers();
//			for (var i = 0; i < hostlers.length; i++) {
//				var each = hostlers[i];
//				each.mesh.move(movementsMsg[each.mesh.name]);
//			}

			angular.forEach(movements, function(value, key) {
				var h = hostlersMapByName[key];
				h.mesh.move(value);
			});

		};

	});

	return services;
});
