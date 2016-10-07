define(['angular','controllers-module', 'vruntime'], function (angular, controllers){
	'use strict';

	controllers.controller('tsoMyVisualModalCtrl', ['$scope', '$rootScope', '$http', '$modalInstance','$log', function ($scope, $rootScope, $http, $modalInstance, $log) {
		$scope.selectedDataSet = {};
		$scope.selectedDataSet.table1 = null;
		$scope.selected = null;
		$scope.dataSet2 = false;
		$scope.chartType = [{ "value": 'GeoSpatial', "text": "Geo Location" }];
		$scope.categoryNames = [];
		$scope.tableNames = [];
		$scope.allTableEntriesMapByTableId = {};
		$scope.allTableEntries = [];

		$scope.init = function(){
				$scope.dataType = {};
				$scope.dataType.selected = 'ADDRESS';

			var url = 'api/v2/consumption/datasetdetails';
			$http.get(url).success(function(data){
				$scope.datasetInfo =  data;
				var entryIndex = 0;
				for (var i = 0; i < data.length; i++) {
					if (data && data[i].dataSetName) {
						$scope.categoryNames.push(data[i].dataSetName);
					}
					if (data && data[i].tables) {
						for (var j = 0; j < data[i].tables.length; j++) {
							var table = data[i].tables[j];
							if (table.tableName) {
								$scope.tableNames.push(table.tableName);
							}
							// Create flat map of all table entries.
							if (table.columns) {
								for(var k=0; k<table.columns.length;k++) {
									var col = table.columns[k];
									if (!$scope.allTableEntriesMapByTableId[table.dataTableId]) {
										$scope.allTableEntriesMapByTableId[table.dataTableId] = [];
									}
									$scope.allTableEntriesMapByTableId[table.dataTableId].push({'columnName': col, 'index': entryIndex});
									$scope.allTableEntries[entryIndex++] = {
										'tableName': "[" + data[i].dataSetName + "] " + table.tableName,
										'tableId': table.dataTableId,
										'columnName': col,
										'checked': false
									};
								}
							}
						}
					}
				}
				$log.debug($scope.categoryNames);
				$log.debug($scope.tableNames);
				$log.debug($scope.allTableEntriesMapByTableId);
				$log.debug($scope.allTableEntries);
			}).error(function(){
			});
		};

		$scope.init();
		$scope.cancelVisual = function () {
			$modalInstance.close();
		};
		$scope.addAddSets = function (){
			$scope.dataType.selected2 = 'ADDRESS';
			$scope.dataSet2 = true;

		};
		$scope.createVisual = function () {
			$scope.testError = false;
			$scope.ChartTypeVali($scope.selectedDataSet.charttype);
			$scope.titleVali($scope.selectedDataSet.title);
			$scope.markerNameVali($scope.selectedDataSet.collection1);
			$scope.tableVali($scope.selectedDataSet.table1);
			if($scope.dataType.selected === 'LATLON') {
				$scope.LatitudeVali($scope.selectedDataSet.latitude1);
				$scope.LongitudeVali($scope.selectedDataSet.longitude1);
			}
			if($scope.dataSet2){
				$scope.markerNameVali2($scope.selectedDataSet.collection2);
				$scope.tableVali2($scope.selectedDataSet.table2);
				if($scope.dataType.selected2 === 'LATLON') {
					$scope.LatitudeVali2($scope.selectedDataSet.latitude2);
					$scope.LongitudeVali2($scope.selectedDataSet.longitude2);
				}
			}
			if($scope.testError){return;}
			$scope.vForm = {};
			$scope.vForm.visualizationType = $scope.selectedDataSet.charttype;
			$scope.vForm.title = $scope.selectedDataSet.title;
			$scope.vForm.subTitle = $scope.selectedDataSet.subtitle;
			$scope.vForm.description = "Temp Description";
			$scope.vFormconfigs = {};
			$scope.vFormconfigs.heading = $scope.selectedDataSet.collection1;
			$scope.vFormconfigs.tableId = $scope.selectedDataSet.table1.tableId;
			$scope.vFormconfigs.locIdType = $scope.dataType.selected;
			$scope.vFormcolumns = {};
			$scope.vFormcolumns.street = $scope.selectedDataSet.street1.columnName;
			$scope.vFormcolumns.city = $scope.selectedDataSet.city1;
			$scope.vFormcolumns.state = $scope.selectedDataSet.state1;
			$scope.vFormcolumns.zipCode = $scope.selectedDataSet.zipcode1;
			$scope.vFormcolumns.country = $scope.selectedDataSet.country1;
			$scope.vFormcolumns.latitude = $scope.selectedDataSet.latitude1;
			$scope.vFormcolumns.longitude = $scope.selectedDataSet.longitude1;

			if($scope.vFormcolumns.street){
				$scope.vFormcolumns.street = $scope.selectedDataSet.street1.columnName;
			}
			if($scope.vFormcolumns.city){
				$scope.vFormcolumns.city = $scope.selectedDataSet.city1.columnName;
			}
			if($scope.vFormcolumns.state){
				$scope.vFormcolumns.state = $scope.selectedDataSet.state1.columnName;
			}
			if($scope.vFormcolumns.zipCode){
				$scope.vFormcolumns.zipCode = $scope.selectedDataSet.zipcode1.columnName;
			}
			if($scope.vFormcolumns.country){
				$scope.vFormcolumns.country = $scope.selectedDataSet.country1.columnName;
			}
			if($scope.dataType.selected === 'LATLON') {
				$scope.vFormcolumns.latitude = $scope.selectedDataSet.latitude1.columnName;
				$scope.vFormcolumns.longitude = $scope.selectedDataSet.longitude1.columnName;
			}
			$scope.vFormconfigs.columns = $scope.vFormcolumns;
			if($scope.dataSet2){
				$scope.vFormconfigs2 = {};
				$scope.vFormconfigs2.heading = $scope.selectedDataSet.collection2;
				$scope.vFormconfigs2.tableId = $scope.selectedDataSet.table2.tableId;
				$scope.vFormconfigs2.locIdType = $scope.dataType.selected2;
				$scope.vFormcolumns2 = {};
				$scope.vFormcolumns2.street = $scope.selectedDataSet.street2;
				$scope.vFormcolumns2.city = $scope.selectedDataSet.city2;
				$scope.vFormcolumns2.state = $scope.selectedDataSet.state2;
				$scope.vFormcolumns2.zipCode = $scope.selectedDataSet.zipcode2;
				$scope.vFormcolumns2.country = $scope.selectedDataSet.country2;
				$scope.vFormcolumns2.latitude = $scope.selectedDataSet.latitude2;
				$scope.vFormcolumns2.longitude = $scope.selectedDataSet.longitude2;

				if($scope.vFormcolumns2.street){
					$scope.vFormcolumns2.street = $scope.selectedDataSet.street2.columnName;
				}
				if($scope.vFormcolumns2.city){
					$scope.vFormcolumns2.city = $scope.selectedDataSet.city2.columnName;
				}
				if($scope.vFormcolumns2.state){
					$scope.vFormcolumns2.state = $scope.selectedDataSet.state2.columnName;
				}
				if($scope.vFormcolumns2.zipCode){
					$scope.vFormcolumns2.zipCode = $scope.selectedDataSet.zipcode2.columnName;
				}
				if($scope.vFormcolumns2.country){
					$scope.vFormcolumns2.country = $scope.selectedDataSet.country2.columnName;
				}
				if($scope.dataType.selected2 === 'LATLON') {
					$scope.vFormcolumns2.latitude = $scope.selectedDataSet.latitude2.columnName;
					$scope.vFormcolumns2.longitude = $scope.selectedDataSet.longitude2.columnName;
				}

				$scope.vFormconfigs2.columns = $scope.vFormcolumns2;
			}
			$scope.vForm.configs = [];
			$scope.vForm.configs.push($scope.vFormconfigs);
			if($scope.dataSet2){
				$scope.vForm.configs.push($scope.vFormconfigs2);
			}

			var url2 = 'api/v2/consumption/visualizations';
			$http.post(url2, $scope.vForm).success(function(data){
				$scope.dataSetAddress =  data;
				$rootScope.addressCollection.push($scope.dataSetAddress);
				$modalInstance.close();
			}).error(function(){
				$rootScope.addressCollection.push(null);
				$modalInstance.close();
			});
		};

		$scope.changeRadio1 = function(){
			$scope.selectedDataSet.latitude1 = null;
			$scope.selectedDataSet.longitude1 = null;
			$scope.selectedDataSet.street1 = null;
			$scope.selectedDataSet.city1 = null;
			$scope.selectedDataSet.state1 = null;
			$scope.selectedDataSet.zipcode1 = null;
			$scope.selectedDataSet.country1 = null;
			$scope.selectedDataSet.label1 = null;
			$scope.selectedDataSet.information1 = null;
			$scope.LongitudeError = false;
			$scope.LatitudeError = false;
		};

		$scope.changeRadio2 = function(){
			$scope.selectedDataSet.latitude2 = null;
			$scope.selectedDataSet.longitude2 = null;
			$scope.selectedDataSet.street2 = null;
			$scope.selectedDataSet.city2 = null;
			$scope.selectedDataSet.state2 = null;
			$scope.selectedDataSet.zipcode2 = null;
			$scope.selectedDataSet.country2 = null;
			$scope.selectedDataSet.label2 = null;
			$scope.selectedDataSet.information2 = null;
			$scope.LongitudeError2 = false;
			$scope.LatitudeError2 = false;

		};
		$scope.ChartTypeVali = function (val) {
			if(val) {
				$scope.ChartTypeError = false;
			} else {
				$scope.ChartTypeError = true;
				$scope.testError = true;
			}
		};
		$scope.titleVali = function (val) {
			if(val) {
				$scope.titleError = false;
			} else {
				$scope.titleError = true;
				$scope.testError = true;

			}
		};
		$scope.markerNameVali = function (val) {
			if(val) {
				$scope.markerNameError = false;
			} else {
				$scope.markerNameError = true;
				$scope.testError = true;
			}
		};
		$scope.tableVali = function (val) {
			if(val) {
				$scope.tableError = false;
			} else {
				$scope.tableError = true;
				$scope.testError = true;
			}
		};
		$scope.LatitudeVali = function (val) {
			if(val) {
				$scope.LatitudeError = false;
			} else {
				$scope.LatitudeError = true;
				$scope.testError = true;
			}
		};
		$scope.LongitudeVali = function (val) {
			if(val) {
				$scope.LongitudeError = false;
			} else {$scope.LongitudeError = true;
				$scope.testError = true;
			}
		};
		$scope.markerNameVali2 = function (val) {
			if(val) {
				$scope.markerNameError2 = false;
			} else {
				$scope.markerNameError2 = true;
				$scope.testError = true;
			}
		};
		$scope.tableVali2 = function (val) {
			if(val) {
				$scope.tableError2 = false;
			} else {
				$scope.tableError2 = true;
				$scope.testError = true;
			}
		};
		$scope.LatitudeVali2 = function (val) {
			if(val) {
				$scope.LatitudeError2 = false;
			} else {
				$scope.LatitudeError2 = true;
				$scope.testError = true;
			}
		};
		$scope.LongitudeVali2 = function (val) {
			if(val) {
				$scope.LongitudeError2 = false;
			} else {$scope.LongitudeError2 = true;
				$scope.testError = true;
			}
		};

		$scope.filterTablesWithCheckedColumns = function() {
			$log.debug("Before: " + $scope.allTableEntries.length);
			var tablesAdded = {};
			var filtered = $scope.allTableEntries.reduce(function(prev, curr, index, array) {
				if(curr.checked && !tablesAdded[curr.tableId]) {
					prev.push(curr);
					tablesAdded[curr.tableId] = true;
				}
				return prev;
			}, []);
			$log.debug("After: " + filtered.length);
			return filtered;
		};

		$scope.getColumnsForSelectedTable = function(columnRec) {
			var columns = $scope.allTableEntriesMapByTableId[columnRec.tableId].filter(function(el) {
				return $scope.allTableEntries[el.index].checked;
			});

			return columns;
		};
	}]);
});
