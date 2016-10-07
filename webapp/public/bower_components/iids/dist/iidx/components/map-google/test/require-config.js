'use strict';
/*
 * Copyright (c) 2014 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * Local AMD config for this component.  Each application or Design System extension will declare its own
 * mappings and not use this config
 *
 * @author Martin Wragg
 */
require.config({
    baseUrl: '/',
    paths: {
        'googlemaps': 'js/googlemaps',
        'map-google': 'js/googlemaps',
        'map-google-component/googlemaps-loader': 'js/googlemaps-loader',
        'jquery': 'components/jquery/jquery',
        'map-loader' : 'test/unit/spec/map-loader-mock'
    },
    shim: {

    }
});
