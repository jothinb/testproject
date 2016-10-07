
'use strict';

define(['node_modules/js-fixtures/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

/*
 * Need to test followign properties from less file:
 *  background-color: @offWhite;
 *	border-color: @btnBorder;
 *	.border-radius(@baseBorderRadius);
 *	font-size: @baseFontSize;
 */
  describe('Test Code UI', function () {
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures/hdx';
        fixtures.load('code.html', function() {
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

    describe('Test code background color', function(){
        it('Code background is off-white', function() {
        	expect($$('#ex1').css('background-color')).to.equal('rgb(243, 243, 243)');
        	expect($$('#ex2').css('background-color')).to.equal('rgb(243, 243, 243)');
        	expect($$('#ex3').css('background-color')).to.equal('rgb(243, 243, 243)');
        });

    });
    describe('Test code font size', function(){
        it('font size is 13px', function() {
        	expect($$('#ex1').css('font-size')).to.equal('13px');
        	expect($$('#ex2').css('font-size')).to.equal('13px');
        	expect($$('#ex3').css('font-size')).to.equal('13px');
        });

    });
    describe('Test code border color', function(){
        it('border color is offGray', function() {
        	expect($$('#ex1').css('border-bottom-color')).to.equal('rgb(220, 220, 220)');
        	expect($$('#ex2').css('border-bottom-color')).to.equal('rgb(220, 220, 220)');
        	expect($$('#ex3').css('border-bottom-color')).to.equal('rgb(220, 220, 220)');
        });

    });

  });

});
