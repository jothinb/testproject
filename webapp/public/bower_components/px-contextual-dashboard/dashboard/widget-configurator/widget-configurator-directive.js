define(['angular', '../../module', 'text!./widget-configurator-template.html', 'bootstrap-modal', 'bootstrap-transition'/*, 'bootstrap-button'*/], function(angular, module, template) {
    'use strict';

    module.directive('widgetConfigurator', function() {
        return {
            restrict: 'E',
            template: template,
            scope: true,
            controller: 'WidgetConfiguratorController',
            controllerAs: 'widgetConfigurator',
            require: 'widgetConfigurator',
            link: function(scope, element, attrs, widgetConfigurator) {
                element.on('show.bs.modal', widgetConfigurator.onModalShow);
                element.on('hidden.bs.modal', widgetConfigurator.onModalHide);
            }
        };
    })
        .directive('pxForm', ['$compile', function($compile) {
            return {
                restrict: 'E',
                replace: false,
                scope: {
                    formName: "=",
                    schema: "=",
                    model: "="
                },
                link: function(scope, element, attr) {

                    // initializing the global form settings
                    var validationMessages = {};
                    validationMessages[tv4.errorCodes.NUMBER_MULTIPLE_OF] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_MULTIPLE_OF");
                    validationMessages[tv4.errorCodes.NUMBER_MINIMUM] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_MINIMUM");
                    validationMessages[tv4.errorCodes.NUMBER_MINIMUM_EXCLUSIVE] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_MINIMUM_EXCLUSIVE");
                    validationMessages[tv4.errorCodes.NUMBER_MAXIMUM] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_MAXIMUM");
                    validationMessages[tv4.errorCodes.NUMBER_MAXIMUM_EXCLUSIVE] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_MAXIMUM_EXCLUSIVE");
                    validationMessages[tv4.errorCodes.NUMBER_NOT_A_NUMBER] = vRuntime.messages("dashboard.widgetconfig.errorCodes.NUMBER_NOT_A_NUMBER");
                    validationMessages[tv4.errorCodes.STRING_LENGTH_SHORT] = vRuntime.messages("dashboard.widgetconfig.errorCodes.STRING_LENGTH_SHORT");
                    validationMessages[tv4.errorCodes.STRING_LENGTH_LONG] = vRuntime.messages("dashboard.widgetconfig.errorCodes.STRING_LENGTH_LONG");
                    validationMessages[tv4.errorCodes.STRING_PATTERN] = vRuntime.messages("dashboard.widgetconfig.errorCodes.STRING_PATTERN");
                    validationMessages[tv4.errorCodes.OBJECT_REQUIRED] = vRuntime.messages("dashboard.widgetconfig.errorCodes.OBJECT_REQUIRED");
                    validationMessages["default"] = vRuntime.messages("dashboard.widgetconfig.errorCodes.DEFAULT");

                    scope.globalFormOptions = {
                        formDefaults: {
                            validationMessage: validationMessages,
                            "feedback": false
                        }
                    };

                    //redraw the form when schema change
                    scope.$watch("schema", function(newVal) {

                        //clean child elements and event handlers
                        element.empty();

                        //angular schema form directive template
                        var html = '<form name="formName" sf-schema="schema" sf-form="form" sf-model="model" sf-options="globalFormOptions"></form>';

                        //inject angular schema form directive
                        element.html(html);

                        scope.form = ['*'];

                        //compile angular schema form directive
                        $compile(element.contents())(scope); //recompilation
                    });
                }
            };

        }]);

    return module;
});