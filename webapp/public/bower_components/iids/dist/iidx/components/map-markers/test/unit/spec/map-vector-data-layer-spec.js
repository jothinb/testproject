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
define(['jquery', 'map-markers-component/map-vector-data-layer', 'map-core-component/map-core', 'OpenLayers', 'modernizr'], function ($, mapVectorLayer) {

  describe('Provides api to add GeoJSON feature collection to map', function(){

    before(function(){
      $('body').append('<div class="map"></div');
      $('.map').initializeMap();

      this.olMap = $(".map").get(0).map.olMap();
      this.data = $.parseJSON('{"type": "FeatureCollection","features": [{"type":"Feature", "properties":{"addressLine1":"1050 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975193,37.777120]}, "metadata":{"type":"virtual","state":"default"}}]}');

      mapVectorLayer.addGeoJSON(this.data, this.olMap, {}, 'GeoJSON Example');
    });

    after(function(){
      $('.map').remove();
    })

    it('should expose a addGeoJSON function', function(){
        expect(mapVectorLayer).to.respondTo('addGeoJSON');
    });

    it('map should be initialised', function(){
      expect($(".map").get(0).map.olMap().id).to.match(/^.*OpenLayers_Map.*$/);
    });

    it('Should be able to load some geoJSON into our map layer', function(){
      expect(this.olMap.getLayersByName('GeoJSON Example')).to.exist;
    });

  });
});
