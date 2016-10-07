define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.provider('ViewService', function() {
        var baseUrl = "(dashboardViewService)";

        this.setViewUrl = function(url) {
            baseUrl = url;
        };

        function sanitizeWidgetInstance(view) {
            if (view && view.cards){
                for (var i = 0; i < view.cards.length; i++) {
                    //update display order base on position in the widget array
                    view.cards[i].displayOrder = i + 1;

                    //remove unnecessary key
                    delete view.cards[i].$$hashKey;

                }
            }
            return view;
        }

        function sortWidgetsByDisplayOrder(views) {
            if (views) {
                views = angular.forEach(views, function(view, key) {
                    if (view.cards && view.cards.length > 1) {
                        //return cards in ascending order
                        view.cards = _.sortBy(view.cards, function(card) {
                            return card.displayOrder;
                        });
                    }
                });
            }
            return views;
        }

        this.$get = function($q, DashboardSettingsService) {
            //create datasource
            var contextViewsDs = vRuntime.datasource.create("ContextViews", "", {});

            return {
                getViewsByContextId: function(id) {
                    //set datasource for a particular conext only
                    contextViewsDs.setBaseURL(DashboardSettingsService.getHttpProtocol() + baseUrl + "/" + id + "/collections");

                    var defer = $q.defer();

                    var successCallback = function(views) {
                        defer.resolve(sortWidgetsByDisplayOrder(views));
                    };
                    var errorCallback = function(err, xhr) {
                        if (xhr.status === 404) {
                            //return empty views when 404
                            defer.resolve([]);
                        }
                        else {
                            var errmsg = vRuntime.messages("dashboard.context.view.fetchfail");
                            window.logger.error(errmsg);
                            defer.reject(errmsg);
                        }
                    };

                    contextViewsDs.get().then(successCallback, errorCallback);

                    return defer.promise;
                },
                updateView: function(view) {
                    var defer = $q.defer();

                    var successCallback = function() {
                        defer.resolve();
                    };
                    var errorCallback = function(err) {
                        var errmsg = vRuntime.messages("dashboard.context.view.udpatefail");
                        window.logger.error(errmsg);
                        defer.reject(errmsg);
                    };

                    /**
                     * displayOrder is not required in frontend now, dashboard frontend just displays widget base on the order in the cards/widgets array
                     * Temp solution is to clean the display order before sending to backend so that backend can sort widget in correct order and send it back
                     */
                    view = sanitizeWidgetInstance(view);

                    contextViewsDs.update(view.id, view).then(successCallback, errorCallback);

                    return defer.promise;

                },
                createView: function(newView) {
                    var defer = $q.defer();

                    var successCallback = function(view) {
                        //patching view response with empty view with cards as array
                        view.cards = [];
                        defer.resolve(view);
                    };
                    var errorCallback = function(err) {
                        var errmsg = vRuntime.messages("dashboard.context.view.createfail");
                        window.logger.error(errmsg);
                        defer.reject(errmsg);
                    };

                    contextViewsDs.create(newView).then(successCallback, errorCallback);

                    return defer.promise;
                },
                deleteView: function(id) {
                    var defer = $q.defer();

                    var successCallback = function(views) {
                        defer.resolve(views);
                    };
                    var errorCallback = function(err) {
                        var errmsg = vRuntime.messages("dashboard.context.view.deletefail");
                        window.logger.error(errmsg);
                        defer.reject(errmsg);
                    };

                    contextViewsDs.remove(id).then(successCallback, errorCallback);

                    return defer.promise;
                },
                buildViewInstance: function(name) {
                    return {
                        name: name,
                        cards: []
                    };
                }
            };
        };

    });
});