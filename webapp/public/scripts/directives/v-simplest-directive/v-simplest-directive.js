/* jshint unused: false */
define(['directives-module'], function (directives) {
	'use strict';
	return directives.directive('vSimplestDirective', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<div class="clearfix">I am a directive.</div>'
		};
	});
});
