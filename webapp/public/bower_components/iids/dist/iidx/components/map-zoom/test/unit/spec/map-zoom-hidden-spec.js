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
 * @author Jeff Reichenberg
 *
 */
define(['jquery', 'map-core-component/map-core', 'map-zoom', 'modernizr'], function ($) {

  describe('Test map zoom control can be hidden', function(){

    before(function(){
      $('body').append('<div data-map-zoom-control="hide" data-map-name="test-map" class="map"></div');
      $('.map').initializeMap();

      this.olMap = $(".map").get(0).map.olMap();

    });

    after(function(){
      $('.map').remove();
    });

    it('zoom control should not be on map', function(){
      expect($('.zoom_control').length).to.equal(0);
    });

  });

});
