'use strict';

/*
 * Copyright (c) 2013 GE Global Research. All rights reserved.
 *
 * The copyright to the computer software herein is the property of
 * GE Global Research. The software may be used and/or copied only
 * with the written permission of GE Global Research or in accordance
 * with the terms and conditions stipulated in the agreement/contract
 * under which the software has been supplied.
 */

/**
 * @class Unit test spec for toggle-switch.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Martin Wragg
 *
 */
define(['jquery', 'map-markers-component/map-d3-overlay', 'map-core-component/map-core', 'OpenLayers'], function ($, mapOverlay, mapCore) {

  describe('Returns overlay constructor function', function(){

    it('map-d3-overlay should return constructor function', function(){
      expect(mapOverlay).to.have.property('name', 'OverlayConstructor');
    });

  });

});
