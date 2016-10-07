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
 * Use any Mocha (http://visionmedia.github.io/mocha/), Chai (http://chaijs.com/), or Sinon (http://sinonjs.org/) statements here
 *
 * @author Martin Wragg
 *
 */

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {
  describe('HDX horizontal stacked bar lights off tests', function(){
    var $$;
    before(function(done) {
      this.timeout(15000);
      var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
      fixtures.path = modbase + '/test/fixtures/hdx/';
      fixtures.load('hdx-horizontal-stacked-bar-lights-off-fixture.html', function() {
        $('#' + fixtures.containerId).width('100%');
        $('#' + fixtures.containerId).height('100%');
        $('#' + fixtures.containerId).css({ opacity: 1 });
        // wait for require dependencies
        setTimeout(function(){
          $$ = fixtures.window().$;
          done();
        }, 1000);
      });
    });

    after(function(){
      // remove cleanup if you'd like to debug
      fixtures.cleanUp();
      fixtures.clearCache();
    });

    describe('jQuery should be on the test page', function(){
      it('$$ shouldnt be undefined', function(){
        expect($$).to.exist;
      });
    });

    describe('Pill graph should have font', function(){
      it('pill-viz section should exist', function(){
        expect($$('#pill-viz').length).to.equal(1);
      });

      it('GE Sans should be on the page', function(){
        expect($$('text.num').css('font-family')).to.equal("\'GE Sans\', ge-sans, \'GE Inspira\', ge-inspira, \'Helvetica Neue\', Helvetica, Arial, sans-serif");
      });
    });

    //lights off tests

    describe('Pill graph should have correct colours - lights off', function(done){

      it('Green pill part should have correct stroke and width - lights off', function(){
        expect($$('.pill.success').css('stroke-width')).to.equal('0px');
      });

      it('Green pill part should have correct background colour - lights off', function(){
        expect($$('.pill.success').css('fill')).to.equal('#6b9d00');
      });

      it('Orange pill part should have correct stroke and width - lights off', function(){
        expect($$('.pill.warning').css('stroke-width')).to.equal('0px');
      });

      it('Orange pill part should have correct background colour - lights off', function(){
        expect($$('.pill.warning').css('fill')).to.equal('#ea7600');
      });

      it('Red pill part should have correct stroke and width - lights off', function(){
        expect($$('.pill.danger').css('stroke-width')).to.equal('0px');
      });

      it('Red pill part should have correct background colour - lights off', function(){
        expect($$('.pill.danger').css('fill')).to.equal('#ee3324');
      });
    });
  });
});
