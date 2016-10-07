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
define(['jquery', 'map-markers-component/map-marker-types'], function ($, mapMarkerTypes) {

  describe('Provides api to load svg markers', function(){
    it('should expose a loadSVGMarkerElements function', function(){
      expect(mapMarkerTypes).to.respondTo('loadSVGMarkerElements');
    });

  });

  describe('loadSVGMarkerElements function should load svg marker definitions', function(done){

    var objMetaDataSub = {},
        objMetaDataSubWithDefaults = {};

    objMetaDataSubWithDefaults.metadata = {};
    objMetaDataSubWithDefaults.metadata.type = 'default';

    mapMarkerTypes.done(function(obj){
      it('loadSVGMarkerElements should inform that loading is finished promise style', function(done){
        expect(mapMarkerTypes.state()).to.equal('resolved');
        done();
      });

      it('default marker should be defined (no args specified)', function(done){
        var isSVGElement = $(mapMarkerTypes.getSVGElement(objMetaDataSub)).is('svg');
        expect(isSVGElement).to.be.true;
        done();
      });

      it('default marker popover offset should be defined (no args specified)', function(done){
        expect(mapMarkerTypes.getPopoverOffset(objMetaDataSub)).to.equal(14);
        done();
      });

      it('default marker popover translate x should be defined (no args specified)', function(done){
        expect(mapMarkerTypes.getTranslateX(objMetaDataSub)).to.equal(-20.499);
        done();
      });

      it('default marker popover translate y should be defined (no args specified)', function(done){
        expect(mapMarkerTypes.getTranslateY(objMetaDataSub)).to.equal(-20.499);
        done();
      });

      it('default marker should be defined', function(done){
        var isSVGElement = $(mapMarkerTypes.getSVGElement(objMetaDataSubWithDefaults)).is('svg');
        expect(isSVGElement).to.be.true;
        done();
      });

      it('default marker popover offset should be defined', function(done){
        expect(mapMarkerTypes.getPopoverOffset(objMetaDataSubWithDefaults)).to.equal(14);
        done();
      });

      it('default marker popover translate x should be defined', function(done){
        expect(mapMarkerTypes.getTranslateX(objMetaDataSubWithDefaults)).to.equal(-20.499);
        done();
      });

      it('default marker popover translate y should be defined', function(done){
        expect(mapMarkerTypes.getTranslateY(objMetaDataSubWithDefaults)).to.equal(-20.499);
        done();
      });

      it('mini version of marker should be returned when size:mini is in object metadata', function(done){
        objMetaDataSubWithDefaults.metadata.size = 'mini';
        //assert default-mini offset of 9 vs 14 for default marker symbol.
        expect(mapMarkerTypes.getPopoverOffset(objMetaDataSubWithDefaults)).to.equal(9);
        objMetaDataSubWithDefaults.metadata.size = undefined;
        done();
      });

    });

    mapMarkerTypes.loadSVGMarkerElements();

  });

});
