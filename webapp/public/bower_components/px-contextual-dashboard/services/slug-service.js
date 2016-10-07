define(['angular', '../module', 'vruntime'], function(angular, module, vRuntime) {
    'use strict';

    module.factory('SlugService', function() {
        return {
            makeAngularSlug: function(str) {
                str = str.split(/(?=[A-Z])/);
                str = vRuntime.utils.string.slugify(str);
                str = str.replace(/_/g, '-');
                return str;
            }
        };
    });
});