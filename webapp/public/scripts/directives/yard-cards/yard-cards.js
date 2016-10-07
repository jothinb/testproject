/* jshint unused: false */
define(['angular','directives-module','text!./yard-cards-template.html'], function (angular, directives, yardCardTmpl) {
    'use strict';
     directives.directive('smallCard', function () {
        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            replace: true,
            template: yardCardTmpl,
            link: function(){
            },
            controller: function($scope, $log){
                $scope.getShipperClass = function (info) {
                    var shipperIcon = '';
                    if (!info) {
                        return shipperIcon;
                    }
                    switch (info) {
                        case 'MAERSK':
                            shipperIcon = 'star-icon';
                            break;
                        case 'JBHUNTRANSPO':
                            shipperIcon = 'yellow-icon';
                            break;
                        case 'HYUNDAINTERM':
                        case 'CMACGMAMELLC':
                            shipperIcon = 'orange-icon';
                            break;
                        case 'HANJINSHIPPI':
                            shipperIcon = 'purple-icon';
                            break;
                        case 'OOLCUSA':
                        case 'PACIFIINTLIN':
                            shipperIcon = 'red-icon';
                            break;
                        default:
                            shipperIcon = 'default';
                            break;
                    }
                    return shipperIcon;
                };
            }
        };
    });

     directives.directive('mediumCard', function () {
        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            replace: false,
            template: '<div class="mediumcard">'+
            '<div class="card-header2">'+
                '<div class="pull-left image-container"><div class="image-style {{getShipperClass(info.shprName)}}"></div></div>'+
                '<div class="pull-left container-header margin5"><span>{{info.unitInit}}</span><span>{{info.unitNbr}}</span><span class="slotSpan"><span ng-if="info.containerType == PICKING">S</span>{{(info.slotNbr/2)-((info.slotNbr/2)%1)}}</span></div>'+
            '</div>'+
            '<div class="dimension-info">'+
                '<div class="weight-icon"></div><span>{{info.wgtNbr}} lbs</span>'+
                '<span>&lt;--</span><span>{{info.wdthNbr}} ft</span><span>--&gt;</span>'+
            '</div>'+
            '<div class="dest-info">'+
                '<span>{{info.destName}}</span>'+
                '<div class="pull-right loco-direction"></div>'+
            '</div>'+
            '<div class="time-info">'+
                '<span>{{info.x}}</span><span>{{info.y}}</span><span>{{info.z}}</span>'+
                '<span class="pull-right">{{info.arvlTime | date:"MM-dd-yyyy HH:MM"}}</span>'+
            '</div>'+
            '</div>',
            link: function(){
            },
            controller: function($scope, $modal){
                $scope.getShipperClass = function (info) {
                    var shipperIcon = '';
                    if (!info) {
                        return shipperIcon;
                    }
                    switch (info) {
                        case 'MAERSK':
                            shipperIcon = 'star-icon';
                            break;
                        case 'JBHUNTRANSPO':
                            shipperIcon = 'yellow-icon';
                            break;
                        case 'HYUNDAINTERM':
                        case 'CMACGMAMELLC':
                            shipperIcon = 'orange-icon';
                            break;
                        case 'HANJINSHIPPI':
                            shipperIcon = 'purple-icon';
                            break;
                        case 'OOLCUSA':
                        case 'PACIFIINTLIN':
                            shipperIcon = 'red-icon';
                            break;
                        default:
                            shipperIcon = 'default';
                            break;
                    }
                    return shipperIcon;
                };

            }
        };
    });

    directives.directive('largeCard', function () {
        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            replace: false,
            template: '<div class="largecard">'+
            '<div class="lcHeader">'+
                '<div class="pull-left"><span class="pull-left image-style {{getShipperClass(info.shprName)}}"></span></div>'+
                '<div class="dtlUnitNumber"><span>{{info.unitInit}}</span><span>{{info.unitNbr}}</span></div>'+
                '<div class="lcDismiss"><i class="icon-remove-sign" ng-click="dismiss($event)"></i></div>'+
            '</div>'+
            '<div class="lcCardLeft">'+
                '<div class="lcRow"><label class="pull-left">AAR Code</label><span class="pull-right">{{info.aarCode}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Arrival Time</label><span class="pull-right">{{info.arvlTime | date:"MMMM d, h:mm:ss a"}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Booking ID</label><span class="pull-right">{{info.bookingId}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Container Size</label><span class="pull-right">{{info.containerSize}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Destination Name</label><span class="pull-right">{{info.destName}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Final Destination Name</label><span class="pull-right">{{info.finlDescName}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">STCC Code</label><span class="pull-right">{{info.stccCode}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Waybill ID</label><span class="pull-right">{{info.waybillId}}</span></div>'+
            '</div>'+
            '<div class="lcCardRight">'+
                '<div class="lcRow"><label class="pull-left">Goal Time</label><span class="pull-right">{{info.goalTime | date:"MMMM d, h:mm:ss a"}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Origin Name</label><span class="pull-right">{{info.origName}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Owner Type</label><span class="pull-right">{{info.ownType}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Ship to Customer</label><span class="pull-right">{{info.shipToCust}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Train Origin</label><span class="pull-right">{{info.trainOrig}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Slot Number</label><span class="pull-right">{{info.slotNbr}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Train Block</label><span class="pull-right">{{info.trainBlock}}</span></div>'+
                '<div class="lcRow"><label class="pull-left">Waybill Time</label><span class="pull-right">{{info.waybillTime | date:"MMMM d, h:mm:ss a"}}</span></div>'+
            '</div>'+
            '</div>',
            link: function(){
            },
            controller: function($scope, $modal){
                $scope.getShipperClass = function (info) {
                    var shipperIcon = '';
                    if (!info) {
                        return shipperIcon;
                    }
                    switch (info) {
                        case 'MAERSK':
                            shipperIcon = 'star-icon';
                            break;
                        case 'JBHUNTRANSPO':
                            shipperIcon = 'yellow-icon';
                            break;
                        case 'HYUNDAINTERM':
                        case 'CMACGMAMELLC':
                            shipperIcon = 'orange-icon';
                            break;
                        case 'HANJINSHIPPI':
                            shipperIcon = 'purple-icon';
                            break;
                        case 'OOLCUSA':
                        case 'PACIFIINTLIN':
                            shipperIcon = 'red-icon';
                            break;
                        default:
                            shipperIcon = 'default';
                            break;
                    }
                    return shipperIcon;
                };

                $scope.dismiss = function($event) {
                    $event.preventDefault();
                    $scope.$parent.focusContainer($event, null);
                };

            }
        };
    });

    directives.directive('trainCard', function () {
        return {
            scope: {
                info: '='
            },
            restrict: 'E',
            replace: false,
            template: '<div class="containerList">' +
                '<div ng-repeat = "item in info | limitTo: 12" class="container-details" ng-class="{selectedModule: item.$index === $index}" ng-click="focusToContainer(item)">'+
                '<div class="pull-left image-container">'+
                '<div class="image-style {{getShipperClass(item.shprName)}}"></div>'+
                '</div>'+
                '<div class="pull-left container-header"><span>{{item.unitInit}}</span><span>{{item.unitNbr}}</span></div>'+
                '</div>'+
                '</div>',
            link: function(){
            },
            controller: function($scope, $modal){

                $scope.getShipperClass = function (info) {
                    var shipperIcon = '';
                    if (!info) {
                        return shipperIcon;
                    }
                    switch (info) {
                        case 'MAERSK':
                            shipperIcon = 'star-icon';
                            break;
                        case 'JBHUNTRANSPO':
                            shipperIcon = 'yellow-icon';
                            break;
                        case 'HYUNDAINTERM':
                        case 'CMACGMAMELLC':
                            shipperIcon = 'orange-icon';
                            break;
                        case 'HANJINSHIPPI':
                            shipperIcon = 'purple-icon';
                            break;
                        case 'OOLCUSA':
                        case 'PACIFIINTLIN':
                            shipperIcon = 'red-icon';
                            break;
                        default:
                            shipperIcon = 'default';
                            break;
                    }
                    return shipperIcon;
                };

                $scope.dismiss = function($event) {
                    $event.preventDefault();
                    $scope.$parent.focusContainer(null);
                };

                $scope.focusToContainer = function (item) {
                    $scope.$emit('focusing', item);
                };

            }
        };
    });
});
