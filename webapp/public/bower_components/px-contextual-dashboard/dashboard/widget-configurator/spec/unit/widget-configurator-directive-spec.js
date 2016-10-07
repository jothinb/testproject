define(['angular', 'angular-mocks'], function(angular) {
    'use strict';

    describe('px form directive', function(){
        var $form, $formContainer, scope;

        beforeEach(module('predix.configurable-dashboard'));

        beforeEach(inject(function($injector) {
            var $compile = $injector.get('$compile');
            var $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();
            scope.schema = {
                type: "object",
                properties: {
                    count: {
                        type: "number",
                        title: "count"
                    },
                    name: {
                        type: "string",
                        title: "name"
                    }
                },
                required: ['count', 'name']
            };

            scope.model = {count: 1, name: "2"};

            var elm = angular.element('<px-form data-form-name="sampleForm" data-schema="schema" data-model="model"></px-form>');

            setFixtures(sandbox({
                id: 'test-form-container'
            }));

            $formContainer = $("#test-form-container");
            $formContainer.append($compile(elm)(scope));
            // get the isolate scope that was created
            scope = elm.isolateScope();

            scope.$apply();
            $form = $formContainer.find('form');
        }));  

        describe('can show form', function(){ 
            it('contain text box for count', function(){
                expect($form.find('input[ng-model="model.count"]').length > 0).toBe(true);
            });

            it('contain text box for name', function(){
                expect($form.find('input[ng-model="model.name"]').length > 0).toBe(true);
            });           
        });

        describe('sets up the global form settings', function(){
            it('initializes the validation messages', function(){
                var validationMsgs = scope.globalFormOptions.formDefaults.validationMessage;
                expect(validationMsgs["default"]).toBe("dashboard.widgetconfig.errorCodes.DEFAULT");
                expect(validationMsgs[tv4.errorCodes.NUMBER_MULTIPLE_OF]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_MULTIPLE_OF");
                expect(validationMsgs[tv4.errorCodes.NUMBER_MINIMUM]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_MINIMUM");
                expect(validationMsgs[tv4.errorCodes.NUMBER_MINIMUM_EXCLUSIVE]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_MINIMUM_EXCLUSIVE");
                expect(validationMsgs[tv4.errorCodes.NUMBER_MAXIMUM]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_MAXIMUM");
                expect(validationMsgs[tv4.errorCodes.NUMBER_MAXIMUM_EXCLUSIVE]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_MAXIMUM_EXCLUSIVE");
                expect(validationMsgs[tv4.errorCodes.NUMBER_NOT_A_NUMBER]).toBe("dashboard.widgetconfig.errorCodes.NUMBER_NOT_A_NUMBER");
                expect(validationMsgs[tv4.errorCodes.STRING_LENGTH_SHORT]).toBe("dashboard.widgetconfig.errorCodes.STRING_LENGTH_SHORT");
                expect(validationMsgs[tv4.errorCodes.STRING_LENGTH_LONG]).toBe("dashboard.widgetconfig.errorCodes.STRING_LENGTH_LONG");
                expect(validationMsgs[tv4.errorCodes.STRING_PATTERN]).toBe("dashboard.widgetconfig.errorCodes.STRING_PATTERN");
                expect(validationMsgs[tv4.errorCodes.OBJECT_REQUIRED]).toBe("dashboard.widgetconfig.errorCodes.OBJECT_REQUIRED");
            });

            it('sets the form feedback (the glyphicons) to false', function(){
                expect(scope.globalFormOptions.formDefaults.feedback).toBe(false);
            });
        });
    });
});