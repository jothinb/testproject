/*global define */
define(['angular', 'services-module', 'models-module'], function (angular, services, models) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('containerMgr', function(Container){

		var customers = ['DEFAULT', 'HANJIN', 'HYUNDAI', 'JB', 'MAERSK', 'OOCL'];
		var dataByCustomer = {
			'MAERSK': {
				color: 0x4cadd2,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: {
					top: 'images/containers/GE-Oasys-shipper_top40_maersk.png',
					side: 'images/containers/GE-Oasys-shipper_side40_maersk.png',
					end: 'images/containers/GE-Oasys-shipper_backs_maersk.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'OOCL': {
				color: 0xe1222f,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: {
					top: 'images/containers/GE-Oasys-shipper_side40_oocl.png',
					side: 'images/containers/GE-Oasys-shipper_side40_oocl.png',
					end: 'images/containers/GE-Oasys-shipper_backs_oocl.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'JB': {
				color: 0xfbe000,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: {
					top: 'images/containers/GE-Oasys-shipper_side40_jb.png',
					side: 'images/containers/GE-Oasys-shipper_side40_jb.png',
					end: 'images/containers/GE-Oasys-shipper_backs_jb.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'HYUNDAI': {
				color: 0xf58559,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: {
					top: 'images/containers/GE-Oasys-shipper_side40_hyundai.png',
					side: 'images/containers/GE-Oasys-shipper_side40_hyundai.png',
					end: 'images/containers/GE-Oasys-shipper_backs_hyundai.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'HANJIN': {
				color: 0x09a651,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: {
					top: 'images/containers/GE-Oasys-shipper_side40_hanjin.png',
					side: 'images/containers/GE-Oasys-shipper_side40_hanjin.png',
					end: 'images/containers/GE-Oasys-shipper_backs_hanjin.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'DEFAULT': {
				color: 0xb3b9b4,  // <-- Maersk grey:  color rgb(230, 231, 232)
				geometry: null,
				textureMap: null,  //<-- Does the default need a logo?
//					top: 'images/containers/GE-Oasys-shipper_top40_maersk.png',
//					side: 'images/containers/GE-Oasys-shipper_side40_maersk.png',
//					end: 'images/containers/GE-Oasys-shipper_backs_maersk.png'},
				texture: null,
				material: null,
				mesh: null
			},
			'picking': {
				geometry: null,
				textureMap: null,
//					top: 'images/containers/GE-Oasys-shipper_top40_maersk.png',
//					side: 'images/containers/GE-Oasys-shipper_side40_maersk.png',
//					end: 'images/containers/GE-Oasys-shipper_backs_maersk.png'},
				texture: null,
				material: null,
				mesh: null
			}
		};

		var pickingData = [];
		var allContainersById = [];

		var scene;
		var id = 0;
		var scale = new THREE.Vector3();
		scale.x = 20;
		scale.y = 9;
		scale.z = 8;

		var selectBoxPool = [];
		var activeSelectBoxes = [];

        var allContainersByUnitNbr = [];
		var containersByStackId = [];

		this.addContainerToStack = function(position, rotation, size, customer, isSelectable, containerData) {

            id++;
			var x = position.x;
			var y = position.y;
			var z = position.z;
            var shipperMesh = this.getGeometriesByCustomer(customer);
			var containerLength = size ? scale.x *size : scale.x;
			var targetScale = new THREE.Vector3(containerLength *1.6, scale.y *1.6, scale.z *1.6);

			var customerUserData = {
				containerType: containerData.containerType,
				slotNbr: containerData.slotNbr
			};

			var container = new Container(id, x, y, z, rotation, targetScale, getMaterialByCustomer(customer), customerUserData);
			container.containerType = containerData.containerType;
			allContainersById[container.id] = container;
            allContainersByUnitNbr[containerData.unitNbr] = container;
			if (containerData.containerType === 'PICKING') {
				if (!containersByStackId[containerData.slotNbr]) {
					containersByStackId[containerData.slotNbr] = [];
				}
				containersByStackId[containerData.slotNbr].push(container);
			}

			// Merge the container for performance reasons.
			shipperMesh.merge(container.mesh.geometry, container.mesh.matrix);

			// MAKING EVERY OBJECT ITS OWN MESH SLOWED US TO 2FPS.  LETS NOT DO THIS.
			//var container = new Container(id, x, y, z, rotation, targetScale, getMaterialByCustomer(customer));
			//scene.add(container.mesh);


			if (isSelectable) {
				var color = new THREE.Color();

//				var gid = Math.abs(x*10000+y*10+z);
//				var id = Math.abs(x*10000+y*10+z);
				applyVertexColors(container.mesh.geometry, color.setHex(id));
				container.mesh.updateMatrix();
//				geometriesByCustomer['pickingGeometry'].merge(container.mesh.geometry, container.mesh.matrix);
				this.getGeometriesByCustomer('picking').merge(container.mesh.geometry, container.mesh.matrix);

				pickingData[id] = {
					'position': {x:x, y:y, z:z},
					'rotation': rotation.clone(),
					'scale': targetScale.clone(),
					'containerId': id,
					'containerData': containerData ? containerData : '',
					'containerType': containerData.containerType
				}
			}

			function applyVertexColors( g, c ) {
				g.faces.forEach( function( f ) {
					var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
					for( var j = 0; j < n; j ++ ) {
						f.vertexColors[ j ] = c;
					}
				} );
			};
            return id;
		};

		this.setScene = function(newScene) {
			scene = newScene;
		};

		this.getScene = function() {
			return scene;
		};

		this.getContainerById = function(id) {
			return allContainersById[id] ? allContainersById[id] : null;
		};

        this.getContainerByUnitNbr = function(unitNbr) {
            return allContainersByUnitNbr[unitNbr] ? allContainersByUnitNbr[unitNbr] : null;
        };

		this.getContainersByStackId = function(stackId) {
			return stackId && containersByStackId[stackId] ? containersByStackId[stackId] : null;
		};

		this.buildMeshByCustomer = function(customer) {
			if(!dataByCustomer[customer].geometry || !dataByCustomer[customer].material) {return;}

			var containerGeometries = this.getGeometriesByCustomer(customer);
			var containerMaterial = getMaterialByCustomer(customer);

			dataByCustomer[customer].mesh = new THREE.Mesh(containerGeometries, containerMaterial);
			return dataByCustomer[customer].mesh;
		};

		this.getMeshByCustomer = function(customer) {
			if (dataByCustomer[customer].mesh) { return dataByCustomer[customer].mesh; }

			dataByCustomer[customer].mesh = new THREE.Mesh();
			return dataByCustomer[customer].mesh;
		};

		this.getGeometriesByCustomer = function(customer) {
			if (dataByCustomer[customer].geometry) { return dataByCustomer[customer].geometry; }

			dataByCustomer[customer].geometry = new THREE.Geometry();
			return dataByCustomer[customer].geometry;
		};

		this.getPickingData = function() {
			return pickingData;
		};

		this.makeAllContainersTransparent = function() {
//			for(var h=0, len=customers.length; h<len; h++) {
//				var materialList = getMaterialByCustomer(customers[h]).materials;
//				for (var i= 0, len=materialList.length; i<len; i++) {
//					var mat = materialList[i];
//					mat.transparent = true;
//				}
//			}
		};

		this.makeAllContainersOpaque = function() {
//			for(var h=0, len=customers.length; h<len; h++) {
//				var materialList = getMaterialByCustomer(customers[h]).materials;
//				for (var i= 0, len=materialList.length; i<len; i++) {
//					var mat = materialList[i];
//					mat.transparent = false;
//				}
//			}
		};

		var getMaterialByCustomer = function(customer) {

			if (dataByCustomer[customer].material) {
				return dataByCustomer[customer].material;
			}

			var material1 = new THREE.MeshLambertMaterial( { opacity: 0.2, color: dataByCustomer[customer].color } );

			dataByCustomer[customer].material = material1;
			return material1;
		};

		this.createSelectBox = function( selectedItem, color ) {

			if ( !selectedItem ) { return; }
//			var defaultColor = 0x4ba4ff;
			var defaultColor = 0x00ffff;
			var newColor = color || defaultColor;

			const offset = new THREE.Vector3(.1,.1,.1);

			var newSelectBox = getSelectBox(defaultColor, 0.6, true);
//			var newInnerSelectBox = getSelectBox(0xffffff, 1, false);

			newSelectBox.position.copy(selectedItem.mesh.position);
			newSelectBox.rotation.copy(selectedItem.mesh.rotation);
			newSelectBox.scale.copy(selectedItem.mesh.scale).add(offset);
//			newInnerSelectBox.position.copy(selectedItem.mesh.position);
//			newInnerSelectBox.rotation.copy(selectedItem.mesh.rotation);
//			newInnerSelectBox.scale.copy(selectedItem.mesh.scale).add(new THREE.Vector3(.5,.5,.5));

			newSelectBox.visible = true;
//			newInnerSelectBox.visible = false;

//			return [newSelectBox, newInnerSelectBox];
			return [newSelectBox];
		};

		function getSelectBox(color, opacity, isTransparent) {
			var newSelectBox
			if ( selectBoxPool.length >0 ) {
				newSelectBox = selectBoxPool.pop();
				newSelectBox.material.color.setHex(color);
				newSelectBox.material.opacity = opacity;
				newSelectBox.material.transparent = isTransparent;
			} else {

				var selectBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
				selectBoxGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 0.5, 0));
				var selectMaterial = new THREE.MeshLambertMaterial({ color: color, opacity: opacity, transparent: isTransparent });
				selectMaterial.emissive.setHex( color );

				newSelectBox = new THREE.Mesh(selectBoxGeometry, selectMaterial);
				scene.add(newSelectBox);
			}
			activeSelectBoxes.push(newSelectBox);

			return newSelectBox;
		};

		this.removeAllSelections = function() {
			while(activeSelectBoxes.length) {
				var selectBox = activeSelectBoxes.pop();
				selectBox.visible = false;
				selectBoxPool.push(selectBox);
			}
		};

		this.getUnitDetailsByContainerId = function(id) {
			return pickingData[id];
		};

		this.getUnitDetailsByStackId = function(stackId) {

			return containersByStackId[stackId].map(function(cont) {
				return pickingData[cont.id];
			});
		};



	});

	return services;
});
