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
    baseUrl: './',
    config: { 'map-loader': {
        configFileName: 'base/test/unit/spec/map-test-config.json'
      }
    },
    paths: {
      'map-layer-list': 'js/map-layer-list',
      jquery: 'components/jquery/jquery',
      'OpenLayers': 'components/open-layers/dist/OpenLayers',
      hogan: 'components/hogan/index',
      bootstrap: 'components/bootstrap/js',
      'ge-bootstrap': 'components/ge-bootstrap/js/ge-bootstrap',
      'map-loader': 'components/map-core/js/map-loader',
      'underscore': 'components/underscore-amd/index',
      'map-core': 'components/map-core/js/map-core',
      'map-core-component': 'components/map-core/js',
      'map-google-component': 'components/map-google/js',
      'map-google': 'components/map-google/js/googlemaps',
      modernizr: 'components/modernizr/modernizr'

    },
    shim: {
      OpenLayers: {
        exports: 'OpenLayers'
      }
    }
});
