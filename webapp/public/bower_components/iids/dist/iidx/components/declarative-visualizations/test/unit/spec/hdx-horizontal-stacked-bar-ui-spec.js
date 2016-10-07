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
      fixtures.load('hdx-horizontal-stacked-bar-fixture.html', function() {
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

    describe('Pill graph should have correct colours', function(){
      it('Green pill part should have correct stroke and width', function(){
        expect($$('.pill.success').css('stroke-width')).to.equal('1px');
      });

      it('Green pill part should have correct stroke colour', function(){
        expect($$('.pill.success').css('stroke')).to.equal('#6b9d00');
      });

      it('Orange pill part should have correct stroke and width', function(){
        expect($$('.pill.warning').css('stroke-width')).to.equal('1px');
      });

      it('Orange pill part should have correct stroke colour', function(){
        expect($$('.pill.warning').css('stroke')).to.equal('#ea7600');
      });

      it('Red pill part should have correct stroke and width', function(){
        expect($$('.pill.danger').css('stroke-width')).to.equal('1px');
      });

      it('Red pill part should have correct stroke colour', function(){
        expect($$('.pill.danger').css('stroke')).to.equal('#ee3324');
      });
    });

    describe('Labels should have correct size, font and colour', function(){
      it('Pill labels should be correct colour', function () {
        expect($$('.viz-point-label').css('color')).to.equal('rgb(121, 121, 121)');
      });

      it('Pill labels should be correct size', function () {
        expect($$('.viz-point-label').css('font-size')).to.equal('14px');
      });

      it('Large numeric label should have 66px size font', function (){
        expect($$('text.num').css('font-size')).to.equal('66px');
      })

      it('Large number label should have colour #131313', function () {
        expect($$('text.num').css('fill')).to.equal('#131313');
      });

      it('Text Label should have colour #131313', function (){
        expect($$('text.label').css('fill')).to.equal('#131313');
      });

      it('Text label should have size 14px', function () {
        expect($$('text.label').css('font-size')).to.equal('14px');
      });

    });

    describe('Single Pill should render correctly', function(){
      it('single pill should have single path', function(){
        expect($$('#single path').length).to.equal(1);
      });
    });

    describe('Double Pill should render correctly', function(){
      it('Double pill should have two paths', function(){
        expect($$('#double path').length).to.equal(2);
      });
    });

    describe('Pill with zero value should render correctly', function(){
      it('triple pill with single zero value (at end) should have two path elements', function(){
        expect($$('#tail path').length).to.equal(2);
      });
      it('triple pill with single zero value (at start) should have two path elements', function(){
        expect($$('#head path').length).to.equal(2);
      })

    });

  });
});
