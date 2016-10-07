/*global define */
define(['angular', 'models-module'], function (angular, models) {
	'use strict';
console.log("Loading Container model...");
	/* Services */
	models.value('version', '0.1');
	models.factory('Container', function(){
		// Private properties
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0.5, 0.5, 0 ) );
		// Static variable
		Container.geometry = geometry;

		function Container(id, x, y, z, rotation, scale, texture, userData) {
            this.id = id;
			this.x = x || 0;
			this.y = y || 0;
			this.z = z || 0;
			this.rotation = rotation || 0;
			this.scale = scale;
			this.mesh = this.createBox(texture);
			this.mesh.userData.unitData = userData;
			this.mesh.userData.id = id;
			this.geometry = 7;
			this.containerType = userData && userData.containerType ? userData.containerType : null;
            return this;
		};

		Container.prototype.getPosition = function() {
			return {x: this.x, y: this.y, z: this.z};
		};

		Container.prototype.getSize = function() {
			return this.size;
		};

//        Container.prototype.getRotation = function() {
//            return this.rotation;
//        };

		//Private function
		Container.prototype.createBox = function(texture) {


			var containerMesh= new THREE.Mesh( Container.geometry, texture );

			containerMesh.position.x	= this.x;
			containerMesh.position.y	= this.y;
			containerMesh.position.z	= this.z;

			containerMesh.rotation.y	= this.rotation.y || 0;

			containerMesh.scale.copy(this.scale);

			containerMesh.updateMatrix();
//			if (containerMeshCollection) {
//				containerMeshCollection.merge(containerMesh.geometry, containerMesh.matrix);
//			}

			return containerMesh;
		};

		return Container;
	});

	return models;
});
