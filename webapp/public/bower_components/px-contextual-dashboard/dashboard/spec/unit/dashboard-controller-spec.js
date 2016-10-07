define(['angular', 'bower_components/px-contextual-dashboard/services/spec/unit/mockObjects', 'angular-mocks'], function(angular, mockObjects) {
    var DashboardController;
    var CurrentStateService;
    var EditModeService;
    var fake$Event;

    describe('The DashboardController', function() {
        beforeEach(module('predix.configurable-dashboard'));
        beforeEach(inject(function($controller, _CurrentStateService_, _EditModeService_, _WidgetConfiguratorService_, _DeleteWidgetService_) {
            DashboardController = $controller('DashboardController');
            CurrentStateService = _CurrentStateService_;
            EditModeService = _EditModeService_;
            WidgetConfiguratorService = _WidgetConfiguratorService_;
            DeleteWidgetService = _DeleteWidgetService_;
            fake$Event = jasmine.createSpyObj('fake$Event', ['preventDefault']);
        }));

        describe('while in edit mode', function() {
            beforeEach(function() {
                CurrentStateService.setView(mockObjects.context.views[2]);
                EditModeService.enterEditMode();
            });

            it('will show add widget buttons', function() {
                expect(DashboardController.shouldShowAddButtonForIndex(0)).toBe(true);
            });

            it('knows that the dashboard is in edit mode', function() {
                expect(DashboardController.isInEditMode()).toBe(true);
            });

            it('gets the list of the current view\'s widgets from the EditModeService', function() {
                expect(DashboardController.getCurrentViewWidgets()).toBe(EditModeService.getViewWorkingCopy().cards);
            });
        });

        describe('while not in edit mode', function() {
            it('knows that the dashboard is not in edit mode', function() {
                expect(DashboardController.isInEditMode()).toBe(false);
            });

            it('gets a list of the current view\'s widgets from CurrentStateService', function() {
                CurrentStateService.setView(mockObjects.context.views[0]);
                expect(DashboardController.getCurrentViewWidgets()).toEqual(mockObjects.context.views[0].cards);
            });

            it('will not show add widget buttons if the page is in edit mode', function() {
                CurrentStateService.setView(mockObjects.context.views[2]);
                expect(DashboardController.isInEditMode()).toBe(false);
                expect(DashboardController.shouldShowAddButtonForIndex(0)).toBe(false);
            });
        });

        it('calls through to the CurrentStateService hasContext function', function() {
            spyOn(CurrentStateService, 'hasContext');
            DashboardController.hasContext();
            expect(CurrentStateService.hasContext).toHaveBeenCalled();
        });

        it('calls through to the CurrentStateService hasView function', function() {
            spyOn(CurrentStateService, 'hasView');
            DashboardController.hasView();
            expect(CurrentStateService.hasView).toHaveBeenCalled();
        });

        it('calls through to the CurrentStateService getView function', function() {
            spyOn(CurrentStateService, 'getViewList');
            DashboardController.getViewList();
            expect(CurrentStateService.getViewList).toHaveBeenCalled();
        });

        it('knows if the dashboard is in edit mode or not', function() {
            expect(DashboardController.isInEditMode()).toBe(false);
        });

        it('knows the status of edit mode after it has been entered', function() {
            CurrentStateService.setView(mockObjects.context.views[2]);
            EditModeService.enterEditMode();
            expect(DashboardController.isInEditMode()).toBe(true);
        });

        it('will not show add widget buttons if the page is in edit mode', function() {
            CurrentStateService.setView(mockObjects.context.views[2]);
            expect(DashboardController.isInEditMode()).toBe(false);
            expect(DashboardController.shouldShowAddButtonForIndex(0)).toBe(false);
        });

        it('will show add widget buttons if the page is in edit mode', function() {
            CurrentStateService.setView(mockObjects.context.views[2]);
            EditModeService.enterEditMode();
            expect(DashboardController.isInEditMode()).toBe(true);
            expect(DashboardController.shouldShowAddButtonForIndex(0)).toBe(true);
        });

        it('will open widget configurator when click edit widget with index', function(){
            spyOn(WidgetConfiguratorService,'openModalInEditMode');
            DashboardController.editWidget(1);
            expect(WidgetConfiguratorService.openModalInEditMode).toHaveBeenCalledWith(1);
        });

        it('will open widget configurator when click add widget with index', function() {
            spyOn(WidgetConfiguratorService, 'openModalInAddMode');
            DashboardController.addWidget(fake$Event, 1);
            expect(fake$Event.preventDefault).toHaveBeenCalled();
            expect(WidgetConfiguratorService.openModalInAddMode).toHaveBeenCalledWith(1);
        });

        it('will open widget configurator when click add widget without index', function() {
            spyOn(WidgetConfiguratorService, 'openModalInAddMode');
            DashboardController.addWidget(fake$Event);
            expect(fake$Event.preventDefault).toHaveBeenCalled();
            expect(WidgetConfiguratorService.openModalInAddMode).toHaveBeenCalledWith(undefined);
        });


        it('will open delete alert when click delete widget', function(){
            spyOn(DeleteWidgetService,'showModal');
            DashboardController.deleteWidget(1);
            expect(DeleteWidgetService.showModal).toHaveBeenCalledWith(1);
        });

    });
});