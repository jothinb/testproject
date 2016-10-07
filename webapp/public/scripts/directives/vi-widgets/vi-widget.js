/**
 * Created by 212403822 on 3/25/15.
 */
/* jshint unused: false */
define(['angular','directives-module', 'text!./vi-template.html'], function (angular, directives, viTmpl) {
	'use strict';
	return directives.directive('visualWidget', function () {
		return {
			scope: {
				address: '=',
				dataindex1: '='
			},
			restrict: 'E',
			replace: true,
			template: viTmpl,
			link: function(){
			},
			controller: function($scope, $rootScope, $timeout){
				function getCoordinates(address, callback) {
					callback('Replace With Promise');
				}
				$scope.Init = function(){
					$scope.map = true;
					$timeout(function() {
						var mapOptions = {
							zoom: 4,
							center: new google.maps.LatLng(39.81, -98.55),
							mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						var map = new google.maps.Map(document.getElementById('map-canvas' + $scope.dataindex1), mapOptions);
						var infoWindow = new google.maps.InfoWindow();
						if ($scope.address) {
							$scope.addressIndex = 0;
							for (var j = 0; j < $scope.address.configs.length; j++) {
								for (var i = 0; i < $scope.address.configs[j].data.length; i++) {
									getCoordinates($scope.address.configs[j].data[i].street, function () {
										var markerOptions = {
											position: new google.maps.LatLng($scope.address.configs[j].data[i].latitude, $scope.address.configs[j].data[i].longitude),
											map: map
										};
										if(j === 1) {
											var image = 'images/Map.Azure.icon.png';
											var markerOptions = {
												position: new google.maps.LatLng($scope.address.configs[j].data[i].latitude, $scope.address.configs[j].data[i].longitude),
												map: map,
												icon: image
											};
										}
										var marker = new google.maps.Marker(markerOptions);
										var markerInfo = $scope.address.configs[j].data[i].street;
										$scope.addressIndex++;
										marker.content = '<div>' + markerInfo + '</div>';
										google.maps.event.addListener(marker, 'click', function () {
											infoWindow.setContent(marker.content);
											infoWindow.open(map, marker);
										});
									});
								}
							}
						}
					})
				};
				$scope.Init();
			}
		};
	});
});
