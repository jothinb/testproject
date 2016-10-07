define(['angular', 'tv4', 'objectpath'], function(angular, tv4, ObjectPath){
	/**
	* Bug in tv4 plugin when using with angular schema form and require js. angular schema form expects tv4 in global namespace, 
	* however tv4 plugin will detect requirejs existence and return tv4 as requirejs module
	* The following code is to return tv4 to global so that angular schema form will function properly
	*/ 
	window.tv4 = tv4;

	/**
	* Bug in Object Path plugin when using with angular schema form and require js. Plugin Author assume developer will not 
	* use require js with Angular. If using require js, the following angular module will not be extablished. The following
	* line is to reextablish the angular module
	*/
	if (typeof angular === 'object') {
		angular.module('ObjectPath', []).provider('ObjectPath', function(){
			this.parse = ObjectPath.parse;
			this.stringify = ObjectPath.stringify;
			this.normalize = ObjectPath.normalize;
			this.$get = function(){
				return ObjectPath;
			};
		});
	}

	return angular;
});