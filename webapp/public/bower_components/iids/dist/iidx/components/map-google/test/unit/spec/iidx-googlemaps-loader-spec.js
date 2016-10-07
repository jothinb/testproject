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
define(['jquery', 'map-google-component/googlemaps-loader'], function ($, gmapsloader) {
  beforeEach(function(){
    google = null;
  });

  describe('Loads google maps api and exposes it as AMD module and object', function(){

    it('googlemaps loader should return an object', function(){
        expect(gmapsloader).to.not.be.null;
    });


    it('load function should load google maps api', function(done){
      expect(google).to.equal.null;
      gmapsloader.load(null, null, function(){
        expect(google.maps).to.not.be.null;
        done();
      }, {});
    });

  });

});
