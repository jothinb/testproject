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
define(['jquery', 'asset-address-search', 'map-google'], function ($) {

  describe('Provides a JQuery plugin', function(){
    it('should expose a assetOrAddressSearch JQuery plugin function', function(){
      expect($('*')).to.respondTo('assetOrAddressSearch');
    });
  });

  describe('Should be able to perform an address search', function(){

    this.timeout(5000);
    before(function(){
      var opts = {};
      opts.type = 'address';
      opts.positionElementID = 'searchSubmitBtn';
      $('body').append('<button id="searchSubmitBtn" type="submit"></button>');
      $('body').append('<input id="search" type="text" class="input-medium search-query" autocomplete="off" placeholder="Search" />');
      //opts.menu = $('#menu');
      $('#search').assetOrAddressSearch(opts);
    });

    it('Given input a list of address suggesstions should be returned', function(done){
      $('#search').val('kenya');
      $('#search').keyup();
      //todo: make assertion wait for list to be displayed.      
      expect($('.tt-dropdown-menu p').length).to.be.equal(0);
      done();
    });

  });

});
