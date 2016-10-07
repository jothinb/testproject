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
define(['jquery', 'map-core-component/map-core', 'modernizr'], function ($) {

  describe('Test map geolocate API.', function(done){
    this.timeout(6000);

    before(function(){
      $('body').append('<div data-map-name="test-map" class="map"></div');
      $('.map').initializeMap();

      this.dxmap = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();

    });

    after(function(){
      $('.map').remove();
    });

    it('Test can send address via pub sub and map goto that address', function(done){

      var that = this

      this.olMap.events.register('moveend', {}, function(){
        expect(that.olMap.center.lon).to.equal(-14221.988898632);
        expect(that.olMap.center.lat).to.equal(6711533.6930579);

        that.olMap.events.unregister('moveend');
        done();
      });

      $.publish('gotoAddress', ['London, UK', 'test-map']);

    });


  });

});
