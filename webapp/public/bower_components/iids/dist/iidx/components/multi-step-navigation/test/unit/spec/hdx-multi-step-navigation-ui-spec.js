
'use strict';

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

  describe('Test multistep navigation  UI', function () {
    var $$;
    before(function(done) {
        this.timeout(15000);
        var modbase = module.uri.substr(0, module.uri.indexOf("/test") );
        fixtures.path = modbase + '/test/fixtures';
        fixtures.load('hdx-multi-step-navigation.html', function() {
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
    //First tests from hdx variabels are added, then the rest are added.
    /*describe('Test container margin', function(){
        it('container margin is 0px', function() {
          expect($$('.navbar-inner .container').css('margin')).to.equal('0px');
        });
    });*/
    describe('Test button height', function(){
        it('button height is 15px', function() {
          expect($$('.navbar .nav li a').css('line-height')).to.equal('15px');
        });
    });
    /*describe('Test button margin', function(){
        it('button margin is 10px 1px 10px 1px', function() {
          expect($$('.navbar .nav li a').css('margin')).to.equal('10px 1px');
        });
    });*/
    
    //Normal button styles
    describe('Test normal button background color', function(){
        it('Button  background is white', function() {
          expect( toHex( $$('#ex3').css('background-color')) ).to.equal('#ffffff');
        });
    });
    /*describe('Normal button border color is graylighter', function(){
        it('Button  border is mid gray', function() {
          expect($$('#ex3').css('border-color')).to.equal('rgb(220, 220, 220)');
        });
    });*/
    
    describe('Test normal button text color', function(){
        it('Button  text is dark gray', function() {
          expect( toHex( $$('#ex3').css('color')) ).to.equal('#797979');
        });
    });
    
    //Active button
    /*
    This test is weird because the color value is different for locally compiled component
    CSS vs including the end result hds.less from the root design system
    describe('Test active step text color', function(){
        it('text color is white', function() {
          expect($$('.active a').css('background-color')).to.equal('rgb(18, 172, 235)');
        });
    });
    */
    
    describe('Test active step icon color', function(){
        it('icon color is white', function() {
          expect( toHex( $$('.active a i').css('color')) ).to.equal('#ffffff');
        });
    });
    //Complete button -> hover and complete are same for hdx.
    describe('Test complete button background color', function(){
        it('Button  background is mid gray', function() {
          expect( toHex( $$('.completed a').css('background-color')) ).to.equal('#e1e1e1');
        });
    });
    describe('Complete button icon is dark gray', function(){
        it('Button  border is dark gray', function() {
          expect( toHex( $$('.completed a').css('color')) ).to.equal('#8c8c8c');
        });
    });
    
    describe('Test complete button icon color', function(){
        it('icon is dark gray', function() {
          expect( toHex( $$('.completed i').css('color')) ).to.equal('#8c8c8c');
        });
    });
    
  });

});
