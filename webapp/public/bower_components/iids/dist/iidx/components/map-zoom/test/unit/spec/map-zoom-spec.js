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

  describe('Test zoom control exists and zoom in and out works as expected', function(done){

    before(function(){
      $('body').append('<div data-map-name="test-map" class="map"></div');
      $('.map').initializeMap();

      this.olMap = $(".map").get(0).map.olMap();

    });

    after(function(){
      $('.map').remove();
    });

    it('zoom control should be on map', function(){
      expect($('.zoom_control').length).to.be.above(0);
    });

    it('zoom out control should be on map', function(){
      expect($('.zoom_control .zoom_out').length).to.be.above(0);
    });

    it('zoom in control should be on map', function(){
      expect($('.zoom_control .zoom_in').length).to.be.above(0);
    });

    it('zoom out control should have correct icon', function(){
      expect($('.zoom_control .zoom_out i').hasClass('icon-ico_minus')).to.be.true;
    });

    it('zoom in control should have correct icon', function(){
      expect($('.zoom_control .zoom_in i').hasClass('icon-ico_add_alt_sm')).to.be.true;
    });

    it('triggering zoom in button causes map to zoom in', function(done){
      var currentZoomLevel = this.olMap.zoom;
      var e = jQuery.Event( 'mousedown' );
      var that = this;
      e.which = '1';

      var res = $.subscribe('zoomEnd', function(a,b){
        expect(that.olMap.zoom).to.be.equal(currentZoomLevel + 1);
        $.unsubscribe(res);
        done();
      });

      $('.zoom_control .zoom_in').trigger(e);

    });

    it('triggering zoom in button causes map to zoom in', function(done){
      var currentZoomLevel = this.olMap.zoom;
      var e = jQuery.Event( 'mousedown' );
      var that = this;
      e.which = '1';

      var res = $.subscribe('zoomEnd', function(a,b){
        expect(that.olMap.zoom).to.be.equal(currentZoomLevel - 1);
        $.unsubscribe(res);
        done();
      });

      $('.zoom_control .zoom_out').trigger(e);

    });

  });

});
