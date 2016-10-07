/**
 * Created by 212342050 on 3/17/14.
 */
'use strict';


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

define(['node_modules/karma-support/src/js/unit/karma/fixtures', 'jquery', 'module'], function (fixtures, $, module) {

    describe('JumpNav Lights On Test Fixture', function(){
        var $$;
        before(function(done) {
            this.timeout(15000);
            var modbase = module.uri.substr(0, module.uri.indexOf("/test") );

            fixtures.path = modbase + '/test/fixtures/hdx';
            fixtures.load('hdx-jumpnav.html', function() {
                $('#' + fixtures.containerId).width('100%');
                $('#' + fixtures.containerId).height('600px');
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

        describe('Sits at the top', function(){
            it('Should have a top margin when not scrolling/fixed', function() {
                expect( $$('.jumpnav').css('margin-top') ).to.equal('20px');
            });


            it('Should not be scrolled', function() {
                expect( $$('body').scrollTop() ).to.equal(0);
            });

            it('Should have a white background when not scrolled', function() {
                expect( toHex($$('.jumpnav').css('background-color'))).to.equal('#ffffff');
            });
        });

        /*describe('When Scrolled', function(){
            this.timeout(4000);
            before(function(done) {
                setTimeout(function() {
                    // takes a bit to ready the button
                    // WARNING: this will not scroll in PhantomJS, so tests will not work
                    // PhantomJS decides to show the entire page with no scroll no matter what you do
                    // To make this work, we may need to create a bridge to the Phantom instance, and use a page.cliprect
                    $$('#testclick').trigger('click');
                    setTimeout(function() {
                        // takes 1.5 seconds to animate into position
                        done();
                    }, 2000);
                }, 500);

            });

            it('Should have a top margin when scrolling', function() {
                expect( $$('.jumpnav').css('margin-top') ).to.equal('0px');
            });

            it('Should have scrolled to the correct position', function() {
                // seems to be inexact (possibly because of diff browser window sizes), so set a threshold vs exact value
                // all we care is that it scrolls
                expect( $$('body').scrollTop() ).to.be.above(200);
            });

            it('Should have a grayish background when scrolling', function() {
                expect( toHex($$('.jumpnav').css('background-color'))).to.equal('#f3f3f3');
            });
        });*/

    });

    describe('JumpNav Lights Off Test Fixture', function(){
        var $$;
        before(function(done) {
            this.timeout(15000);
            var modbase = module.uri.substr(0, module.uri.indexOf("/test") );

            fixtures.path = modbase + '/test/fixtures/hdx';
            fixtures.load('hdx-lightsoff-jumpnav.html', function() {
                $('#' + fixtures.containerId).width('100%');
                $('#' + fixtures.containerId).height('600px');
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

        describe('Sits at the top', function(){
            it('Should have a top margin when not scrolling/fixed', function() {
                expect( $$('.jumpnav').css('margin-top') ).to.equal('20px');
            });


            it('Should not be scrolled', function() {
                expect( $$('body').scrollTop() ).to.equal(0);
            });

            it('Should have a grayish background when not scrolled', function() {
                expect( toHex($$('.jumpnav').css('background-color'))).to.equal('#1d1d1d');
            });
        });

        /*describe('When Scrolled', function(){
             // takes a bit to ready the button
             // WARNING: this will not scroll in PhantomJS, so tests will not work
             // PhantomJS decides to show the entire page with no scroll no matter what you do
             // To make this work, we may need to create a bridge to the Phantom instance, and use a page.cliprect
            this.timeout(4000);
            before(function(done) {
                setTimeout(function() {
                    // takes a bit to ready the button
                    $$('#testclick').trigger('click');
                    setTimeout(function() {
                        // takes 1.5 seconds to animate into position
                        done();
                    }, 2000);
                }, 500);

            });

            it('Should have a top margin when scrolling', function() {
                expect( $$('.jumpnav').css('margin-top') ).to.equal('0px');
            });

            it('Should have scrolled to somewhere in the body', function() {
                // seems to be inexact (possibly because of diff browser window sizes), so set a threshold vs exact value
                // all we care is that it scrolls
                expect( $$('body').scrollTop() ).to.be.above(200);
            });

            it('Should have a black background when scrolling', function() {
                expect( toHex($$('.jumpnav').css('background-color'))).to.equal('#000000');
            });
        });*/

    });
});
