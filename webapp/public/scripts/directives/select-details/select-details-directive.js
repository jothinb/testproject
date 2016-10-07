/* jshint unused: false */
define(['angular','directives-module', 'text!./select-details-template.html'], function (angular, directives, selectDetailsTmpl) {
	'use strict';
	return directives.directive('selectDetails', function () {
		return {
			scope: false,
			restrict: 'E',
			replace: true,
//			template: miniMapTmpl,
			template: selectDetailsTmpl,
			link: function(scope, element, attribute) {



				var init = function() {

					scope.cInfo = attribute.selected;
				};


				init();
			}  //End Link()
		};
	});
});
