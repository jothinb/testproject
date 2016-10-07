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
 * @class Unit test spec for map-layerlist.
 *
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Martin Wragg
 *
 */
define(['jquery', 'map-layer-list', 'map-core-component/map-core', 'modernizr'], function ($, ll) {

  describe('Provides a layer list component that controls map layer visibility.', function(){

    before(function(){
      $('body').append(' \
          <div class="btn-group pull-right overlay-chooser"> \
            <button class="btn btn-map dropdown-toggle" data-toggle="dropdown" data-layer-map="default" data-title="Layers"> \
              <i class="icon-overlays"></i>Layers<i class="icon-chevron-down"></i> \
            </button> \
            <ul class="dropdown-menu"></ul> \
          </div>\
      ');
      $('body').append('<div data-map-name="default" class="map"></div');
      $('.map').initializeMap();

      this.dxmap = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();




    });

    after(function(){
      $('.overlay-chooser').remove();
    });

    it('should have two base layers on the widget.', function(){
      expect($("ul.dropdown-menu > li.enabled").length).to.be.equal(1);
    });

    it('Clicking on overlay should turn it off.', function(){
      expect(this.olMap.getLayersByName("NDFD Wind Vectors")[0].visibility).to.be.true;
      var e = jQuery.Event("mousedown");
      e.which = 1;
      $("li.enabled").eq(0).trigger(e);
      expect(this.olMap.getLayersByName("NDFD Wind Vectors")[0].visibility).to.be.false;
    });

    it('Clicking on overlay with alt mouse button shouldnt turn it off.', function(){
      var currentLayerState = this.olMap.getLayersByName("NDFD Wind Vectors")[0].visibility;
      var e = jQuery.Event("mousedown");
      e.which = 2;
      $("li.enabled").eq(0).trigger(e);
      expect(this.olMap.getLayersByName("NDFD Wind Vectors")[0].visibility).to.equal(currentLayerState);
    });

  });

});
