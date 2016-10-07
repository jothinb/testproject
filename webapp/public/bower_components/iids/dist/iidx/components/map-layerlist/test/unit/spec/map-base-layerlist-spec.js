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
      $('body').append('<div data-map-name="default" class="map"></div');
      $('.map').initializeMap();

      this.dxmap = $(".map").get(0).map;
      this.olMap = $(".map").get(0).map.olMap();
    });

    after(function(){
      $('.map').remove();
    });

    it('should have two base layers on the widget.', function(){
      expect($(".base-layer-chooser > ul > li").length).to.be.above(0);
    });

    it('Clicking on base layer should turn it on.', function(){
      var origBaseLayerName = this.olMap.baseLayer.name;
      $(".base-layer-chooser > ul > li").eq(1).click();
      expect(this.olMap.baseLayer.name).to.not.equal(origBaseLayerName);
    });

  });

});
