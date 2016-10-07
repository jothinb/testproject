/*global define */
define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.factory('CurrentStateService', function() {
        var current = {};

        function getView() {
            if (hasView()){
                return current.view;
            }
            return {};
        }

        function setView(view) {
            current.view = view;
        }

        function setViewToNone() {
            current.view = null;
        }

        function getViewList() {
            if (hasContext()) {
                return current.context.views;
            } else {
                return [];
            }
        }

        function hasView() {
            if (current.hasOwnProperty('view') && current.view !== null){
                return true;
            }
            return false; 
        }

        //ToDo: Need to refactor this to CurrentContextService & CurrentViewService cause CurrentStateService is getting messy
        function getWidgetList(){
            if (hasView() && hasWidget()){
                return current.view.cards;
            }
            else {
                return [];
            }
        }

        //ToDo: Need to refactor this to CurrentContextService & CurrentViewService cause CurrentStateService is getting messy
        function hasWidget(){
            if (hasView()){
                if (current.view.hasOwnProperty('cards') && current.view.cards.length > 0){
                    return true;
                }
            }
            return false;
        }

        function getDatasources() {
            if (hasContext()) {
                return current.context.datasources;
            } else {
                return [];
            }
        }

        function hasContext() {
            return current.context !== undefined && current.context !== null;
        }

        function getContext() {
            return current.context;
        }

        function setContext(context) {
            current.context = context;
        }

        function getContextName() {
            if(current.context) {
                return current.context.name;
            }
            return null;
        }

        function setBreadcrumbs(breadcrumbs) {
            // the px-tree-nav returns the breadcrumbs with an extra entry at the beginning of an array that's just
            // an empty string. we strip that empty entry out here with `Array.prototype.slice`

            if (breadcrumbs[0] === '') {
                current.breadcrumbs = breadcrumbs.slice(1);
            } else {
                current.breadcrumbs = breadcrumbs;
            }
        }

        function getBreadcrumbs() {
            if(current.context) {
                return current.breadcrumbs;
            }
            return [];
        }

        return {
            getView: getView,
            setView: setView,
            setViewToNone: setViewToNone,
            getViewList: getViewList,
            hasView: hasView,
            getWidgetList: getWidgetList,
            hasContext: hasContext,
            getContext: getContext,
            setContext: setContext,
            getContextName: getContextName,
            setBreadcrumbs: setBreadcrumbs,
            getBreadcrumbs: getBreadcrumbs,
            getDatasources: getDatasources
        };
    });

});