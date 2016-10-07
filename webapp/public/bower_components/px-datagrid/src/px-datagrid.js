define(['angular', 'text!./px-datagrid.tmpl', 'vruntime', 'widgets-module'],
    function(angular, tmpl, vRuntime, widgetModule) {
        'use strict';

        var PxDatagrid = vRuntime.widget.BaseDirective.extend({
            restrict: 'EA',
            scope: {              // set up directive's isolated scope
                title: "=",
                tableData: "=",
                columns: "=",
                pageLengths: "=?",
                showSearch: "=?",
                defaultSortField: "=?",
                defaultSortOrder: "=?",
                defaultItemsPerPage: "=?",
                tableClass: "=?",
                trClass: "=?",
                tdClass: "=?",
                onRowClick: "&?",
                editInPlace: "=?",
                onRowUpdate: "&?",
                onRowAdd: "&?",
                onRowDelete: "&?"
            },
            template: tmpl,      // replacement HTML (can use our scope vars here)
            vLink: function(scope, element, attrs) {
                // super.vLink doesn't do anything... but probably a good idea to call for future proofing.
                this._super(scope, element, attrs);
                var self = this;
                scope.sortBy = scope.defaultSortField || '';
                scope.sortOrder = scope.defaultSortOrder || '';
                scope.pageLengths = scope.pageLengths || [10,20,50];
                scope.currentPage = 1;
                scope.itemsPerPage = parseInt((scope.defaultItemsPerPage || 10), 10);
                scope.searchText = "";
                if (scope.showSearch === undefined) {
                    scope.showSearch = true;
                }
                if (scope.editInPlace === undefined) {
                    scope.editInPlace = false;
                } else if (scope.editInPlace === "false") {
                    scope.editInPlace = false;
                }

                scope._onRowClick = function(item) {
                    if(scope.onRowClick) {
                        scope.onRowClick({item:item});
                    }
                    if ( scope.editInPlace && !item.selected) {
                        self.logger.debug("rowClickHandler from widget. item: " + JSON.stringify(item));
                        if (scope.selectedItem) {
                            scope.selectedItem.selected = false;
                        }
                        item.selected = true;
                        scope.selectedItem = item;
                    }
                };

                scope._onRowUpdate = function(item) {
                    if(scope.onRowUpdate) {
                        scope.onRowUpdate({item:item});
                    }
                    if (scope.editInPlace && item.selected) {
                        item.selected = false;
                        scope.selectedItem = null;
                    }
                };

                // would be nice if we could use this here... but it's in angular 1.3
                // scope.$watchGroup(['searchText', 'itemsPerPage', 'sortBy', 'sortOrder'], function() {
                //	self.applyFilters(scope, self.logger, self.filter);
                // });
                /// Pagination
                scope.$watch('searchText', function(queryString){
                    self.applyFilters(scope, self.logger, self.filter);
                });

                scope.$watch('itemsPerPage', function(){
                    self.applyFilters(scope, self.logger, self.filter);
                });
                //needed for the angular bootstrap pagination directive
                scope.setPage = function(newPage){
                    if(newPage >= 1) {
                        scope.currentPage = newPage;
                        self.applyFilters(scope, self.logger, self.filter);
                    }
                    else {
                        self.logger.debug("setPage with number >= 1, ignoring");
                    }
                };

                /// Sorting
                scope.$watch('sortBy', function(){
                    self.applyFilters(scope, self.logger, self.filter);
                });
                scope.$watch('sortOrder', function(){
                    self.applyFilters(scope, self.logger, self.filter);
                });

                scope.$watch("tableData", function(newData, oldData){
                    if(newData) {
                        self.logger.info("tableData changed", newData);
                        self.onTableDataChange(newData.tableData, oldData, scope, self.logger, self.filter);
                    }
                }, true);
                scope.getHeaderClass = function(index) {
                    return self.getHeaderClass(index, scope);
                };

                scope.onColumnHeaderClick = function(index) {
                    self.onColumnHeaderClick(index, scope);
                };
            },
            getHeaderClass: function(index, scope) {
                // these styles are defined by IIDX.
                var css = '';
                if (scope.sortBy === scope.columns[index].field) {
                    css = 'sorting_asc';
                    if (scope.sortOrder === 'desc') {
                        css = 'sorting_desc';
                    }
                }
                return css;
            },
            // called when page is changed, or search text is entered.
            applyFilters: function($scope, $log, $filter){
                $log.info("applyFilters called", this);
                if($scope.tableData && ($scope.tableData.$resolved || $scope.tableData.length > 0)){
                    var filtered = $filter('filter')($scope.tableData, $scope.searchText);
                    filtered = $filter('orderBy')(filtered, $scope.sortBy, $scope.sortOrder === 'desc');
                    //removes dependency on startFrom filter
                    filtered = filtered.slice( ($scope.currentPage - 1) * $scope.itemsPerPage );

                    $scope.filtered = $filter('limitTo')(filtered, $scope.itemsPerPage);
                } else {
                    $scope.filtered = null;
                }
            },
            setLogger: function(logger) {
                this.logger = logger;
            },
            setFilter: function(filter) {
                this.filter = filter;
            },
            onColumnHeaderClick: function(index, scope) {
                if (scope.sortBy === scope.columns[index].field) {
                    scope.sortOrder = scope.sortOrder === '' ? 'desc' : '';
                } else {
                    scope.sortOrder = '';
                }
                scope.sortBy = scope.columns[index].field;
            },
            onTableDataChange: function(newData, oldData, scope, log, filter){
                this.applyFilters(scope, log, filter);
            },
            vDestroy: function(scope) {
                this._super(scope);
            }
        });

        widgetModule.directive('pxDatagrid', function($log, $filter, $templateCache) {
            $templateCache.put("template/pagination/pagination.html",
                    "<div>" +
                    "  <ul class=\"pagination\">\n" +
                    "  <li ng-repeat=\"page in pages\" ng-class=\"{active: page.active, disabled: page.disabled}\">" +
                    "<a ng-click=\"selectPage(page.number)\">" +
                    "<i class=\"icon-arrow-left\" ng-if=\"page.text == '&lt;'\"></i>" +
                    "<i class=\"icon-arrow-right\" ng-if=\"page.text == '&gt;'\"></i>" +
                    "<span ng-if=\"page.text != '&gt;' && page.text != '&lt;'\">{{page.text}}</span>" +
                    "</a></li>\n" +
                    "  </ul>\n" +
                    "</div>\n" +
                    "");

            var grid = new PxDatagrid();
            grid.setLogger($log);
            grid.setFilter($filter);
            return grid;
        });

        return PxDatagrid;
    });
