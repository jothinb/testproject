/* jshint unused: false */
define(['angular', 'controllers-module', 'vruntime'], function (angular, controllers) {
	'use strict';
	controllers.controller('YardMainCtrl', [
		'$scope', '$rootScope', '$http', '$modal', '$timeout', 'socketSvc', 'loaderSvc', 'load', 'Container', 'craneSvc', 'containerMgr', 'hostlerMgrSvc', '$log',
		function ($scope, $rootScope, $http, $modal, $timeout, socketSvc, loaderSvc, load, Container, craneSvc, containerMgr, hostlerMgrSvc, $log) {

			$scope.searchList = [
				{"NAME":"247EXPLOGIST", "TYPE":"SHIPPER"},{"NAME":"ABFFRTSYSTEM", "TYPE":"SHIPPER"},{"NAME":"AGENT", "TYPE":"SHIPPER"},{"NAME":"AGMARKFOODS", "TYPE":"SHIPPER"},{"NAME":"ALLIANSHIPPE", "TYPE":"SHIPPER"},{"NAME":"AMERPRELINES", "TYPE":"SHIPPER"},
				{"NAME":"BNSFRAILWAY", "TYPE":"SHIPPER"},{"NAME":"BOLDTRANSPOR", "TYPE":"SHIPPER"},{"NAME":"CHINASHINAME", "TYPE":"SHIPPER"},{"NAME":"CHINASHINAME", "TYPE":"SHIPPER"},{"NAME":"CHROBINSON", "TYPE":"SHIPPER"},
				{"NAME":"CMACGMAMELLC", "TYPE":"SHIPPER"},{"NAME":"COSCOCONLINA", "TYPE":"SHIPPER"},{"NAME":"CSXTRANSPORT", "TYPE":"SHIPPER"},{"NAME":"DARTINTERMOD", "TYPE":"SHIPPER"},{"NAME":"DEFFENRECYCL", "TYPE":"SHIPPER"},{"NAME":"DIRECTCHASSI", "TYPE":"SHIPPER"},
				{"NAME":"DMCARLLC", "TYPE":"SHIPPER"},{"NAME":"EVERGRSHIAGE", "TYPE":"SHIPPER"},{"NAME":"EXPRESSYSINT", "TYPE":"SHIPPER"},{"NAME":"FEDEXFRT", "TYPE":"SHIPPER"},{"NAME":"FEDEXGROPACS", "TYPE":"SHIPPER"},
				{"NAME":"FLATHEPOSPOL", "TYPE":"SHIPPER"},{"NAME":"FLEXIVLEASIN", "TYPE":"SHIPPER"},{"NAME":"HANJINSHIPPI", "TYPE":"SHIPPER"},{"NAME":"HORIZOLINLLC", "TYPE":"SHIPPER"},
				{"NAME":"HYUNDAINTERM", "TYPE":"SHIPPER"},{"NAME":"INTERDLLC", "TYPE":"SHIPPER"},{"NAME":"JBHUNTRANSPO", "TYPE":"SHIPPER"},{"NAME":"KLINE", "TYPE":"SHIPPER"},{"NAME":"KOCHCOMPANIE", "TYPE":"SHIPPER"},
				{"NAME":"MAERSK", "TYPE":"SHIPPER"},{"NAME":"MANAGEMATERI", "TYPE":"SHIPPER"},{"NAME":"MARTENTRANSP", "TYPE":"SHIPPER"},{"NAME":"MASONDIXSLIN", "TYPE":"SHIPPER"},{"NAME":"MATSONLOGIST", "TYPE":"SHIPPER"},
				{"NAME":"MEDITESHICOU", "TYPE":"SHIPPER"},{"NAME":"MIDAMEINTCOR", "TYPE":"SHIPPER"},{"NAME":"MOLAMERICA", "TYPE":"SHIPPER"},{"NAME":"NEWPRIME", "TYPE":"SHIPPER"},{"NAME":"NOBILL", "TYPE":"SHIPPER"},
				{"NAME":"NYKDOMESTIC", "TYPE":"SHIPPER"},{"NAME":"NYKINTL", "TYPE":"SHIPPER"},{"NAME":"OOCLUSA", "TYPE":"SHIPPER"},{"NAME":"PACIFIINTLIN", "TYPE":"SHIPPER"},{"NAME":"SCHMUHBROTHE", "TYPE":"SHIPPER"},
				{"NAME":"SCHNEINATL", "TYPE":"SHIPPER"},{"NAME":"SWIFTINTLLC", "TYPE":"SHIPPER"},{"NAME":"TERMINCONSOI", "TYPE":"SHIPPER"},{"NAME":"TRACCOOPPOOL", "TYPE":"SHIPPER"},
				{"NAME":"TRACLEASE", "TYPE":"SHIPPER"},{"NAME":"TRANSBAYTRKG", "TYPE":"SHIPPER"},{"NAME":"TRANSPCORAME", "TYPE":"SHIPPER"},{"NAME":"TRANSPSPECIA", "TYPE":"SHIPPER"},{"NAME":"UNITEDARASHI", "TYPE":"SHIPPER"},
				{"NAME":"UNITEDPARSER", "TYPE":"SHIPPER"},{"NAME":"UPSFRT", "TYPE":"SHIPPER"},{"NAME":"VITEX", "TYPE":"SHIPPER"},{"NAME":"WERNERENTERP", "TYPE":"SHIPPER"},{"NAME":"YANGMINMARLI", "TYPE":"SHIPPER"},
				{"NAME":"YRC", "TYPE":"SHIPPER"},{"NAME":"JBHUNTRANSPO", "TYPE":"SHIPPER"}
			];

			$scope.isCollapsed = true;
			$scope.nextCounter = 0;
			$scope.prevCounter = 0;
            $scope.containerData = '';
            $scope.smallCardInfo = '';
            $scope.is_birdseye = false;


			// set the scene size
			var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight;

			var xOffSet = 4000;
			var yOffSet = 700; //400
			var zOffSet = 10;

			var container, stats;
			var containerMap = new Object();

//			var mapCamera;
			var scene, renderer;
			$scope.mapControls;
			$scope.camera;

			// This is a bit of circular logic.  We pass this value to a directive as an attribute.  The directiive then
			// sets this value in scope based on the attribute value.  It is a bit weird but it makes things both configurable
			// (in the controller) as well as reusable (in the directive).
			$scope.zoomScale = 0.75;  //<-- determines the ammount of zoom when zoom buttons are clicked.

			var windowHalfX = WIDTH / 2;
			var windowHalfY = HEIGHT / 2;

			// Dimensions of our map.
			$scope.LAND = {
				height: 1024*6,
				width: 4096*6
			};

			// set some camera attributes
			var VIEW_ANGLE = 45,  // <-- fos width i.e. WIDTH of view angle
				ASPECT = WIDTH / HEIGHT,
				NEAR = 0.1,
				FAR = 15000,
				USE_ORTHOGRAPHIC_CAMERA = true;


			var center = {
				x: 64,
				y: 0,
				z: 64
			};

			var ToRad = Math.PI / 180;

			$scope.mouseOverContainer;

			$scope.showStats = false;
			$scope.showGyro = false;
			$scope.showDatGui = false;
			var container2,
				renderer2,
				scene2,
				camera2,
				axes2;


			// LETS GIVE RAYCASTING A TRY
			// --------------------------

			$scope.raycaster = new THREE.Raycaster();
//			var normalizedMouseVector = new THREE.Vector2();
			var selectableContainers = [];

			// --------------------------
			var pickingData = [], pickingTexture, pickingScene;
			var highlightBox;
			var selectBox;
			var clientXY = {};
			var color;
			var offset = new THREE.Vector3(.1,.1, .1);
			// --------------------------

			$scope.customers = ['DEFAULT', 'HANJIN', 'HYUNDAI', 'JB', 'MAERSK', 'OOCL'];

			$scope.finalGrass;
			$scope.search = {};
			$scope.search.target = '';
			$scope.isShowQuickSearch = true;
			$scope.canvasElement;
			$scope.containerData;
			$scope.isMapMoving = false;
			$scope.normalizedMouse = new THREE.Vector2();
			$scope.mouseDown = false;
			$scope.mouseMoved = false;
			$scope.mouseOverCrane;
			$scope.mouseOverHostler;
			$scope.userAction = null;
			$scope.selectedCrane = null;
			$scope.selectedHostler = null;
			$scope.selectableMovingAssets = [];

			$scope.IIDX_BLUE = 0x4BA4FF;
			$scope.USER_ACTION_SELECT_CONTAINER = 'SELECT_CONTAINER';
			$scope.USER_ACTION_SELECT_CRANE = 'SELECT_CRANE';
			$scope.USER_ACTION_SELECT_HOSTLER = 'SELECT_HOSTLER';
			$scope.USER_ACTION_MAP_MOVE = 'MAP_MOVE';

			var isOrbitControlsEnabled = false;

			$scope.next = function () {
				console.log('clicked');
				if($scope.nextCounter < 1) {
					angular.element('.infopanel:first-child()').addClass('marginLeft');
					$scope.nextCounter++;
					$scope.prevCounter++;
				}else {
					//disable the button
					console.log($scope.nextCounter);
				}
			};

			$scope.previous = function () {
				if($scope.prevCounter > 0) {
					angular.element('.infopanel:first-child()').removeClass('marginLeft');
					$scope.prevCounter--;
					$scope.nextCounter--;
				}else {
					//disable the prev button
				}
			};

			$scope.onSelect = function ($item, $model, $label) {
				$scope.getSearchResult($model.TYPE, $label);
			};

			$scope.getList = function () {
				var type = angular.element.map($scope.searchList, function (value, key) {
					if($scope.selected && value.NAME === $scope.selected.NAME.toUpperCase()) {
						return value.TYPE;
					}
				});
				if(type.length === 0) {
					$scope.selected = '';
				}else {
					$scope.getSearchResult(type[0], $scope.selected.NAME);
				}
			};

//            $scope.$watch('searchType', function (newVal) {
//                if(newVal) {
//                    $scope.focusContainer(null);
//                    $scope.filteredResult = null;
//                    $scope.selected = '';
//                    $http.get('http://' + oasisHost + ':' + oasisPort + '/oasis/unit/trainid/1001')
//                        .success(function(data) {
//                            $scope.trainContainers = data;
//                        })
//                        .error(function(data) {
//
//                        });
//                }
//            });

			$scope.getSearchResult = function (type, value) {
				$http.get('http://' + oasisHost + ':' + oasisPort + '/' + oasisBasepath + '/unit/' + (type).toLowerCase() + '/' + (value).toUpperCase())
					.success(function (data) {
						$scope.filteredResult = data;
                        $scope.smallCardInfo = '';
					})
					.error(function (data) {
					});
			};

			$scope.init = function () {
				init();
				animate();
			};

			var guiControls = function() {
				this.message = 'dat.gui';
				this.speed = 0.8;
				this.displayOutline = false;
				// Define render logic ...
			};


			function init() {
				if($scope.showDatGui) {
					// DEBUG
					var text = new guiControls();
					var gui = new dat.GUI({ autoPlace: false });
					gui.add(text, 'message');
					gui.add(text, 'speed', -5, 5);
					gui.add(text, 'displayOutline');
					var customContainer = document.getElementById('dat-gui');
					gui.domElement.style.position = '';
					gui.domElement.style.top = '60px';
					gui.domElement.style.height = '20px';
					customContainer.appendChild(gui.domElement);
					dat.GUI.toggleHide();
				}


				color = new THREE.Color();
				container = document.getElementById('world-container');

				if (USE_ORTHOGRAPHIC_CAMERA) {
//					$scope.camera = new THREE.OrthographicCamera(WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, -10000, FAR);
					$scope.camera = new THREE.OrthographicCamera(WIDTH / -1, WIDTH / 1, HEIGHT / 1, HEIGHT / -1, -10000, FAR);
				} else {
					$scope.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR);
				}

////			$scope.camera.position.x = -500;
				$scope.camera.position.x = 1500;
//				$scope.camera.position.y = 750;
				$scope.camera.position.z = 500;

				$scope.camera.rotation.order = 'YXZ';
				$scope.camera.rotation.y = - Math.PI / 4;
				$scope.camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

//				// orthographic cameras
//				mapCamera = new THREE.OrthographicCamera(
//						$scope.LAND.width / -2,		// Left
//						$scope.LAND.width / 2,		// Right
//						($scope.LAND.height / 2) -(($scope.LAND.height / 2) *0.3),		// Top
//						$scope.LAND.height / -2 +(($scope.LAND.height / 2) *0.3),	// Bottom
//					-5000,            			// Near
//					10000 );           			// Far
//				mapCamera.up = new THREE.Vector3(0,0,-1);
//				mapCamera.lookAt( new THREE.Vector3(0,-1,0) );
//
//
				scene = new THREE.Scene();
//				scene.add(mapCamera);
				containerMgr.setScene(scene);

				// Let there be light.
//				scene.add(new THREE.AmbientLight(0x555555));
				scene.add(new THREE.AmbientLight(0x444444));
				var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
				directionalLight.position.set(0.5, 1, 0.5).normalize();
				scene.add(directionalLight);

//				// First, create the texture map.
//				var mapUrl = "images/bnsf-logistic-park-kc-wide.png";
//				var map = THREE.ImageUtils.loadTexture(mapUrl);
//				// Now, create a Phong material to show shading; pass in the map
//				var material = new THREE.MeshPhongMaterial({map: map});

//
//				var landCanvas = document.createElement("canvas");
//				landCanvas.width = 4096;
//				landCanvas.height = 1024;
//				var mapUrl = './images/map/GE-Oasys_map-052915.svg';
//				canvg(landCanvas, mapUrl, { ignoreMouse: true, ignoreAnimation: true } );
//
//				var landTexture = new THREE.Texture(landCanvas);
//				landTexture.needsUpdate = true;
//				var material = new THREE.MeshBasicMaterial({map: landTexture});
//
//				var geometry = new THREE.PlaneGeometry($scope.LAND.width, $scope.LAND.height, 64, 64);
//				geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));
//				var landMesh = new THREE.Mesh(geometry, material);
//				scene.add(landMesh);
//
//				var paths = [
//					'M1870.7,639.3c0,3.3-2.7,6-6,6h-416.1c-3.3,0-6-2.7-6-6v-27.1c0-3.3,2.7-6,6-6h416.1c3.3,0,6,2.7,6,6V639.3z',
//					'M1019.4,639.3c0,3.3-2.7,6-6,6H737.6c-3.3,0-6-2.7-6-6v-27.1c0-3.3,2.7-6,6-6h275.8c3.3,0,6,2.7,6,6V639.3z',
//					'M1425.6,639.3c0,3.3-2.7,6-6,6h-381.3c-3.3,0-6-2.7-6-6v-27.1c0-3.3,2.7-6,6-6h381.3c3.3,0,6,2.7,6,6V639.3z',
//					'M717,639.3c0,3.3-2.7,6-6,6l-330.9-0.2c-3.3,0-6-2.7-6-6l0-27.1c0-3.3,2.7-6,6-6l330.9,0.2c3.3,0,6,2.7,6,6L717,639.3z'
//				];
//				var color1 = 0x9FA768;
//				var parkingMaterial1 = new THREE.MeshLambertMaterial({
//					color: color1,
//					opacity:1
//				});
//
//				for (var i=0; i<paths.length;i++) {
//					var path = paths[i];
//					var pMesh = transformSVGPath(path);
//					var xtrd = pMesh.extrude({ amount:0.1, bevelEnabled:false });
//
//					xtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));
//					xtrd.applyMatrix(new THREE.Matrix4().makeTranslation(-991, 0, 501));
//
//					var finalMesh = new THREE.Mesh(xtrd, parkingMaterial1);
//					finalMesh.scale.set(6,1,6);
//					scene.add(finalMesh);
//				}
//

				var tileMap =[
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					['01-00-01',      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,'01-13-01','01-14-01','01-15-01'],
					['01-00-02','01-01-02','01-02-02',      null,      null,      null,      null,'01-07-02','01-08-02','01-09-02','01-10-02','01-11-02','01-12-02','01-13-02','01-14-02','01-15-02'],
					['01-00-03','01-01-03','01-02-03','01-03-03','01-04-03','01-05-03','01-06-03','01-07-03','01-08-03','01-09-03','01-10-03','01-11-03','01-12-03','01-13-03','01-13-03','01-13-03'],
					[      null,      null,'01-02-04','01-03-04','01-04-04','01-05-04','01-06-04',      null,      null,      null,      null,'01-11-04','01-12-04','01-13-04','01-13-04','01-13-04'],
					[      null,      null,      null,      null,'01-04-05','01-05-05','01-06-05','01-07-05','01-08-05',      null,      null,'01-11-05','01-12-05','01-13-05','01-13-05','01-13-05'],
					[      null,      null,      null,'01-03-06','01-04-06',      null,'01-06-06','01-07-06','01-08-06','01-09-06',      null,'01-11-06','01-12-06','01-13-06','01-13-06','01-13-06'],
					[      null,      null,      null,'01-03-07',      null,      null,      null,'01-07-07','01-08-07','01-09-07','01-10-07','01-11-07','01-12-07',      null,      null,      null],
					[      null,      null,'01-02-08','01-03-08',      null,      null,      null,      null,      null,'01-09-08','01-10-08','01-11-08','01-12-08','01-13-08',      null,      null],
					[      null,'01-01-09','01-02-09','01-03-09','01-04-09',      null,      null,      null,      null,      null,'01-10-09','01-11-09','01-12-09','01-13-09','01-14-09',      null],
					['01-00-10','01-01-10',      null,      null,'01-04-10','01-05-10','01-06-10','01-07-10',      null,      null,      null,      null,'01-12-10','01-13-10','01-14-10','01-15-10'],
					['01-00-11','01-01-11',      null,      null,      null,      null,'01-06-11','01-07-11','01-08-11','01-09-11','01-10-11',      null,      null,'01-13-11','01-14-11','01-15-11'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'01-09-12','01-10-12','01-11-12','01-12-12','01-13-12','01-14-12','01-15-12'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,'01-13-13','01-14-13','01-15-13'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
//MapPart2
					[      null,      null,      null,      null,      null,      null,      null,      null,'02-08-00','02-09-00','02-10-00','02-11-00','02-12-00','02-13-00','02-14-00','02-15-00'],
					['02-00-01','02-01-01','02-02-01','02-03-01','02-04-01','02-05-01','02-06-01','02-07-01','02-08-01','02-09-01','02-10-01','02-11-01','02-12-01','02-13-01','02-14-01','02-15-01'],
					['02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-06-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02','02-00-02'],
					['01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03','02-10-03','01-13-03','01-13-03','01-13-03','01-13-03','01-13-03'],
					['01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','02-09-04','02-10-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04'],
					['01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','02-09-05','02-10-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05'],
					['01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','02-09-06','02-10-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'02-09-07','02-10-07',      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'02-09-07','02-10-07',      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'02-09-09','02-10-09',      null,      null,      null,      null,      null],
					['02-00-10','02-00-10','02-00-10','02-03-10','02-04-10','02-05-10','02-05-10','02-05-10','02-05-10','02-05-10','02-10-10','02-11-10','02-12-10','02-12-10','02-12-10','02-12-10'],
					[      null,      null,      null,'02-03-11','02-04-11','02-05-11','02-06-11','02-07-11','02-08-11','02-08-11','02-08-11','02-08-11','02-08-11','02-08-11','02-08-11','02-08-11'],
					['02-00-12','02-01-12','02-02-12','02-03-12','02-04-12','02-05-12','02-06-12','02-07-12','02-08-12','02-09-12','02-09-12','02-09-12','02-09-12','02-09-12','02-09-12','02-09-12'],
					['02-00-13','02-01-13','02-02-13','02-03-13',      null,      null,      null,'02-07-13','02-08-13','02-09-13','02-10-13','02-10-13','02-12-13','02-13-13','02-13-13','02-13-13'],
					['02-00-14','02-01-14','02-02-14',      null,      null,      null,      null,      null,'02-08-14','02-09-14','02-10-14','02-11-14','02-12-14','02-13-14','02-13-14','02-13-14'],
					[      null,'02-01-15','02-02-15','02-03-15','02-04-15',      null,      null,'02-07-15','02-08-15','02-09-15','02-10-15','02-11-15','02-12-15','02-13-15',      null,      null],
//MapPart3
					['03-00-00','03-01-00','03-02-00','03-03-00','03-04-00',      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					['03-00-01','03-01-01','03-02-01','03-03-01','03-04-01','03-05-01','03-06-01','03-07-01','03-08-01','03-09-01','03-10-01','03-11-01','03-12-01','03-13-01','03-14-01','03-15-01'],
					['03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-00-02','03-14-02','03-15-02'],
					['03-08-03','03-08-03','03-08-03','03-08-03','03-08-03','03-08-03','03-06-03','03-07-03','03-08-03','03-08-03','03-08-03','03-08-03','03-08-03','03-08-03','03-08-03','03-08-03'],
					['01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','03-05-04','03-06-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04'],
					['01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','03-05-05','03-06-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05'],
					['01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','03-05-06','03-06-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06'],
					[      null,      null,      null,      null,      null,      null,'03-06-07',      null,      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,'03-06-07',      null,      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,'03-06-09',      null,      null,      null,      null,      null,      null,      null,      null,      null],
					['03-00-10','03-00-10','03-00-10','03-00-10','03-00-10','03-05-10','03-06-10','03-07-10','03-08-10','03-09-10','03-10-10','03-10-10','03-10-10','03-10-10','03-10-10','03-10-10'],
					['03-00-11','03-01-11','03-02-11','03-03-11','03-04-11','03-05-11','03-06-11','03-07-11','03-08-11','03-09-11','03-10-11','03-11-11','03-12-11','03-13-11','03-13-11','03-15-11'],
					['03-00-12','03-01-12','03-02-12','03-03-12','03-04-12','03-05-12','03-06-12','03-07-12','03-08-12','03-09-12','03-10-12','03-11-12','03-12-12','03-13-12','03-13-12','03-15-12'],
					['03-00-13','03-00-13','03-00-13','03-03-13','03-04-13','03-05-13','03-06-13','03-07-13','03-08-13','03-09-13','03-10-13','03-10-13','03-12-13','03-13-13','03-13-13','03-15-13'],
					['03-00-14','03-01-14','03-02-14','03-03-14','03-04-14','03-05-14','03-06-14','03-07-14','03-08-14','03-09-14','03-10-14','03-11-13','03-12-13','03-13-14','03-13-14','03-15-14'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
//MapPart4
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					['04-00-01','04-01-01','04-02-01','04-03-01','04-04-01','04-05-01','04-06-01','04-07-01','04-08-01','04-09-01','04-10-01','04-11-01','04-12-01','04-13-01','04-14-01','04-15-01'],
					['04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-00-02','04-10-02','04-11-02','04-12-02','04-13-02','04-14-02','04-15-02'],
					['04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-07-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03','04-00-03'],
					['01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','04-06-04','04-07-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04'],
					['01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','04-06-05','04-07-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05'],
					['01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','04-06-06','04-07-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06'],
					[      null,      null,      null,      null,      null,      null,'04-06-07','04-07-07',      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,'04-06-07','04-07-07',      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,'04-06-09','04-07-09',      null,      null,      null,      null,      null,      null,      null,      null],
					['04-00-10','04-00-10','04-00-10','04-00-10','04-00-10','04-00-10','04-06-10','04-07-10','04-08-10','04-08-10','04-08-10','04-08-10','04-08-10','04-08-10','04-08-10','04-08-10'],
					['04-00-11','04-00-11','04-00-11','04-00-11','04-00-11','04-00-11','04-00-11','04-07-11',      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,'04-15-14'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,'04-15-15'],
//MapPart5
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null,      null],
					['05-00-01','05-01-01','05-02-01','05-03-01','05-04-01','05-05-01','05-06-01','05-07-01','05-08-01','05-09-01','05-10-01',      null,      null,      null,      null,      null],
					['05-00-02','05-01-02','05-02-02','05-03-02','05-04-02','05-05-02','05-06-02','05-07-02','05-08-02','05-09-02','05-10-02','05-11-02','05-12-02','05-13-02','05-14-02','05-15-02'],
					['05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-00-03','05-10-03','05-11-03','05-12-03','05-13-03','05-14-03','05-15-03'],
					['01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','01-13-04','05-09-04','05-10-04','05-11-04','05-12-04','05-13-04','05-14-04','05-15-04'],
					['01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','01-13-05','05-09-05','05-10-05',      null,      null,'05-13-05','05-14-05',      null],
					['01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','01-13-06','05-09-06','05-10-06',      null,'05-12-06','05-13-06','05-14-06',      null],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'05-09-07','05-10-07',      null,'05-12-07',      null,'05-14-07','05-15-07'],
					[      null,      null,      null,      null,      null,      null,      null,      null,      null,'05-09-08','05-10-08','05-11-08','05-12-08',      null,      null,'05-15-08'],
					[      null,      null,      null,      null,      null,      null,      null,      null,'05-08-09','05-09-09','05-10-09','05-11-09',      null,      null,      null,      null],
					['05-00-10','05-01-10','05-01-10','05-01-10','05-01-10','05-01-10','05-01-10','05-01-10','05-08-10','05-09-10','05-10-10',      null,      null,      null,      null,      null],
					['05-00-11','05-01-11','05-02-11','05-03-11','05-03-11','05-03-11','05-03-11','05-03-11','05-08-11','05-09-11','05-10-11',      null,      null,      null,      null,      null],
					['05-00-12','05-01-12','05-02-12','05-03-12','05-04-12','05-05-12','05-05-12','05-05-12','05-08-12','05-09-12',      null,      null,      null,      null,      null,      null],
					['05-00-13','05-01-13','05-02-13','05-03-13','05-04-13','05-05-13','05-06-13','05-07-13','05-08-13',      null,      null,      null,      null,      null,      null,      null],
					['05-00-14','05-01-14','05-02-14','05-03-14','05-04-14','05-05-14','05-06-14','05-07-14','05-08-14',      null,      null,      null,      null,      null,      null,      null],
					['05-00-15','05-00-15','05-00-15','05-00-15','05-00-15','05-05-15','05-06-15','05-07-15',      null,      null,      null,      null,      null,      null,      null,      null]
				];


				var tileMapById = tileMap.reduce(function(prev, curr) {
					for(var x=0; x<curr.length; x++) {
						var tile = curr[x];
						if ( tile && !prev[tile]) {
							prev[tile] = new THREE.Geometry();
						}
					}
					return prev;
				},{});

				var landMesh = new THREE.Mesh();
//			, landGeometries = new THREE.Geometry();
				var landGeometry = new THREE.PlaneGeometry(256, 256);
				landGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));


				// use landGeometry to build the rest of the geometries.
				var singleLandMesh = new THREE.Mesh(landGeometry);

				// # of rows
				for(var j= 0, jl=tileMap.length; j<jl; j++) {

					var row = tileMap[j];

					// # columns
					for (var i = 0, il = row.length; i < il; i++) {
						var pos = row[i];
						if(pos){
							var x = (i*256) +(4096* Math.floor(j/16));
							var z = (j %16)*256;
							singleLandMesh.position.set(x,0,z );
							//  THREE.GeometryUtils.merge(landGeometries, singleLandMesh);
//							THREE.GeometryUtils.merge(tileMapById[pos], singleLandMesh);
							singleLandMesh.updateMatrix();
							tileMapById[pos].merge(singleLandMesh.geometry, singleLandMesh.matrix);
						}
					}
				}

				for (var tileId in tileMapById) {
					if(tileMapById[tileId]) {
						var mapUrl = 'images/map/tiles/map-' + tileId + '.png';
						//               var texture = THREE.ImageUtils.loadTexture(mapUrl, THREE.UVMapping, cb);
						var texture = THREE.ImageUtils.loadTexture(mapUrl);

						var landMaterial = new THREE.MeshBasicMaterial({map: texture, transparent: true});

						var tiles = new THREE.Mesh(tileMapById[tileId], landMaterial.clone());
						tiles.position.set(-8192, 0, -1024);
						landMesh.add(tiles);
						scene.add(tiles);
					}
				}

				var grassTileGeo = new THREE.PlaneGeometry(1024,1024);
				grassTileGeo.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));
				grassTileGeo.applyMatrix(new THREE.Matrix4().makeTranslation(-10240-1024,-1,-2048));
				var grassTileMesh = new THREE.Mesh(grassTileGeo);
				var grassGeometry = new THREE.Geometry();
				for(var i=0; i<8; i++) {
					for(var j=0;j<24;j++){
						grassTileMesh.position.x = j*1024;
						grassTileMesh.position.y = 0;
						grassTileMesh.position.z = -1024 + i*1024;

						grassTileMesh.updateMatrix();
						grassGeometry.merge(grassTileMesh.geometry, grassTileMesh.matrix);
					}
				}

				var mapUrl = 'images/map/grass.png';
				var grassTexture = THREE.ImageUtils.loadTexture(mapUrl);

//				grassTexture.anisotropy = renderer.getMaxAnisotropy();
//				grassTexture.needsUpdate = true;

				var grassMat = new THREE.MeshLambertMaterial({
					map: grassTexture,
					transparent: false,
					vertexColors: THREE.VertexColors
				});
				$scope.finalGrass = new THREE.Mesh(grassGeometry, grassMat);

				scene.add($scope.finalGrass);



				//TODO: WORKING HERE
				//TODO: ************
				var crane1 = craneSvc.addCrane('k1', -4000, {data: 'exampleData'}, true);
				scene.add(crane1.mesh);
				var crane2 = craneSvc.addCrane('k2', -1000, {data: 'exampleData'}, true);
				scene.add(crane2.mesh);
				var crane3 = craneSvc.addCrane('k3', 2000, {data: 'exampleData'}, true);
				scene.add(crane3.mesh);
				var crane4 = craneSvc.addCrane('k4', 6000, {data: 'exampleData'}, true);
				scene.add(crane4.mesh);
				var crane5 = craneSvc.addCrane('k5', 9000, {data: 'exampleData'}, true);
				scene.add(crane5.mesh);

				$scope.craneMeshes = craneSvc.getAllCraneMeshes();
//				$scope.selectableMovingAssets = craneSvc.getAllCraneMeshes();
				Array.prototype.push.apply($scope.selectableMovingAssets, craneSvc.getAllCraneMeshes() );
//				$scope.craneMeshes = craneSvc.getPickingObjects();





				//TODO: ADD railcars
				var uvGen = THREE.ExtrudeGeometry.WorldUVGenerator;
				var extrusionSettings = {
					amount: 14,
					bevelEnabled: false,
//					bevelThickness: 0.5,
//					bevelSize: 0.5,
//					bevelSegments: 8,
					material: 0,
					extrudeMaterial: 1,
					uvGenerator: uvGen
				};
				var railcarMaterial = new THREE.MeshLambertMaterial({
					color: 0xcfb367,
//					wireframe: true,
					opacity:1
				});
				var testBrown = new THREE.MeshLambertMaterial({
//					color: 0x8B4513,
//					ambient: 0x8B4513,
					color: 0xcfb367,
//					wireframe: true,
					opacity:1
				});

				var railcarSvgPath = 'M1095,532v-6H819v6h-11v4h7.953l3.109,3.217c-3.432,0.356-6.109,3.257-6.109,6.783c0,3.767,3.054,6.82,6.82,6.82c3.449,0,6.292-2.69,6.749-6.012l2.242,2.192h8.287l1.816-1.428c0.756,2.943,3.419,5.185,6.598,5.185c2.689,0,5.007-1.496,6.118-3.757h217.071c1.111,2.261,3.429,3.82,6.118,3.82c3.425,0,6.253-2.655,6.739-5.946l2.177,2.125h8.287l1.084-0.801c0.952,2.62,3.456,4.558,6.405,4.558c3.767,0,6.82-3.022,6.82-6.789c0-2.574-1.427-4.798-3.532-5.959l4.7-4.009H1112v-4H1095z';
				var shape = transformSVGPath(railcarSvgPath);
				var railCarXtrd = shape.extrude(extrusionSettings);
				railCarXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 1));
				railCarXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 560, 0));

				$log.debug('railcarGeo');
				$log.debug(railCarXtrd);
				railCarXtrd.faceVertexUvs[0] = [];

				var combinedGeo = new THREE.Geometry();
				var railcarXtrdMesh = new THREE.Mesh(railCarXtrd, railcarMaterial);
				railcarXtrdMesh.scale.set(.33,.25,1);

				for (var j=0; j<2; j++) {
					for (var i = 0; i < 145; i++) {
						railcarXtrdMesh.position.set(-5250 + i * 105, 0, -200 -40*j);
						railcarXtrdMesh.updateMatrix();
						combinedGeo.merge(railcarXtrdMesh.geometry, railcarXtrdMesh.matrix);
					}
				}
				for (var i = 0; i < 120; i++) {
					railcarXtrdMesh.position.set(-4980 + i * 105, 0, -320);
					railcarXtrdMesh.updateMatrix();
					combinedGeo.merge(railcarXtrdMesh.geometry, railcarXtrdMesh.matrix);
				}
				for (var i = 0; i < 145; i++) {
					railcarXtrdMesh.position.set(-5250 + i * 105, 0, -440);
					railcarXtrdMesh.updateMatrix();
					combinedGeo.merge(railcarXtrdMesh.geometry, railcarXtrdMesh.matrix);
				}
				$log.debug('combinedGeo: ');
				$log.debug(combinedGeo);

				var materials = [railcarMaterial, testBrown];
				var material = new THREE.MeshFaceMaterial(materials);

//				var allRailCars = new THREE.Mesh(combinedGeo, railcarMaterial);
				var allRailCars = new THREE.Mesh(combinedGeo, material);
				scene.add(allRailCars);


//				railcarSvgPath = 'M1095,532v-6H819v6h-11v4h7.953l3.109,3.217c-3.432,0.356-6.109,3.257-6.109,6.783c0,3.767,3.054,6.82,6.82,6.82c3.449,0,6.292-2.69,6.749-6.012l2.242,2.192h8.287l1.816-1.428c0.756,2.943,3.419,5.185,6.598,5.185c2.689,0,5.007-1.496,6.118-3.757h217.071c1.111,2.261,3.429,3.82,6.118,3.82c3.425,0,6.253-2.655,6.739-5.946l2.177,2.125h8.287l1.084-0.801c0.952,2.62,3.456,4.558,6.405,4.558c3.767,0,6.82-3.022,6.82-6.789c0-2.574-1.427-4.798-3.532-5.959l4.7-4.009H1112v-4H1095z';
//				shape = transformSVGPath(railcarSvgPath);
//				railCarXtrd = shape.extrude({ amount:13, bevelEnabled:false });
//				railCarXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 1));
//				railcarXtrdMesh = new THREE.Mesh(railCarXtrd, railcarMaterial);
//
//				scene.add(railcarXtrdMesh);


//				var railcarSvg = 'M287,6c0,0,0-2.833,0-6C261.5,0,11,0,11,0v6H0v4h29.667l12.811,13h219.378l15.478-13H304V6H287z';
//				shape = transformSVGPath(railcarSvg);
//				railCarXtrd = shape.extrude({ amount:13, bevelEnabled:false });
//				railCarXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 1));
//				railCarXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 26, 0));
//				var railcarMesh = new THREE.Mesh(railCarXtrd, railcarMaterial);
//
//				scene.add(railcarMesh);
//
//				var rcWheelSvg = 'M7.953,10l3.109,3.217C7.63,13.573,4.953,16.473,4.953,20c0,3.767,3.054,6.82,6.821,6.82c3.448,0,6.292-2.562,6.749-5.885l2.242,2.319h8.287l1.816-1.556c0.756,2.943,3.419,5.121,6.598,5.121c3.767,0,6.82-3.054,6.82-6.82c0-2.808-1.697-5.217-4.121-6.263L44.529,10H7.953z';
//				shape = transformSVGPath(rcWheelSvg);
//				railCarXtrd = shape.extrude({ amount:13, bevelEnabled:false });
//				railCarXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 1));
//				railCarXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 26, 0));
//				railcarMesh = new THREE.Mesh(railCarXtrd, railcarMaterial);
//
//				scene.add(railcarMesh);






						// TODO: ADD chassis
				var chassisSvgPaths = [
					'M11.3,1.8c0.2,0.4,0.3,0.9,0.3,1.4c0,0.2,0,0.5-0.1,0.7H24c0-0.2-0.1-0.4-0.1-0.7c0-0.5,0.1-1,0.3-1.4H11.3z',
					'M1,1.8L1,1.8c-0.6,0-1,0.5-1,1.1c0,0.6,0.5,1,1,1v0h2.1c0-0.2-0.1-0.4-0.1-0.7c0-0.5,0.1-1,0.3-1.4H1z',
					'M42,1.9L42,1.9l-2.3,0c0.2,0.4,0.3,0.9,0.3,1.4c0,0.2,0,0.5-0.1,0.7H42v0c0.6,0,1-0.5,1-1C43,2.3,42.5,1.9,42,1.9z',
					'M7.3,0C6,0,4.9,0.8,4.4,1.8C4.1,2.3,4,2.8,4,3.3c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6c1.6,0,2.9-1.1,3.2-2.6c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C9.7,0.8,8.6,0,7.3,0zM7.8,3.3c0,0.3-0.2,0.5-0.5,0.5C7,3.8,6.8,3.6,6.8,3.3C6.8,3,7,2.7,7.3,2.7C7.6,2.7,7.8,3,7.8,3.3z',
					'M28.1,0c-1.3,0-2.4,0.8-2.9,1.8c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6c1.6,0,2.9-1.1,3.2-2.6c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C30.5,0.8,29.4,0,28.1,0zM28.7,3.3c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5C28.4,2.7,28.7,3,28.7,3.3z',
					'M35.7,0c-1.3,0-2.4,0.8-2.9,1.8c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6c1.6,0,2.9-1.1,3.2-2.6C39,3.7,39,3.5,39,3.3c0-0.5-0.1-1-0.3-1.4C38.1,0.8,37,0,35.7,0zM36.2,3.3c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5C36,2.7,36.2,3,36.2,3.3z'
				];

				var chassisMaterial = new THREE.MeshLambertMaterial({
					color: 0x202020,
					opacity:1
				});
				var CHASSIS_EXTRD = 4;
				var chassisGroup = new THREE.Group();
//				// CAB
//				var chassisPath = 'M1240.932,745l-27.529-41.383V329.182h15.216V323h-86.697v6.182h13.675V703.74L1128.15,745h-9.011v9h64.951c0.271-2.994,0.533-5.991,0.731-9h-22.287v-32.111H1185c0-2.929,0-5.947,0-9h-22.466v-32.111h19.698c-0.313-2.995-0.594-6.015-0.561-9h-19.137v-32.111h20.467c-0.237-3.051-0.659-6.044-1.13-9h-19.337v-32.111h17.738c-0.03-2.96-0.292-5.989-0.575-9h-17.163v-32.112h18.301c-0.177-2.887,0.367-5.954,0.825-9h-19.127v-32.111H1184c0-3,0-6,0-9h-21.466v-32.111h22.558c0.386-3,0.767-6,0.967-9h-23.525v-32.111h21.975c0.013-3,0.185-6,0.496-9h-22.47V384h27.06c-0.333-3-0.417-6-0.25-9h-26.81v-7.909h19.691c0.214-1.03,0.536-2.061,0.769-3.091h-20.46v-8H1194c0-1.028,0-2.017,0-3.091h-31.466v-5.961h43.932v5.961H1194c0,1.074,0,2.063,0,3.091h12.466v8h-23.472c-0.233,1.03-0.555,2.061-0.769,3.091h24.241V375h-17.122c-0.167,3-0.083,6,0.25,9h16.872v32.111h-21.462c-0.31,3-0.483,6-0.496,9h21.957v32.111h-20.407c-0.2,3-0.582,6-0.967,9h21.374v32.111H1184c0,3,0,6,0,9h22.466v32.111h-24.805c-0.458,3.046-1.002,6.113-0.825,9h25.63v32.112h-26.769c0.283,3.011,0.545,6.04,0.575,9h26.194v32.111h-24.594c0.471,2.956,0.893,5.949,1.13,9h23.464v32.111h-24.795c-0.033,2.985,0.248,6.005,0.561,9h24.234v32.111H1185c0,3.053,0,6.071,0,9h21.466V745h-21.645c-0.198,3.009-0.459,6.006-0.731,9h67.313v-9H1240.932z';
//				var shape = transformSVGPath(chassisPath);
//				var chassisXtrd = shape.extrude({ amount:CHASSIS_EXTRD, bevelEnabled:false });
//				chassisXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1));
////				chassisXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
//				chassisXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 400, 0));
//
//				var chassisMesh = new THREE.Mesh(chassisXtrd, chassisMaterial);
//				scene.add(chassisMesh);

				var chassisGeo = new THREE.Geometry();
				var shapeArray = [];
				for (var i=0; i<chassisSvgPaths.length; i++) {
					// CAB
					var chassisPath = chassisSvgPaths[i];
					var shape = transformSVGPath(chassisPath);
					shapeArray.push(shape);
//					var chassisXtrd = shape.extrude({ amount:CHASSIS_EXTRD, bevelEnabled:false });
//					chassisXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1));
////				chassisXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
//					chassisXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 20, 0));
//
//					chassisGeo.merge(chassisXtrd.geometry,chassisXtrd.matrix);
////					var chassisMesh = new THREE.Mesh(chassisXtrd, chassisMaterial);
////					chassisGroup.add(chassisMesh);

				}

				var geo1 = new THREE.ExtrudeGeometry(shapeArray, {amount: CHASSIS_EXTRD, bevelEnabled: false});
				geo1.applyMatrix(new THREE.Matrix4().makeTranslation(200, 0, 500));

//				chassisGroup.translateX(500);
//				chassisGroup.translateY(0);
//				chassisGroup.translateZ(1000);
//				scene.add(chassisGroup);

				var chassisMat = new THREE.Mesh(geo1, chassisMaterial);

				scene.add(chassisMat);






//				var loader = new THREE.JSONLoader();
//
//				var callbackKey = function(geometry) {
////					createScene(geometry,  0, 0, 0, 15, "chameleon.jpg")
//					var zmesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(
//						{
//							color: 0xffffff
////							map: THREE.ImageUtils.loadTexture(tmap)
//						}
//					));
//					zmesh.position.set(0, 0, 0);
//					zmesh.scale.set(.5,.5,.5);
////					meshes.push(zmesh);
//					scene.add(zmesh);
//				};
//
//				loader.load("images/moving/chassis.json", callbackKey);


				// CREATE PICKING OBJECTS
				// -------------------
				pickingScene = new THREE.Scene();
				pickingTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
				pickingTexture.minFilter = THREE.LinearFilter;
				pickingTexture.generateMipmaps = false;

				var pickingGeometry = new THREE.Geometry();
				var pickingMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
				// -------------------

				// TODO: user web workers for multiple hostlers???
				// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
				// TODO: the number and initial locations of the hostlers should come from server
				var count = 5; // number of hostlers
				var colors = [0x0011ff, 0x0088ff];
				var locations = [	{x: 4000, 	y: 8, 	z: -280},
					{x: 4300, 	y: 8, 	z: 0},
					{x: 3000, 	y: 8, 	z: 930},
					{x: 2500, 	y: 8, 	z: 300},
					{x: 1700, 	y: 8, 	z: 300},
					{x: 1600, 	y: 8, 	z: -280},
					{x: -90, 	y: 8, 	z: 300},
					{x: -1390, 	y: 8, 	z: 300},
					{x: -580, 	y: 8, 	z: 880},
					{x: -800, 	y: 8, 	z: -280},
					{x: -2200, 	y: 8, 	z: 300},
					{x: -2200, 	y: 8, 	z: -280},
					{x: -3000, 	y: 8, 	z: -280},
					{x: -3400, 	y: 8, 	z: 300},
					{x: -4000, 	y: 8, 	z: -280}
				];
				var rotations = [0, 0.5 * Math.PI];

				for (var i = 0; i < count; i++) {
					var h = hostlerMgrSvc.create(locations[i], rotations[i]); // NOTE: rotations param is not currently being used.
					scene.add(h.mesh);
					$scope.selectableMovingAssets.push(h.mesh);
				}

//				var h = hostlerMgrSvc.create(locations[1], rotations[0]);
//				scene.add(h.mesh);
//				$scope.selectableMovingAssets.push(h.mesh);


				// Gyroscope
				// -----------------------------------------------
				// -----------------------------------------------
				// -----------------------------------------------

				if ($scope.showGyro) {
					// dom
					container2 = document.getElementById('compass');

					// renderer
					renderer2 = new THREE.WebGLRenderer();
					renderer2.setClearColor(0xf0f0f0, 1);
					renderer2.setSize(200, 200);
					container2.appendChild(renderer2.domElement);

					// scene
					scene2 = new THREE.Scene();

					// camera
					camera2 = new THREE.PerspectiveCamera(50, 1, 1, 1000);
					camera2.up = $scope.camera.up; // important!

					// axes
					axes2 = new THREE.AxisHelper(100);
					scene2.add(axes2);
				}
				// animate
				// -----------------------------------------------
				// -----------------------------------------------
				// -----------------------------------------------


				// *****************
				// CREATE CONTAINERS
				// *****************

				var rotation = new THREE.Euler();
				rotation.x = 0;
				rotation.y = (Math.PI * 0.5);
				rotation.z = 0;
				var scale = new THREE.Vector3();
				scale.x = 60;
				scale.y = 24;
				scale.z = 24;

				var id;
//				var unitData = load[1].data;
				var unitLocationData = load[1].data;
				var unitData = unitLocationData.filter(function(unit) { return unit.containerType; });
				var unusedContainers = unitLocationData.filter(function(unit) { return !unit.containerType; });

//				// for yard-container-accordion.js
//				$scope.unitData =[];
//				for(var i=0; i<5; i++) {
//					$scope.unitData.push(unitData[i]);
//				}


				for(var i=0; i<unitData.length; i++) {

					var container_unit = unitData[i];
					var position = new THREE.Vector3();

					if ( container_unit.containerType === 'PICKING') {

						position.setX(Math.floor((unitData[i].x/5)-(xOffSet)) -1350);
						position.setY(unitData[i].z *1.5);
						// console.log("position y : " + position.y);
						position.setZ( Math.floor(unitData[i].y/7-yOffSet-575) -10 -555);
					} else {

						position.setX(Math.floor((unitData[i].x/9)-(xOffSet) +400));
						position.setY(unitData[i].z*1.5);
						// console.log("position y : " + position.y);
						position.setZ( Math.floor(unitData[i].y/10-yOffSet-575) );
					}

					if (position.z < -185 && position.z > -505) {
						position.setY((position.y) +9);
					}

					rotation.set(0,0,0, 'XYZ');
					if (unitData[i].containerType === 'PARKING') {

						// TODO: Remove this and correct offset on backend.
						position.setZ(position.z -10);

						// Calculating rotation by z position is probably not the best way to do this.
						// Let's move it to the service level and assign rotations to parking areas.
						// containers in the parking area
						// rotation.y = (Math.PI * 0.5);
						if ( position.z <200 ) {
							// parking area row 1
							rotation.y = (Math.PI * 1.685);
						}
						else if ( position.z >= 200 && position.z < 300 ) {
							// parking area row 2
							rotation.y = (Math.PI * 0.685);
						}
						else if ( position.z >= 300 ) {
							// parking area row 3
							rotation.y = (Math.PI * 1.685);
						}
					}

					//shipperNameMapByShipperId[]
					// addContainerToStack(x, y, z, rotationInRadians, size, customer, isSelectable, [containerData])
					var shipper = $scope.shipperNameMapByShipperId[unitData[i].shprName];
					id = containerMgr.addContainerToStack(position.clone(), rotation, unitData[i].containerSize, shipper, true, unitData[i]);
					containerMap[id] = unitData[i];
				}

				var pos = new THREE.Vector3();
				var rcRotation = new THREE.Euler();
				rcRotation.x = 0;
				rcRotation.y = 0;
				rcRotation.z = 0;
				var rcShipper;
				for (var j=0; j<2; j++) {
					for (var i = 0 +10; i < 145 -10; i++) {

//						if ( (i+j)%9 !== 0) {  // break things up by making some railcars empty.
						if ( true ) {  // break things up by making some railcars empty.
							if (unusedContainers.length) {
								var unit = unusedContainers.pop();
								pos.set(-4235 + i * 105, 8, -209 - 40 * j);
								rcShipper = $scope.shipperNameMapByShipperId[unit.shprName];

								var newId = containerMgr.addContainerToStack(pos.clone(), rcRotation, unit.containerSize, rcShipper, true, unit);
								containerMap[newId] = unit;

								// if container is small add another small to the same railcar.
								if (parseInt(unit.containerSize) === 1) {
									unit = getNextUnusedContainer({size: 1})[0];
									if (unit) {
										pos.setX(-4235 + i * 105 + 34);
										rcShipper = $scope.shipperNameMapByShipperId[unit.shprName];

										var newId = containerMgr.addContainerToStack(pos.clone(), rcRotation, unit.containerSize, rcShipper, true, unit);
										containerMap[newId] = unit;
									}
								}
							}

						}
					}
				}

				function getNextUnusedContainer(thingsToMatch) {
					if ( !unusedContainers.length ) { return null; }
					var size = thingsToMatch.size || 2;
					for (var i= 0, il=unusedContainers.length; i<il; i++) {
						if (parseInt(unusedContainers[i].containerSize) === size) {
							return unusedContainers.splice(i,1);
						}
					}
				};


				pickingData = containerMgr.getPickingData();

				var highlightBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
				highlightBoxGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 0.5, 0));
				highlightBox = new THREE.Mesh(
					highlightBoxGeometry,
//					new THREE.MeshLambertMaterial({color: $scope.IIDX_BLUE, opacity: 0.8, transparent: true}
				new THREE.MeshLambertMaterial({color: 0x00ffff, opacity: 0.8, transparent: true}
					));
				scene.add(highlightBox);

//				var selectBoxGeometry = highlightBoxGeometry.clone();
//				var selectMaterial = new THREE.MeshLambertMaterial({color: 0x66ffff, opacity: 1, transparent: true});
//				selectBox = new THREE.Mesh(selectBoxGeometry, selectMaterial);
//				selectBox.visible = false;
//				scene.add(selectBox);


				for(var c= 0, len=$scope.customers.length; c<len; c++) {
					var customerMesh = containerMgr.buildMeshByCustomer($scope.customers[c]);
					if ( customerMesh ) {
						scene.add(customerMesh);
						selectableContainers.push(customerMesh);
					}
				}
//				var maerskMesh = containerMgr.buildMeshByCustomer('MAERSK');
//				scene.add(maerskMesh);
//				selectableContainers.push(maerskMesh);
//				var defaultMesh = containerMgr.buildMeshByCustomer('DEFAULT');
//				scene.add(defaultMesh);
//				selectableContainers.push(defaultMesh);


				//PICKING
				//-------
				var pickingGeometry = containerMgr.getGeometriesByCustomer('picking');
				pickingScene.add(new THREE.Mesh(pickingGeometry, pickingMaterial));

				// TODO: consider turning antialias off if performance is an issue.
				renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
				renderer.setClearColor(0xd8e7ff);
				var windowSize = $scope.getCanvasSize();
				renderer.setSize(windowSize.width, windowSize.height);
				renderer.autoClear = false;

				// Ditch the loading message.
				container.innerHTML = "";
//				renderer.domElement.style.position = 'absolute';
//				renderer.domElement.style.left = '0px';
				renderer.domElement.id = 'map-canvas';

				// AND add the DOM element to our camera controller
				$scope.canvasElement = container.appendChild(renderer.domElement);


//				$scope.mapControls = new MapControls($scope.camera, render, $scope.canvasElement, landMesh);
				$scope.mapControls = new MapControls($scope.camera, render, $scope.canvasElement, $scope.finalGrass);

				if ($scope.showStats) {
					// Add Track FPS with statsjs
					stats = new Stats();
					stats.domElement.style.position = 'absolute';
					stats.domElement.style.bottom = '0px';
					stats.domElement.style.right = '0px';
					container.appendChild(stats.domElement);
				}

//				document.addEventListener('mousemove', onMouseMove, false);
//				document.addEventListener('mousedown', onMouseDown, false);
//				document.addEventListener('mouseup', onMouseUp, false);
				window.addEventListener('resize', onWindowResize, false);

				$scope.camera.target = scene.position.clone();
				//$scope.camera.rotation.order = 'YXZ';

				// TODO: Uncomment this line to start up the realtime movements.

			socketSvc.initialize();
//			$timeout(function() {
//				socketSvc.disconnect();
//			}, 10000);

			};

			$scope.getCanvasSize = function() {
				return {height: window.innerHeight, width: window.innerWidth};
			};

			$scope.getNormalizedCoordinates = function(event) {
				var mouse = {};
				mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.width ) * 2 - 1;
				mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.height ) * 2 + 1;
				return mouse;
			};

			function onWindowResize() {

				var newDimensions = $scope.getCanvasSize();

				windowHalfX = newDimensions.width / 2;
				windowHalfY = newDimensions.height / 2;

				$scope.camera.aspect = newDimensions.width / newDimensions.height;
				$scope.camera.updateProjectionMatrix();

				renderer.setSize(newDimensions.width, newDimensions.height);
			};

			var getCameraLookDir = function(c) {
				var v = new THREE.Vector3(0,0,-1);
				v.applyEuler(c.rotation, c.eulerOrder);
				return v;
			};

			$scope.moveCamera = function (target, zoom) {

//				var camDir = getCameraLookDir($scope.camera);

				var position = $scope.camera.position.clone();
				position.zoom = $scope.camera.zoom;
				var destPosition;
				if(target) {
					destPosition = target.clone();
				} else {
					destPosition = position.clone();
				}
				destPosition.x -= 700;
				destPosition.y += 750;
				destPosition.z += 700;
				destPosition.zoom = zoom;

				// Position the camera to fit
				var tween = new TWEEN.Tween(position).to({
					x: destPosition.x,
					y: destPosition.y,
					z: destPosition.z,
					zoom: destPosition.zoom
				},500).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
					$scope.camera.position.copy(position);
					if(zoom) {
						$scope.camera.zoom = position.zoom;
						$scope.camera.updateProjectionMatrix();
					}
				}).onComplete(function () {
//					$scope.camera.lookAt(bullseye);
				}).start();
			};

			$scope.moveCameraFast = function (target) {

				var position = $scope.camera.position.clone();
				position.zoom = $scope.camera.zoom;
				var destPosition;
				if(target) {
					destPosition = target.clone();
				} else {
					destPosition = position.clone();
				}
				destPosition.x -= 700;
				destPosition.y += 750;
				destPosition.z += 700;
				destPosition.zoom = zoom;

				// Position the camera to fit
				var tween = new TWEEN.Tween(position).to({
					x: destPosition.x,
					y: destPosition.y,
					z: destPosition.z,
					zoom: destPosition.zoom
				},500).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
					$scope.camera.position.copy(position);
					if(zoom) {
						$scope.camera.zoom = position.zoom;
						$scope.camera.updateProjectionMatrix();
					}
				}).onComplete(function () {
//					$scope.camera.lookAt(bullseye);
				}).start();
			};

			$scope.yardMouseClick = function(e) {
				$scope.highlightTruckKPI = false;

			};

			$scope.yardMouseDown = function(e) {
				$scope.mouseDown = true;
				$scope.isMapMoving = false;
				$scope.mouseMoved = false;
			};

			$scope.yardMouseMove = function(e) {
				if($scope.containerData) {
					$scope.yAxis = e.clientX - (e.clientX - e.offsetX)+10;
					$scope.xAxis = e.clientY - (e.clientY - e.offsetY);
				}
				clientXY.x = e.clientX;
				clientXY.y = e.clientY;
				$scope.normalizedMouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
				$scope.normalizedMouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;


				if ($scope.mouseDown) {
					$scope.mouseMoved = true;
					$scope.isMapMoving = true;
					$scope.userAction = $scope.USER_ACTION_MAP_MOVE;
				}
			};


			$scope.yardMouseUp = function(e) {

				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue= false;
				}

				if ($scope.mouseOverContainer && !$scope.isMapMoving) {

					if(!e.shiftKey) {
						$scope.unselectContainers();
					}
					var containerToSelect = containerMgr.getContainerById($scope.mouseOverContainer.containerId);
					$scope.selectContainer(containerToSelect);
					$scope.userAction = $scope.USER_ACTION_SELECT_CONTAINER;
				} else if ( $scope.mouseOverCrane && !$scope.isMapMoving ) {

					// TODO: reset all crane colors when a new crane is selected.
					craneSvc.showCraneAsSelected($scope.mouseOverCrane);
					$scope.userAction = $scope.USER_ACTION_SELECT_CRANE;
					$scope.selectedCrane = craneSvc.getCraneById($scope.mouseOverCrane);

				} else if ( $scope.mouseOverHostler && !$scope.isMapMoving ) {

					// TODO: reset all hostler colors when a new crane is selected.
					hostlerMgrSvc.showHostlerAsSelected($scope.mouseOverHostler);
					$scope.userAction = $scope.USER_ACTION_SELECT_HOSTLER;
					$scope.selectedHostler = hostlerMgrSvc.getHostlerById($scope.mouseOverHostler);
				} else {
					// ******** DEBUG ********
					// ***********************
					$scope.raycaster.setFromCamera($scope.normalizedMouse, $scope.camera);
//					var intersects = $scope.raycaster.intersectObjects($scope.craneMeshes, true);
					var intersects = $scope.raycaster.intersectObject($scope.finalGrass);

					// Found a CRANE
					if (intersects && intersects.length > 0 && intersects[0].point) {
						$log.debug('x: ', intersects[0].point.x);
						$log.debug(intersects);
					}
				}

				if ( !$scope.isMapMoving && $scope.userAction !== $scope.USER_ACTION_SELECT_CRANE ) {
					//TODO:  Do stuff to unslect a crane.
					// close large card.
					$scope.selectedCrane = null;
				}
				if ( !$scope.isMapMoving && $scope.userAction !== $scope.USER_ACTION_SELECT_HOSTLER ) {
					//TODO:  Do stuff to unslect a crane.
					// close large card.
					$scope.selectedHostler = null;
				}
				if ( !$scope.isMapMoving && $scope.userAction !== $scope.USER_ACTION_SELECT_CONTAINER ) {
					$scope.unselectContainers();
				}

				$scope.mouseDown = false;
				$scope.userAction = null;
				return false;
			};

			$scope.onMouseLeave = function(e){
				$scope.mapControls.stopPan();
				$scope.mouseDown = false;
			};

			function pick(){

				//render the picking scene off-screen
				renderer.render(pickingScene, $scope.camera, pickingTexture);

				//create buffer for reading single pixel
				var pixelBuffer = new Uint8Array(4);

				//read the pixel under the mouse from the texture
				renderer.readRenderTargetPixels(pickingTexture, clientXY.x, pickingTexture.height - clientXY.y, 1, 1, pixelBuffer);

				//interpret the pixel as an ID
				var id = ( pixelBuffer[0] << 16 ) | ( pixelBuffer[1] << 8 ) | ( pixelBuffer[2] );
				var data = pickingData[id];
				$scope.mouseOverContainer = pickingData[id];

				if(data){

					//move our highlightBox so that it surrounds the picked object
					if (data.position && data.rotation && data.scale) {
						// get the unitData based on the containerId
						var unitData = containerMap[data.containerId];
						highlightBox.position.copy(data.position);
						//highlightBox.position.z += 1;
						highlightBox.rotation.copy(data.rotation);
						highlightBox.scale.copy(data.scale).add(offset);
						highlightBox.visible = true;

						if (data.containerData.containerType === 'PICKING') {
							$scope.containerData = (containerMgr.getUnitDetailsByStackId(data.containerData.slotNbr));
						} else {
							$scope.containerData = [data];
						}
					}

				} else {
					highlightBox.visible = false;
					$scope.mouseOverContainer = null;
                    $scope.containerData = null;



					// RAY CAST FOR MOVING OBJECTS
					//************************
					$scope.raycaster.setFromCamera($scope.normalizedMouse, $scope.camera);
//					var intersects = $scope.raycaster.intersectObjects($scope.craneMeshes, true);
					var intersects = $scope.raycaster.intersectObjects($scope.selectableMovingAssets, true);

					// Found a CRANE
					if (intersects.length && intersects[0].object.userData.objectType === 'CRANE') {

						// Un-highlight hostlers if currently highlighted.
						if ( !$scope.selectedHostler ) {
							hostlerMgrSvc.startHostlers();
						}
						$scope.mouseOverHostler = null;

						$log.debug(intersects);
						var craneId = intersects[0].object.userData.craneId;

						if ( craneId != $scope.mouseOverCrane ) {
							$scope.mouseOverCrane = craneId;
							$log.debug(craneId);
							craneSvc.stopCrane(craneId);
							craneSvc.showCraneAsSelectable(craneId);
						}

					// Found a HOSTLER
					} else if (intersects.length && intersects[0].object.userData.objectType === 'HOSTLER') {

						// Un-highlight crane if applicable.
						if ( !$scope.selectedCrane ) {
							craneSvc.startCranes();
						}
						$scope.mouseOverCrane = null;

						$log.debug('HOSTLER');
						$log.debug('hostlerId: ', intersects[0].object.userData.hostlerId, 'hostlerName: ', intersects[0].object.userData.hostlerName);
						$log.debug(intersects[0]);
						var hostlerId = intersects[0].object.userData.hostlerId;

						if ( hostlerId != $scope.mouseOverHostler ) {
							$scope.mouseOverHostler = hostlerId;
							$log.debug(hostlerId);
							hostlerMgrSvc.stopHostler(hostlerId);
							hostlerMgrSvc.showHostlerAsSelectable(hostlerId);
						}

					} else {
						// If not over a crane or a hostler un-highlight both
						if ( !$scope.selectedCrane ) {
							craneSvc.startCranes();
						}
						$scope.mouseOverCrane = null;

						if ( !$scope.selectedHostler ) {
							hostlerMgrSvc.startHostlers();
						}
						$scope.mouseOverHostler = null;
					}




				}
			};

			function animate(){

				TWEEN.update();
				//requestAnimationFrame
				requestAnimationFrame(animate);
				if (isOrbitControlsEnabled) {
					$scope.mapControls.update();
				}

				if ($scope.showGyro) {
					camera2.position.copy(camera.position);
					camera2.position.setLength(300);
					camera2.lookAt(scene2.position);
				}

				render();
				if ($scope.showStats) {
					stats.update();
				}
			};

			function render() {

				pick();
				renderer.setViewport( 0, 0, WIDTH, HEIGHT );
				renderer.clear();
				renderer.render(scene, $scope.camera);

				renderer.clearDepth();

				// minimap (overhead orthogonal $scope.camera)
				//  lower_left_x, lower_left_y, viewport_width, viewport_height
				//  minimap.dimensions = {lower_left_x: 25, lower_left_y: $scope.LAND.height/24 - 125, $scope.LAND.width/24, width: $scope.LAND.width/24, height: $scope.LAND.height/24}
//				renderer.setViewport( minimap.dimensions.lower_left_x, minimap.dimensions.lower_left_y, minimap.dimensions.width, minimap.dimensions.height );
//				renderer.render( scene, mapCamera );

				if ($scope.showGyro) {
					renderer2.render(scene2, camera2);
				}
			};

			$scope.toggleQuickSearch = function(event) {
				if (event.which === 32) {
					$scope.isShowQuickSearch = $scope.isShowQuickSearch ? false : true;
				}
			};

			$scope.quickSearch = function() {
				$log.info('you just searched');
				if (!angular.isNumber(Number($scope.search.target))) { return; }
				var x = containerMgr.getContainerById($scope.search.target);
				if (x) {
					$scope.unselectContainers();
					$scope.selectContainer(x);
					$scope.moveCamera(x.mesh.position, 4.0);
				}
//				var s = [containerMgr.getContainerById(900), containerMgr.getContainerById(899)];
//				selectContainer(s);
			};


            $scope.selectContainerOnSearch = function (unitNbr) {
                var c = containerMgr.getContainerByUnitNbr(+unitNbr);
                if (c) {
                    $scope.unselectContainers();
                    $scope.selectSearchContainers(c);
                    $scope.moveCamera(c.mesh.position, 4.0);
                } else {
                    $scope.moveCamera(null, 1.0);
                }

                if(!unitNbr) {
                    $scope.unselectContainers();
                }
            };

            $scope.selectSearchContainers = function(selected) {
                if (!selected) {return null;}

                containerMgr.makeAllContainersTransparent();

                $rootScope.selectedContainers = [];
                if (!angular.isArray(selected) && selected.containerType === 'PICKING') {
                    $rootScope.selectedContainers = containerMgr.getContainersByStackId(selected.mesh.userData.unitData.slotNbr);
                } else {
                    // If only one object is given then add that object to an array as it's only element.
                    $rootScope.selectedContainers = angular.isArray(selected) ? selected : [selected];
                }
                highlightContainers($rootScope.selectedContainers);
            };

			$scope.selectContainerByUnitNbr = function(unitNbr) {
				$log.debug('you just searched by Unit Number' +unitNbr);
				var c = containerMgr.getContainerByUnitNbr(+unitNbr);
				if (c) {
					$scope.unselectContainers();
					$scope.selectContainer(c);
					$scope.moveCamera(c.mesh.position, 4.0);
				} else {
					$scope.moveCamera(null, 1.0);
				}

				if(!unitNbr) {
					$scope.unselectContainers();
				}
			};

			$scope.selectedContainers = [];
			$scope.selectContainer = function(selected) {
				if (!selected) {return null;}

				$log.debug(selected);
				containerMgr.makeAllContainersTransparent();

				$rootScope.selectedContainers = [];
				if (!angular.isArray(selected) && selected.containerType === 'PICKING') {
					$rootScope.selectedContainers = containerMgr.getContainersByStackId(selected.mesh.userData.unitData.slotNbr);
					$log.debug(containerMgr.getUnitDetailsByStackId(selected.mesh.userData.unitData.slotNbr));
					$scope.filteredResult = '';
					$scope.smallCardInfo = containerMgr.getUnitDetailsByStackId(selected.mesh.userData.unitData.slotNbr);
					console.log($scope.smallCardInfo);
				} else {
					// If only one object is given then add that object to an array as it's only element.
					$rootScope.selectedContainers = angular.isArray(selected) ? selected : [selected];
					$scope.filteredResult = '';
					$scope.smallCardInfo = [containerMgr.getUnitDetailsByContainerId(selected.id)];
					console.log($scope.smallCardInfo);
				}
				highlightContainers($rootScope.selectedContainers);
			};

			var highlightContainers = function(selectedTargets) {
				if (!selectedTargets) {return null;}
				var selectBox;
				for (var i= 0, len=selectedTargets.length; i<len; i++) {
					var target = selectedTargets[i];
					selectBox = containerMgr.createSelectBox(target, 0x66ffff);
				}
				return selectBox;
			};

			$scope.unselectContainers = function() {
//                $timeout(function () {
                    $scope.smallCardInfo = '';
//                });
				containerMgr.makeAllContainersOpaque();
				containerMgr.removeAllSelections();
				$rootScope.selectedContainers = [];
				if($rootScope.focusedContainer) {
					$rootScope.focusedContainer.selected = false;
				}
				$rootScope.focusedContainer = null;
//				selectBox.visible = false;
			};

			$scope.rotate = function($event, isClockwise) {

				// Swallow mouse event
				$event.preventDefault();
				$event.stopPropagation();

				var ROTATE_CONST = (Math.PI / 2);
				var rotateAngle = isClockwise ? ROTATE_CONST : - ROTATE_CONST;

				var camRotation = $scope.camera.rotation.clone();
				var camPosition = $scope.camera.position.clone();
				var scenePosition = containerMgr.getScene().position.clone();

				var camLandPosition = null;
				$scope.raycaster.setFromCamera(camRotation, $scope.camera);

				var intersectionObjects = [ $scope.landMesh ];
				var intersects = $scope.raycaster.intersectObjects(intersectionObjects);
				camLandPosition = intersects[0].point;

				var tweenObj = {
					camPositionX: camPosition.x,
					camPositionY: camPosition.y,
					camPositionZ: camPosition.z,
					camRotationX: camRotation.x,
					camRotationY: camRotation.y,
					camRotationZ: camRotation.z
				};

				// Position the camera to fit
				var tween = new TWEEN.Tween(tweenObj).to({
					camPositionX: camPosition.x,
					camPositionY: camPosition.y,
					camPositionZ: camPosition.z,
					camRotationX: camRotation.x,
					camRotationY: camRotation.y,
					camRotationZ: camRotation.z
				},500).easing(TWEEN.Easing.Linear.None).onUpdate(function () {

					$scope.camera.updateProjectionMatrix();
				}).onComplete(function () {
				}).start();
			};

			$scope.zoom = function(event, delta) {

				// get absolute value of delta using bitwise operation.
//				var abs = (delta ^ (delta >>31))-(delta>>31);
				var abs = Math.abs(delta);
				if ( delta > 0 ) {
					$scope.mapControls.dollyOut(abs);
				} else if ( delta < 0 ) {
					$scope.mapControls.dollyIn(abs);
				}

//				$scope.mapControls.update();
			};

			$scope.toggle_birdseye = function($event) {

				$scope.is_birdseye = !$scope.is_birdseye;

				var tweenObj = {
					camPositionX: $scope.camera.position.x,
					camPositionY: $scope.camera.position.y,
					camPositionZ: $scope.camera.position.z,
					camRotationX: $scope.camera.rotation.x,
					camRotationY: $scope.camera.rotation.y,
					camRotationZ: $scope.camera.rotation.z,
					camZoom: $scope.camera.zoom,
				};

				var destTweenObj;
				if($scope.is_birdseye) {

					destTweenObj = {
						camPositionX: 1500,
						camPositionY: 5000,
						camPositionZ: -100,
						camRotationX: - Math.PI / 2,
						camRotationY: 0,
						camRotationZ: 0,
						camZoom: 1.0
					};

				} else {

					destTweenObj = {
						camPositionX: 1500,
						camPositionY: 0,
						camPositionZ: 500,
						camRotationX: Math.atan( - 1 / Math.sqrt( 2 ) ),
						camRotationY: - Math.PI / 4,
						camRotationZ: 0,
						camZoom: 1.0
					};
				}

				var tween = new TWEEN.Tween(tweenObj).to(destTweenObj,1000)
				.easing(TWEEN.Easing.Linear.None).onUpdate(function () {

					$scope.camera.position.x = tweenObj.camPositionX;
					$scope.camera.position.y = tweenObj.camPositionY;
					$scope.camera.position.z = tweenObj.camPositionZ;
					$scope.camera.rotation.x = tweenObj.camRotationX;	
					$scope.camera.rotation.y = tweenObj.camRotationY;
					$scope.camera.rotation.z = tweenObj.camRotationZ;
					$scope.camera.zoom = tweenObj.camZoom;
					$scope.camera.updateProjectionMatrix();
				}).onComplete(function () {
				}).start();

				
			};

//TODO: clean up this code.
			// Code to transform SVG paths to threejs shapes.
			const DEGS_TO_RADS = Math.PI / 180,
				UNIT_SIZE = 100;

			const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46,
				MINUS = 45;
			function transformSVGPath(pathStr) {
				var path = new THREE.Shape();

				var idx = 1, len = pathStr.length, activeCmd,
					x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
					x1 = 0, x2 = 0, y1 = 0, y2 = 0,
					rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

				function eatNum() {
					var sidx, c, isFloat = false, s;
					// eat delims
					while (idx < len) {
						c = pathStr.charCodeAt(idx);
						if (c !== COMMA && c !== SPACE)
							break;
						idx++;
					}
					if (c === MINUS)
						sidx = idx++;
					else
						sidx = idx;
					// eat number
					while (idx < len) {
						c = pathStr.charCodeAt(idx);
						if (DIGIT_0 <= c && c <= DIGIT_9) {
							idx++;
							continue;
						}
						else if (c === PERIOD) {
							idx++;
							isFloat = true;
							continue;
						}

						s = pathStr.substring(sidx, idx);
						return isFloat ? parseFloat(s) : parseInt(s);
					}

					s = pathStr.substring(sidx);
					return isFloat ? parseFloat(s) : parseInt(s);
				}

				function nextIsNum() {
					var c;
					// do permanently eat any delims...
					while (idx < len) {
						c = pathStr.charCodeAt(idx);
						if (c !== COMMA && c !== SPACE)
							break;
						idx++;
					}
					c = pathStr.charCodeAt(idx);
					return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
				}

				var canRepeat;
				activeCmd = pathStr[0];
				while (idx <= len) {
//					$log.debug('idx: ', idx);
					canRepeat = true;
					switch (activeCmd) {
						// moveto commands, become lineto's if repeated
						case 'M':
							x = eatNum();
							y = eatNum();
							path.moveTo(x, y);
							activeCmd = 'L';
							break;
						case 'm':
							x += eatNum();
							y += eatNum();
							path.moveTo(x, y);
							activeCmd = 'l';
							break;
						case 'Z':
						case 'z':
							canRepeat = false;
							if (x !== firstX || y !== firstY)
								path.lineTo(firstX, firstY);
							break;
						// - lines!
						case 'L':
						case 'H':
						case 'V':
							nx = (activeCmd === 'V') ? x : eatNum();
							ny = (activeCmd === 'H') ? y : eatNum();
							path.lineTo(nx, ny);
							x = nx;
							y = ny;
							break;
						case 'l':
						case 'h':
						case 'v':
							nx = (activeCmd === 'v') ? x : (x + eatNum());
							ny = (activeCmd === 'h') ? y : (y + eatNum());
							path.lineTo(nx, ny);
							x = nx;
							y = ny;
							break;
						// - cubic bezier
						case 'C':
							x1 = eatNum(); y1 = eatNum();
						case 'S':
							if (activeCmd === 'S') {
								x1 = 2 * x - x2; y1 = 2 * y - y2;
							}
							x2 = eatNum();
							y2 = eatNum();
							nx = eatNum();
							ny = eatNum();
							path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
							x = nx; y = ny;
							break;
						case 'c':
							x1 = x + eatNum();
							y1 = y + eatNum();
						case 's':
							if (activeCmd === 's') {
								x1 = 2 * x - x2;
								y1 = 2 * y - y2;
							}
							x2 = x + eatNum();
							y2 = y + eatNum();
							nx = x + eatNum();
							ny = y + eatNum();
							path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
							x = nx; y = ny;
							break;
						// - quadratic bezier
						case 'Q':
							x1 = eatNum(); y1 = eatNum();
						case 'T':
							if (activeCmd === 'T') {
								x1 = 2 * x - x1;
								y1 = 2 * y - y1;
							}
							nx = eatNum();
							ny = eatNum();
							path.quadraticCurveTo(x1, y1, nx, ny);
							x = nx;
							y = ny;
							break;
						case 'q':
							x1 = x + eatNum();
							y1 = y + eatNum();
						case 't':
							if (activeCmd === 't') {
								x1 = 2 * x - x1;
								y1 = 2 * y - y1;
							}
							nx = x + eatNum();
							ny = y + eatNum();
							path.quadraticCurveTo(x1, y1, nx, ny);
							x = nx; y = ny;
							break;
						// - elliptical arc
						case 'A':
							rx = eatNum();
							ry = eatNum();
							xar = eatNum() * DEGS_TO_RADS;
							laf = eatNum();
							sf = eatNum();
							nx = eatNum();
							ny = eatNum();
							if (rx !== ry) {
								console.warn("Forcing elliptical arc to be a circular one :(",
									rx, ry);
							}
							// SVG implementation notes does all the math for us! woo!
							// http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
							// step1, using x1 as x1'
							x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
							y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
							// step 2, using x2 as cx'
							var norm = Math.sqrt(
									(rx*rx * ry*ry - rx*rx * y1*y1 - ry*ry * x1*x1) /
									(rx*rx * y1*y1 + ry*ry * x1*x1));
							if (laf === sf)
								norm = -norm;
							x2 = norm * rx * y1 / ry;
							y2 = norm * -ry * x1 / rx;
							// step 3
							cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
							cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;

							var u = new THREE.Vector2(1, 0),
								v = new THREE.Vector2((x1 - x2) / rx,
										(y1 - y2) / ry);
							var startAng = Math.acos(u.dot(v) / u.length() / v.length());
							if (u.x * v.y - u.y * v.x < 0)
								startAng = -startAng;

							// we can reuse 'v' from start angle as our 'u' for delta angle
							u.x = (-x1 - x2) / rx;
							u.y = (-y1 - y2) / ry;

							var deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
							// This normalization ends up making our curves fail to triangulate...
							if (v.x * u.y - v.y * u.x < 0)
								deltaAng = -deltaAng;
							if (!sf && deltaAng > 0)
								deltaAng -= Math.PI * 2;
							if (sf && deltaAng < 0)
								deltaAng += Math.PI * 2;

							path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
							x = nx;
							y = ny;
							break;
						default:
							throw new Error("weird path command: " + activeCmd);
					}
					if (firstX === null) {
						firstX = x;
						firstY = y;
					}
					// just reissue the command
					if (canRepeat && nextIsNum())
						continue;
					activeCmd = pathStr[idx++];
				}

//				$log.debug('path: ');
//				$log.debug(path);
				return path;
			}

			$scope.shipperNameMapByShipperId = {
				'CMACGMAMELLC':		'OOCL',
				'JBHUNTRANSPO':		'DEFAULT',
				'MEDITESHICOU':		'JB',
				'CHINASHINAME':		'MAERSK',
				'YANGMINMARLI':		'HANJIN',
				'MAERSK':		'HYUNDAI',
				'MOLAMERICA':		'OOCL',
				'HANJINSHIPPI':		'JB',
				'COSCOCONLINA':		'MAERSK',
				'HYUNDAINTERM':		'HANJIN',
				'UNITEDPARSER':		'HYUNDAI',
				'AGENT':		'OOCL',
				'DIRECTCHASSI':		'JB',
				'OOCLUSA':		'MAERSK',
				'SWIFTINTLLC':		'HANJIN',
				'TRACCOOPPOOL':		'HYUNDAI',
				'NYKINTL':		'OOCL',
				'INTERDLLC':		'JB',
				'SCHNEINATL':		'MAERSK',
				'KLINE':		'HANJIN',
				'FEDEXFRT':		'HYUNDAI',
				'YRC':		'OOCL',
				'TRANSPSPECIA':		'JB',
				'EXPRESSYSINT':		'MAERSK',
				'UNITEDARASHI':		'HANJIN',
				'DARTINTERMOD':		'HYUNDAI',
				'EVERGRSHIAGE':		'OOCL',
				'TRACLEASE':		'JB',
				'UPSFRT':		'MAERSK',
				'HORIZOLINLLC':		'HANJIN',
				'247EXPLOGIST':		'HYUNDAI',
				'MARTENTRANSP':		'OOCL',
				'BOLDTRANSPOR':		'JB',
				'VITEX':		'MAERSK',
				'ABFFRTSYSTEM':		'HANJIN',
				'FEDEXGROPACS':		'HYUNDAI',
				'MATSONLOGIST':		'OOCL',
				'WERNERENTERP':		'JB',
				'DEFFENRECYCL':		'MAERSK',
				'AMERPRELINES':		'HANJIN',
				'NYKDOMESTIC':		'HYUNDAI',
				'TRANSPCORAME':		'OOCL',
				'CHROBINSON':		'JB',
				'MANAGEMATERI':		'MAERSK',
				'AGMARKFOODS':		'HANJIN',
				'FLATHEPOSPOL':		'HYUNDAI',
				'FLEXIVLEASIN':		'OOCL',
				'KOCHCOMPANIE':		'JB',
				'ALLIANSHIPPE':		'MAERSK',
				'BNSFRAILWAY':		'HANJIN',
				'CSXTRANSPORT':		'HYUNDAI',
				'DMCARLLC':		'OOCL',
				'MASONDIXSLIN':		'JB',
				'MIDAMEINTCOR':		'MAERSK',
				'NEWPRIME':		'HANJIN',
				'NOBILL':		'HYUNDAI',
				'PACIFIINTLIN':		'OOCL',
				'SCHMUHBROTHE':		'JB',
				'TERMINCONSOI':		'MAERSK',
				'TRANSBAYTRKG':		'HANJIN'
			};
			$scope.init();
		}]);
});
