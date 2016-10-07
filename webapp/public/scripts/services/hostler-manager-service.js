/**
 * Created by 212361828 on 5/17/15.
 */
/*global define */
define(['angular', 'services-module', 'models-module'], function (angular, services) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('hostlerMgrSvc', function(Hostler){

		var hostlers = [];
		var hostlersMapByName = {};
		var nextId = 0;
		var stoppedHostlers = [];
//		var color = new THREE.Color( 0xff0000 );
//		var color = new THREE.Color("rgb(255,0,0)");
//		var color = new THREE.Color( 1, 0, 0 );


		this.create = function(position, rotation) {
			var h = new Hostler(nextId, position, rotation);
			hostlers[nextId] = h;
			hostlersMapByName[h.name] = h;
			nextId++;
			return h;
		};

//*******************
//		var count = 2; // number of hostlers
//		var colors = [0x0011ff, 0x0088ff];
//		var locations = [{x:-580, y:8, z:700}, {x:-390, y:8, z:300}];
//		var rotations = [0, 0.5*Math.PI];
//		for (var i = 0; i < count; i++) {
//			hostlers[i] = new Hostler(i, locations[i], rotations[i], colors[i]);
//			scene.add(hostlers[i].mesh);
//		}
//*******************

		this.getAllHostlers = function() {
			return hostlers;
		};

		this.getCount = function() {
			return hostlers.length;
		};

		this.getHostlerById = function(id) {
			return hostlers[id];
		};

		this.applyMovements = function(movements) {

//			var hostlers = hostlerMgrSvc.getAllHostlers();
//			for (var i = 0; i < hostlers.length; i++) {
//				var each = hostlers[i];
//				each.mesh.move(movementsMsg[each.mesh.name]);
//			}

			angular.forEach(movements, function(value, key) {
				var h = hostlersMapByName[key];
				if (h) {
					h.mesh.move(value);
				}
			});
		};

		this.stopHostler = function(id) {
			var hos = hostlers[id];

			hos.mesh.stopTween();
			stoppedHostlers.push(hos);
		};

		this.startHostlers = function() {
			while (stoppedHostlers.length) {
				var hos = stoppedHostlers.pop();
				hos.mesh.resetColor();
				hos.mesh.isStop = false;
				hos.mesh.isTweening = false;
			}
		};

		this.showHostlerAsSelectable = function(id) {
			var hos = hostlers[id];
			if ( hos ) {
				hos.mesh.showAsSelectable();
			}
		};

		this.showHostlerAsSelected = function(id) {
			var hos = hostlers[id];
			if ( hos ) {
				hos.mesh.showAsSelected();
			}
		};

		this.resetHostlerColor = function(id) {
			var hos = hostlers[id];
			if ( hos ) {
				hos.mesh.resetColor();
			}
		};

	});

	return services;
});
