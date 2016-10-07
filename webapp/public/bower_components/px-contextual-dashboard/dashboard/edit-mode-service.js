define(['angular', '../module'], function(angular, module) {
    module.service('EditModeService', function(CurrentStateService, WidgetService, ViewService, DashboardAlertService, $sce, $rootScope, $q) {
        var widgetIndex;
        var shouldAddWidgetAtIndex = false;
        var inEditMode = false;
        var viewWorkingCopy;

        function saveChanges() {
            var deferred = $q.defer();

            var currentContext = CurrentStateService.getContext();
            var updateViewIndex = 0;
            var viewToBeSaved = null;

            var saveSuccessCallback = function() {
                currentContext.views[updateViewIndex] = viewWorkingCopy;
                CurrentStateService.setContext(currentContext);
                CurrentStateService.setView(viewWorkingCopy);
                exitEditMode();

                deferred.resolve();
            };

            var saveErrorCallback = function() {
                DashboardAlertService.addAlert({
                    msg: vRuntime.messages("dashboard.context.view.updatefail")
                });

                deferred.reject(vRuntime.messages("dashboard.context.view.updatefail"));
            };

            while ((updateViewIndex < currentContext.views.length) && (currentContext.views[updateViewIndex].id !== viewWorkingCopy.id)) {
                updateViewIndex++;
            }

            ViewService.updateView(viewWorkingCopy).then(saveSuccessCallback, saveErrorCallback);

            return deferred.promise;
        }

        function cancelChanges() {
            exitEditMode();
        }

        function enterEditMode() {
            inEditMode = true;
            viewWorkingCopy = angular.copy(CurrentStateService.getView());
        }

        function exitEditMode() {
            inEditMode = false;
        }

        function isInEditMode() {
            return inEditMode;
        }

        /*
         * This function decides whether or not to add an add widget button based on if this widget will be added
         * to a new row, what size the widget is, and if there is a widget after it, what size that widget is.
         */
        function shouldShowAddButtonForIndex(index) {
            var widgets = viewWorkingCopy.cards;

            // if we are on a new row and the widget is half sized
            if (isOnNewRow(index) && widgets[index] && widgets[index].size === 'half') {

                // and there is a next widget and its half sized, that means the row is full and we shouldn't add the button
                if (widgets[index + 1] && widgets[index + 1].size === 'half') {
                    return false;
                }
                // and there is no widget after this one, then the row is only half full and we should add the button
                else {
                    return true;
                }
            }
            // if we are on a new row and the widget is full sized, or we are halfway through a row, then don't add the button
            else {
                return false;
            }
        }

        /*
         * This function checks if the widget at the specified index is at the start of a new row or not.
         *
         * It loops over all the widgets on the page before the widget we are asking about, and depending on if
         * those widgets are full sized or half sized, figures out whether the location of the specified widget will be
         * at the beginning of the row or on an existing row after a half sized widget.
         */
        function isOnNewRow(index) {
            var widgets = viewWorkingCopy.cards;

            // the first widget is always on a new row
            var isNewRow = true;

            for (var i = 0; i < index; i++) {

                // if the widget is full size, then we know that we'll be starting a new row for the next one
                if (widgets[i].size === 'full') {
                    isNewRow = true;
                }

                // if we are at the beginning of a row and the widget is half sized, then the next widget will not
                // be on a new row
                else if (isNewRow && widgets[i].size === 'half') {
                    isNewRow = false;
                }

                // if we are not at the beginning of a row and the widget is half sized, that ends the row and the next
                // widget will be on the beginning of the next row
                else if (!isNewRow && widgets[i].size === 'half') {
                    isNewRow = true;
                }
            }

            return isNewRow;
        }

        function setWidgetIndex(index) {
            widgetIndex = index;
            shouldAddWidgetAtIndex = true;
        }

        function setWidgetIndexToLast() {
            shouldAddWidgetAtIndex = false;
        }

        function getViewWorkingCopy() {
            return viewWorkingCopy;
        }

        function addWidget(datasource, datasourceOptions, widget, widgetOptions) {
            if (shouldAddWidgetAtIndex) {
                insertWidgetInstanceAtIndex(widgetIndex, WidgetService.buildWidgetInstance(datasource, datasourceOptions, widget, widgetOptions));
            } else {
                insertWidgetInstanceAtIndex(viewWorkingCopy.cards.length, WidgetService.buildWidgetInstance(datasource, datasourceOptions, widget, widgetOptions));
            }
        }

        function updateWidget(index, datasource, datasourceOptions, widget, widgetOptions) {
            updateWidgetInstanceAtIndex(index, WidgetService.buildWidgetInstance(datasource, datasourceOptions, widget, widgetOptions));
        }

        function deleteWidget(index) {
            viewWorkingCopy.cards.splice(index, 1);
        }

        function updateWidgetInstanceAtIndex(index, widget) {
            //overwrite the widget at widgetIndex
            viewWorkingCopy.cards[index] = widget;
        }

        function insertWidgetInstanceAtIndex(index, widget) {
            viewWorkingCopy.cards.splice(index, 0, widget);
        }

        function getViewName() {
            if (viewWorkingCopy != null && viewWorkingCopy.name) {
                return viewWorkingCopy.name;
            }
            return "";
        }

        function setViewName(name) {
            viewWorkingCopy.name = name;
        }

        function setCurrentViewToFirstAvailableOrNullIfNone() {
            var views = CurrentStateService.getViewList();
            if (views.length > 0) {
                CurrentStateService.setView(views[0]);
            } else {
                CurrentStateService.setViewToNone();
            }
        }

        function removeCurrentViewFromContext() {
            var deferred = $q.defer();

            var currentView = CurrentStateService.getView();
            var currentContext = CurrentStateService.getContext();
            var deleteViewIndex = 0;

            var deleteSuccessHandler = function() {
                currentContext.views.splice(deleteViewIndex, 1);
                exitEditMode();
                setCurrentViewToFirstAvailableOrNullIfNone();

                deferred.resolve();
            };

            var deleteErrorHandler = function() {
                DashboardAlertService.addAlert({
                    msg: vRuntime.messages("dashboard.context.view.deletefail")
                });

                deferred.reject(vRuntime.messages("dashboard.context.view.deletefail"));
            };

            while ((deleteViewIndex < currentContext.views.length) && (currentView.id !== currentContext.views[deleteViewIndex].id)) {
                deleteViewIndex++;
            }

            ViewService.deleteView(currentView.id).then(deleteSuccessHandler, deleteErrorHandler);

            return deferred.promise;
        }

        function addView(name) {
            var deferred = $q.defer();
            var newViewInstance = ViewService.buildViewInstance(name);

            var createSuccessCallback = function(view) {
                CurrentStateService.getContext().views.push(view);
                CurrentStateService.setView(view);
                enterEditMode();

                deferred.resolve();
            };

            var createErrorCallback = function(err) {
                DashboardAlertService.addAlert({
                    msg: vRuntime.messages("dashboard.context.view.createfail")
                });
                deferred.reject(vRuntime.messages("dashboard.context.view.createfail"));
            };

            ViewService.createView(newViewInstance).then(createSuccessCallback, createErrorCallback);

            return deferred.promise;
        }

        return {
            shouldShowAddButtonForIndex: shouldShowAddButtonForIndex,
            setWidgetIndex: setWidgetIndex,
            setWidgetIndexToLast: setWidgetIndexToLast,
            isInEditMode: isInEditMode,
            enterEditMode: enterEditMode,
            cancelChanges: cancelChanges,
            saveChanges: saveChanges,
            getViewWorkingCopy: getViewWorkingCopy,
            updateWidget: updateWidget,
            addWidget: addWidget,
            getViewName: getViewName,
            setViewName: setViewName,
            removeCurrentViewFromContext: removeCurrentViewFromContext,
            deleteWidget: deleteWidget,
            addView: addView
        };
    });
});