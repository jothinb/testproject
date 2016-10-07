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
 * @class Unit test spec for sparkline.
 *
 * @author Prasad Aluru
 *
 */

 /**
 * Separate out this into a share utility function someday!
 */
function decToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function toHex(clr) {
    // already hex?
    if (clr.indexOf('#') != -1) {
        clr = clr.slice(1).toLowerCase();
        return '#' + clr;
    }

    // separate out the RGB in the string
    clr = clr.slice(4);
    clr = clr.slice(0, clr.length-1);
    clr = clr.split(',');
    var hex = decToHex(parseInt(clr[0])) + decToHex(parseInt(clr[1])) + decToHex(parseInt(clr[2]));
    hex = hex.toLowerCase();
    return '#' + hex;
}

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

  describe('Test Bar Chart with threshold bar UI', function(){

    var $$;

    before(function(done) {
      this.timeout(15000);
      var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
      fixtures.path = modbase + '/test/fixtures/hdx';
      fixtures.load('threshold-bar.html', function() {
        $('#' + fixtures.containerId).width('450px');
        $('#' + fixtures.containerId).height('350px');
        $('#' + fixtures.containerId).css({ opacity: 1 });
        // wait for require dependencies
        setTimeout(function(){
          $$ = fixtures.window().$;
          done();
        }, 100);
      });
    });

    after(function(){
      // remove cleanup if you'd like to debug
      fixtures.cleanUp();
      fixtures.clearCache();
    });

    it('Should have dashed bar with black color', function() {
      expect( toHex($$('#threshold-bar-chart.threshold-bar').css("color")) ).to.equal('#131313');
    });
  });
});
