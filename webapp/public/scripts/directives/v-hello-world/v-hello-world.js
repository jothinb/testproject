/* jshint unused: false */
define(['widgets-module', 'text!./v-hello-world.html'], function (widgetsModule, tmpl) {
	'use strict';
	widgetsModule.directive('vHelloWorld', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				title: '=',
				message: '=',
				color: '='
			},
			template: tmpl,
			link: function (scope) {
				scope.$watch('title', function (newData, oldData) {
					scope.actualTitle = 'Yay: ' + scope.title;
				});
			}
		};
	});

});
