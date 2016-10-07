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

  describe('Test map control is initialised.', function(done){

    before(function(){
      $('body').append('<div data-map-name="test-map" class="map"></div');
      $('.map').initializeMap();

      this.dxmap = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();

    });

    after(function(){
      $('.map').remove();
    });

    it('Map component should exist', function(){
      expect(this.olMap).to.exist;
    });

  });

  describe('Test map control zoom API.', function(done){

    before(function(){
      $('body').append('<div data-map-name="test-map" class="map"></div');
      $('.map').initializeMap();

      this.dxmap = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();

    });

    after(function(){
      $('.map').remove();
    });

    it('Test zoom in function zooms map in.', function(){
      var currentZoom = this.olMap.zoom;
      this.dxmap.zoomIn();
      expect(this.olMap.zoom).to.equal(currentZoom + 1);
    });

    it('Test zoom out function zooms map out.', function(){
      var currentZoom = this.olMap.zoom;
      this.dxmap.zoomOut();
      expect(this.olMap.zoom).to.equal(currentZoom - 1);
    });

    it('Test mouse zoom in function zooms map in.', function(){
      var currentZoom = this.olMap.zoom;
      var e = {};
      e.clientX =100;
      e.clientY =100;

      this.dxmap.zoomInMouse(e);
      expect(this.olMap.zoom).to.equal(currentZoom + 1);
    });

    it('Test mouse zoom out function zooms map out.', function(){
      var currentZoom = this.olMap.zoom;
      var e = {};
      e.clientX =100;
      e.clientY =100;

      this.dxmap.zoomOutMouse(e);
      expect(this.olMap.zoom).to.equal(currentZoom - 1);
    });



  });
});
