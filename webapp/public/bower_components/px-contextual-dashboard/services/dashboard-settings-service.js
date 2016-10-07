define(['angular', '../module'], function(angular, module) {
    'use strict';

    module.provider('DashboardSettingsService', function() {

        var appId = '1';
        var isSecureNetworkProtocol = false;

        this.setAppId = function(id) {
            appId = id;
        };

        this.enableSecureNetworkProtocol = function(isSecure) {
            if (typeof isSecure === "boolean") {
                isSecureNetworkProtocol = isSecure;
            }
        };

        this.$get = function() {
            return {
                getHttpProtocol: function() {
                    if (isSecureNetworkProtocol) {
                        return "https://";
                    }
                    return "http://";
                },
                getAppId: function() {
                    return appId;
                }
            };
        };

    });
});