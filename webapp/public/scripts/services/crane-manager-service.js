/**
 * Created by 2123333330 on 5/28/15.
 */
/*global define */
define(['angular', 'services-module', 'models-module'], function (angular, services) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('craneSvc', function(Crane){

		const CRANE_Z = -424;
		var cranes = [];
		var cranesById = [];
		var cranesMapByName = {};
		var craneMeshes = [];
		var nextId = 10000;
		var scene;
		var stoppedCranes = [];

		this.addCrane = function(name, x, craneData) {

			var xPosition = x || 0;
			var position = new THREE.Vector3(xPosition, 0, CRANE_Z);
			var crane = new Crane(nextId, name, position, craneData);
			cranes.push(crane);
			cranesById[nextId] = crane;
			craneMeshes.push(crane.mesh);
			cranesMapByName[crane.name] = crane;

			nextId++;
			return crane;
		};

		this.setScene = function(s) {
			scene = s;
		};

		this.getScene = function() {
			return scene;
		};

		this.getAllCraneMeshes = function() {
			return craneMeshes;
		};

		this.getAllCranes = function() {
			return cranes;
		};

		this.getCount = function() {
			return cranes.length;
		};

		this.getCraneById = function(craneId) {
			return craneId && cranesById[craneId] ? cranesById[craneId] : null;
		};

		this.getCraneByName = function(name) {
			return name && cranesMapByName[name] ? cranesMapByName[name] : null;
		};

		this.applyMovements = function(movements) {
			angular.forEach(movements, function(value, key) {
				if (cranesMapByName[value.craneId]) {
					var c = cranesMapByName[value.craneId];
					c.mesh.move(value);
				}
			});
		};

		this.stopCrane = function(craneId) {
			var crane = craneId && cranesById[craneId] ? cranesById[craneId] : null;

			crane.mesh.stopTween();
			stoppedCranes.push(crane);
		};

		this.startCranes = function() {
			while (stoppedCranes.length) {
				var crane = stoppedCranes.pop();
				crane.mesh.resetColor();
				crane.mesh.isStop = false;
				crane.mesh.isTweening = false;
			}
		};

		this.showCraneAsSelectable = function(craneId) {
			var crane = craneId && cranesById[craneId] ? cranesById[craneId] : null;
			if ( crane ) {
				crane.mesh.showAsSelectable();
			}
		};

		this.showCraneAsSelected = function(craneId) {
			var crane = craneId && cranesById[craneId] ? cranesById[craneId] : null;
			if ( crane ) {
				crane.mesh.showAsSelected();
			}
		};

		this.resetCraneColor = function(craneId) {
			var crane = craneId && cranesById[craneId] ? cranesById[craneId] : null;
			if ( crane ) {
				crane.mesh.resetColor();
			}
		};




	});
	return services;
});
