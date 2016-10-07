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
define(['jquery', 'map-cluster-component/map-cluster', 'map-core-component/map-core', 'OpenLayers', 'modernizr'], function ($, mapClusters) {

  describe('Provides expected API', function(){
    it('should expose a addClusters function', function(){
      expect(mapClusters).to.have.property('addClusters');
    });

    it('should expose a updateClusters function', function(){
      expect(mapClusters).to.have.property('updateClusters');
    });
  });

  describe('Add cluster layer to map', function(){

    before(function(done){
      $('body').append('<div class="map" style="height:500px; width:500px;"></div');
      $('.map').initializeMap();
      $(".map").children().eq(0).height(500)

      this.map = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();
      this.data = $.parseJSON('{"type": "FeatureCollection","features": [{"type":"Feature", "properties":{"addressLine1":"1050 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975193,37.777120]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777129]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777139]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777149]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777159]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777169]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777179]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777189]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777199]}, "metadata":{"type":"virtual","state":"default"}}, \
                                                                         {"type":"Feature", "properties":{"addressLine1":"1060 Crow Canyon Road","addressLine2":"San Ramon (CA)","zip":"12346"}, "geometry":{"type":"Point","coordinates":[-121.975199,37.777209]}, "metadata":{"type":"virtual","state":"default"}} \
                              ]}');

      mapClusters.addClusters(this.data, this.olMap).done(function(){
        done();
      })
    });

    after(function(){
      $('.map').remove();
    })

    it('map should be initialised', function(){
      expect($(".map").get(0).map.olMap().id).to.match(/^.*OpenLayers_Map.*$/);
    });

    it('Should be a one cluster on the map layer', function(){

      expect($(".marker")).to.have.property('length', 1);
    });
  });

});
