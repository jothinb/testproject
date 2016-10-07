define(['angular', 'text!./px-tree-nav.tmpl', 'vruntime'], function(angular, tmpl, vRuntime) {
    'use strict';

    var PxTreeNav = vRuntime.widget.BaseDirective.extend({
        restrict: 'EA',
        scope: {
            treeData: "=",
            labelField: "=",
            parentIdField: "=",
            idField: "=",
            handlers: "=?", // handlers object can have
            // isOpenable, itemOpenHandler, itemClickHandler, getChildren
            headers: "=?",
            treeDisplayLevels: "=?",
            showBreadcrumbs: "=?",
            showOpenButton: "=?"
        },
        controller: 'PxTreeNavController',
        template: tmpl,
        vLink: function(scope, element, attrs) {
            this._super(scope, element, attrs);
        },
        vDestroy: function(scope) {
            this._super(scope);
        },
        setLogger: function(logger) {
            this.logger = logger;
        }
    });

    angular.module('PxTreeNavModule', []).directive('pxTreeNav', function($log) {
        var tree = new PxTreeNav();
        tree.setLogger($log);
        return tree;
    });

    angular.module('PxTreeNavModule').controller('PxTreeNavController', function($scope) {

        $scope.level = -1;
        $scope.parentNodes = [{}];
        $scope.treeDisplayLevels = $scope.treeDisplayLevels || 1;
        $scope.handlers = $scope.handlers || {};
        if ($scope.showBreadcrumbs === undefined) {
            $scope.showBreadcrumbs = true;
        }
        if ($scope.showOpenButton === undefined) {
            $scope.showOpenButton = true;
        }

        $scope.updateTreeData = function(newData) {

            if (shouldAddData(newData, $scope)) {

                // set the current level to the next level (use parentNodes so multiple clicks don't mess up)
                $scope.level = $scope.parentNodes.length - 1;

                // set up the children/parent pointers
                for (var i = 0; i < newData.length; i++) {
                    newData[i].parent = $scope.parentNodes[$scope.level];
                }
                $scope.parentNodes[$scope.level].children = newData;

                // set the new node's header
                if ($scope.headers) {
                    $scope.parentNodes[$scope.level].header = $scope.headers[$scope.level];
                }
                else {
                    $scope.parentNodes[$scope.level].header = '';
                }

                // set the new node's level
                $scope.parentNodes[$scope.level].level = $scope.level;

                // update the display
                $scope.setDisplayNodes();
            }
        };

        var shouldAddData = function(newData, $scope) {
            if(!newData) {
                // if no new data don't add it
                return false;
            }
            if($scope.selectedItem && newData.length > 0 && newData[0][$scope.parentIdField] != $scope.selectedItem[$scope.idField]) {
                // if the parent of the child is NOT the selected item, then the data is out of date so don't add it
                // (the data is the children from a previous item click)
                return false;
            }
            return true;
        };

        $scope.$watch("treeData", function(newData, oldData, scope) {
            scope.updateTreeData(newData);
        });

        $scope.isBreadcrumbVisible = function(index) {
            return (index > 0 && (index >= ($scope.parentNodes.length - $scope.treeDisplayLevels) ) );
        };

        $scope.isEllipsisShown = function() {
            // since parentNodes has 1 more than breadcrumbs (for the initial header support), add 1
            return $scope.parentNodes.length > ($scope.treeDisplayLevels+1);
        };

        var markNodeSelected = function(node) {
            // mark all other nodes on this level unselected
            for (var j=0; j<node.parent.children.length; j++) {
                node.parent.children[j].selected = false;
            }
            node.selected = true;
            $scope.selectedItem = node;
        };

        var dropCurrentChildren = function(node) {

            // drop the children from the master list of nodes (and update the level)
            for (var i=0; i<$scope.parentNodes.length-1; i++) {
                if ($scope.parentNodes[i] === node.parent) {
                    $scope.level = i;
                    $scope.parentNodes = $scope.parentNodes.slice(0, i + 1);
                }
            }

            // drop the children from the displayed nodes (so old nodes don't linger during next GET for children)
            for(var j=0; j<$scope.displayNodes.length-1; j++) {
                if($scope.displayNodes[j] === node.parent) {
                    $scope.displayNodes = $scope.displayNodes.slice(0, j + 1);

                }
            }
        };

        var getNewChildren = function(node) {
            if ($scope.handlers.getChildren) {
                // push the node to the parentNodes so breadcrumbs updated even if children not successfully returned
                $scope.parentNodes.push(node);
                $scope.handlers.getChildren(node).then(function (children) {
                    $scope.treeData = children;
                });
            }
            else {
                if ($scope.childKey) {
                    $scope.treeData = node[$scope.childKey];
                } else if (node.subcontexts) {
                    $scope.treeData = node.subcontexts;
                } else {
                    self.logger.error('The next level of children could not be returned.');
                    return; //do not put anything else in tree
                }
                $scope.parentNodes.push(node);
            }
        };

        var selectNode = function(node) {
            markNodeSelected(node);
            dropCurrentChildren(node);
            getNewChildren(node);
        };

        $scope.onRowClick = function(node) {

            if($scope.handlers.itemClickHandler) {
                $scope.handlers.itemClickHandler(node);
            }

            selectNode(node);
        };

        $scope.onOpenClick = function() {
            if ($scope.selectedItem && $scope.handlers.itemOpenHandler) {
                var breadcrumbs = [];
                for (var index in $scope.parentNodes) {
                    if(index < $scope.parentNodes.length-1) {
                        breadcrumbs.push($scope.getBreadcrumb($scope.parentNodes[index], index));
                    }
                }
                $scope.handlers.itemOpenHandler($scope.selectedItem, breadcrumbs);
            }
        };

        $scope.getBreadcrumb = function(node) {
            if(node && node.hasOwnProperty($scope.labelField)) {
                return node[$scope.labelField];
            }
            return '';
        };

        $scope.onBreadCrumbClick = function(index) {
            selectNode($scope.parentNodes[index]);
        };

        $scope.isOpenable = function(selectedItem) {
            if($scope.showOpenButton && $scope.handlers.isOpenable) {
                return $scope.handlers.isOpenable(selectedItem);
            }
            return false;
        };

        $scope.setDisplayNodes = function() {
            var beginIndex = 0;
            if ($scope.treeDisplayLevels < $scope.parentNodes.length) {
                beginIndex = $scope.parentNodes.length-$scope.treeDisplayLevels;
            }
            $scope.displayNodes = $scope.parentNodes.slice(beginIndex);
        };
    });

    return PxTreeNav;
});