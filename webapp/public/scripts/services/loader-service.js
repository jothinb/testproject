/*global define */
define(['angular', 'services-module'], function (angular, services) {
	'use strict';

	/* Services */
	services.value('version', '0.1');
	services.service('loaderSvc', function($http, $q, $log){

		// This object will hold all initial data loaded via $http.
		var loadedData = {
			'locations': {
				desc: 'x,y coordinates of all parking locations.',
				url: 'http://' + oasisHost + ':' + oasisPort + '/' + oasisBasepath + '/location',
				data: []
			},
			'units': {
				desc: 'x,y coordinates of all inventory.',
				url: 'http://' + oasisHost + ':' + oasisPort + '/' + oasisBasepath + '/unit',
				data: []
			}
		};

		/**
		 *   Load data via $http.
		 *   This fn() takes either a single object or array of objects.  Each object has two components a string which
		 *   matches exactly one key in the global loadedData object, and an optional second string with url parameters.
		 *   e.g.
		 *   1.  {loadedDataItem: 'locations', params: '/type/80'}
		 *   2.  [ {loadedDataItem: 'locations', params: '/type/80'}, {loadedDataItem: 'locations', params: ''} ]
		 *
		 * @param {object.<string, string>} [times > 0]
		 * @returns {promise}
		 */
		this.loadAll = function(loadRequest) {

			if (!loadRequest) {
				return $q.reject('Bad Request');
			}

			// Execute the actual ajax request.
			var sendRequest = function(it, params) {
				if (it && loadedData[it]) {
					return $http.get(loadedData[it].url +(params || ''))
						.success(function(response) {
							loadedData[it].data = response.data;
							return loadedData[it].data;
						})
						.error(function(data, status, headers, config){
							$log.debug('Unable to getUnitLocations.');
							$log.debug(status);
						});
				} else {
					return $q.reject('Unable to load ' +(it ||'from server'));
				}
			};

			// If only one object is given then add that object to an array as it's only element.
			if (!angular.isArray(loadRequest)) {
				loadRequest = [loadRequest];
			}

			var promises = loadRequest.map(function(item){
				return sendRequest(item.category, item.params);
			});

			var deferred = $q.defer();
			// they may, in fact, all be done, but this
			// executes the callbacks in then, once they are
			// completely finished.
			$q.all(promises).then(
				function(results) {
					deferred.resolve(results)
				},
				function(errors) {
					deferred.reject(errors);
				},
				function(updates) {
					deferred.update(updates);
				}
			);

			return deferred.promise;
		};

		this.get = function(it) {
			return it && loadedData[it] ? loadedData[it].data : null;
		};


//		this.loadLocationAreas = function() {
//			return $http.get('http://localhost:8080/oasis/location')
//				.success(function(response) {
//					unitLocations = response.data;
//					return unitLocations;
//				})
//				.error(function(data, status, headers, config){
//					$log.debug('Unable to getUnitLocations.');
//					$log.debug(status);
//				});
//		};

//		this.loadUnitLocations = function() {
//			return $http.get('http://localhost:8080/oasis/unit')
//				.success(function(response) {
//					return unitLocations = response.data;
//				})
//				.error(function(data, status, headers, config){
//					$log.debug('Unable to getUnitLocations.');
//					$log.debug(status);
//				});
//		};




	});

	return services;
});
