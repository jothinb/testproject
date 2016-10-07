/* jshint unused: false */
define(['angular','controllers-module', 'datagrids', 'vruntime'], function (angular, controllers){
	'use strict';

	controllers.controller('TsoDataCtrl', ['$scope', '$rootScope', '$http', '$modal', '$timeout', function ($scope, $rootScope, $http, $modal, $timeout) {

        $scope.hasAlert = false;
        $scope.hasError = false;
        $scope.hasSuccess = false;


        $scope.showAlert = function (msg, alertType) {

            if(alertType === 'error') {
                $scope.hasError = true;
                $scope.hasSuccess = false;
            }else {
                $scope.hasError = false;
                $scope.hasSuccess = true;
            }
            $scope.hasAlert = true;
            $scope.alertMsg = msg;
            $timeout(function (){
                $scope.hasAlert = false;
            },5000);
        };

        $scope.redrawListTable = function () {
            var dt = $('table[data-table-name="listData"]').dataTable();
            dt.fnClearTable();
            dt.fnDestroy(true);
            $('.module-body').append('<table class="table table-bordered" data-table-name="listData"></table>');
            $scope.loadData();
        };

        $scope.openUploadModal = function () {
            $scope.modalInstance = $modal.open({
                templateUrl: 'assets/views/uploadData.html',
                controller: 'uploadModalCtrl'
            })
                .result.then(function(data) {
                    $scope.redrawListTable();
                    $scope.showAlert('Successfully added the data set.', 'success');
                }, function (errMsg) {
                    if(errMsg === 'FileUploadError'){
                        $scope.showAlert('Error: There was an issue uploading your file. It might be that the file contained no data. Please check your file and try again.', 'error');
                    }else if (errMsg === 'DBUploadError') {
                        $scope.showAlert('Error: There was an issue uploading from the Database.', 'error');
                    }
                });
        };

        $scope.loadData = function () {
            var url = 'api/v2/consumption/datasets';
            $http.get(url)
                .success(function (data) {
                    $scope.dataSet = data;
                    $('table[data-table-name="listData"]').iidsBasicDataGrid({
                        'isResponsive': true,
                        'bAutoWidth': false,
                        'useFloater': false,
                        'iDisplayLength': 10,
                        'aaSorting': [ [1,'desc']],
                         aaData: $scope.dataSet,
                        'aoColumns': [
                            {'sTitle': 'Data Set Name', 'sWidth': '20%', 'data': 'dataSetName',
                                'render': function(data, type, full, meta) {
                                    if(full.status === 'Not Started' || full.status === 'Processing') {
                                        return '<span class="inprogress">' + data + '</span>';
                                    }else {
                                        return data;
                                    }
                                }
                            },
                            {'sTitle': 'Upload Date', 'sWidth': '9%', 'data': 'createdDate',
                                'render': function(data, type, full, meta) {
                                    if(full.status === 'Not Started' || full.status === 'Processing') {
                                        if(data){
                                            return '<span class="inprogress">' + data + '</span>';
                                        }else {
                                            return '';
                                        }
                                    }else {
                                        return data;
                                    }
                                }
                            },
                            {'sTitle': 'Records', 'sWidth': '8%', 'data': 'numberOfRecords',
                                'render': function(data, type, full, meta) {
                                    if(full.status === 'Not Started' || full.status === 'Processing') {
                                        if(full.jobType === 'File_Ingest'){
                                            return '<span class="inprogress">' + data + '</span>';
                                        }else {
                                            return '<span class="inprogress">N/A</span>';
                                        }
                                    }else {
                                        if(full.jobType === 'File_Ingest'){
                                            return data;
                                        }else {
                                            return 'N/A';
                                        }
                                    }
                                }
                            },
                            {'sTitle': 'Description', 'sWidth': '20%', 'data': 'description',
                                'render': function(data, type, full, meta) {
                                    if(full.status === 'Not Started' || full.status === 'Processing') {
                                        if(data){
                                            return '<span class="inprogress">' + data + '</span>';
                                        }else {
                                            return '';
                                        }
                                    }else {
                                        return data;
                                    }
                                }
                            },
                            {'sTitle': 'Source', 'sWidth': '25%', 'data': 'source',
                                'render': function(data, type, full, meta) {
                                    if(full.status === 'Not Started' || full.status === 'Processing') {
                                        if(data){
                                            return '<span class="inprogress">' + data + '</span>';
                                        }else {
                                            return '';
                                        }
                                    }else {
                                        return data;
                                    }
                                }
                            },
                            {'sTitle': 'Status', 'sWidth': '9%', 'data': 'status',
                                'render': function(data, type, full, meta) {
                                        if(data === 'Not Started' || data === 'Processing') {
                                            return '<i class="icon-time" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="The data is syncing to the data lake. It will become available once complete"></i>';
                                        }else if(data === 'Active'){
                                            return '<i class="icon-ok-sign color-cyan" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="The data has been synced to the data lake"></i>';
                                        }else {
                                            return '<i class="icon-exclamation-sign color-orange" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="There was an error syncing to the data lake"></i>';
                                        }
                                },
                                'fnCreatedCell': function(nTd, sData, oData, iRow, iCol) {
                                    $('i', nTd).tooltip();
                                }
                            },
                            {'sTitle': 'Action', 'sWidth': '9%', 'data': null,
                                'render': function(data, type, full, meta) {
                                    return '<div class="btn-group">' +
                                        '<button class="btn dropdown-toggle" data-toggle="dropdown"><i class="icon-chevron-down"></i></button>' +
                                        '<ul class="dropdown-menu">' +
                                        '<li onclick="angular.element(this).scope().connectionString(\'' + full.hiveConnectString +'\')"><a>Show Connection String</a></li>' +
                                        '<li onclick="angular.element(this).scope().renameData(' + full.dataSetId +')"><a>Rename</a></li>' +
                                        '<li onclick="angular.element(this).scope().deleteData(' + full.dataSetId +')"><a>Delete</a></li>' +
                                        '</ul>'+
                                        '</div>';
                                }
                            }
                        ]
                    });
                })
                .error(function (err){
                    $scope.showAlert('Error in getting the data set list', 'error');
                });
        };

        $scope.deleteData = function (id) {
            $scope.modalInstance = $modal.open({
                templateUrl: 'assets/views/deleteConfirm.html',
                controller: 'deleteCtrl',
                resolve: {
                    dataId : function () {
                        return id;
                    }
                }
            })
                .result.then(function(data) {
                    $scope.redrawListTable();
                    $scope.showAlert('Successfully deleted the data set.', 'success');
                }, function (errMsg) {
                    if(errMsg === 'error'){
                        $scope.showAlert('Error in deleting the data set.', 'error');
                    }
                });
        };

        $scope.connectionString = function (str) {
            $scope.modalInstance = $modal.open({
                templateUrl: 'assets/views/connectionString.html',
                controller: 'connectionStringCtrl',
                resolve: {
                    connectionStr : function () {
                        return str;
                    }
                }
            });
        };

        $scope.renameData = function (id) {
            $scope.modalInstance = $modal.open({
                templateUrl: 'assets/views/renameData.html',
                controller: 'renameDataCtrl',
                resolve: {
                    dataId : function () {
                        return id;
                    }
                }
            })
                .result.then(function(data) {
                    $scope.redrawListTable();
                    $scope.showAlert('Successfully deleted the data set.', 'success');
                }, function (errMsg) {
                    if(errMsg === 'error'){
                        $scope.showAlert('Error in updating the data set name.', 'error');
                    }
                });
        };

        $scope.loadData();

	}]);

});
