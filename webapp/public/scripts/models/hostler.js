/*global define */
define(['angular', 'models-module'], function (angular, models) {
	'use strict';
console.log("Loading Hostler model...");
	/* Services */
	models.value('version', '0.1');
	models.factory('Hostler', function(){

		var hoverColor = 0xff0000;
		var selectedColor = 0x4BA4FF;

		var geometry = new THREE.BoxGeometry( 46, 16, 16 );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
		Hostler.geometry = geometry;

		//id, location, yRotation, color
		function Hostler(id, location, yRotation) {
			this.id = id;
			this.name = 'h_' +id;
			this.x = location.x || 0;
			this.y = location.y || 0;
			this.z = location.z || 0;
			this.yRotation = yRotation || 0;
//			this.color = color;
			this.mesh = this.createBox(id, this.name);
			this.geometry = 7;
		};

		Hostler.prototype.getPosition = function() {
			return {x: this.x, y: this.y, z: this.z};
		};

		//Private function
		Hostler.prototype.createBox = function(id, name) {


			//TODO: Add Hostlers
			var svgPaths = [

				// Back bumper
				'M42,13.9L42,13.9l-2.4,0c0.2,0.4,0.3,0.9,0.3,1.4c0,0.2,0,0.5-0.1,0.7H42v0c0.6,0,1-0.5,1-1C43,14.4,42.5,13.9,42,13.9z',
				// Cab
				'M11.7,13.9v-2.1v0V1c0-0.6-0.5-1-1-1H4.7c-0.4,0-0.8,0.3-1,0.7l-3.7,11C0,11.8,0,11.9,0,12v3c0,0.6,0.5,1,1,1h1c0-0.2-0.1-0.4-0.1-0.7c0-2.3,1.9-4.2,4.2-4.2c1.8,0,3.4,1.2,4,2.8c0.2,0.4,0.3,0.9,0.3,1.4c0,0.2,0,0.5-0.1,0.7c0,0,0,0,0,0h0.3c0,0,0,0,0,0h13.2c0-0.2-0.1-0.4-0.1-0.7c0-0.5,0.1-1,0.3-1.4H11.7zM9.1,10.3H3.6c-0.7,0-1.2-0.7-1-1.4l2.3-6.7c0.1-0.4,0.5-0.7,1-0.7h3.3c0.6,0,1,0.5,1,1v6.7C10.1,9.8,9.7,10.3,9.1,10.3z',
				// Front wheel
				'M6.1,12.1c-1.8,0-3.3,1.5-3.3,3.3c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6S9,17.5,9.3,16c0,0,0,0,0,0c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C8.5,12.8,7.4,12.1,6.1,12.1zM6.1,14.8c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5S5.9,14.8,6.1,14.8z',
				// Middle wheel
				'M28,12.1c-1.3,0-2.4,0.8-2.9,1.8c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6c1.6,0,2.9-1.1,3.2-2.6c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C30.4,12.8,29.3,12.1,28,12.1zM28.5,15.3c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5C28.3,14.8,28.5,15,28.5,15.3z',
				// Back wheel
				'M35.6,12.1c-1.3,0-2.4,0.8-2.9,1.8c-0.2,0.4-0.3,0.9-0.3,1.4c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6c1.6,0,2.9-1.1,3.2-2.6c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C38,12.8,36.9,12.1,35.6,12.1zM36.1,15.3c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5C35.9,14.8,36.1,15,36.1,15.3z'
			];


			//cab hole:  m-2.6,-3.6h-5.5c-0.7,0 -1.2,-0.7 -1,-1.4l2.3,-6.7c0.1,-0.4 0.5,-0.7 1,-0.7h3.3c0.6,0 1,0.5 1,1v6.7c-0.1,0.6 -0.5,1.1 -1.1,1.1z
			//ORIGINAL:  M9.1,10.3H3.6c-0.7,0-1.2-0.7-1-1.4l2.3-6.7c0.1-0.4,0.5-0.7,1-0.7h3.3c0.6,0,1,0.5,1,1v6.7C10.1,9.8,9.7,10.3,9.1,10.3z

			//cab trailer: h13.2c0,-0.2 -0.1,-0.4 -0.1,-0.7c0,-0.5 0.1,-1 0.3,-1.4h-12.3l0,0z

			//cab no hole + no trailer: m11.7,13.9v-2.1v0v-10.8c0,-0.6 -0.5,-1 -1,-1h-6c-0.4,0 -0.8,0.3 -1,0.7l-3.7,11c0,0.1 0,0.2 0,0.3v3c0,0.6 0.5,1 1,1h1c0,-0.2 -0.1,-0.4 -0.1,-0.7c0,-2.3 1.9,-4.2 4.2,-4.2c1.8,0 3.4,1.2 4,2.8c0.2,0.4 0.3,0.9 0.3,1.4c0,0.2 0,0.5 -0.1,0.7c0,0 0,0 0,0h0.3c0,0 0,0 0,0h1.1l0,-2.1z

			var hostler = new THREE.Group();
			var cabMaterial = new THREE.MeshLambertMaterial({
				color: 0xffffff,
				opacity:1
			});
			var trailerMaterial = new THREE.MeshLambertMaterial({
				color: 0x000000,
				opacity:1
			});
			var CAB_WIDTH = 8;
			// CAB
			var cabPath = 'm11.7,20v-2.1v0v-10.8c0,-0.6 -0.5,-1 -1,-1h-6c-0.4,0 -0.8,0.3 -1,0.7l-3.7,11c0,0.1 0,0.2 0,0.3v3c0,0.6 0.5,1 1,1h1c0,-0.2 -0.1,-0.4 -0.1,-0.7c0,-2.3 1.9,-4.2 4.2,-4.2c1.8,0 3.4,1.2 4,2.8c0.2,0.4 0.3,0.9 0.3,1.4c0,0.2 0,0.5 -0.1,0.7h1.4';
			var shape = transformSVGPath(cabPath);
			var cabXtrd = shape.extrude({ amount:CAB_WIDTH, bevelEnabled:false });
			cabXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1));
//				cabXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
			cabXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 40, 0));

			var cabMesh = new THREE.Mesh(cabXtrd, cabMaterial);
			cabMesh.userData.hostlerId = id;
			cabMesh.userData.hostlerName = name;
			cabMesh.userData.objectType = 'HOSTLER';
			hostler.add(cabMesh);


			// Trailer
			var trailerSvgPath = 'm9.1,10.3h13.2c0,-0.2 -0.1,-0.4 -0.1,-0.7c0,-0.5 0.1,-1 0.3,-1.4h-13.2z';
			var shape = transformSVGPath(trailerSvgPath);
			var trailerXtrd = shape.extrude({ amount:CAB_WIDTH, bevelEnabled:false });
			trailerXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1));
//				cabXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
			trailerXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(2.7, 28.2, 0));

			var trailerMesh = new THREE.Mesh(trailerXtrd, trailerMaterial);
			trailerMesh.userData.hostlerId = id;
			cabMesh.userData.hostlerName = name;
			trailerMesh.userData.objectType = 'HOSTLER';
			hostler.add(trailerMesh);


			//
			var wheelSvgPath = 'M6.1,12.1c-1.8,0-3.3,1.5-3.3,3.3c0,0.2,0,0.5,0.1,0.7c0.3,1.5,1.6,2.6,3.2,2.6S9,17.5,9.3,16c0,0,0,0,0,0c0-0.2,0.1-0.4,0.1-0.7c0-0.5-0.1-1-0.3-1.4C8.5,12.8,7.4,12.1,6.1,12.1zM6.1,14.8c0.3,0,0.5,0.2,0.5,0.5s-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5S5.9,14.8,6.1,14.8z';
			var shape = transformSVGPath(wheelSvgPath);
			var wheelXtrd = shape.extrude({ amount: CAB_WIDTH+2, bevelEnabled:false });
			wheelXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1));
//				cabXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
			wheelXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 34, 1));

			var wheelMesh = new THREE.Mesh(wheelXtrd, trailerMaterial);
			wheelMesh.userData.hostlerId = id;
			cabMesh.userData.hostlerName = name;
			wheelMesh.userData.objectType = 'HOSTLER';
			hostler.add(wheelMesh);

			var wheelMesh2 = wheelMesh.clone();
			wheelMesh2.scale.set(1, 1,.3);
			wheelMesh2.translateX(22.3);
			wheelMesh2.translateZ(1);
			hostler.add(wheelMesh2);

			var wheelMesh3 = wheelMesh.clone();
			wheelMesh3.scale.set(1, 1,.3);
			wheelMesh3.translateX(22.3);
			wheelMesh3.translateZ(-6);
			hostler.add(wheelMesh3);

//			scene.add(hostler);

			hostler.translateX(1500);
			hostler.translateZ(1000);








//			var hostlerMaterial = new THREE.MeshLambertMaterial({color: this.color || 0x0000ff, transparent: true, opacity: 0.6});
//			var hostler = new THREE.Mesh(Hostler.geometry, hostlerMaterial);
			hostler.isTweening = false;
			hostler.castShadow = true;
			hostler.name = 'h_' + this.id;
//			hostler.geometry.verticesNeedUpdate = true;
//			hostler.geometry.normalsNeedUpdate = true;
			hostler.position.x = this.x;
			hostler.position.y = this.y;
			hostler.position.z = this.z;
//			hostler.rotation.y = this.yRotation || 0;
			hostler.rotation.y = 0;

			hostler.move = function(movement) {
				var self = this;
				var time = 1000;
				var start = {
					x: self.position.x,
					y: self.position.y,
					z: self.position.z
				};
//				var rotEnd = {
//					x: self.rotation.x + movement.rotation.x * Math.PI,
//					y: self.rotation.y + movement.rotation.y * Math.PI,
//					z: self.rotation.z + movement.rotation.z * Math.PI
//				}
				var twnArray = onMove(self, start, movement.position, time);
				Array.prototype.push.apply(self.tweens, twnArray);
//				self.tweens.push(twn);
			};

			hostler.isStop = false;
			hostler.tweens = [];
			hostler.stopTween = function() {
				var self = this;
				if ( !self.isStop ) {
					self.isStop = true;
					while (self.tweens && self.tweens.length) {
						var twn = self.tweens.pop();
						if (twn) {
							twn.stop();
						}
					}
				}
			};

			hostler.showAsSelectable = function() {
				var self = this;
				setEmissiveColor( self, hoverColor );
			};

			hostler.showAsSelected = function() {
				var self = this;
				setEmissiveColor( self, selectedColor );
			};

			hostler.resetColor = function() {
				var self = this;
				setEmissiveColor( self, 0x000000 );
			};


			return hostler;
		};

		function onMove(hostler, start, end, time) {

			var rot = new THREE.Euler();
			rot.x = hostler.rotation.x;
			rot.y = getAngleFromPoints(start, end) +Math.PI/2; //<-- on x,z plane.
			rot.z = hostler.rotation.z;

			var newTweens = [];
			var rotateTween, positionTween;

			if ( hostler.isStop ) { return newTweens; }
			// Let's do these tweens asynchronously
			// Don't rotate if we're already facing the right direction.
			if ( hostler.rotation.y !== rot.y ) {
				rotateTween =  new TWEEN.Tween(hostler.rotation)
					.to({x: rot.x, y: rot.y, z: rot.z}, 500 )
					.easing(TWEEN.Easing.Linear.None)
					.onStart(function () {
						hostler.isTweening = true;
					})
					.onUpdate(function () {
					})
					.onComplete(function () {
					})
					.start();
			}

			positionTween = new TWEEN.Tween(start)
				.to(end, time)
				.easing(TWEEN.Easing.Linear.None)
				.onStart(function () {
					hostler.isTweening = true;
				})
				.onUpdate(function () {
					hostler.position.x = start.x;
					hostler.position.y = start.y;
					hostler.position.z = start.z;
				})
				.onComplete(function () {
					onCompleteHandler(hostler)
				})
				.start();

			if (rotateTween) {
				newTweens.push(rotateTween);
			}
			if (positionTween) {
				newTweens.push(positionTween);
			}
			return newTweens;
		};

		function getAngleFromPoints(firstPoint, secondPoint) {

			var x = secondPoint.x - firstPoint.x;
			var y = secondPoint.z - firstPoint.z;
			return Math.atan2(x, y);
		};

		function setEmissiveColor(crane, color) {
			crane.traverse(function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.emissive.setHex( color );
				}
			});
		};


		var onCompleteHandler = function(h) {
			// correct for Tween interpolation
			h.position.x = Math.round(h.position.x);
			h.position.y = Math.round(h.position.y);
			h.position.z = Math.round(h.position.z);
			h.isTweening = false;
		}

		function makeDelta(start, end) {
			if (start && end) {
				return {
					x: end.x - start.x,
					y: end.y - start.y,
					z: end.z - start.z
				};
			} else {
				return {x: 0, y: 0, z: 0};
			}
		};





		//TODO: put this code in a module.
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

			return path;
		}

		return Hostler;
	});

	return models;
});
