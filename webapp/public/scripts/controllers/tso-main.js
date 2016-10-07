/* jshint unused: false */
define(['angular','controllers-module','vruntime'], function (angular, controllers){
	'use strict';

	controllers.controller('TsoMainCtrl', ['$scope', '$rootScope','$http', '$modal', function ($scope, $rootScope, $http, $modal) {
		$rootScope.addressCollection = [];
		$scope.init = function(){
			var url = 'api/v2/consumption/visualizations';
			$http.get(url).success(function(data){
				console.log(data);
				for (var i = 0; i < data.length; i++) {
					var url = 'api/v2/consumption/visualizations/visualization:' + data[i].id;
					$http.get(url).success(function(data2){
						$rootScope.addressCollection.push(data2);
					}).error(function(){
					});
				}
			}).error(function(){

			});
		};
		$scope.init();
		$scope.addVisual = function(){
			$scope.modalInstance = $modal.open({
				templateUrl: 'assets/views/tso-myvisual-modal.html',
				controller: 'tsoMyVisualModalCtrl'
			});
		}
	}]);
});
