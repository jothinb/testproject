/*global define */
define(['angular', 'models-module'], function (angular, models) {
	'use strict';
	console.log("Loading Crane model...");
	/* Services */
	models.value('version', '0.1');
	models.factory('Crane', function(){

		var craneColor = 0xED4F37;
//		var hoverColor = 0xff0000;
//		var selectedColor = 0x4BA4FF;
		var hoverColor = 0xff0000;
		var selectedColor = 0x00FFFF;

//		var craneMaterial = new THREE.MeshLambertMaterial({
//			color: craneColor,
//			opacity:1
//		});
		var legSvgs = [
			// Originals WITH holes
//					'M42.2,19.1h-10c-0.5,0-0.8,0.4-0.8,0.8c0,0.5,0.4,0.8,0.8,0.8h6.1c0.5-0.3,1.1-0.5,1.7-0.5c0.6,0,1.2,0.2,1.7,0.5h0.6c0.5,0,0.8-0.4,0.8-0.8C43,19.5,42.6,19.1,42.2,19.1z',
//					'M4.4,19.1H3.7V5.4h35.2v7.1h-6.7c-0.5,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8h10c0.5,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8h-1.3V5.4h0.6c0.6,0,1-0.4,1-1V4.3c0-0.6-0.4-1-1-1h-0.6V2.1h0.6c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H1C0.4,0,0,0.4,0,1v0.1c0,0.6,0.4,1,1,1h0.6v1.3H1c-0.6,0-1,0.4-1,1v0.1c0,0.6,0.4,1,1,1h0.6v13.7H0.9C0.4,19.1,0,19.5,0,20c0,0.5,0.4,0.8,0.8,0.8H1c0.5-0.3,1.1-0.5,1.7-0.5s1.2,0.2,1.7,0.5h0.1c0.5,0,0.8-0.4,0.8-0.8C5.2,19.5,4.9,19.1,4.4,19.1zM3.7,2.1h35.2v1.3H3.7V2.1z',
//					'M2.6,21.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5C5.2,22.2,4,21.1,2.6,21.1zM2.6,24.3c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C3.3,24,3,24.3,2.6,24.3z',
//					'M39.9,21.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5C42.4,22.2,41.3,21.1,39.9,21.1zM39.9,24.3c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C40.5,24,40.2,24.3,39.9,24.3z'

			// Modified WITHOUT holes
			// TODO: There are updated svg's for these.  Apply them.
			'M42.2,19.1h-10c-0.5,0-0.8,0.4-0.8,0.8c0,0.5,0.4,0.8,0.8,0.8h6.1c0.5-0.3,1.1-0.5,1.7-0.5c0.6,0,1.2,0.2,1.7,0.5h0.6c0.5,0,0.8-0.4,0.8-0.8C43,19.5,42.6,19.1,42.2,19.1z',
			'M4.4,19.1H3.7V5.4h35.2v7.1h-6.7c-0.5,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8h10c0.5,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8h-1.3V5.4h0.6c0.6,0,1-0.4,1-1V4.3c0-0.6-0.4-1-1-1h-0.6V2.1h0.6c0.6,0,1-0.4,1-1V1c0-0.6-0.4-1-1-1H1C0.4,0,0,0.4,0,1v0.1c0,0.6,0.4,1,1,1h0.6v1.3H1c-0.6,0-1,0.4-1,1v0.1c0,0.6,0.4,1,1,1h0.6v13.7H0.9C0.4,19.1,0,19.5,0,20c0,0.5,0.4,0.8,0.8,0.8H1c0.5-0.3,1.1-0.5,1.7-0.5s1.2,0.2,1.7,0.5h0.1c0.5,0,0.8-0.4,0.8-0.8C5.2,19.5,4.9,19.1,4.4,19.1z',
			'M2.6,21.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5C5.2,22.2,4,21.1,2.6,21.1z',
			'M39.9,21.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5c1.4,0,2.5-1.1,2.5-2.5C42.4,22.2,41.3,21.1,39.9,21.1z'
		];


		function Crane(id, name, position, craneData) {
			this.id = id;
			this.name = name;
			this.position = position ? new THREE.Vector3(position.x, position.y, position.z) : null;
			this.boundingBox = null;
			this.mesh = this.createCrane(id, this.position);  //<-- Actually a THREE.Group, we should rename this.
			this.isStop = false;
			this.tween = {};
			this.objectType = 'CRANE';
		};

		Crane.prototype.createCrane = function(craneId, position) {

			var craneMaterial = new THREE.MeshLambertMaterial({
				color: craneColor,
				opacity:1
			});

			var crane = new THREE.Group();
			var craneLeg = new THREE.Group();
			var self = this;

			crane.craneId = craneId;
			crane.objectType = 'CRANE';
			for (var i=0; i<legSvgs.length;i++) {
				var svgPath = legSvgs[i];
				var shape = transformSVGPath(svgPath);
				var xtrd = shape.extrude({ amount:4, bevelEnabled:false });

				xtrd.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 1.0));
				xtrd.applyMatrix(new THREE.Matrix4().makeTranslation(0, 26, 0));

				var xtrdMesh = new THREE.Mesh(xtrd, craneMaterial);
				xtrdMesh.userData.craneId = self.id;
				xtrdMesh.userData.objectType = 'CRANE';
				xtrdMesh.scale.set(2,2,1);

				craneLeg.add(xtrdMesh);
			}

			var craneLeg2 = craneLeg.clone();
			craneLeg2.translateZ(160);

			crane.add(craneLeg);
			crane.add(craneLeg2);


			var crossbar = new THREE.Group();

			var crossBarPath = 'm0,0h300v8h-300v-8z';
			var shape = transformSVGPath(crossBarPath);
			var cbXtrd = shape.extrude({ amount:4, bevelEnabled:false });
			cbXtrd.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI * 0.5));
			cbXtrd.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 0.5));
			cbXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(4, 56, 0));

			var cbXtrdMesh = new THREE.Mesh(cbXtrd, craneMaterial);
			cbXtrdMesh.userData.craneId = self.id;
			cbXtrdMesh.userData.objectType = 'CRANE';

			crossbar.add(cbXtrdMesh);

			var crossBarEnd1Path = 'm0,0h100v4h-100z';
			var shape = transformSVGPath(crossBarEnd1Path);
			var cbEndXtrd = shape.extrude({ amount:4, bevelEnabled:false });
			cbEndXtrd.applyMatrix(new THREE.Matrix4().makeTranslation(4, 52, 296));

			var cbEndMesh = new THREE.Mesh(cbEndXtrd, craneMaterial);
			cbEndMesh.userData.craneId = self.id;
			cbEndMesh.userData.objectType = 'CRANE';

			crossbar.add(cbEndMesh);

			var cb2 = crossbar.clone();
			cb2.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI * 1));
			cb2.applyMatrix(new THREE.Matrix4().makeTranslation(100, 0, 300));
			crossbar.add(cb2);
			crossbar.scale.set(.8,1,1);
			crossbar.translateZ(-70);

			crane.add(crossbar);
			crane.position.set(position.x, position.y, position.z);
//			crane.translateZ(-1240);
			crane.scale.set(1.2,1.1,2);


			crane.isStop = false;
			crane.tweens = [];
			crane.stopTween = function() {
				var self = this;
				if ( !self.isStop ) {
					self.isStop = true;
					while (self.tweens && self.tweens.length) {
						var twn = self.tweens.pop();
						twn.stop();
					}
				}
			};

			crane.move = function(movement) {
				var self = this;

				if ( self.isStop ) { return; }

				var time = 3000;
				var end = new THREE.Vector3(movement.x, 0, self.position.z);

				if (self.position.x !== end.x) {
					onMove(self, self.position, end, time);
				}
			};

			function onMove(crane, start, end, time) {

				if (!crane.isTweening && start && end) {
					var twn = new TWEEN.Tween(start, {override:true})
						.to(end, time )
						.easing(TWEEN.Easing.Linear.None)
						.onStart(function () {
							crane.isTweening = true;
						})
						.onUpdate(function () {
							//crane.position.setX(start.x);
//							crane.position.setZ(start.y);
//							crane.mesh.updateMatrix();
						})
						.onComplete(function () {
							onCompleteHandler(crane)
						})
						.start();
					crane.tweens.push(twn);
					return twn;
				}
			};

			crane.showAsSelectable = function() {
				var self = this;
				setEmissiveColor( self, hoverColor );
			};

			crane.showAsSelected = function() {
				var self = this;
				setEmissiveColor( self, selectedColor );
			};

			crane.resetColor = function() {
				var self = this;
//				setEmissiveColor( self, 0x000000 );
				crane.traverse(function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.material.emissive.setHex( 0x000000 );
						child.material.color.setHex(craneColor);
					}
				});

			};

			function setEmissiveColor(crane, color) {
				crane.traverse(function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.material.emissive.setHex( color );
						child.material.color.setHex(0x000000);
					}
				});
			};


			var onCompleteHandler = function(c) {
				// correct for Tween interpolation
				c.position.x = Math.round(c.position.x);
				c.position.y = Math.round(c.position.y);
				c.position.z = Math.round(c.position.z);
				c.isTweening = false;
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



			return crane;
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

		return Crane;
	});

	return models;
});
