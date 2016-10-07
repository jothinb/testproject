/* jshint unused: false */
define(['angular','directives-module', 'text!./mini-map-template.html'], function (angular, directives, miniMapTmpl) {
	'use strict';
	return directives.directive('miniMap', function () {
		return {
			scope: false,
			restrict: 'E',
			replace: true,
			template: miniMapTmpl,
			link: function(scope, element, attribute) {

				var isMiniMapDrag = false;
				var frameX, frameY;

//				var cameraInitialX = 1500;
//				var cameraViewOffset = 120;  // <-This is just a horrible way to do this but... we're doing it.
				var stackStart = -10493;
				var stackEnd = 10493;
				var totalSize = stackEnd - stackStart;
				var MAX_SVG_X =292;    // + some offset
				var MIN_SVG_X =54;  // + some offset

				scope.zoomScale = attribute.zoomScale ? +attribute.zoomScale : 0.75;

				var drag = d3.behavior.drag()
//					.origin(function(d) { return d; })
					.on("dragstart", dragstarted)
					.on("drag", dragged)
					.on("dragend", dragended);

				function dragstarted(d) {
					isMiniMapDrag = true;
					d3.event.sourceEvent.stopPropagation();
					d3.select(this).classed("dragging", true);

					var frameTranslate = getXYFromTranslate(frame.attr("transform"));
					frameX = frameTranslate[0];
					frameY = frameTranslate[1];
				};

				var buff =0;
				function dragged(d) {
					console.log('frameX: ' +frameX);
					console.log('dx: ' +d3.event.dx);
					var currentX = frameX + d3.event.dx;
					frameX += d3.event.dx;
					frameY = 5;
					if (currentX < MIN_SVG_X || currentX > MAX_SVG_X || buff !==0) {
						return;
					}

					d3.select(this).attr("transform", "translate(" + frameX + "," + frameY + ")");
					var newX = (frameX/mmWidth) *totalSize +stackStart;
					console.log(newX);
//					scope.camera.position.x = newX;

					var destPosition = scope.camera.position.clone();
					destPosition.x = newX;

//					console.log('destPosition: ');
//					console.log(destPosition);
					scope.camera.position.copy(destPosition);
					scope.camera.updateProjectionMatrix();

				}

				function dragended(d) {
					d3.select(this).classed("dragging", false);
					isMiniMapDrag = false;
				}

				var getXYFromTranslate = function(translateString) {
					var split = translateString.split(",");
					var x = split[0] ? ~~split[0].split("(")[1] : 0;
					var y = split[1] ? ~~split[1].split(")")[0] : 0;
					return [x, y];
				};

				var frame = d3.select('.frame');
				frame.call(drag);

				var minimap = d3.select('.minimap');
//				minimap.call(mouseClick);


				var mmWidth = 293;
				var initialY = 5;

				var init = function() {
//					var relativeX = (scope.camera.position.x -stackStart) / totalSize;
					var camPosition = scope.camera.position.x;
					var mapMiddle = totalSize /2;
					var relativeX = (camPosition -stackStart) / totalSize;
//					var mmWidth = attribute.w;
					var initialX = mmWidth * relativeX ;

					frame.attr("transform", "translate(" + initialX + "," + initialY + ")");
				};

				scope.$watch(function(scope) { return scope.camera.position.x },
					function(newValue, oldValue) {
						if (isMiniMapDrag) {
							return;
						}
//						console.log('Camera position change:');
//						console.log(newValue);
						var relativeX = (newValue -stackStart) / totalSize;
//						var mmWidth = attribute.w;
						var x = mmWidth * relativeX;
//						var initialY = 80;

						frame.attr("transform", "translate(" +x +"," +initialY +")");
					}
				);

				init();
			}  //End Link()
		};
	});
});
