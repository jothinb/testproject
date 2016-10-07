define(['widgets-module'], function (widgets) {
	'use strict';
	widgets.directive('vEcho', function () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				uri: '='
			},
			template: '<div class="clearfix">{{uri}}</div>'
		};
	});

});
