/**
 * Created by 212362824 on 3/27/15.
 */

define(['angular', 'controllers-module', 'vruntime'], function (angular, controllers) {
    'use strict';

    controllers.controller('uploadModalCtrl', ['$scope', '$rootScope', '$http', '$modalInstance', function ($scope, $rootScope, $http, $modalInstance) {

        $scope.uploadText = '';
        $scope.dataset = {};
        $scope.connectionErrors = {};
        $scope.connection = {};
        $scope.missingName = false;
        $scope.missingFile = false;
        $scope.errorFileType = false;
        $scope.missingTableName = false;
        $scope.uploadFile = '';
        $scope.isDisabled = false;
        $scope.connectDisabled = false;
        $scope.dBConnected = false;
        $scope.schemas = [];
        $scope.DBErrors = {};
        $scope.pattern = /[^\w\d_]/gi;

        $scope.dataSources = ['File', 'Oracle', 'Teradata'];

        $scope.initiateBrowse = function () {
            angular.element(document.getElementById('uploadInput')).trigger('click');
        };

        $scope.clearField = function () {
            $modalInstance.dismiss();
        };

        $scope.validateName = function (name) {
            if (name !== '') {
                $scope.missingName = false;
            } else {
                $scope.missingName = true;
            }
        };

        $scope.validateTableName = function (tablename) {
            if (tablename !== '') {
                $scope.missingTableName = false;
                $scope.dataset.tablename = tablename.replace($scope.pattern, '');
            } else {
                $scope.missingTableName = true;
            }
        };

        $scope.selectFileforUpload = function (fileInput) {
            var myLength = [];
            // split out file name from path
            $scope.uploadFile = fileInput.files[0];
            fileInput = fileInput.files[0].name.split('\\');
            myLength = fileInput.length;
            fileInput = fileInput[myLength - 1];
            // split out file extension
            var fileExtension = fileInput.split('.');
            myLength = fileExtension.length;
            fileExtension = fileExtension[myLength - 1];
            if (fileExtension.match(/xls/i)) {
                $scope.$apply(function () {
                    $scope.missingFile = false;
                    $scope.errorFileType = false;
                });
            }
            else {
                $scope.$apply(function () {
                    $scope.missingFile = false;
                    $scope.errorFileType = true;
                });
            }
            $scope.$apply(function () {
                $scope.uploadText = fileInput;
            });
        };

        $scope.importFiles = function () {
            if ($scope.dataset.name === undefined || $scope.dataset.name === '') {
                $scope.missingName = true;
            } else if ($scope.dataset.tablename === undefined || $scope.dataset.tablename === '') {
                $scope.missingTableName = true;
            } else if ($scope.uploadFile === undefined || $scope.uploadFile === '') {
                $scope.missingFile = true;
            } else if (!$scope.errorFileType) {
                $scope.isDisabled = true;
                var fd = new FormData();
                fd.append('uploadInput', $scope.uploadFile);
                fd.append('name', $scope.dataset.name);
                fd.append('tableName', $scope.dataset.tablename);
                if ($scope.dataset.description) {
                    fd.append('description', $scope.dataset.description);
                }
                $http.post('api/v2/ingestion/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (data) {
                    $modalInstance.close(data);
                }).error(function (data, status) {
                    $modalInstance.dismiss('fileUploadError');
                });
            }

        };

        $scope.resetErrors = function () {
            $scope.uploadText = '';
            $scope.dataset = {};
            $scope.connectionErrors = {};
            $scope.connection = {};
            $scope.missingName = false;
            $scope.missingFile = false;
            $scope.errorFileType = false;
            $scope.missingTableName = false;
            $scope.uploadFile = '';
            $scope.isDisabled = false;
            $scope.dBConnected = false;
            $scope.schemas = [];
            $scope.DBErrors = {};
        };

        $scope.validateUserName = function (name) {
            if (name !== '') {
                $scope.connectionErrors.name = false;
            } else {
                $scope.connectionErrors.name = true;
            }
        };

        $scope.validatePassword = function (pwd) {
            if (pwd !== '') {
                $scope.connectionErrors.password = false;
            } else {
                $scope.connectionErrors.password = true;
            }
        };

        $scope.validateUrl = function (url) {
            if (url !== '') {
                $scope.connectionErrors.url = false;
            } else {
                $scope.connectionErrors.url = true;
            }
        };


        $scope.connectToDB = function () {
            if ($scope.connection.url === undefined || $scope.connection.url === '') {
                $scope.connectionErrors.url = true;
            } else if ($scope.connection.username === undefined || $scope.connection.username === '') {
                $scope.connectionErrors.name = true;
            } else if ($scope.connection.password === undefined || $scope.connection.password === '') {
                $scope.connectionErrors.password = true;
            } else if ($scope.connection.url) {
                var pattern = /jdbc:(oracle|teradata):/g;
                var result = $scope.connection.url.match(pattern);
                if (result === null) {
                    $scope.connectionErrors.urlFormat = true;
                } else {
                    $scope.connectDisabled = true;
                    $scope.connectionErrors = {};
                    var connectionData = {
                        "databaseURL": $scope.connection.url,
                        "databaseUsername": $scope.connection.username,
                        "databasePassword": $scope.connection.password
                    };
                    $http.post('api/v2/ingestion/dbmetadata', connectionData)
                        .success(function (response) {
                            $scope.schemaList = [];
                            $scope.connectDisabled = false;
                            if(response.schemas.length === 0) {
                                $scope.dBConnected = false;
                                $scope.connectionErrors.noSchema = true;
                            }else {
                                $scope.schemaList = response.schemas;
                                $scope.dBConnected = true;
                                $scope.connectionErrors.noSchema = false;
                            }
                        })
                        .error(function () {
                            $scope.dBConnected = false;
                            $scope.connectDisabled = false;
                        });
                    }
                }
            };

            $scope.changeIcon = function (id) {
                if (angular.element('#' + id).hasClass('in')) {
                    angular.element('a[href="#' + id + '"] > i').addClass('icon-angle-right').removeClass('icon-angle-down');
                } else {
                    angular.element('a[href="#' + id + '"] > i').addClass('icon-angle-down').removeClass('icon-angle-right');
                }
            };

            $scope.selectedTableView = function (schema, tableName, type) {
                if ($scope.schemas.length === 0) {
                    $scope.schemas.push({'schema': schema});
                    if (type === 'table') {
                        $scope.schemas[0].tables = [];
                        $scope.schemas[0].tables.push({'tableName': tableName});
                    } else {
                        $scope.schemas[0].views = [];
                        $scope.schemas[0].views.push({'tableName': tableName});
                    }
                } else {
                    var existingSchemaElem = angular.element.map($scope.schemas, function (value, key) {
                        if (value.schema === schema) {
                            return value.schema;
                        }
                    });

                    if (existingSchemaElem && existingSchemaElem.length === 0) {
                        $scope.schemas.push({'schema': schema});
                        if (type === 'table') {
                            $scope.schemas[$scope.schemas.length - 1].tables = [];
                            $scope.schemas[$scope.schemas.length - 1].tables.push({'tableName': tableName});
                        } else {
                            $scope.schemas[$scope.schemas.length - 1].views = [];
                            $scope.schemas[$scope.schemas.length - 1].views.push({'tableName': tableName});
                        }
                    } else {
                        for (var key in $scope.schemas) {
                            if ($scope.schemas[key].schema === schema) {
                                if (type === 'table') {
                                    if ($scope.schemas[key].tables) {
                                        var existingTableElem = angular.element.map($scope.schemas[key].tables, function (val, index) {
                                            if (val.tableName === tableName) {
                                                return index;
                                            }
                                        });
                                    } else {
                                        $scope.schemas[key].tables = [];
                                    }

                                    if (existingTableElem && existingTableElem.length > 0) {
                                        $scope.schemas[key].tables.splice(existingTableElem[0], 1);
                                    } else {
                                        $scope.schemas[key].tables.push({'tableName': tableName});

                                    }
                                } else {
                                    if ($scope.schemas[key].views) {
                                        var existingViewElem = angular.element.map($scope.schemas[key].views, function (val, index) {
                                            if (val.tableName === tableName) {
                                                return index;
                                            }
                                        });
                                    } else {
                                        $scope.schemas[key].views = [];
                                    }

                                    if (existingViewElem && existingViewElem.length > 0) {
                                        $scope.schemas[key].views.splice(existingViewElem[0], 1);
                                    } else {
                                        $scope.schemas[key].views.push({'tableName': tableName});
                                    }
                                }
                            }
                        }
                    }
                }
            };


            $scope.validateDName = function (dbName) {
                if (dbName !== '') {
                    $scope.DBErrors.name = false;
                } else {
                    $scope.DBErrors.name = true;
                }
            };

            $scope.uploadDB = function () {
                for (var key in $scope.schemas) {
                    if(typeof ($scope.schemas[key].tables) !== "undefined" && typeof ($scope.schemas[key].views) !== "undefined") {
                        if($scope.schemas[key].tables.length === 0 && $scope.schemas[key].views.length === 0){
                            $scope.schemas.splice(key, 1);
                        }
                    }else if (typeof ($scope.schemas[key].tables) !== "undefined" && typeof ($scope.schemas[key].views) === "undefined") {
                        if($scope.schemas[key].tables.length === 0){
                            $scope.schemas.splice(key, 1);
                        }
                    }else if (typeof ($scope.schemas[key].tables) === "undefined" && typeof ($scope.schemas[key].views) !== "undefined") {
                        if($scope.schemas[key].views.length === 0){
                            $scope.schemas.splice(key, 1);
                        }
                    }
                }
                if ($scope.schemas.length === 0) {
                    $scope.DBErrors.missingSchema = true;
                } else if ($scope.connection.dataName === undefined || $scope.connection.dataName === '') {
                    $scope.DBErrors.name = true;
                    $scope.DBErrors.missingSchema = false;
                } else {
                    $scope.DBErrors = {};
                    var uploadDB = {
                        "dataSetName": $scope.connection.dataName,
                        "databaseURL": $scope.connection.url,
                        "databaseUsername": $scope.connection.username,
                        "databasePassword": $scope.connection.password,
                        "schemas": $scope.schemas
                    };
                    if ($scope.connection.description) {
                        uploadDB.description = $scope.connection.description;
                    } else {
                        uploadDB.description = null;
                    }
                    $http.post('api/v2/ingestion/uploaddb', uploadDB)
                        .success(function (response) {
                            $modalInstance.close(response);
                        })
                        .error(function () {
                            $modalInstance.dismiss('DBUploadError');
                        });
                }
            };

        }
        ]);
    });
