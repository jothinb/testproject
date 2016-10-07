/*global define */
/* jshint unused: false */
define(['angular', 'directives-module'], function (angular, directives) {
	'use strict';

	/* Directives  */
	directives.directive('appVersion', function () {
		return {
			restrict: 'E',
			link: function (scope, elm, attrs) {
				elm.text('1.0.0');
			}
		};
	});

	return directives;
});
