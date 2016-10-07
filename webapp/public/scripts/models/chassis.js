/*global define */
define(['angular', 'models-module'], function (angular, models) {
	'use strict';
	console.log("Loading Chassis model...");
	/* Services */
	models.value('version', '0.1');
	models.factory('Chassis', function(){


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

		var shapeArray = [];
		for (var i=0; i<chassisSvgPaths.length; i++) {
			// CAB
			var chassisPath = chassisSvgPaths[i];
			var shape = transformSVGPath(chassisPath);
			shapeArray.push(shape);
		}

		var chassisGeometry = new THREE.ExtrudeGeometry(shapeArray, {amount: CHASSIS_EXTRD, bevelEnabled: false});
//		chassisGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(200, 0, 500));

		Chassis.geometry = chassisGeometry;

		//id, location, yRotation, color
		function Chassis(id, location, yRotation, color) {
			this.id = id;
			this.name = 'chassis_' +id;
			this.x = location.x || 0;
			this.y = location.y || 0;
			this.z = location.z || 0;
			this.yRotation = yRotation || 0;
			this.color = color;
			this.mesh = this.createSelf();
		};


		//Private function
		Chassis.prototype.createSelf = function() {


			var containerMesh= new THREE.Mesh( Chassis.geometry, chassisMaterial );

			containerMesh.position.x	= this.x;
			containerMesh.position.y	= this.y;
			containerMesh.position.z	= this.z;

			containerMesh.rotation.y	= this.rotation.y || 0;

			containerMesh.scale.copy(this.scale);

			containerMesh.updateMatrix();

			return containerMesh;
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

		return Chassis;
	});

	return models;
});
